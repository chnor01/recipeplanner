const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token, authorization denied');

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user.id;
    next();
  } catch (err) {
    res.status(401).send('Token is not valid');
  }
};
