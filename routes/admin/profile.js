var express           = require('express');
var router            = express.Router();
const AdminprofileCtrl = require('../../controllers/admin/profileController');

module.exports = router => {
	/****************************************************/
	/******************* Profile Controller *************/
	/****************************************************/
	router.get('/profile',superAuth,AdminprofileCtrl.getProfile);
	router.post('/profile/companyUpdate',superAuth,AdminprofileCtrl.update);
	return router;
};