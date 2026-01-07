/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    menuId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: 0
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''

    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },

    icon: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        if(this.getDataValue('icon')!="")
        return configDev.IMAGE_APPEND_URL+"services/icons/"+this.getDataValue('icon')
        else return ""

    },
      defaultValue: ""
    },

    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        if(this.getDataValue('thumbnail')!="")
        return configDev.IMAGE_APPEND_URL+"services/thumbnails/"+this.getDataValue('thumbnail')
        else return ""
    },
     
      defaultValue: ""
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    },
    schedule:
    {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function () {
        if(this.getDataValue('schedule')!="")
        return JSON.parse(this.getDataValue('schedule'));
        else return []
        
        },
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
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    orderBy: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      defaultValue: 1
    },
    timeZone:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
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
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: common.timestamp()
    
    }
  }, {
    tableName: 'services',
    timestamps: false
  });
};
