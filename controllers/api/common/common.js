const express = require('express');
 const router = express.Router();
 const CATEGORY = db.models.categories
 const Op = require('sequelize').Op;

 var methods={
     
checkParameterMissing :   function(params)
{

for(var k=0;k<params.length;k++)
{

if(params[k]==undefined || params[k]=="")

{
 return true
 break;
}

if(k==params.lenth-1)
return false

}

},

 

getAllParentCategories: function (companyId)
{

  const catData =  CATEGORY.findAll({
    attributes: ['id','name','description','icon','thumbnail','createdAt','status'],
    where: {
      parentId :'0',
      id:  {[Op.not]: '0'},
  
           },
          
    order: [
      ['orderby','ASC']
    ],
  });
  return catData;
},


getBusinessType: function (companyId)
{

  const catData =  BUSINESSTYPE.findOne({
    attributes: ['id','type','businessName'],
    where: {companyId:  companyId}
        
  });
  return catData;
},



getParentCompany: function (companyId)
{

  const catData =  COMPANY.findOne({
    where: {id:  companyId}
        
  });
  return catData;
},



getLinks: function (companyId)
{

  const catData =  DOCUMENT.findOne({
    where: {companyId:  companyId}
        
  });
  return catData;
},

getAllCompanies: function (companyId)
{

  const catData =  COMPANY.findAll({
    attributes: ['id','companyName'],
    where: {
      status :1,
      parentId:  companyId
           },
          
    order: [
      ['companyName','ASC']
    ],
  });
  return catData;
},

getAllCategories: function (companyId)
{

  const catData =  CATEGORY.findAll({
    attributes: ['id','name','description','icon','thumbnail','createdAt','status'],
    where: {
      companyId: companyId,
      level :'1',
      id:  {[Op.not]: '0'},
  
           },
          
    order: [
      ['orderby','ASC']
    ],
  });
  return catData;
},


getServiceAvgRating :function(serviceId)
{
  const ratData =  SUBORDERS.findOne({
    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'totalRating']],
  where: {
    serviceId:  serviceId,rating:{[Op.not]:'0'}}
  })
  
  return ratData

},

getUserTypes :function(companyId)
{
  const data =  USERTYPE.findAll({
  where: {
    companyId:  companyId,status:1}
  })
  
  return data

},

getRoleTypes :function(companyId)
{
  const data =  ROLETYPE.findAll({
  where: {
    companyId:  companyId,status:1}
  })
  
  return data

},


 getRating:function(rating)
{
    var avgRating=""
    for(var k=0;k<5;k++)
{
if(rating-k>1)
avgRating=  avgRating+'<i class="glyph-icon icon-star font-yellow "></i>'

else{ if (rating-k>0) avgRating=  avgRating+'<i class="glyph-icon icon-star-half-full font-yellow "></i>'
else  avgRating=  avgRating+'<i class="glyph-icon icon-star font-gray "></i>'
}


}
return avgRating;

},
getEmpAvgRating :function(empId)
{
  const ratData =  ASSIGNMENT.findOne({
    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'totalRating'],
    [sequelize.fn('count', sequelize.col('rating')), 'totalCountRating'],
  ],
  where: {
    empId:  empId,rating:{[Op.not]:'0'}
  }
  })
  
  return ratData

},

getEmpOrders :function(empId)
{
  const ratData =  ASSIGNMENT.findOne({
    attributes: [
    [sequelize.fn('count', sequelize.col('orderId')), 'totalOrders'],
  ],
  where: {
    empId:  empId}
  
  })
  
  return ratData

},

getCompAvgRating :function(companyId)
{
  const ratData =  COMPANYRATING.findOne({
    attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'totalRating']],
  where: {
    companyId:  companyId,rating:{[Op.not]:'0'}}
  })
  
  return ratData

},

getCurrency: function(companyId)
{
  
    const currency =    DOCUMENT.findOne({attributes:['currency'],where :{companyId : companyId}})
    if(currency && currency.dataValues && currency.dataValues.currency) CURRENCY=currency.dataValues.currency
    return currency
  
},
 format:function (date) {

    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
},

formatYYMMDD:function (date) {

    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
},


formatAMPM:function (date) {

  var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var d = date.getDate();
  var m = strArray[date.getMonth()];
  var y = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y +" "+strTime;
},

getOrderStatus :function(input)
{
  var status="Not Confirmed"
  if(input=="1") status="Confirmed"
  if(input=="2") status="Cancelled"
  if(input=="3") status="Processing"
  if(input=="4") status="Cancelled by Comapny"
  if(input=="5") status="Completed"
  return status;
},
short:function (data,length) {

    var returnString=""
    if(data!="" && data.length>length)
    {
        returnString=data.substring(data,length)+"...."

    }
    else{
        returnString=data
 
    }

    return returnString
},


 convertTime12to24 :function (time12h) {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
},

