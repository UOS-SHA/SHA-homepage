const express = require('express');
const router = express.Router();
const { getWeek, getCategory, getSemester } = require('../controllers/studyController');

router.get('/:semester/:category', getWeek);
router.get('/:semester', getCategory);
router.get('/', getSemester);

module.exports = router;