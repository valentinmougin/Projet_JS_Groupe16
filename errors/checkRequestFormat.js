const BadRequestError = require("../errors/BadRequestError");

module.exports = function checkRequestFormat(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.headers["content-type"]?.startsWith("application/json")) {
      throw new BadRequestError();
    }
  }
  next();
};