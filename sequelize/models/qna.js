const {Model, Sequelize} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //모델 클래스 선언
  class Qna extends Model {
    static associate(models) {
     
    }
  }
  //DB 칼럼 데이터 타입에 맞게 모델의 속성 정의
  Qna.init({
    qna_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qna_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qna_regdate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },    
    answer_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    answer_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    answer_content: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize: sequelize,
    modelName: "Qna",
    tableName: "qna",
    timestamps: false //createAt과 updateAt 컬럼 사용 안함
  });

  //모델 클래스 리턴
  return Qna;
};