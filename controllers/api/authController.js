
const express = require('express');

const app = express();
const bcrypt = require('bcryptjs');
const v = require('node-input-validator');
const hashPassword = require('../../helpers/hashPassword');
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
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
const SETTING= db.models.settings;
const ORDERS     = db.models.orders;
const {Client} = require("@googlemaps/google-maps-services-js");
COMPANY.hasOne(CHEF, {foreignKey: 'companyId'});
// Generate Hash
const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
module.exports = {

  logout: async (req, res, next) => {
    const params = req.body;
    try
    {
      const updatedResponse = await USER.update({
          sessionToken: "",
          deviceToken: "",
        },
        {
          where : {
            phoneNumber:params.phoneNumber
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
      let responseNull= commonMethods.checkParameterMissing([data.firstName,data.phoneNumber,data.password])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

      const user = await USER.findOne({
        where: {
          phoneNumber: data.phoneNumber

        }
      });

      if (!user) {
        
        var actualPassword = data.password;
        const pswd = await hashPassword.generatePass(data.password);
        data.password = pswd;

        const users = await USER.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: '',
          region: '',
          address: '',
          phoneNumber: data.phoneNumber,
          countryCode: '',
          password: pswd,
          deviceToken: data.deviceToken,
          platform: data.deviceType,
          companyId: null
         });

        if (users) {
          const userId = users.dataValues.id;
          data.userId = userId;
          const credentials = {
            phoneNumber: users.dataValues.phoneNumber,
            userType: 1,
            id : userId
          };

          const authToken = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: config.authTokenExpiration });
          const refreshToken = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: config.refreshTokenExpiration });
          const userDetail = {};
          userDetail.phoneNumber = users.dataValues.phoneNumber;
          userDetail.firstName = users.dataValues.firstName;
          userDetail.lastName = users.dataValues.lastName;
          userDetail.password = actualPassword;
          userDetail.image = '';
          userDetail.deviceToken = users.dataValues.deviceToken;
          userDetail.sessionToken = authToken;
          userDetail.refreshToken = refreshToken;
          userDetail.id = userId;
          
          //Check Company Id
          return responseHelper.post(res, "Signup Successfully", userDetail);
        }
      } else {
        return responseHelper.error(res, "You have already signup with same phone number as customer.", 409);
      }
    } catch (e) {
      return responseHelper.error(res,  "error", e.message);
    }

},


  /*
  *@role Sign Up
  *@Method POST
  */
  webSignup: async (req, res) => {
    try {
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.firstName,data.email,data.password])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

      const user = await USER.findOne({
        where: {
          email: data.email

        }
      });

      if (!user) {
        
        var actualPassword = data.password;
        const pswd = await hashPassword.generatePass(data.password);
        data.password = pswd;

        const users = await USER.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          region: data.region,
          address: '',
          phoneNumber: '',
          countryCode: '',
          password: pswd,
          deviceToken: data.deviceToken,
          platform: "web",
          companyId: null
         });

        if (users) {
          const userId = users.dataValues.id;
          data.userId = userId;
          const credentials = {
            email: users.dataValues.email,
            userType: 1,
            id : userId
          };

          const authToken = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: config.authTokenExpiration });
          const refreshToken = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: config.refreshTokenExpiration });
          const userDetail = {};
          userDetail.email = users.dataValues.email;
          userDetail.firstName = users.dataValues.firstName;
          userDetail.lastName = users.dataValues.lastName;
          userDetail.region = users.dataValues.region;
          userDetail.password = actualPassword;
          userDetail.image = '';
          userDetail.deviceToken = users.dataValues.deviceToken;
          userDetail.sessionToken = authToken;
          userDetail.refreshToken = refreshToken;
          userDetail.id = userId;
          
          const updateDevicetoken = await USER.update({
              sessionToken: authToken,
              platform: "web",
              deviceToken: data.deviceToken,
          },
          {
            where: {
              id: users.dataValues.id
            }
          });
          var dataEmail={name: users.dataValues.firstName,app_name:config.APP_NAME}
          commonNotification.sendMail(users.dataValues.email,dataEmail)
          return responseHelper.post(res, "Signup Successfully", userDetail);
        }
      } else {
        return responseHelper.error(res, "You have already signup with same email address as customer.", 409);
      }
    } catch (e) {
      return responseHelper.error(res,  "error", e.message);
    }
  },


  /**
*@role Login API
*@Method POST
*/
Weblogin: async (req, res) => {
  const params = req.body;
  let responseNull=  commonMethods.checkParameterMissing([params.email,params.password])
  if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

  try{
    var userData = await USER.findOne({
      where: {
        email: params.email
      }
    })  

    if(userData)
    {
      //Check User Login
      var getUser = userData.toJSON();

      if(getUser.status == '0')
      {
        return responseHelper.unauthorized(res, 'Sorry, You have block by admin. Please contact to support.');
      }

      var match = await hashPassword.comparePass(params.password, getUser.password);
      // compare pwd
      if (!match) {
        return responseHelper.unauthorized(res, 'Invalid Password');
      }
      let token = jwt.sign(
      {
        email: params.email,
        userType: 1,
        id : userData.dataValues.id

      },
      config.jwtToken,
      { algorithm: 'HS256', expiresIn: '2880m' }
      );
      var updatedResponse = await USER.update({
          sessionToken: token,
          platform: "web",
          deviceToken: params.deviceToken,
        },
        {
        where : {
          id: userData.dataValues.id
        }
      });

      //Check Guest UserId
      if(params.guestUserId != '0' && params.guestUserId)
      {


        await CART.destroy({
          where: {
            userId: userData.dataValues.id
          }
        }); 

        await userCoupan.destroy({
          where: {
            userId: userData.dataValues.id
          }
        });

        const orderData = await CART.update(
          {
            userId: userData.dataValues.id
          },
          { 
            where: {
              userId: params.guestUserId
            }
          }
        )

        //Update Coupon
        await userCoupan.update(
          {
            userId: userData.dataValues.id
          },
          { 
            where: {
              userId: params.guestUserId
            }
          }
        )
      }

      //Check Company Exist
      const companyEmail = await COMPANY.findOne({
        attributes: ['id','companyName'],
        where: {
          email: params.email
        },
        include: [{
          model: CHEF,
          attributes: ['id','name','description','images'],
        }
        ]
      });
      if(companyEmail)
      {
        var companyExist = companyEmail.dataValues.id;
        var companyName  = companyEmail.dataValues.companyName;
        var companychef  = companyEmail.chef;
        //Update Restaurant Device Token and Type
        await COMPANY.update({
            deviceToken: params.deviceToken,
            deviceType: params.deviceType,
          },
          {
          where : {
            id: companyExist
          }
        });
      }else{
        var companyExist = "";
        var companyName  = "";
        var companychef  = {};
      }

      userData.dataValues.userId       = userData.dataValues.id;
      userData.dataValues.sessionToken = token;
      userData.dataValues.platform     = params.deviceType;
      userData.dataValues.deviceToken  = params.deviceToken;
      userData.dataValues.companyId    = companyExist;
      userData.dataValues.companyName  = companyName;
      userData.dataValues.chef  = companychef;
      return responseHelper.post(res, 'Login Successfully',userData);

    }
    else
    {
      return responseHelper.error(res, "Invalid Email Address!", 409);
    }
  }
  catch (e) {
    return responseHelper.error(res, e.message, 400);
  }
  
},



