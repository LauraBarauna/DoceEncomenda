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
  };

  this.showAllClients = async function () {

    const sql = 'SELECT client_id, first_name, last_name, email, age, created_at, updated_at FROM clients';

    try {
      const [clients] = await db.execute(sql);
      return clients;
    } catch (error) {
      throw new Error('Erro ao exibir os clientes: ' + error.message);
    }
  }

  this.showOneClient = async function (client_id) {
    const sql = 'SELECT client_id, first_name, last_name, email, age, created_at, updated_at FROM clients WHERE client_id = ?';

    try {
      const [client] = await db.execute(sql, [client_id]);
      console.log(client)
      return client;
    } catch (error) {
      throw new Error(`Erro ao exibir o cliente ${client_id}: ${error.message}`);
    }

  };

  this.updateClient = async function (client_id, dados) {
    try {
      const campos = Object.keys(dados).map((key) => `${key} = ?`).join(", ");
      const valores = Object.values(dados);
      valores.push(client_id);

      const query = `UPDATE clients SET ${campos} WHERE client_id = ?`;
      const [newClientInfos] = await db.query(query, valores);

      return newClientInfos;
    } catch (error) {
      throw new Error(`Erro ao exibir o cliente ${client_id}: ${error.message}`);
    }
  }

  this.deleteClient = async function (client_id) {
    const sql = 'DELETE FROM clients WHERE client_id = ?';
    try {
      const [result] = await db.execute(sql, [client_id]);
      return result
    } catch (error) {
      throw new Error(`Model: Erro ao deletar o cliente ${client_id}: ${error.message}`);
    }
  }

};



const clientModel = new ClientModel();

module.exports = clientModel;

