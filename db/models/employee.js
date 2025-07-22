/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.INTEGER(5),
      defaultValue: '0',
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true,

    },
    email: {
      type: DataTypes.STRING(60),
      defaultValue: '',
      allowNull: true,

    },
    phoneNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    socialId: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true

    },
     socialType: {
      type: DataTypes.STRING(255),
      defaultValue: '',
      allowNull: true

    },
    countryCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      defaultValue: '',
      allowNull: false,

    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,

    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      get() {
        if( this.getDataValue('image')!=null && this.getDataValue('image')!="")
        return config.IMAGE_APPEND_URL+"employees/proofs/"+this.getDataValue('image')
        else  return ""
      },
    },
    idProof: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      get() {
        if( this.getDataValue('idProof')!=null && this.getDataValue('idProof')!="")
        return config.IMAGE_APPEND_URL+"employees/proofs/"+this.getDataValue('idProof')
        else  return ""
      },
    },

    idProofName: {
      type: DataTypes.STRING(256),
      allowNull: true,
      defaultValue:""
    },
	   deviceToken:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },

	  sessionToken:{
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: ''
    },
	  platform:{
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    currentLat:{
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    currentLong:{
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ''
    },
    bankName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:""
    },
    accountNumber: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:""
    },
    //1->Active,2->Account Deactivate,0->Block,3->Approval Pending
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    //0->Off, 1->On
    availableStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    //0->UnVerfiy 1->Verfied
    verifyUser: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    // otp: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false,
    //   defaultValue: 0
    // },
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
    tableName: 'employees',
    timestamps: false
  });
};
