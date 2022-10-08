const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const courseContorller = require('../controller/courseController');
const authenticationAdmin = require('../middlewares/authenticationAdmin');

router.get('/courseitem', courseContorller.getCourseItem);
router.get('/coursenewitem', courseContorller.getCourseNewItem);
router.get('/courseupdatebyid/:id', courseContorller.getCourseById);

router.post(
	'/createcourse',
	upload.single('courseImage'),
	authenticationAdmin,
	courseContorller.createCourse
);

router.patch(
	'/courseupdate/:id',
	upload.single('courseImage'),
	authenticationAdmin,
	courseContorller.updatecourse
);

router.delete('/coursedelete/:id', courseContorller.deleteCourse);

module.exports = router;
