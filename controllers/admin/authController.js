
const express = require('express');
const app     = express();
const hashPassword = require('../../helpers/hashPassword');
const COMPANY= db.models.companies
const Op = require('sequelize').Op;
const CART     = db.models.cart
const SERVICES = db.models.services;
const userCoupan = db.models.userCoupons;
const ORDERS     = db.models.orders;
const SUBORDERS  = db.models.suborders;
const orderPayment = db.models.payment;
const USER= db.models.users;
const EMPLOYEE= db.models.employees;
const EARNING = db.models.earnings;
const moment  = require('moment');
module.exports = {
  /**
  *@role Get Login Page
  *@Method POST
  *@author Saira Ansari
  */
  signup: async (req, res, next) => {

         return res.render(superadminfilepath+'../riderSignup');

  },
  /**
  *@role Get Login Page
  *@Method POST
  *@author Saira Ansari
  */
  login: async (req, res, next) => {
      if(req.session.userData){
        //var data=await  getDashboardData("2020-04-10","2020-04-17",null,null,req.session.companyId)
        //Get All Companies.
        var Companies = await COMPANY.findAll({
          where: {
            status: {
              [Op.ne]: '0'
            }
          }
        })
        var CompaniesCount = Companies.length;

        //Get All Companies.
        var CompaniesRequest = await COMPANY.findAll({
          where: {
            status: '0'
          }
        })
        var CompaniesReqCount = CompaniesRequest.length;

        //Get All Users 
        var Users = await USER.findAll();
        var userCount = Users.length;

        //Get All Completed Orders
        var complatedOrder = await ORDERS.findAll({
          where: {
            progressStatus: '5'
          }
        })
        var completedOrder = complatedOrder.length;

        //Get All Completed Orders
        var cancelledOrder = await ORDERS.findAll({
          where: {
            progressStatus: {
              [Op.in]: ['2','4']
            }
          }
        })
        var cancelledOrder = cancelledOrder.length;

        //Get All Orders
        var countDataq = await ORDERS.findOne({
          attributes: [
          [sequelize.fn('sum', sequelize.col('totalOrderPrice')), 'totalSum'],
          [sequelize.fn('AVG', sequelize.col('totalOrderPrice')), 'average']],
        });

        //Get All Riders
        var totalRiders = await EMPLOYEE.findAll();
        var totalRiders = totalRiders.length;

        var data = {};
        data.TotalRestaurant    = CompaniesCount;
        data.TotalRestaurantReq = CompaniesReqCount;
        data.Totaluser          = userCount;
        data.cancelledOrder     = cancelledOrder;
        data.completedOrder     = completedOrder;
        data.totalRiders        = totalRiders;
        if(countDataq.dataValues.totalSum === null)
        {
          data.totalSum = '0';
          data.average  = '0';
        }else{
         
          data.totalSum = countDataq.dataValues.totalSum;
          data.average  = countDataq.dataValues.average;
        }
         return res.render(superadminfilepath+'dashboard',{data});
      }
      return res.render(superadminfilepath+'login');
  },

  /**
  *@Method POST
  *@role POST Login
  */
  postLogin: async(req,res,next) => { 
    var params=req.body
    try{
      const userData = await COMPANY.findOne({
        where: {
          email: params.email,
          role: 1
        }
      })  
         console.log(userData,'res===');
      if(userData)
      { console.log('sddfsdfsdfs')
        const match = await hashPassword.comparePass(params.password,userData.dataValues.password);
        if (!match) {
            return responseHelper.post(res, appstrings.invalid_cred,null,400);
        }
       
        var parentCompany=""
        var parent=await commonMethods.getParentCompany(userData.dataValues.id)
        if(parent && parent.dataValues)parentCompany=parent.dataValues.parentId
              
        req.session.userData = userData;
       req.session.userInfo = userData;
        req.session.role = 1;
        req.session.companyId = userData.dataValues.id;
        req.session.userId = userData.dataValues.id;
        req.session.parentCompany = parentCompany;
        var currency =await commonMethods.getCurrency(userData.dataValues.id) 
        if(currency && currency.dataValues && currency.dataValues.currency) CURRENCY=currency.dataValues.currency
          console.log(res,'res===');
        return responseHelper.post(res,"Login Successfully!",null,200);
      }  
      else    
      {  console.log('sddfsdfsdfs')
        return responseHelper.post(res, appstrings.invalid_cred,null,400);
      }
             
    }catch (e) {
     
      return responseHelper.post(res, e.message,null,400);
    }
  },

  /**
  *@role Admin Dashboard
  *@Method POST
  *@author Saira Ansari
  */
  logout: async(req,res,next) => {
    req.session.destroy((err) => {
    if(err) {
        return console.log(err);
    }
   // req.flash('successMessage',"Logout Success.");
    return res.redirect(adminpath);
    });
  },

  /**
  *@role forgotPassword
  *@Method POST
  *@author Saira Ansari
  */
  forgotPassword: async(req,res,next) => {
    var params=req.body
    let responseNull= commonMethods.checkParameterMissing([params.email])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      userData = await COMPANY.findOne({
        where: {
          email: params.email,
          role: '1'
        }
      })  
        
      if(userData)
      {
        userData= JSON.parse(JSON.stringify(userData))
        var number= Math.floor(Math.random()*(10000000-0+1)+10000000 )+"";
        const newPassword = await hashPassword.generatePass(number);
        var dataEmail={name: userData.companyName,password: number,app_name:configDev.APP_NAME}
        commonNotification.sendForgotPasswordMail(userData.email,dataEmail)
        await COMPANY.update({ password: newPassword}, {where: { id: userData.id}}) ; 
        return responseHelper.post(res, appstrings.password_reset_success,null,200);
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.no_record,null,204);
      }             
    }catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@Method GET
  *@role Change Password
  */
  changePassword: async (req, res, next) => {
    return res.render(superadminfilepath+'changePassword');
  },

  /**
  *@Method POST
  *@role Change Password
  */
  postChangePassword: async(req,res,next) => { 
    var params=req.body
    let responseNull= commonMethods.checkParameterMissing([params.oldPassword,params.newPassword])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
    try{
      const userData = await COMPANY.findOne({
        where: {
          id: req.id,
        }
      })  
          
      if(userData)
      {
      
        const match = await hashPassword.comparePass(params.oldPassword,userData.dataValues.password);

        if (!match) {
          return responseHelper.post(res, appstrings.inccorect_oldpass,null,400);

        }
        else{
          const newPassword = await hashPassword.generatePass(params.newPassword);
          await COMPANY.update({ password: newPassword}, {where: { id: req.id}}) ; 
          return responseHelper.post(res, appstrings.password_change_success,null,200);
        }
    
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.no_record,null,204);
      }
    }catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@Method POST
  *@role DashBoard Data
  *@author Raghav
  */
  dashboard: async (req, res, next) => {
    try{
      var params=req.body;
      var compId="";
      if(params.compId && params.compId!="") compId=params.compId
      var data = await commonMethods.getDashboardData(params.fromDate,params.toDate,null,params.filterName,compId);
      //var data = [];
      var compData= await commonMethods.getAllCompanies(req.companyId)
      return responseHelper.post(res, appstrings.success,data,200);
    }
    catch(e)
    {
      return responseHelper.error(res, e.message);

    }
  },

   getCategoryRenuve: async(req,res) => {
    try {
const MainArray = [];
      //Avg Renve
      var featured = await subject.findAll({
        attributes: ['id','name','image']
      });
      for (var i = 0; i < featured.length; i++) 
      {
        var array = {};
        var id = featured[i].id;
         //Total Revnue
         var name = featured[i].name;
        array.label = name;
         
        var totalRevenue = await TeacherBooking.findOne({
          attributes: [
            [sequelize.fn('sum', sequelize.col('credit')), 'totalAmount'],
          ],
          where: {
            subjectId: id
          }
        });

        //array.professional = restDetails;
        console.log(totalRevenue.dataValues.totalAmount)
        if(totalRevenue.dataValues.totalAmount == null)
        {
          console.log("0")
        }else{
          array.data = totalRevenue.dataValues.totalAmount;
          MainArray.push(array);
        }
      }
      

       return helpers.jsonResponse(
                res,
                true,
                MainArray,
                "List",
                200,
                200
            );
    } catch (e) {
      console.log('Error => ', e);
      return responseHelper.error(res, 'Error', e);
    }
  },

   getYearlyRevenue: async(req,res) => {
    try {
      const params = req.body;

     // var year = moment().format('YYYY');
       var year = params.year;
       
      var fromDate = moment().startOf('year');
      var fromDateMonth = new Date(fromDate);
      var fromMonth = (fromDateMonth.getMonth()+ 1) < 10 ? '0' + (fromDateMonth.getMonth()+1) : (fromDateMonth.getMonth()+1);

      const MainArray = [];
      //Avg Renve
      // var featured = await subject.findAll({
      //   attributes: ['id','name','image']
      // });
      // for (var i = 0; i < featured.length; i++) 
      // {
        var array = {};
        //var id = featured[i].id;
         //Total Revnue
       // var name = featured[i].name;
       // array.name = name;
         
        var newArray = [];
        var year = params.year;
        for(var j=1;j<=12;j++){
          var totalYearlyRevenue = await EARNING.findOne({
            attributes: [
              [ sequelize.fn('MONTH', sequelize.col('createdAt')), 'data'],
              [sequelize.fn('sum', sequelize.col('adminFees')), 'total_amount'],

            ],
            where: {
              [Op.and]: [
                sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), year),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), j)
              ]
            }
          });
          console.log(totalYearlyRevenue);
          if(totalYearlyRevenue.dataValues.total_amount == null)
          {
            newArray.push(0);
          }else{
            newArray.push(parseInt(totalYearlyRevenue.dataValues.total_amount));
          }
        }
        array.name = "Monthly Revenue";
        array.data = newArray;
        MainArray.push(array);

        console.log(year)
      //}
     
       // console.log(MainArray);
       // return helpers.jsonResponse(
       //          res,
       //          true,
       //          MainArray,
       //          "List",
       //          200,
       //          200
       //      );
        return responseHelper.post(res,"Login Successfully!",MainArray,200);
    } catch (e) {
      console.log('Error => ', e);
      return responseHelper.error(res, 'Error', e);
    }
  },

//Edit User Profile
  
};
