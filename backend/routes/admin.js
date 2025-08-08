const express = require('express');
const router = express.Router();
const { createCategory, createSemester, createWeek, updateWeek, updateCategory, updateSemester, deleteWeek, deleteCategory, deleteSemester } = require('../controllers/boardController');
const { login, joinList } = require('../controllers/adminController');

router.post('/board/:semester/:category', createWeek);
router.post('/board/:semester', createCategory);
router.post('/board/', createSemester);

router.patch('/board/:semester/:category', updateWeek);
router.patch('/board/:semester', updateCategory);
router.patch('/board/', updateSemester);

router.delete('/board/:semester/:category/:id', deleteWeek);
router.delete('/board/:semester/:id', deleteCategory);
router.delete('/board/:id', deleteSemester);

router.get('/users/', joinList);
router.post('/', login);

module.exports = router;