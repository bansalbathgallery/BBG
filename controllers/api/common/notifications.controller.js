 const fs = require('fs');
 var ejs = require('ejs');
 var FCM = require('fcm-node');
  var apn = require('apn');
  var fcm = new FCM('sss');
//   const Op = require('sequelize').Op;

  var nodemailer = require('nodemailer');
 var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: configDev.MAIL_USERNAME, 
        pass: configDev.MAIL_PASSWORD
    }
 });




 var methods={
     

 

insertNotification: async function (params)
{

  if(params.default) defaultAdd=params.default
  try{

    NOTIFICATION.create({
      title: params.title,
      message: params.description,
      orderType: params.orderType,
       orderNo: params.orderNo,
      userId: params.userId,
      orderId:params.orderId,
      role: params.role
    });
  }
  catch(e)

  {
    console.log(e)
  }
  
},



sendMail :function (emails,data)
{
    var index = fs.readFileSync('myFile.html', 'utf8');
   var renderedHtml = ejs.render(index, 
        data); 
    var mailOptions = {
     from: configDev.REMINDER_MAIL,
     to: emails,
     subject: "SignUp Successfully",
     // forceEmbeddedImages: true,
     html: renderedHtml
};
transporter.sendMail(mailOptions, function(error, info){
 if (error) {
     console.log(error);
     } 
 });
     

},

sendApprovedMail :function (emails,data)
{
    var index = fs.readFileSync('myApproved.html', 'utf8');
   var renderedHtml = ejs.render(index, 
        data); 
    var mailOptions = {
     from: configDev.REMINDER_MAIL,
     to: emails,
     subject: "Confirmation Account Approval!",
     // forceEmbeddedImages: true,
     html: renderedHtml
};
transporter.sendMail(mailOptions, function(error, info){
 if (error) {
     console.log(error);
     } 
 });
     

},

sendOtpMail :function (emails,data)
{
    var index = fs.readFileSync('otpEmail.html', 'utf8');
   var renderedHtml = ejs.render(index, 
        data); 
    var mailOptions = {
     from: configDev.REMINDER_MAIL,
     to: emails,
     subject: "Email verification!",
     // forceEmbeddedImages: true,
     html: renderedHtml
};
transporter.sendMail(mailOptions, function(error, info){
 if (error) {
     console.log(error);
     } 
 });
     

},

sendForgotPasswordMail :function (emails,data)
{
    var index = fs.readFileSync('html/forgot.html', 'utf8');
    var renderedHtml = ejs.render(index, 
        data); 
    var mailOptions = {
     from: configDev.REMINDER_MAIL,
     to: emails,
     subject: configDev.FOROGT_SUBJECT,
     // forceEmbeddedImages: true,
     html: renderedHtml
};
transporter.sendMail(mailOptions, function(error, info){
 if (error) {
     console.log(error);
     } 
 });
     

},

sendNotification :function (params)
 {
    var tokens=[];
    var fcm = new FCM(configDev.NOTIFICATION_KEY);
     if(typeof params.token=='string') tokens.push(params.token)
else  tokens=params.token;
var title=params.title;
var description =params.description;
var count=params.count;
console.log(tokens,"tokens======")
for(var k=0;k<tokens.length;k++)
{
    if(params.platform == "IOS")
    {
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: tokens[k],
            "priority": "high",
            "notification": {
                notificationType: params.notificationType,
                message: description,
                title: title,
                orderId:params.orderId,
                orderType:params.orderType ? params.orderType : "",
                orderNo:params.orderNo ? params.orderNo : "",
                riderId:params.riderId ? params.riderId : "",
                phoneNumber:params.phoneNumber ? params.phoneNumber : "",
                body: description,
                status: params.status,
                sound: 'default',
                delay: params.readStatus
            },
        };
    }else{
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: tokens[k],
            "priority": "high",
            "data": {
                notificationType: params.notificationType,
                message: description,
                title: title,
                orderId:params.orderId,
                orderType:params.orderType ? params.orderType : "",
                orderNo:params.orderNo ? params.orderNo : "",
                riderId:params.riderId ? params.riderId : "",
                phoneNumber:params.phoneNumber ? params.phoneNumber : "",
                body: description,
                status: params.status,
                sound: 'default',
                delay: params.readStatus
            },
        };
    }
    

//console.log(JSON.stringify(message))

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("FCM  Error >>>>>>>>>> " + err);              
    
            } else {
               console.log("FCM  Success >>>>>>>>>> " + response);
               
            }
        });

    }
    
},

