
const express = require('express');
const app     = express();
const Op = require('sequelize').Op;
const EARNING = db.models.earnings;
PAYMENT.belongsTo(USERS,{foreignKey: 'userId'})
PAYMENT.belongsTo(ORDERS,{foreignKey: 'orderId'})
ORDERS.hasOne(EARNING,{foreignKey: 'orderId'})

module.exports = {
  /*
  *@role View Payment Change
  */
  payment: async(req,res,next) =>{
    try{
      return res.render(superadminfilepath+'payment/list.ejs');
    } catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /*
  *@role Get Payment Order's list
  *@Method POST
  */
  list: async (req, res, next) => {
    try {
      var params=req.body;
      var progressStatus =  ['5'];
      var fromDate =  "";
      var toDate =  "";
      var page =1;
      var limit =50;
      if(params.page) page=params.page
      if(params.limit) limit=parseInt(params.limit)
      var offset=(page-1)*limit

      where={
        progressStatus: { [Op.or]: progressStatus}
      }

      where1={
        progressStatus: 
        { 
          [Op.or]: progressStatus
        }
      }

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

      // if(params.search != "")
      // {
      //   var restWhere = {
      //     status: '1',
      //     companyName: {
      //       [Op.like]: `%${params.search}%`
      //     }
      //   }
      // }else{
      //   var restWhere = {
      //     status: '1'
      //   }
      // }

      const findData = await ORDERS.findAndCountAll({
        order: [
          ['orderNo', 'DESC'],  
        ],
        where :where,
        include: [
          {
            model: USER , 
            attributes: ['id','firstName','lastName',"phoneNumber","countryCode","image"]
          },
          {
            model: PAYMENT, 
            attributes: ['transactionStatus']
          },
          {
            model: COMPANY,
            attributes:['id','companyName']
          },
          {
            model: EARNING,
            required: true
          },
          {
            model: SUBORDERS, 
            attributes: ['id','serviceId','quantity'],
            include: [{
              model: SERVICES,
              attributes: ['id','name','description','price','icon','thumbnail','type','price','duration'],
              required: false
            }]
          }
        
        ],
        distinct:true,
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
};

