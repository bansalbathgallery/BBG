var express          = require('express');
var router           = express.Router();
const AdminauthCtrl  = require('../../controllers/admin/authController');

module.exports = router => {
  /****************************************************/
  /******************* Auth Controller ****************/
  /****************************************************/
  router.get('/', AdminauthCtrl.login);
  router.post('/login', AdminauthCtrl.postLogin);
  router.get('/logout', AdminauthCtrl.logout);
  router.post('/forgotPassword', AdminauthCtrl.forgotPassword);
  router.get('/changePassword',superAuth, AdminauthCtrl.changePassword);
  router.post('/changePassword',superAuth, AdminauthCtrl.postChangePassword);
  router.post('/dashboard',superAuth, AdminauthCtrl.dashboard);
  router.get('/rider/signup', AdminauthCtrl.signup);
  router.post("/getYearlyRevenue",AdminauthCtrl.getYearlyRevenue);
  router.post("/getCategoryRenuve",AdminauthCtrl.getCategoryRenuve);
  return router;
};