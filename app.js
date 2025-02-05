const express = require('express');
const bodyParser = require('body-parser');

function App () {
  this.init = function () {
    const app = express();
    this.routes();
  }

  this.middlewares = function() {
    app.use(bodyParser.json());
  }

  this.routes = function() {
    app.use('/');
  }

};

const app = new App();

module.exports = app.init();


