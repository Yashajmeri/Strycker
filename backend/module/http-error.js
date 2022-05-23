class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add message property
    this.code = errorCode; //add error code property
  }
}
module.exports = HttpError;
