
const express = require('express');

const app = express();
const bcrypt = require('bcryptjs');
const v = require('node-input-validator');
const hashPassword = require('../../../helpers/hashPassword');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;
const jwt = require('jsonwebtoken');
const util = require('util');
const mysql = require('mysql2/promise');
require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const keyPublishable = config.PAYKEY;
const keySecret = config.PAYSECRET;
const stripe = require("stripe")(keySecret);
const userCard = db.models.userCards;
const CHEF=db.models.chef;
USER=db.models.users;
const CART=db.models.cart;
const userCoupan = db.models.userCoupons;
const VEHICLE = db.models.vehicle;
COMPANY.hasOne(CHEF, {foreignKey: 'companyId'});
// Generate Hash
const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
module.exports = {

  logout: async (req, res, next) => {
    const params = req.query;
    try
    {
      const updatedResponse = await EMPLOYEE.update({
          sessionToken: "",
          deviceToken: "",
        },
        {
          where : {
            email:params.email
        }
      });

      return responseHelper.post(res, 'Logout Successfully');
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Sign Up
  *@Method POST
  */
  signup: async (req, res) => {
    try {
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.firstName,data.email,data.password])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

      const user = await EMPLOYEE.findOne({
        where: {
          [Op.or]: [
            {
              email: data.email
            }, 
            {
              phoneNumber: data.phoneNumber
            }
          ]

        }
      });
      // const user = await EMPLOYEE.findOne({
      //   where: {
      //     email: data.email

      //   }
      // });

      if (!user) {
        if (req.files) {

          // ImageFile = req.files.image;    
          // if(ImageFile)
          // {
          //   profileImage = Date.now() + '_' + ImageFile.name;

          //   ImageFile.mv(config.UPLOAD_DIRECTORY +"employees/images/"+ profileImage, function (err) {
          //   //upload file
          //   if (err)
          //   return responseHelper.error(res, err.meessage, 400);   
          //   });
          // }
          ImageFile1 = req.files.idProof;    
          if(ImageFile1)
          {
            idProof = Date.now() + '_' + ImageFile1.name;
            ImageFile1.mv(configDev.UPLOAD_DIRECTORY +"employees/proofs/"+ idProof, function (err) {
            //upload file
            if (err)
            responseHelper.error(res, appstrings.err.meessage, 400);   
            });
          }
          // ImageFile2 = req.files.coverImage;    
          // if(ImageFile2)
          // {
          //   coverImage = Date.now() + '_' + ImageFile2.name;
          //   ImageFile2.mv(config.UPLOAD_DIRECTORY +"employees/images/"+ coverImage, function (err) {
          //   //upload file
          //   if (err)
          //   {
          //   console.log(err)
          //   return responseHelper.error(res, err.message, 400);   
          //   }
          //   });
          // }
        }


        var actualPassword = data.password;
        const pswd = await hashPassword.generatePass(data.password);
        data.password = pswd;

        const users = await EMPLOYEE.create({
          firstName: data.firstName,
          password: pswd,
          lastName: data.lastName,
          email: data.email,
          dob:  "2020-01-01",
          address: "",
          phoneNumber: data.phoneNumber,
          countryCode: data.countryCode,
          platform: data.deviceType,
          idProof : idProof,
          idProofName:"",
          deviceToken: data.deviceToken,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          status: '3'
        });

        if (users) {
          const userId = users.dataValues.id;
          data.userId = userId;
          const credentials = {
            email: users.dataValues.email,
            userType: 1,
            id : userId
          };

          const authToken = jwt.sign(credentials, configDev.jwtToken, { algorithm: 'HS256', expiresIn: configDev.authTokenExpiration });
          const refreshToken = jwt.sign(credentials, configDev.jwtToken, { algorithm: 'HS256', expiresIn: configDev.refreshTokenExpiration });
          const userDetail = {};
          userDetail.email = users.dataValues.email;
          userDetail.firstName = users.dataValues.firstName;
          userDetail.lastName = users.dataValues.lastName;
          userDetail.password = actualPassword;
          userDetail.image = '';
          userDetail.deviceToken = users.dataValues.deviceToken;
          userDetail.sessionToken = authToken;
          userDetail.refreshToken = refreshToken;
          userDetail.id = userId;
          userDetail.vehicleFlag  = '0';
          userDetail.phoneNumber  = users.dataValues.phoneNumber;
          userDetail.countryCode  = users.dataValues.countryCode;
          //Check Company Id


          const updateDevicetoken = await EMPLOYEE.update({
              sessionToken: authToken,
              platform: data.deviceType,
              deviceToken: data.deviceToken,
          },
          {
            where: {
              id: users.dataValues.id
            }
          });
          var dataEmail={name: users.dataValues.firstName,app_name:configDev.APP_NAME}
          commonNotification.sendMail(users.dataValues.email,dataEmail)
          return responseHelper.post(res, "Signup Successfully", userDetail);
        }
      } else {
        return responseHelper.post(res,"You have already signup with same email address or phone number.",null,200);
        //return responseHelper.error(res, "You have already signup with same email address or phone number.", 409);
      }
    } catch (e) {
      return responseHelper.error(res,  "error", e.message);
    }

  },

  /**
  *@role Login API
  *@Method POST
  */
  login: async (req, res) => {
    const params = req.body;
    let responseNull=  commonMethods.checkParameterMissing([params.email,params.password])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      var userData = await EMPLOYEE.findOne({
        where: {
          email: params.email
        }
      })  

      if(userData)
      {
        var token = jwt.sign(
        {
          email: params.email,
          userType: 1,
          id : userData.dataValues.id

        },
        configDev.jwtToken,
        { algorithm: 'HS256', expiresIn: '2880m' }
        );

        //Check User Login
        var getUser = userData.toJSON();
        // Check Vehicles Add or Not
        const getVehicleStatus = await VEHICLE.findAll({
          where: {
            empId: userData.dataValues.id
          }
        })
        if(getVehicleStatus.length > 0)
        {
          userData.dataValues.vehicleFlag  = '1';
        }
        else
        {
          userData.dataValues.vehicleFlag  = '0';
        }
        if(getUser.status == '0')
        {
          return responseHelper.unauthorized(res, 'Sorry, You have block by admin. Please contact to support.');
        }

        if(getUser.verifyUser == '0')
        {
          userData.dataValues.userId       = userData.dataValues.id;
          userData.dataValues.sessionToken = token;
          userData.dataValues.platform     = params.deviceType;
          userData.dataValues.deviceToken  = params.deviceToken;
          return res.json({
            code: 205,
            message: 'Un-verify user',
            body: userData
          })
        }
        var match = await hashPassword.comparePass(params.password, getUser.password);
        // compare pwd
        if (!match) {
          return responseHelper.unauthorized(res, 'Invalid Password');
        }
        
        var updatedResponse = await EMPLOYEE.update({
            sessionToken: token,
            platform: params.deviceType,
            deviceToken: params.deviceToken,
          },
          {
          where : {
            id: userData.dataValues.id
          }
        });

        
        userData.dataValues.userId       = userData.dataValues.id;
        userData.dataValues.sessionToken = token;
        userData.dataValues.platform     = params.deviceType;
        userData.dataValues.deviceToken  = params.deviceToken;
        
        return responseHelper.post(res, 'Login Successfully',userData);

      }else
      {
        return responseHelper.error(res, "Invalid Email Address!", 409);
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
    
  },

  /**
  *@role Social Login API
  *@Method POST
  */
  Sociallogin: async (req, res, next) => {
    const params = req.body;
    let responseNull=  commonMethods.checkParameterMissing([params.email,params.socialId,params.socialType,params.deviceToken])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          email: params.email
        }
      });
      if(userData)
      {
        let token = jwt.sign(
        {
        email: params.email,
        userType: 1,
        id : userData.dataValues.id

        },
        configDev.jwtToken,
        { algorithm: 'HS256', expiresIn: '2880m' }
        );
        const updatedResponse = await EMPLOYEE.update({
          sessionToken: token,
          platform: params.deviceType,
          deviceToken: params.deviceToken,
          },
          {
          where : {
            id: userData.dataValues.id
          }
        });

        userData.dataValues.userId   = userData.dataValues.id;
        if(updatedResponse)
        {
          userData.dataValues.sessionToken=token
          userData.dataValues.deviceToken=params.deviceToken
          return responseHelper.post(res, 'Login Successfully',userData);
        }
        return responseHelper.post(res, 'Login Successfully',userData);
      }
      else
      { 
        const userDataDe = await EMPLOYEE.findOne({
          where: {
            email: params.email
          }
        });
        if(userDataDe)
        {
          return responseHelper.error(res, "Email already exist", 409);
        }
        const users = await EMPLOYEE.create({
          firstName: params.firstName,
          lastName:  params.lastName,
          email: params.email,
          address: '',
          phoneNumber: '',
          countryCode: '',
          password: '',
          deviceToken: params.deviceToken,
          platform: params.deviceType,
          dob:  "0000-00-00",
          socialId: params.socialId,
          socialType: params.socialType
        });
        const userId = users.dataValues.id;
        params.userId = userId;
        const credentials = {
          email: users.dataValues.email,
          userType: 1,
          id : userId
        };

        const authToken = jwt.sign(credentials, configDev.jwtToken, { algorithm: 'HS256', expiresIn: configDev.authTokenExpiration });
        const refreshToken = jwt.sign(credentials, configDev.jwtToken, { algorithm: 'HS256', expiresIn: configDev.refreshTokenExpiration });
        const userDetail = {};
        userDetail.email = users.dataValues.email;
        userDetail.firstName = users.dataValues.firstName;
        userDetail.lastName = users.dataValues.lastName;
        userDetail.image = '';
        userDetail.sessionToken = authToken;
        userDetail.refreshToken = refreshToken;
        userDetail.id = userId;
        const updateDevicetoken = await EMPLOYEE.update({
          sessionToken: authToken,
          platform: params.deviceType,
          deviceToken: params.deviceToken,
          },
          {
          where: {
            id: users.dataValues.id
          }
        });
        var dataEmail={name: users.dataValues.firstName,app_name:configDev.APP_NAME}
        commonNotification.sendMail(users.dataValues.email,dataEmail)
        return responseHelper.post(res, "Signup Successfully", userDetail);
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method GET
  *@role Get Profile
  **/
  getProfile: async (req, res, next) => {
    try{
      const params = req.query;
      const userData = await EMPLOYEE.findOne({
      where: {
        id : params.userId
      }
      })  
      if(userData)
        return responseHelper.post(res, 'Profile Detail',userData);
      else
        return responseHelper.post(res, 'No Record Found', data, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /*
  *@role Update Profile
  *@Method POST
  */
  updateProfile: async (req, res, next) => {
    const params = req.body;
    try{
      let responseNull=  commonMethods.checkParameterMissing([params.firstName])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var imageName="";
      var idProof="";
      if (req.files) {
        ImageFile = req.files.profileImage;
        if(ImageFile)
        {    
          imageName = Date.now() + '_' + ImageFile.name;
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"employees/proofs/"+ imageName, function (err) {
          if (err)
            responseHelper.error(res,err.message,400)
          });

        }
        ImageFile1 = req.files.idProof;    
        if(ImageFile1)
        {
          idProof = Date.now() + 'id_' + ImageFile1.name;
          ImageFile1.mv(configDev.UPLOAD_DIRECTORY +"employees/proofs/"+ idProof, function (err) {
          //upload file
          if (err)
          responseHelper.error(res, appstrings.err.meessage, 400);   
          });
        }
      }
      const userData = await EMPLOYEE.findOne({
        where: {
          id: req.id 
        }
      });
      if(userData)
      {
        if(imageName=="")  imageName= userData.dataValues.image;
        if(idProof=="")  idProof = userData.dataValues.idProof;

        const updatedResponse = await EMPLOYEE.update({
            firstName: params.firstName,
            lastName: params.lastName,
            idProof : idProof,
            image : imageName,
          },
          {
          where : {
            id: userData.dataValues.id
          }
        });

        if(updatedResponse)
        {
          const updatedResponseData = await EMPLOYEE.findOne({
            where: {
              id: userData.dataValues.id 
            }
          });
          if(updatedResponseData)
            return responseHelper.post(res, 'Updated Successfully',updatedResponseData);
        }
        else{
          return responseHelper.post(res, 'Something went Wrong',400);
        }
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


    /**
    *@Method POST
    *@role Forgot Password
    **/
  forgotPassword: async (req, res, next) => {
    try {
      const { email} = req.body;
      const UserData = await EMPLOYEE.findOne({
          attributes: ['id', 'email'],
          where: {
            email: email,
          }
      });
      if (UserData) {
        var userDetail = JSON.parse(JSON.stringify(UserData))
        
        let newpassword = Math.random().toString(36).slice(-8);
        const pswd = await hashPassword.generatePass(newpassword);

        var dataEmail={name: userDetail.firstName,password: newpassword,app_name:configDev.APP_NAME}
        commonNotification.sendForgotPasswordMail(userDetail.email,dataEmail)

        //Update Password
        const updatePassword = await EMPLOYEE.update({
          password: pswd
        },
        {
          where: {
            id: userDetail.id
          }
        });

       return responseHelper.post(res, appstrings.password_reset_success,null,200);
      }
      return responseHelper.unauthorized(res, 'Invalid Email');
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Change Password
  *@Method POSt
  */
  changePassword:async(req,res,next) => { 
  
    var params=req.body;
    let responseNull= commonMethods.checkParameterMissing([params.oldPassword,params.newPassword])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
    const userData = await EMPLOYEE.findOne({
      where: {
        id: params.empId,
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
        await EMPLOYEE.update({ password: newPassword}, {where: { id:params.empId}}) ; 
        return responseHelper.post(res, appstrings.password_change_success,null,200);
      }
    }  
    else    
    {  
      return responseHelper.post(res, appstrings.no_record,null,204);
    }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@role Change Availablity Status
  *@Method POSt
  */
  changeAvailablity:async(req,res,next) => { 
    var params=req.body;
    let responseNull= commonMethods.checkParameterMissing([params.empId,params.status])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          id: params.empId,
        }
      })  
      if(userData)
      {
        await EMPLOYEE.update({ availableStatus: params.status}, {where: { id:params.empId}}) ; 
        return responseHelper.post(res, "Availablity status change successfully",null,200);
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.no_record,null,204);
      }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@role Change Availablity Status
  *@Method POSt
  */
  verifyUser:async(req,res,next) => { 
    let empId    = req.query.empId;
    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          id: empId,
        }
      })  
      if(userData)
      {
        await EMPLOYEE.update({ verifyUser: '1'}, {where: { id:empId}}) ; 
        return responseHelper.post(res, "verify user successfully",null,200);
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.no_record,null,204);
      }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },


  /**
  *@role Change Phone number
  *@Method POSt
  */
  changePhoneNumber:async(req,res,next) => { 
    var params=req.body;
    let responseNull= commonMethods.checkParameterMissing([params.phoneNumber,params.empId,params.countryCode])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          phoneNumber: params.phoneNumber,
          id: {
            [Op.ne]: params.empId
          }
        }
      })  

      if(!userData)
      {
        await EMPLOYEE.update({ phoneNumber: params.phoneNumber, countryCode: params.countryCode }, {where: { id:params.empId}}) ; 
        return responseHelper.post(res, appstrings.update_success,null,200);
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.phone_exist,null,204);
      }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@role Change Phone number
  *@Method POSt
  */
  checkPhoneNUmber:async(req,res,next) => { 
    var params=req.body;
    let responseNull= commonMethods.checkParameterMissing([params.phoneNumber,params.empId,params.countryCode])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          phoneNumber: params.phoneNumber,
          id: {
            [Op.ne]: params.empId
          }
        }
      })  

      if(!userData)
      {
        //await EMPLOYEE.update({ phoneNumber: params.phoneNumber, countryCode: params.countryCode }, {where: { id:params.empId}}) ; 
        return responseHelper.post(res,"Phone number available to change.",null,200);
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.phone_exist,null,204);
      }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@role Change Email Address
  *@Method POSt
  */
  changeEmail:async(req,res,next) => { 
    var params=req.body;
    let responseNull= commonMethods.checkParameterMissing([params.email,params.empId])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          email: params.email,
          id: {
            [Op.ne]: params.empId
          }
        }
      })  

      if(!userData)
      {
        var digits = '0123456789'; 
        var OTP = ''; 
        for (let i = 0; i < 6; i++ ) { 
          OTP += digits[Math.floor(Math.random() * 10)]; 
        }
        //await EMPLOYEE.update({ email: params.email }, {where: { id:params.empId}}) ; 
        await EMPLOYEE.update({ otp: OTP }, {where: { id:params.empId}}) ; 

        var dataEmail={otp:OTP, app_name:configDev.APP_NAME};
        commonNotification.sendOtpMail(params.email,dataEmail)
        return responseHelper.post(res, "We have sent one time otp send to your email address.",null,200);
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.email_exist,null,204);
      }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@role Change Email Address
  *@Method POSt
  */
  verifyEmail:async(req,res,next) => { 
    var params=req.body;
    let responseNull= commonMethods.checkParameterMissing([params.email,params.otp])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
      const userData = await EMPLOYEE.findOne({
        where: {
          id: req.id
        }
      })  

      if(userData)
      {
        if(userData.dataValues.otp == params.otp)
        {
          await EMPLOYEE.update({ email: params.email }, {where: { id:req.id}}) ; 
          return responseHelper.post(res, appstrings.update_success,null,200);
        }
        else
        {
           return responseHelper.post(res, "Invalid OTP!",null,204);
        }
      }  
      else    
      {  
        return responseHelper.post(res, appstrings.email_exist,null,204);
      }
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

  /**
  *@Method POST 
  *@role Update Mode Restaurant
  **/
  updateAccountDetails: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.accountNumber,data.accountName,data.riderId]);
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var userorderData = await EMPLOYEE.update(
        {
          bankName: data.accountName,
          accountNumber:data.accountNumber
        },
        { 
          where: {
            id: data.riderId
          }
        }
      )

      return responseHelper.post(res, 'Rider status change Successfully',data);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Restaurants Cuisines
  **/
  getAccountDetails: async (req, res, next) => {
    try{
      let riderId    = req.query.riderId;
      const serviceDetails = await EMPLOYEE.findOne({
        attributes: ['id','bankName','accountNumber'],
        where: {
          id: riderId
        }
      });
      if(serviceDetails)
        return responseHelper.post(res, 'Fetch rider Details.',serviceDetails);
      else
        return responseHelper.post(res, 'No Record Found', serviceDetails, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },
 
};