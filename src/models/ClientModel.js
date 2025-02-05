const db = require('../database/db');

function ClientModel() {
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
  }
}

const clientModel = new ClientModel();

module.exports = clientModel;

