/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subcategories', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
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
    details: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true,
    },

	  status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    }
  }, {
    tableName: 'subcategories',
    timestamps: false
  });
};
