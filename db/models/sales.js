/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sales', {
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
    name: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true, 
    },
    sale: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true, 
    },
    type: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true, 
    },
    date: {
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
    tableName: 'sales',
    timestamps: false
  });
};
