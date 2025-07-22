var express          = require('express');
var router           = express.Router();
const AdminSauthCtrl  = require('../../controllers/admin/subAdminController');

module.exports = router => {
  /****************************************************/
  /******************* Auth Controller ****************/
  /****************************************************/
  router.get('/roles', superAuth,AdminSauthCtrl.list);
  router.get('/roles/view/:id',superAuth,AdminSauthCtrl.view);
  router.post('/roles/postAdd', superAuth,AdminSauthCtrl.postAdd);
  router.get('/roles/add', superAuth,AdminSauthCtrl.add);
  router.get('/sub-admins', superAuth,AdminSauthCtrl.listUsers);
  router.get('/sub-admins/add', superAuth,AdminSauthCtrl.addSubUser);
  router.post('/sub-admins/postAddUser', superAuth,AdminSauthCtrl.postAddUser);
  return router;
};