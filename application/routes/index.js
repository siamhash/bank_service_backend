const express = require('express');
const router = express.Router();
const UserRoutes = require('./users/users');
const BankRoutes = require('./bank');
UserRoutes(router);
BankRoutes(router);
module.exports = router;