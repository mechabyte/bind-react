import type { AxiosResponse } from 'axios';
import ExpectedErrorResponseStatus from '@embedded-bind/client/errors/ExpectedErrorResponseStatus';
import UnexpectedErrorResponseStatus from '@embedded-bind/client/errors/UnexpectedErrorResponseStatus';

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
    throw new ExpectedErrorResponseStatus({ url: response.config?.url, statusCode: response.status });
  }

  throw new UnexpectedErrorResponseStatus();
}

export default verifyResponseStatus;
