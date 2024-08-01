import HttpError from './HttpError.js';

/**
 * Error class for 404 Not Found errors.
 */
class NotFoundError extends HttpError {
  /**
   * Constructs a new NotFoundError instance.
   * @param message - Error message.
   */
  constructor(message = "Resource Not Found.") {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
export default NotFoundError