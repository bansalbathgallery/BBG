
const express = require('express');
const app     = express();
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const moment  = require('moment');
const CART     = db.models.cart
const SERVICES = db.models.services;
const userCoupan = db.models.userCoupons;
//Relations
CART.belongsTo(SERVICES,{foreignKey: 'serviceId'})
const COUPAN   = db.models.coupan;
module.exports = {

  /**
  *@role Get Coupon List
  *@Method GET
  */
  list: async (req, res, next) => {
    try {
      var newDate = moment(new Date()).format("YYYY-MM-DD");
      var orderData = await COUPAN.findAll({
        attributes: ['id','name','code','discount','description','minimumAmount','validupto'],
        order: [
          ['createdAt', 'DESC'],  
        ],
        where :{
          validupto: {
            [Op.gte] : newDate
          },
          usageLimit: {
            [Op.ne]: '0'
          }
        }
      });
      if(orderData.length>0)
          return responseHelper.post(res,appstrings.list_coupan,orderData);
        else
          return responseHelper.post(res,appstrings.no_record,orderData,204);

    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Apply Coupon
  *@Method POST
  */
  applyCoupon: async (req, res, next) => {
    try{
      const data    = req.body;
      //Get Coupan Details
      const coupanDetails = await COUPAN.findOne({
       attributes: ['id','code','discount','type','minimumAmount'],
        where: {
          code: data.couponCode
        }
      });
      if(coupanDetails)
      {
        //Cart Total Price
        const getcart = await CART.findOne({
         attributes: [[Sequelize.fn('sum', Sequelize.col('orderTotalPrice')), 'totalPrice']],
          where: {
            userId: data.userId
          }
        });
        var orderData = await CART.findAll({
          where :{
            userId : data.userId
          }
        });
        if(orderData.length > 0)
        {
          var RestaurantDetails = await COMPANY.findOne({
            where: {
              id: orderData[0].companyId
            }
          });
          if(data.orderType == '1' && data.orderType)
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

        let price = parseInt(getcart.dataValues.totalPrice);

        if(price < parseInt(coupanDetails.dataValues.minimumAmount))
        {
          return res.json({
            code: 400,
            message: 'Sorry! your order amount should be minimum '+coupanDetails.dataValues.minimumAmount+''
          })
        }
        var totolPrice = price + deliveryFees;
        let per   = parseInt(coupanDetails.dataValues.discount);
        let discount_price = (price/100)*per;        // Get Percentage Amount
        var payableAmount  = price - discount_price;  //Payable Amount
        payableAmount  = payableAmount + deliveryFees;
        const response = await userCoupan.create({
          userId: data.userId,
          coupanId: coupanDetails.dataValues.id,
          coupanCode: coupanDetails.dataValues.code,
          coupanDiscount: coupanDetails.dataValues.discount,
          totalAmount :   price,
          discountPrice : discount_price,
          payableAmount : payableAmount
        });
        return res.json({
          code: 200,
          message: 'Coupon Applied Successfully',
          body: response,
          totolPrice: totolPrice
        })
      }
      else
      {
        return res.json({
          code: 400,
          message: 'Invalid Coupon'
        })
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Remove Coupon
  *@Method POST
  */
  removeCoupan: async (req, res, next) => {
    try{
      const data    = req.body;
      //Get Coupan Details
      const coupanDetails = await COUPAN.findOne({
       attributes: ['id','code','discount'],
        where: {
          id: data.couponId
        }
      });
      if(coupanDetails)
      {
        const numAffectedRows = await userCoupan.destroy({
          where: {
            coupanId: data.couponId,
            userId: data.userId
          }
        }) 
        return res.json({
          code: 200,
          message: 'Coupan removed Successfully'
        })
      }
      else
      {
        return res.json({
          code: 400,
          message: 'Invalid Coupan'
        })
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  }
        
};

