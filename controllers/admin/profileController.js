
const express = require('express');
const app     = express();
const bcrypt  = require('bcryptjs');
const v       = require('node-input-validator');
const jwt     = require('jsonwebtoken');
const hashPassword = require('../../helpers/hashPassword');
const COMPANY= db.models.companies

module.exports = {
  /**
  *@role Get Profile Page
  *@Method POST
  *@author Saira Ansari
  */
  getProfile: async(req,res,next) => {
    try {
      const findData = await COMPANY.findOne({
        where :{id :req.companyId }
      });
      return res.render(superadminfilepath+'profile.ejs',{data:findData});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath);
    }
  },

  /**
  *@role Update Profile Page
  *@Method POST
  *@author Saira Ansari
  */
  update: async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      var logo1 = "";
      var logo2 = "";
      var logo3 = "";
      //Uploading Comapny Images
      const user = await COMPANY.findOne({
        where :{id :req.companyId }
      });
      if (user) {
          if (req.files) {

            ImageFile = req.files.icon;    
            if(ImageFile)
            {
              logo1 = Date.now() + '_' + ImageFile.name;

              ImageFile.mv(configDev.UPLOAD_DIRECTORY +"users/"+ logo1, function (err) {
                  //upload file
                  if (err)
                  return responseHelper.error(res, err.meessage, 400);   
                });
              }
            }
        //update Record
        if(logo1 == "")
        {
           var users = await COMPANY.update({
            companyName: data.companyName,
            email: data.email,
            address1: data.address1,
            latitude: data.latitude,
            longitude: data.longitude,

          },
          {
            where :{id :data.companyId }
          }
          );
        }else{
             var users = await COMPANY.update({
            companyName: data.companyName,
            email: data.email,
            address1: data.address1,
            latitude: data.latitude,
            longitude: data.longitude,
            logo1: logo1,
          },
          {
            where :{id :data.companyId }
          }
        );
        }
        const userData = await COMPANY.findOne({
        where: {
          email: data.email,
          role: 1
        }
      }) 
        req.session.userData = userData;
        if (users) {
          responseHelper.post(res, appstrings.update_success, null,200);
        }
       else  responseHelper.error(res, appstrings.oops_something, 400);
      }
        else  responseHelper.post(res, appstrings.no_record, 204);
    } catch (e) {
      return responseHelper.error(res, appstrings.oops_something, e.message);
    }
  }

};

//Edit User Profile
