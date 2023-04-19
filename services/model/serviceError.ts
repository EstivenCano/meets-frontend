export class ServiceError {
  message: string[] = [];
  statusCode: number;
  error: string;

  constructor(error: ServiceError) {
    this.message = error.message;
    this.statusCode = error.statusCode;
    this.error = error.error;
  }
}
