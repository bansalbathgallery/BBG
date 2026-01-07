
const express = require('express');
const app     = express();
const Op = require('sequelize').Op;
COUPAN.belongsTo(CATEGORY);
module.exports = {
  /**
  *@Method GET
  *@role Cuisines List
  */
  list: async(req,res,next) => {
    var compId=req.query.compId
    if(compId==undefined || compId=="") compId=req.companyId
    try{
      const findData = await CATEGORY.findAll({
        attributes: ['id','name','status'],
        where: {
          companyId: compId
        }
      });
      console.log(findData)
      return res.render(superadminfilepath+'cuisines/list.ejs',{data:findData});
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method GET
  *@role Add New Cuisines
  */
  add: async(req,res,next) => {
    try{
      return res.render(superadminfilepath+'cuisines/add.ejs');
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method POST
  *@role Add New Cuisines
  */
  postAdd: async (req, res) => {
    try {
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.name])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var icon = "";
      if (req.files) {
        ImageFile = req.files.icon;    
        if(ImageFile)
        {
          icon = Date.now() + '_' + ImageFile.name;
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"services/icons/"+ icon, function (err) {
              //upload file
              if (err)
              return responseHelper.error(res, err.meessage, 400);   
          });
        }
      }
      const user = await CATEGORY.findOne({
        attributes: ['id'],
        where: {
          name: data.name,
          companyId: req.companyId
        }
      });
      if (!user) {
        const users = await CATEGORY.create({
          name: data.name,
          icon: icon,
          colorCode:'',
          thumbnail: icon,
          orderby: '0',
          level: '1',
          categoryType: '',
          companyId: req.companyId
        });
        if (users) {
          return responseHelper.post(res, appstrings.add_cuisines, null,200);
        }
       else  return responseHelper.error(res, appstrings.oops_something, 400);
      }
        else   return responseHelper.error(res, appstrings.already_exists, 400);

    } catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message,400);
    }
  },

  /*
  *@Method GET
  *@role Get Cuisines Detail
  */
  view: async(req,res,next) => {
    var id = req.params.id;
    try {
      const findData = await CATEGORY.findOne({
        where :{id: id }
      });
      return res.render(superadminfilepath+'cuisines/view.ejs',{data:findData});
    } catch (e) {
      req.flash('errorMessage',e.message)
      return res.redirect(superadminpath+"cuisines");
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
          
      if(numAffectedRows>0)
      {
        req.flash('successMessage',appstrings.delete_success)
        return res.redirect(superadminpath+"coupon");
      }
      else {
        req.flash('errorMessage',appstrings.no_record)
        return res.redirect(superadminpath+"coupon");
      }
    }catch (e) {
      req.flash('errorMessage',appstrings.no_record)
      return res.redirect(superadminpath+"coupon");
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
      const userData = await CATEGORY.findOne({
        where: {
           id: params.id }
      });
      if(userData)
      {
        var status=params.status;
      
        const updatedResponse = await CATEGORY.update({
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

  /**
  *@Method POST
  *@role Update Cuisines Details
  */
  update: async (req, res) => {
    try {
      const data = req.body;
      let responseNull= commonMethods.checkParameterMissing([data.id,data.name])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var icon="";
      var thumbnail="";
      if (req.files) {
        ImageFile = req.files.icon;    
        if(ImageFile)
        {
          icon = Date.now() + '_' + ImageFile.name;
          ImageFile.mv(configDev.UPLOAD_DIRECTORY +"services/icons/"+ icon, function (err) {
              //upload file
              if (err)
              return responseHelper.error(res, err.meessage, 400);   
          });
        }
      }
      const user = await CATEGORY.findOne({
        attributes: ['id'],
        where: {
          id: data.id
        }
      });
      if (user) {
        if(icon=="") icon=user.dataValues.icon

        const users = await CATEGORY.update({
          name: data.name,
          icon: icon,
          colorCode:'',
          thumbnail: icon,
          orderby: '0',
          level: '1',
          categoryType: '',
        },
        {
          where:{
            id: data.id
          }
        });
        if (users) {
          return responseHelper.post(res, appstrings.update_success, null,200);
        }
       else  return responseHelper.error(res, appstrings.oops_something, 400);
      }
        else  return responseHelper.error(res, appstrings.no_record, 400);
    } catch (e) {
     // console.log(e)
      return responseHelper.error(res, e.message,400);
    }
  }

};
