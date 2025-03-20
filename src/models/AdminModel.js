const db = require('../database/db');
const clientModel = require('./ClientModel');
const AdminClientModel = require('./AdminClientModel');


function AdminModel() {

  this.getClientId = async function (adminId) {
    const sql = 'SELECT client_id FROM admins WHERE admin_id = ?';

    try {

      const [result] = await db.execute(sql, [adminId]);

      return result[0].client_id

    } catch (error) {
      throw new Error(`Error getting client_id from admin ${adminId}: ` + error.message);
    }
  }

  this.createAdmin = async function (firstName, lastName, email, password, age, clientId) {
    const sql = 'INSERT INTO admins (first_name, last_name, email, password, age, client_id) VALUES (?, ?, ?, ?, ?, ?)';

    try {
      const result = await db.execute(sql, [firstName, lastName, email, password, age, clientId]);
      return result;
    } catch (error) {
      throw new Error('Error creating admin: ' + error.message);
    }
  };

  this.showAllAdmins = async function () {
    const sql = 'SELECT admin_id, first_name, last_name, email, age, client_id FROM admins';

    try {

      const result = await db.execute(sql);
      return result;

    } catch (error) {
      throw new Error('Error showing admins: ' + error);
    }
  };

  this.showOneAdmin = async function (adminId) {
    const sql = 'SELECT admin_id, first_name, last_name, email, age, client_id FROM admins WHERE admin_id = ?';

    try {

      const result = await db.execute(sql, [adminId]);
      return result;

    } catch (error) {
      throw new Error(`Error showing ${adminId} admin: ${error}`);
    }

  };

  this.deleteAdmin = async function (adminId) {
    const sql = 'DELETE FROM admins WHERE admin_id = ?';

    try {

      const result = await db.execute(sql, [adminId]);
      return result;

    } catch (error) {
      throw new Error(`Error deleting ${adminId} admin: ${error}`);
    }

  };

  this.updateAdmin = async function (adminId, data) {
    try {
      const fields = Object.keys(data).map((key) => `${key} = ?`).join(", ");
      const values = Object.values(data);
      values.push(adminId);

      const query = `UPDATE admins SET ${fields} WHERE admin_id = ?`;
      const newAdminsInfos = await db.query(query, values);

      return newAdminsInfos;
    } catch (error) {
      throw new Error(`Error updating ${adminId} admin: ${error}`);
    }
  };

  this.syncAdminWithClient = async function (adminId, data) {
    return AdminClientModel.updateAdminAndClient(adminId, data);
  };

}

const adminModel = new AdminModel();
module.exports = adminModel;
