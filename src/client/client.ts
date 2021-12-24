import type { Axios, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import type {
  AuthorizeBindProfileRequestType,
  AuthorizeBindProfileResponseType,
  CreatePrefillRequestRequestType,
  CreatePrefillRequestResponseType,
  GetPrefillRequestRequestType,
  GetPrefillRequestResponseType,
  GetProfileRulesRequestType,
  GetProfileRulesResponseType,
  GetSupportedMarketsRequestType,
  GetSupportedMarketsResponseType,
} from '@embedded-bind/client/types';

import UnauthorizedError from '@embedded-bind/client/errors/UnauthorizedError';

import ENDPOINTS from '@embedded-bind/client/endpoints';
import createAxiosClient from '@embedded-bind/client/utils/create-axios-client';
import verifyResponseStatus from '@embedded-bind/client/utils/verify-response-status';
import { ApiError } from '@embedded-bind/client/errors';
import { getToken, setToken } from '@embedded-bind/client/token';

class Client extends Object {
  apiKey: string;

  client: Axios;

  constructor({ apiKey, apiUrl, ...rest }: { apiKey: string, apiUrl: string })  {
    super(rest);
    this.apiKey = apiKey;
    this.client = createAxiosClient({
      baseURL: apiUrl,
    });
  }

  async authorize(inputData: AuthorizeBindProfileRequestType, config?: AxiosRequestConfig<AuthorizeBindProfileRequestType>): Promise<Omit<AuthorizeBindProfileResponseType, 'error'>> {
    const { data } = await this.client.post<AuthorizeBindProfileResponseType, AxiosResponse<AuthorizeBindProfileResponseType>, AuthorizeBindProfileRequestType>(
      ENDPOINTS.AUTHORIZE_BIND_PROFILE, inputData, config
    );

    if (data.error) { throw new ApiError(data.error) }

    return data;
  }

  async createPrefillRequest(inputData: CreatePrefillRequestRequestType, config?: AxiosRequestConfig<CreatePrefillRequestRequestType>): Promise<Omit<CreatePrefillRequestResponseType, 'error'>> {
    return this.verifyAuthenticatedRequest().then(async (authHeader: AxiosRequestHeaders) => {
      const response = await this.client.post<CreatePrefillRequestResponseType, AxiosResponse<CreatePrefillRequestResponseType>, CreatePrefillRequestRequestType>(
        ENDPOINTS.CREATE_PREFILL_REQUEST, inputData, { ...config, headers: { ...config?.headers, ...authHeader } },
      );
  
      const { data } = verifyResponseStatus(response, {
        expectedResponse: 201,
        expectedErrorResponses: [422, 500],
      });
  
      if (data.error) { throw new ApiError(data.error) }
  
      return data;
    });
  }

  async getPrefillRequest(config?: AxiosRequestConfig<GetPrefillRequestRequestType>): Promise<GetPrefillRequestResponseType> {
    return this.verifyAuthenticatedRequest().then(async (authHeader: AxiosRequestHeaders) => {
      const response = await this.client.get<GetPrefillRequestResponseType, AxiosResponse<GetPrefillRequestResponseType>, GetPrefillRequestRequestType>(
        ENDPOINTS.GET_PREFILL_REQUEST, { ...config, headers: { ...config?.headers, ...authHeader } }
      );
  
      const { data } = verifyResponseStatus(response, {
        expectedResponse: [200, 201, 204, 400],
      });
  
      return data;
    });
  }

  async getProfileRules(config?: AxiosRequestConfig<GetProfileRulesRequestType>): Promise<Omit<GetProfileRulesResponseType, 'error'>> {
    return this.verifyAuthenticatedRequest().then(async (authHeader: AxiosRequestHeaders) => {
      const { data } = await this.client.get<GetProfileRulesResponseType, AxiosResponse<GetProfileRulesResponseType>, GetProfileRulesRequestType>(
        ENDPOINTS.GET_PROFILE_RULES_CONTEXT, { ...config, headers: { ...config?.headers, ...authHeader } }
      );
  
      if (data.error) { throw new ApiError(data.error) }
  
      return data;
    });
  }

  async getSupportedMarkets(config?: AxiosRequestConfig<GetSupportedMarketsRequestType>): Promise<GetSupportedMarketsResponseType> {
    return this.verifyAuthenticatedRequest().then(async (authHeader: AxiosRequestHeaders) => {
      const { data } = await this.client.get<GetSupportedMarketsResponseType, AxiosResponse<GetSupportedMarketsResponseType>, GetSupportedMarketsRequestType>(
        ENDPOINTS.GET_SUPPORTED_MARKETS, { ...config, headers: { ...config?.headers, ...authHeader } }
      );
  
      return data;
    });
  }

  private verifyAuthenticatedRequest(): Promise<AxiosRequestHeaders> {
    return new Promise((resolve, reject) => {
      const token = getToken();
      if (this.apiKey && token) {
        resolve({ AUTH_TOKEN: token });
      } else {
        reject(new UnauthorizedError());
      }
    });
  }
};

type ClientType = typeof Client;
export type { ClientType };
export default Client;