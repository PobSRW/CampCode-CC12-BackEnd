const fs = require('fs');
const { Order, OrderItem, Course, User, UserCourse } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.checkout = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { courses } = req.body;
		// console.log(courses);

		const parsedCourses = JSON.parse(courses);
		// console.log(parsedCourses);

		let paymentSlip;

		if (req.file) {
			paymentSlip = await cloudinary.upload(req.file.path);
		}

		console.log(paymentSlip);

		const order = await Order.create({
			slipUrl: paymentSlip,
			userId,
		});

		for (let item of parsedCourses) {
			// console.log(item);
			await OrderItem.create({
				priceHistory: item.price,
				courseId: item.id,
				orderId: order.id,
			});

			// await UserCourse.create({
			// 	userId,
			// 	courseId: item.id,
			// });
		}

		res.status(200).json({ message: 'Payment Success' });
	} catch (err) {
		next(err);
	} finally {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
	}
};

exports.confirmOrder = async (req, res, next) => {
	try {
		const order = await Order.findAll({
			where: { status: 'Pendding' },
			// order: [['createdAt', 'DESC']],
			include: [
				{
					model: OrderItem,
					include: [
						{
							model: Course,
						},
					],
				},
				{
					model: User,
				},
			],
		});

		res.status(200).json({ order });
	} catch (err) {
		next(err);
	}
};

exports.updateOrderStatus = async (req, res, next) => {
	try {
		const { orderId } = req.body;

		// console.log(orderId);

		await Order.update(
			{ status: 'Successful' },
			{
				where: { id: orderId },
			}
		);

		res.status(200).json({ message: 'Update Payment Successful' });
	} catch (err) {
		next(err);
	}
};

exports.bindingOrderToCourseUser = async (req, res, next) => {
	try {
		const { userId, courses } = req.body;
		console.log(userId, courses);

		// const parsedCourses = JSON.parse(request.courses);

		// console.log(parsedCourses);

		for (let item of courses) {
			// console.log(item);
			await UserCourse.create({
				userId: userId,
				courseId: item.Course.id,
			});
		}
		res.status(200).json({ message: 'Binding Complete' });
	} catch (err) {
		next(err);
	}
};
