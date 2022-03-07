/* eslit-disable no-underscore-dangle */
import { useCallback } from 'react';
import EDIT_VEHICLE_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-edit-vehicle';
import { useMutation, FetchResult } from '@apollo/client';
import {
  CompletedProfileEditVehicleMutation,
  CompletedProfileEditVehicleMutationVariables,
  Form,
  CompletedProfileEditVehicleFormFragment
 } from '../../graphql/generated';

interface EditVehicleCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  editVehicle: (input: CompletedProfileEditVehicleMutationVariables['input']) => Promise<FetchResult<CompletedProfileEditVehicleMutation>>,
  editingVehicle: boolean,
  title: Form['title'],
}

interface EditVehicleCompletedProfileFormProps {
  attemptPrefill?: boolean;
  children: (props: EditVehicleCompletedProfileFormRenderProps) => JSX.Element;
  externalUserId: string;
  vehicle: CompletedProfileEditVehicleFormFragment
}

function EditVehicleCompletedProfileForm({ attemptPrefill, children, externalUserId, vehicle }: EditVehicleCompletedProfileFormProps) {
  
  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileEditVehicleMutation, CompletedProfileEditVehicleMutationVariables>(EDIT_VEHICLE_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileEditVehicleMutationVariables['input']) => mutate({
      variables: { externalUserId, input, attemptPrefill: attemptPrefill || false, vehicleId: vehicle.id }
    }), [attemptPrefill, externalUserId, mutate, vehicle.id]);

  if (vehicle?.editVehicleForm?.inputs) {

    return children({
      title: vehicle?.editVehicleForm?.title,
      inputs: vehicle?.editVehicleForm?.inputs,
      editVehicle: handleSubmit,
      editingVehicle: loadingMutation
    });
  }

  return null;
}

export default EditVehicleCompletedProfileForm;
