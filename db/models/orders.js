/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique:true,
      get() {
        return "ORDER00"+this.getDataValue('orderNo')
      } 
    },
    serviceDateTime: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    orderCreationTime: {
      type: DataTypes.DATE(),
      allowNull: true,
    },
    address:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    latitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    longitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    additionalComment: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    orderType:
    {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue :''
    },
    scheduleType:
    {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    orderPrice :
    { 
    type: DataTypes.STRING(15),
    allowNull: false,
    defaultValue :''
    },
    couponId: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: '',
    },
    promoCode :
    {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue :''
    },
    couponDiscount: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue :''
    },
    offerPrice :
    {
      type: DataTypes.STRING(50),
      allowNull: true,
      default :'0'
    },
    serviceCharges :
    {
      type: DataTypes.STRING(15),
      allowNull: false,
      default :'0'
    },
    totalOrderPrice :
    {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    processTime:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    processleftTime:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    cookingTime:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    cookingleftTime:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    acceptTime:
    {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue :''
    },
    foodReadyTime:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    acceptedBy: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue :''
    },
    delay: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue :''
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
    orderDistance :
    { 
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :''
    },
    deliveryTime :
    { 
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue :'',
      get() {
        if( this.getDataValue('deliveryTime')!=null && this.getDataValue('deliveryTime')!="")
          return parseInt(this.getDataValue('deliveryTime'))
        else
            return 0;
      },
    },
    //0-Pending/Not Confirmed, 1-> Confirmed , 2->Cancelled , 3->Processing,4//cancelled by company, 5->Completed, 6->Rejected,7->Food Prepared,8->On the way
    progressStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    //0->Not Started , 1-> Started from location , 2->Reached Destination  3->Job Started ,4->Job Completed
    trackStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    trackingLatitude:
    {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    trackingLongitude:
    {
      type: DataTypes.TEXT(),
      allowNull: true,
    },
    cancellationReason:
    {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue :''
    },
    createdAt: {
      type:  DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type:  DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },
  }, {
    tableName: 'orders',
    timestamps: false
  });
};
