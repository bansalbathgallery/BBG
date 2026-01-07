
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
const keyPublishable = configDev.PAYKEY;
const keySecret = configDev.PAYSECRET;
const SETTING= db.models.settings;
const EARNING= db.models.earnings;
const stripe = require("stripe")(keySecret);
//Relations
CART.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(COMPANY,{foreignKey: 'companyId'});
ORDERS.hasMany(SUBORDERS, {foreignKey: 'orderId'});
ORDERS.hasOne(orderPayment,{foreignKey: 'orderId'});
SUBORDERS.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.hasOne(COMPANYRATING, {foreignKey: 'orderId'});
SERVICES.hasOne(serviceRating, {foreignKey: 'orderId'});
const COUPAN   = db.models.coupan;
module.exports = {

  /*
  *@role Order list
  *Method GET
  */
  orderList: async (req, res, next) => {
    try
    {
      let userId    = req.query.userId;
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','progressStatus','address','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount']],
          where: {
            userId: userId
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: COMPANY,
              attributes: ['id','companyName','images','logo1','firstName','lastName','email','countryCode','phoneNumber','region','latitude','longitude'],
            },
            {
              model: COMPANYRATING
            },
            {
              model: SUBORDERS,
              attributes: ['orderId','serviceId','price','quantity',
              [Sequelize.literal('`suborders->service`.`name`'), 'ServiceName'],
              [Sequelize.literal('`suborders->service`.`price`'), 'ServicePrice'],
              [Sequelize.literal('`suborders->service`.`icon`'), 'icon']],
              include: [
              {
                model: SERVICES,
                attributes: ['name','icon','price'],
                include: [{
                  model: serviceRating
                }]
              }]
            }
          ],
          order: [
            ['orderNo', 'DESC'],
          ],
        });
      
      if(orderList.length > 0)
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
          data: []
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Order Hsitrory
  *Method GET
  */
  orderHistory: async (req, res, next) => {
    try
    {
      let userId    = req.query.userId;
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','progressStatus','address','orderType',
        'couponDiscount','promoCode','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount']],
          where: {
            userId: userId,
            progressStatus:{
              [Op.eq]: '5'
            }
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: COMPANYRATING,
              required: false
            },
            {
              model: SUBORDERS,
              attributes: ['orderId','serviceId','price','quantity',
              [Sequelize.literal('`suborders->service`.`name`'), 'ServiceName'],
              [Sequelize.literal('`suborders->service`.`icon`'), 'icon']],
              include: [
              {
                model: SERVICES,
                attributes: ['name','icon'],
                include: [{
                  model: serviceRating,
                  required: false
                }]
              }]
            }
          ]
        });
      
      if(orderList.length > 0)
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
          data: []
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Create Order
  *@Method POST 
  *@params serviceDateTime,userId,companyId
  *@params orderType,transactionId,address
  */
  createOrder: async (req, res, next) => {
    try
    {
      const data    = req.body;
      var userId    = data.userId;
      var companyId = data.companyId;

      //Get Restaurant Details
      var RestaurantDetails = await COMPANY.findOne({
        where: {
          id: companyId
        }
      });

      if(data.orderType == "Delivery")
      {
        if(RestaurantDetails.dataValues.deliveryFee != "")
        {
          var deliveryFees = parseInt(RestaurantDetails.dataValues.deliveryFee);
        }else{
          var deliveryFees = 0;
        }
      }else{
        var deliveryFees = 0;
      }
      


      //Applied Coupan Details
      var coupanDetails = await userCoupan.findOne({
        attributes: ['id','coupanId','coupanCode','coupanDiscount','totalAmount','discountPrice','payableAmount'],
        where: {
          userId: userId
        }
      });
      if(coupanDetails)
      {
        var couponId       = coupanDetails.dataValues.coupanId;
        var couponCode     = coupanDetails.dataValues.coupanCode;
        var couponDiscount = coupanDetails.dataValues.coupanDiscount;
        var discountPrice  = coupanDetails.dataValues.discountPrice;
        var totalAmount    = coupanDetails.dataValues.totalAmount;
        var payableAmount  = coupanDetails.dataValues.payableAmount;
      }
      else
      {
        const GetTotalPrice = await CART.findOne({
        attributes: [[Sequelize.fn('sum', Sequelize.col('orderTotalPrice')), 'totalPrice']],
          where: {
            userId: userId
          }
        });
        var tOrderPrice = GetTotalPrice.dataValues.totalPrice;
        var OrdertPrice = tOrderPrice + deliveryFees;
        OrdertPrice     = OrdertPrice.toString();
        var tPrice      = tOrderPrice.toString();
        //tPrice  = tPrice.toString(); 
        var couponId       = "";
        var couponCode     = "";
        var couponDiscount = "";
        var discountPrice  = "";
        var totalAmount    = tPrice;
        var payableAmount  = OrdertPrice;
      }
      //End Applied coupon Details

      //Create Payment
      if(data.cardId == "")
      {
        stripe.customers.createSource(data.customerId, {
          source: data.cardToken,
        }, function (errs, card) {
          if (card) {
            stripe.charges.create({
              amount: parseInt(payableAmount) * 100,
              description: "Order Payments",
              currency: "inr",
              customer: data.customerId,
              source: card.id,
              receipt_email: "order@seasia.in"
            }, async function (err, charge) {
              if (charge) {
                var orderresponse = await createO(companyId,userId,data,totalAmount,couponId,couponCode,couponDiscount,discountPrice,payableAmount,charge);
                return res.json({
                  code: 200,
                  message: 'Order Placed Successfully',
                  body: orderresponse
                })
              } else {
                  console.log('err 2 ----', err);
                  return res.json({status: err.statusCode, message: err.raw.message});
              }
            });
          } else {
            console.log('charge fail');
            return res.json({status: errs.statusCode, message: errs.raw.message});
          }
        });
      }else{
        stripe.charges.create({
          amount: parseInt(payableAmount) * 100,
          description: "Order Payments",
          currency: "inr",
          customer: data.customerId,
          source: data.cardId,
          receipt_email: "order@seasia.in"
        }, async function (err, charge) {
          if (charge) {
            var orderresponse = await createO(companyId,userId,data,totalAmount,couponId,couponCode,couponDiscount,discountPrice,payableAmount,charge);
            return res.json({
              code: 200,
              message: 'Order Placed Successfully',
              body: orderresponse
            })
          } else {
            console.log('err 2 ----', err);
            return res.json({status: err.statusCode, message: err.raw.message});
          }
        });
      }
      

      // var AssignTimeDetails =  await assignTimeSlot.findOne({
      //   attributes: ['id','quantity'],
      //   where: {
      //     companyId: companyId,
      //     timeslotId: data.timeslotId,
      //     date: data.bookingDate
      //   }
      // });
      // if(AssignTimeDetails)
      // {
      //   var limit = 1;
      //   await assignTimeSlot.update({
      //       quantity: Sequelize.literal('quantity + '+limit+'')
      //     },{
      //     where: {
      //       companyId: companyId,
      //       timeslotId: data.timeslotId,
      //       date: data.bookingDate
      //     }
      //   });
      // }else{
      //   const responseTimeSlot = await assignTimeSlot.create({
      //     companyId: companyId,
      //     timeslotId: data.timeslotId,
      //     date: data.bookingDate,
      //     quantity: 1
      //   });
      // }

      
     
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Cancel Order
  *@Method POST
  *@params userId,companyId,orderId 
  */
  cancelOrder: async (req, res, next) => {
    try
    {
      const data    = req.query;
      var response = await ORDERS.update({
        progressStatus: '2'
      },{
        where: {
          id: data.orderId
        }
      });
      return res.json({
        code: 200,
        message: 'Order Cancelled Successfully'
      })
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

    testPayment: async (req, res, next) => {
    try
    {
      const formData    = req.body;
      var customer_id   = formData.customerId;
      var cardToken     = formData.cardToken;
      // stripe.customers.createSource(customer_id, {
      //   source: cardToken,
      // }, function (errs, card) {
        // console.log('card---', card);
        // if (card) {
          stripe.charges.create({
            amount: 350,
            description: "Order Payments",
            currency: "inr",
            customer: customer_id,
            source: cardToken,
            receipt_email: "goyalRaghav@seasia.in"
          }, async function (err, charge) {
            if (charge) {
                console.log('charge 2 ----', charge);
                return res.json({status: 200, message: "Payment Successfull."});
            } else {
                console.log('err 2 ----', err);
                return res.json({status: err.statusCode, message: err.raw.message});
            }
          });
      //   } else {
      //     console.log('charge fail');
      //     return res.json({status: errs.statusCode, message: errs.raw.message});
      //   }
      // });
     
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Add Rating
  *METHOD POST
  */
  addRating: async (req, res, next) => {
    try{
      const data    = req.body;
      var upload=[];
      if(req.files && req.files['icon'])
      {
        var fdata=req.files['icon']
        if(fdata.length && fdata.length>0)
        {
          for(var k=0;k<fdata.length;k++)
          {
            ImageFile = req.files['icon'][k];    
            bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
            upload.push(bannerImage);
            ImageFile.mv(configDev.UPLOAD_DIRECTORY +"services/icons/"+ bannerImage, function (err) {
            //upload file
            if (err)
              return responseHelper.error(res, err.meessage, 400);   
            }); 
          }
        }
        else
        {
          ImageFile = req.files['icon'];    
          bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
          upload.push(bannerImage);
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"services/icons/"+ bannerImage, function (err) {
            //upload file
            if (err)
            return responseHelper.error(res, err.meessage, 400);   
          });
        }
      }
      //Add Restaurant Rating
      await COMPANYRATING.create({
        rating: data.rating,
        review: data.review,
        userId:data.userId,
        companyId:data.companyId,
        orderId:data.orderId,
        reviewImage: upload.toString(),
      });

      //Add Particular Service Rating
      var NewArray = [];
      var dishes = JSON.parse(data.dishes);
      for (var i = 0; i < dishes.length; i++) {
        var array = {};
        array.serviceId = dishes[i].serviceId;
        array.rating    = dishes[i].rating;
        array.userId    = data.userId;
        array.orderId   = data.orderId;
        array.review    = data.review;
        NewArray.push(array);
      }
      const response = await serviceRating.bulkCreate(NewArray);

      return responseHelper.post(res, appstrings.rating_added,data);
    }
    catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Add Rating
  *METHOD POST
  */
  addRatingAndroid: async (req, res, next) => {
    try{
      const data    = req.body;
      var upload=[];
      if(req.files && req.files['icon'])
      {
        var fdata=req.files['icon']
        if(fdata.length && fdata.length>0)
        {
          for(var k=0;k<fdata.length;k++)
          {
            ImageFile = req.files['icon'][k];    
            bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
            upload.push(bannerImage);
            ImageFile.mv(configDev.UPLOAD_DIRECTORY +"services/icons/"+ bannerImage, function (err) {
            //upload file
            if (err)
              return responseHelper.error(res, err.meessage, 400);   
            }); 
          }
        }
        else
        {
          ImageFile = req.files['icon'];    
          bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
          upload.push(bannerImage);
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"services/icons/"+ bannerImage, function (err) {
            //upload file
            if (err)
            return responseHelper.error(res, err.meessage, 400);   
          });
        }
      }
      //Add Restaurant Rating
      await COMPANYRATING.create({
        rating: data.rating,
        review: data.review,
        userId:data.userId,
        companyId:data.companyId,
        orderId:data.orderId,
        reviewImage: upload.toString(),
        topicRating: data.dishesRating,
      });

      //Add Particular Service Rating
      // var NewArray = [];
      // var dishesR = JSON.parse(data.dishesRating);
      // var dishes = JSON.parse(data.dishes);
      // for (var i = 0; i < dishes.length; i++) {
      //   var array = {};
      //   array.serviceId = dishes[i];
      //   array.rating    = dishesR[i];
      //   array.userId    = data.userId;
      //   array.orderId   = data.orderId;
      //   array.review    = data.review;
      //   NewArray.push(array);
      // }
      // console.log(NewArray)
      // const response = await serviceRating.bulkCreate(NewArray);

      return responseHelper.post(res, appstrings.rating_added,data);
    }
    catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message, 400);
    }
  },

};

const createO = async function (companyId,userId,data,totalAmount,couponId,couponCode,couponDiscount,discountPrice,payableAmount,charge)
{
    var processTime = '15';
    var orderCreationTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    if(data.serviceDateTime != "")
    {
      var currentDate = data.serviceDateTime;
      var processTime = '15';
    }else{
      var currentDate = orderCreationTime;

      var processTime = '15';
    }

    var compnaydetails = await COMPANY.findOne({
      where: {
        id: companyId
      }
    })

    if(data.orderType == "Delivery")
    {
      if(compnaydetails.dataValues.deliveryFee != "")
      {
        var deliveryFees = parseInt(compnaydetails.dataValues.deliveryFee);
      }else{
        var deliveryFees = 0;
      }
      
    }else{
      var deliveryFees = 0;

    }

    const response = await ORDERS.create({
      companyId: companyId,
      userId: userId,
      serviceDateTime: currentDate,
      orderCreationTime: orderCreationTime,
      address: data.address,
      orderType: data.orderType,       // Pickup,Deloivery
      scheduleType: data.scheduleType, //0->ASAP, 1->Schedule
      latitude: data.latitude,
      longitude: data.longitude,
      orderPrice: totalAmount,
      couponId: couponId,
      promoCode: couponCode,
      processTime: processTime,
      processleftTime: processTime,
      couponDiscount: couponDiscount,
      offerPrice: discountPrice,
      serviceCharges: deliveryFees,
      totalOrderPrice: payableAmount,
      orderDistance: data.orderDistance ? data.orderDistance : '0',
      deliveryTime: data.deliveryTime ? data.deliveryTime : '0 min',
      progressStatus: '0',
      trackStatus: '0',
      trackingLatitude: '',
      trackingLongitude : '',
      cancellationReason : ''
    });
    //End create Order
    //Get Order Id
    const orderId = response.dataValues.id;
    //Cart Details
    var servicesArray = [];
    const getcart = await CART.findAll({
      where: {
        userId: userId
      }
    });
    var OrderArray = [];
    for (var i = 0; i < getcart.length; i++) 
    {

      let OrderService            = {};
      let serviceId               = getcart[i].serviceId;
      let quantity                = getcart[i].quantity;
      let price                   = getcart[i].orderTotalPrice;
      servicesArray.push(serviceId);
      OrderService.orderId        = orderId;
      OrderService.serviceId      = serviceId;
      OrderService.price          = price;
      OrderService.quantity       = quantity;
      OrderService.userId         = userId;
      OrderArray.push(OrderService);
    }
    const BulkOrder = await SUBORDERS.bulkCreate(OrderArray);
    //Create Order Services

    //Get Maximun Dish Time
    const MaxServiceTime = await SERVICES.findOne({
      attributes: [[Sequelize.fn('max', Sequelize.col('duration')), 'maxTime' ]],
      where: {
        id: servicesArray
      },
      raw: true,
    }); 
    const userorderData = await ORDERS.update(
      {
        cookingTime: MaxServiceTime.maxTime,
        cookingleftTime: MaxServiceTime.maxTime
      },
      { 
        where: {
          id:orderId
        }
      }
    )  
    //End Updation 

    //Save Earning
    var Settingdata  = await SETTING.findOne();
    if(Settingdata)
    {
      var deliveryRate  = Settingdata.dataValues.deliveryRate != "" ? Settingdata.dataValues.deliveryRate : '0';
      var pickupRate    = Settingdata.dataValues.pickUpRate != "" ? Settingdata.dataValues.pickUpRate : '0';
      var distancePerKm = Settingdata.dataValues.distancePerKm != "" ? Settingdata.dataValues.distancePerKm : '0';
    }else{
      var deliveryRate  = '0';
      var pickupRate    = '0';
      var distancePerKm = '0';
    }
    if(data.orderType == "Delivery")
    {
      var riderFees = parseInt(data.orderDistance) * parseInt(distancePerKm);
      //riderFees = riderFees +  + parseInt(pickupRate);
      var commission = parseInt(deliveryRate);
      commission     = parseInt(payableAmount)*commission/100;
      commission = Math.round(commission);
      await EARNING.create({
        orderId: orderId,
        distanceRate:distancePerKm,
        pickUpRate: pickupRate,
        deliveryRate:deliveryRate,
        restaurantFees:parseInt(payableAmount) - commission - parseInt(deliveryFees),
        riderFees:deliveryFees,
        adminFees: commission
      });

    }else{
      var commission = parseInt(pickupRate);
      commission     = parseInt(payableAmount)*commission/100;
      commission = Math.round(commission);
      await EARNING.create({
        orderId: orderId,
        distanceRate:'0',
        pickUpRate: '0',
        deliveryRate:'0',
        restaurantFees:parseInt(payableAmount) - commission,
        riderFees:'0',
        adminFees: commission
      });
    }

    //End Earnings
    //Send Notification Accept Case
    if(compnaydetails.dataValues.deviceToken != "")
    {
      //Send Notification to Customer For Processing Order
      var messageTitle = "You have a new order request.";
      var notifPushUserData={
        title:"Order Receive",
        description: messageTitle,
        token: compnaydetails.dataValues.deviceToken,
        platform: compnaydetails.dataValues.deviceType,
        userId : companyId,
        role: '2',
        orderId: orderId,
        notificationType:"Order Receive",
        orderType: data.orderType,
        status: 0,
        readStatus: 0
      } 
      commonNotification.insertNotification(notifPushUserData);
      commonNotification.sendNotification(notifPushUserData);
    }

    //Create Order Payment
    var UsercoupanDetails = {};
    UsercoupanDetails.orderId           = orderId;
    UsercoupanDetails.transactionId     = charge.id;
    UsercoupanDetails.paymentMode       = charge.payment_method;
    UsercoupanDetails.paymentState      = '2';
    UsercoupanDetails.userId            = userId;
    UsercoupanDetails.transactionStatus = '1';
    UsercoupanDetails.amount            = payableAmount;
    UsercoupanDetails.companyId         = companyId;
    const UserResponse = await orderPayment.create(UsercoupanDetails);

    UsercoupanDetails.restaurantName = compnaydetails.dataValues.companyName;
    UsercoupanDetails.address = data.address;
    //Delete All Coupan items
     const numAffectedRows = await CART.destroy({
      where: {
        userId: userId
      }
    }); 

    const numAffedRows = await userCoupan.destroy({
      where: {
        userId: userId
      }
    });   
    return UsercoupanDetails;
}