const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(userStateVal, idKeywordVal) {
    try {
      let where = null;
      if(idKeywordVal === "") {
        if(userStateVal === "회원") {
          where = {user_enable: 1};
        } else if(userStateVal === "탈퇴") {
          where = {user_enable: 0};
        }
      } else {
        if(userStateVal === "회원") {
          where = {
            [Op.and]: [
              {"user_enable": 1}, 
              {"user_id": {[Op.like]: "%"+ idKeywordVal +"%"}}
            ]
          };
        } else if(userStateVal === "탈퇴") {
          where = {
            [Op.and]: [
              {"user_enable": 0}, 
              {"user_id": {[Op.like]: "%"+ idKeywordVal +"%"}}
            ]
          };
        } else {
          where = {
            "user_id": {
              [Op.like]: "%" + idKeywordVal + "%"
            }
          };
        }
      };

      const result = await db.User.count({
        where
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(pager, userStateVal, idKeywordVal) {
    try {
      let where = null;
      if(idKeywordVal === "") {
        if(userStateVal === "회원") {
          where = {user_enable: 1};
        } else if(userStateVal === "탈퇴") {
          where = {user_enable: 0};
        }
      } else {
        if(userStateVal === "회원") {
          where = {
            [Op.and]: [
              {"user_enable": 1}, 
              {"user_id": {[Op.like]: "%"+ idKeywordVal +"%"}}
            ]
          };
        } else if(userStateVal === "탈퇴") {
          where = {
            [Op.and]: [
              {"user_enable": 0}, 
              {"user_id": {[Op.like]: "%"+ idKeywordVal +"%"}}
            ]
          };
        } else {
          where = {
            "user_id": {
              [Op.like]: "%" + idKeywordVal + "%"
            }
          };
        }
      };

      const result = await db.User.findAll({
        where,
        order: [["user_regdate", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      })
      
      return result;
    } catch(error) {
      throw error;
    }
  },

  getUser: async function(uid) {
    try{
      const user = await db.User.findOne({
        where: {user_id: uid}
      });
      return user;
    } catch(error) {
      throw error;
    }
  },

  update: async function(user) {
    try{
      let row;
      user.delete_date = new Date();
      if (user.user_enable == 0) {
        row = await db.User.update({
          user_id: user.user_id,
          user_name: user.user_name,
          user_phone: user.user_phone,
          zip_code: user.zip_code,
          road_address: user.road_address,
          detail_address: user.detail_address,
          user_authority: user.user_authority,
          delete_date: user.delete_date,
          delete_reason: user.delete_reason
        }, {
          where: {user_id: user.user_id}
        })
      } else {
        row = await db.User.update({
          user_id: user.user_id,
          user_name: user.user_name,
          user_phone: user.user_phone,
          zip_code: user.zip_code,
          road_address: user.road_address,
          detail_address: user.detail_address,
          user_authority: user.user_authority
        }, {
          where: {user_id: user.user_id}
        })
        return row;
      }
    } catch(error) {
      throw error;
    }
  }
};