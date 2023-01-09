class HttpError extends Error {
    constructor(code) {
      super();
      this.code = code;
    }
  }
  
  module.exports = HttpError;