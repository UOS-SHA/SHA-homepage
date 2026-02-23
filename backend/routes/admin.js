const express = require('express');
const router = express.Router();
const { createCategory, createSemester, createWeek, updateWeek, updateCategory, updateSemester, deleteWeek, deleteCategory, deleteSemester } = require('../controllers/boardController');
const { login, joinList, createMembers, updateMember, deleteMember, downloadJoin } = require('../controllers/adminController');
const { admingetMembers } = require('../controllers/memberController');
const isAdmin = require('../middlewares/isAdmin');


router.post('/', login);

router.use(isAdmin);
router.get('/verify', (req, res) => res.status(200).json({ ok: true }));

router.get('/users/', joinList);
router.get('/users/export', downloadJoin);

router.get('/members/', admingetMembers);
router.post('/members/', createMembers);
router.patch('/members/:id', updateMember);
router.delete('/members/:id', deleteMember);

router.post('/board/:semester/:category', createWeek);
router.post('/board/:semester', createCategory);
router.post('/board/', createSemester);

router.patch('/board/:semester/:category', updateWeek);
router.patch('/board/:semester', updateCategory);
router.patch('/board/', updateSemester);

router.delete('/board/:semester/:category/:id', deleteWeek);
router.delete('/board/:semester/:id', deleteCategory);
router.delete('/board/:id', deleteSemester);




module.exports = router;
