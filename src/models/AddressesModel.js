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

  this.showClientAddresses = async function (clientId) {
    const sql = "SELECT * FROM addresses WHERE client_id = ?";

    try {
      const [result] = await db.execute(sql, [clientId]);
      return result;
    } catch (error) {
      throw new Error(`Error displaying ${clientId} addresses` + error.message);
    }

  }

  this.deleteAddresses = async function (addressId) {
    const sql = "DELETE FROM addresses WHERE address_id = ?";

    try {
      const [result] = await db.execute(sql, [addressId]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting ${addressId} addresses` + error.message);
    }

  }
};

const adressesModel = new AdressesModel();
module.exports = adressesModel;
