const db = require('../database/db');

function AuthenticationModel() {

  this.findClientsCredentialsByEmail = async function (email) {
    const sql = 'SELECT password, client_id FROM clients WHERE email = ?';

    try {
      const result = await db.execute(sql, [email]);
      return result;
    } catch (error) {
      throw new Error(`Error finding client's credeantials by ${email}` + error.message);
    }

  };

  this.findAdminsCredentialsByEmail = async function (email) {
    const sql = 'SELECT password, admin_id FROM admins WHERE email = ?';

    try {

      const result = await db.execute(sql, [email]);
      return result;

    } catch (error) {
      throw new Error(`Error finding admin's credeantials by ${email}` + error.message);
    }

  }

};

const authenticationModel = new AuthenticationModel();

module.exports = authenticationModel;
