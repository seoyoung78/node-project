const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class Order extends Model {
    static associate(models) {
      
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  Order.init({
    order_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    all_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    road_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detail_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return Order;
};