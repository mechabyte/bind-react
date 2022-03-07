/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import GET_UPDATE_COMPLETED_PROFILE from '@embedded-bind/react/operations/queries/get-completed-profile-update';
import UPDATE_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-update';
import { ApolloError, useMutation, useQuery, FetchResult } from '@apollo/client';
import { 
  GetCompletedProfileUpdateQuery,
  GetCompletedProfileUpdateQueryVariables,
  CompletedProfileUpdateMutation,
  CompletedProfileUpdateMutationVariables,
  Form
 } from '../../graphql/generated';

interface UpdateCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  loadingForm: boolean,
  updateProfile: (input: CompletedProfileUpdateMutationVariables['input']) => Promise<FetchResult<CompletedProfileUpdateMutation>>,
  updatingProfile: boolean,
  title: Form['title'],
}

interface UpdateCompletedProfileFormProps {
  attemptPrefill?: boolean;
  children: (props: UpdateCompletedProfileFormRenderProps) => JSX.Element;
  externalUserId: string;
}

function UpdateCompletedProfileForm({ attemptPrefill, children, externalUserId }: UpdateCompletedProfileFormProps) {
  
  const {
    data,
    error,
    loading,
  } = useQuery<GetCompletedProfileUpdateQuery, GetCompletedProfileUpdateQueryVariables>(GET_UPDATE_COMPLETED_PROFILE, { variables: { externalId: externalUserId }});

  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileUpdateMutation, CompletedProfileUpdateMutationVariables>(UPDATE_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileUpdateMutationVariables['input']) => 
    mutate({
      variables: { externalUserId, input, attemptPrefill: attemptPrefill || false }
    })
  , [attemptPrefill, externalUserId, mutate]);

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (data && data.embeddedAccount?.profile.__typename === "CompletedProfile" && data.embeddedAccount?.profile?.form?.inputs) {

    return children({
      loadingForm: loading,
      title: data.embeddedAccount?.profile?.form?.title,
      inputs: data.embeddedAccount?.profile?.form?.inputs,
      updateProfile: handleSubmit,
      updatingProfile: loadingMutation
    });
  }

  return null;
}

export default UpdateCompletedProfileForm;
