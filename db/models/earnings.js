/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('earnings', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
       },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    distanceRate :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },

    pickUpRate :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    deliveryRate :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    restaurantFees :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    riderFees :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    adminFees :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    status :
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    createdAt: {
      type: DataTypes.DATEONLY(),
      allowNull: false,
      defaultValue:  new Date()
    }
  }, {
    tableName: 'earnings',
    timestamps: false
  });
};
