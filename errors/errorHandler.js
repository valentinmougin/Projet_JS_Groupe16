const { ValidationError } = require("sequelize");
const HttpError = require("../errors/HttpError");

module.exports = function errorHandler(error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(422).json(
      error.errors.reduce((acc, item) => {
        acc[item.path] = [...(acc[item.path] || []), item.message];
        return acc;
      }, {})
    );
  } else if (error instanceof HttpError) {
    res.sendStatus(error.code);
  } else {
    res.sendStatus(500);
  }
  console.error(error);
};