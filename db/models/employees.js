/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employeess', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        defaultValue: 0
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
	password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    licenseNumber: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    licenseClass: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    licenseState: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE',
    },
    status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0
      },
	deviceToken:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
	sessionToken:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    createdAt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    },
    updatedAt: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    }
  }, {
    tableName: 'employeess',
    timestamps: false
  });
};
