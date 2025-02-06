const clientModel = require('../models/ClientModel');

function ClientController() {

  this.store = async function (req, res) {  // Corrigido a ordem dos parâmetros
    const { first_name, last_name, email, password, age } = req.body;

    try {
      await clientModel.createClient(first_name, last_name, email, password, age);
      res.status(201).json({ message: `Usuário ${email} criado com sucesso!` });
    } catch (error) {
      res.status(500).json({ message: `Erro ao criar usuário ${email}: ${error.message}` }); // Erro mais detalhado
    }

  };

  this.index = async function (req, res) {

    try {
      const clients = await clientModel.showAllClients();
      res.status(201).json(clients);
    } catch (error) {
      res.status(500).json({ message: `Erro ao listas usuários: ${error.message}` }); // Erro mais detalhado
    }

  };

  this.show = async function (req, res) {

    const { client_id } = req.params;

    try {
      const client = await clientModel.showOneClient(client_id);
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ message: `Erro ao listar usuário ${client_id}: ${error.message}` }); // Erro mais detalhado
    }

  }

};

const clientController = new ClientController();

module.exports = clientController;
