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

      console.log(`show ${client}`)

      if (!client || client.length === 0) {
        return res.status(404).json(`Usuário ${client_id} não encontrado`);
      }

      return res.status(200).json(client);

    } catch (error) {
      console.error('Erro:', error); // Log para depuração
      res.status(500).json({ message: `Erro ao listar usuário ${client_id}: ${error.message}` }); // Erro mais detalhado
    }

  }

  this.update = async function (req, res) {
    try {
      const { client_id } = req.params;
      const { first_name, last_name, email, password, age } = req.body;

      const dadosAtualizados = {};
      if (first_name) dadosAtualizados.first_name = first_name;
      if (last_name) dadosAtualizados.last_name = last_name;
      if (email) dadosAtualizados.email = email;
      if (password) dadosAtualizados.password = bcrypt.hashSync(password, 8);
      if (age) dadosAtualizados.age = age;


      if (Object.keys(dadosAtualizados).length === 0) {
        return res.status(400).json({ error: "Nenhum campo para atualizar" });
      };

      const resultado = await clientModel.updateClient(client_id, dadosAtualizados);
      const doesClientExist = resultado.affectedRows;


      if(doesClientExist === 0) {
        return res.status(500).json({ error: `Cliente ${client_id} não existe` });
      }

      return res.json(resultado);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  this.delete = async function (client_id) {
    try {
      const deleteClient = await clientModel.deleteClient(client_id);
      console.log(`delete ${deleteClient}`)
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};

const clientController = new ClientController();

module.exports = clientController;
