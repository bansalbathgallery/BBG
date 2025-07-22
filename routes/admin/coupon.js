var express           = require('express');
var router            = express.Router();
const AdmincouponCtrl = require('../../controllers/admin/couponController');

module.exports = router => {
	/****************************************************/
	/******************* Coupon Controller **************/
	/****************************************************/
	router.get('/coupons',superAuth,AdmincouponCtrl.list);
	router.get('/coupons/add',superAuth,AdmincouponCtrl.add);
	router.post('/coupons/add',superAuth,AdmincouponCtrl.postAdd);
	router.get('/coupons/view/:id',superAuth,AdmincouponCtrl.view);
	router.get('/coupons/delete/:id',superAuth,AdmincouponCtrl.delete);
	router.post('/coupons/status',superAuth,AdmincouponCtrl.status);
	router.post('/coupons/update',superAuth,AdmincouponCtrl.update);
	return router;
};