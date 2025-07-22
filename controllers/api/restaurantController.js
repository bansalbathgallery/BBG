
const express = require('express');
const app = express();
const sequelize = require('sequelize');
const Op = require('sequelize').Op;
const ADDRESS=db.models.address;
const COMPANY=db.models.companies;
const COMPANYRATING=db.models.companyRatings;
const CATEGORIES=db.models.categories;
const SERVICES=db.models.services;
const FEATUREDLIST=db.models.features;
const CFEATURED=db.models.companyTypes;
const companyTiming = db.models.companyTimings;
const CHEF=db.models.chef;
var moment      = require('moment');
const CART=db.models.cart;
const MENUS    = db.models.menus;
const companyCuisine   = db.models.companyCuisines;
const CompanyImage = db.models.CompanyImages;
const {Client} = require("@googlemaps/google-maps-services-js");
COMPANY.hasMany(CompanyImage, {foreignKey: 'companyId'});
COMPANY.hasMany(companyCuisine, {foreignKey: 'companyId'});
companyCuisine.belongsTo(CATEGORY,{foreignKey: 'categoryId'});
COMPANY.hasMany(COMPANYRATING, {foreignKey: 'companyId'});
COMPANY.hasMany(CATEGORIES, {foreignKey: 'companyId'});
COMPANY.hasMany(MENUS, {foreignKey: 'companyId'});
MENUS.hasMany(SERVICES, {foreignKey: 'menuId'});
COMPANY.hasMany(SERVICES, {foreignKey: 'companyId'});
COMPANY.hasMany(CFEATURED, {foreignKey: 'companyId'});
COMPANY.hasOne(CHEF, {foreignKey: 'companyId'});
SERVICES.hasOne(CART, {foreignKey: 'serviceId'});
COMPANY.hasOne(FAVOURITES,{foreignKey: 'companyId'});

