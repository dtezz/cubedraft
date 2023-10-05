const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  try {
    // get the unique id from the create user middleware function
    const id = res.locals.userId;

    // use session.create to add a session document to the session collection
    Session.create({ cookieId: id }).then((data) => {
      // console.log('Session Created: ', data);
      next();
    });
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
