const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "xghfcyuiotèr§ueydsdhgfxcgvjhbj";

module.exports = function (req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) return res.sendStatus(401);

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") return res.sendStatus(401);

  const user = jwt.verify(token, SECRET);
  req.user = user;
  next();
};