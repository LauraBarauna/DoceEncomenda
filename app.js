const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./src/routes/clientRoutes');

function App() {
  this.app = express();

  // Construtor que inicializa as rotas e middlewares
  this.init = function () {
    this.middlewares();
    this.routes();
  }

  // Configuração dos middlewares
  this.middlewares = function() {
    this.app.use(bodyParser.json());
  }

  // Configuração das rotas
  this.routes = function() {
    this.app.use('/clients/register', clientRoutes);
    this.app.use('/clients/index', clientRoutes);
  }

  // Chama init ao criar a instância de App
  this.init();
}

// Instancia a aplicação
const appInstance = new App();

module.exports = appInstance.app;
