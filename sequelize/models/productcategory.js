const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class ProductCategory extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  ProductCategory.init({
    category_no: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    modelName: "ProductCategory",
    tableName: "prodcut_categories",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return ProductCategory;
};