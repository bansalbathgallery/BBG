var express           = require('express');
var router            = express.Router();
const AdminPaymentCtrl = require('../../controllers/admin/paymentController');

module.exports = router => {
	/****************************************************/
	/******************* Content Controller **************/
	/****************************************************/
	router.get('/payments',superAuth,AdminPaymentCtrl.payment);
	router.post('/payments/list',superAuth,AdminPaymentCtrl.list);
	return router;
};