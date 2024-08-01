import HttpError from './HttpError.js';

class AuthenticationError extends HttpError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

export default AuthenticationError;
