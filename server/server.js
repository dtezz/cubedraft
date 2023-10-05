const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = 3000;

const userController = require('./controllers/userController.js');
const sessionController = require('./controllers/sessionController.js');
const cookieController = require('./controllers/cookieController.js');

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(201).send('it works!');
  }
);

app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(202).send('it works!');
  }
);

app.get(
  '/favorites',
  sessionController.isLoggedIn,
  userController.getFavorites,
  (req, res) => {
    return res.status(200).json(res.locals.favorites);
  }
);

app.post(
  '/favorites',
  sessionController.isLoggedIn,
  userController.updateFavorites,
  (req, res) => {
    return res.status(202).send('it works!');
  }
);

// app.get('*', (req, res) => {
//   return res.redirect('/');
// });

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
