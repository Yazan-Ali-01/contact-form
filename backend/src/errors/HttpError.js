class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
