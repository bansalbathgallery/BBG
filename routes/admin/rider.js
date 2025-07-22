var express           = require('express');
var router            = express.Router();
const AdminriderCtrl = require('../../controllers/admin/riderController');

module.exports = router => {
	/****************************************************/
	/******************* Rider Controller **************/
	/****************************************************/
	router.get('/riders',superAuth,AdminriderCtrl.list);
	router.post('/riders/status',superAuth, AdminriderCtrl.status);
	//router.get('/riders/delete/:id',superAuth, AdminriderCtrl.delete);
	router.get('/riders/requests',superAuth, AdminriderCtrl.requestlist);
	router.get('/riders/details/:empId',superAuth, AdminriderCtrl.details);
	return router;
};