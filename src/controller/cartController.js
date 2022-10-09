const fs = require('fs');
const { Order, OrderItem } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.checkout = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const { courses } = req.body;
		console.log(courses);

		const parsedCourses = JSON.parse(courses);
		console.log(parsedCourses);

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
