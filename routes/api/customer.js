var express       = require('express');
var router        = express.Router();
const authCtrl    = require('../../controllers/api/authController');
const restCtrl    = require('../../controllers/api/restaurantController');
const addressCtrl = require('../../controllers/api/addressController');
const cartCtrl    = require('../../controllers/api/cartController');
const couponCtrl  = require('../../controllers/api/couponController');
const orderCtrl   = require('../../controllers/api/orderController');
module.exports = router => {
	/****************************************************/
	/******************* Auth Controller ****************/
	/****************************************************/
  	router.post('/customer/login', authCtrl.login);
  	router.post('/customer/Weblogin', authCtrl.Weblogin);
  	router.post('/customer/logout',authCtrl.logout);
	router.post('/customer/signup', authCtrl.signup);
	router.post('/customer/webSignup', authCtrl.webSignup);
	router.post('/customer/Sociallogin', authCtrl.Sociallogin);
	router.post('/customer/updateProfile',customerAuth,authCtrl.updateProfile);
	router.get('/customer/getProfile',customerAuth,authCtrl.getProfile);
	router.post('/customer/forgotPassword',authCtrl.forgotPassword);
	router.post('/customer/guestProfile',authCtrl.guestProfileUpdate);
	router.post('/customer/createStripeCustomer',authCtrl.createStripeCustomer);
	router.post('/customer/addCard',authCtrl.addCard);
	router.post('/customer/getSavedCard',authCtrl.getSavedCard);
	router.post('/customer/deleteCard',authCtrl.deleteCard);
	router.post('/customer/getDistance',authCtrl.calculateOrderDistance);
	router.get('/getAllNotifications/:id',authCtrl.getAllNotifications);
	router.post('/changePassword', authCtrl.changePassword);
	router.post('/VerifyOTP', authCtrl.VerifyOTP);

	router.post('/shutdown', authCtrl.shutdown);
	router.get('/getSettings', authCtrl.getSettings);
	router.get('/getFaq', authCtrl.getFaq);
	/*****************************************************/
	/***************** Restaurant Controller *************/
	/*****************************************************/
	router.post('/customer/restaurant/list',restCtrl.list);
  	router.post('/customer/restaurant/getnearBy',restCtrl.getnearBy);
  	router.post('/customer/restaurant/filter',restCtrl.filter);
	router.post('/customer/restaurant/detail',restCtrl.detail);
	router.post('/customer/restaurant/search',restCtrl.search);
	/******************************************************/
	/******************* Address Controller ***************/
	/******************************************************/
	router.get('/customer/address/list',customerAuth,addressCtrl.list);
	router.delete('/customer/address/delete',customerAuth,addressCtrl.delete);
	router.put('/customer/address/update',customerAuth,addressCtrl.update);
	router.post('/customer/address/add',customerAuth,addressCtrl.add);

	/******************************************************/
	/******************* Cart Controller ***************/
	/******************************************************/
	router.post('/customer/cart/list',cartCtrl.list);
	//router.delete('/customer/cart/delete',checkAuth,cartCtrl.delete);
	router.put('/customer/cart/update',cartCtrl.update);
	router.post('/customer/cart/add',cartCtrl.add);
	router.post('/customer/favorite/addToFavorite',customerAuth,cartCtrl.addToFavorite);
	router.post('/customer/favorite/favoriteList',customerAuth,cartCtrl.favoriteList);
	/******************************************************/
	/******************* Coupon Controller ***************/
	/******************************************************/
	router.get('/customer/coupon/list',couponCtrl.list);
	router.post('/customer/coupon/applyCoupon',couponCtrl.applyCoupon);
	router.post('/customer/coupon/removeCoupan',couponCtrl.removeCoupan);

	/******************************************************/
	/******************* Order Controller ***************/
	/******************************************************/
	router.post('/customer/order/createOrder',orderCtrl.createOrder);
	router.get('/customer/order/cancelOrder',orderCtrl.cancelOrder);
	router.get('/customer/order/list',orderCtrl.orderList);
	router.get('/customer/order/history',orderCtrl.orderHistory);
	router.post('/testPayment',orderCtrl.testPayment);
	router.post('/customer/order/addRating', orderCtrl.addRating);
	router.post('/customer/order/addRatingAndroid', orderCtrl.addRatingAndroid);
	return router;
};