import Client from '@embedded-bind/client';
import type { ClientError } from '@embedded-bind/client';
import type { BindProfileType, CreatePrefillRequestRequestType, CreatePrefillRequestResponseType, GetPrefillRequestRequestType, GetPrefillRequestResponseType } from '@embedded-bind/client/types';
import type { ReactNode } from 'react';
import type { MutateOptions, UseMutationOptions, UseQueryOptions, QueryOptions, QueryFunctionContext, QueryMeta } from 'react-query';

/**
 * https://tkdodo.eu/blog/leveraging-the-query-function-context
*/
const queryKeys = {
  // ✅ all keys are arrays with exactly one object
  all: [{ scope: 'app' }] as const,
  prefillRequest: () =>
    [{ ...queryKeys.all[0], entity: 'prefillRequest' }] as const,
  ratingRequests: () =>
    [{ ...queryKeys.all[0], entity: 'ratingRequest' }] as const,
  ratingRequest: (id: string) =>
    [{ ...queryKeys.ratingRequests()[0], id }] as const,
};

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
}