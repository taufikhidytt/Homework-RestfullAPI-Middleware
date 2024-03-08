const jwt = require("jsonwebtoken");
const { exit } = require("process");

const tokenRahasia = "tokenIniRahasia";

const signToken = (data) => {
  const token = jwt.sign(data, tokenRahasia, { expiresIn: "1h" });
  return token;
};

const verifyToken = (token) => {
  if (!token) {
    const data = "invalid";
    return data;
  } else {
    const data = jwt.verify(token, tokenRahasia);
    return data;
  }
};

module.exports = { signToken, verifyToken };
