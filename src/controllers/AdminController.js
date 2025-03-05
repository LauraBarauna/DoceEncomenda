const adminModel = require('../models/AdminMode');
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

          console.log(firstName, lastName, email, password, age)

        }
      } else {
        age = age ? age : null;
        client_id = client_id ? client_id : null;

        if (!firstName || !lastName || !email || !password) {
          return res.status(500).json({ error: `Fields: First name, last name, emial and password are requerid!` });
        };

        password = bcrypt.hashSync(password, 8);
      }

      await adminModel.createAdmin(firstName, lastName, email, password, age, client_id);
      res.status(201).json({ message: `Admin ${email} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


}

const adminController = new AdminController();
module.exports = adminController;
