/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userCoupons', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE',
    },
    coupanId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    coupanCode: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true
    },
    coupanDiscount: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true,
    },
    totalAmount: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true, 
    },
    discountPrice: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true, 
    },
    payableAmount: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true, 
    },
    created_at: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    }
  }, {
    tableName: 'userCoupons',
    timestamps: false
  });
};
