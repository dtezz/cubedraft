const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const cardRouter = require('./routes/cards.js');

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.use('/cards', cardRouter);

// app.use('*', (req, res) => {
//   return res.status(404).send("This site don't exist foo!");
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