const bcrypt = require("bcrypt");
const db = require("../sequelize/models/index");

module.exports = {
  create: async function(user) {
    try {
      user.user_password = await bcrypt.hash(user.user_password, 12);
      user.user_authority = "ROLE_USER";
      user.user_enabled = 1;
      const dbUser = await db.User.create(user);
      return dbUser;
    } catch(error) {
      throw error;
    }
  },

  login: async function(user) {
    try {
      const dbUser = await db.User.findOne({
        where: {user_id: user.uid}
      });
      let result = {};
      if(dbUser) {
        const passwordCheck = await bcrypt.compare(user.upassword, dbUser.user_password);
        if(passwordCheck) {
          result = {id:"success", message:"로그인 성공"};          
        } else {
          result = {id:"wrongUserPassword", message:"패스워드가 틀립니다."};
        }
      } else {
        result = {id:"wrongUserid", message:"아이디가 존재하지 않습니다."};
      }
      return result;
    } catch(error) {
      throw error;
    }
  }
};