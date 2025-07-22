
const express = require('express');
const app     = express();
const Op = require('sequelize').Op;
const ROLE = db.models.roles;
const ROLETYPE = db.models.roleTypes;
const hashPassword = require('../../helpers/hashPassword');
COMPANY.hasOne(ROLETYPE, {foreignKey: 'companyId'});
ROLETYPE.belongsTo(ROLE, {foreignKey: 'roleId'});
module.exports = {
  /**
  *@Method GET
  *@role Coupon List
  */
  list: async(req,res,next) => {
    try{
      const findData = await ROLE.findAll();
      return res.render(superadminfilepath+'subadmin/roles.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@Method GET
  *@role Get Coupon Detail
  */
  view: async(req,res,next) => {
    var id = req.params.id;
    try {
      const findData = await ROLE.findOne({
        where :{id: id }
      });
      return res.render(superadminfilepath+'subadmin/editRole.ejs',{data:findData});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath+"coupon");
    }
  },

  /**
  *@Method GET
  *@role Add New Coupon
  */
  add: async(req,res,next) => {
    try{
      return res.render(superadminfilepath+'subadmin/addRole.ejs');
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  postAdd: async (req, res) => {
    try {
      const data = req.body;

      console.log(data);
     // return false;
     var dd = (typeof data.subjectId === 'string') ? Array(data.subjectId) : data.subjectId 
        const users = await ROLE.create({
          roleName: data.name,
          roles: JSON.stringify(dd)
        });
        if (users) {
          responseHelper.post(res, "Role added successfully.", null,200);
        }
       else  responseHelper.error(res, appstrings.oops_something, 400);
    } catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message,400);
    }
  },

  /*
  *@Method GET
  *@role Get Coupon Detail
  */
  view: async(req,res,next) => {
    var id = req.params.id;
    try {
      let responseNull=  common.checkParameterMissing([id])
      if(responseNull) 
      { req.flash('errorMessage',appstrings.required_field)
        return res.redirect(superadminpath+"coupon");
      }
      const findData = await COUPAN.findOne({
        where :{id: id }
      });
      var cdata= await commonMethods.getAllParentCategories(req.companyId)
      var types=await commonMethods.getUserTypes(req.companyId) 
      return res.render(superadminfilepath+'coupans/viewCoupan.ejs',{data:findData,catData:cdata,types:types});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath+"coupon");
    }
  },



  /************************************************************/
  /********************* Sub-Users*****************************/
  /************************************************************/
  listUsers: async(req,res,next) =>{
    const findData = await COMPANY.findAll({
      where: {
        parentId: req.companyId,
        role: '1'
      },
      include: [{
        model: ROLETYPE,
        attributes:['roleId','companyId'],
        include:[{
          model: ROLE,
          attributes: ['roleName']
        }]
      }]
    });
    console.log(findData)
    return res.render(superadminfilepath+'subadmin/users.ejs',{data:findData});
  },

  /**
  *@Method GET
  *@role Add New Coupon
  */
  addSubUser: async(req,res,next) => {
    try{
      const roless = await ROLE.findAll();
      console.log(roless)
      return res.render(superadminfilepath+'subadmin/addUser.ejs',{data:roless});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  postAddUser: async (req, res) => {
    try {
      const data = req.body;

      console.log(data);
     // return false;

      const user = await COMPANY.findOne({
        where: {
          email: data.email,
          role:'1'
        }
      });

      if(user)
      {
        return responseHelper.post(res, "Sorry! email address already exist.", 409);
      }
      const pswd = await hashPassword.generatePass(data.password);
       //Create Restaurants Details
      const companies = await COMPANY.create({
        firstName: data.fname,
        lastName: data.lname,
        companyName: data.fname+ ' '+data.lname,
        email: data.email,
        address1: data.address,
        phoneNumber: data.pnumber,
        countryCode: '+91',
        region: '',
        password: pswd,
        latitude: '',
        longitude: '',
        deviceToken: '',
        deviceType: '',
        role: '1',
        status: '0',
        instaMode: '0'
      });

      var RestaurantId = companies.dataValues.id;
      const users = await ROLETYPE.create({
        roleId: data.roleId,
        companyId: RestaurantId
      });
      if (users) {
        responseHelper.post(res, "Sub admin added successfully.", null,200);
      }
      else  responseHelper.error(res, appstrings.oops_something, 400);
    } catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message,400);
    }
  },


};
