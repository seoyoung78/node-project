const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(keyword) {
    try {
      let where = null;
      if(keyword !== "") {
        if(keyword === "완료") {
          where = {order_state: 0};
        } else if (keyword ==="취소") {
          where = {order_state: 1};
        } else {
          where = {
            [Op.or]: [
              {"user_id": {[Op.like]: "%" + keyword + "%"}},
              {"road_address": {[Op.like]: "%" + keyword + "%"}},
              {"order_no": {[Op.like]: "%" + keyword + "%"}}
          ]}
        }        
      };

      const result = await db.Order.count({
        where
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(pager, keyword) {
    try {
      let where = null;
      if(keyword !== "") {
        if(keyword === "완료") {
          where = {order_state: 0};
        } else if (keyword ==="취소") {
          where = {order_state: 1};
        } else {
          where = {
            [Op.or]: [
              {"user_id": {[Op.like]: "%" + keyword + "%"}},
              {"road_address": {[Op.like]: "%" + keyword + "%"}},
              {"order_no": {[Op.like]: "%" + keyword + "%"}}
          ]}
        }        
      };

      const result = await db.Order.findAll({
        where,
        order: [["order_no", "DESC"]],
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
  }
};