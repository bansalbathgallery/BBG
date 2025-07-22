/* jshint indent: 2 */
const common = require('../../helpers/common');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companyRatings', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating :
    {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: "0"
    },
    review :
    {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: ""
    },
    restaurantReview:
    {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    reviewImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        if(this.getDataValue('reviewImage')!="")
        {
          var images=this.getDataValue('reviewImage').split(",")
          imageArray=[];
          for(var k=0;k<images.length;k++)
          {
            imageArray.push( config.IMAGE_APPEND_URL+"services/icons/"+images[k]);
          }
          return  imageArray;
        }
        else return []
      },
      defaultValue: ''
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
    orderId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    topicRating: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function () {
        if(this.getDataValue('topicRating')!=null && this.getDataValue('topicRating')!="")
        return JSON.parse(this.getDataValue('topicRating'));
        else return []
        
        },
        defaultValue: ''
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date()
    },

  
  }, {
    tableName: 'companyRatings',
    timestamps: false
  });
};