sendChatNotification :function (params)
 {
    var tokens=[];
    var fcm = new FCM(configDev.NOTIFICATION_KEY);
     if(typeof params.token=='string') tokens.push(params.token)
else  tokens=params.token;
var title=params.title;
var description =params.description;
var count=params.count;

for(var k=0;k<tokens.length;k++)
{
    if(params.platform == "IOS")
    {
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: tokens[k],
            "priority": "high",
            "notification": {
                notificationType: params.notificationType,
                message: description,
                title: title,
                orderId:params.orderId,
                orderNo:params.orderNo ? params.orderNo : "",
                phoneNumber: params.phoneNumber ? params.phoneNumber : "",
                requestStatus:params.requestStatus,
                receiverId : params.userId,
                senderId : params.senderId,
                body: description,
                status: params.status,
                sound: 'default',
                delay: params.readStatus
            },
        };
    }else{
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: tokens[k],
            "priority": "high",
            "data": {
                notificationType: params.notificationType,
                message: description,
                title: title,
                orderId:params.orderId,
                orderNo:params.orderNo ? params.orderNo : "",
                phoneNumber: params.phoneNumber ? params.phoneNumber : "",
                requestStatus:params.requestStatus,
                receiverId : params.userId,
                senderId : params.senderId,
                body: description,
                status: params.status,
                sound: 'default',
                delay: params.readStatus
            },
        };
    }
    

//console.log(JSON.stringify(message))

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("FCM  Error >>>>>>>>>> " + err);              
    
            } else {
               console.log("FCM  Success >>>>>>>>>> " + response);
               
            }
        });

    }
    
},

sendEmpNotification :async (params,tokensArray)=>
{
  var fcm = new FCM(configDev.NOTIFICATION_KEY);
  var title=params.title;
  var description =params.description;
  var count=params.count;

  for(var k=0;k<tokensArray.length;k++)
  {
    await NOTIFICATION.create({
      title: params.title,
      message: params.description,
      orderType: params.orderType,
      orderNo: params.orderNo,
      userId: tokensArray[k].id,
      orderId:params.orderId,
      role: params.role
    });
    if(tokensArray[k].type == "IOS")
    {
      var messages = {
        to: tokensArray[k].token,
        "priority": "high",
        "notification": {
            notificationType: params.notificationType,
            message: description,
            title: title,
            orderId:params.orderId,
            deliveryAdddress: params.deliverLocation,
            pickupAdddress: params.pickupLocation,
            orderNo:params.orderNo ? params.orderNo : "",
            totalOrderValue:params.amount ? params.amount : "",
            approximateEarning:params.earning ? params.earning : "0",
            noOfItems:params.totalItem ? params.totalItem : "0",
            pickupLat:params.pickupLatitude ? params.pickupLatitude : "0.00",
            pickupLong:params.pickupLong ? params.pickupLong : "0.00",
            deliverLat:params.deliverLatitude ? params.deliverLatitude : "0.00",
            deliverLong:params.deliverLong ? params.deliverLong : "0.00",
            body: description,
            status: params.status,
            sound: 'default',
            delay: params.readStatus
        },
      };
    }else if(tokensArray[k].type == "ANDROID"){
      var messages = { 
        to: tokensArray[k].token,
        "priority": "high",
        "data": {
            notificationType: params.notificationType,
            message: description,
            title: title,
            orderId:params.orderId,
            deliveryAdddress: params.deliverLocation,
            pickupAdddress: params.pickupLocation,
            orderNo:params.orderNo ? params.orderNo : "",
            totalOrderValue:params.amount ? params.amount : "",
            approximateEarning:params.earning ? params.earning : "0",
            noOfItems:params.totalItem ? params.totalItem : "0",
            pickupLat:params.pickupLatitude ? params.pickupLatitude : "0.00",
            pickupLong:params.pickupLong ? params.pickupLong : "0.00",
            deliverLat:params.deliverLatitude ? params.deliverLatitude : "0.00",
            deliverLong:params.deliverLong ? params.deliverLong : "0.00",
            body: description,
            status: params.status,
            sound: 'default',
            delay: params.readStatus
        },
      };
    }
    fcm.send(messages, function (err, response) {
      if (err) {
          console.log("FCM  Error >>>>>>>>>> " + err);              

      } else {
         console.log("FCM  Success >>>>>>>>>> " + response);
         
      }
    });
  }
},
sendMultipleNotifications :function (tokensArray,title,message)
 {
  var fcm = new FCM(configDev.NOTIFICATION_KEY);
  for(var k=0;k<tokensArray.length;k++)
  {
    console.log(tokensArray[k],"szcsdhagvda")
    console.log(tokensArray[k].token,"szcsdhagvda")
    if(tokensArray[k].type == "IOS")
    {
        var messages = {
            to: tokensArray[k].token,
            "priority": "high",
            "notification": {
                notificationType: "Admin Notify",
                message: message,
                title: title,
                body: message,
                sound: 'default'
            },
        };
        fcm.send(messages, function (err, response) {
        if (err) {
            console.log("FCM  Error >>>>>>>>>> " + err);              

        } else {
           console.log("FCM  Success >>>>>>>>>> " + response);
           
        }
      });
    }else if(tokensArray[k].type == "ANDROID"){
        var messages = { 
            to: tokensArray[k].token,
            "priority": "high",
            "data": {
                notificationType: "Admin Notify",
                message: message,
                title: title,
                body: message,
                sound: 'default'
            },
        };
        fcm.send(messages, function (err, response) {
        if (err) {
            console.log("FCM  Error >>>>>>>>>> " + err);              

        } else {
           console.log("FCM  Success >>>>>>>>>> " + response);
           
        }
      });
    }

  }
    
}

 }


 module.exports=methods