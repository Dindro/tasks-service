const jwt = require('jsonwebtoken');
const config = require('./index');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ success: false, message: 'Нет токена' });
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ success: false, message: 'Не удалось распознать токен' });
    }

    req.userId = decoded.id;
    next();
  });
}