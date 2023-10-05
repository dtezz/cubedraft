const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('__________test');
  try {
    // console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        log: 'Missing username or password in userController.createUser',
        status: 400,
        messgae: { err: 'username and password required' },
      });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.locals.userId = user._id;
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.createUser',
      messgae: { err: 'Something went wrong! Whoops!' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  // console.log(username, password);

  try {
    const user = await User.find({ username: username });
    if (!user) {
      return next({
        log: 'invalid username in userController.verifyUser',
        status: 401,
        message: { err: 'Invalid username or password' },
      });
    } else {
      try {
        const result = await bcrypt.compare(password, user[0].password);
        if (!result) {
          return next({
            log: 'invalid password in userController.verifyUser',
            status: 401,
            message: { err: 'Invalid username or password' },
          });
        } else {
          res.locals.userID = user[0]._id;
          return next();
        }
      } catch (err) {
        return next({
          log: 'Error in userController.verifyUser',
          messgae: { err: 'Something went wrong! Whoops!' },
        });
      }
    }
  } catch (err) {
    return next({
      log: 'Error in userController.verifyUser',
      messgae: { err: 'Something went wrong! Whoops!' },
    });
  }
};

module.exports = userController;
