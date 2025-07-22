const express = require('express');
const app     = express();
const Sequelize = require('sequelize');
const Op      = require('sequelize').Op;
const moment  = require('moment');
const ORDERS     = db.models.orders;
const SUBORDERS  = db.models.suborders;
const orderPayment = db.models.payment;
const serviceRating = db.models.serviceRatings;
const EARNING = db.models.earnings;
//Relations
SUBORDERS.belongsTo(SERVICES,{foreignKey: 'serviceId'})
//ORDERS.belongsTo(db.models.address,{foreignKey: 'addressId'})
ASSIGNMENT.belongsTo(ORDERS,{foreignKey: 'orderId'})
ORDERS.hasMany(SUBORDERS,{foreignKey: 'orderId'})
//SUBORDERS.belongsTo(COMPANY,{foreignKey: 'companyId'})
SUBORDERS.belongsTo(USERS,{foreignKey: 'userId'})
ORDERS.hasOne(EARNING,{foreignKey: 'orderId'})
module.exports = {

  /**
  *@role Get Order List
  *@Method Post
  */
  list: async (req, res) => {
    var params=req.body;
    //var jobStatus = ['0','1','2','3'];
      var where={
        empId:req.id
      }
      var orderby = Sequelize.literal(`orders.createdAt DESC`);
      var orderWhre = {
        scheduleType: {
          [Op.or]: ['0','1']
        }
      }
    if(params.requestStatus == '0')
    {
      //Get Assigned List
      var jobStatus = '0';
      if(params.startDate != "" && params.endDate != "" && params.startDate && params.endDate)
      {
        where.assignedDate = {
          [Op.between]: [params.startDate,params.endDate]
        }
      }

      var orderWhre = {
        scheduleType: {
          [Op.in]: ['1']
        }
      }

    }else if(params.requestStatus == '1'){
      //Get Accepted Order List
      var jobStatus = '1';
      if(params.startDate != "" && params.endDate != "" && params.startDate && params.endDate)
      {
        where.acceptDate = {
          [Op.between]: [params.startDate,params.endDate]
        }
      }
       
      var orderby = Sequelize.literal(`scheduleType ASC`);
    }else if(params.requestStatus == '2'){
      //Get Rejected Order List
      var jobStatus = '2';
      if(params.startDate != "" && params.endDate != "" && params.startDate && params.endDate)
      {
        where.rejectDate = {
          [Op.between]: [params.startDate,params.endDate]
        }
      }

      
    }else{
      //Get Completed Order List
      var jobStatus = '4';
      if(params.startDate != "" && params.endDate != "" && params.startDate && params.endDate)
      {
        where.assignedDate = {
          [Op.between]: [params.startDate,params.endDate]
        }
      }

    }
    where.jobStatus = jobStatus;


    

    //Filter With OrderID
    if(params.orderId != "" && params.orderId)
    {
     // where.orderId = params.orderId;
      var orderNo = params.orderId;
        var ret = orderNo.replace('ORDER00','');
        console.log(ret);
        if(ret != "")
        {
          orderWhre.orderNo = {
            [Op.like]: `%${ret}%`
          };
        }else{
          orderWhre.orderNo = {
            [Op.like]: `%${params.orderId}%`
          };
        }
    }
    var page =1;
    var limit =20;
   // if(params.page) page=params.page
    //if(params.limit) limit=parseInt(params.limit)
    //if(params.jobStatus && params.jobStatus!="")  jobStatus=params.jobStatus.split(",")
    //var offset=(page-1)*limit;
    // var distances = 100;
    // var ratinghaving = Sequelize.literal(`distance <= ${distances}`);
    try {
      var user = await ORDERS.findAll({
        attributes: ['id','orderNo','serviceDateTime','deliveryTime','orderDistance','serviceCharges','delay','scheduleType','foodReadyTime','progressStatus','processleftTime','cookingTime','cookingleftTime','acceptTime','address','latitude','longitude','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
        [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
        [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
        [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount']],
        order: orderby,
        where: orderWhre,
      //offset: offset, limit: limit,
      include: [
        {
          model: ASSIGNMENT,  
          attributes: ['id','jobStatus','assignedDate','acceptDate','rejectDate'], 
          required:true, 
          where:where
        },
        {
          model: USERS, 
          attributes: ['id','firstName','lastName','image','countryCode','phoneNumber'] 
        },
        {
          model: COMPANY,
          attributes: ['id','companyName','address1','latitude','longitude'] 
        },
        {
          model: SUBORDERS,
          attributes: ['orderId','serviceId','price','quantity'],
          include: [{
            model: SERVICES,
            attributes: ['name','icon','price'],
            required: false
          }],
          required:true,
        }],
      });
      user=JSON.parse(JSON.stringify(user))

      // var currencySend=""
      // var currency =await commonMethods.getCurrency(req.companyId) 
      // if(currency && currency.dataValues && currency.dataValues.currency) currencySend=currency.dataValues.currency
      // else currencySend=CURRENCY    
      // for(var t=0;t<user.length;t++)
      // {
      //  // user[t].currency=currencySend
      //   var orderDate = new Date(user[t].createdAt);
      //   var today     = new Date();
      //   var diffMins  = await diff_mins(today,orderDate); // milliseconds between now & Christmas

      //   if( diffMins<30 && user[t].progressStatus<5)  user[t].cancellable=true 
      //   else  user[t].cancellable=false
      // }

      return responseHelper.post(res,appstrings.detail,user);
    } catch (e) {
    return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Assigned Order List
  *@Method Post
  */
  assignedOrderList: async (req, res) => {
    var params=req.body;
    try {
      var user = await ORDERS.findAll({
       attributes: ['id','orderNo','serviceDateTime','serviceCharges','delay','scheduleType','foodReadyTime','progressStatus','processleftTime','cookingTime','cookingleftTime','acceptTime','address','latitude','longitude','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
        [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
        [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
        [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount']],
        order: [
          ['createdAt', 'DESC']
        ],
      include: [
        {
          model: ASSIGNMENT, 
          attributes: ['id','jobStatus'], 
          required:true, 
          where:{
            empId:req.id, 
            jobStatus: '1'
          }
        },
        {
          model: USERS, 
          attributes: ['id','firstName','lastName','image','countryCode','phoneNumber'] 
        },
        {
          model: COMPANY,
          attributes: ['id','companyName','address1','latitude','longitude'] 
        },
        {
          model: SUBORDERS,
          attributes: ['orderId','serviceId','price','quantity'],
          include: [{
            model: SERVICES,
            attributes: ['name','icon','price'],
            required: false
          }],
          required:true,
        }],
      });
      user=JSON.parse(JSON.stringify(user))
      return responseHelper.post(res,appstrings.detail,user);
    } catch (e) {
    return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Accept Job By Rider
  *@Method POST
  */
  acceptJob: async (req, res) => {
    var params=req.body

    try{
      let responseNull=  commonMethods.checkParameterMissing([params.id,params.orderId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

      var assignData = await ASSIGNMENT.findOne({
        where: {
          orderId: params.orderId,
          jobStatus: 1,
        }
      });

      if(assignData && assignData.dataValues)
      {
        await ASSIGNMENT.destroy({
          where : {
            orderId:params.orderId,
            jobStatus:0
          }
        });

        return responseHelper.post(res, appstrings.jobs_action_performed,null,400);
      }
      else{
        //Check Order Schudle Type
        const orderList = await ORDERS.findOne({
          where: {
            id: params.orderId
          }
        });
        //Get Restaurant Details
        var compnaydetails = await COMPANY.findOne({
          where: {
            id: orderList.dataValues.companyId
          }
        });
        //Get Rider Details
        var employeedetails = await EMPLOYEE.findOne({
          where: {
            id: req.id
          }
        })
        if(compnaydetails.dataValues.deviceToken != "")
        {
            var ridername = employeedetails.dataValues.firstName +' '+employeedetails.dataValues.lastName;
            //Send Notification to Customer For Processing Order
            var messageTitle = ridername+" has been assigned to the ORDER00"+orderList.dataValues.orderNo;
            var notifPushUserData={
              title:"Order Assigned",
              description: messageTitle,
              token: compnaydetails.dataValues.deviceToken,
              platform: compnaydetails.dataValues.deviceType,
              userId : orderList.dataValues.companyId,
              role: '2',
              orderId: params.orderId,
              orderType: orderList.dataValues.orderType,
              orderNo: orderList.dataValues.orderNo,
              riderId: employeedetails.dataValues.id,
              phoneNumber: employeedetails.dataValues.phoneNumber,
              notificationType:"Order Assignment",
              status: 3,
              readStatus: 0
            }
            commonNotification.insertNotification(notifPushUserData);
            commonNotification.sendNotification(notifPushUserData);

          }


        if(orderList.dataValues.scheduleType == '0')
        {
          await ASSIGNMENT.create({
            empId:req.id,
            orderId:params.orderId,
            acceptDate: moment(new Date()).format("YYYY-MM-DD"),
            jobStatus:'1'
          });
          return responseHelper.post(res, appstrings.job_accepted,null);
        }

        const updatedResponse = await ASSIGNMENT.update({
          jobStatus: 1,
          acceptDate: moment(new Date()).format("YYYY-MM-DD")
        },
          {
          where : {
            orderId:params.orderId,
            empId:req.id
          }
        });
        if(updatedResponse)
        {
          await ASSIGNMENT.destroy({
            where : {
              orderId:params.orderId,
              jobStatus:0
            }
          });
          return responseHelper.post(res, appstrings.job_accepted,null);
        }
        else{
          return responseHelper.post(res, appstrings.oops_something,null,400);
        }


      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Reject Job By Rider
  *@Method POST
  */
  rejectJob: async (req, res) => {
    var params=req.body;
    try{
      let responseNull=  commonMethods.checkParameterMissing([params.id,params.orderId])
      if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      var userData = await ORDERS.findOne({
        where: {
          id: params.orderId 
        }
      });
      if(userData)
      {
        const updatedResponse = await ASSIGNMENT.destroy({
          where : {
            orderId: params.orderId,
            empId:params.id
          }
        });
        console.log(updatedResponse)
        // if(updatedResponse)
        //       {

        //             var notifPushUserData={title:"Assignment for  order No.- "+userData.orderNo +' is Rejected by '+ req.userData.firstName+' on ' +commonMethods.formatAMPM(new Date),
        //                  description:"Assignment for  order No.- "+userData.orderNo +' is Rejected by '+ req.userData.firstName+' on  ' +commonMethods.formatAMPM(new Date),
        //                      userId :req.companyId, role :2
        //            }

        //      commonNotification.insertNotification(notifPushUserData)   

        return responseHelper.post(res, appstrings.job_rejected,null);
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
  *@role Get Earnings
  *@Method Post
  */
  getEarning: async (req, res) => {
    var params=req.body;
    try {
      var where = {
          empId:req.id, 
          jobStatus: '4'
        }
         var orderwhere = {
           progressStatus: '5'
         }
      if(params.startDate && params.endDate && params.startDate != "" && params.endDate != "")
      {
        var orderwhere = {
           progressStatus: '5',
          [Op.and]: [
            Sequelize.where(Sequelize.fn('date', Sequelize.col('serviceDateTime')),'>=', params.startDate),
            Sequelize.where(Sequelize.fn('date', Sequelize.col('serviceDateTime')),'<=', params.endDate)
          ]
        }
      }

       
      if(params.month && params.month != "")
      {
        var orderwhere = {
          progressStatus: '5',
          [Op.and]: [
            Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('serviceDateTime')),params.month)
          ]
        }
      }
      var user = await ORDERS.findAll({
       attributes: ['id','orderNo','serviceDateTime','serviceCharges','delay','scheduleType','foodReadyTime','progressStatus','processleftTime','cookingTime','cookingleftTime','acceptTime','address','latitude','longitude','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
        [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
        [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
        [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount']],
        where: orderwhere,
      include: [
        {
          model: ASSIGNMENT, 
          attributes: ['id','jobStatus'], 
          required:true, 
          where:where
        },
        {
          model: USERS, 
          attributes: ['id','firstName','lastName','image','countryCode','phoneNumber'] 
        },
        {
          model: COMPANY,
          attributes: ['id','companyName','address1','latitude','longitude'] 
        },
        {
          model: SUBORDERS,
          attributes: ['orderId','serviceId','price','quantity'],
          include: [{
            model: SERVICES,
            attributes: ['name','icon','price'],
            required: false
          }],
          required:true,
        }],
      });
     
     // console.log(user.rows)
       var column = [];
       for(var i=0; i<user.length; i++){

          console.log("asdfsfsfsfs",user[i].id);
          column.push(user[i].id);
        
       }
       console.log(column)

       var earn = await EARNING.findOne({
        attributes: [[Sequelize.fn('sum', Sequelize.col('riderFees')), 'totalEarning' ],
        [Sequelize.fn('sum', Sequelize.col('adminFees')), 'fees' ]] ,
        where: {
          orderId:{
            [Op.in]: column
          }
        }
      });
      user=JSON.parse(JSON.stringify(user))
      var array = {};
      array.totalOrders = user.length;
      array.order = user;
      array.earn = earn;
      return responseHelper.post(res,appstrings.detail,array);
    } catch (e) {
    return responseHelper.error(res, e.message, 400);
    }
  },


  /**
  *@role Change Email Address
  *@Method POSt
  */
  homeAPI:async(req,res,next) => { 

    try{
      var where={
        empId:req.id
      }

      var orderWhre = {
        progressStatus: {
          [Op.or]: ['8','9']
        }
      }

     var user = await ORDERS.findOne({
        attributes: ['id','orderNo','serviceDateTime','deliveryTime','orderDistance','serviceCharges','delay','scheduleType','foodReadyTime','progressStatus','processleftTime','cookingTime','cookingleftTime','acceptTime','address','latitude','longitude','processTime','orderType',
        'couponDiscount','promoCode','offerPrice',
        [Sequelize.literal('orders.offerPrice'), 'discountPrice'],
        [Sequelize.literal('orders.orderPrice'), 'totalAmount'],
        [Sequelize.literal('orders.totalOrderPrice'), 'payableAmount']],
        where: orderWhre,
        order: [
        ['orderNo','DESC']],
       include: [
        {
          model: ASSIGNMENT,  
          attributes: ['id','jobStatus','assignedDate','acceptDate','rejectDate'], 
          required:true, 
          where:where
        }],
      });
      user=JSON.parse(JSON.stringify(user))
      return responseHelper.post(res,appstrings.detail,user);
    }catch (e) {
      return responseHelper.error(res, e.message);
    }
  },

}

const diff_mins = async function (dt2, dt1)
{
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff*60));
}

// app.post('/status',checkAuth,async(req,res,next) => { 
    
//   var params=req.body
//   try{
//       let responseNull=  commonMethods.checkParameterMissing([params.id,params.status])
//       if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
     
    

//      var userData = await ORDERS.findOne({
//        where: {
//          id: params.id }
//      });
     
     
//      if(userData)
//      {
     

   
//   const updatedResponse = await ORDERS.update({
//        trackStatus: params.status,

//      },
//      {
//        where : {
//        id: userData.dataValues.id
//      }
//      });
     
//      if(updatedResponse)
//            {
//             var statusName=await commonMethods.getOrderStatus(params.status)
           

//             if(params.status=="5")
//             ASSIGNMENT.update({jobStatus:3},{where : {empId: req.id,orderId:params.id}});

//             ORDERS.update({progressStatus:params.status},{where : {id: userData.dataValues.id}});

            

//                userData=JSON.parse(JSON.stringify(userData))
//                var findData=await USER.findOne({where:{id:userData.userId}});
//                 var notifPushUserData={title:userData.orderNo +appstrings.order_mark+ statusName+' on ' +commonMethods.formatAMPM(new Date),
//                description:userData.orderNo +appstrings.order_mark +  statusName+' on ' +commonMethods.formatAMPM(new Date),
//                token:findData.dataValues.deviceToken,  
//                 platform:findData.dataValues.platform,
//                 userId :userData.userId, role :3,
//                 orderId:userData.id,
//                 notificationType:"ORDER_STATUS",status:params.status
//            }
         
//    commonNotification.insertNotification(notifPushUserData)   
//     commonNotification.sendNotification(notifPushUserData)


           
            


//          return responseHelper.post(res, appstrings.success,null);
//            }
//            else{
//              return responseHelper.post(res, appstrings.oops_something,400);
  
//            }
     
//      }

//      else{
//       return responseHelper.post(res, appstrings.no_record,204);

//     }

//        }
//          catch (e) {
//            return responseHelper.error(res, e.message, 400);
//          }
  
  
  
// });






//  app.get('/detail/:orderId',checkAuth,async (req, res) => {
//     var orderId=req.params.orderId
    
//     let responseNull=  commonMethods.checkParameterMissing([orderId])
//     if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);

//       try {
//         var orderData = await ORDERS.findOne({
//         where :{id :orderId},      
//         include: [
//           {model: db.models.address , attributes: ['id','addressName','addressType','houseNo','latitude','longitude','town','landmark','city'] } ,
//           {model: USERS , attributes: ['id','firstName','lastName','image','countryCode','phoneNumber'] } ,
//           {model: COMPANY , attributes: ['id','companyName','logo1','address1','latitude','longitude','rating'] } ,
//           {model: SUBORDERS , attributes: ['id','serviceId','quantity'],
//           include: [{
//             model: SERVICES,
//             attributes: ['id','name','description','price','icon','thumbnail','type','price','duration','rating'],
//             required: false
//           }]},        
//           {model: ASSIGNMENT , attributes: ['id','jobStatus'],
//           where:{jobStatus :[1,3]},
//           required: false,
//           include: [{
//             model: EMPLOYEE,
//             attributes: ['id','firstName','lastName','countryCode','phoneNumber','image'],
//             required: false
//           }]
        
        
          
//       } ,
        
//         ]
  
//         });
//        if(orderData) 
       
//        {
//         orderData=JSON.parse(JSON.stringify(orderData))
//         var currency =await commonMethods.getCurrency(req.companyId)
//       if(currency && currency.dataValues && currency.dataValues.currency)
//        orderData.currency=currency.dataValues.currency
//        else orderData.currency=CURRENCY


// //Order Isntruction
// var instructions =await INSTRUCTIONS.findOne({where:{companyId:req.parentCompany}})
// var driverIns=[]
// if(instructions && instructions.dataValues && instructions.dataValues.deliveryInstructions!="")
// {
//   var inst=JSON.parse(instructions.dataValues.deliveryInstructions)

// for(var k=0;k<inst.length;k++)
// {
// var array=(orderData.deliveryInstructions.includes(","))? orderData.deliveryInstructions.split(","):[orderData.deliveryInstructions]
// if(array.includes(inst[k].id+""))
// driverIns.push(inst[k].heading)
// }
// }


// orderData.deliveryInstructions=driverIns


//         return responseHelper.post(res,appstrings.detail,orderData);
  
  
//        }
//         else return responseHelper.post(res,appstrings.no_record,null,204);
//       } catch (e) {
//         return responseHelper.error(res, e.message, 400);
//       }
//  });

//  app.get('/feedbacklist',checkAuth,async (req, res) => {
//    var params=req.body
//     var page =1
//     var limit =20
//     if(params.page) page=params.page
//     if(params.limit) limit=parseInt(params.limit) 
//     var offset=(page-1)*limit

   
//     try {
//       var user = await STAFFRATINGS.findAll({
//         attributes: ['id','rating','review','createdAt','orderId'],
//               where :{empId: req.id
//       },
//       order: [
//         ['createdAt', 'DESC']],
//       offset: offset, limit: limit,
       
//       include: [
//         {model: ORDERS , attributes: ['id','orderNo','serviceDateTime']},
//         {
//           model: USER,
//           attributes: ['id','firstName','lastName','image'],
//           required: false
//         }
//       ],

//       });

//         if(user.length>0){
// var data={}
// data.ratings=user
// var rating =0,count=0,orders=0
// var dataRating=await commonMethods.getEmpAvgRating(req.id) 
// var dataOrders=await commonMethods.getEmpOrders(req.id) 

// if(dataRating && dataRating.dataValues && dataRating.dataValues.totalRating) {
//   rating=dataRating.dataValues.totalRating
//   count=dataRating.dataValues.totalCountRating

// }
// if(dataOrders && dataOrders.dataValues && dataOrders.dataValues.totalOrders) {
//   orders=dataOrders.dataValues.totalOrders

// }

// data.avgRating=rating
// data.totalRating=count
// data.totalOrders=orders
//          return responseHelper.post(res,appstrings.detail,data);
//         }
//         else  return responseHelper.post(res,appstrings.no_record,null,204);
//     } catch (e) {
//       return responseHelper.error(res, e.message, 400);
//     }
//   });


//   app.get('/getCancelReasons',checkAuth,async (req, res) => {
   
//     try {
//       var findData = await CANCELREASON.findAll({
//       where :{companyId: req.parentCompany,
//        status :1

//       },
//       order: [
//         ['createdAt', 'DESC']]});
       
//     if(findData.length>0)
//         return responseHelper.post(res,appstrings.detail,findData);
//         else
//         return responseHelper.post(res,appstrings.no_record,null,204);

//     } catch (e) {
//       return responseHelper.error(res, e.message, 400);
//     }
//   });

//   app.post('/submitCancel',checkAuth,async (req, res) => {
//     var params=req.body

//     try{
//         let responseNull=  commonMethods.checkParameterMissing([params.orderId,params.reasonId])
//         if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
       
      

//        var userData = await ORDERS.findOne({
//          where: {
//            id: params.orderId }
//        });
       
       
//        if(userData)
//        {
       

     
//     const updatedResponse = await ASSIGNMENT.update({
//          jobStatus: 2,
//          cancellationReason: params.reasonId,
//          otherReason: params.otherReason,

//        },
//        {
//          where : {
//          orderId: params.orderId,
//          empId:req.id
//        }
//        });
       
//        if(updatedResponse)
//              {
//               var reasonData=await CANCELREASON.findOne({id: params.reasonId})
              
//                    var notifPushUserData={title:"Assignment for  order No.- "+userData.orderNo +' is cancelled by '+ req.userData.firstName+' on ' +commonMethods.formatAMPM(new Date),
//                         description:"Assignment for  order No.- "+userData.orderNo +' is cancelled by '+ req.userData.firstName+' on  ' +commonMethods.formatAMPM(new Date) +', Reason :'+reasonData.reason +"   "+params.otherReason,
//                             userId :req.companyId, role :2
//                   }
                  
//             commonNotification.insertNotification(notifPushUserData)   
               



//            return responseHelper.post(res, appstrings.success,null);
//              }
//              else{
//                return responseHelper.post(res, appstrings.oops_something,400);
    
//              }
       
//        }

//        else{
//         return responseHelper.post(res, appstrings.no_record,null,204);

//       }

//          }
//            catch (e) {
//              return responseHelper.error(res, e.message, 400);
//            }
    
    
    
   
//   });

