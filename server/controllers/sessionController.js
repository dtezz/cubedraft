const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  try {
    // get the unique id from the create user middleware function
    const id = res.locals.userId;
    const session = await Session.find({ cookieId: req.cookies.ssid });
    if (!session.length) {
      const newSession = await Session.create({ cookieId: id });
    } else {
      return next();
    }
  } catch (err) {
    next(err);
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.ssid) {
      const session = await Session.find({ cookieId: req.cookies.ssid });
      // console.log(session.length);
      if (!session.length) {
        return next({
          log: 'There is not a current session',
          status: 401,
          message: { err: "you ain't authorized pal" },
        });
      }
      return next();
    } else {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = sessionController;
