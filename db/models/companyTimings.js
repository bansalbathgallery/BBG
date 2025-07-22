/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companyTimings', {
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
    day:
    {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    //0->Off 1->On
    availability:
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    startTime:
    {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    endTime:
    {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
  }, {
    tableName: 'companyTimings',
    timestamps: false
  });
};
