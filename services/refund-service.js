const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(state, reason) {
    try {
      let where = null;
      if(reason === "전체") {
        if(state === "환불 중") {
          where = {refund_state: 0};
        } else if(state === "환불 완료") {
          where = {refund_state: 1};
        }
      } else {
        if(state === "환불 중") {
          where = {
            [Op.and]: [
              {"refund_state": 0}, 
              {"refund_reason": reason}
            ]
          };
        } else if(state === "환불 완료") {
          where = {
            [Op.and]: [
              {"refund_state": 1}, 
              {"refund_reason": reason}
            ]
          };
        } else {
          where = {refund_reason: reason};
        }
      };

      const result = await db.ProductsRefund.count({
        where
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(pager, state, reason) {
    try {
      let where = null;
      if(reason === "전체") {
        if(state === "환불 중") {
          where = {refund_state: 0};
        } else if(state === "환불 완료") {
          where = {refund_state: 1};
        }
      } else {
        if(state === "환불 중") {
          where = {
            [Op.and]: [
              {"refund_state": 0}, 
              {"refund_reason": reason}
            ]
          };
        } else if(state === "환불 완료") {
          where = {
            [Op.and]: [
              {"refund_state": 1}, 
              {"refund_reason": reason}
            ]
          };
        } else {
          where = {refund_reason: reason};
        }
      };

      const result = await db.ProductsRefund.findAll({
        where,
        include: [{
          model: db.Order,
          attributes: ["user_id"]
        }],
        order: [["order_no", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      })
      
      return result;
    } catch(error) {
      throw error;
    }
  },

  getRefund: async function(ono) {
    try{
      const refund = await db.ProductsRefund.findOne({
        where: {order_no: ono},
        include: [{
          model: db.Order,
          attributes: ["user_id"]
        }]
      });
      return refund;
    } catch(error) {
      throw error;
    }
  },

  update: async function(refund) {
    try{
      let row;      
      row = await db.ProductsRefund.update({
        refund_state: refund.refund_state
      }, {
        where: {order_no: refund.order_no}
      })
      return row;
    } catch(error) {
      throw error;
    }
  }
};