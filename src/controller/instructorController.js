const { Instructor } = require('../models');

exports.getInstrutor = async (req, res, next) => {
	try {
		const instructor = await Instructor.findAll();
		res.status(200).json({ instructor });
	} catch (err) {
		next(err);
	}
};

exports.createInstructor = async (req, res, next) => {
	try {
		const { firstName, lastName, reviewScore, profileImage } = req.body;
		console.log(req.body);
		const instructor = await Instructor.create({
			firstName,
			lastName,
			reviewScore,
			profileImage,
		});

		res.status(201).json({ message: 'Register Successful' });
	} catch (err) {
		next(err);
	}
};
