function ResponseTemplate(data, message, error, status) {
  return {
    status,
    message,
    error,
    data,
  };
}

module.exports = ResponseTemplate;
