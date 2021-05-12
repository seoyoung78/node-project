const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class Review extends Model {
    static associate(models) {
      models.Review.belongsTo(models.Product, {foreignKey:"product_no", targetKey:"product_no"});
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  Review.init({
    review_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review_content: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review_regdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize: sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return Review;
};