import HttpError from './HttpError.js';

class ValidationError extends HttpError {
  constructor(errors = []) {
    super('Validation Error', 422)
    console.log(errors);
    this.errors = errors.map(err => ({
      field: err.field || 'unknown_field', // default to 'unknown_field' if param is not defined
      message: err.message || 'Invalid input', // default message if msg is not defined
    }));
  }
}

export default ValidationError;
