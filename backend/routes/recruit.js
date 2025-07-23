const express = require('express');
const router = express.Router();
const recruitController = require('../controllers/recruitController');

router.post('/', recruitController.application);

module.exports = router;