var cron        = require('node-cron');
const sequelize = require('sequelize');
var moment      = require('moment');
const Op        = require('sequelize').Op;
const ORDERS    = db.models.orders;
const USER      = db.models.users;
cron.schedule('* * * * *',  async() => {
	console.log('running a task every minite');
	try{
		// var newDate = moment(new Date()).format("YYYY-MM-DD");
  //   	//var momentObj =  moment(new Date()).add(20,'m').format("hh:mm A");
  //   	console.log(newDate);

        //Check Restaurant Busy
        console.log("No order found!");
        
	} catch (e) {
		console.error(e.message)
	}

});