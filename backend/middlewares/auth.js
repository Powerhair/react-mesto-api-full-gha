const jwt = require('jsonwebtoken');
const Needauthorized = require('../errors/Needauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let payload;

  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Needauthorized('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key-dev');
  } catch (err) {
    return next(new Needauthorized('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
