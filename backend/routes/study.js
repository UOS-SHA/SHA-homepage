const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');

router.get('/', studyController.getStudy);

router.post('/study/smester', studyController.createSemester);

router.put('/study/')