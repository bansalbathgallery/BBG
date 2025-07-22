
const express = require('express');
const app     = express();
const sequelize = require('sequelize');
const Op = require('sequelize').Op;
const bcrypt  = require('bcryptjs');
const v       = require('node-input-validator');
const jwt     = require('jsonwebtoken');
const hashPassword = require('../../helpers/hashPassword');
const COMPANY= db.models.companies;
const SETTING= db.models.settings;
USER=db.models.users;
const FEATUREDLIST=db.models.features;
const CFEATURED=db.models.companyTypes;
const CompanyImage = db.models.CompanyImages;
COMPANY.hasMany(CompanyImage, {foreignKey: 'companyId'});
module.exports = {
  /**
  *@role Get Profile Page
  *@Method POST
  *@author Saira Ansari
  */
  getContent: async(req,res,next) => {
    try {
       //Get Free Delivery Restuarant
        var featured = await FEATUREDLIST.findAll({
          attributes: ['id','featuresType']
        });
         //Check Where Conditions
        var where={
          status: '1',
          role: '2'
        }
        var MainArray = [];
        for (var i = 0; i < featured.length; i++) {
          var array = {};
          var id = featured[i].id;
          var name = featured[i].featuresType;
          array.id = id;
          array.type = name;
          const restDetails = await COMPANY.findAll({
            attributes: ['id','companyName','holidays','deliveryType','instaMode','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines'],
            where: where,
            include: [
              {
                model: CFEATURED,
                required: true,
                attributes: [],
                where: { 
                  featureId: id
                }
              }
            ],
          });
          array.resturants = restDetails;
          
            MainArray.push(array);
          
        }
        var data  = await SETTING.findOne({
          where:{
            companyId: req.companyId
          }
        });
      return res.render(superadminfilepath+'content/content.ejs',{MainArray,data});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath);
    }
  },

  getSettings: async(req,res,next) => {
    try {
      
      var data  = await SETTING.findOne({
        where:{
          companyId: req.companyId
        }
      });
      console.log(data)
      return res.render(superadminfilepath+'content/setting.ejs',{data});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath);
    }
  },

  /**
  *@role Update Settings
  *@Method POST
  */
  updateSettings: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      var adminId= req.companyId;
      //Update Conditions
      if(data.flag == '1')
      {
        await upsert({ customerTerms: data.cterms,restaurantTerms: data.rterms,riderTerms: data.riderTerms,companyId: adminId }, { companyId: adminId }).then(function(result){
         return responseHelper.post(res,"Update Successfully", null,200);
        });
       }else if(data.flag == '2'){
        //Update Policy
        await upsert({ privacyPolicy: data.privacy,companyId: adminId }, { companyId: adminId }).then(function(result){
          return responseHelper.post(res,"Update Successfully", null,200);
        });
       }else{
        await upsert({ distancePerKm: data.distancePerKm,pickUpRate: data.pickUpRate,deliveryRate: data.deliveryRate,companyId: adminId }, { companyId: adminId }).then(function(result){
          return responseHelper.post(res,"Update Successfully", null,200);
        });
       }
    } catch (e) {
      return responseHelper.error(res, appstrings.oops_something, e.message);
    }
  },

  /**
  *@role Update Settings
  *@Method POST
  */
  sendNotifications: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      var adminId= req.companyId;
      var tokensArray = [];
      if(data.userType == '0')
      {
        var users = await USER.findAll({
          attributes: ['deviceToken','platform'],
          where: {
            status: '1'
          }
        });
        var tokens = users.forEach(function (user) {
          var array = {};
          if(user.deviceToken != "")
          {
            array.token = user.deviceToken;
            array.type = user.platform;
            tokensArray.push(array);
          }
        
        });
      }else if(data.userType == '1'){
        var users = await COMPANY.findAll({
          attributes: ['deviceToken',"deviceType"],
          where: {
            status: '1'
          }
        });
        var tokens = users.forEach(function (user) {
          var array = {};
          if(user.deviceToken != "")
          {
            array.token = user.deviceToken;
            array.type = user.deviceType;
            tokensArray.push(array);
          }
        
        });
      }else{
        var users = await EMPLOYEE.findAll({
          attributes: ['deviceToken','platform'],
          where: {
            status: '1'
          }
        });
        var tokens = users.forEach(function (user) {
          var array = {};
          if(user.deviceToken != "")
          {
            array.token = user.deviceToken;
            array.type = user.platform;
            tokensArray.push(array);
          }
        
        });
      }

      //console.log(tokensArray);
   

      if(tokensArray.length > 0)
      {
        var title = data.title;
        var message = data.description;
         commonNotification.sendMultipleNotifications(tokensArray,title,message);
       }
         return responseHelper.post(res,"Update Successfully", null,200);
    } catch (e) {
      return responseHelper.error(res, appstrings.oops_something, e.message);
    }
  },


  /**
  *@role Update Settings
  *@Method POST
  */
  addNewFeature: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      var featured = await FEATUREDLIST.findOne({
        attributes: ['id','featuresType'],
        where: {
          featuresType: data.featuretype
        }
      });
      //Update Conditions
      if(!featured)
      {
          await FEATUREDLIST.create({
             featuresType: data.featuretype
          })
         return responseHelper.post(res,"Added Successfully", null,200);
      
       }else{
        //Update Policy
        
          return responseHelper.post(res,"Already Exist", null,204);
        
       }
    } catch (e) {
      return responseHelper.error(res, appstrings.oops_something, e.message);
    }
  },

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////// POST Change Pasword///////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  updateChangePassword: async(req, res) => {
    try {

        const data      = req.body;
        var adminId= req.companyId;
        const user = await COMPANY.findOne({
          where: {
            id: adminId
          }
        });
      const getUser = user.toJSON();
      const match = await hashPassword.comparePass(data.oldpassword, getUser.password);
        // compare pwd
        if (!match) {
          return res.json({
            status: 202,
            message: 'Invalid Old Password'
          });
        }



        const pswd      = await hashPassword.generatePass(data.password);
        const updateDevicetoken = await COMPANY.update({
          password: pswd
        },
        {
          where: {
            id: adminId
          }
        });
        return res.json({
            status: 200,
            message: 'Success'
        });
    }catch (e) {
        return responseHelper.error(res, 'Error', e);
    }
  },

  /**
  *@role Get Profile Page
  *@Method POST
  *@author Saira Ansari
  */
  getFeatureRestaurant: async(req,res,next) => {
    try {

     

        var id = req.params.id;

        var featured = await FEATUREDLIST.findOne({
          attributes: ['id','featuresType'],
          where:{
            id: id
          }
        });
         console.log('ssdfsdfs=====');
        //Already Added
        const restDetails = await COMPANY.findAll({
          attributes: ['id','companyName','holidays','deliveryType','instaMode','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines'],
   
          include: [
            {
              model: CFEATURED,
              required: true,
              attributes: [],
              where: { 
                featureId: id
              }
            },
            {
            model: CompanyImage,
            required: false,
            attributes: ['id','picture']
            }
          ],
        });
         console.log('ssdfsdfs========');
        //Another Restaurant
        var anotherRest = await COMPANY.findAll({
          attributes: ['id','companyName','holidays','deliveryType','instaMode','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines'],
          where: {
            id: {
              [Op.notIn]:  [sequelize.literal("select companyId from companyTypes WHERE featureId = '"+id+"'")]
            },
            status:1
          },
          include: [
            {
            model: CompanyImage,
            required: false,
            attributes: ['id','picture']
            }
          ],
        });
         console.log('ssdfsdfs====================');
      return res.render(superadminfilepath+'content/feature.ejs',{featured,restDetails,anotherRest});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath);
    }
  },

  /**
  *@role Get Profile Page
  *@Method POST
  *@author Saira Ansari
  */
  listFeatureRestaurant: async(req,res,next) => {
    try {

        var page =1
        var limit =50
        if(params.page) page=params.page
        if(params.limit) limit=parseInt(params.limit)
        var offset=(page-1)*limit
        var id = req.params.id;
        //Another Restaurant
        var anotherRest = await COMPANY.findAll({
          attributes: ['id','companyName','holidays','deliveryType','instaMode','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines'],
          where: {
            id: {
              [Op.notIn]:  [sequelize.literal("select companyId from companyTypes WHERE featureId = '"+id+"'")]
            },
            status:1
          },
          include: [
            {
            model: CompanyImage,
            required: false,
            attributes: ['id','picture']
            }
          ],
          offset: offset, limit: limit,
        });
        return responseHelper.post(res, appstrings.success, anotherRest);
    } catch (e) {
     return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Update Settings
  *@Method POST
  */
  updateFeatured: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      //Update Conditions
      if(data.flag == '1')
      {
        var numAffected = await CFEATURED.destroy({
          where: {
            featureId: data.id,
            companyId: data.restId,
          }
        }); 
        return responseHelper.post(res,"Update Successfully", null,200);
       }else{
        var numAffected = await CFEATURED.create({
            featureId: data.id,
            companyId: data.restId
        }); 
        return responseHelper.post(res,"Added Successfully", null,200);
       }
    } catch (e) {
      return responseHelper.error(res, appstrings.oops_something, e.message);
    }
  },
};

async function upsert(values, condition) {
    return SETTING
        .findOne({ where: condition })
        .then(function(obj) {
            // update
            if(obj)
                return obj.update(values);
            // insert
            return SETTING.create(values);
        })
}
