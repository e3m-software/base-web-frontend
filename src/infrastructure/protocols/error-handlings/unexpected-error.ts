export class UnexpectedError extends Error {
  constructor() {
    super('Something went wrong. Please try again later.');
    this.name = 'UnexpectedError';
  }
}

export class HttpError extends Error {
  public errorObject: any;
  constructor(object: any) {
    super('Something went wrong. Please try again later.');
    this.name = 'HttpError';
    this.errorObject = object;
  }
}

export class ErrorRequest<T = any> extends Error {
  constructor(
    public data: T = null as any,
    public message = 'Internal server error.',
    public status = 500
  ) {
    super(message);
  }
}
