import UnexpectedErrorResponseStatus from "@embedded-bind/client/errors/UnexpectedErrorResponseStatus";

class ExpectedErrorResponse extends UnexpectedErrorResponseStatus {
  constructor({
    url,
    statusCode,
  }: {
    url: string | undefined,
    statusCode: number,
  }) {
    super(`Received an expected error '${statusCode}' at '${url}'`);
  }
};

export default ExpectedErrorResponse;
