const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./src/routes/clientRoutes');
const addressesRoutes = require('./src/routes/addressesRoutes');
const ordersRoutes = require('./src/routes/ordersRoutes');
const authenticationRoutes = require('./src/routes/authenticationRoutes');

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
    this.app.use('/clients', clientRoutes);
    this.app.use('/clients', clientRoutes);
    this.app.use('/clients', clientRoutes);

    this.app.use('/addresses', addressesRoutes);
    this.app.use('/addresses', addressesRoutes);
    this.app.use('/addresses', addressesRoutes);
    this.app.use('/addresses', addressesRoutes);

    this.app.use('/orders', ordersRoutes);
    this.app.use('/orders', ordersRoutes);
    this.app.use('/orders', ordersRoutes);
    this.app.use('/orders/update', ordersRoutes);

    this.app.use('/login', authenticationRoutes);

  }

  // Chama init ao criar a instância de App
  this.init();
}

// Instancia a aplicação
const appInstance = new App();

module.exports = appInstance.app;
