const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace(/^Bearer*\s*/i, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
