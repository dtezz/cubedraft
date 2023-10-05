const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = async (req, res, next) => {
  // console.log('createUser called');
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

module.exports = userController;
