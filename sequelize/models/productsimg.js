const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class ProductsImg extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  ProductsImg.init({
    img_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img_state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img_oname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img_sname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: "ProductsImg",
    tableName: "products_img",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return ProductsImg;
};