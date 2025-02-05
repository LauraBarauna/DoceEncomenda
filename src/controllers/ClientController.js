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

};

const clientController = new ClientController();

module.exports = clientController;
