const express = require('express');
const dinnerController = require('../controllers/dinner');

const { checkJwt } = require('../middleware/index.js');

const router = express.Router()

router.get('/', dinnerController.getMenu)

router.post('/', dinnerController.createDinner)

router.delete('/:iddinner', dinnerController.deleteDinner)

module.exports = router 