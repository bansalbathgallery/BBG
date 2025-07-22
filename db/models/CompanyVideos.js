/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanyVideos', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
        get() {
            if( this.getDataValue('picture')!=null && this.getDataValue('picture')!="")
            return config.IMAGE_APPEND_URL+"users/"+this.getDataValue('picture')
          else
              return this.getDataValue('picture')
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

  
  }, {
    tableName: 'CompanyVideos',
    timestamps: false
  });
};
