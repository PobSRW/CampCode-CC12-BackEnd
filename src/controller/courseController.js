const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const { Course, Instructor } = require('../models');

exports.getCourseItem = async (req, res, next) => {
	try {
		const item = await Course.findAll({
			// [['createdAt', 'DESC']]
			include: [
				{
					model: Instructor,
				},
			],
		});
		res.status(200).json({ item });
	} catch (err) {
		next(err);
	}
};

exports.getCourseNewItem = async (req, res, next) => {
	try {
		const item = await Course.findAll({
			limit: 8,
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: Instructor,
				},
			],
		});
		res.status(200).json({ item });
	} catch (err) {
		next(err);
	}
};

exports.getCourseById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const itemById = await Course.findOne({
			where: { id },
			include: { model: Instructor },
		});

		res.status(200).json({ itemById });
	} catch (err) {
		next(err);
	}
};

exports.createCourse = async (req, res, next) => {
	try {
		const { courseName, description, priceCurrent, instructorId } = req.body;

		const data = {
			courseName,
			description,
			priceCurrent,
			instructorId,
		};

		if (req.file) {
			data.courseImage = await cloudinary.upload(req.file.path);
		}

		// const newCourse = await Course.create(data);
		await Course.create(data);

		res.status(200).json({ message: 'Create Course Succesful' });
	} catch (err) {
		next(err);
	} finally {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
	}
};

exports.updatecourse = async (req, res, next) => {
	try {
		const { courseName, description, priceCurrent, instructorId } = req.body;
		const { id } = req.params;
		// console.log(courseName);

		const data = {};

		if (courseName) {
			data.courseName = courseName;
		}

		if (description) {
			data.description = description;
		}

		if (priceCurrent) {
			data.priceCurrent = priceCurrent;
		}

		if (instructorId) {
			data.instructorId = instructorId;
		}

		if (req.file) {
			data.courseImage = await cloudinary.upload(req.file.path);
		}

		// console.log(data);

		await Course.update(data, {
			where: { id },
		});

		res.status(200).json({ message: 'Update Success' });
	} catch (err) {
		next(err);
	}
};

exports.deleteCourse = async (req, res, next) => {
	try {
		const { id } = req.params;

		const course = await Course.findOne({ where: { id } });

		if (!course) {
			return res.status(400).json({ message: 'cannot delete the course' });
		}

		await course.destroy();
		res.status(200).json({ message: 'Delete Course Success' });
	} catch (err) {
		next(err);
	}
};
