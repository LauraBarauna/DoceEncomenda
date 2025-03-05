const adminModel = require('../models/AdminMode');
var bcrypt = require('bcryptjs');


function AdminController() {

  this.store = async function (req, res) {
    let { firstName, lastName, email, password, age, clientId } = req.body;

    age = age ? age : null;
    clientId = clientId ? clientId : null;

    if (!firstName || !lastName || !email || !password) {
      return res.status(500).json({ error: `Fields: First name, last name, emial and password are requerid!` });
    };

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      await adminModel.createAdmin(firstName, lastName, email, hashedPassword, age, clientId);
      res.status(201).json({ message: `Admin ${email} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


}

const adminController = new AdminController();
module.exports = adminController;
