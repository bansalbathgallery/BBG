/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    customerTerms :
    {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: ""
    },
    restaurantTerms :
    {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: ""
    },
    riderTerms :
    {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: ""
    },
    privacyPolicy :
    {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: ""
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    distancePerKm: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    pickUpRate: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    deliveryRate: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
  }, {
    tableName: 'settings',
    timestamps: false
  });
};
