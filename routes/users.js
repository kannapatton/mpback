const express = require('express');
const usersController = require('../controllers/users');

const { checkJwt } = require('../middleware/index.js');

const router = express.Router()





router.post('/', checkJwt, usersController.createUser)


module.exports = router