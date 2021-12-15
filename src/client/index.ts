import type { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
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

class Client {
  apiKey: string;

  authorized = false;

  client: Axios;

  persistToken: (token: string) => void;

  private userToken: string | undefined;

  constructor(apiKey: string, apiUrl: string, config: { getToken: () => string | null, persistToken: (token: string) => any }) {
    this.apiKey = apiKey;
    this.client = createAxiosClient({
      baseURL: apiUrl,
    });

    this.persistToken = config.persistToken;

    this.client.interceptors?.request.use((req) => {
      const token = config.getToken();
      if (token && req.headers?.authorization) {
        req.headers.authorization = token;
      }
      return req;
    })
  }

  async authorize(config: AxiosRequestConfig<AuthorizeBindProfileRequestType>): Promise<Omit<AuthorizeBindProfileResponseType, 'error'>> {
    const { data } = await this.client.post<AuthorizeBindProfileRequestType, AxiosResponse<AuthorizeBindProfileResponseType>>(
      ENDPOINTS.AUTHORIZE_BIND_PROFILE, config,
    );

    if (data.error) { throw new Error(data.error) }

    if (data.accessToken) { this.setUserAuthorization(data.accessToken) };

    return data;
  }

  async createPrefillRequest(config: AxiosRequestConfig<CreatePrefillRequestRequestType>): Promise<Omit<CreatePrefillRequestResponseType, 'error'>> {
    await this.verifyAuth();

    const response = await this.client.post<CreatePrefillRequestRequestType, AxiosResponse<CreatePrefillRequestResponseType>>(
      ENDPOINTS.CREATE_PREFILL_REQUEST, config,
    );

    const { data } = verifyResponseStatus(response, {
      expectedResponse: 201,
      expectedErrorResponses: [422, 500],
    });

    if (data.error) { throw new Error(data.error) }

    return data;
  }

  async getPrefillRequest(config: AxiosRequestConfig<GetPrefillRequestRequestType>): Promise<GetPrefillRequestResponseType> {
    await this.verifyAuth();

    const response = await this.client.get<GetPrefillRequestRequestType, AxiosResponse<GetPrefillRequestResponseType>>(
      ENDPOINTS.GET_PREFILL_REQUEST, config
    );

    const { data } = verifyResponseStatus(response, {
      expectedResponse: [200, 201, 204, 400],
    });

    return data;
  }

  async getProfileRules(config: AxiosRequestConfig<GetProfileRulesRequestType>): Promise<Omit<GetProfileRulesResponseType, 'error'>> {
    await this.verifyAuth();

    const { data } = await this.client.get<GetProfileRulesRequestType, AxiosResponse<GetProfileRulesResponseType>>(
      ENDPOINTS.GET_PROFILE_RULES_CONTEXT, config
    );

    if (data.error) { throw new Error(data.error) }

    return data;
  }

  async getSupportedMarkets(config: AxiosRequestConfig<GetSupportedMarketsRequestType>): Promise<GetSupportedMarketsResponseType> {
    await this.verifyAuth();
    
    const { data } = await this.client.get<GetSupportedMarketsRequestType, AxiosResponse<GetSupportedMarketsResponseType>>(
      ENDPOINTS.GET_SUPPORTED_MARKETS, config
    );

    return data;
  }

  clientRequestInterceptor(req: AxiosRequestConfig) {
    if (this.userToken && req.headers?.authorization) {
      req.headers.authorization = this.userToken;
    }
    return req;
  }

  setUserAuthorization(token: string) {
    this.persistToken(token);
    this.userToken = token;
    this.authorized = true;
  }

  private verifyAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.authorized) {
        resolve();
      } else {
        reject(new UnauthorizedError());
      }
    });
  }
}

export default Client;