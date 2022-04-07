/* eslit-disable no-underscore-dangle */
import { useCallback } from 'react';
import EDIT_DRIVER_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-edit-driver';
import { useMutation, FetchResult } from '@apollo/client';
import {
  CompletedProfileEditDriverMutation,
  CompletedProfileEditDriverMutationVariables,
  Form,
  CompletedProfileEditDriverFormFragment
 } from '../../graphql/generated';

interface EditVehicleCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  editDriver: (input: CompletedProfileEditDriverMutationVariables['input']) => Promise<FetchResult<CompletedProfileEditDriverMutation>>,
  editingDriver: boolean,
  title: Form['title'],
}

interface EditVehicleCompletedProfileFormProps {
  attemptQuote?: boolean;
  children: (props: EditVehicleCompletedProfileFormRenderProps) => JSX.Element;
  externalId: string;
  driver: CompletedProfileEditDriverFormFragment
}

function EditDriverCompletedProfileForm({ attemptQuote, children, externalId, driver }: EditVehicleCompletedProfileFormProps) {
  
  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileEditDriverMutation, CompletedProfileEditDriverMutationVariables>(EDIT_DRIVER_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileEditDriverMutationVariables['input']) => mutate({
      variables: { externalId, input, attemptQuote: attemptQuote || false, driverId: driver.id }
    }), [attemptQuote, externalId, mutate, driver.id]);

  if (driver?.editDriverForm?.inputs) {

    return children({
      title: driver?.editDriverForm?.title,
      inputs: driver?.editDriverForm?.inputs,
      editDriver: handleSubmit,
      editingDriver: loadingMutation
    });
  }

  return null;
}

export default EditDriverCompletedProfileForm;
