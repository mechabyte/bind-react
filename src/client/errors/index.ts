import ApiError from '@embedded-bind/client/errors/ApiError';
import ExpectedErrorResponseStatus from '@embedded-bind/client/errors/ExpectedErrorResponseStatus';
import UnexpectedErrorResponseStatus from '@embedded-bind/client/errors/UnexpectedErrorResponseStatus';
import UnauthorizedError from '@embedded-bind/client/errors/UnauthorizedError';

type ClientError = ApiError | ExpectedErrorResponseStatus | UnexpectedErrorResponseStatus | UnauthorizedError;

export type {
  ClientError,
};

export {
  ApiError,
  ExpectedErrorResponseStatus,
  UnexpectedErrorResponseStatus,
  UnauthorizedError,
}