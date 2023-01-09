const jwt = require("jsonwebtoken");
const SECRET = "jkdejzfrA34GF3Hdhgfxcgv5A3HK5A0";
const createToken = (user) => {
  return jwt.sign(
    {id: user.id,
    },
    SECRET,
    {      expiresIn: "1y",
      algorithm: "HS256",    }
  );
};
