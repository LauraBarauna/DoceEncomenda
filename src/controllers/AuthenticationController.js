const authenticationModel = require('../models/AuthenticationModel');
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

function AuthenticationController() {

};

const authenticationController = new AuthenticationController();
module.exports = authenticationController;
