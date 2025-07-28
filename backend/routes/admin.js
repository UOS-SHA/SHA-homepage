const express = require('express');
const router = express.Router();
const { createCategory, createSemester, createWeek } = require('../controllers/boardController');

router.post('/:semester/:category', createWeek);
router.post('/:semester', createCategory);
router.post('/', createSemester);



module.exports = router;