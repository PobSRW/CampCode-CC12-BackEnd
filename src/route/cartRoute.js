const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const cartController = require('../controller/cartController');
const authenticationUser = require('../middlewares/authenticationUser');

router.post(
	'/checkout',
	authenticationUser,
	upload.single('slipUrl'),
	cartController.checkout
);

module.exports = router;
