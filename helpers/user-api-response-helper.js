exports.SuccessResponse = (response, status, data) => {
  response.status(status).json({ status: status, data: data });
};

exports.FailedResponse = (response, status, error) => {
  response.status(status).json({ status: status, errors: error });
};
