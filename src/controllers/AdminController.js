const adminModel = require('../models/AdminModel');
const clientModel = require('../models/ClientModel');

var bcrypt = require('bcryptjs');


function AdminController() {

  this.store = async function (req, res) {
    let { firstName, lastName, email, password, age, client_id } = req.body;

    try {

      if (client_id) {
        const [client] = await clientModel.showOneClient(client_id);

        if (!client || client.length === 0) {
          return res.status(404).json({ message: `Client ${client_id} does not exist!` });
        } else {

          const [clientPassword] = await clientModel.showClientPassword(client_id);

          firstName = client[0].first_name;
          lastName = client[0].last_name;
          email = client[0].email;
          password = clientPassword[0].password;
          age = client[0].age;

        }
      } else {
        age = age ? age : null;
        client_id = client_id ? client_id : null;

        if (!firstName || !lastName || !email || !password) {
          return res.status(500).json({ error: `Fields: First name, last name, email and password are requeried!` });
        };

        password = bcrypt.hashSync(password, 8);
      }

      await adminModel.createAdmin(firstName, lastName, email, password, age, client_id);
      return res.status(201).json({ message: `Admin ${email} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  this.index = async function (req, res) {

    try {

      const [admins] = await adminModel.showAllAdmins();
      return res.status(201).json(admins);


    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.show = async function (req, res) {

    const admin_id = req.admin_id;

    try {

      const [result] = await adminModel.showOneAdmin(admin_id);

      if(!result || result.length === 0) {
        return res.status(404).json({ error: `Admin ${admin_id} not found` });
      };

      return res.status(200).json(result);


    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.delete = async function (req, res) {
    const admin_id = req.admin_id;

    try {

      const [result] = await adminModel.deleteAdmin(admin_id);
      const doesAdminExist = result.affectedRows;

      if(doesAdminExist === 0) {
        return res.status(404).json({ error: `Admin ${admin_id} does not exist` });
      };

      return res.status(200).json(`Admin ${admin_id} deleted`);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


}

const adminController = new AdminController();
module.exports = adminController;
