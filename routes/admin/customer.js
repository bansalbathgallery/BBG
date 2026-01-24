var express          = require('express');
var router           = express.Router();
const AdminUserCtrl  = require('../../controllers/admin/customerController');

module.exports = router => {
	/****************************************************/
	/******************* Customer Controller ************/
	/****************************************************/
  	router.get('/customer',superAuth, AdminUserCtrl.list);
	router.post('/customer/status',superAuth, AdminUserCtrl.status);
	router.get('/customer/delete/:id',superAuth, AdminUserCtrl.delete);
	router.get('/customer/orderList/:userId',superAuth, AdminUserCtrl.orderList);
	router.get('/customer/chat/:userId',superAuth, AdminUserCtrl.chatHistory);
	router.get('/customer/sale/:id',superAuth, AdminUserCtrl.addSale);
	router.post('/customer/updateSale',superAuth, AdminUserCtrl.updateSale);
	router.get('/customer/SaleList/:userId',superAuth, AdminUserCtrl.salelist);
	return router;
};