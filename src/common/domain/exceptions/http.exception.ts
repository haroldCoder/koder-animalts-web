/**
 * Base HTTP Exception representing non-2xx API responses.
 */
export class HttpException extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly payload?: any
  ) {
    super(message);
    this.name = 'HttpException';
    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Exception representing network connectivity issues, timeouts, or DNS failures.
 */
export class NetworkException extends Error {
  constructor(
    message: string,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'NetworkException';
    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
