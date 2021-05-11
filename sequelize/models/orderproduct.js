const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class OrderProduct extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  OrderProduct.init({
    product_no: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    order_no: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize: sequelize,
    modelName: "OrderProduct",
    tableName: "order_products",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return OrderProduct;
};