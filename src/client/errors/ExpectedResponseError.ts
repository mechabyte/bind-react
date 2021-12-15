import ResponseError from "@embedded-bind/client/errors/ResponseError";

class ExpectedResponseError extends ResponseError {
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

export default ExpectedResponseError;
