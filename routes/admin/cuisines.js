var express           = require('express');
var router            = express.Router();
const AdmincuisinesCtrl = require('../../controllers/admin/cuisinesController');

module.exports = router => {
	/****************************************************/
	/******************* Cuisines Controller **************/
	/****************************************************/
	router.get('/cuisines',superAuth,AdmincuisinesCtrl.list);
	router.get('/cuisines/add',superAuth,AdmincuisinesCtrl.add);
	router.post('/cuisines/postAdd',superAuth,AdmincuisinesCtrl.postAdd);
	router.get('/cuisines/view/:id',superAuth,AdmincuisinesCtrl.view);
	router.post('/cuisines/update',superAuth,AdmincuisinesCtrl.update);
	router.post('/cuisines/status',superAuth, AdmincuisinesCtrl.status);
	return router;
};