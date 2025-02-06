const db = require('../database/db');

function ClientModel() {

  // Verificações

  this.isTableEmpty = async function () {
    const sql = 'SELECT COUNT(*) AS total FROM clients';

    try {
      const [result] = await db.execute(sql);
      return result[0].total === 0;
    } catch (error) {
      throw new Error('Erro ao verificar a tabela: ' + error.message);
    }

  }

  this.createClient = async function (first_name, last_name, email, password, age) {

    if (!first_name || !last_name || !email || !password || !age) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    const sql = 'INSERT INTO clients (first_name, last_name, email, password, age) VALUES (?, ?, ?, ?, ?)';

    try {
      const result = await db.execute(sql, [first_name, last_name, email, password, age]);
      return result;
    } catch (error) {
      throw new Error('Erro ao criar cliente: ' + error.message);
    }
  };

  this.showAllClients = async function () {

    const isEmpty = await this.isTableEmpty();

    if (isEmpty) {
      throw new Error('Nenhum cliente criado na tabela clients"');
    } else {
      const sql = 'SELECT client_id, first_name, last_name, email, age, created_at, updated_at FROM clients';

      try {
        const [clients] = await db.execute(sql);
        return clients;
      } catch (error) {
        throw new Error('Erro ao exibir os clientes: ' + error.message);
      }
    }


  }

};

const clientModel = new ClientModel();

module.exports = clientModel;

