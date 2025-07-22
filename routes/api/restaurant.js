var express        = require('express');
var router         = express.Router();
const authRCtrl    = require('../../controllers/api/restaurant/authController');
const dishRCtrl    = require('../../controllers/api/restaurant/dishController');
const orderRCtrl   = require('../../controllers/api/restaurant/orderController');
module.exports = router => { 
	/****************************************************/
	/**************** Restaurant Auth Controller ********/
	/****************************************************/
	router.post('/restaurant/login', authRCtrl.login);
	router.get('/restaurant/logout',checkAuth,authRCtrl.logout);
	router.post('/restaurant/signup', authRCtrl.signup);
	router.post('/restaurant/Sociallogin', authRCtrl.Sociallogin);
	router.post('/restaurant/updateProfile',authRCtrl.updateProfile);
	router.get('/restaurant/getProfile',authRCtrl.getProfile);
	router.post('/restaurant/forgotPassword',authRCtrl.forgotPassword);
	router.get('/restaurant/getAllRCuisines',authRCtrl.getAllRCuisines);
  router.post('/restaurant/updateTiming',authRCtrl.updateTiming);
  router.post('/restaurant/uploadDocuments',authRCtrl.uploadDocuments);
  router.get('/restaurant/removeDocuments',authRCtrl.removeDocuments);
  router.get('/restaurant/removePicture',authRCtrl.removePicture);
  router.post('/restaurant/restaurantEarning',authRCtrl.restaurantEarning);
  router.get('/restaurant/removeVideo',authRCtrl.removeVideo);
  router.post('/restaurant/changeInstaMode',authRCtrl.changeInstaMode);
  router.post('/restaurant/updateAccountDetails',authRCtrl.updateAccountDetails);
  router.get('/restaurant/getAccountDetails',authRCtrl.getAccountDetails);
	/****************************************************/
	/**************** Restaurant Dish Controller ********/
	/****************************************************/
	router.post('/restaurant/dish/addMenu', dishRCtrl.addMenu);
	router.post('/restaurant/dish/updateMenu', dishRCtrl.updateMenu);
	router.post('/restaurant/dish/changeMenuStatus', dishRCtrl.changeMenuStatus);
	router.get('/restaurant/dish/deleteItem', dishRCtrl.deleteItem);
  	router.post('/restaurant/dish/add', dishRCtrl.addDish);
  	router.post('/restaurant/dish/updateDish', dishRCtrl.updateDish);
  	router.get('/restaurant/dish/cuisineslist', dishRCtrl.cuisineslist);
  	router.post('/restaurant/dish/list', dishRCtrl.list);
  	router.post('/restaurant/dish/changeStatus', dishRCtrl.changeStatus);
  	router.get('/restaurant/dish/deleteDish', dishRCtrl.deleteDish);
  	router.post('/restaurant/dish/changeDishOrder', dishRCtrl.changeDishOrder);
  	router.get('/restaurant/dish/getAllIngredients', dishRCtrl.getAllIngredients);
  	router.post('/restaurant/dish/changeMultipleIngredients', dishRCtrl.changeMultipleIngredients);
  	/****************************************************/
	/**************** Restaurant Order Controller ********/
	/****************************************************/
  	router.get('/restaurant/order/list', orderRCtrl.orderList);
  	router.get('/restaurant/order/detail', orderRCtrl.orderDetails);
  	router.post('/restaurant/order/changeOrderStatus', orderRCtrl.changeOrderStatus);
  	router.post('/restaurant/order/cancelOrder', orderRCtrl.cancelOrder);
  	router.post('/restaurant/order/AcceptOrder', orderRCtrl.AcceptOrder);
  	router.post('/restaurant/order/updateOrderDelay', orderRCtrl.updateOrderDelay);
  	router.post('/restaurant/order/completeOrderList', orderRCtrl.completeOrderList);
  	router.post('/restaurant/order/rejectedOrderList', orderRCtrl.rejectedOrderList);
  	router.post('/restaurant/order/cancelOrderList', orderRCtrl.cancelOrderList);
    router.post('/restaurant/order/addReviews', orderRCtrl.addReviews);
    router.post('/restaurant/order/getEarning',orderRCtrl.getEarning);
	return router;
};