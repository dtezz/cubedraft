const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
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
  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController.createUser',
      status: 400,
      messgae: { err: 'username and password required' },
    });
  }
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
          res.locals.userId = user[0]._id;
          // console.log(res.locals.userId);
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

userController.updateFavorites = async (req, res, next) => {
  const { cardName, image } = req.body;
  try {
    const id = req.cookies.ssid;
    const user = await User.findById(id);
    user.favorites.push({ cardName: cardName, image: image });
    user.save();
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.getFavorites = async (req, res, next) => {
  try {
    const id = req.cookies.ssid;
    const user = await User.findById(id);
    // console.log(user.favorites);
    res.locals.favorites = user.favorites;
    return next();
  } catch (err) {
    return next({
      log: 'error in get favorites middleware',
      message: { err: 'could not get favorites' },
    });
  }
};

module.exports = userController;
