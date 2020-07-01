'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const app = express();
const connection = require('./server/database/index');
const port = process.env.PORT || 6333;

require('dotenv').config();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use('/item-precos', require('./server/routers/ItemPrecosRouter'));
app.use('/auth', require('./server/routers/Auth'));

connection
  .authenticate()
  .then(e => {
    console.log(chalk.yellow.underline(`=>Database connected to the port<=`));
  })
  .catch((error, err) => {
    console.log('Not connected, Error:', error);
  });

app.listen(port, error => {
  if (error) {
    console.error(chalk.red(`Failed to start app on port: ${port}`, error));
  } else {
    console.log(chalk.blue.underline(`=> App started at the port:${port} <=`));
  }
});
