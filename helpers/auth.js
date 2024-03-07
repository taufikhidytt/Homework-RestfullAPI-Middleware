const jwt = require('jsonwebtoken');

const tokenRahasia = 'tokenIniRahasia';

const signToken = (data) => {
  const token = jwt.sign(data, tokenRahasia, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, tokenRahasia);
  return data;
};

module.exports = { signToken, verifyToken };