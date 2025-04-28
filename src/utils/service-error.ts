interface ServiceErrorOptions {
  log?: boolean;
}

export enum ServiceErrorType {
  NotFound,
  CannotProceed,
}

export class ServiceError extends Error {
  readonly options: ServiceErrorOptions | undefined;
  readonly type: ServiceErrorType;

  constructor(
    name: string,
    type: ServiceErrorType,
    options?: ServiceErrorOptions,
  ) {
    super();
    this.name = name;
    this.type = type;
    this.options = options;
  }
}
