var express = require('express');
var router = express.Router();
global.SERVICES = db.models.services
CATEGORY = db.models.categories
CART = db.models.cart
COUPAN = db.models.coupan
FAVOURITES = db.models.favourites
ADDRESS = db.models.address
BANNERS = db.models.banners
ORDERS=db.models.orders
SUBORDERS=db.models.suborders
SCHEDULE = db.models.schedule
USERS =db.models.users
COMPANY = db.models.companies
DOCUMENT = db.models.document
FAQ = db.models.faq
BANNER = db.models.banners
PAYMENT = db.models.payment
EMPLOYEE = db.models.employees
NOTIFICATION = db.models.notifications
ASSIGNMENT = db.models.assignedEmployees
CANCELREASON = db.models.cancelReasons
COMPANYRATING = db.models.companyRatings
USERTYPE=db.models.userType
ROLETYPE=db.models.roleTypes
BUSINESSTYPE=db.models.businessType

const AdminAuthRoutes       = require('./auth');
const AdminRestaurantRoutes = require('./restaurant');
const AdminCustomerRoutes   = require('./customer');
const AdminCouponRoutes     = require('./coupon');
const AdminProfileRoutes    = require('./profile');
const AdminCuisinesRoutes   = require('./cuisines');
const AdminOrderRoutes      = require('./order');
const AdminRiderRoutes      = require('./rider');
const AdminContentRoutes    = require('./content');
const AdminPaymentRoutes    = require('./payment');
const AdminSubAdminRoutes    = require('./subadmin');
//Moutable Routes
AdminAuthRoutes(router);
AdminRestaurantRoutes(router);
AdminCustomerRoutes(router);
AdminCouponRoutes(router);
AdminProfileRoutes(router);
AdminCuisinesRoutes(router);
AdminOrderRoutes(router);
AdminRiderRoutes(router);
AdminContentRoutes(router);
AdminPaymentRoutes(router);
AdminSubAdminRoutes(router);

module.exports = router;