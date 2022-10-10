const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const courseContorller = require('../controller/courseController');
const authenticationAdmin = require('../middlewares/authenticationAdmin');
const authenticationUser = require('../middlewares/authenticationUser');

router.get('/courseitem', courseContorller.getCourseItem);
router.get('/coursenewitem', courseContorller.getCourseNewItem);
router.get('/coursebyid/:id', courseContorller.getCourseById);
router.get(
	'/getusercourse',
	authenticationUser,
	courseContorller.getUserCourse
);

router.get('/getlearningcourse/:courseid', courseContorller.getLearningCourse);

router.post(
	'/createcourse',
	upload.fields([
		{ name: 'courseImage', maxCount: 1 },
		{ name: 'courseVideo', maxCount: 1 },
	]),
	authenticationAdmin,
	courseContorller.createCourse
);

router.patch(
	'/courseupdate/:id',
	upload.fields([
		{ name: 'courseImage', maxCount: 1 },
		{ name: 'courseVideo', maxCount: 1 },
	]),
	authenticationAdmin,
	courseContorller.updatecourse
);

router.delete('/coursedelete/:id', courseContorller.deleteCourse);

module.exports = router;
