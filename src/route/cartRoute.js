const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const cartController = require('../controller/cartController');
const authenticationUser = require('../middlewares/authenticationUser');
const authenticationAdmin = require('../middlewares/authenticationAdmin');

router.get('/confirmorder', authenticationAdmin, cartController.confirmOrder);

router.patch(
	'/updatepaymentstatus',
	authenticationAdmin,
	cartController.updateOrderStatus
);

router.post(
	'/checkout',
	authenticationUser,
	upload.single('slipUrl'),
	cartController.checkout
);

router.post(
	'/bindingcourse',
	authenticationAdmin,
	cartController.bindingOrderToCourseUser
);

module.exports = router;
