var express          = require('express');
var router           = express.Router();
const AdminCompanyCtrl  = require('../../controllers/admin/restaurantController');

module.exports = router => {
	/****************************************************/
	/******************* Restaurant Controller **********/
	/****************************************************/
  	router.get('/restaurant',superAuth, AdminCompanyCtrl.list);
	router.post('/restaurant/status',superAuth, AdminCompanyCtrl.status);
	router.get('/restaurant/delete/:id',superAuth, AdminCompanyCtrl.delete);
	router.get('/restaurant/requests',superAuth, AdminCompanyCtrl.requestlist);
	router.get('/restaurant/details/:restaurantId',superAuth, AdminCompanyCtrl.details);
	router.get('/restaurant/view/:restaurantId', superAuth,AdminCompanyCtrl.view);
	router.post("/getResturantYearlyRevenue",superAuth,AdminCompanyCtrl.getResturantYearlyRevenue);
	router.get('/restaurant/orderList/:userId',superAuth, AdminCompanyCtrl.orderList);
	return router;
};