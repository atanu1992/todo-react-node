const errorHandler = (errorsData) => {
  let errors = {};
  errors.message = 'Something went wrong. Please try again later.';
  let statusCode = errorsData?.response?.status
    ? errorsData.response.status
    : undefined;

  if (statusCode) {
    switch (statusCode) {
      case 422:
        errors.message = errorsData?.response?.data?.errors
          ? errorsData.response.data.errors
          : 'Validation error';
        break;

      case 500:
        errors.message = errorsData.message;
        break;

      default:
        errors.message = errorsData?.response?.data?.error
          ? errorsData.response.data.error
          : 'Something went wrong. Please try again later';
        break;
    }
  } else if (errorsData.code === 'ERR_NETWORK') {
    errors.message = 'API server network error';
  }

  return errors;
};

export default errorHandler;
