const HttpError = require("./HttpError");

class ForbiddenError extends HttpError {
  constructor() {
    super(403);
  }
}

module.exports = ForbiddenError;