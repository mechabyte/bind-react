/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import COMPLETED_PROFILE_ADD_DRIVER_FORM from '@embedded-bind/react/operations/fragments/completed-profile-add-driver-form';
import GET_ADD_DRIVER_COMPLETED_PROFILE from '@embedded-bind/react/operations/queries/get-completed-profile-add-driver';
import ADD_DRIVER_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-add-driver';
import { useMutation, useQuery, FetchResult } from '@apollo/client';
import { 
  CompletedProfileAddDriverFormFragment,
  GetCompletedProfileAddDriverQuery,
  GetCompletedProfileAddDriverQueryVariables,
  CompletedProfileAddDriverMutation,
  CompletedProfileAddDriverMutationVariables,
  Form,
  CompletedProfileAddVehicleFormFragment,
 } from '../../graphql/generated';

interface AddDriverCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  addDriver: (input: CompletedProfileAddDriverMutationVariables['input']) => Promise<FetchResult<CompletedProfileAddDriverMutation>>,
  addingDriver: boolean,
  title: Form['title'],
}

interface AddDriverCompletedProfileFormProps {
  attemptPrefill?: boolean;
  children: (props: AddDriverCompletedProfileFormRenderProps) => JSX.Element;
  externalUserId: string;
  profile: CompletedProfileAddDriverFormFragment;
}

function AddDriverCompletedProfileForm({ attemptPrefill, children, externalUserId, profile }: AddDriverCompletedProfileFormProps) {
  
  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileAddDriverMutation, CompletedProfileAddDriverMutationVariables>(ADD_DRIVER_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileAddDriverMutationVariables['input']) => 
    mutate({
      variables: { externalUserId, input, attemptPrefill: attemptPrefill || false }
    })
  , [attemptPrefill, externalUserId, mutate]);

  if (profile.__typename === "CompletedProfile" && profile?.addDriverForm?.inputs) {

    return children({
      title: profile?.addDriverForm?.title,
      inputs: profile.addDriverForm.inputs,
      addDriver: handleSubmit,
      addingDriver: loadingMutation
    });
  }

  return null;
}

export default AddDriverCompletedProfileForm;
