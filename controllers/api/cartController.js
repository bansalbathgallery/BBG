
const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const Op = require('sequelize').Op;
const CART=db.models.cart
const SERVICES = db.models.services;
const userCoupan = db.models.userCoupons;
const companyCuisine   = db.models.companyCuisines;
const COMPANY=db.models.companies;
//Relations
CART.belongsTo(SERVICES,{foreignKey: 'serviceId'})
FAVOURITES.belongsTo(COMPANY,{foreignKey: 'companyId'});
COMPANY.hasMany(companyCuisine, {foreignKey: 'companyId'});
companyCuisine.belongsTo(CATEGORY,{foreignKey: 'categoryId'});
const COUPAN          = db.models.coupan;
module.exports = {
  /*
  *@role Add To cart
  *@Method POST
  */
  add: async (req, res, next) => {
    const params = req.body;
    let responseNull=  commonMethods.checkParameterMissing([params.serviceId,params.orderPrice,params.quantity,params.orderTotalPrice])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
    try{
      //Delete All Prevoius Items Another Rest.
      const checkOtherRest = await CART.findOne({
        where: {
          userId: params.userId,
          companyId: {
              [Op.ne]: params.companyId
            }
        }
      })  
      if(checkOtherRest)
      {
        const numAffectedRows = await CART.destroy({
          where: {
            userId: params.userId
          }
        }); 

        const numAffedRows = await userCoupan.destroy({
          where: {
            userId: params.userId
          }
        });
      }

  		const oderData = await CART.findOne({
    		where: {
          serviceId: params.serviceId,
          userId: params.userId,
          
    		}
  	  })  
      if(oderData)
        return responseHelper.post(res, appstrings.already_exists, null, 400);
      else{

        if(params.userId == '0')
        {
          //Create User For guest User
          const users = await USER.create({
            firstName: 'Guest',
            lastName: 'User',
            email: '',
            region: '',
            address: '',
            phoneNumber: '',
            countryCode: '',
            password: '',
            deviceToken: '',
            platform: 'app',
            companyId: null
          });

          var customerId = users.dataValues.id;
        }else{
          var customerId = params.userId;
        }

        var orderPrice = params.orderPrice;
        // Write APPLY PROMO CODE HERE//
        const orderData = await CART.create({
          serviceId: params.serviceId,
          orderPrice :orderPrice,
          orderTotalPrice :params.orderTotalPrice,
          quantity :params.quantity,
          userId: customerId,
          companyId: params.companyId,
        })  

        //Get Restaurant Details
        var RestaurantDetails = await COMPANY.findOne({
          where: {
            id: params.companyId
          }
        });
        if(params.orderType == '1' && params.orderType)
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
        
        //Check Coupon Applied
        //Applied Coupan Details
        const GetTotalPrice = await CART.findOne({
         attributes: [[Sequelize.fn('sum', Sequelize.col('orderTotalPrice')), 'totalPrice'],
         [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalItems']],
          where: {
            userId: customerId
          }
        });
        if(GetTotalPrice.dataValues.totalPrice === null)
        {
          var tPrice = "";
          var OrdertPrice = "";
        }else{
          
          var tOrderPrice = GetTotalPrice.dataValues.totalPrice;
          var OrdertPrice = tOrderPrice + deliveryFees;
          OrdertPrice     = OrdertPrice.toString();
          var tPrice      = tOrderPrice.toString(); 
        }
        var coupanDetails = await userCoupan.findOne({
          attributes: ['id','coupanId','coupanCode','coupanDiscount','totalAmount','discountPrice','payableAmount'],
          where: {
            userId: customerId
          }
        });
        if(coupanDetails)
        {
          
          let price          = parseInt(GetTotalPrice.dataValues.totalPrice);
          let per            = parseInt(coupanDetails.dataValues.coupanDiscount);
          let discount_price = (price/100)*per;        // Get Percentage Amount
          var payableAmount  = price - discount_price;  //Payable Amount
              payableAmount  = payableAmount + deliveryFees;
          const userorderData = await userCoupan.update(
            {
              totalAmount: price,
              discountPrice: discount_price,
              payableAmount: payableAmount,
            },
            { 
              where: {
                id:coupanDetails.dataValues.id
              }
            }
          )  
          coupanDetails.dataValues.totalAmount     = price.toString();
          coupanDetails.dataValues.payableAmount   = payableAmount.toString();
          coupanDetails.dataValues.discountPrice   = discount_price.toString();
          coupanDetails.dataValues.isCoupanValid   = "true";
          coupanDetails.dataValues.isCouponApplied = "true";
        }else{
          var coupanDetails = {};
          coupanDetails.id              = "";
          coupanDetails.coupanId        = "";
          coupanDetails.coupanCode      = "";
          coupanDetails.coupanDiscount  = "";
          coupanDetails.totalAmount     = tPrice;
          coupanDetails.payableAmount   = OrdertPrice;
          coupanDetails.discountPrice   = "";
          coupanDetails.isCoupanValid   = "false";
          coupanDetails.isCouponApplied = "false";
        }
        //Cart Details
        var servicesArray = [];
        const getcart = await CART.findAll({
          where: {
            userId: customerId
          }
        });
        for (var i = 0; i < getcart.length; i++) 
        {
          let serviceId = getcart[i].serviceId;
          servicesArray.push(serviceId);
        }    
        //Get Maximun Dish Time
        const MaxServiceTime = await SERVICES.findOne({
          attributes: [[sequelize.fn('max', sequelize.col('duration')), 'maxTime' ]],
          where: {
            id: servicesArray
          },
          raw: true,
        }); 

        var CartDataDe = {};
        CartDataDe.totalItems      = GetTotalPrice.dataValues.totalItems;
        CartDataDe.data            = orderData;
        CartDataDe.coupanDetails   = coupanDetails;
        CartDataDe.deliveryCharges = deliveryFees;
        CartDataDe.cookingTime     = MaxServiceTime.maxTime;

        if(orderData) 
        return responseHelper.post(res, appstrings.cart_success, CartDataDe);
        else return responseHelper.post(res, appstrings.oops_something, null,400);
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Update cart
  *@Method POST
  */
  update: async (req, res, next) => {
    const params = req.body;
    let responseNull=  commonMethods.checkParameterMissing([params.cartId,params.serviceId])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
    
    try{
  		const cartData = await CART.findOne({
    		where: {
          id: params.cartId,
          userId: params.userId,
          companyId: params.companyId,
    		}
  	  })  
        
      if(cartData)
      {
        //Check Minimum Amount Valid
        var coupanDetails = await userCoupan.findOne({
          attributes: ['id','coupanId','coupanCode','coupanDiscount','totalAmount','discountPrice','payableAmount'],
          where: {
            userId: params.userId
          }
        });
        if(coupanDetails)
        {
          var userCouponsDetails = await COUPAN.findOne({
            attributes: ['id','code','discount','type','minimumAmount'],
            where: {
              id: coupanDetails.dataValues.coupanId
            }
          });
          if(params.totalAmount)
          {
            var price = parseInt(params.totalAmount);

            if(price < parseInt(userCouponsDetails.dataValues.minimumAmount))
            {

              const removeCoupoan = await userCoupan.destroy({
                where: {
                  coupanId: coupanDetails.dataValues.coupanId,
                  userId: params.userId
                }
              }) 
              // return res.json({
              //   code: 204,
              //   message: 'Sorry! your order amount should be minimum '+userCouponsDetails.dataValues.minimumAmount+''
              // })
            }
          }
        }
        //End Coupon
        //Get Restaurant Details
        var RestaurantDetails = await COMPANY.findOne({
          where: {
            id: params.companyId
          }
        });
        if(params.orderType == '1' && params.orderType)
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

        var coupanDetails = await userCoupan.findOne({
          attributes: ['id','coupanId','coupanCode','coupanDiscount','totalAmount','discountPrice','payableAmount'],
          where: {
            userId: params.userId
          }
        });
        if(params.quantity == '0')
        {
          const numAffectedRows = await CART.destroy({
            where: {
              id: params.cartId
            }
          })  

          const GetCartPrice = await CART.findOne({
           attributes: [[Sequelize.fn('sum', Sequelize.col('orderTotalPrice')), 'totalPrice'],
           [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalItems']],
            where: {
              userId: params.userId
            }
          });
          
          var CartDataDetails = {};
          var coupanDetailNew = {};
          if(GetCartPrice.dataValues.totalPrice == null)
          {
            await userCoupan.destroy({
              where: {
                userId: params.userId
              }
            });
            var payAmount = "";
            var OrdertPrice = "";
            var totolPrice  = 0;
          }else{
            var tpayment    = GetCartPrice.dataValues.totalPrice;
            var OrdertPrice = tpayment + deliveryFees;
            OrdertPrice     = OrdertPrice.toString();
            var payAmount   = tpayment.toString();
            var totolPrice  = tpayment + deliveryFees;
          }
          
          var coupanDetails = await userCoupan.findOne({
            attributes: ['id','coupanId','coupanCode','coupanDiscount','totalAmount','discountPrice','payableAmount'],
            where: {
              userId: params.userId
            }
          });
          if(coupanDetails)
          {

            let price          = parseInt(GetCartPrice.dataValues.totalPrice);
            let per            = parseInt(coupanDetails.dataValues.coupanDiscount);
            let discount_price = (price/100)*per;        // Get Percentage Amount
            var payableAmount  = price - discount_price;  //Payable Amount
                payableAmount  = payableAmount + deliveryFees;
            var userorderData = await userCoupan.update(
              {
                totalAmount: price,
                discountPrice: discount_price,
                payableAmount: payableAmount,
              },
              { 
                where: {
                  id:coupanDetails.dataValues.id,
                  userId: params.userId
                }
              }
            )  
            // coupanDetails.dataValues.totalAmount     = price.toString();
            // coupanDetails.dataValues.payableAmount   = payableAmount.toString();
            // coupanDetails.dataValues.discountPrice   = discount_price.toString();
            // coupanDetails.dataValues.isCoupanValid   = "true";
            // coupanDetails.dataValues.isCouponApplied = "true";
            //var coupanDetailNew = coupanDetails;

            coupanDetailNew.id              = coupanDetails.dataValues.id;
            coupanDetailNew.coupanId        = coupanDetails.dataValues.coupanId;
            coupanDetailNew.coupanCode      = coupanDetails.dataValues.coupanCode;
            coupanDetailNew.coupanDiscount  = coupanDetails.dataValues.coupanDiscount;
            coupanDetailNew.totalAmount     = price.toString();
            coupanDetailNew.payableAmount   = payableAmount.toString();
            coupanDetailNew.discountPrice   = discount_price.toString();
            coupanDetailNew.isCoupanValid   = "true";
            coupanDetailNew.isCouponApplied = "true";

          }else{
            coupanDetailNew.id              = "";
            coupanDetailNew.coupanId        = "";
            coupanDetailNew.coupanCode      = "";
            coupanDetailNew.coupanDiscount  = "";
            coupanDetailNew.totalAmount     = payAmount;
            coupanDetailNew.payableAmount   = OrdertPrice;
            coupanDetailNew.discountPrice   = "";
            coupanDetailNew.isCoupanValid   = "false";
            coupanDetailNew.isCouponApplied = "false";
          }
          //Cart Details
          var servicesArray = [];
          var getcart = await CART.findAll({
            where: {
              userId: params.userId
            }
          });
          for (var i = 0; i < getcart.length; i++) 
          {
            let serviceId = getcart[i].serviceId;
            servicesArray.push(serviceId);
          }    
          //Get Maximun Dish Time
          var MaxServiceTime = await SERVICES.findOne({
            attributes: [[sequelize.fn('max', sequelize.col('duration')), 'maxTime' ]],
            where: {
              id: servicesArray
            },
            raw: true,
          }); 

          CartDataDetails.cookingTime     = MaxServiceTime.maxTime;
          CartDataDetails.totalItems      = GetCartPrice.dataValues.totalItems;
          CartDataDetails.data            = params;
          CartDataDetails.coupanDetails   = coupanDetailNew;
          CartDataDetails.deliveryCharges = deliveryFees;
          CartDataDetails.totolPrice      = totolPrice;
          return responseHelper.post(res, appstrings.cart_update_success, CartDataDetails);
        }
        const orderData = await CART.update(
          {
            serviceId: params.serviceId,
            orderPrice :params.orderPrice,
            orderTotalPrice :params.orderTotalPrice,
            quantity :params.quantity,
          },
          { 
            where: {id:params.cartId}
          }
        )
        const GetTotalPrice = await CART.findOne({
         attributes: [[Sequelize.fn('sum', Sequelize.col('orderTotalPrice')), 'totalPrice'],
          [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalItems']],
          where: {
            userId: params.userId
          }
        });
        if(GetTotalPrice.dataValues.totalPrice === null)
        {
          var tPrice = "";
          var OrdertPrice = "";
          var totolPrice  = 0;
        }else{
          
          var tOrderPrice = GetTotalPrice.dataValues.totalPrice;
          var OrdertPrice = tOrderPrice + deliveryFees;
          OrdertPrice     = OrdertPrice.toString();
          var tPrice      = tOrderPrice.toString();
          var totolPrice  = tOrderPrice + deliveryFees;
        }

        
        if(coupanDetails)
        {

          let price          = parseInt(GetTotalPrice.dataValues.totalPrice);
          let per            = parseInt(coupanDetails.dataValues.coupanDiscount);
          let discount_price = (price/100)*per;        // Get Percentage Amount
          var payableAmount  = price - discount_price;  //Payable Amount
              payableAmount  = payableAmount + deliveryFees;
          var userorderData = await userCoupan.update(
            {
              totalAmount: price,
              discountPrice: discount_price,
              payableAmount: payableAmount,
            },
            { 
              where: {
                id:coupanDetails.dataValues.id,
                userId: params.userId
              }
            }
          )  
          coupanDetails.dataValues.totalAmount     = price.toString();
          coupanDetails.dataValues.payableAmount   = payableAmount.toString();
          coupanDetails.dataValues.discountPrice   = discount_price.toString();
          coupanDetails.dataValues.isCoupanValid   = "true";
          coupanDetails.dataValues.isCouponApplied = "true";
        }else{
          var coupanDetails = {};
          coupanDetails.id              = "";
          coupanDetails.coupanId        = "";
          coupanDetails.coupanCode      = "";
          coupanDetails.coupanDiscount  = "";
          coupanDetails.totalAmount     = tPrice;
          coupanDetails.payableAmount   = OrdertPrice;
          coupanDetails.discountPrice   = "";
          coupanDetails.isCoupanValid   = "false";
          coupanDetails.isCouponApplied = "false";
        }
        
        //Get Cart Details
        const carddetails = await CART.findOne({
          where: {
            id:params.cartId
          }
        }) 

        //Cart Details
        var servicesArray = [];
        var getcart = await CART.findAll({
          where: {
            userId: params.userId
          }
        });
        for (var i = 0; i < getcart.length; i++) 
        {
          let serviceId = getcart[i].serviceId;
          servicesArray.push(serviceId);
        }    
        //Get Maximun Dish Time
        var MaxServiceTime = await SERVICES.findOne({
          attributes: [[sequelize.fn('max', sequelize.col('duration')), 'maxTime' ]],
          where: {
            id: servicesArray
          },
          raw: true,
        }); 
        var CartDataDe = {};
        CartDataDe.totalItems = GetTotalPrice.dataValues.totalItems;
        CartDataDe.data = carddetails;
        CartDataDe.coupanDetails = coupanDetails;
        CartDataDe.deliveryCharges = deliveryFees;
        CartDataDe.totolPrice      = totolPrice;
        CartDataDe.cookingTime     = MaxServiceTime.maxTime;
        if(orderData) 
        return responseHelper.post(res, appstrings.cart_update_success, CartDataDe);

        else return responseHelper.post(res, appstrings.oops_something, null,400);
      }
      else return responseHelper.post(res, appstrings.no_record, null,204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Get cart List
  *@Method GET
  */
  list: async (req, res, next) => {
    try {
      const params = req.body;
      var orderData = await CART.findAll({
        order: [
          ['createdAt', 'DESC'],  
        ],
        where :{
          userId : params.userId
        },
        include: [{
          model: SERVICES,
          attributes: ['id','name','description','price','icon','thumbnail','type','price']
        }]
      });
      var data={};
        if(orderData.length > 0)
        {
          var RestaurantDetails = await COMPANY.findOne({
            where: {
              id: orderData[0].companyId
            }
          });
          if(params.orderType == '1' && params.orderType)
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
        }else{
          var deliveryFees = 0;
        }

        //Applied Coupan Details
        var coupanDetails = await userCoupan.findOne({
          attributes: ['id','coupanId','coupanCode','coupanDiscount','totalAmount','discountPrice','payableAmount'],
          where: {
            userId: params.userId
          }
        });
        if(coupanDetails)
        {
          coupanDetails.dataValues.isCoupanValid = "true";
          coupanDetails.dataValues.isCouponApplied = "true";

          var totolPrice = parseInt(coupanDetails.dataValues.totalAmount) + deliveryFees;
        }else{
          
          if(orderData)
          {
            const GetTotalPrice = await CART.findOne({
            attributes: [[Sequelize.fn('sum', Sequelize.col('orderTotalPrice')), 'totalPrice']],
              where: {
                userId: params.userId
              }
            });
            if(GetTotalPrice.dataValues.totalPrice === null)
            {
              var tPrice = "";
              var OrdertPrice = "";
              var totolPrice  = 0;
            }else{
              var tOrderPrice = GetTotalPrice.dataValues.totalPrice;
              var OrdertPrice = tOrderPrice + deliveryFees;
              OrdertPrice     = OrdertPrice.toString();
              var tPrice      = tOrderPrice.toString(); 
              var totolPrice  = tOrderPrice + deliveryFees;
            }
          }else{
            var tPrice = "";
            var OrdertPrice = "";
            var totolPrice  = 0;
          }
          
          
          var coupanDetails = {};
          coupanDetails.id = "";
          coupanDetails.coupanId = "";
          coupanDetails.coupanCode = "";
          coupanDetails.coupanDiscount = "";
          coupanDetails.discountPrice   = "";
          coupanDetails.totalAmount = tPrice;
          coupanDetails.payableAmount = OrdertPrice;
          coupanDetails.isCoupanValid = "false";
          coupanDetails.isCouponApplied = "false";
        }
      var CartDataDe = {};
      CartDataDe.data            = orderData;
      CartDataDe.coupanDetails   = coupanDetails;
      CartDataDe.deliveryCharges = deliveryFees;
      CartDataDe.totolPrice      = totolPrice;
      if(orderData.length>0){
         return res.json({
            code: 200,
            message: 'Cart Items Found!',
            body: CartDataDe
          })
      }else{
         return res.json({
          code: 201,
          message: 'No Cart Items Found!',
          body: {}
        })
       }

    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  ///////// Clear Cart /////////////////////////
  clearCart: async (req, res, next) => {
    try{
        var services = await CART.destroy({
          where: {
            userId:  params.userId
          }
        });
        //Delete All Coupan items
        const numAffedRows = await userCoupan.destroy({
          where: {
            userId: params.userId
          }
        });
        return res.json({
          code: 200,
          message: 'Your cart list has been cleared.'
        });
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /////////////////////////////////////////////////////
  ///////////////// Favorite Restaurants///////////////
  ////////////////////////////////////////////////////
  /**
  *@Add/Remove Favorite
  *@Method POST
  */
  addToFavorite: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.restaurantId,data.userId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      //Add TO favorite
      if(data.status == '1')
      {
        const checkAlreadyExist = await FAVOURITES.findOne({
          where: {
            companyId: data.restaurantId,
            userId: data.userId
          }
        });
        if(checkAlreadyExist)
        {
          return res.json({
            code: 204,
            message: 'Already restaurant add to favorite.',
            body: data
          });
        }
        //Create User For guest User
        const users = await FAVOURITES.create({
          companyId: data.restaurantId,
          userId: data.userId
        });
        return res.json({
          code: 200,
          message: 'Restaurant add to favorite succesfully.',
          body: data
        });
      }
      else
      {
        //Remove Cart
        await FAVOURITES.destroy({
          where: {
            companyId: data.restaurantId,
            userId: data.userId
          }
        });
        return res.json({
          code: 200,
          message: 'Restaurant remove from favorite succesfully.',
          body: data
        });
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Favorite List
  *@Method GET
  */
  favoriteList: async (req, res) => {
    try{
      const params = req.body;
      var findData = await FAVOURITES.findAll({
        order: [
          ['createdAt', 'DESC'],  
        ],
        where :
        {
          userId : req.id
        },
        include: [
        {
          model: COMPANY, 
          attributes: ['id','companyName','email','holidays','instaMode','phoneNumber','images','logo1','address1','cuisines',
          [sequelize.literal('(SELECT AVG(rating) FROM companyRatings where companyId = company.id)'), 'totalRating'],
          [sequelize.literal('(SELECT min(duration) FROM services where companyId = company.id AND status = 1)'), 'minReadyTime'],
          [sequelize.literal("6371 * acos(cos(radians("+params.latitude+")) * cos(radians("+`company.latitude`+")) * cos(radians("+params.longitude+") - radians("+`company.longitude`+")) + sin(radians("+params.latitude+")) * sin(radians("+`company.latitude`+")))"),'distance'],
          [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = company.id)'), 'totalReview']],
          required:true,
          where: {
             busyTime: '0'
          },
          include: [{
            model: companyCuisine,
            required: false,
            attributes: ['id','categoryId','companyId'],
            include: [{
              model: CATEGORY,
              attributes: ['name']
            }]
          }]
        }]
      });
      return responseHelper.post(res,appstrings.fav_list,findData);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  }

        
};



//Edit User Profile
