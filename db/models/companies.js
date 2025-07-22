/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companies', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },


    parentId: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
    },

    companyName: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },

  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
},

phoneNumber: {
  type: DataTypes.STRING(20),
},

countryCode: {
  type: DataTypes.STRING(20),
},

//2 -Companies , 1-Super Admin
role: {
  type: DataTypes.INTEGER(10),
  default:2
},
images: {
  type: DataTypes.TEXT,
  allowNull: false,
  get() {
    if(this.getDataValue('images')!="")
    {
      var images=this.getDataValue('images').split(",")
      imageArray=[];
      for(var k=0;k<images.length;k++)
      {
        imageArray.push( config.IMAGE_APPEND_URL+"users/"+images[k]);
      }
      return  imageArray;
    }
    else return []
  },
  defaultValue: ""
},
logo1: {
  type: DataTypes.TEXT,
  allowNull: true,
      get() {
        if( this.getDataValue('logo1')!=null && this.getDataValue('logo1')!="")
        return config.IMAGE_APPEND_URL+"users/"+this.getDataValue('logo1')
        else
          return this.getDataValue('logo1')
    },
      defaultValue: ''
},

logo2: {
  type: DataTypes.TEXT,
  allowNull: true,
      get() {
        if( this.getDataValue('logo2')!=null && this.getDataValue('logo2')!="")
        return config.IMAGE_APPEND_URL+"users/"+this.getDataValue('logo2')
      else
          return this.getDataValue('logo2')
    },
      defaultValue: ''
},


logo3: {
  type: DataTypes.TEXT,
  allowNull: true,
      get() {
        if( this.getDataValue('logo3')!=null && this.getDataValue('logo3')!="")
        return config.IMAGE_APPEND_URL+"users/"+this.getDataValue('logo3')
      else
          return this.getDataValue('logo3')
    },
      defaultValue: ''
},

//1->Active , 0->Approval Pending , 2->Block,3->Un-Approved
status: {
  type: DataTypes.INTEGER(11),
  allowNull: false,
  defaultValue: 1
},
deliveryType: {
  type: DataTypes.INTEGER(11),
  allowNull: false,
  defaultValue: 0
},
cuisines: {
  type: DataTypes.STRING(200),
  allowNull: false,
  defaultValue: '',
},
region: {
  type: DataTypes.STRING(100),
  allowNull: false,
  defaultValue: '',
},
deliveryFee: {
  type: DataTypes.STRING(100),
  allowNull: false,
  defaultValue: '',
},
maximumDistance: {
  type: DataTypes.STRING(100),
  allowNull: false,
  defaultValue: '',
},
minimumOrderValue: {
  type: DataTypes.STRING(100),
  allowNull: false,
  defaultValue: '',
},
license: {
  type: DataTypes.STRING(100),
  allowNull: false,
  defaultValue: '',
},
address1: {
  type: DataTypes.TEXT,
  allowNull: true,
    defaultValue: ''
},

latitude: {
  type: DataTypes.TEXT,
  allowNull: false,
  defaultValue: ""
},

timeZone:
{
  type: DataTypes.STRING(255),
  allowNull: false,
  defaultValue: ""
},
longitude: {
  type: DataTypes.TEXT,
  allowNull: false,
  defaultValue: ""
},
deviceToken:{
  type: DataTypes.STRING(255),
  allowNull: false,
  defaultValue: ''
},
deviceType:{
  type: DataTypes.STRING(255),
  allowNull: false,
  defaultValue: ''
},
address2: {
  type: DataTypes.TEXT,
  allowNull: true,
    defaultValue: ''
},
holidays: {
  type: DataTypes.TEXT,
  allowNull: true,
  get: function () {
        if(this.getDataValue('holidays')!=null && this.getDataValue('holidays')!="")
        return JSON.parse(this.getDataValue('holidays'));
        else return []
        
        },
    defaultValue: ''
},
websiteLink: {
  type: DataTypes.TEXT,
  allowNull: true,
    defaultValue: ''
},
//0->Off,1->On
instaMode: {
  type: DataTypes.INTEGER(11),
  allowNull: false,
  defaultValue: 0
},
accountNumber: {
  type: DataTypes.STRING(255),
  allowNull: false,
  defaultValue: ''
},
accountName: {
  type: DataTypes.STRING(255),
  allowNull: false,
  defaultValue: ''
},
busyTime: {
  type: DataTypes.INTEGER(11),
  allowNull: false,
  defaultValue: 0
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
    tableName: 'companies',
    timestamps: false
  });
};
