interface ServiceErrorOptions {
  log?: boolean;
}

export class ServiceError extends Error {
  readonly options: ServiceErrorOptions | undefined;

  constructor(name: string, options?: ServiceErrorOptions) {
    super();
    this.name = name;
    this.options = options;
  }
}
