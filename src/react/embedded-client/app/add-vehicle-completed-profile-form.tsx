/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import GET_ADD_VEHICLE_COMPLETED_PROFILE from '@embedded-bind/react/operations/queries/get-completed-profile-add-vehicle';
import ADD_VEHICLE_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-add-vehicle';
import { useMutation, useQuery, FetchResult } from '@apollo/client';
import { 
  GetCompletedProfileAddVehicleQuery,
  GetCompletedProfileAddVehicleQueryVariables,
  CompletedProfileAddVehicleFormFragment,
  CompletedProfileAddVehicleMutation,
  CompletedProfileAddVehicleMutationVariables,
  Form
 } from '../../graphql/generated';

interface AddVehicleCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  addVehicle: (input: CompletedProfileAddVehicleMutationVariables['input']) => Promise<FetchResult<CompletedProfileAddVehicleMutation>>,
  addingVehicle: boolean,
  title: Form['title'],
}

interface AddVehicleCompletedProfileFormProps {
  attemptQuote?: boolean;
  children: (props: AddVehicleCompletedProfileFormRenderProps) => JSX.Element;
  externalId: string;
  profile: CompletedProfileAddVehicleFormFragment
}

function AddVehicleCompletedProfileForm({ attemptQuote, children, externalId, profile }: AddVehicleCompletedProfileFormProps) {
  
  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileAddVehicleMutation, CompletedProfileAddVehicleMutationVariables>(ADD_VEHICLE_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileAddVehicleMutationVariables['input']) => mutate({
      variables: { externalId, input, attemptQuote: attemptQuote || false }
    }), [attemptQuote, externalId, mutate]);

  if (profile.__typename === "CompletedProfile" && profile?.addVehicleForm?.inputs) {

    return children({
      title: profile?.addVehicleForm?.title,
      inputs: profile?.addVehicleForm?.inputs,
      addVehicle: handleSubmit,
      addingVehicle: loadingMutation
    });
  }

  return null;
}

export default AddVehicleCompletedProfileForm;
