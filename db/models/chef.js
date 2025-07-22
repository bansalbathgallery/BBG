/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chef', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false,
        defaultValue: ""
    },
    description :
    {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: ""

    },
    images: {
      type: DataTypes.TEXT,
      allowNull: true,
          get() {
            if( this.getDataValue('images')!=null && this.getDataValue('images')!="")
            return config.IMAGE_APPEND_URL+"users/"+this.getDataValue('images')
            else
              return this.getDataValue('images')
        },
          defaultValue: ''
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
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
  
  }, {
    tableName: 'chef',
    timestamps: false
  });
};
