
const express = require('express');

const app = express();
const bcrypt = require('bcryptjs');
const v = require('node-input-validator');
const hashPassword = require('../../../helpers/hashPassword');
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const jwt = require('jsonwebtoken');
const util = require('util');
const mysql = require('mysql2/promise');
require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const CHEF=db.models.chef;
const companyTiming=db.models.companyTimings;
USER=db.models.users;
const Cuisines = db.models.companyCuisines;
const CompanyDocument = db.models.CompanyDocuments;
const CompanyImage = db.models.CompanyImages;
const CompanyVideo = db.models.CompanyVideos;
const MENUS    = db.models.menus;
COMPANY.hasMany(Cuisines, {foreignKey: 'companyId'});
COMPANY.hasMany(companyTiming, {foreignKey: 'companyId'});
COMPANY.hasMany(CompanyDocument, {foreignKey: 'companyId'});
COMPANY.hasMany(CompanyImage, {foreignKey: 'companyId'});
Cuisines.belongsTo(CATEGORY,{foreignKey: 'categoryId'});
COMPANY.hasOne(CHEF, {foreignKey: 'companyId'});
COMPANY.hasOne(CompanyVideo, {foreignKey: 'companyId'});
// Generate Hash
const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
module.exports = {

  logout: async (req, res, next) => {
    const params = req.body;
    try{
      const updatedResponse = await COMPANY.update({
        sessionToken: "",
        deviceToken: "",
      },
      {
        where : {
        id:req.id,
        companyId: req.myCompanyId
      }
      });
      if(updatedResponse)
      {
        return responseHelper.post(res, 'Logout Successfully');
      }
        
    else
    return responseHelper.post(res, 'Logout Successfully');


    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
    
  },

  /*
  *@role Restaurants Sign Up
  *@Method POST
  */
  signup: async (req, res) => {
    try {
      const data = req.body;

      let responseNull= commonMethods.checkParameterMissing([data.fName,data.email,data.password])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

      const user = await COMPANY.findOne({
        where: {
          email: data.email,
          role:'2'
        }
      });

      if (!user) {
        const pswd = await hashPassword.generatePass(data.password);
        data.password = pswd;

        //Create Restaurants Details
        const companies = await COMPANY.create({
          firstName: data.fName,
          lastName: data.lName,
          companyName: data.companyName,
          email: data.email,
          address1: data.address,
          phoneNumber: data.phoneNumber,
          countryCode: data.countryCode,
          region: data.region,
          password: pswd,
          latitude: data.latitude,
          longitude: data.longitude,
          deviceToken: data.deviceToken,
          deviceType: data.deviceType,
          role: '2',
          status: '0',
          instaMode: '1'
        });

        //Get Restaurat Id
        var RestaurantId = companies.dataValues.id;
        //Create Menu
        //Create Menu
        var menuadd = await MENUS.create({
          name: "Draft",
          companyId: RestaurantId,
          status: '0'
        });
        var menuadd = await MENUS.create({
          name: "My Menu",
          companyId: RestaurantId
        });

        //Add Restaurants Cuisions
        var NewArray     = [];
        var items        = data.cuisines;
  
        for (var i = 0; i < items.length; i++) {
          var array = {};
          array.companyId  = RestaurantId;
          array.categoryId = items[i];
          NewArray.push(array);
        }
      
        const response = await Cuisines.bulkCreate(NewArray);
        if (companies) {
          const userId = companies.dataValues.id;
          data.userId = userId;


          //Create As Customer
          const CustomerSignup = await USER.create({
            firstName: data.fName,
            lastName: data.lName,
            email: data.email,
            region: data.region,
            address: '',
            phoneNumber: data.phoneNumber,
            countryCode: data.countryCode,
            password: pswd,
            deviceToken: data.deviceToken,
            platform: data.deviceType,
            companyId: null
          });

          var customerId = CustomerSignup.dataValues.id;

          const credentials = {
            email: companies.dataValues.email,
            userType: 1,
            id : customerId
          };

          const authToken = jwt.sign(credentials, configDev.jwtToken, { algorithm: 'HS256', expiresIn: configDev.authTokenExpiration });
          const refreshToken = jwt.sign(credentials, configDev.jwtToken, { algorithm: 'HS256', expiresIn: configDev.refreshTokenExpiration });
          const userDetail = {};
          userDetail.email = companies.dataValues.email;
          userDetail.companyName = companies.dataValues.companyName;
          userDetail.firstName   = CustomerSignup.dataValues.firstName;
          userDetail.lastName     = CustomerSignup.dataValues.lastName;
          //userDetail.deviceToken = users.dataValues.deviceToken;
          userDetail.sessionToken = authToken;
          userDetail.refreshToken = refreshToken;
          userDetail.id = userId;
          userDetail.userId = customerId; 
          userDetail.stripeCustomerId = CustomerSignup.dataValues.stripeCustomerId;
          userDetail.region           = CustomerSignup.dataValues.region;
          userDetail.countryCode      = CustomerSignup.dataValues.countryCode;
          userDetail.phoneNumber      = CustomerSignup.dataValues.phoneNumber;
          //Get All Cunision
          const getAllCuisines = await Cuisines.findAll({
            attributes: ['id','categoryId','companyId'],
            where: {
              companyId: userId
            },
            include: [{
              model: CATEGORY,
              attributes: ['name']
            }]
          });
          userDetail.cuisines = getAllCuisines;
          //Create Company
          // const userEmail = await USER.findOne({
          //   where: {
          //     email: data.email
          //   }
          // });
          // if(userEmail)
          // {
          //   userDetail.userId = userEmail.dataValues.id;
          // }else{
          //   userDetail.userId = "";
          // }

          var dataEmail={name: companies.dataValues.companyName,app_name:configDev.APP_NAME}
          commonNotification.sendMail(companies.dataValues.email,dataEmail)
          return responseHelper.post(res, "Signup Successfully", userDetail);
        }
      } else {
        return responseHelper.error(res, "You have already signup with same email address as restaurant owner.", 409);
      }
    } catch (e) {
      return responseHelper.error(res,  "error", e.message);
    }

},

/**
*@role Restaurant Login API
*@Method POST
*/
login: async (req, res) => {
  const params = req.body;
  let responseNull=  commonMethods.checkParameterMissing([params.email,params.password])
  if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

  try{
    const userData = await COMPANY.findOne({
      where: {
        email: params.email
      }
    })  

    if(userData)
    {
      const getUser = userData.toJSON();
      const match = await hashPassword.comparePass(params.password, getUser.password);
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
      configDev.jwtToken,
      { 
        algorithm: 'HS256', expiresIn: '2880m' }
      );
      const updatedResponse = await COMPANY.update({
          deviceToken: params.deviceToken,
        },
        {
        where : {
          id: userData.dataValues.id
        }
      });
      // if(updatedResponse)
      // {
        userData.dataValues.sessionToken=token
        userData.dataValues.platform=params.platform
        userData.dataValues.deviceToken=params.deviceToken
        return responseHelper.post(res, 'Login Successfully',userData);
      //}
    }
    else{
      return responseHelper.error(res, "Invalid Email Address!", 409);
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
      configDev.jwtToken,
      { algorithm: 'HS256', expiresIn: '2880m' }
      );
      const updatedResponse = await USER.update({
        sessionToken: token,
        platform: 'app',
        deviceToken: params.deviceToken,
        },
        {
        where : {
          id: userData.dataValues.id
        }
        });
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
      const userDataDe = await USER.findOne({
        where: {
          email: params.email
        }
      });
      if(userDataDe)
      {
        return responseHelper.error(res, "Email already exist", 409);
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
        platform: 'app',
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
      const updateDevicetoken = await USER.update({
        sessionToken: authToken,
        platform: 'app',
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
    const userData = await COMPANY.findOne({
      attributes: ['id','companyName','firstName','logo2','images','license','lastName','email','deliveryType','holidays','countryCode','phoneNumber','region','deliveryFee','maximumDistance','minimumOrderValue','latitude','longitude',
          [Sequelize.literal('companies.address1'), 'address']],
    where: {
      id : req.query.restaurantId
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
      model: CompanyVideo,
      required: false,
      attributes: ['id','picture']
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
    if(userData)
      return responseHelper.post(res, 'Profile Detail',userData);
    else
      return responseHelper.post(res, 'No Record Found', userData, 204);
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
    const data = req.body;
    try{
      let responseNull=  commonMethods.checkParameterMissing([data.companyName,data.restaurantId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var imageName="";
      var upload=[];
      var uploadPicture =[];
      if(req.files && req.files['images'])
      {
        var fdata=req.files['images']
        if(fdata.length && fdata.length>0)
        {
          for(var k=0;k<fdata.length;k++)
          {
            ImageFile = req.files['images'][k];    
            bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
            var imageName = bannerImage;

            var array = {};
            array.companyId = data.restaurantId;
            array.picture  = bannerImage;
            uploadPicture.push(array);

            //upload.push(bannerImage)
            ImageFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ bannerImage, function (err) {
            //upload file
            if (err)
              return responseHelper.error(res, err.meessage, 400);   
            }); 
          }
        }
        else{
          ImageFile = req.files['images'];    
          bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
          var imageName = bannerImage;
          var array = {};
          array.companyId = data.restaurantId;
          array.picture  = bannerImage;
          uploadPicture.push(array);
          //upload.push(bannerImage)
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ bannerImage, function (err) {
            //upload file
            if (err)
            return responseHelper.error(res, err.meessage, 400);   
          });
        }
      }

      
      //Upload Video
      if(req.files && req.files.VideoThumb)
      { 
        console.log("req.files.VideoThumb====",req.files.VideoThumb)
        var ImageThumbFile = "";
        var ImagethumbName = "";
        ImageThumbFile = req.files.VideoThumb;
        ImagethumbName = Date.now() + '_' + ImageThumbFile.name;
        await multipleFileupload(ImageThumbFile,ImagethumbName);

        // ImageThumbFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ ImagethumbName, function (err) {
        //   console.log('success');
        // });
        const restVideos = await CompanyVideo.create({
          picture: ImagethumbName,
          companyId: data.restaurantId
        });
      }

      const userData = await COMPANY.findOne({
        where: {
          id: data.restaurantId
        }
      });

      
      if(userData)
      {
        

         //Update Profile
        if(uploadPicture.length > 0)
        {

          //Create Mulitple Upload Images
          const uploadPDetails = await CompanyImage.bulkCreate(uploadPicture);

          //Update Company Profile
          const updatedResponse = await COMPANY.update({
            //firstName: data.fName,
            //lastName: data.lName,
            companyName: data.companyName,
            address1: data.address,
            phoneNumber: data.phoneNumber,
            countryCode: data.countryCode,
            deliveryType: data.deliveryType,
            //region: data.region,
            latitude: data.latitude,
            longitude: data.longitude,
            logo1: imageName,
           // logo2: ImagethumbName,
            deliveryFee: data.deliveryFee,
            maximumDistance: data.maximumDistance,
            minimumOrderValue: data.minimumOrderValue,
            //images: upload.toString(),
          },
          {
            where : {
              id: userData.dataValues.id
            }
          });
        }
        else
        {
          //Update Company Profile
          const updatedResponse = await COMPANY.update({
            //firstName: data.fName,
            //lastName: data.lName,
            companyName: data.companyName,
            address1: data.address,
            phoneNumber: data.phoneNumber,
            countryCode: data.countryCode,
            deliveryType: data.deliveryType,
           // region: data.region,
            logo2: ImagethumbName,
            latitude: data.latitude,
            longitude: data.longitude,
            deliveryFee: data.deliveryFee,
            maximumDistance: data.maximumDistance,
            minimumOrderValue: data.minimumOrderValue,
          },
          {
            where : {
              id: userData.dataValues.id
            }
          });
        }

        //Check Chef Details Found
         const chefde = await CHEF.findOne({
          where: {
              companyId: data.restaurantId
            }
          });
          var chefUploadImage = "";
          if(req.files && req.files.chefImage)
          {
            chefImageFile = req.files.chefImage;    
            if(chefImageFile)
            {
              chefUploadImage = Date.now() + '_' + chefImageFile.name.replace(/\s/g, "");
              chefImageFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ chefUploadImage, function (err) {
                  //upload file
                  if (err)
                  return responseHelper.error(res, err.meessage, 400);   
              });
            }
          }

          if(chefde)
          {
            //Update Chef Details
            if(chefUploadImage != "")
            {
              var chefupdatedResponse = await CHEF.update({
                name: data.chefName,
                  description: data.chefdescription,
                  images: chefUploadImage
                },
                {
                where : {
                  companyId: userData.dataValues.id
                }
              });
            }else{
              var chefupdatedResponse = await CHEF.update({
                  name: data.chefName,
                  description: data.chefdescription
                },
                {
                where : {
                  companyId: userData.dataValues.id
                }
              });
            }
          }
          else{
            const cusers = await CHEF.create({
              name: data.chefName,
              description: data.chefdescription,
              companyId: data.restaurantId,
              images: chefUploadImage
            });
          }

        
        //Add/Delete Restaurants Cuisions
        const numAffectedRows = await Cuisines.destroy({
          where: {
            companyId: userData.dataValues.id
          }
        }); 
        var NewArray     = [];
        var items        = JSON.parse(data.cuisines);
        console.log(items)
        for (var i = 0; i < items.length; i++) {
          var array = {};
          array.companyId  = userData.dataValues.id;
          array.categoryId = items[i];
          NewArray.push(array);
        }
        const response = await Cuisines.bulkCreate(NewArray);
        
        const updatedResponseData = await COMPANY.findOne({
          where: {
            id: userData.dataValues.id 
          },
          include: [{
            model: CHEF,
            required: false,
            attributes: ['id','name','description','images']
          }]
        });
        if(updatedResponseData)
          return responseHelper.post(res, 'Updated Successfully',updatedResponseData);
        
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
      const UserData = await COMPANY.findOne({
          attributes: ['id', 'email'],
          where: {
            email: email,
          }
      });
      if (UserData) {
        var userDetail = JSON.parse(JSON.stringify(UserData))
        
        let newpassword = Math.random().toString(36).slice(-8);
        const pswd = await hashPassword.generatePass(newpassword);

        var dataEmail={name: userDetail.companyName,password: newpassword,app_name:configDev.APP_NAME}
        commonNotification.sendForgotPasswordMail(userDetail.email,dataEmail)

        //Update Password
        const updatePassword = await COMPANY.update({
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
  *@Method GET 
  *@role GET Restaurants Cuisines
  **/
  getAllRCuisines: async (req, res, next) => {
      try{
      const serviceDetails = await CATEGORY.findAll({
        attributes: ['id','name','icon'],
        where: {
          status: '1'
        }
      });
      if(serviceDetails)
        return responseHelper.post(res, 'List All Cuisines',serviceDetails);
      else
        return responseHelper.post(res, 'No Record Found', serviceDetails, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method POST 
  *@role Update Delivery Timing
  **/
  updateTiming: async (req, res, next) => {
    try{
      const data = req.body;
      //Update New Timing
      var timing = data.timing;
      for (var i = 0; i < timing.length; i++) 
      {
        var day = timing[i].day;
        var availability = timing[i].availability;
        var foundItem = await companyTiming.findOne({
          where: {
            companyId: data.restaurantId,
            day: day
          }
        });
        if(foundItem)
        {

          var userorderData = await companyTiming.update(
            {
              startTime: timing[i].startTime,
              endTime: timing[i].endTime,
              availability: availability
            },
            { 
              where: {
                companyId: data.restaurantId,
                day: day
              }
            }
          )  
        }
        else
        {
          var users = await companyTiming.create({
            startTime: timing[i].startTime,
            endTime: timing[i].endTime,
            availability: availability,
            day: day,
            companyId: data.restaurantId
          });
        }
      }

      //Update Holidays
      var userorderData = await COMPANY.update(
        {
          holidays: JSON.stringify(data.holidays),
          timeZone: data.timeZone,
        },
        { 
          where: {
            id: data.restaurantId
          }
        }
      )

      return responseHelper.post(res, 'Restaurants timing update Successfully',data);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /*
*@role Update Certificates
*@Method POST
*/
uploadDocuments: async (req, res, next) => {
    const data = req.body;
    try{
      let responseNull=  commonMethods.checkParameterMissing([data.license,data.restaurantId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      
      var upload=[];
      if(req.files && req.files['images'])
      {
        var fdata=req.files['images']
        if(fdata.length && fdata.length>0)
        {
          for(var k=0;k<fdata.length;k++)
          {
            ImageFile = req.files['images'][k];    
            bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
            var array = {};
            array.companyId = data.restaurantId;
            array.document  = bannerImage;
            upload.push(array);
            ImageFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ bannerImage, function (err) {
            //upload file
            if (err)
              return responseHelper.error(res, err.meessage, 400);   
            }); 
          }
        }
        else{
          
          ImageFile = req.files['images'];    
          bannerImage = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");
          var array = {};
          array.companyId = data.restaurantId;
          array.document  = bannerImage;
          upload.push(array);
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ bannerImage, function (err) {
            //upload file
            if (err)
            return responseHelper.error(res, err.meessage, 400);   
          });
        }
      }

      //Upload Documents
      await CompanyDocument.bulkCreate(upload);
      
      //Update Company Profile
      const updatedResponse = await COMPANY.update({
        license: data.license
      },
      {
        where : {
          id: data.restaurantId
        }
      });
      
      const updatedResponseData = await COMPANY.findOne({
        where: {
          id: data.restaurantId
        }
      });
      if(updatedResponseData)
        return responseHelper.post(res, 'Updated Successfully',updatedResponseData);
  
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /**
  *@Method GET 
  *@role GET Remove Document
  **/
  removeDocuments: async (req, res, next) => {
    try{
      const serviceDetails = await CompanyDocument.destroy({
        where: {
          id: req.query.documentId
        }
      });
    
      return responseHelper.post(res, 'Document Remove Successfully',{});
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Remove Picture
  **/
  removePicture: async (req, res, next) => {
    try{
      const response = await CompanyImage.destroy({
        where: {
          id: req.query.pictureId
        }
      });
    
      return responseHelper.post(res, 'Picture Remove Successfully',{});
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Remove Picture
  **/
  removeVideo: async (req, res, next) => {
    try{
      const response = await CompanyVideo.destroy({
        where: {
          id: req.query.pictureId
        }
      });
    
      return responseHelper.post(res, 'Video Remove Successfully',{});
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Remove Picture
  **/
  restaurantEarning: async (req, res, next) => {
    try{
      //Get All Orders Earning
      const params = req.body;
      console.log("earning",params);
      if(params.fromDate == "" && params.toDate == "")
      {
        var countDataq = await ORDERS.findOne({
          attributes: [
          [sequelize.fn('sum', sequelize.col('totalOrderPrice')), 'totalSum'],
          [sequelize.fn('AVG', sequelize.col('totalOrderPrice')), 'average']],
          where: {
            companyId: params.restaurantId
          }
        });
        //Get All Completed Orders
        var completedOrder = await ORDERS.findAll({
          where: {
            companyId: params.restaurantId
          }
        });
        // var totalOrders  = completedOrder.length;
        // const data       = {};
        // data.totalOrders = totalOrders;
        // if(countDataq.dataValues.totalSum === null)
        // {
        //   data.totalPayment    = '0';
        //   data.averagePayment  = '0';
        // }else{
        //   data.totalPayment    = countDataq.dataValues.totalSum;
        //   data.averagePayment  = countDataq.dataValues.average;
        // }
      }else{
        var countDataq = await ORDERS.findOne({
          attributes: [
          [sequelize.fn('sum', sequelize.col('totalOrderPrice')), 'totalSum'],
          [sequelize.fn('AVG', sequelize.col('totalOrderPrice')), 'average']],
          where:{ 
            [Op.and]: [
              sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'<=', params.fromDate),
              sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'>=', params.toDate),
              { 
                companyId: params.restaurantId 
              }
            ]
          }
          // where: {
          //   createdAt: {
          //     [Op.gte]:  `${params.fromDate}%`,
          //   },
          //   createdAt: {
          //     [Op.lte]: `${params.fromDate}%`,
          //   },
          //   companyId: params.restaurantId
          // }
        });
        //Get All Completed Orders
        var completedOrder = await ORDERS.findAll({
           where:{ 
            [Op.and]: [
              sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'<=', params.fromDate),
              sequelize.where(sequelize.fn('date', sequelize.col('createdAt')),'>=', params.toDate),
              { 
                companyId: params.restaurantId 
              }
            ]
          }
        });
        
      }
      var totalOrders  = completedOrder.length;
        const data       = {};
        data.totalOrders = totalOrders;
        if(countDataq.dataValues.totalSum === null)
        {
          data.totalPayment    = 0;
          data.averagePayment  = 0;
        }else{
          data.totalPayment    = countDataq.dataValues.totalSum;
          data.averagePayment  = countDataq.dataValues.average;
        }
      return responseHelper.post(res, 'Restaurant data fetch successfully.',data);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },


  /**
  *@Method POST 
  *@role Update Mode Restaurant
  **/
  changeInstaMode: async (req, res, next) => {
    try{
      const data = req.body;
      var status = data.instaMode;
      //Update Holidays
      var userorderData = await COMPANY.update(
        {
          instaMode: status
        },
        { 
          where: {
            id: data.restaurantId
          }
        }
      )

      return responseHelper.post(res, 'Restaurant status change Successfully',data);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method POST 
  *@role Update Mode Restaurant
  **/
  updateAccountDetails: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.accountNumber,data.accountName,data.restaurantId]);
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var userorderData = await COMPANY.update(
        {
          accountNumber: data.accountNumber,
          accountName:data.accountName
        },
        { 
          where: {
            id: data.restaurantId
          }
        }
      )

      return responseHelper.post(res, 'Restaurant status change Successfully',data);
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
      let restaurantId    = req.query.restaurantId;
      const serviceDetails = await COMPANY.findOne({
        attributes: ['id','accountName','accountNumber'],
        where: {
          id: restaurantId
        }
      });
      if(serviceDetails)
        return responseHelper.post(res, 'Fetch Company Details.',serviceDetails);
      else
        return responseHelper.post(res, 'No Record Found', serviceDetails, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

};

async function multipleFileupload(ImageFile4,name){
  await ImageFile4.mv(configDev.UPLOAD_DIRECTORY +"users/"+ name, function (err) {
    if (err){
      var imagename = name;
      return imagename;
    }
    else {
      var imagename = name;
      return imagename;
    }
  });
}