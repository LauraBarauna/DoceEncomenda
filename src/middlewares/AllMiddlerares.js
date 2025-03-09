const jwt = require("jsonwebtoken");

function AllMiddlewares() {

  this.authenticateClient = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
      const decodedAdminClient = jwt.verify(token, process.env.JWT_TOKEN_CLIENT_ADMIN);
      req.client_id = decodedAdminClient.client_id;
      req.admin_id = decodedAdminClient.admin_id;
      return next();
    } catch (error) {}

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_CLIENT);
      req.client_id = decoded.client_id;
      return next();
    } catch (err) {}

    return res.status(403).json({ error: "Invalid token for client access" });

  };

  this.authenticateAdmin = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
      const decodeClientAdmin = jwt.verify(token, process.env.JWT_TOKEN_CLIENT_ADMIN);
      req.client_id = decodeClientAdmin.client_id;
      req.admin_id = decodeClientAdmin.admin_id;
      return next();
    } catch (error) {}

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_ADMIN);
      req.admin_id = decoded.admin_id;
      return next();
    } catch (err) {};

    return res.status(403).json({ error: "Invalid token for admin access" });
  };


};

const middlewares = new AllMiddlewares();
module.exports = middlewares;
