const express = require('express');
const router = express.Router();
const { application } = require('../controllers/recruitController');

router.post('/', application);

module.exports = router;