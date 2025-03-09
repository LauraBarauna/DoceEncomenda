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

  };

  this.isClientAdmin = async function (clientId) {
    const sql = 'SELECT admin_id, client_id FROM admins WHERE client_id = ?';

    try {
      const result = await db.execute(sql, [clientId]);
      return result;
    } catch (error) {
      throw new Error(`Error verifying client ${clientId} is a Admin: ${error.message}`);
    }

  };

  this.isAdminClient = async function (adminId) {
    const sql = 'SELECT client_id FROM admins WHERE admin_id = ?';

    try {
      const result = await db.execute(sql, [adminId]);
      return result;
    } catch (error) {
      throw new Error(`Error verifying admin ${adminId} is a Client: ${error.message}`);
    }

  }

};

const authenticationModel = new AuthenticationModel();

module.exports = authenticationModel;
