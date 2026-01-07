
const express = require('express');
const app     = express();
const Op = require('sequelize').Op;
module.exports = {
  /**
  *@Method GET
  *@role Coupon List
  */
  list: async(req,res,next) => {
    var compId=req.query.compId
    if(compId==undefined || compId=="") compId=req.companyId
    try{
      const findData = await COUPAN.findAll({
        where: {
          companyId: compId,
        }
      });
      return res.render(superadminfilepath+'coupans/coupanListing.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method GET
  *@role Add New Coupon
  */
  add: async(req,res,next) => {
    try{
      var cdata= await commonMethods.getAllParentCategories(req.companyId)
      var types=await commonMethods.getUserTypes(req.companyId) 
      return res.render(superadminfilepath+'coupans/addCoupan.ejs',{catData:cdata,types:types});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  postAdd: async (req, res) => {
    try {
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.minimumAmount,data.name,data.code,data.discount,data.validupto])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var icon = "";
      var thumbnail = "";
      if (req.files) {
        ImageFile = req.files.icon;    
        if(ImageFile)
        {
          icon = Date.now() + '_' + ImageFile.name;

          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"coupans/icons/"+ icon, function (err) {
              //upload file
              if (err)
              return responseHelper.error(res, err.meessage, 400);   
          });
        }
        // ImageFile1 = req.files.thumbnail;    
        // if(ImageFile1)
        // {
        //   thumbnail = Date.now() + '_' + ImageFile1.name;
        //   ImageFile1.mv(config.UPLOAD_DIRECTORY +"coupans/thumbnails/"+ thumbnail, function (err) {
        //       //upload file
        //       if (err)
        //       return responseHelper.error(res, err.message, 400);   
        //   });
        // }
      }
      const user = await COUPAN.findOne({
        attributes: ['id'],
        where: {
          code: data.code,
        }
      });
      if (!user) {
        const users = await COUPAN.create({
          name: data.name,
          type: data.type,
          usageLimit: data.usageLimit,
          code: data.code,
          discount: data.discount,
          icon: icon,
          validupto:data.validupto,
          thumbnail: icon,
          description:data.description,
          companyId: req.companyId,
          minimumAmount:data.minimumAmount
        });
        if (users) {
          responseHelper.post(res, appstrings.add_coupan, null,200);
        }
       else  responseHelper.error(res, appstrings.oops_something, 400);
      }
        else  responseHelper.error(res, appstrings.already_exists, 400);

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

  /*
  *@Method GET
  *@role Delete Coupon Detail
  */
  delete: async(req,res,next) => { 
    let responseNull=  common.checkParameterMissing([req.params.id])
    if(responseNull) 
    { 
      req.flash('errorMessage',appstrings.required_field)
      return res.redirect(superadminpath+"coupon");
    }

    try{
      const numAffectedRows = await COUPAN.destroy({
        where: {
          id: req.params.id
        }
      })  
          
     
      return responseHelper.post(res, appstrings.success);
   
    }catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method POST
  *@role Change Coupon Status Active/Block
  */
  status: async(req,res,next) => {
    var params=req.body
    try{
      let responseNull=  commonMethods.checkParameterMissing([params.id,params.status])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      const userData = await COUPAN.findOne({
        where: {
          id: params.id 
        }
      });
       
      if(userData)
      {
        var status=0
        if(params.status=="0")  status=1
        const updatedResponse = await COUPAN.update({
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
          return responseHelper.post(res, 'Something went Wrong',null,400);
        }
      }
      else{
        return responseHelper.post(res, appstrings.no_record,null,204);
      }
    }
      catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method POST
  *@role Update Coupon Details
  */
  update: async (req, res) => {
    try {
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.minimumAmount,data.validupto, data.coupanId,data.name,data.code,data.discount])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var icon="";
      var thumbnail="";
      if (req.files) {
        ImageFile = req.files.icon;    
        if(ImageFile)
        {
          icon = Date.now() + '_' + ImageFile.name;
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"coupans/icons/"+ icon, function (err) {
              //upload file
              if (err)
              return responseHelper.error(res, err.meessage, 400);   
          });
        }
        // ImageFile1 = req.files.thumbnail;    
        // if(ImageFile1)
        // {
        //   thumbnail = Date.now() + '_' + ImageFile1.name;
        //   ImageFile1.mv(config.UPLOAD_DIRECTORY +"coupans/thumbnails/"+ thumbnail, function (err) {
        //     //upload file
        //     if (err)
        //     return responseHelper.error(res, err.message, 400);   
        //   });
        // }
      }
      const user = await COUPAN.findOne({
        attributes: ['id'],

        where: {
          id: data.coupanId

        }
      });
      if (user) {
        if(icon=="") icon=user.dataValues.icon
        if(thumbnail=="") thumbnail=user.dataValues.thumbnail

        const users = await COUPAN.update({
          name: data.name,
          //type: data.type,
          code: data.code,
          discount: data.discount,
          icon: icon,
          usageLimit: data.usageLimit,
          thumbnail: icon,
          description:data.description,
          validupto:data.validupto,
          minimumAmount:data.minimumAmount,
         // categoryId:data.categoryId
        },
        {
          where:{
            id: data.coupanId
          }
        });
        if (users) {
          responseHelper.post(res, appstrings.update_success, null,200);
         
        }
       else  responseHelper.error(res, appstrings.oops_something, 400);

      }
        else  responseHelper.error(res, appstrings.no_record, 400);

    } catch (e) {
     // console.log(e)
      return responseHelper.error(res, e.message,400);
    }
  }

};
