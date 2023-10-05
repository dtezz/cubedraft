const cookieController = {};
const User = require('../models/userModel');

cookieController.setSSIDCookie = (req, res, next) => {
  res.cookie('ssid', res.locals.userId, { httpOnly: true });
  return next();
};

module.exports = cookieController;
