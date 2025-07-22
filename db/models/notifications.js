/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notifications', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    orderby: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique:true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    orderNo: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue:""
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue:""
    },
    message: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue:""
    },
    orderType: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue:""
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    //1-Super Admin, 2//Restraunt/Company ,3- Customers,4>Rider
    role:
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 3
    },
    readStatus:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
 
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
  
  
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue:new Date() 
    }
  }, {
    tableName: 'notifications',
    timestamps: false
  });
};
