
const express = require('express');

const app = express();
const bcrypt = require('bcryptjs');
const v = require('node-input-validator');
const hashPassword = require('../../../helpers/hashPassword');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;
const jwt = require('jsonwebtoken');
const util = require('util');
const mysql = require('mysql2/promise');
require('dotenv').config({
  path: `../env-files/${process.env.NODE_ENV || 'development'}.env`,
});
const keyPublishable = config.PAYKEY;
const keySecret = config.PAYSECRET;
const stripe = require("stripe")(keySecret);
const userCard = db.models.userCards;
const CHEF=db.models.chef;
USER=db.models.users;
const CART=db.models.cart;
const userCoupan = db.models.userCoupons;
const VEHICLE = db.models.vehicle;
const VEHICLETYPE = db.models.vehicleType;
COMPANY.hasOne(CHEF, {foreignKey: 'companyId'});
VEHICLE.belongsTo(VEHICLETYPE, {foreignKey: 'vehicleTypeId'});
// Generate Hash
const createHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
module.exports = {

	/**
	*@role Get Vehicle Type List
	*@Method GET
	*/
	getVehicleType: async (req,res,next) => {
		try{
			const usr = await VEHICLETYPE.findAll();
			return responseHelper.post(res,"Vehicle type list fetch successfully.",usr);
	    } catch (e) {
	    	return responseHelper.error(res, e.message, 400);
	    }
	},

	/**
	*@role Get Vehicle List
	*@Method GEt
	*@Get Id From Header
	*/
	list: async (req, res, next) => {
		try{
			const usr = await VEHICLE.findAll({
				where: {
					empId: req.id
				}
			})
			return responseHelper.post(res,"Vehicle list fetch successfully.",usr);
	    } catch (e) {
	    	return responseHelper.error(res, e.message, 400);
	    }
	},

	/**
	*@role Get Vehicle List
	*@Method POST
	*@params regNumber, TypeId, rcImage, dlImage
	*/
	add: async (req, res, next) => {
		try{
			const data = req.body;
			let responseNull= commonMethods.checkParameterMissing([data.regNumber,data.vehicleTypeId])
      		if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
      		var dlImage = "";
      		var rcImage = "";
      		const checkVehicle = await VEHICLE.findOne({
      			where: {
      				regNumber: data.regNumber
      			}
      		})
      		if(!checkVehicle){
		        if (req.files) {
					var ImageFile1 = req.files.dlImage;    
					if(ImageFile1)
					{
						var dlImage = Date.now() + 'dl_' + ImageFile1.name;
						ImageFile1.mv(config.UPLOAD_DIRECTORY +"employees/proofs/"+ dlImage, function (err) {
						//upload file
						if (err)
							return responseHelper.error(res, appstrings.err.meessage, 400);   
						});
					}
					var ImageFile2 = req.files.rcImage;    
					if(ImageFile2)
					{
						var rcImage = Date.now() + 'rc_' + ImageFile2.name;
						ImageFile2.mv(config.UPLOAD_DIRECTORY +"employees/proofs/"+ rcImage, function (err) {
							//upload file
							if (err)
							{
								console.log(err)
								return responseHelper.error(res, err.message, 400);   
							}
						});
					}
		        }

		        const users = await VEHICLE.create({
		        	name: data.name,
		          	empId: req.id,
		          	regNumber: data.regNumber,
		          	vehicleTypeId: data.vehicleTypeId,
		          	dlImage: dlImage,
		          	rcImage: rcImage,
		          	status: data.status ? data.status : '1'
		        });
	        	return responseHelper.post(res, "Vehicle added successfully.", users);
	        } else {
	        	return responseHelper.post(res,  "Vehicle number already exist.",null,200);
	      	}
		} catch (e) {
			return responseHelper.error(res,  "error", e.message);
		}
	},

	/**
	*@role Get Vehicle Details
	*@Method GET
	*/
	getDetail: async (req,res,next) => {
		try{
			const params = req.query;
			const usr = await VEHICLE.findOne({
				where: {
					id: params.vehicleId
				},
				include: [{
					model: VEHICLETYPE
				}]
			});

			return responseHelper.post(res, "Vehicle details fetch successfully.", usr);
		} catch (e){	
			return responseHelper.error(res,"error",e.message);
		}
	},

	/**
	*@role Update Vehicle Details
	*@Method POST
	*/
	update: async (req, res, next) => {
		try{
			const params = req.body;
			let responseNull= commonMethods.checkParameterMissing([params.regNumber,params.vehicleId,params.vehicleTypeId])
      		if(responseNull) return responseHelper.post(res, appstrings.required_field,null,400);
			const vehicleId = params.vehicleId;
			const regNumber = params.regNumber;
			const checkVehicle = await VEHICLE.findOne({
				where: {
					id: {
						[Op.ne]: vehicleId
					},
					regNumber: regNumber
				}
			});

			if(checkVehicle){
				return responseHelper.post(res,  "Vehicle number already exist.",null,200);
			}else{
				const VehicleDet = await VEHICLE.findOne({
					where: {
						id:  vehicleId
					}
				});
				if (req.files) 
				{
					var ImageFile1 = req.files.dlImage;    
					if(ImageFile1)
					{
						var dlImage = Date.now() + 'dl_' + ImageFile1.name;
						ImageFile1.mv(config.UPLOAD_DIRECTORY +"employees/proofs/"+ dlImage, function (err) {
						//upload file
						if (err)
							return responseHelper.error(res, appstrings.err.meessage, 400);   
						});
					}else{
						var dlImage = VehicleDet.dataValues.dlImage;
					}
					var ImageFile2 = req.files.rcImage;    
					if(ImageFile2)
					{
						var rcImage = Date.now() + 'rc_' + ImageFile2.name;
						ImageFile2.mv(config.UPLOAD_DIRECTORY +"employees/proofs/"+ rcImage, function (err) {
							//upload file
							if (err)
							{
								console.log(err)
								return responseHelper.error(res, err.message, 400);   
							}
						});
					}else{
						var rcImage = VehicleDet.dataValues.rcImage;
					}
		        }

		        //Update Vehicle Details
		        if (req.files) 
				{
			        var usr = await VEHICLE.update({
			        		name: params.name,
				            regNumber: regNumber,
				            vehicleTypeId: params.vehicleTypeId,
				            rcImage: rcImage,
				            dlImage: dlImage,
		          			status: params.status ? params.status : '1'

			          	},
			          	{
			          	where : {
			            	id:vehicleId
			          	}
			        });
		    	}else{
		    		var usr = await VEHICLE.update({
		    				name: params.name,
				            regNumber: regNumber,
				            vehicleTypeId: params.vehicleTypeId,
		          			status: params.status ? params.status : '1'
			          	},
			          	{
			          	where : {
			            	id:vehicleId
			          	}
			        });
		    	}
			}
			var usr = await VEHICLE.findOne({
					where: {
						id:  vehicleId
					}
				});
			return responseHelper.post(res, "Vehicle updated successfully.", usr);
		} catch (e){	
			return responseHelper.error(res,"error",e.message);
		}
	},

	/**
	*@role Vehicle Delete
	*@Method GET
	*@params vehicleId
	*/
	delete: async (req, res, next) => {
		try{
			const params = req.query;
			await VEHICLE.destroy({
	            where : {
	              	id:params.vehicleId
	            }
      		});
      		return responseHelper.post(res, "Vehicle deleted successfully.", params);
		} catch (e) {
			return responseHelper.error(res,"error",e.message);
		}
	},

}