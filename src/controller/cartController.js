const fs = require('fs');
const { Order, OrderItem } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.checkout = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const course = req.body;

		const a = Object(course);

		console.log(a);
		// ส่ง key ชื่อ course หลายๆ รอบ
		let paymentSlip;

		if (req.file) {
			paymentSlip = await cloudinary.upload(req.file.path);
		}

		const { id } = await Order.create({
			slipUrl: paymentSlip,
			userId,
		});

		// for (let item of a) {
		// console.log(item);
		// await OrderItem.create({
		// 		priceHistory: item.price,
		// 		courseId: item.courseId,
		// 		orderId: id,
		// 	}
		// );

		// res.status(200).json({ message: 'Payment Success' });
	} catch (err) {
		next(err);
	} finally {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
	}
};
