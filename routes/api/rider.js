var express        = require('express');
var router         = express.Router();
const riderACtrl    = require('../../controllers/api/rider/authController');
const riderOrderCtrl    = require('../../controllers/api/rider/orderController');
const riderVehicleCtrl    = require('../../controllers/api/rider/vehicleController');
module.exports = router => { 
	/****************************************************/
	/**************** Rider Auth Controller ********/
	/****************************************************/
	router.post('/rider/login', riderACtrl.login);
	router.get('/rider/logout',checkAuth,riderACtrl.logout);
	router.post('/rider/signup', riderACtrl.signup);
	router.post('/rider/Sociallogin', riderACtrl.Sociallogin);
	router.post('/rider/updateProfile',checkAuth,riderACtrl.updateProfile);
	router.get('/rider/getProfile',checkAuth,riderACtrl.getProfile);
	router.post('/rider/forgotPassword',riderACtrl.forgotPassword);
	router.post('/rider/changePassword',checkAuth, riderACtrl.changePassword);
	router.post('/rider/changeAvailablity',checkAuth, riderACtrl.changeAvailablity);
	router.get('/rider/verifyUser',riderACtrl.verifyUser);
	router.post('/rider/changePhoneNumber',checkAuth, riderACtrl.changePhoneNumber);
	router.post('/rider/changeEmail',checkAuth, riderACtrl.changeEmail);
	router.post('/rider/updateAccountDetails',checkAuth, riderACtrl.updateAccountDetails);
	router.get('/rider/getAccountDetails',checkAuth, riderACtrl.getAccountDetails);
	router.post('/rider/verifyEmail',checkAuth, riderACtrl.verifyEmail);
	router.post('/rider/checkPhoneNumber',checkAuth, riderACtrl.checkPhoneNUmber);
	/****************************************************/
	/**************** Rider Order Controller ********/
	/****************************************************/
	router.post('/rider/order/list',checkAuth,riderOrderCtrl.list);
	router.post('/rider/order/acceptJob',checkAuth,riderOrderCtrl.acceptJob);
	router.post('/rider/order/rejectJob',checkAuth,riderOrderCtrl.rejectJob);
	router.post('/rider/order/assignedOrderList',checkAuth,riderOrderCtrl.assignedOrderList);
	router.post('/rider/order/getEarning',checkAuth,riderOrderCtrl.getEarning);
	router.get('/rider/homeAPI',checkAuth, riderOrderCtrl.homeAPI);

	/****************************************************/
	/**************** Rider Vehicle Controller ********/
	/****************************************************/
	router.get('/rider/vehicle/getVehicleType',checkAuth,riderVehicleCtrl.getVehicleType);
	router.get('/rider/vehicle/list',checkAuth,riderVehicleCtrl.list);
	router.post('/rider/vehicle/add',checkAuth,riderVehicleCtrl.add);
	router.get('/rider/vehicle/getDetail',checkAuth,riderVehicleCtrl.getDetail);
	router.get('/rider/vehicle/delete',checkAuth,riderVehicleCtrl.delete);
	router.post('/rider/vehicle/update',checkAuth,riderVehicleCtrl.update);
};