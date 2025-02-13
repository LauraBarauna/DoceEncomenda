const db = require('../database/db');

function AdressesModel() {

  this.doesClientHaveThreeAddresses = async function (clientId) {
    const sql = 'SELECT COUNT(*) AS TOTAL FROM addresses WHERE client_id = ?';

    try {
      const [result] = await db.execute(sql, [clientId]);
      return result[0].TOTAL >= 3;
    } catch (error) {
      throw new Error(`Error verifying how many addresses client ${clientId} has: ${error.message}`);
    }
  }


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

  this.deleteAddresses = async function (clientId, addressId) {
    const sql = "DELETE FROM addresses WHERE client_id = ? AND address_id = ?";

    try {
      const [result] = await db.execute(sql, [clientId, addressId]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting ${addressId} addresses` + error.message);
    }
  }

  this.updateAddress = async function (clientId, addressId, data) {

    try {
      const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
      const values = Object.values(data);
      values.push(clientId, addressId);

      const sql = `UPDATE addresses SET ${fields} WHERE client_id = ? AND address_id = ?`;
      const newAddressInfos = await db.query(sql, values);

      return newAddressInfos;

    } catch (error) {
      throw new Error(`Error updating ${addressId} addresses` + error.message);
    };

  }

};

const adressesModel = new AdressesModel();
module.exports = adressesModel;
