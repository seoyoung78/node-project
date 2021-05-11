const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class Cart extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  Cart.init({
    product_no: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    regdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize: sequelize,
    modelName: "Cart",
    tableName: "cart",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return Cart;
};