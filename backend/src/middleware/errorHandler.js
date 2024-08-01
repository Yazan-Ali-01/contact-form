import HttpError from '../errors/HttpError.js';
import ValidationError from '../errors/ValidationError.js';
import { sendErrorResponse } from '../utils/responseUtils.js';

const errorHandler = (err, req, res, next) => {
  console.log('got error', err);
  if (err instanceof ValidationError) {
    return sendErrorResponse(res, err.message, 422, err.errors);
  } else if (err instanceof HttpError) {
    return sendErrorResponse(res, err.message, err.statusCode);
  } else {
    console.error(err);
    return sendErrorResponse(res);
  }
};

export default errorHandler;
