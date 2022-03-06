/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import GET_ADD_VEHICLE_COMPLETED_PROFILE from '@embedded-bind/react/operations/queries/get-completed-profile-add-vehicle';
import ADD_VEHICLE_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-add-vehicle';
import { useMutation, useQuery } from '@apollo/client';
import { 
  GetCompletedProfileAddVehicleQuery,
  GetCompletedProfileAddVehicleQueryVariables,
  CompletedProfileAddVehicleMutation,
  CompletedProfileAddVehicleMutationVariables,
  Form
 } from '../../graphql/generated';

interface AddVehicleCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  addVehicle: (input: CompletedProfileAddVehicleMutationVariables['input']) => void,
  title: Form['title'],
}

interface AddVehicleCompletedProfileFormProps {
  attemptPrefill?: boolean;
  children: (props: AddVehicleCompletedProfileFormRenderProps) => JSX.Element;
  externalUserId: string;
}

function AddVehicleCompletedProfileForm({ attemptPrefill, children, externalUserId }: AddVehicleCompletedProfileFormProps) {
  
  const {
    data,
    error,
    loading,
  } = useQuery<GetCompletedProfileAddVehicleQuery, GetCompletedProfileAddVehicleQueryVariables>(GET_ADD_VEHICLE_COMPLETED_PROFILE, { variables: { externalId: externalUserId }});

  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileAddVehicleMutation, CompletedProfileAddVehicleMutationVariables>(ADD_VEHICLE_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileAddVehicleMutationVariables['input']) => {
    mutate({
      variables: { externalUserId, input, attemptPrefill: attemptPrefill || false }
    })
  }, [attemptPrefill, externalUserId, mutate]);

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (data && data.embeddedAccount?.profile.__typename === "CompletedProfile" && data.embeddedAccount?.profile?.form?.inputs) {

    return children({
      title: data.embeddedAccount?.profile?.form?.title,
      inputs: data.embeddedAccount?.profile?.form?.inputs,
      addVehicle: handleSubmit
    });
  }

  return null;
}

export default AddVehicleCompletedProfileForm;
