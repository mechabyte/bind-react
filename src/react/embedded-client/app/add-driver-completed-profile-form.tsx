/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import GET_ADD_DRIVER_COMPLETED_PROFILE from '@embedded-bind/react/operations/queries/get-completed-profile-add-driver';
import ADD_DRIVER_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-add-driver';
import { useMutation, useQuery } from '@apollo/client';
import { 
  GetCompletedProfileAddDriverQuery,
  GetCompletedProfileAddDriverQueryVariables,
  CompletedProfileAddDriverMutation,
  CompletedProfileAddDriverMutationVariables,
  Form
 } from '../../graphql/generated';

interface AddDriverCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  addDriver: (input: CompletedProfileAddDriverMutationVariables['input']) => void,
  title: Form['title'],
}

interface AddDriverCompletedProfileFormProps {
  attemptPrefill?: boolean;
  children: (props: AddDriverCompletedProfileFormRenderProps) => JSX.Element;
  externalUserId: string;
}

function AddDriverCompletedProfileForm({ attemptPrefill, children, externalUserId }: AddDriverCompletedProfileFormProps) {
  
  const {
    data,
    error,
    loading,
  } = useQuery<GetCompletedProfileAddDriverQuery, GetCompletedProfileAddDriverQueryVariables>(GET_ADD_DRIVER_COMPLETED_PROFILE, { variables: { externalId: externalUserId }});

  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileAddDriverMutation, CompletedProfileAddDriverMutationVariables>(ADD_DRIVER_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileAddDriverMutationVariables['input']) => {
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
      addDriver: handleSubmit
    });
  }

  return null;
}

export default AddDriverCompletedProfileForm;