/**
*@role Login API
*@Method POST
*/
login: async (req, res) => {
  const params = req.body;
  let responseNull=  commonMethods.checkParameterMissing([params.phoneNumber,params.password])
  if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

  try{
    var userData = await USER.findOne({
      where: {
        phoneNumber: params.phoneNumber
      }
    })  

    if(userData)
    {
      //Check User Login
      var getUser = userData.toJSON();

      if(getUser.status == '0')
      {
        return responseHelper.unauthorized(res, 'Sorry, You have block by admin. Please contact to support.');
      }

      var match = await hashPassword.comparePass(params.password, getUser.password);
      // compare pwd
      if (!match) {
        return responseHelper.unauthorized(res, 'Invalid Password');
      }
      let token = jwt.sign(
      {
        phoneNumber: params.phoneNumber,
        userType: 1,
        id : userData.dataValues.id

      },
      config.jwtToken,
      { algorithm: 'HS256', expiresIn: '2880m' }
      );
      var updatedResponse = await USER.update({
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

    }
    else
    {
      return responseHelper.error(res, "Invalid phone number!", 409);
      
    }
  }
  catch (e) {
    return responseHelper.error(res, e.message, 400);
  }
  
},

VerifyOTP: async (req, res) => {
  const params = req.body;

  try{
    var userData = await USER.findOne({
      where: {
        phoneNumber: params.phoneNumber
      }
    })  

    if(userData)
    {
      //Check User Login
      var getUser = userData.toJSON();
      var otp = getUser.otp



      var match = await hashPassword.comparePass(params.password, getUser.password);
      // compare pwd
      if (!match) {
        return responseHelper.unauthorized(res, 'Invalid Password');
      }
      let token = jwt.sign(
      {
        phoneNumber: params.phoneNumber,
        userType: 1,
        id : userData.dataValues.id

      },
      config.jwtToken,
      { algorithm: 'HS256', expiresIn: '2880m' }
      );
      var updatedResponse = await USER.update({
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

    }
    else
    {
      return responseHelper.error(res, "Invalid phone number!", 409);
      
    }
  }
  catch (e) {
    return responseHelper.error(res, e.message, 400);
  }
  
},

Sociallogin: async (req, res, next) => {
  const params = req.body;
  let responseNull=  commonMethods.checkParameterMissing([params.email,params.socialId,params.socialType,params.deviceToken])
  if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

  try{
    const userData = await USER.findOne({
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
      config.jwtToken,
      { algorithm: 'HS256', expiresIn: '2880m' }
      );
      const updatedResponse = await USER.update({
        sessionToken: token,
        platform: params.deviceType,
        deviceToken: params.deviceToken,
        },
        {
        where : {
          id: userData.dataValues.id
        }
        });

       //Check Guest UserId
      if(params.guestUserId != '0' && params.guestUserId)
      {
        const orderData = await CART.update(
          {
            userId: userData.dataValues.id
          },
          { 
            where: {
              userId: params.guestUserId
            }
          }
        )


        //Update Coupon
        await userCoupan.update(
          {
            userId: userData.dataValues.id
          },
          { 
            where: {
              userId: params.guestUserId
            }
          }
        )
      }
      //Check Company Exist
      var companyEmail = await COMPANY.findOne({
        attributes: ['id','companyName'],
        where: {
          email: params.email
        },
        include: [{
          model: CHEF,
          attributes: ['id','name','description','images'],
        }
        ]
      });
      if(companyEmail)
      {
        var companyExist = companyEmail.dataValues.id;
        var companyName  = companyEmail.dataValues.companyName;
        var companychef  = companyEmail.chef;
      }else{
        var companyExist = "";
        var companyName  = "";
        var companychef  = {};
      }

      userData.dataValues.userId   = userData.dataValues.id;
      userData.dataValues.companyId = companyExist;
      userData.dataValues.companyName  = companyName;
      userData.dataValues.chef  = companychef;
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
        
      //Check Company Exist
      var companyDetails = await COMPANY.findOne({
        where: {
          email: params.email
        },
        include: [{
          model: CHEF,
          attributes: ['id','name','description','images'],
        }
        ]
      });
      if(companyDetails)
      {
        let token = jwt.sign(
        {
          email: params.email,
          userType: 1,
          id : companyDetails.dataValues.id

        },
        config.jwtToken,
        { 
          algorithm: 'HS256', expiresIn: '2880m' }
        );

        companyDetails.dataValues.userId       = "";
        companyDetails.dataValues.companyId    = companyDetails.dataValues.id;
        companyDetails.dataValues.sessionToken = token;
        companyDetails.dataValues.platform     = params.deviceType;
        companyDetails.dataValues.deviceToken  = params.deviceToken;
        return responseHelper.post(res, 'Login Successfully',companyDetails);
      }

      const users = await USER.create({
        firstName: params.firstName,
        lastName:  params.lastName,
        email: params.email,
        address: '',
        phoneNumber: '',
        countryCode: '',
        password: '',
        deviceToken: params.deviceToken,
        platform: params.deviceType,
        companyId: null,
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

      const authToken = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: config.authTokenExpiration });
      const refreshToken = jwt.sign(credentials, config.jwtToken, { algorithm: 'HS256', expiresIn: config.refreshTokenExpiration });
      const userDetail = {};
      userDetail.email = users.dataValues.email;
      userDetail.firstName = users.dataValues.firstName;
      userDetail.lastName = users.dataValues.lastName;
      userDetail.image = '';
      userDetail.sessionToken = authToken;
      userDetail.refreshToken = refreshToken;
      userDetail.id = userId;
       //Check Company Exist
      var companyEmail = await COMPANY.findOne({
        attributes: ['id','companyName'],
        where: {
          email: params.email
        },
        include: [{
          model: CHEF,
          attributes: ['id','name','description','images'],
        }
        ]
      });
      if(companyEmail)
      {
        var companyExist = companyEmail.dataValues.id;
        var RestaurantName = companyEmail.dataValues.companyName;
        var companychef  = companyEmail.chef;
      }else{
        var companyExist = "";
        var RestaurantName = "";
        var companychef  = {};
      }
      userDetail.userId    = userId;
      userDetail.companyId = companyExist;
      userDetail.companyName= RestaurantName;
      userDetail.chef= companychef;
      const updateDevicetoken = await USER.update({
        sessionToken: authToken,
        platform: params.deviceType,
        deviceToken: params.deviceToken,
        },
        {
        where: {
          id: users.dataValues.id
        }
      });
      var dataEmail={name: users.dataValues.firstName,app_name:config.APP_NAME}
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
    const userData = await USER.findOne({
    where: {
      id : req.id
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
      if (req.files) {
        ImageFile = req.files.profileImage;    
        imageName = Date.now() + '_' + ImageFile.name;
        ImageFile.mv(config.UPLOAD_DIRECTORY +"users/"+ imageName, function (err) {
        if (err)
          responseHelper.error(res,err.message,400)
        });
      }
      const userData = await USER.findOne({
        where: {
          id: req.id 
        }
      });
      if(userData)
      {
        if(imageName=="")  imageName= userData.dataValues.image;

        const updatedResponse = await USER.update({
            firstName: params.firstName,
            lastName: params.lastName,
            region: params.region,
            address: '',
            image: imageName,
            countryCode: params.countryCode,
            phoneNumber: params.phoneNumber
          },
          {
          where : {
            id: userData.dataValues.id
          }
        });

        if(updatedResponse)
        {
          const updatedResponseData = await USER.findOne({
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
      const UserData = await USER.findOne({
          attributes: ['id', 'email'],
          where: {
            email: email,
          }
      });
      if (UserData) {
        var userDetail = JSON.parse(JSON.stringify(UserData))
        
        let newpassword = Math.random().toString(36).slice(-8);
        const pswd = await hashPassword.generatePass(newpassword);

        var dataEmail={name: userDetail.firstName,password: newpassword,app_name:config.APP_NAME}
        commonNotification.sendForgotPasswordMail(userDetail.email,dataEmail)

        //Update Password
        const updatePassword = await USER.update({
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


  /*
  *@role Guest User Update Details
  *@Method POST
  */
  guestProfileUpdate: async (req, res, next) => {
    const params = req.body;
    try{
      let responseNull=  commonMethods.checkParameterMissing([params.firstName,params.email,params.phoneNumber])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      
      //Check Email ID
      const ChckEmail = await USER.findOne({
        where: {
          email: params.email 
        }
      });
      if(ChckEmail)
      {
        return responseHelper.post(res, "Email Address already exist.",null, 409);
      }

      //Check User Id
      const userData = await USER.findOne({
        where: {
          id: params.userId 
        }
      });
      if(userData)
      {
        const updatedResponse = await USER.update({
          firstName: params.firstName,
          lastName: params.lastName,
          region: params.region,
          address: params.address,
          countryCode: params.countryCode,
          phoneNumber: params.phoneNumber,
          email: params.email
        },
        {
        where : {
          id: params.userId
        }
        });

        if(updatedResponse)
        {
          const updatedResponseData = await USER.findOne({
            attributes: ['id','firstName','lastName','email','countryCode','phoneNumber','region','address'],
            where: {
              id: params.userId 
            }
          });
          if(updatedResponseData)
            return responseHelper.post(res, 'Profile Updated Successfully.',updatedResponseData);
        }
        else{
          return responseHelper.post(res, 'Something went Wrong',400);
        }
      }else{
        return responseHelper.post(res, 'User does not exist.',400);
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Create Stripe Customer
  *@Method POST
  *@params userId,address
  */
  createStripeCustomer: async (req, res, next) => {
    try
    {
      const formData = req.body;
      var userId     = formData.userId;
      let address    = formData.address;
      const ChckEmail = await USER.findOne({
        where: {
          id: userId 
        }
      });
      stripe.customers.create({
        name: ChckEmail.dataValues.firstName + ' '+ ChckEmail.dataValues.lastName,
        email: ChckEmail.dataValues.email,
        description: 'Customer for '+ ChckEmail.dataValues.email,
        phone: ChckEmail.dataValues.phoneNumber,
        address: {
          line1: address
        }
      }, async function (err, customer) {
        if (typeof customer !== 'undefined' && customer) {
          var response = await USER.update({
            stripeCustomerId: customer.id
          },{
            where: {
              id: userId
            }
          });
          return res.json({code: 200, message: "Customer create Successfully.", data: customer});
        } else {
          return res.json({code: 400, message: err});
        }
      });
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Add Card Details
  *@Method POST
  *@params userId,cardId,customerId
  */
  addCard: async (req, res, next) => {
    try
    {
      const formData = req.body;
      let responseNull=  commonMethods.checkParameterMissing([formData.customerId,formData.cardToken])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,{},400);
      var customerId = formData.customerId;
      var cardToken  = formData.cardToken;
      // stripe.tokens.create({
      //   card: {
      //     number: formData.cardNumber,
      //     exp_month: formData.expiryMonth,
      //     exp_year: formData.expiryYear,
      //     cvc: formData.cvv
      //   }
      // }, async function (err, card_token) {
      //   if (typeof card_token !== 'undefined' && card_token) {
          // console.log('card token ---', card_token);
      stripe.customers.createSource(customerId, {
        source: cardToken,
      }, function (errs, card) {
        if (card) {
          return res.json({code: 200, message: "Card create Successfully.", data: card});
        } else {
          console.log('charge fail');
          return res.json({code: errs.statusCode, message: errs.raw.message});
        }
      });
      //   } else {
      //     console.log('charge fail');
      //     return res.json({status: err.statusCode, message: err.raw.message});
      //   }
      // });
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Get Card List
  *@Method GET
  *@params userId
  */
  getSavedCard: async (req, res, next) => {
    try
    {
      var customerId = req.body.customerId;
      const cards = await stripe.customers.listSources(
        customerId,
        {object: 'card'}
      );
      return res.json({code: 200, message: "Card list fetch Successfully.", body: cards});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Delete Card Details
  *@Method GET
  *@params userId
  */
  deleteCard: async (req, res, next) => {
    try
    {
      var customerId = req.body.customerId;
      var cardId = req.body.cardId;
      const deleted = await stripe.customers.deleteSource(
        customerId,
        cardId
      );
      return res.json({code: 200, message: "Card deleted successfully."});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /*
  *@role Get Card List
  *@Method GET
  *@params userId
  */
  calculateOrderDistance: async (req, res, next) => {
    try
    {
      const formData = req.body;
      const client = new Client({});
      var restaurantId = formData.restaurantId;
      var latitude     = formData.latitude;
      var longitude    = formData.longitude;

      //
      var restaurantDetails = await COMPANY.findOne({
        where: {
          id: restaurantId
        }
      });
      var restLatitude  = restaurantDetails.dataValues.latitude;
      var restLongitude = restaurantDetails.dataValues.longitude;
      var origins = [{
        lat: restLatitude, 
        lng: restLongitude
      }];
      var destinations = [{
        lat: latitude, 
        lng: longitude
      }];

    client.distancematrix({
      params: {
        origins: origins,
        destinations: destinations,
        key: "AIzaSyDBBLtvW2kqoNiPXOuDBzlk5V_QmRXJLKg",
      },
      timeout: 10000, // milliseconds
    }).then((r) => {
      r.data.rows[0].elements.map(async(element, index)=>{      
        if(element.status == 'OK'){
          //orderCurrentData.deliveryPoints.push({distance: element.distance.text, time: element.duration.text });
          var dist = element.distance.text;
          dist = Number(dist.replace(/[^\d]/g, ''));
          dist = Math.round(dist);
          var totalTime = await commonMethods.convertMinutes(element.duration.text);
          if(parseInt(dist) <= parseInt(restaurantDetails.dataValues.maximumDistance))
          {
            return res.json({code: 200, message: "Success.", distance: dist,deliveryTime:parseInt(totalTime) });
          }else{
            return res.json({code: 202, message: "Not applicable for this order.", distance: dist,deliveryTime:parseInt(totalTime)});
          }
        }           
      });
      
    }).catch((e) => {
      console.log("===error==",e);
      return responseHelper.error(res, "Google api timout", 400);
    });
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Get Notification List
  *@Method GET
  *@params userId
  */
  getAllNotifications: async (req, res, next) => {
    try
    {
      var id = req.params.id;
      var orderby = Sequelize.literal(`orderby DESC`)
      const cards = await NOTIFICATION.findAll({
        where:{
          userId: id,
        },
        order: orderby, 
      });
      return res.json({code: 200, message: "Notification list fetch Successfully.", body: cards});
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
    let responseNull= commonMethods.checkParameterMissing([params.email,params.newPassword])
    if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

    try{
    var userData = await USER.findOne({
      where: {
        email: params.email,
      }
    }); 
    if(userData)
    {
      var Password = userData.dataValues.password;
    }else{
      var restData = await COMPANY.findOne({
        where: {
          email: params.email,
        }
      }); 
      if(!restData)
      {
        return responseHelper.post(res, appstrings.no_record,null,204);
      }
      var Password = restData.dataValues.password;
    } 

    if(Password != "")
    {
      const match = await hashPassword.comparePass(params.oldPassword,Password);
      if (!match) {
        return responseHelper.post(res, appstrings.inccorect_oldpass,null,400);
      }
    }
    
    const newPassword = await hashPassword.generatePass(params.newPassword);
    await COMPANY.update({ password: newPassword}, {where: { email:params.email}}) ; 
    await USER.update({ password: newPassword}, {where: { email:params.email}}) ; 
    return responseHelper.post(res, appstrings.password_change_success,null,200);


    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },


  /*
  *@role Delete Bussiness
  *@Method GET
  *@params userId
  */
  shutdown: async (req, res, next) => {
    try
    {
      const data = req.body;
      //1->Restaurant
      //2->Rider
       let responseNull= commonMethods.checkParameterMissing([data.requestStatus,data.userId]);
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      if(data.requestStatus == '1')
      {
        await COMPANY.destroy({
          where: {
            id: data.userId
          }
        });
        await ORDERS.destroy({
          where: {
            companyId: data.userId
          }
        });
      }
      else
      {
        await EMPLOYEE.destroy({
          where: {
            id: data.userId
          }
        });
      }
      await NOTIFICATION.destroy({
        where: {
          userId: data.userId
        }
      });
      return res.json({code: 200, message: "Bussiness shutdown successfully."});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  getSettings: async(req,res,next) => {
    try {
      
      var data  = await SETTING.findOne();
      console.log(data)
      return responseHelper.post(res,"Setting fetch successfully",data,200);
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  getFaq: async(req,res,next) => {
    try{
      //var params=req.query
      // var page =1
      // var limit =50
      // if(params.page) page=params.page
      // if(params.limit) limit=parseInt(params.limit)
      // var offset=(page-1)*limit
      //Get All Categories
      var findData=await FAQ.findAll({
        attributes:['id','question','answer','status','language'],
        order: [
          ['createdAt','DESC']
        ],      
        // offset: offset, 
        // limit: limit,
      })
      if(findData.length>0) return responseHelper.post(res, appstrings.success,findData, 200);
      return responseHelper.post(res, appstrings.no_record,{}, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  }

};