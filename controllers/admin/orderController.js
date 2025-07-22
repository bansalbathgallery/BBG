

const express = require('express');
const app     = express();
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const moment  = require('moment');
const CART     = db.models.cart
const SERVICES = db.models.services;
const userCoupan = db.models.userCoupons;
const ORDERS     = db.models.orders;
const SUBORDERS  = db.models.suborders;
const orderPayment = db.models.payment;
const serviceRating = db.models.serviceRatings;
const orderStats = db.models.orderStatus;
USER=db.models.users;
const keyPublishable = config.PAYKEY;
const keySecret = config.PAYSECRET;
const stripe = require("stripe")(keySecret);
//Relations
CART.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.hasMany(SUBORDERS, {foreignKey: 'orderId'});
ORDERS.hasOne(orderPayment,{foreignKey: 'orderId'});
SUBORDERS.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(USER,{foreignKey: 'userId'});
ORDERS.hasOne(COMPANYRATING, {foreignKey: 'orderId'});
ORDERS.hasMany(serviceRating, {foreignKey: 'orderId'});
serviceRating.belongsTo(SERVICES,{foreignKey: 'serviceId'});
ORDERS.belongsTo(COMPANY,{foreignKey: 'companyId'});
ORDERS.hasOne(ASSIGNMENT,{foreignKey: 'orderId'});
ASSIGNMENT.belongsTo(EMPLOYEE,{foreignKey: 'empId'});
COMPANYRATING.belongsTo(USER,{foreignKey: 'userId'});
COMPANYRATING.belongsTo(COMPANY,{foreignKey: 'companyId'});
const COUPAN   = db.models.coupan;
module.exports = {
  orders: async (req, res, next) => {
  try {
    var params=req.query
    var progressStatus =  ['0','1','2','3','4','5','6','7','8']

    var page =1
    var limit =100
    if(params.page) page=params.page
    if(params.limit) limit=parseInt(params.limit)
    if(params.progressStatus && params.progressStatus!="")  progressStatus=[params.progressStatus]

 
    var offset=(page-1)*limit

   
    const findData = await ORDERS.findAll({
      order: [
        ['createdAt', 'DESC'],  
    ],
    where :{
      progressStatus: { [Op.or]: progressStatus},

    },
    offset: offset, limit: limit ,
    
   
  });
  var empData = await EMPLOYEE.findAll();
//var compData= await commonMethods.getAllCompanies(req.companyId)

var orderS = await orderStats.findAll();
      return res.render(superadminfilepath+'order/list.ejs',{data:findData,empData:empData,orderS});

    

    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }


},
 list: async (req, res, next) => {
try {
  var params=req.body;
  if(params.orderStatus == "")
  {
     var progressStatus =  ['0','1','2','3','4','5','6','7','8']
  }else{
    var progressStatus = [];
    progressStatus.push(params.orderStatus);
  }
 
  var fromDate =  ""
  var toDate =  ""


  var page =1
  var limit =50
  if(params.page) page=params.page
  if(params.limit) limit=parseInt(params.limit)
  var offset=(page-1)*limit


  if(params.progressStatus && params.progressStatus!="")  progressStatus=[params.progressStatus]

  where={
  progressStatus: { [Op.or]: progressStatus}
     }
  

     where1={progressStatus: { [Op.or]: progressStatus}}
  //if(params.fromDate)fromDate= Math.round(new Date(params.fromDate).getTime())
  //if(params.toDate) toDate=Math.round(new Date(params.toDate).getTime())
  

    if(fromDate!="" && toDate!="")
    {
      where= {
        progressStatus: { [Op.or]: progressStatus},
        createdAt: { [Op.gte]: fromDate,[Op.lte]: toDate},
       }

       where1={
        progressStatus: { [Op.or]: progressStatus},
        createdAt: { [Op.gte]: fromDate,[Op.lte]: toDate},
      }

    }

    if(params.search != "")
    {
      var restWhere = {
        status: '1',
        companyName: {
          [Op.like]: `%${params.search}%`
        }
      }
    }else{
      var restWhere = {
        status: '1'
      }
    }


     //  if(params.compId && params.compId!="")
     // { where.companyId= params.compId
     //  where1.companyId= params.compId}

      const findData = await ORDERS.findAndCountAll({
        order: [
          ['orderNo', 'DESC'],  
        ],
      where :where,
      
      include: [
        {model: USER , attributes: ['id','firstName','lastName',"phoneNumber","countryCode","image"]},
        {model: PAYMENT , attributes: ['transactionStatus']},
        {model: COMPANY,
          where:restWhere},
        {model: SUBORDERS , attributes: ['id','serviceId','quantity'],
        include: [{
          model: SERVICES,
          attributes: ['id','name','description','price','icon','thumbnail','type','price','duration'],
          required: false
        }]
        }
      
      ],
      distinct:true,
      //offset: offset, limit: limit ,

    });

    var countDataq = await ORDERS.findAll({
      attributes: ['progressStatus',
        [sequelize.fn('sum', sequelize.col('totalOrderPrice')), 'totalSum'],
        [sequelize.fn('COUNT', sequelize.col('progressStatus')), 'count'],
      ],
      group: ['progressStatus'],
      where :where1
    });



 

    var userDtaa={}
    userDtaa.data=findData
    userDtaa.counts=countDataq
   

    return responseHelper.post(res, appstrings.success, userDtaa);

  } catch (e) {
    console.log(e)
    return responseHelper.error(res, e.message, 400);
  }


},

/*
  *@role Order Details
  *Method GET
  *@params OrderId
  */
  orderDetails: async (req, res, next) => {
    try
    {
       var jobStatus = ['0','1','2','3','4'];
      let orderId    = req.query.orderId;
      const orderList = await ORDERS.findOne({
        attributes: ['id','orderNo','serviceDateTime','acceptedBy','deliveryTime','orderDistance','serviceCharges','delay','scheduleType','foodReadyTime','progressStatus','processleftTime','cookingTime','cookingleftTime','acceptTime','address','latitude','longitude','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
          [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
          [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
          [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount'],
          [sequelize.literal('(SELECT count(id) FROM suborders where orderId = orders.id)'), 'totalCartItems'],
          [sequelize.literal('(SELECT SUM(quantity) FROM suborders where orderId = orders.id)'), 'totalQuantity']],
          where: {
            id: orderId
          },
          include: [
            {
              model: orderPayment,
              attributes: ['transactionId','transactionStatus','paymentMode']
            },
            {
              model: USER,
              attributes: ['id','firstName','lastName','region','countryCode','phoneNumber']
            },
            {
              model: COMPANYRATING
            },
            {
              model: COMPANY,
              attributes: ['id','companyName','address1','phoneNumber','latitude','longitude']
            },
            {
              model: SUBORDERS,
              attributes: ['orderId','serviceId','price','quantity',
              [Sequelize.literal('`suborders->service`.`name`'), 'ServiceName'],
              [Sequelize.literal('`suborders->service`.`price`'), 'Serviceprice'],
              [Sequelize.literal('`suborders->service`.`icon`'), 'icon']],
              include: [
              {
                model: SERVICES,
                attributes: []
              }]
            },
            { 
              model: serviceRating,
              attributes: ['orderId','serviceId','rating','review',
              [Sequelize.literal('`serviceRatings->service`.`name`'), 'ServiceName'],
              [Sequelize.literal('`serviceRatings->service`.`icon`'), 'icon']],
              include: [
              {
                model: SERVICES,
                attributes: []
              }]
            },
            {
            model: ASSIGNMENT, 
            attributes: ['id','jobStatus'], 
            required:false, 
            where:{ 
              jobStatus: { [Op.or]: jobStatus} 
            },
            include: [{
              model: EMPLOYEE
            }]
          }
          ]
        });
      
      if(orderList)
      {
        var orderde = orderList.toJSON();

        var orderS = await orderStats.findAll({
          where: {
            status: '1'
          },
          order: [
              ['orderBy', 'ASC'],  
          ],
        });
        return res.render(superadminfilepath+'order/view.ejs',{data:orderde,orderS});
      } else {
         return res.json({
          code: 404,
          message: 'No Order Found',
          data: {}
        })
      } 
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  getAllReviews: async (req, res, next) => {
    try {

      var params=req.body;
      const findData = await COMPANYRATING.findAll({
        include: [
          {
            model: USER,
            attributes: ['firstName','lastName']
          },
          {
            model: COMPANY,
            attributes: ['id','companyName','images','logo1','firstName','lastName','email','countryCode','phoneNumber','region','latitude','longitude'],
          }
        ],
      });

      return res.render(superadminfilepath+'order/review.ejs',{data:findData});

    } catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message, 400);
    }
  },

  getAllReviewsFilter: async (req, res, next) => {
    try {
      var params=req.body;
      const findData = await COMPANYRATING.findAll({
        include: [
          {
            model: USER,
            attributes: ['firstName','lastName']
          },
          {
            model: COMPANY,
            attributes: ['id','companyName','images','logo1','firstName','lastName','email','countryCode','phoneNumber','region','latitude','longitude'],
          }
        ],
      });

      return responseHelper.post(res, appstrings.success, findData);

    } catch (e) {
      console.log(e)
      return responseHelper.error(res, e.message, 400);
    }
  },

};
// app.post('/search', async (req, res, next) => {
  
//   try {
//     var params=req.body
//     var page =1
//     var limit =50
//     var search=params.search
//     if(params.page) page=params.page
//     if(params.limit) limit=parseInt(params.limit)
//     var offset=(page-1)*limit
  
  
//     where={
//       [Op.or]: [
//         { 'orderNo': { [Op.like]: '%' + search + '%' }},
//         { 'serviceDateTime': { [Op.like]: '%' + new Date(search) + '%' }},
//         { 'orderPrice': { [Op.like]: '%' + search + '%' }},
//         { 'totalOrderPrice': { [Op.like]: '%' + search + '%' }},

        

        
//       ]
//     }


//     whereAddress= {[Op.or]: [
            
//       { 'addressName': { [Op.like]: '%' + search + '%' }},
//       { 'houseNo': { [Op.like]: '%' + search + '%' }},
//       { 'town': { [Op.like]: '%' + search + '%' }},
//       { 'city': { [Op.like]: '%' + search + '%' }},
//       { 'landmark': { [Op.like]: '%' + search + '%' }}]}


//       whereUser= 
//         {

//           phoneNumber :{[Op.not]:""},
//           [Op.or]: [
//             { 'phoneNumber': { [Op.like]: '%' + search + '%' }},
//             { 'firstName': { [Op.like]: '%' + search + '%' }},
//             { 'lastName': { [Op.like]: '%' + search + '%' }}

        
//         ]}

        
  
//        // { '$Comment.body$': { like: '%' + query + '%' }
      
    
// var findData= await findSearchData(where,{},{},offset,limit)


// if(findData.rows.length==0)
// {
//  findData= await findSearchData({},whereAddress,{},offset,limit)
// }



// if(findData.rows.length==0)
// {

//  findData= await findSearchData({},{},whereUser,offset,limit)
// }






  
//       var countDataq = await ORDERS.findAll({
//         attributes: ['progressStatus',
//           [sequelize.fn('sum', sequelize.col('totalOrderPrice')), 'totalSum'],
//           [sequelize.fn('COUNT', sequelize.col('progressStatus')), 'count'],
         
  
//         ],
//         group: ['progressStatus'],
//       where :where
    
//     });
  
  
  
   
  
//       var userDtaa={}
//       userDtaa.data=findData
//       userDtaa.counts=countDataq
     

//       return responseHelper.post(res, appstrings.success, userDtaa);
  
//     } catch (e) {
//       console.log(e)
//       return responseHelper.error(res, e.message, 400);
//     }
  
  
//   });
  


  

// app.post('/status',superAuth,async(req,res,next) => { 
    
//     var params=req.body
//     try{
//         let responseNull=  commonMethods.checkParameterMissing([params.id,params.status])
//         if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
       
      

//        var userData = await ORDERS.findOne({
//          where: {
//            id: params.id },
//            include: [{
//              model: ASSIGNMENT , attributes: ['id'],
//             include: [{model: EMPLOYEE,
//             attributes: ['id','firstName','lastName','countryCode','phoneNumber','image'],
//             required: false
//           }]
//         }]
//        });
       
       
//        if(userData)
//        {
       

     
//     const updatedResponse = await ORDERS.update({
//          progressStatus: params.status,

//        },
//        {
//          where : {
//          id: userData.dataValues.id
//        }
//        });
       
//        if(updatedResponse)
//              {
//               var status=commonMethods.getOrderStatus(params.status)
              
//                 userData=JSON.parse(JSON.stringify(userData))
//                         var findData=await USER.findOne({where:{id:userData.userId}});
//                         //console.log(findData)

                  
//                         var notifPushUserData={title:"Your order No.- "+userData.orderNo +' is '+status+ ' on ' +commonMethods.formatAMPM(new Date),
//                         description:"Your order No.- "+userData.orderNo +' is ' + status+' on ' +commonMethods.formatAMPM(new Date),
//                         token:findData.dataValues.deviceToken,  
//                             platform:findData.dataValues.platform,
//                             userId :userData.userId, role :3,
//                             orderId:userData.id,
//                             notificationType:"ORDER_STATUS",status:params.status,
//                   }

                  
          
//           if(userData.assignedEmployees && userData.assignedEmployees.length>0 && (params.status==2|| params.status==4))
//           {
//             for(var p=0;p<userData.assignedEmployees.length;p++)
//             {

//                   var findData=await EMPLOYEE.findOne({where:{id:userData.assignedEmployees[p].employee.id}});
                  
                  
//                   var notifPushUserDataEmp={title:"Your order No.- "+userData.orderNo +' is '+status+ ' on ' +commonMethods.formatAMPM(new Date),
//                   description:"Your order No.- "+userData.orderNo +' is ' + status+' on ' +commonMethods.formatAMPM(new Date),
//                   token:findData.dataValues.deviceToken,  
//                       platform:findData.dataValues.platform,
//                       userId :findData.id, role :4,
//                       orderId:userData.id,
//                       notificationType:"ORDER_STATUS",status:status,
//             }
//             commonNotification.insertNotification(notifPushUserDataEmp)   
//             commonNotification.sendEmpNotification(notifPushUserDataEmp)

//           }
//         }

//             commonNotification.insertNotification(notifPushUserData)   
//              commonNotification.sendNotification(notifPushUserData)
            
               



//            return responseHelper.post(res, appstrings.success,null);
//              }
//              else{
//                return responseHelper.post(res, appstrings.oops_something,400);
    
//              }
       
//        }

//        else{
//         return responseHelper.post(res, appstrings.no_record,204);

//       }

//          }
//            catch (e) {
//              return responseHelper.error(res, e.message, 400);
//            }
    
    
    
// });


// app.post('/updateAssignment',superAuth,async(req,res,next) => { 
    
//   var params=req.body
//   var employees=[]
//   try{
//       let responseNull=  commonMethods.checkParameterMissing([params.orderId])
//       if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
//     if(params.employees) employees=params.employees.toString().split(",")

//     var ordData = await ORDERS.findOne({
//       where: {
//         id: params.orderId }
//     });
    

// if(ordData && (ordData.dataValues.progressStatus==0))   return responseHelper.post(res, appstrings.order_not_confirmed,null,400);


//      await ASSIGNMENT.destroy({
//        where: {
//          orderId: params.orderId,
//          jobStatus :1
//         }
//      });
     
     
  
//    for(var k=0;k<employees.length;k++)
//    {
//    await ASSIGNMENT.create({
//        empId: employees[k],
//        orderId :params.orderId

//   });

       
//   var findData=await EMPLOYEE.findOne({where:{id:employees[k]}});

//  var notifPushUserData={title:appstrings.new_order_assigned+"  "+commonMethods.formatAMPM(new Date),
//   description:appstrings.new_order_assigned+'  ' +commonMethods.formatAMPM(new Date) +" Order No- "+ordData.orderNo,
//   token:findData.dataValues.deviceToken,  
//       platform:findData.dataValues.platform,
//       userId :findData.id, role :4,
//       orderId:ordData.id,
//       notificationType:"ORDER_STATUS",status:0,
// }

// commonNotification.insertNotification(notifPushUserData)   
// commonNotification.sendEmpNotification(notifPushUserData)
// }
  
//          return responseHelper.post(res, appstrings.success,null);
//            }
          
//          catch (e) {
//            return responseHelper.error(res, e.message, 400);
//          }
  
  
  
// });


// app.post('/adduser',superAuth,async (req, res) => {
//   try {
//     const data = req.body;


//     let responseNull= commonMethods.checkParameterMissing([data.phoneNumber,data.countryCode,data.firstName,data.email])
//     if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);


//     const user = await USER.findOne({
//       attributes: ['phoneNumber'],
//       where: {
//         phoneNumber: data.phoneNumber,
//         countryCode: data.countryCode,
//         companyId: req.companyId

//       }
//     });



//     if (!user) {
      
//       const users = await USER.create({
//         firstName: data.firstName,
//         email: data.email,
//         address: data.address,
//         phoneNumber: data.phoneNumber,
//         countryCode: data.countryCode,
//         platform: 'web',
//         companyId: req.companyId
//        });


//       if (users) {

//         responseHelper.post(res, appstrings.add_success, null,200);
       
//       }
//      else  responseHelper.error(res, appstrings.oops_something, 400);


//     }
//       else  responseHelper.error(res, appstrings.already_exists, 400);

    

//   } catch (e) {
//     return responseHelper.error(res, 'Error While Creating User', e.message);
//   }

// })


// app.post('/update',superAuth,async (req, res) => {
//   try {
//     const data = req.body;


//     let responseNull= commonMethods.checkParameterMissing([data.userId,data.phoneNumber,data.countryCode,data.firstName,data.email])
//     if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);


//     const user = await USER.findOne({
//       attributes: ['phoneNumber'],
//       where: {
//         id:data.userId

//       }
//     });



//     if (user) {
      
//       const users = await USER.update({
//         firstName: data.firstName,
//         email: data.email,
//         address: data.address,
//         phoneNumber: data.phoneNumber,
//         countryCode: data.countryCode,
//        },

//       { where:
//        {
// id: data.userId
//        }
//       }
       
//        );


//       if (users) {

//         responseHelper.post(res, appstrings.update_success, null,200);
       
//       }
//      else  responseHelper.error(res, appstrings.oops_something, 400);


//     }
//       else  responseHelper.post(res, appstrings.no_record, 204);

    

//   } catch (e) {
//     return responseHelper.error(res, 'Error While Creating User', e.message);
//   }
// });


// app.get('/view/:id',superAuth,async(req,res,next) => { 
  
//   var id=req.params.id
//   try {

//   let responseNull=  common.checkParameterMissing([id])
//   if(responseNull) 
//   { req.flash('errorMessage',appstrings.required_field)
//   return res.redirect(superadminpath+"orders");
// }

//       const findData = await ORDERS.findOne({
//       where :{ id: id },
//       include: [
//         {model: db.models.address , attributes: ['id','addressName','addressType','houseNo','latitude','longitude','town','landmark','city'] } ,
//         {model: USERS , attributes: ['firstName','lastName','countryCode','phoneNumber','image'] } ,
//         {model: ASSIGNMENT , attributes: ['id'],
//         include: [{
//           model: EMPLOYEE,
//           attributes: ['id','firstName','lastName','countryCode','phoneNumber','image'],
//           required: false
//         }]
      
//       } ,
//         {model: SUBORDERS , attributes: ['id','serviceId','quantity'],
//         include: [{
//           model: SERVICES,
//           attributes: ['id','name','description','price','icon','thumbnail','type','price','duration'],
//           required: false
//         }]},
        
//       ]
      
            
//       });



//       var empData = await EMPLOYEE.findAll({
//         where :{companyId:findData.dataValues.companyId}
    
//     });

   



//       return res.render('super/orders/viewOrder.ejs',{data:findData,empData:empData});



//     } catch (e) {
//       req.flash('errorMessage',e.message)
//       return res.redirect(superadminpath+"orders");
//     }


 
// });


// app.get('/add',superAuth, async (req, res, next) => {
    
//   try{
//     return res.render('super/orders/addOrder.ejs');

//     } catch (e) {
//       return responseHelper.error(res, e.message, 400);
//     }


// });




// app.get('/delete/:id',superAuth,async(req,res,next) => { 
   

//   let responseNull=  common.checkParameterMissing([req.params.id])
//   if(responseNull) 
//   { req.flash('errorMessage',appstrings.required_field)
//   return res.redirect(superadminpath+"orders");
// }

//   try{
//         //console.log(pool.format('DELETE FROM `reminders` WHERE `reminder_id` = ?', [req.params.id]));
//         const numAffectedRows = await ORDERS.destroy({
//           where: {
//             id: req.params.id
//           }
//           })  
            
//           if(numAffectedRows>0)
//           {
//            req.flash('successMessage',appstrings.delete_success)
//           return res.redirect(superadminpath+"orders");

//           }

//           else {
//             req.flash('errorMessage',appstrings.no_record)
//             return res.redirect(superadminpath+"orders");
//           }

//         }catch (e) {
//           //return responseHelper.error(res, e.message, 400);
//           req.flash('errorMessage',appstrings.no_record)
//           return res.redirect(superadminpath+"orders");
//         }
// });





// async function findSearchData(where,whereAddress,whereUser,offset,limit)
//   {


//     const findData = await ORDERS.findAndCountAll({
//       order: [
//         ['createdAt', 'DESC'],  
//     ],
//     where :where,

//     include: [
//       {model: ADDRESS  ,
//         attributes: ['id','addressName','addressType','houseNo','latitude','longitude','town','landmark','city'],
//         where:whereAddress
//       } ,
//       {model: USER , 
//         attributes: ['id','firstName','lastName',"phoneNumber","countryCode","image"],
//         where:whereUser},
//       {model: PAYMENT , attributes: ['transactionStatus']},
//       {model: SUBORDERS , attributes: ['id','serviceId','quantity'],
//       include: [{
//         model: SERVICES,
//         attributes: ['id','name','description','price','icon','thumbnail','type','price','duration'],
//         required: false
//       }]
//       }
    
//     ],

//     distinct:true,
//     offset: offset, limit: limit ,
    


//   });

//   return findData
//   }
// module.exports = app;

