const clientModel = require('../models/ClientModel');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

function ClientController() {

  this.store = async function (req, res) {  // Corrected parameter order
    const { first_name, last_name, email, password, age } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      await clientModel.createClient(first_name, last_name, email, hashedPassword, age);
      res.status(201).json({ message: `User ${email} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.index = async function (req, res) {

    try {
      const clients = await clientModel.showAllClients();
      res.status(201).json(clients);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.show = async function (req, res) {

    const client_id = req.client_id;

    try {
      const [client] = await clientModel.showOneClient(client_id);

      if (!client || client.length === 0) {
        return res.status(404).json({ error: `Client ${client_id} not found` });
      }

      return res.status(200).json(client);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  }

  this.update = async function (req, res) {
    try {
      const client_id = req.client_id;
      const { first_name, last_name, email, password, age } = req.body;

      const updatedData = {};
      if (first_name) updatedData.first_name = first_name;
      if (last_name) updatedData.last_name = last_name;
      if (email) updatedData.email = email;
      if (password) updatedData.password = bcrypt.hashSync(password, 8);
      if (age) updatedData.age = age;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      };

      const result = await clientModel.syncClientWithAdmin(client_id, updatedData);
      const doesClientExist = result.affectedRows;

      if(doesClientExist === 0) {
        return res.status(404).json({ error: `Client ${client_id} does not exist` });
      }

      return res.json(result);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  this.delete = async function (req, res) {
    try {
      const client_id = req.client_id;

      const result = await clientModel.deleteClient(client_id);
      const doesClientExist = result.affectedRows;

      if(doesClientExist === 0) {
        return res.status(404).json({ error: `Client ${client_id} does not exist` });
      };

      return res.status(200).json(`Client ${client_id} deleted`);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};

const clientController = new ClientController();

module.exports = clientController;
