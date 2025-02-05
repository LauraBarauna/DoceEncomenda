const db = require('../database/db');

function ClientModel() {
  this.createClient = async function (first_name, last_name, email, password, age) {
    const sql = 'INSERT INTO clients (first_name, last_name, email, password, age) VALUES (?, ?, ?, ?, ?)';
    return db.execute(sql, [first_name, last_name, email, password, age]);
  }
}

const clientModel = new ClientModel();

module.exports = clientModel();

