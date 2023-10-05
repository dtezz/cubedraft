const cookieController = {};
const User = require('../models/userModel');

cookieController.setSSIDCookie = (req, res, next) => {
  // console.log(res.locals.userId);
  res.cookie('ssid', res.locals.userId, { httpOnly: true });
  return next();
};

module.exports = cookieController;
