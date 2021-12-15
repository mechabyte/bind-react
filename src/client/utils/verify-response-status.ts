import type { AxiosResponse } from 'axios';
import ExpectedResponseError from '@embedded-bind/client/errors/ExpectedResponseError';
import ResponseError from '@embedded-bind/client/errors/ResponseError';

interface IVerifyResponseConfig {
  expectedResponse?: number | number[],
  expectedErrorResponses?: number[],
}

function verifyResponseStatus<T>(response: AxiosResponse<T>, {
  expectedErrorResponses = [],
  expectedResponse = 200,
}: IVerifyResponseConfig): AxiosResponse<T> {
  const expectedArr = Array.isArray(expectedResponse) ? expectedResponse : [expectedResponse];
  if (expectedArr.includes(response.status)) {
    return response;
  }

  if (expectedErrorResponses && expectedErrorResponses.includes(response.status)) {
    throw new ExpectedResponseError({ url: response.config?.url, statusCode: response.status });
  }

  throw new ResponseError();
}

export default verifyResponseStatus;
