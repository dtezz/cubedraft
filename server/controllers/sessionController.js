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

module.exports = sessionController;
