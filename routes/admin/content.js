var express           = require('express');
var router            = express.Router();
const AdminContentCtrl = require('../../controllers/admin/contentController');

module.exports = router => {
	/****************************************************/
	/******************* Content Controller **************/
	/****************************************************/
	router.get('/contents',superAuth,AdminContentCtrl.getContent);
	router.get('/setting',superAuth,AdminContentCtrl.getSettings);
	router.post('/contents/updateSettings',superAuth,AdminContentCtrl.updateSettings);
	// router.get('/cuisines/view/:id',superAuth,AdmincuisinesCtrl.view);
	router.post('/contents/sendNotifications',superAuth,AdminContentCtrl.sendNotifications);
	router.post('/contents/addNewFeature',superAuth, AdminContentCtrl.addNewFeature);
	 router.post('/contents/updateChangePassword',superAuth,AdminContentCtrl.updateChangePassword);
	 router.get('/feature/:id',superAuth,AdminContentCtrl.getFeatureRestaurant);
	  router.post('/contents/updateFeatured',superAuth,AdminContentCtrl.updateFeatured);
	return router;
};