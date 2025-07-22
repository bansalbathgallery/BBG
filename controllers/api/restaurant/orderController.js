
const express = require('express');
const app     = express();
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const moment  = require('moment');
const CART     = db.models.cart
const SERVICES = db.models.services;
const userCoupan = db.models.userCoupons;
const ORDERS     = db.models.orders;
const SUBORDERS  = db.models.suborders;
const orderPayment = db.models.payment;
const serviceRating = db.models.serviceRatings;
USER=db.models.users;
const keyPublishable = config.PAYKEY;
const keySecret = config.PAYSECRET;
const EARNING = db.models.earnings;
const stripe = require("stripe")(keySecret);
//Relations
CART.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.hasMany(SUBORDERS, {foreignKey: 'orderId'});
ORDERS.hasOne(orderPayment,{foreignKey: 'orderId'});
SUBORDERS.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(USER,{foreignKey: 'userId'});
ORDERS.hasOne(COMPANYRATING, {foreignKey: 'orderId'});
ORDERS.hasMany(serviceRating, {foreignKey: 'orderId'});
serviceRating.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(COMPANY,{foreignKey: 'companyId'});
ORDERS.hasOne(ASSIGNMENT,{foreignKey: 'orderId'});
ASSIGNMENT.belongsTo(EMPLOYEE,{foreignKey: 'empId'});
const COUPAN   = db.models.coupan;
ORDERS.hasOne(EARNING,{foreignKey: 'orderId'})
module.exports = {

  /*
  *@role Order list
  *Method GET
  *@params restaurantId
  */
  orderList: async (req, res, next) => {
    try
    {
      let restaurantId    = req.query.restaurantId;
      //Get Incoming Order
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','orderCreationTime','progressStatus','address','processleftTime','cookingTime','cookingleftTime','scheduleType','processTime','orderType',
        'couponDiscount','promoCode','createdAt','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: {
            companyId: restaurantId,
            progressStatus: {
              [Op.eq]: '0'
            }
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANY,
              attributes: ['companyName','instaMode','address1']
            }
          ],
          order: [
            ['orderNo', 'DESC'],
          ],
        });

      //Get ASAP Orders
      const ASAPOrder = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','orderCreationTime','progressStatus','address','processleftTime','cookingTime','cookingleftTime','scheduleType','processTime','orderType',
        'couponDiscount','promoCode','createdAt','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: {
            companyId: restaurantId,
            progressStatus: ['1','3','8'],
            scheduleType: '0'
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANY,
              attributes: ['companyName','instaMode','address1']
            }
          ],
          order: [
            ['serviceDateTime', 'ASC'],
          ],
        });

      //Get ASAP Orders
      const ScheduleOrders = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','orderCreationTime','progressStatus','address','processleftTime','cookingTime','cookingleftTime','scheduleType','processTime','orderType',
        'couponDiscount','promoCode','createdAt','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: {
            companyId: restaurantId,
            progressStatus: ['1','3','8'],
            scheduleType: '1'
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANY,
              attributes: ['companyName','instaMode','address1']
            }
          ],
          order: [
            ['serviceDateTime', 'ASC'],
          ],
        });
      //Get Restaurant Details
      const restaurantDetails = await COMPANY.findOne({
        where: {
          id: restaurantId
        }
      });
      const OrderData = {};
      OrderData.incomingOrder  = orderList; 
      OrderData.ASAPOrders     = ASAPOrder;
      OrderData.ScheduleOrders = ScheduleOrders;
       OrderData.restaurantDetails = restaurantDetails;
      if(OrderData)
      {
        return res.json({
          code: 200,
          message: 'Order List Fetch Successfully',
          data: OrderData
        })
      } else {
         return res.json({
          code: 404,
          message: 'No Order Found',
          data: OrderData
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Order Details
  *Method GET
  *@params OrderId
  */
  orderDetails: async (req, res, next) => {
    try
    {
    	 var jobStatus = ['1','2','3','4'];
      let orderId    = req.query.orderId;
      const orderList = await ORDERS.findOne({
        attributes: ['id','orderNo','serviceDateTime','acceptedBy','deliveryTime','orderDistance','serviceCharges','delay','scheduleType','foodReadyTime','progressStatus','processleftTime','cookingTime','cookingleftTime','acceptTime','address','latitude','longitude','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: {
            id: orderId
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['id','firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANYRATING
            },
            {
              model: COMPANY,
              attributes: ['id','companyName','address1','phoneNumber','latitude','longitude']
            },
            {
              model: SUBORDERS,
              attributes: ['orderId','serviceId','price','quantity',
              [Sequelize.literal('`suborders->service`.`name`'), 'ServiceName'],
              [Sequelize.literal('`suborders->service`.`icon`'), 'icon']],
              include: [
              {
                model: SERVICES,
                attributes: []
              }]
            },
            {
              model: serviceRating,
              attributes: ['orderId','serviceId','rating','review',
              [Sequelize.literal('`serviceRatings->service`.`name`'), 'ServiceName'],
              [Sequelize.literal('`serviceRatings->service`.`icon`'), 'icon']],
              include: [
              {
                model: SERVICES,
                attributes: []
              }]
            },
            {
	          model: ASSIGNMENT, 
	          attributes: ['id','jobStatus'], 
	          required:false, 
	          where:{ 
	            jobStatus: { [Op.or]: jobStatus} 
	          },
	          include: [{
	          	model: EMPLOYEE
	          }]
	        }
          ]
        });
      
      if(orderList)
      {
        return res.json({
          code: 200,
          message: 'Order Details Fetch Successfully',
          data: orderList
        })
      } else {
         return res.json({
          code: 404,
          message: 'No Order Found',
          data: {}
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },
  
  /*
  *@role Change Order Status
  *@Method POST
  *@params orderId , Status
  * 2->Cancelled , 3->Processing,4//cancelled by company, 5->Completed ,6->Reject, 7->Food Prepared
  */
  changeOrderStatus: async (req, res, next) => {
    try
    {
      const data      = req.body;
      //console.log(bearerHeader);
      var orderId     = data.orderId;
      var orderStatus = data.orderStatus;
      var message = "";
      const orderList = await ORDERS.findOne({
        where: {
          id: data.orderId
        }
      });

      //Get Restaurant Details
      const restaurantDetails = await COMPANY.findOne({
        where: {
          id: orderList.dataValues.companyId
        }
      });
      var deliverId = restaurantDetails.dataValues.id;
      var deliverContact = restaurantDetails.dataValues.phoneNumber;
      //Get User Details
      const users = await USER.findOne({
        where: {
          id: orderList.dataValues.userId
        }
      });
      if(!orderList)
      {
         return res.json({
          code: 404,
          message: 'No Order Found'
        })
      }

      //Send Notification
      if(orderStatus == '2' || orderStatus == '4')
      {
        var message = "Your order has been cancelled.";
        var title   = "Order Cancelled";
      }else if(orderStatus == '3'){
        await ORDERS.update({
          scheduleType: '0'
        },{
          where: {
            id: orderId
          }
        });
        var message = "Your order has been processing.";
        var title   = "Order Processing";
      }else if(orderStatus == '5'){
        if(orderList.dataValues.orderType == "Pickup")
        {
          var message = "Order picked up successfully.";
          var title   = "Order Delivered";
        }else{
          var message = "Order delivered successfully.";
          var title   = "Order Delivered";
        }
        await ASSIGNMENT.update({
          jobStatus: 4,
          assignedDate:moment(new Date()).format("YYYY-MM-DD")
        },
          {
          where : {
            orderId:orderId
          }
        });
        if(restaurantDetails.dataValues.deviceToken != "")
        {
          var Rtitle   = "Restaurant Order Delivered";
          var notifPushUserData={
            title: Rtitle,
            description: message,
            token: restaurantDetails.dataValues.deviceToken,
            platform: restaurantDetails.dataValues.deviceType,
            userId : orderList.dataValues.companyId,
            role: '3',
            orderId: orderId,
            orderType: orderList.dataValues.orderType,
            orderNo: orderList.dataValues.orderNo,
            notificationType:Rtitle,
            status: orderStatus,
            readStatus: 0
          } 
          commonNotification.insertNotification(notifPushUserData);
          commonNotification.sendNotification(notifPushUserData);
        }
      }else if(orderStatus == '6'){
        var message = "Your order has been rejected.";
        var title   = "Order Rejected";
      }else if(orderStatus == '7'){
        var currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        var title   = "Order Prepared";
        var message = "Your food is ready for pickup.";
        await ORDERS.update({
          foodReadyTime: currentTime
        },{
          where: {
            id: orderId
          }
        });
        if(orderList.dataValues.orderType != "Pickup")
        {
          var message = "";
        }
        if(orderList.dataValues.orderType != "Pickup" && orderList.dataValues.acceptedBy != "Self")
        {
          
          var messageR = "Your food is ready for pickup.";
          var assignDetails = await ASSIGNMENT.findOne({
            where: {
              orderId: orderId
            },
            include: [{
              model: EMPLOYEE
            }]
          })
          //
          if(assignDetails)
          {
            console.log(assignDetails.employee);
            if(assignDetails.employee.deviceToken != "")
            {
              var notifPushUserData={
                title: title,
                description: messageR,
                token:  assignDetails.employee.deviceToken,
                platform: assignDetails.employee.platform,
                userId : assignDetails.employee.id,
                role: '4',
                orderId: orderId,
                orderType: orderList.dataValues.orderType,
                orderNo: orderList.dataValues.orderNo,
                riderId: deliverId,
                phoneNumber: deliverContact,
                notificationType:title,
                status: orderStatus,
                readStatus: 0
              } 
              commonNotification.insertNotification(notifPushUserData);
              commonNotification.sendNotification(notifPushUserData);
            }
          }
          
        }

      }else if(orderStatus == '8'){
        if(orderList.dataValues.acceptedBy != "Self")
        {
          var assignDetails = await ASSIGNMENT.findOne({
            where: {
              orderId: orderId
            },
            include: [{
              model: EMPLOYEE
            }]
          })
          if(assignDetails)
          {
          var ridername = assignDetails.employee.firstName +' '+assignDetails.employee.lastName;
          var message = ridername+" has pickedup your order. He is on the way.";
          var title   = "Order Started";
          var deliverId = assignDetails.employee.id;
          var deliverContact = assignDetails.employee.phoneNumber;
        }else{
          var ridername ="";
          var message ="";
          var title   = "Order Started";
          var deliverId = "";
          var deliverContact = "";
        }
        }else{
          var message = restaurantDetails.companyName+" rider is on the way.";
          var title   = "Order Started";
        }
        
      }
      if(message != "")
      {
        if(users.dataValues.deviceToken != "")
        {
          var notifPushUserData={
            title: title,
            description: message,
            token: users.dataValues.deviceToken,
            platform: users.dataValues.platform,
            userId : users.dataValues.id,
            role: '3',
            orderId: orderId,
            orderType: orderList.dataValues.orderType,
            orderNo: orderList.dataValues.orderNo,
            riderId: deliverId,
            phoneNumber: deliverContact,
            notificationType:title,
            status: orderStatus,
            readStatus: 0
          } 
          commonNotification.insertNotification(notifPushUserData);
          commonNotification.sendNotification(notifPushUserData);
        }

        
      }
      
        var response = await ORDERS.update({
          progressStatus: orderStatus
        },{
          where: {
            id: orderId
          }
        });
      

      
      return res.json({
        code: 200,
        message: 'Order status change Successfully'
      })
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Cancel/Reject Order Status
  *@Method POST
  *@params orderId , Status
  * 0-Pending/Not Confirmed, 1-> Confirmed , 2->Cancelled , 3->Processing,4//cancelled by company, 5->Completed
  */
  cancelOrder: async (req, res, next) => {
    try
    {
      const data      = req.body;
      const orderList = await ORDERS.findOne({
        where: {
          id: data.orderId
        }
      });

      const users = await USER.findOne({
        where: {
          id: orderList.dataValues.userId
        }
      });
      if(!orderList)
      {
         return res.json({
          code: 404,
          message: 'No Order Found'
        })
      }

      const restaurantDetails = await COMPANY.findOne({
        where: {
          id: orderList.dataValues.companyId
        }
      });
      var orderId     = data.orderId;
      var orderStatus = data.orderStatus;
      var reason      = data.reason;
      var additionalComment = data.additionalComment;
      var response = await ORDERS.update({
        progressStatus: orderStatus,
        cancellationReason: reason,
        additionalComment: additionalComment
      },{
        where: {
          id: orderId
        }
      });

      if(reason != "" && reason == "Too Busy")
      {
        await COMPANY.update({
          busyTime: '60'
        },{
          where: {
            id: orderList.dataValues.companyId
          }
        });
      }

      if(orderStatus == '6')
      {
        if(reason != "" && reason != "Others")
        {
          var message = restaurantDetails.dataValues.companyName+" cannot take your order due to "+reason+". Try other chef with us." ;
        }else{
          var message = restaurantDetails.dataValues.companyName+" cannot take your order. Try other chef with us." ;
        }
        //var message = restaurantDetails.dataValues.companyName"Order rejected successfully. Due to "+reason ;
        var title   = "Order Rejected";
        var responseMessage = "Order rejected successfully.";
      }else{
        if(reason != "" && reason != "Others")
        {
          var message = "Order cancelled successfully. Due to "+reason ;
        }else{
          var message = "Order cancelled successfully." ;
        }
        //var message = "Order cancelled successfully. Due to "+reason ;
        var title   = "Order Cancelled";
        var responseMessage = "Order cancelled successfully.";

        var assignDetails = await ASSIGNMENT.findOne({
          where: {
            orderId: orderId
          },
          include: [{
            model: EMPLOYEE
          }]
        })
          //
        if(assignDetails)
        {
          var rejectDate = moment(new Date()).format("YYYY-MM-DD");
          await ASSIGNMENT.update({
            jobStatus: 2,
            rejectDate: rejectDate,
          },
            {
            where : {
              orderId:orderId
            }
          });
          //console.log(assignDetails.employee);
          if(assignDetails.employee.deviceToken != "")
          {
            var notifPushUserData={
              title: title,
              description: message,
              token:  assignDetails.employee.deviceToken,
              platform: assignDetails.employee.platform,
              userId : assignDetails.employee.id,
              role: '4',
              orderId: orderId,
              orderType: orderList.dataValues.orderType,
              orderNo: orderList.dataValues.orderNo,
              riderId: '',
              phoneNumber: '',
              notificationType:title,
              status: orderStatus,
              readStatus: 0
            } 
            commonNotification.insertNotification(notifPushUserData);
            commonNotification.sendNotification(notifPushUserData);
          }
        }
      }
      if(users.dataValues.deviceToken != "")
      {
        var notifPushUserData={
          title: title,
          description: message,
          token: users.dataValues.deviceToken,
          platform: users.dataValues.platform,
          userId : orderList.dataValues.userId,
          role: '3',
          orderId: orderId,
          orderType: orderList.dataValues.orderType,
          orderNo: orderList.dataValues.orderNo,
          notificationType:title,
          status: orderStatus,
          readStatus: 0
        }
        commonNotification.insertNotification(notifPushUserData);
        commonNotification.sendNotification(notifPushUserData);
      }
      return res.json({
        code: 200,
        message: responseMessage,
        orderId: data.orderId
      })
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Accept Order Status
  *@Method POST
  *@params orderId , Status
  * 1-> Accepted ,
  * acceptedBy->Self / Rider
  * Delay
  */
  AcceptOrder: async (req, res, next) => {
    try
    {
      const data      = req.body;
      //var currentTime = moment().format('LT');
      var currentTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      const orderList = await ORDERS.findOne({
        where: {
          id: data.orderId
        }
      });

      //Get SubOrders
      const suborderList = await SUBORDERS.findAll({
        attributes: ['id'],
        where: {
          orderId: data.orderId
        }
      });
      //Get User Details
      const users = await USER.findOne({
        where: {
          id: orderList.dataValues.userId
        }
      });
      if(!orderList)
      {
         return res.json({
          code: 404,
          message: 'No Order Found'
        })
      }

      var RestaurantDetails = await COMPANY.findOne({
        attributes: ['companyName','latitude','longitude','address1','deliveryFee','latitude','longitude'],
        where: {
          id: orderList.dataValues.companyId
        }
      });
      var restName = RestaurantDetails.dataValues.companyName;
      var delay      = data.delay;
      if(delay != "")
      { 
        var ret = delay.replace(' min','');
        console.log(ret);
        var updatedtime = moment(orderList.dataValues.serviceDateTime).add(ret, 'm').format("YYYY-MM-DD HH:mm:ss");
        var messageTitle = "Chef "+restName+" accepted your order. Order will be delayed "+delay+"." ;
      }else{
        var messageTitle = "Chef "+restName+" accepted your order.";
        var updatedtime = orderList.dataValues.serviceDateTime;
      }
      var orderId    = data.orderId;
      var acceptedBy = data.acceptedBy;
      
      var response = await ORDERS.update({
        progressStatus: '1',
        serviceDateTime: updatedtime,
        acceptedBy: acceptedBy,
        delay: delay,
        acceptTime: currentTime
      },{
        where: {
          id: orderId
        }
      });

      //Send Notification Accept Case
      if(users.dataValues.deviceToken != "")
        {
          //Send Notification to Customer For Accepred Order
          var notifPushUserData={
            title:"Order Accepted",
            description: messageTitle,
            token: users.dataValues.deviceToken,
            platform: users.dataValues.platform,
            userId : orderList.dataValues.userId,
            role: '3',
            orderId: orderId,
            orderType: orderList.dataValues.orderType,
            orderNo: orderList.dataValues.orderNo,
            notificationType:"Order Accepted",
            status: 1,
            readStatus: delay
          } 
          commonNotification.insertNotification(notifPushUserData);
          commonNotification.sendNotification(notifPushUserData);
        }

      //Change Order Status to Processing in ASAP Case
      if(orderList.dataValues.scheduleType == '0')
      {

        var availArray = [];
        availArray.push('1');

        var response = await ORDERS.update({
          progressStatus: '3',
        },{
          where: {
            id: orderId
          }
        });

        if(users.dataValues.deviceToken != "")
        {
          //Send Notification to Customer For Processing Order
          var messageTitle = "Chef "+restName+" started cooking.";
          var notifPushUserData={
            title:"Order Processing",
            description: messageTitle,
            token: users.dataValues.deviceToken,
            platform: users.dataValues.platform,
            userId : orderList.dataValues.userId,
            role: '3',
            orderId: orderId,
            orderType: orderList.dataValues.orderType,
            orderNo: orderList.dataValues.orderNo,
            notificationType:"Order Processing",
            status: 3,
            readStatus: delay
          }
          commonNotification.insertNotification(notifPushUserData);
          setTimeout(function(){
            commonNotification.sendNotification(notifPushUserData);
          },3000);
          //commonNotification.sendNotification(notifPushUserData);
        }
      } else{
         var availArray = [];
          availArray.push('0');
          availArray.push('1');
      }
     
      if(orderList.dataValues.orderType == "Delivery" && acceptedBy != "Self")
      {

        if(delay != "")
        { 
          var ret = delay.replace(' min','');
          var getupdatedtime = moment.utc(orderList.dataValues.serviceDateTime).add(ret, 'm').format("YYYY-MM-DD HH:mm:ss");
        }else{
          var getupdatedtime = moment.utc(orderList.dataValues.serviceDateTime).format("YYYY-MM-DD HH:mm:ss");
        }
        console.log(getupdatedtime,"Sfsdfsdfsdfsd")
        //Get All Employee and Sent Request To All Employees
        var distances = 40;
        var ratinghaving = Sequelize.literal(`distance <= ${distances}`);
        let searchEmp = await EMPLOYEE.findAll({
          attributes: ['id','deviceToken','platform',
          [Sequelize.literal("6371 * acos(cos(radians("+RestaurantDetails.dataValues.latitude+")) * cos(radians("+`employees.currentLat`+")) * cos(radians("+RestaurantDetails.dataValues.longitude+") - radians("+`employees.currentLong`+")) + sin(radians("+RestaurantDetails.dataValues.latitude+")) * sin(radians("+`employees.currentLat`+")))"),'distance']],
          where: {
            id: {
              [Op.notIn]:  [Sequelize.literal("select empId from assignedEmployees JOIN orders ON assignedEmployees.orderId=orders.id WHERE assignedEmployees.jobStatus IN('1','3') AND orders.serviceDateTime = '"+getupdatedtime+"'")]
            },
            // availableStatus: {
            //   [Op.in]: ['0','1']
            // },
            availableStatus: {
              [Op.in]: availArray
            },
            status:1
          },
          having: ratinghaving,
        });  
        var tokensArray = [];
        var NewArray = [];
        var newate = moment(new Date()).format("YYYY-MM-DD")
        var tokens = searchEmp.forEach(function (user) {
            var array = {};
            if(user.deviceToken != "")
            {
              array.id = user.id;
              array.token = user.deviceToken;
              array.type = user.platform;
              tokensArray.push(array);
            }
            var orderArray = {};
            orderArray.empId     = user.id;
            orderArray.orderId   = orderId; 
            orderArray.assignedDate = newate;
            orderArray.jobStatus = '0';
            NewArray.push(orderArray);
        });
        if(orderList.dataValues.scheduleType != '0')
        {
          await ASSIGNMENT.bulkCreate(NewArray);
        }
        if(tokensArray.length > 0)
        {
          var title = "Booking Request";
          var message = "You have new booking request.";
          var notifPushUserData={
              title: title,
              description: message,
              userId : orderList.dataValues.userId,
              role: '4',
              orderId: orderId,
              orderType: orderList.dataValues.orderType,
              orderNo: orderList.dataValues.orderNo,
              deliverLocation: orderList.dataValues.address,
              deliverLatitude: orderList.dataValues.latitude,
              deliverLong: orderList.dataValues.longitude,
              pickupLocation: RestaurantDetails.dataValues.address1,
              pickupLatitude: RestaurantDetails.dataValues.latitude,
              pickupLong: RestaurantDetails.dataValues.longitude,
              earning: RestaurantDetails.dataValues.deliveryFee,
              totalItem: suborderList.length,
              amount: orderList.dataValues.totalOrderPrice,
              notificationType:"Order Booking Request",
              status: 3,
              readStatus: delay
            }
          commonNotification.sendEmpNotification(notifPushUserData,tokensArray);
        }
      }
      return res.json({
        code: 200,
        message: 'Order Accepted Successfully'
      })
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Accept Order Status
  *@Method POST
  *@params orderId , delay
  */
  updateOrderDelay: async (req, res, next) => {
    try
    {
      const data      = req.body;
      const orderList = await ORDERS.findOne({
        where: {
          id: data.orderId
        }
      });
      if(!orderList)
      {
         return res.json({
          code: 404,
          message: 'No Order Found'
        })
      }
      var orderId     = data.orderId;
      var delay       = data.delay;
      var ret = delay.replace(' min','');
      console.log(ret);
      var updatedtime = moment(orderList.dataValues.serviceDateTime).add(ret, 'm').format("YYYY-MM-DD HH:mm:ss");
      var response = await ORDERS.update({
        delay: delay,
        serviceDateTime: updatedtime
      },{
        where: {
          id: orderId
        }
      });

      //Get User Details
      const users = await USER.findOne({
        where: {
          id: orderList.dataValues.userId
        }
      });
      //Send Notification Accept Case
      if(users.dataValues.deviceToken != "")
      {
        var messageTitle = "Your order will be delayed by "+delay+"" ;
        var notifPushUserData={
          title:"Order Delayed",
          description: messageTitle,
          token: users.dataValues.deviceToken,
          platform: users.dataValues.platform,
          userId : orderList.dataValues.userId,
          role: '3',
          orderId: orderId,
          notificationType:"Order Delayed",
          status: 1,
          readStatus: delay
        } 
        commonNotification.insertNotification(notifPushUserData);
        commonNotification.sendNotification(notifPushUserData);
      }


      return res.json({
        code: 200,
        message: 'Order time updated Successfully'
      })
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Complete Order list
  *Method GET
  *@params restaurantId
  */
  completeOrderList: async (req, res, next) => {
    try
    {
      const data    = req.body;

      if(data.startDate != "" && data.endDate != "" && data.timeZone != "" && data.startDate && data.endDate && data.timeZone)
      {
        //Get Start Date
        var NewStart  = new Date(data.startDate).toLocaleString("en-US", {timeZone: data.timeZone});
        NewStart  = moment(NewStart).format("YYYY-MM-DD");

        //Get End Date
        var NewEnd  = new Date(data.endDate).toLocaleString("en-US", {timeZone: data.timeZone});
        NewEnd  = moment(NewEnd).format("YYYY-MM-DD");

        var where = {
          progressStatus: '5',
          companyId: data.restaurantId,
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'<=', NewStart),
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'>=', NewEnd),
            { 
              companyId: params.restaurantId 
            }
          ]
        }
      }
      else
      {
        //Check Where Conditions
        var where={
          progressStatus: '5',
          companyId: data.restaurantId
        }
      }

      //Filter With Cusions
      if(data.sortby == "date")
      {
        var orderby = Sequelize.literal(`orders.updatedAt DESC`)
      }else if(data.sortby == "orderId"){
        var orderby = Sequelize.literal(`orderNo DESC`)
      }else{
        var orderby = Sequelize.literal(`orderNo ASC`)
      }


      //Filter With Order ID
      if(data.orderNo != "" && data.orderNo)
      { 
        var orderNo = data.orderNo;
        var ret = orderNo.replace('ORDER00','');
        console.log(ret);
        if(ret != "")
        {
          where.orderNo = {
            [Op.like]: `%${data.orderNo}%`
          };
        }
      }

      //Get Incoming Order
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','progressStatus','address','scheduleType','processTime','orderType',
        'couponDiscount','promoCode','updatedAt','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [Sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [Sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: where,
          order: orderby,
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANYRATING
            }
          ]
        });

      if(orderList)
      {
        return res.json({
          code: 200,
          message: 'Order List Fetch Successfully',
          data: orderList
        })
      } else {
         return res.json({
          code: 404,
          message: 'No Order Found',
          data: orderList
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Rejected Order list
  *Method GET
  *@params restaurantId
  */
  rejectedOrderList: async (req, res, next) => {
    try
    {
      const data    = req.body;
      console.log("parsms====",data);
      if(data.startDate != "" && data.endDate != "" && data.timeZone != "" && data.startDate && data.endDate && data.timeZone)
      {
        //Get Start Date
        var NewStart  = new Date(data.startDate).toLocaleString("en-US", {timeZone: data.timeZone});
        NewStart  = moment(NewStart).format("YYYY-MM-DD");

        //Get End Date
        var NewEnd  = new Date(data.endDate).toLocaleString("en-US", {timeZone: data.timeZone});
        NewEnd  = moment(NewEnd).format("YYYY-MM-DD");

        var where = {
          progressStatus: '6',
          companyId: data.restaurantId,
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'<=', NewStart),
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'>=', NewEnd),
            { 
              companyId: params.restaurantId 
            }
          ]
        }
      }
      else
      {
        //Check Where Conditions
        var where={
          progressStatus: '6',
          companyId: data.restaurantId
        }
      }
       //Check Where Conditions

      //Filter With Order ID
      if(data.orderNo != "" && data.orderNo)
      { 
        var orderNo = data.orderNo;
        var ret = orderNo.replace('ORDER00','');
        console.log(ret);
        if(ret != "")
        {
          where.orderNo = {
            [Op.like]: `%${data.orderNo}%`
          };
        }
      }
      //Filter With Cusions
      if(data.sortby == "date")
      {
        var orderby = Sequelize.literal(`orders.updatedAt DESC`)
      }else if(data.sortby == "orderId"){
        var orderby = Sequelize.literal(`orderNo DESC`)
      }else{
        var orderby = Sequelize.literal(`orderNo ASC`)
      }

      //Get Incoming Order
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','progressStatus','address','scheduleType','processTime','orderType',
        'couponDiscount','promoCode','updatedAt','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [Sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [Sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: where,
          order: orderby,
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANYRATING
            }
          ]
        });

      if(orderList)
      {
        return res.json({
          code: 200,
          message: 'Order List Fetch Successfully',
          data: orderList
        })
      } else {
         return res.json({
          code: 404,
          message: 'No Order Found',
          data: orderList
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Cancel Order list
  *Method GET
  *@params restaurantId
  */
  cancelOrderList: async (req, res, next) => {
    try
    {
      const data    = req.body;

       //Check Where Conditions
        if(data.startDate != "" && data.endDate != "" && data.timeZone != "" && data.startDate && data.endDate && data.timeZone)
      {
        //Get Start Date
        var NewStart  = new Date(data.startDate).toLocaleString("en-US", {timeZone: data.timeZone});
        NewStart  = moment(NewStart).format("YYYY-MM-DD");

        //Get End Date
        var NewEnd  = new Date(data.endDate).toLocaleString("en-US", {timeZone: data.timeZone});
        NewEnd  = moment(NewEnd).format("YYYY-MM-DD");

        var where = {
          progressStatus: ['2','4'],
          companyId: data.restaurantId,
          [Op.and]: [
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'<=', NewStart),
            sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'>=', NewEnd),
            { 
              companyId: params.restaurantId 
            }
          ]
        }
      }
      else
      {
        //Check Where Conditions
        var where={
          progressStatus: ['2','4'],
          companyId: data.restaurantId
        }
      }
     
      //Filter With Order ID
      if(data.orderNo != "" && data.orderNo)
      { 
        var orderNo = data.orderNo;
        var ret = orderNo.replace('ORDER00','');
        console.log(ret);
        if(ret != "")
        {
          where.orderNo = {
            [Op.like]: `%${data.orderNo}%`
          };
        }
      }
      //Filter With Cusions
      if(data.sortby == "date")
      {
        var orderby = Sequelize.literal(`orders.updatedAt DESC`)
      }else if(data.sortby == "orderId"){
        var orderby = Sequelize.literal(`orderNo DESC`)
      }else{
        var orderby = Sequelize.literal(`orderNo ASC`)
      }

      //Get Incoming Order
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','progressStatus','address','scheduleType','processTime','orderType',
        'couponDiscount','promoCode','updatedAt','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [Sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [Sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: where,
          order: orderby,
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANYRATING
            }
          ]
        });

      if(orderList)
      {
        return res.json({
          code: 200,
          message: 'Order List Fetch Successfully',
          data: orderList
        })
      } else {
         return res.json({
          code: 404,
          message: 'No Order Found',
          data: orderList
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Add Restaurant Review
  *@Method POST
  *@params orderId , restaurantReview
  */
  addReviews: async (req, res, next) => {
    try
    {
      const data           = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.restaurantReview,data.orderId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      
      var restaurantReview = data.restaurantReview;
      var orderId          = data.orderId;

      var response = await COMPANYRATING.update({
        restaurantReview: restaurantReview
      },{
        where: {
          orderId: orderId
        }
      });
      return res.json({
        code: 200,
        message: 'Review updated Successfully',
        body: data
      })
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /**
  *@role Get Earnings
  *@Method Post
  */
  getEarning: async (req, res) => {
    var params=req.body;
    let responseNull=  commonMethods.checkParameterMissing([params.restaurantId])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
    try {
      var where = {
        companyId:params.restaurantId,
        progressStatus: '5'
      }
      if(params.startDate && params.endDate && params.startDate != "" && params.endDate != "")
      {
        var where = {
          companyId:params.restaurantId,
          progressStatus: '5',
          [Op.and]: [
            Sequelize.where(Sequelize.fn('date', Sequelize.col('serviceDateTime')),'>=', params.startDate),
            Sequelize.where(Sequelize.fn('date', Sequelize.col('serviceDateTime')),'<=', params.endDate)
          ]
        }
      }
      var user = await ORDERS.findAll({
        attributes: ['id','orderNo','totalOrderPrice'],
        where: where
      });
       var column = [];
       for(var i=0; i<user.length; i++){
          column.push(user[i].id);
       }
       console.log(column)

      var earn = await EARNING.findOne({
        attributes: [[Sequelize.fn('sum', Sequelize.col('restaurantFees')), 'totalEarning' ],
        [Sequelize.fn('sum', Sequelize.col('adminFees')), 'fees' ]] ,
        where: {
          orderId:{
            [Op.in]: column
          }
        }
      });
      var totalChild = user.reduce((accum,item) => accum + parseInt(item.totalOrderPrice), 0);
      var totalOrder = user.length;
      var array = {};
      array.totalOrder = totalOrder;
      array.orderValue = totalChild;
      array.earn = earn;
      //user=JSON.parse(JSON.stringify(user))
      return responseHelper.post(res,appstrings.detail,array);
    } catch (e) {
    return responseHelper.error(res, e.message, 400);
    }
  },

};

