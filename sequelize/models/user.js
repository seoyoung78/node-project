const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class User extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  User.init({
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING,
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
    },
    user_ssn1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_ssn2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_regdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },    
    user_enable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user_authority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_bank: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    delete_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    delete_reason: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return User;
};