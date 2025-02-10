const db = require('../database/db');

function AdressesModel() {
  this.createAddress = async function (label, street, city, state, complement, number, cep, phone, clientId) {
    const sql = 'INSERT INTO addresses (label, street, city, state, complement, number, cep, phone, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      const result = await db.execute(sql, [label, street, city, state, complement, number, cep, phone, clientId]);
      return result;
    } catch (error) {

      if(error.code === "ER_NO_REFERENCED_ROW_2") {
        throw new Error(`Client ${clientId} does not exist!`);
      }

      throw new Error('Error creating address: ' + error.message);
    }

  }
};

const adressesModel = new AdressesModel();
module.exports = adressesModel;
