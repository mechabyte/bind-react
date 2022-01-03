import Client from '@embedded-bind/client';
import queryKeys from '@embedded-bind/react/embedded-bind/hooks/use-query/keys';
import type { ClientError } from '@embedded-bind/client';
import type { BindProfileType, CreatePrefillRequestRequestType, CreatePrefillRequestResponseType, GetBindProfileResponseType, GetPrefillRequestRequestType, GetPrefillRequestResponseType, GetProfileRulesRequestType, GetProfileRulesResponseType } from '@embedded-bind/client/types';
import type { ReactNode } from 'react';
import type { MutateOptions, UseMutationOptions, UseQueryOptions, QueryObserverIdleResult } from 'react-query';

/**
 * Bind PROFILE
 */

type UseBindProfileQueryOptions = UseQueryOptions<undefined, ClientError, GetBindProfileResponseType, ReturnType<typeof queryKeys.bindProfile>>;
type UseBindProfileQueryResult = QueryObserverIdleResult<GetBindProfileResponseType, ClientError>;

/**
 * CREATE PREFILL REQUESTS
 */

type CreatePrefillRequestOptions = MutateOptions<CreatePrefillRequestResponseType, ClientError, CreatePrefillRequestRequestType, Record<string, unknown>>;

interface ICreatePrefillRequestProvider extends UseMutationOptions<CreatePrefillRequestResponseType, ClientError, CreatePrefillRequestRequestType, Record<string, unknown>> {
  bindProfile: BindProfileType;
  children: ReactNode;
}

type CreatePrefillRequestContextType = {
  didComp: boolean;
  submit: (options: CreatePrefillRequestOptions) => Promise<CreatePrefillRequestResponseType>;
  isCreatingPrefillRequest: boolean;
  isValidPrefillRequest: boolean | undefined;
  isValidatingPrefillRequest: boolean;
  requiredFields: [];
}

/**
 * LOAD PREFILL REQUESTS
 */


interface IGetPrefillRequestProvider extends UseQueryOptions<GetPrefillRequestResponseType, ClientError, GetPrefillRequestRequestType, ReturnType<typeof queryKeys['prefillRequest']>> {
  children: ReactNode;
  enabled: boolean;
}

type GetPrefillRequestContextType = {
  completed: boolean;
}

/**
 * QUOTE-RELATED
 */

 type UseProfileRulesQueryOptions = UseQueryOptions<Record<string, unknown>, ClientError, GetProfileRulesResponseType, ReturnType<typeof queryKeys['profileRules']>>;
 type UseProfileRulesQueryResult = QueryObserverIdleResult<GetProfileRulesResponseType, ClientError>;
 


interface IEmbeddedClientProvider {
  client: Client;
  children: ReactNode;
}

type EmbeddedClientContextType = Client;

export type {
  CreatePrefillRequestContextType,
  ICreatePrefillRequestProvider,
  EmbeddedClientContextType,
  IEmbeddedClientProvider,
  IGetPrefillRequestProvider,
  GetPrefillRequestContextType,
  UseBindProfileQueryOptions,
  UseBindProfileQueryResult,
  UseProfileRulesQueryOptions,
  UseProfileRulesQueryResult,
};
export {
  queryKeys,
};
