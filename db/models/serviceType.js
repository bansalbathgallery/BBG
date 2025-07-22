/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('serviceType', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

   
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''

    },

    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    },

    duration: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ""
    },


    turnaroundTime: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: ""
    },

    

    price:
    {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 1
    },

    includedServices: {
      type: DataTypes.STRING(),
      get() {
        return this.getDataValue('includedServices').split(',')
    },
    set(val) {
       this.setDataValue('includedServices',val.join(','));
    },
      allowNull: true,
      defaultValue:''
    },


    excludedServices: {
      type: DataTypes.STRING(),
      get() {
        return this.getDataValue('excludedServices').split(',')
    },
    set(val) {
       this.setDataValue('excludedServices',val.join(','));
    },
      allowNull: true,
      defaultValue:''
    },
    
    created_at: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    }
  }, {
    tableName: 'serviceType',
    timestamps: false
  });
};
