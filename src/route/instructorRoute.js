const express = require('express');
const router = express.Router();

const instructorContorller = require('../controller/instructorController');

router.get('/getinstructor', instructorContorller.getInstrutor);
router.post('/createinstructor', instructorContorller.createInstructor);

module.exports = router;
