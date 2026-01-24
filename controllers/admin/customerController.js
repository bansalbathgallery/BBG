
const express = require('express');
const app     = express();
const Op = require('sequelize').Op;
const { fn, col,cast,literal   } = require('sequelize');
const CART     = db.models.cart
const SERVICES = db.models.services;
const userCoupan = db.models.userCoupons;
const ORDERS     = db.models.orders;
const SUBORDERS  = db.models.suborders;
const orderPayment = db.models.payment;
const USER= db.models.users;
const Sales = db.models.sales;
//Relations
CART.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.hasMany(SUBORDERS, {foreignKey: 'orderId'});
ORDERS.hasOne(orderPayment,{foreignKey: 'orderId'});
SUBORDERS.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(USER,{foreignKey: 'userId'});
ORDERS.belongsTo(COMPANY,{foreignKey: 'companyId'});
// user.js
USER.hasMany(Sales, {
  foreignKey: 'userId'
});

// sale.js
Sales.belongsTo(USER, {
  foreignKey: 'userId'
});
module.exports = {
  /**
  *@Method Get
  *@role Get Company List
  */
  list: async (req, res, next) => {
    try {
      const findData = await USER.findAll({
        attributes: [
          'firstName','lastName','status','countryCode','phoneNumber','id',
          [
      literal('COALESCE(CAST(SUM(`sales`.`sale`) AS CHAR), "0")'),
      'totalSale'
    ]
          ],

        include: [
            {
              model: Sales,
              required: false,
              attributes: [],
              where: { type: 'Deposit' },
            }
          ],
        group: ['users.id']     
      });
      console.log(findData)
      return res.render(superadminfilepath+'user/list.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method POST
  *@role Change Status
  **/
  status: async(req,res,next) => { 
    var params=req.body
    try{
      let responseNull=  commonMethods.checkParameterMissing([params.id,params.status])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      const userData = await USER.findOne({
        where: {
           id: params.id }
      });
      if(userData)
      {
        var status=params.status;
      
        const updatedResponse = await USER.update({
            status: status,
          },
          {
            where : {
            id: userData.dataValues.id
          }
        });
       
        if(updatedResponse)
        {
          return responseHelper.post(res, appstrings.success,updatedResponse);
        }
        else{
          return responseHelper.post(res, 'Something went Wrong',400);
        }
      }
      else{
        return responseHelper.post(res, appstrings.no_record,204);
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Order list For Particular Customer
  *Method GET
  */
  orderList: async (req, res, next) => {
    try
    {
      let userId    = req.params.userId;
      const findData = await USER.findOne({
        where: {
          id: userId
        } 
      });
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','totalOrderPrice','orderPrice','progressStatus','address','orderType',
        'couponDiscount','promoCode','offerPrice'],
          where: {
            userId: userId
          },
          include: [
            {
              model: USER,
              attributes: ['firstName','lastName','phoneNumber']
            },
            {
              model: COMPANY,
              attributes: ['companyName']
            },
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: SUBORDERS,
              attributes: ['orderId','serviceId','price','quantity'],
              include: [
              {
                model: SERVICES,
                attributes: ['name']
              }]
            }
          ]
        });
      return res.render(superadminfilepath+'user/order.ejs',{data:orderList,findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method Get
  *@role Get Chat History
  */
  chatHistory: async (req, res, next) => {
    try {
      return res.render(superadminfilepath+'user/chat.ejs');
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method GET
  *@role Delete Company
  */
  delete: async(req,res,next) => { 
    let responseNull=  common.checkParameterMissing([req.params.id])
    if(responseNull) 
    { 
      req.flash('errorMessage',appstrings.required_field)
      return res.redirect(superadminpath+"customer");
    }
    try{
      const numAffectedRows = await USER.destroy({
        where: {
          id: req.params.id
        }
      });  
      if(numAffectedRows>0)
      {
        req.flash('successMessage',appstrings.delete_success)
        return res.redirect(superadminpath+"customer");
      }
      else {
        req.flash('errorMessage',appstrings.no_record)
        return res.redirect(superadminpath+"customer");
      }
    }catch (e) {
      req.flash('errorMessage',appstrings.no_record)
      return res.redirect(superadminpath+"customer");
    }
  },

  addSale: async (req, res, next) => {
    try {
      let userId    = req.params.id;
      const findData = await USER.findOne({
        where: {
          id: userId
        } 
      });
      return res.render(superadminfilepath+'customer/addSale.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method POST
  *@role Insert New Sale
  **/
  updateSale: async(req,res,next) => { 
    var params=req.body;
    console.log(params)
    const users = await Sales.create({
      userId: params.userId,
      name:params.sitename,
      address: params.address,
      sale: params.sale,
      type: 'Deposit',
      date: new Date().toLocaleDateString('en-GB')
     });

     return responseHelper.post(res, appstrings.success);

  },
  /**
  *@Method Get
  *@role Get Company List
  */
  salelist: async (req, res, next) => {
    try {

      let userId    = req.params.userId;
      const findData = await Sales.findAll({
              where: { userId: userId }
          
      });
      console.log(findData)
      return res.render(superadminfilepath+'customer/salelist.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },
};
