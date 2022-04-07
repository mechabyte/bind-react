/* eslint-disable no-underscore-dangle */
import { DatePicker } from '@mantine/dates';
import {Checkbox, NumberInput, Select, TextInput, Button} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';
import GET_UPDATE_MAILING_ADDRESS_COMPLETED_PROFILE from '@embedded-bind/react/operations/queries/get-completed-profile-update-mailing-address';
import UPDATE_MAILING_ADDRESS_COMPLETED_PROFILE_MUTATION from '@embedded-bind/react/operations/mutations/completed-profile-update-mailing-address';
import { ApolloError, useMutation, useQuery, FetchResult } from '@apollo/client';
import { 
  GetCompletedProfileUpdateMailingAddressQuery,
  GetCompletedProfileUpdateMailingAddressQueryVariables,
  CompletedProfileUpdateMailingAddressMutation,
  CompletedProfileUpdateMailingAddressMutationVariables,
  Form
 } from '../../graphql/generated';

interface UpdateMailingAddressCompletedProfileFormRenderProps {
  inputs: Form['inputs'],
  loadingForm: boolean,
  updateMailingAddress: (input: CompletedProfileUpdateMailingAddressMutationVariables['input']) => Promise<FetchResult<CompletedProfileUpdateMailingAddressMutation>>,
  updatingMailingAddress: boolean,
  title: Form['title'],
}

interface UpdateMailingAddressCompletedProfileFormProps {
  attemptQuote?: boolean;
  children: (props: UpdateMailingAddressCompletedProfileFormRenderProps) => JSX.Element;
  externalId: string;
}

function UpdateMailingAddressCompletedProfileForm({ attemptQuote, children, externalId }: UpdateMailingAddressCompletedProfileFormProps) {
  
  const {
    data,
    error,
    loading,
  } = useQuery<GetCompletedProfileUpdateMailingAddressQuery, GetCompletedProfileUpdateMailingAddressQueryVariables>(GET_UPDATE_MAILING_ADDRESS_COMPLETED_PROFILE, { variables: { externalId }});

  const [mutate, { loading: loadingMutation }] = useMutation<CompletedProfileUpdateMailingAddressMutation, CompletedProfileUpdateMailingAddressMutationVariables>(UPDATE_MAILING_ADDRESS_COMPLETED_PROFILE_MUTATION)

  const handleSubmit = useCallback((input: CompletedProfileUpdateMailingAddressMutationVariables['input']) => 
    mutate({
      variables: { externalId, input, attemptQuote: attemptQuote || false }
    })
  , [attemptQuote, externalId, mutate]);

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  if (data && data.account?.__typename === "ConsentedAccount" && data.account.profile.__typename === "CompletedProfile" && data.account?.profile?.mailingAddress?.form?.inputs) {

    return children({
      loadingForm: loading,
      title: data.account?.profile?.mailingAddress?.form?.title,
      inputs: data.account?.profile?.mailingAddress?.form?.inputs,
      updateMailingAddress: handleSubmit,
      updatingMailingAddress: loadingMutation
    });
  }

  return null;
}

export default UpdateMailingAddressCompletedProfileForm;
