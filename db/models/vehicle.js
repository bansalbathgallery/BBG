/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    empId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'employees',
        key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE',
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: '',
    },
    regNumber: {
      type: DataTypes.STRING(256),
      allowNull: false,
      defaultValue: '',
    },
    vehicleTypeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'vehicleType',
        key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE',
    },
    dlImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      get() {
        if( this.getDataValue('dlImage')!=null && this.getDataValue('dlImage')!="")
        return config.IMAGE_APPEND_URL+"employees/proofs/"+this.getDataValue('dlImage')
        else  return ""
      },
    },
    rcImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      get() {
        if( this.getDataValue('rcImage')!=null && this.getDataValue('rcImage')!="")
        return config.IMAGE_APPEND_URL+"employees/proofs/"+this.getDataValue('rcImage')
        else  return ""
      },
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
    tableName: 'vehicle',
    timestamps: false
  });
};
