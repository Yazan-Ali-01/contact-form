export const sendSuccessResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};


export const sendErrorResponse = (res, message = 'An error occurred', statusCode = 500, errors = []) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};