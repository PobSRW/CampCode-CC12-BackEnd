const { User } = require('../models');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

module.exports = async (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (!authorization || !authorization.startsWith('Bearer')) {
			throw new AppError('Unauthenticated!', 401);
		}

		const token = authorization.split(' ')[1];

		if (!token) {
			throw new AppError('Unauthenticated!', 401);
		}

		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET_KEY || 'private_key'
		);

		const admin = await User.findOne({
			where: { id: payload.id },
			attributes: { exclude: 'password' },
		});

		if (!admin) {
			throw new AppError('Unauthenticated! You are not Admin', 401);
		}

		if (admin.role !== 'Admin') {
			throw new AppError('Unauthenticated! You are not Admin', 401);
		}

		req.admin = admin;

		next();
	} catch (err) {
		next(err);
	}
};
