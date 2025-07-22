var express           = require('express');
var router            = express.Router();
const AdminorderCtrl = require('../../controllers/admin/orderController');
const cronController = require("../../controllers/cronController");
module.exports = router => {
	/****************************************************/
	/******************* Coupon Controller **************/
	/****************************************************/
	router.get('/orders',superAuth,AdminorderCtrl.orders);
	router.post('/orders/list',superAuth,AdminorderCtrl.list);
	//router.post('/orders/details',superAuth,AdminorderCtrl.orderDetails);
	router.get('/reviews',superAuth,AdminorderCtrl.getAllReviews);
	router.get('/orders/details',superAuth,AdminorderCtrl.orderDetails);
	router.post('/order/getAllReviewsFilter',superAuth,AdminorderCtrl.getAllReviewsFilter);
	return router;
};