const authenticationModel = require('../models/AuthenticationModel');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

function AuthenticationController() {

  this.clientLogin = async function (req,res) {
    const {email, password} = req.body;

    if(!email || !password) return res.status(500).json({ error: `E-mail or Password not sent!`});

    try {

      const [result] = await authenticationModel.findClientsCredentialsByEmail(email);


      if(!result || result.length === 0 ) return res.status(401).json({ error: `Invalid E-mail!`});

      const validPassword = await bcrypt.compare(password, result[0].password);
      if (!validPassword) return res.status(401).json({ error: "Invalid password" });

      const token = jwt.sign({ client_id: result[0].client_id }, process.env.JWT_TOKEN, { expiresIn: "1h" });

      res.json({ token });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

};

const authenticationController = new AuthenticationController();
module.exports = authenticationController;