module.exports = {

  /**
  *@Method GET
  *@role Get Restaurant List
  */
  list: async (req, res, next) => {
    try{
		const params = req.body;
		var MainArray = [];
		//Get Near By Restaturent
		const data = {};
		const Maindata = {};
		const updateDevicetoken = await USER.update({
			platform: params.deviceType,
			deviceToken: params.deviceToken,
			},
			{
			where: {
				id: params.userId
			}
		});
		//Check Where Conditions
		var where={
			status: '1',
			role: '2',
      busyTime: '0'
		}
		//Filter With Cusions
		if(params.cuisines != "")
		{
			//where.cuisines = params.cuisines;
			var allCuisines = await companyCuisine.findAll({
				attributes: ['companyId'],
				where: {
					categoryId: params.cuisines
				}
			});
			if(allCuisines.length > 0){
				var Cid = await allCuisines.map(obj => obj.companyId);
				var where = {
					status: '1',
					role: '2',
          busyTime: '0',
					id: {
						[Op.in]: Cid 
					}
				}
			}else{
				var Cid = [];
				return responseHelper.post(res, appstrings.no_record,data, 204);
			}
		}
		//Filter With deliveryType
		if(params.restaurantType != "" && params.restaurantType )
		{
			if(params.restaurantType == '0')
			{ 
				where.deliveryType = {
					[Op.in]: ['2','0'] 
				};
			}else{
				where.deliveryType = {
					[Op.in]: ['2','1'] 
				};
			}

		}
		//Filter With address
		if(params.address != "")
		{
			where.address1 = params.address;
		}
		//Filter With deliveryType
		if(params.deliveryType != "2" && params.deliveryType != "")
		{
			var rsType = [];
			rsType.push('2');
			rsType.push(params.deliveryType);
			where.deliveryType = {
				[Op.in]: rsType
			};
			if(params.instaMode && params.instaMode == '1' && params.deliveryType == '1')
			{
				where.instaMode = params.instaMode;
			}
		}

		//Filter With featured
		if(params.featuredlist != "")
		{
			//Get Free Delivery Restuarant
			var featured = await FEATUREDLIST.findAll({
				attributes: ['id','featuresType'],
				where: {
					featuresType: params.featuredlist 
				}
			});
		}else{
			//Get Free Delivery Restuarant
			var featured = await FEATUREDLIST.findAll({
				attributes: ['id','featuresType']
			});
		}

		//Filter By Sorting
		if(params.sortBy == '0')
		{
			var orderby = sequelize.literal(`totalRating DESC`);
		}else if(params.sortBy == '1')
		{
			var orderby = sequelize.literal(`distance ASC`);
		}else{
			var orderby = sequelize.literal(`totalRating DESC`);
		}
		//Filter By Rating
		if(params.ratings != '0'){
			var ratings = params.ratings;
		}

		//using Distance
		if(params.distance == '0')
		{
			var distances = 10000;
		}else{
			var distances = params.distance;
		}

		if(params.ratings == '0')
		{ 
			if(params.distance <= '4')
			{
				var ratinghaving = sequelize.literal(`distance <= ${distances}`);
			}
			else
			{
				if(params.distance != '0')
				{
					var distances = '4';
					var ratinghaving = sequelize.literal(`distance >= ${distances}`);
				}else{
					var ratinghaving = sequelize.literal(`distance <= ${distances}`);
				}
			}
		}else if(params.distance <= '4'){
			var ratinghaving = sequelize.literal(`totalRating <= ${ratings} AND distance <= ${distances}`);
		}else{
			if(params.distance != '0')
			{
				var distances = 4;
				var ratinghaving = sequelize.literal(`totalRating <= ${ratings} AND distance >= ${distances}`);
			}else{
				var ratinghaving = sequelize.literal(`totalRating <= ${ratings} AND distance <= ${distances}`);
			}
		}

      //Get Near By
      if(params.deliveryType != "2" && params.deliveryType != "" || params.cuisines != "" || params.ratings != '0' || params.distance != '0' || params.sortBy != '' || params.address != "" && params.featuredlist == "")
      {
        var array = {};
        const userData = await COMPANY.findAll({
          attributes: ['id','companyName','holidays','deliveryType','instaMode','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines',
          [sequelize.literal('(SELECT AVG(rating) FROM companyRatings where companyId = companies.id)'), 'totalRating'],
          [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = companies.id)'), 'totalReview'],
          [sequelize.literal('(SELECT min(duration) FROM services where companyId = companies.id AND status = 1)'), 'minReadyTime'],
          [sequelize.literal('(SELECT count(id) FROM favourites where companyId = companies.id AND userId = "'+params.userId+'")'), 'isFavourite'],
          [sequelize.literal("6371 * acos(cos(radians("+params.latitude+")) * cos(radians("+`companies.latitude`+")) * cos(radians("+params.longitude+") - radians("+`companies.longitude`+")) + sin(radians("+params.latitude+")) * sin(radians("+`companies.latitude`+")))"),'distance']],
          where: where,
          having: ratinghaving,
          order: orderby,
          include: [
            {
            model: CompanyImage,
            required: false,
            attributes: ['id','picture']
            },
            {
              model: companyCuisine,
              required: false,
              attributes: ['id','categoryId','companyId'],
              include: [{
                model: CATEGORY,
                attributes: ['name']
              }]
            }
          ],
        });
        array.type = "";
        if(params.date && params.date != "" && params.time && params.time != "")
        {
          var newArray      = [];
          for (var k = 0; k < userData.length; k++) 
          {
            var checkHolidays = userData[k];
            var getUser       = checkHolidays.toJSON();
            var newDDate      = new Date(params.date).toLocaleString("en-US", {timeZone: getUser.timeZone});
            var days          = ['sun','mon','tue','wed','thu','fri','sat'];
            var date1         = new Date(newDDate);
            var dayCount      = days[date1.getDay()];
            var newDate       = moment(newDDate).format("YYYY-MM-DD");
            var getHolidays   = getUser.holidays;
            if(getHolidays.length > 0)
            {
              var checkHoliStatus = getHolidays.indexOf(newDate);
            }else{
              var checkHoliStatus = -1;
            }

            var restTime = await companyTiming.findOne({
              where:{
                companyId: getUser.id,
                day: dayCount
              }
            });

            var flag     = '0';
            if(restTime)
            {
              var fromdt   = params.date+' '+restTime.dataValues.startTime;
              var todt     =  params.date+' '+restTime.dataValues.endTime;
              var from     = new Date(Date.parse(fromdt)).toLocaleString("en-US", {timeZone: getUser.timeZone});
              var to       = new Date(Date.parse(todt)).toLocaleString("en-US", {timeZone: getUser.timeZone});
              var from     = new Date(Date.parse(from));
              var to       = new Date(Date.parse(to));
              var usrtTime = params.date+' '+params.time;
              var usrtTime = new Date(Date.parse(usrtTime)).toLocaleString("en-US", {timeZone: getUser.timeZone});
              var usrtTime = new Date(Date.parse(usrtTime));
              if (usrtTime <= to && usrtTime >= from)
              {
                var flag = '1';  
              }
            }
            
            if(checkHoliStatus == '-1' && flag == '1')
            {
              newArray.push(userData[k]);
            }
          }
          array.resturants = newArray;
          if(newArray.length > 0)
          {
            MainArray.push(array);
          }
        }else{
          array.resturants = userData;
          if(userData.length > 0)
          {
            MainArray.push(array);
          }
        }
        Maindata.typeRest = MainArray;
      }
      else
      {
        for (var i = 0; i < featured.length; i++) {
          var array = {};
          var id = featured[i].id;
          var name = featured[i].featuresType;
          array.type = name; 
          var restDetails = await COMPANY.findAll({
            attributes: ['id','companyName','holidays','deliveryType','instaMode','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines',
            [sequelize.literal('(SELECT AVG(rating) FROM companyRatings where companyId = companies.id)'), 'totalRating'],
            [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = companies.id)'), 'totalReview'],
            [sequelize.literal('(SELECT min(duration) FROM services where companyId = companies.id AND status = 1)'), 'minReadyTime'],
            [sequelize.literal('(SELECT count(id) FROM favourites where companyId = companies.id AND userId = "'+params.userId+'")'), 'isFavourite'],
            [sequelize.literal("6371 * acos(cos(radians("+params.latitude+")) * cos(radians("+`companies.latitude`+")) * cos(radians("+params.longitude+") - radians("+`companies.longitude`+")) + sin(radians("+params.latitude+")) * sin(radians("+`companies.latitude`+")))"),'distance']],
            where: where,
            having: ratinghaving,
            order: orderby,
            include: [
              {
                model: CFEATURED,
                required: true,
                attributes: [],
                where: { 
                  featureId: id
                }
              },
              {
              model: CompanyImage,
              required: false,
              attributes: ['id','picture']
              },
              {
                model: companyCuisine,
                required: false,
                attributes: ['id','categoryId','companyId'],
                include: [{
                  model: CATEGORY,
                  attributes: ['name']
                }]
              }
            ],
          });
          array.resturants = restDetails;
          if(restDetails.length > 0)
          {
            MainArray.push(array);
          }
        }
        Maindata.typeRest = MainArray;
      }

      
      //Get All Categories
      const CategoriesList = await CATEGORIES.findAll({
        attributes: ['id','name','description','icon','thumbnail'],
        where: {
          status: '1'
        }
      });
      Maindata.categories = CategoriesList;
      return responseHelper.post(res, "List fetch successfully",Maindata);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@role Get Near By with Pagination
  */
  getnearBy: async (req, res, next) => {
    try{
      const params = req.body;
      var limit= parseInt(params.limit);
      var offset=parseInt(params.offset);
      const data = {};
      var distances = 100;
      var ratinghaving = sequelize.literal(`distance <= ${distances}`);
      //Check Where Conditions
      var where={
        status: '1',
        role: '2',
        busyTime: '0'
      }
      if(params.restaurantType != "" && params.restaurantType )
      {
        if(params.restaurantType == '0')
        { 
          where.deliveryType = {
            [Op.in]: ['2','0'] 
          };
        }else{
          where.deliveryType = {
            [Op.in]: ['2','1'] 
          };
        }
        
      }
      var orderby = sequelize.literal(`distance ASC`);
      const userData = await COMPANY.findAll({
        attributes: ['id','companyName','email','holidays','instaMode','phoneNumber','images','logo1','logo2','logo3','address1','cuisines',
        [sequelize.literal('(SELECT AVG(rating) FROM companyRatings where companyId = companies.id)'), 'totalRating'],
        [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = companies.id)'), 'totalReview'],
        [sequelize.literal('(SELECT min(duration) FROM services where companyId = companies.id AND status = 1)'), 'minReadyTime'],
        [sequelize.literal('(SELECT count(id) FROM favourites where companyId = companies.id AND userId = "'+params.userId+'")'), 'isFavourite'],
        [sequelize.literal("6371 * acos(cos(radians("+params.latitude+")) * cos(radians("+`companies.latitude`+")) * cos(radians("+params.longitude+") - radians("+`companies.longitude`+")) + sin(radians("+params.latitude+")) * sin(radians("+`companies.latitude`+")))"),'distance']],
        where: where,
        having: ratinghaving,
        order: orderby,
        include: [
          {
          model: CompanyImage,
          required: false,
          attributes: ['id','picture']
          },
          {
            model: companyCuisine,
            required: false,
            attributes: ['id','categoryId','companyId'],
            include: [{
              model: CATEGORY,
              attributes: ['name']
            }]
          }
        ],
        offset: offset, limit: limit,   });
      data.type = "Nearby";
      data.resturants = userData;
      return responseHelper.post(res, appstrings.detail,data);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },


  /**
  *@Method GET
  *@role Get Restaurent Details
  */
  detail: async (req, res, next) => {
    try{
      const params = req.body;
      if(params.latitude)
      {
        var latitude = params.latitude;
      }else{
        var latitude = "30.7046";
      }

      if(params.longitude)
      {
        var longitude = params.longitude;
      }else{
        var longitude = "76.7179";
      }
      const userData = await COMPANY.findOne({
        attributes: ['id','companyName','email','holidays','phoneNumber','instaMode','maximumDistance','minimumOrderValue','latitude','longitude','images','logo1','logo2','logo3','address1','deliveryType',
        [sequelize.fn('avg',sequelize.col('companyRatings.rating')), 'totalRating'],
        [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = companies.id)'), 'totalReview'],
        [sequelize.literal('(SELECT min(duration) FROM services where companyId = companies.id AND status = 1)'), 'minReadyTime'],
        [sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians("+`companies.latitude`+")) * cos(radians("+longitude+") - radians("+`companies.longitude`+")) + sin(radians("+latitude+")) * sin(radians("+`companies.latitude`+")))"),'distance'],
        [sequelize.literal('(SELECT count(id) FROM favourites where companyId = companies.id AND userId = "'+params.userId+'")'), 'isFavourite']],
        where: {
          status: '1',
          id: params.restaurantId
        },
        include: [{
          model: CHEF,
          attributes: ['id','name','description','images'],
        },{
          model: COMPANYRATING,
          attributes: [],
        }
        ]
      });
    
      if(userData){

        const getAllImages = await CompanyImage.findAll({
          attributes: ['id','picture'],
            where: {
              companyId: params.restaurantId
            }
          });
        userData.dataValues.CompanyImages = getAllImages;
        if(params.userId != '0')
        {
          var userDataCatego = await MENUS.findAll({
            attributes: ['id','name',
              [sequelize.literal('(SELECT SUM(orderTotalPrice) FROM cart where userId = "'+params.userId+'" AND companyId ="'+params.restaurantId+'")'), 'totalPrice'],
              [sequelize.literal('(SELECT SUM(quantity) FROM cart where userId = "'+params.userId+'" AND companyId ="'+params.restaurantId+'")'), 'totalitem']],
            where: {
              companyId: params.restaurantId,
              status: '1'
            },
            include : [{
              model: SERVICES,
              attributes: ['id','name','type','timeZone','description','icon','duration','menuId','status','turnaroundTime','schedule','price'],
              required:false,
              where: {
                status: '1'
              },
              include: [{
                model: CART,
                required:false,
                where: {
                  userId: params.userId
                },
              }]
            }]
          });

          //Cart Details
          var servicesArray = [];
          const getcart = await CART.findAll({
            where: {
              userId: params.userId
            }
          });
          var OrderArray = [];
          for (var i = 0; i < getcart.length; i++) 
          {
            let serviceId = getcart[i].serviceId;
            servicesArray.push(serviceId);
          }    

          //Get Maximun Dish Time
          const MaxServiceTime = await SERVICES.findOne({
            attributes: [[sequelize.fn('max', sequelize.col('duration')), 'maxTime' ]],
            where: {
              id: servicesArray
            },
            raw: true,
          });  
          userData.dataValues.cookingTime = MaxServiceTime.maxTime;
        }else{
          var userDataCatego = await MENUS.findAll({
            attributes: ['id','name'],
            where: {
              companyId: params.restaurantId,
              status: '1'
            },
            include : [{
              model: SERVICES,
              attributes: ['id','name','type','timeZone','description','icon','duration','menuId','status','turnaroundTime','schedule','price'],
              required:false,
              where: {
                status: '1'
              }
            }]
          });
          userData.dataValues.cookingTime = '0';
        }

        //Check DateTime anf Day
        var NewDishes = [];
        var newDate  = moment(new Date()).format("YYYY-MM-DD");
        var days     = ['sun','mon','tue','wed','thu','fri','sat'];
        var date1    = new Date(newDate);
        var dayCount = days[date1.getDay()];
        for (var m = 0; m < userDataCatego.length; m++) {
          var menusd      = userDataCatego[m];
          //var convertjson = menusd.toJSON();
          var ses = menusd.services;
          var nesdishes = [];
          if(ses.length > 0)
          {
            for (var i = 0; i < ses.length; i++) 
            {
              // if(ses[i].timeZone != "" && typeof ses[i].timeZone !== 'undefined')
              // {
              //    console.log("seslength",ses[i].timeZone);
              //   var newDDate  = new Date().toLocaleString("en-US", {timeZone: ses[i].timeZone});
              //   console.log("newDDate===",newDDate);
              //   var days     = ['sun','mon','tue','wed','thu','fri','sat'];
              //   var date1    = new Date(newDDate);
              //   var dayCount = days[date1.getDay()];
              //   var newDate  = moment(newDDate).format("YYYY-MM-DD");
              //   // var dd = newDDate.getDate();

              //   // var mm = newDDate.getMonth()+1; 
              //   // var yyyy = newDDate.getFullYear();
              //   // if(dd<10) 
              //   // {
              //   //     dd='0'+dd;
              //   // } 

              //   // if(mm<10) 
              //   // {
              //   //     mm='0'+mm;
              //   // } 
              //   // var newDate = yyyy+'-'+mm+'-'+dd;
              //   console.log("newDDate===",newDate);
              // }else{
                var newDate  = moment(new Date()).format("YYYY-MM-DD");
                var days     = ['sun','mon','tue','wed','thu','fri','sat'];
                var date1    = new Date(newDate);
                var dayCount = days[date1.getDay()];
              //}
              var stype     = ses[i].type;
              var schedules = ses[i].schedule;
              var sstatus = "0";
              if(schedules.length > 0)
              {
                if(stype == '0')
                {
                  if(schedules.indexOf(dayCount) !== -1){
                    var sstatus = "1";
                  }
                }else if(stype == '1'){
                  if(schedules.indexOf(newDate) !== -1){
                    var sstatus = "1";
                  }
                }
                if(sstatus == "1")
                {
                  nesdishes.push(ses[i]);
                 
                  //NewDishes.push(menusd);
                }
              }
            }
          }
           menusd.dataValues.services =nesdishes;
          NewDishes.push(menusd);
        }
        const getAllCuisines = await companyCuisine.findAll({
          attributes: ['id','categoryId','companyId'],
          where: {
            companyId: params.restaurantId
          },
          include: [{
            model: CATEGORY,
            attributes: ['name']
          }]
        });

        //Get All Timing
        const getAllTiming = await companyTiming.findAll({
          where: {
            companyId: params.restaurantId
          }
        });
        userData.dataValues.processTime = '15';
        userData.dataValues.categories = NewDishes;
        userData.dataValues.companyCuisines = getAllCuisines;
        userData.dataValues.companyTiming = getAllTiming;
        //End
        userData.dataValues.likeStatus = '0';
        userData.dataValues.miles      = '2';
        userData.dataValues.time       = '20 min';

        //Calculate Time
        var origins = [{
	        lat: userData.dataValues.latitude, 
	        lng: userData.dataValues.longitude
      	}];
		var destinations = [{
			lat: latitude, 
			lng: longitude
		}];
    const client = new Client({});
		client.distancematrix({
			params: {
				origins: origins,
				destinations: destinations,
				key: "AIzaSyDBBLtvW2kqoNiPXOuDBzlk5V_QmRXJLKg",
			},
			timeout: 10000, // milliseconds
		}).then((r) => {
			r.data.rows[0].elements.map(async(element, index)=>{      
				if(element.status == 'OK')
				{
					var dist = element.distance.text;
					dist = Number(dist.replace(/[^\d]/g, ''));
           console.log(dist)
          console.log(element.duration.text)
          var totalTime = await commonMethods.convertMinutes(element.duration.text);
					userData.dataValues.deliveryTime = parseInt(totalTime);
					return responseHelper.post(res, appstrings.detail,userData);
				}           
			});
		}).catch((e) => {
			return responseHelper.error(res, "Google api timout", 400);
		});
        
      }
      else{
        return responseHelper.post(res, appstrings.no_record, null, 204);
      }
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method GET
  *@role Get Restaurent Details
  */
  filter: async (req, res, next) => {
    try{
      const params = req.body;
      var MainArray = [];
      //Get Near By Restaturent
      const data = {};
      const Maindata = {};
      //Check Where Conditions
      var where={
        status: '1',
        role: '2'
      }
      //Filter With Cusions
      if(params.cuisines != "")
      {
        where.cuisines = params.cuisines;
      }
      //Filter With address
      if(params.address != "")
      {
        where.address1 = params.address;
      }
      //Filter With deliveryType
      if(params.deliveryType != "")
      {
        where.deliveryType = params.deliveryType;
      }

      //Filter With featured
      if(params.featuredlist != "")
      {
        //Get Free Delivery Restuarant
        var featured = await FEATUREDLIST.findAll({
          attributes: ['id','featuresType'],
          where: {
            featuresType: params.featuredlist 
          }
        });
      }else{
        //Get Free Delivery Restuarant
        var featured = await FEATUREDLIST.findAll({
          attributes: ['id','featuresType']
        });
      }

      for (var i = 0; i < featured.length; i++) {
        var array = {};
        var id = featured[i].id;
        var name = featured[i].featuresType;
        array.type = name;
        const restDetails = await COMPANY.findAll({
          attributes: ['id','companyName','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines',
          [sequelize.literal('(SELECT AVG(rating) FROM companyRatings where companyId = companies.id)'), 'totalRating'],
          [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = companies.id)'), 'totalReview']],
          where: where,
          include: [{
            model: CFEATURED,
            required: true,
            attributes: [],
            where: { 
              featureId: id
            }
          }]
        });
        if(restDetails)
        {
          array.resturants = restDetails;
          MainArray.push(array);
        }
        
      }
      Maindata.typeRest = MainArray;
      //Get All Categories
      const CategoriesList = await CATEGORIES.findAll({
        attributes: ['id','name','description','icon','thumbnail'],
        where: {
          status: '1'
        }
      });
      Maindata.categories = CategoriesList;
      return responseHelper.post(res, appstrings.detail,Maindata);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  },

  /**
  *@Method POST
  *@role Get search
  */
  search: async (req, res, next) => {
    try{
      const params = req.body;
      var MainArray = [];
      //Get Near By Restaturent
      const data = {};
      const Maindata = {};

      //Search With Service Name and Restaurants Name
      // let where = {
      //     status: '1',
      //     [Op.or] : [
      //         {"$companies.companyName$" : {[Op.like] : `%${params.search}%`}},
      //         {"$services.name$" : {[Op.like] : `%${params.search}%`}}
      //     ]
      // }
      //Get Free Delivery Restuarant
      //Get All Categories
      const CategoriesList = await CATEGORIES.findAll({
        attributes: ['id','name','description','icon','thumbnail'],
        where: {
          status: '1',
          name: {[Op.like] : `%${params.search}%`}
        }
      });
      Maindata.categories = CategoriesList;
      //Get Services
      const userDataServices = await SERVICES.findAll({
      attributes: ['id','name','description','icon','price','companyId',
      [sequelize.literal('(SELECT AVG(rating) FROM serviceRatings where serviceId = services.id)'), 'totalRating'],
      [sequelize.literal('(SELECT count(id) FROM serviceRatings where serviceId = services.id)'), 'totalReview']],
        where: {
           status: '1',
           name: {[Op.like] : `%${params.search}%`}
        }
      });
      Maindata.dishes = userDataServices;
      //Get Near By
      const userData = await COMPANY.findAll({
      attributes: ['id','companyName','email','phoneNumber','images','logo1','logo2','logo3','address1','cuisines',
      [sequelize.literal('(SELECT AVG(rating) FROM companyRatings where companyId = companies.id)'), 'totalRating'],
      [sequelize.literal('(SELECT count(id) FROM companyRatings where companyId = companies.id)'), 'totalReview']],
        where: {
           status: '1',
            busyTime: '0',
           companyName: {[Op.like] : `%${params.search}%`}
        },
        include: [
        {
          model: SERVICES,
          required: false,
          attributes: []
        },
        {
          model: CompanyImage,
          required: false,
          attributes: ['id','picture']
        },
        {
          model: companyCuisine,
          required: false,
          attributes: ['id','categoryId','companyId'],
          include: [{
            model: CATEGORY,
            attributes: ['name']
          }]
        }],
        group: ['id'],
      });
      Maindata.restaurants = userData;
      
      return responseHelper.post(res, appstrings.detail,Maindata);
    }
    catch (e) {
      return responseHelper.error(res, e.message, 400);
    }
  }
  
};

