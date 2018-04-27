const jwt = require('jsonwebtoken');
const config = require('./index');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {

    // если нет токена
    next();
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      req.success = false;
    }
    else {
      req.userId = decoded.id;
    }
    next();
  });
}