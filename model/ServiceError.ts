export class ServiceError extends Error {
  errorList: string | string[];
  statusCode: number;

  constructor(
    message: string,
    statusCode: number,
    errorList: string | string[]
  ) {
    super(message);
    this.errorList = errorList;
    this.statusCode = statusCode;
  }
}
