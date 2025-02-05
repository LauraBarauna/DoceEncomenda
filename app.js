const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./src/routes/clientRoutes');

function App () {
  this.init = function () {
    const app = express();
    this.routes();
  }

  this.middlewares = function() {
    app.use(bodyParser.json());
  }

  this.routes = function() {
    app.use('/clients', clientRoutes);
  }

};

const app = new App();

module.exports = app.init();


