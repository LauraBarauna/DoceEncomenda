const db = require('../database/db');

function ClientModel() {

  this.createClient = async function (firstName, lastName, email, password, age) {

    if (!firstName || !lastName || !email || !password || !age) {
      throw new Error('All fields are required.');
    }

    const sql = 'INSERT INTO clients (first_name, last_name, email, password, age) VALUES (?, ?, ?, ?, ?)';

    try {
      const result = await db.execute(sql, [firstName, lastName, email, password, age]);
      return result;
    } catch (error) {
      throw new Error('Error creating client: ' + error.message);
    }
  };

  this.showAllClients = async function () {

    const sql = 'SELECT client_id, first_name, last_name, email, age, created_at, updated_at FROM clients';

    try {
      const [clients] = await db.execute(sql);
      return clients;
    } catch (error) {
      throw new Error('Error displaying clients: ' + error.message);
    }
  }

  this.showOneClient = async function (clientId) {
    const sql = 'SELECT client_id, first_name, last_name, email, age, created_at, updated_at FROM clients WHERE client_id = ?';

    try {
      const client = await db.execute(sql, [clientId]);
      return client;
    } catch (error) {
      throw new Error(`Error displaying client ${clientId}: ${error.message}`);
    }

  };

  this.showClientPassword = async function (clientId) {
    const sql = 'SELECT password FROM clients WHERE client_id = ?';

    try {
      const password = await db.execute(sql, [clientId]);
      return password;
    } catch (error) {
      throw new Error(`Error displaying client ${clientId} password: ${error.message}`);
    }

  };

  this.updateClient = async function (clientId, data) {
    try {
      const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
      const values = Object.values(data);
      values.push(clientId);

      const query = `UPDATE clients SET ${fields} WHERE client_id = ?`;
      const [newClientInfos] = await db.query(query, values);

      return newClientInfos;
    } catch (error) {
      throw new Error(`Error updating client ${clientId}: ${error.message}`);
    }
  }

  this.deleteClient = async function (clientId) {
    const sql = 'DELETE FROM clients WHERE client_id = ?';
    try {
      const [result] = await db.execute(sql, [clientId]);
      return result
    } catch (error) {
      throw new Error(`Model: Error deleting client ${clientId}: ${error.message}`);
    }
  }

};

const clientModel = new ClientModel();

module.exports = clientModel;
