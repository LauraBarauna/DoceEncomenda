const clientModel = require('../models/ClientModel');
var bcrypt = require('bcryptjs');

function ClientController() {

  this.store = async function (req, res) {  // Corrigido a ordem dos parâmetros
    const { first_name, last_name, email, password, age } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      await clientModel.createClient(first_name, last_name, email, hashedPassword, age);
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
      const [client] = await clientModel.showOneClient(client_id);

      if(!client || client.length === 0) {
        return res.status(404).json(`Usuário ${client_id} não encontrado`);
      }

      return res.status(200).json(client);

    } catch (error) {
      console.error('Erro:', error); // Log para depuração
      res.status(500).json({ message: `Erro ao listar usuário ${client_id}: ${error.message}` }); // Erro mais detalhado
    }

  }

  this.update = async function (req, res) {
    const {client_id} = req.params;
    const { first_name, last_name, email, password, age } = req.body;

    if(!client || client.length === 0) {
      return res.status(404).json(`Usuário ${client_id} não encontrado`);
    }

    try {
      const clientNewInfos = await clientModel.updateClient(first_name, last_name, email, password, age, client_id);
      return res.status(200).json({
        message: `Cliente ${client_id} atualizado.`,
        newCient: clientNewInfos,
      });
    } catch (error) {
      res.status(500).json({ message: `Erro ao atualizar usuário ${client_id}: ${error.message}` }); // Erro mais detalhado
    }

  }

};

const clientController = new ClientController();

module.exports = clientController;
