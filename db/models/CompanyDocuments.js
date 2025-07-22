/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanyDocuments', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document: {
      type: DataTypes.TEXT,
      allowNull: false,
        get() {
            if( this.getDataValue('document')!=null && this.getDataValue('document')!="")
            return config.IMAGE_APPEND_URL+"users/"+this.getDataValue('document')
          else
              return this.getDataValue('document')
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
    tableName: 'CompanyDocuments',
    timestamps: false
  });
};
