const authenticationModel = require('../models/AuthenticationModel');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const adminModel = require('../models/AdminModel');

function AuthenticationController() {

  this.clientLogin = async function (req,res) {
    const {email, password} = req.body;

    if(!email || !password) return res.status(500).json({ error: `E-mail or Password not sent!`});

    try {

      const [result] = await authenticationModel.findClientsCredentialsByEmail(email);


      if(!result || result.length === 0 ) return res.status(401).json({ error: `Invalid E-mail!`});

      const validPassword = await bcrypt.compare(password, result[0].password);
      if (!validPassword) return res.status(401).json({ error: "Invalid password" });

      const [clientAdmin] = await authenticationModel.isClientAdmin(result[0].client_id);

      if(!clientAdmin || clientAdmin.length === 0) {
        const token = jwt.sign({ client_id: result[0].client_id }, process.env.JWT_TOKEN_CLIENT, { expiresIn: "24h" });

        return res.json({ token });
      }

      const tokenClientAdmin = jwt.sign({ client_id: result[0].client_id, admin_id: clientAdmin[0].admin_id }, process.env.JWT_TOKEN_CLIENT_ADMIN, { expiresIn: "24h" });
      return res.json({ tokenClientAdmin });


    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.adminLogin = async function (req, res) {

    const {email, password} = req.body;

    if(!email || !password) return res.status(500).json({ error: `E-mail or Password not sent!`});

    try {

      const [result] = await authenticationModel.findAdminsCredentialsByEmail(email);

      if(!result || result.length === 0 ) return res.status(401).json({ error: `Invalid E-mail!`});

      const validPassword = await bcrypt.compare(password, result[0].password);
      if (!validPassword) return res.status(401).json({ error: "Invalid password" });

      const [adminClient] = await authenticationModel.isAdminClient(result[0].admin_id);

      if(adminClient[0].client_id === null) {
        const token = jwt.sign({ admin_id: result[0].admin_id }, process.env.JWT_TOKEN_ADMIN, { expiresIn: "24h" });

        return res.json({ token });
      }

      const tokenAdminClient = jwt.sign({ admin_id: result[0].admin_id, client_id: adminClient[0].client_id }, process.env.JWT_TOKEN_CLIENT_ADMIN, { expiresIn: "24h" });
      return res.json({ tokenAdminClient });


    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  }

};

const authenticationController = new AuthenticationController();
module.exports = authenticationController;
