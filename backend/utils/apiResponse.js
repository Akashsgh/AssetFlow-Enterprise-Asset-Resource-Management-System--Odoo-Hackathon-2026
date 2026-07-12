/**
 * Standardized API response helpers
 */
export const successResponse = (res, data, statusCode = 200, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, message = 'Server Error', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};
