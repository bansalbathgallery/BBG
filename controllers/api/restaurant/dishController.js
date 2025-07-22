
const express = require('express');
const app     = express();
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const moment  = require('moment');
const CART     = db.models.cart
const SERVICES = db.models.services;
//const ServiceItem = db.models.serviceItems;
const userCoupan = db.models.userCoupons;
//Relations
//SERVICES.belongsTo(ServiceItem,{foreignKey: 'serviceId'})
const COUPAN   = db.models.coupan;
const Cuisines = db.models.companyCuisines;
const MENUS    = db.models.menus;
Cuisines.belongsTo(CATEGORY,{foreignKey: 'categoryId'});
SERVICES.belongsTo(MENUS,{foreignKey: 'menuId'});
module.exports = {

  /**
  *@Method POST
  *@role Add Menu Item
  **/
  addMenu: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.restaurantId,data.name])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      let companyId = data.restaurantId;

      const serviceDetails = await MENUS.findOne({
       attributes: ['id'],
        where: {
          name: data.name,
          companyId: data.restaurantId
        }
      });
      if(serviceDetails)
      {
        return res.json({
          code: 302,
          message: 'Menu name already exist',
          body: {}
        })
      }

      const users = await MENUS.create({
        name: data.name,
        companyId: data.restaurantId
      });
      return res.json({
        code: 200,
        message: 'Menu name added successfully',
        body: users
      })
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method POST
  *@role Update Menu
  *
  */
  updateMenu: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.menuId,data.name])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      let menuId = data.menuId;

      await MENUS.update({ 
        name: data.name
      }, 
      {
        where: { id: menuId}
      }); 
      return res.json({
        code: 200,
        message: 'Menu name updated successfully',
        body: data
      })
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Cuisines List
  **/
  cuisineslist: async (req, res, next) => {
    try{
      const data = req.query;
      let responseNull=  commonMethods.checkParameterMissing([data.restaurantId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      const cuisinesDetails = await MENUS.findAll({
       attributes: ['id','companyId','name','status',
          [sequelize.literal('(SELECT count(id) FROM services where companyId = "'+data.restaurantId+'" AND menuId = menus.id AND status != 2)'), 'totalDishes']],
        where: {
          companyId: data.restaurantId
        }
      });
      if(cuisinesDetails)
        return responseHelper.post(res, 'Menu name list fetch Successfully',cuisinesDetails);
      else
        return responseHelper.post(res, 'No Record Found', cuisinesDetails, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method POST 
  *@role Enable/Disable Menu
  **/
  changeMenuStatus: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.menuId,data.status])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
      let menuId  = data.menuId;
      let status  = data.status;

      //Update Dish Status
      await MENUS.update({ 
        status: status
      }, 
      {
        where: { id: menuId}
      }); 

      if(status == '1')
      {
        var msg = "Menu name enable successfully";
      }else{
        var msg = "Menu name disable successfully";
      }
      return responseHelper.post(res, msg,data);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Delete Menu Dish
  **/
  deleteDish: async (req, res, next) => {
    try{
      const data = req.query;
      let responseNull=  commonMethods.checkParameterMissing([data.dishId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
        
      //check Dush
      const dishdetails = await SERVICES.findOne({
        where: {
          id: data.dishId
        }
      })
      if(dishdetails)
      {
        //Update Dish Order
        await SERVICES.update({
            orderBy :sequelize.literal('orderBy - 1')
          },
          {
            where : {
              menuId: dishdetails.dataValues.menuId,
              status: {
                [Op.ne]: '2'
              },
              orderBy: {
                [Op.gt]: dishdetails.dataValues.orderBy
              }
          }
        });

         //Update Dish Delete Status
        var numAffectedRows = await SERVICES.update({
            status: '2',
            orderBy: '0'
          },
          {
            where : {
              id: data.dishId
          }
        });

        return responseHelper.post(res, 'Dish deleted successfully',data);
      }
      
      return responseHelper.post(res, 'No Record Found', data, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET 
  *@role GET Delete Menu Item
  **/
  deleteItem: async (req, res, next) => {
    try{
      const data = req.query;
      let responseNull=  commonMethods.checkParameterMissing([data.menuId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

      //Delete Menu Item
      const numAffected = await MENUS.destroy({
        where: {
          id: data.menuId
        }
      });  

      //Delete Dishes
      var numAffectedRows = await SERVICES.update({
          status: '2',
          orderBy: '0'
        },
        {
          where : {
            menuId: data.menuId
        }
      });

      // const numAffectedRows = await SERVICES.destroy({
      //   where: {
      //     menuId: data.menuId
      //   }
      // });  
      if(numAffected>0)
        return responseHelper.post(res, 'Menu name deleted Successfully',data);
      else
        return responseHelper.post(res, 'No Record Found', data, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET Cuisines Dishes
  *@role GET Cuisines Dishes
  **/
  list: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.restaurantId,data.menuId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
      let companyId = data.restaurantId;
      let menuId = data.menuId;

      const serviceDetails = await SERVICES.findAll({
       attributes: ['id','name','type','description','icon','duration','menuId','status','turnaroundTime','schedule','price','orderBy'],
        where: {
          menuId: data.menuId,
          companyId: data.restaurantId,
          status: {
            [Op.ne] : '2'
          }
        },
        include: [{
          model: MENUS,
          attributes: ['id','name']
        }],
        order: [['orderBy','ASC']]
      });
      if(serviceDetails)
        return responseHelper.post(res, 'Dishes List Fetch Successfully',serviceDetails);
      else
        return responseHelper.post(res, 'No Record Found', userData, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET Cuisines Dishes
  *@role GET Cuisines Dishes
  **/
  getAllIngredients: async (req, res, next) => {
    try{
      const data = req.query;
      let responseNull=  commonMethods.checkParameterMissing([data.restaurantId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
      let companyId = data.restaurantId;
      const serviceDetails = await SERVICES.findAll({
        attributes: ['id','name','type','description','icon','duration','menuId','status','turnaroundTime','schedule','price'],
        where: {
          companyId: data.restaurantId,
          status: {
            [Op.ne] : '2'
          }
        }
      });
      if(serviceDetails)
        return responseHelper.post(res, 'Dishes List Fetch Successfully',serviceDetails);
      else
        return responseHelper.post(res, 'No Record Found', userData, 204);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method GET Cuisines Dishes
  *@role GET Cuisines Dishes
  **/
  changeDishOrder: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.dishId,data.position])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     

      //Prevoius Rest Positiio
      const prerest = await SERVICES.findOne({
       attributes: ['id','menuId','orderBy'],
        where: {
          id: data.dishId,
        }
      });

      var Postion = prerest.dataValues.orderBy;
      var menuId  = prerest.dataValues.menuId;

      await SERVICES.update({
          orderBy: Postion
        },
        {
          where : {
            menuId: menuId,
            orderBy: data.position
        }
      });

      await SERVICES.update({
          orderBy: data.position
        },
        {
          where : {
            id: data.dishId
        }
      });


      return responseHelper.post(res, 'Postion change successfully');
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method POST 
  *@role Enable/Disable Dishes
  **/
  changeStatus: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.dishId,data.status])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
      let dishId  = data.dishId;
      let status  = data.status;

      //Update Dish Status
      await SERVICES.update({ 
        status: status
      }, 
      {
        where: { id: dishId}
      }); 

      if(status == '1')
      {
        var msg = "Dish enable successfully";
      }else{
        var msg = "Dish disable successfully";
      }
      return responseHelper.post(res, msg,data);
     
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /**
  *@Method POST 
  *@role Enable/Disable Dishes
  **/
  changeMultipleIngredients: async (req, res, next) => {
    try{
      const data = req.body;
      let responseNull=  commonMethods.checkParameterMissing([data.dishId,data.status])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
      let dishId  = data.dishId;
      let status  = data.status;
      console.log(dishId);
      //Update Dish Status
      await SERVICES.update({ 
        status: status
      }, 
      {
        where: { id:{
          [Op.in]: dishId
          } 
        }
      }); 

      if(status == '1')
      {
        var msg = "Dish enable successfully";
      }else{
        var msg = "Dish disable successfully";
      }
      return responseHelper.post(res, msg,data);
     
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    } 
  },

  /*
  *@role Add Dish
  *@Method POST
  */
  addDish: async (req, res, next) => {
    try{
      const data    = req.body;
      console.log(data);
      //Get Service Details
      const serviceDetails = await SERVICES.findOne({
       attributes: ['id'],
        where: {
          name: data.name,
          menuId: data.menuId,
          companyId: data.companyId,
          status: {
            [Op.ne] : '2'
          }
        }
      });
      if(!serviceDetails)
      {
        var icon = "";
        if (req.files) {
          ImageFile = req.files.icon;    
          if(ImageFile)
          {
            icon = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");

            ImageFile.mv(config.UPLOAD_DIRECTORY +"services/icons/"+ icon, function (err) {
                //upload file
                if (err)
                return responseHelper.error(res, err.meessage, 400);   
            });

          }
        }

        const totalservices = await SERVICES.findAll({
          attributes: ['id'],
          where: {
            menuId: data.menuId,
            companyId: data.companyId,
            status: {
              [Op.ne] : '2'
            }
          }
        });

        var totalorder = totalservices.length;
        console.log(totalorder,"totalorder")
        const users = await SERVICES.create({
          name: data.name,
          description: data.description,
          menuId: data.menuId,
          type: data.type,
          icon: icon,
          thumbnail: icon,
          duration: data.duration,
          price: data.price,
          turnaroundTime: data.time,
          schedule: data.schedule,
          timeZone: data.timeZone,
          orderBy: totalorder + 1,
          companyId: data.companyId
        });
        return res.json({
          code: 200,
          message: 'Dish added successfully',
          body: users
        })
      }
      else
      {
        return res.json({
          code: 302,
          message: 'Already Add Dish'
        })
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Update Dish
  *@Method POST
  */
  updateDish: async (req, res, next) => {
    try{
      const data    = req.body;
       console.log("update====",data);
      //Get Service Details
      const serviceDetails = await SERVICES.findOne({
       attributes: ['id','icon'],
        where: {
          id: data.dishId
        }
      });
      if(serviceDetails)
      {
        var icon = "";
        if (req.files) {
          ImageFile = req.files.icon;    
          if(ImageFile)
          {
            icon = Date.now() + '_' + ImageFile.name.replace(/\s/g, "");

            ImageFile.mv(config.UPLOAD_DIRECTORY +"services/icons/"+ icon, function (err) {
              //upload file
              if (err)
              return responseHelper.error(res, err.meessage, 400);   
            });

          }else{
            icon = serviceDetails.dataValues.icon;
          }
        }else{
          icon = serviceDetails.dataValues.icon;
        }

        //Update Dish
        const response = await SERVICES.update({ 
          name: data.name,
          type: data.type,
          description: data.description,
          icon: icon,
          thumbnail: icon,
          duration: data.duration,
          turnaroundTime: data.time,
          timeZone: data.timeZone,
          schedule: data.schedule,
          price: data.price,
          menuId: data.menuId
        }, 
        {
          where: { 
            id: data.dishId
          }
        }); 

        const menuDetails = await SERVICES.findOne({
          attributes: ['id','name','type','description','icon','duration','turnaroundTime','schedule','price'],
        where: {
          id: data.dishId
        }
      });
        return res.json({
          code: 200,
          message: 'Dish updated successfully',
          body: menuDetails
        })
      }
      else
      {
        return res.json({
          code: 404,
          message: 'Dish does not exist.'
        })
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },
        
};

