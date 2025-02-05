const clientModel = require('../models/ClientModel');

function Client() {

    this.CreateClient = async function (res, req) {
        const {first_name, last_name, email, password, age} = req.body;

        try {
          await clientModel.createClient(first_name, last_name, email, password, age);
          res.status(201).json({ message: `Usuário ${email} criado com sucesso!` });
        } catch (error) {
          res.status(500).json({ message: `Erro ao criar usuário ${email} ${error}` });
        }

    }

};

const client = new Client();

module.exports = client;
