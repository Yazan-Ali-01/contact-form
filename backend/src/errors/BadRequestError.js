import HttpError from './HttpError.js';

class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export default BadRequestError;