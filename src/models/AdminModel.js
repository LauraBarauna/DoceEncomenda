const db = require('../database/db');

function AdminModel() {

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
      throw new Error('Error showing admins: ' +error);
    }


  }



}

const adminModel = new AdminModel();
module.exports = adminModel;