calcCrow: async(lat1, lon1, lat2, lon2, unit = "k") =>{
  var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
},
convertMinutes: async(str) =>{
  var $split = str.split(" ");
  if ($split[0] >= 1 && $split[0] < 60 && $split[1] == 'min'){
    var $duration = $split[0];
  }
  else if ($split[0] >= 1 && $split[0] < 60 && $split[1] == 'mins'){
    var $duration = $split[0];
  }
  else{
    var $durationHours = $split[0]*60;
    var $durationMin = $split[2] ? $split[2] : '0';
    var $duration = parseInt($durationHours) + parseInt($durationMin);
  }
  return $duration;
},

getDashboardData: async(fromDate1,toDate1,progressStatus1,filterName,compId) =>
{
    try {
        
        var fromDate =  ""
        var toDate =  ""
        var filterNameMain=[sequelize.literal(`DAY(createdAt)`), 'DAY']

        var progressStatus =  ['0','1','2','3','4','5']
        if(progressStatus1 && progressStatus1!="")  progressStatus=[progressStatus1]
        if(filterName && filterName!="")
        {
          if(filterName=="MONTH")  filterNameMain= [sequelize.literal(`MONTH(createdAt)`), 'MONTH']
          if(filterName=="YEAR")  filterNameMain= [sequelize.literal(`YEAR(createdAt)`), 'YEAR']
          if(filterName=="WEEK")  filterNameMain= [sequelize.literal(`WEEK(createdAt)`), 'WEEK']

        }



        orderWhere={progressStatus: { [Op.or]: progressStatus}}
        paymentWhere={transactionStatus: { [Op.or]: progressStatus}}
        userWhere={}

        
       
        if(fromDate1)fromDate= Math.round(new Date(fromDate1).getTime())
        if(toDate1) toDate=Math.round(new Date(toDate1).getTime())
        
      
      if(fromDate1!="" && toDate1!="")
      {
        
        orderWhere={progressStatus: { [Op.or]: progressStatus},createdAt: { [Op.gte]: fromDate,[Op.lte]: toDate}}
        paymentWhere={transactionStatus: { [Op.or]: progressStatus},createdAt: { [Op.gte]: fromDate,[Op.lte]: toDate}}
        userWhere={createdAt: { [Op.gte]: fromDate,[Op.lte]: toDate}}

    
      }

if(compId!="")
{
  orderWhere.companyId=compId
  paymentWhere.companyId=compId
 // userWhere.companyId=compId

}





          var ordersDataqDepth = await ORDERS.findAll({
            attributes: ['progressStatus',
              [sequelize.fn('sum', sequelize.col('totalOrderPrice')), 'totalSum'],
              filterNameMain,
              [sequelize.fn('COUNT', sequelize.col('progressStatus')), 'count']],
              group: [filterNameMain],
          where :orderWhere
          });
          
          var paymentDataqdepth = await PAYMENT.findAll({
            attributes: ['transactionStatus',
              [sequelize.fn('sum', sequelize.col('amount')), 'totalSum'],
              filterNameMain,
              [sequelize.fn('COUNT', sequelize.col('transactionStatus')), 'count']],
            group: ['transactionStatus',filterNameMain],
          where :paymentWhere});
      
          var userDataqDepth = await USER.findAll({
            attributes: ['id','status',
            filterNameMain,
              [sequelize.fn('COUNT', sequelize.col('status')), 'count'],[sequelize.literal(`WEEK(createdAt)`), 'week'],
            ],
               group:['status',filterNameMain],
              where :userWhere});


          var categoryDataq = await CATEGORY.findAll({
            attributes: ['id','parentId',filterNameMain,
              [sequelize.fn('COUNT', sequelize.col('status')), 'count']],
            group: ['status',filterNameMain],
          where :userWhere});



          var userDtaa={}
          userDtaa.ordersDataStat=JSON.parse(JSON.stringify(ordersDataqDepth))
          userDtaa.paymentDataStat=JSON.parse(JSON.stringify(paymentDataqdepth))
          userDtaa.userDataStat=JSON.parse(JSON.stringify(userDataqDepth))
          userDtaa.categoryDataStat=JSON.parse(JSON.stringify(categoryDataq))
          userDtaa.totalStatOrder=userDtaa.ordersDataStat.map(item => item.count).reduce(function(acc, val) { return acc + val; }, 0)
          userDtaa.totalStatCategory=userDtaa.categoryDataStat.map(item => item.count).reduce(function(acc, val) { return acc + val; }, 0)
          userDtaa.totalStatPayment=userDtaa.paymentDataStat.map(item => item.count).reduce(function(acc, val) { return acc + val; }, 0)
          userDtaa.totalStatUser=userDtaa.userDataStat.map(item => item.count).reduce(function(acc, val) { return acc + val; }, 0)
          

          var dataWhere={}
          if(compId!="") dataWhere.companyId=compId

          userDtaa.mainTotalOrder=(await ORDERS.findAll({})).length
          userDtaa.mainTotalUser=(await USER.findAll({})).length
         userDtaa.mainTotalPayment=(await PAYMENT.findAll({})).length
         userDtaa.mainTotalCategory=(await CATEGORY.findAll({})).length

          return  userDtaa
      
        } catch (e) {
          console.log(e)
          return null
         // return responseHelper.error(res, e.message, 400);
        }
      

}
 }

 module.exports=methods