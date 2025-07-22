
const express = require('express');
const app     = express();
const hashPassword = require('../../helpers/hashPassword');
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const Cuisines = db.models.companyCuisines;
const CompanyDocument = db.models.CompanyDocuments;
const CompanyImage = db.models.CompanyImages;
const moment  = require('moment');
const EARNING = db.models.earnings;
const CHEF=db.models.chef;
const companyTiming=db.models.companyTimings;
const ORDERS     = db.models.orders;

const SUBORDERS  = db.models.suborders;
const orderPayment = db.models.payment;
COMPANY.hasMany(Cuisines, {foreignKey: 'companyId'});
COMPANY.hasMany(companyTiming, {foreignKey: 'companyId'});
COMPANY.hasMany(CompanyDocument, {foreignKey: 'companyId'});
COMPANY.hasMany(CompanyImage, {foreignKey: 'companyId'});
Cuisines.belongsTo(CATEGORY,{foreignKey: 'categoryId'});
COMPANY.hasOne(CHEF, {foreignKey: 'companyId'});
EARNING.belongsTo(ORDERS, {foreignKey: 'orderId'});

ORDERS.hasMany(SUBORDERS, {foreignKey: 'orderId'});
ORDERS.hasOne(orderPayment,{foreignKey: 'orderId'});
SUBORDERS.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(USER,{foreignKey: 'userId'});
ORDERS.belongsTo(COMPANY,{foreignKey: 'companyId'});
module.exports = {
  /**
  *@Method Get
  *@role Get Company List
  */
  list: async (req, res, next) => {
    try {
      const findData = await COMPANY.findAll({
      where :{
        role :'2',
        status: {
          [Op.ne]: '0'
        }
      },
      order: [
        ['companyName','ASC']
      ],      

      });
      return res.render(superadminfilepath+'restaurants/list.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method Get
  *@role Get Company List
  */
  requestlist: async (req, res, next) => {
    try {
      const findData = await COMPANY.findAll({
      where :{
        role :'2',
        status: '0'
      },
      order: [
        ['companyName','ASC']
      ],      

      });
      return res.render(superadminfilepath+'restaurants/request.ejs',{data:findData});
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
     
      const userData = await COMPANY.findOne({
        where: {
         id: params.id }
      });
     
     
      if(userData)
      {
        const updatedResponse = await COMPANY.update({
          status: params.status,
        },
        {
          where : {
          id: userData.dataValues.id
        }
        });
        
        if(params.status == '1')
        {
          var dataEmail={name: userData.dataValues.companyName,app_name:config.APP_NAME}
          commonNotification.sendApprovedMail(userData.dataValues.email,dataEmail)
        }

        if(updatedResponse)
        {
          return responseHelper.post(res, appstrings.success,updatedResponse);
        }
        else{
          return responseHelper.post(res, appstrings.oops_something,400);
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
      const findData = await COMPANY.findOne({
        where: {
          id: userId
        } 
      });
      const orderList = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','totalOrderPrice','orderPrice','progressStatus','address','orderType',
        'couponDiscount','promoCode','offerPrice'],
          where: {
            companyId: userId
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
      return res.render(superadminfilepath+'restaurants/order.ejs',{data:orderList,findData});
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
    { req.flash('errorMessage',appstrings.required_field)
      return res.redirect(superadminpath+"restaurant");
    }
    try{
      const numAffectedRows = await COMPANY.destroy({
        where: {
          id: req.params.id
        }
      })  
      if(numAffectedRows>0)
      {
        req.flash('successMessage',appstrings.delete_success)
        return res.redirect(superadminpath+"restaurant");
      }
      else {
        req.flash('errorMessage',appstrings.no_record)
        return res.redirect(superadminpath+"restaurant");
      }
    }catch (e) {
      req.flash('errorMessage',appstrings.no_record)
      return res.redirect(superadminpath+"restaurant");
    }
  },

  /**
  *@Method GET
  *@role Delete Company
  */
  details: async(req,res,next) => { 
    try{
      const userData = await COMPANY.findOne({
        attributes: ['id','companyName','firstName','address1','images','license','lastName','email','deliveryType','holidays','countryCode','phoneNumber','region','deliveryFee','maximumDistance','minimumOrderValue','latitude','longitude',
            [Sequelize.literal('companies.address1'), 'address']],
      where: {
        id : req.params.restaurantId
      },
      include: [{
        model: Cuisines,
        attributes: ['id','categoryId','companyId'],
        include: [{
          model: CATEGORY,
          attributes: ['name']
        }]
      },{
        model: CHEF,
        required: false,
        attributes: ['id','name','description','images']
      },{
        model: CompanyDocument,
        required: false,
        attributes: ['id','document']
      },
      {
        model: CompanyImage,
        required: false,
        attributes: ['id','picture']
      },
      {
        model: companyTiming,
        required: false,
        attributes: ['day','availability','startTime','endTime']
      }]
      })
      console.log(userData)
      return res.render(superadminfilepath+'restaurants/view.ejs',{userData});
    }catch (e) {
      req.flash('errorMessage',appstrings.no_record)
      return res.redirect(superadminpath+"restaurant");
    }
  },

  /**
  *@Method GET
  *@role Get Profile
  **/
  getProfile: async (req, res, next) => {
      try{
      const userData = await COMPANY.findOne({
        attributes: ['id','companyName','firstName','images','license','lastName','email','deliveryType','holidays','countryCode','phoneNumber','region','deliveryFee','maximumDistance','minimumOrderValue','latitude','longitude',
            [Sequelize.literal('companies.address1'), 'address']],
      where: {
        id : req.params.restaurantId
      },
      include: [{
        model: Cuisines,
        attributes: ['id','categoryId','companyId',
        [Sequelize.literal('`companyCuisines->category`.`name`'), 'cuisinesName']],
        include: [{
          model: CATEGORY,
          attributes: []
        }]
      },{
        model: CHEF,
        required: false,
        attributes: ['id','name','description','images']
      },{
        model: CompanyDocument,
        required: false,
        attributes: ['id','document']
      },
      {
        model: CompanyImage,
        required: false,
        attributes: ['id','picture']
      },
      {
        model: companyTiming,
        required: false,
        attributes: ['day','availability','startTime','endTime']
      }]
      })  
      console.log(userData)
      if(userData)
        return responseHelper.post(res, 'Profile Detail',userData);
      else
        return responseHelper.post(res, 'No Record Found', userData, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET
  *@role Delete Company
  */
  view: async(req,res,next) => { 
    try{
      const userData = await COMPANY.findOne({
        attributes: ['id','companyName','firstName','address1','images','license','accountName','accountNumber','lastName','email','deliveryType','holidays','countryCode','phoneNumber','region','deliveryFee','maximumDistance','minimumOrderValue','latitude','longitude',
            [Sequelize.literal('companies.address1'), 'address']],
      where: {
        id : req.params.restaurantId
      },
      include: [{
        model: Cuisines,
        attributes: ['id','categoryId','companyId'],
        include: [{
          model: CATEGORY,
          attributes: ['name']
        }]
      },{
        model: CHEF,
        required: false,
        attributes: ['id','name','description','images']
      },{
        model: CompanyDocument,
        required: false,
        attributes: ['id','document']
      },
      {
        model: CompanyImage,
        required: false,
        attributes: ['id','picture']
      },
      {
        model: companyTiming,
        required: false,
        attributes: ['day','availability','startTime','endTime']
      }]
      })
      console.log(userData)
      return res.render(superadminfilepath+'restaurants/details.ejs',{userData});
    }catch (e) {
      req.flash('errorMessage',appstrings.no_record)
      return res.redirect(superadminpath+"restaurant");
    }
  },


    getResturantYearlyRevenue: async(req,res) => {
    try {
      const params = req.body;

      var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


      var today = new Date();
      var d;
      var month;
      var year;
      var array = {};
      var newArray = [];
      var MonthArray = [];
      for(var i = 12; i > 0; i -= 1) {
        d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        month = monthNames[d.getMonth()];
        var indexMonth = monthNames.indexOf(month);
        indexMonth = indexMonth + 1;
        var fromMonth = indexMonth < 10 ? '0' + indexMonth : indexMonth;
        console.log(fromMonth)
        year = d.getFullYear();
          var totalYearlyRevenue = await EARNING.findOne({
            attributes: [
              [ sequelize.fn('MONTH', sequelize.col('earnings.createdAt')), 'data'],
              [sequelize.fn('sum', sequelize.col('restaurantFees')), 'total_amount'],

            ],
            where: {
              [Op.and]: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('earnings.createdAt')), year),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('earnings.createdAt')), fromMonth)
              ]
            },
            include: [{
              model: ORDERS,
              attributes: []
            }]
          });
          MonthArray.push(month+' '+year);
          console.log(totalYearlyRevenue);
          if(totalYearlyRevenue.dataValues.total_amount == null)
          {
            newArray.push(0);
          }else{
            newArray.push(parseInt(totalYearlyRevenue.dataValues.total_amount));
          }
      }


   // return false;
        const MainArray = [];
        array.months = MonthArray;
        array.data = newArray;
        MainArray.push(array);
        return responseHelper.post(res,"Login Successfully!",MainArray,200);
    } catch (e) {
      console.log('Error => ', e);
      return responseHelper.error(res, 'Error', e);
    }
  },

};


//Edit User Profile
