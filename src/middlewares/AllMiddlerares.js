const jwt = require("jsonwebtoken");

function AllMiddlewares() {

  this.authenticateClient = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_CLIENT);
      req.client_id = decoded.client_id;
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid token" });
    }
  };

  this.authenticateAdmin = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_ADMIN);
      req.admin_id = decoded.admin_id;
      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid token" });
    }

  }

};

const middlewares = new AllMiddlewares();
module.exports = middlewares;
