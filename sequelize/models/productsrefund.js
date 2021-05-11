const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class ProductsRefund extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  ProductsRefund.init({
    order_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    refund_state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    refund_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    refund_reason: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize: sequelize,
    modelName: "ProductsRefund",
    tableName: "products_refund",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return ProductsRefund;
};