/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING(500),
      defaultValue: '',
      allowNull: true

    },
    roles: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function () {
        if(this.getDataValue('roles')!=null && this.getDataValue('roles')!="")
        return JSON.parse(this.getDataValue('roles'));
        else return []
        
        },
      defaultValue: ''
    },
    status: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 1
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
    tableName: 'roles',
    timestamps: false
  });
};
