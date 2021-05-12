const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(state) {
    try {
      let where = null;
      if(state === 0) {
        where = {review_state: 0};
      } else if(state === 1) {
        where = {review_state: 1};
      }

      const result = await db.OrderProduct.count({
        where
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(ono) {
    try {
      const result = await db.OrderProduct.findAll({
        where: {order_no: ono},
        include: [{
          model: db.Product,
          attributes: ["product_name"]
        }],
        order: [["product_no", "ASC"]]
      })
      return result;
    } catch(error) {
      throw error;
    }
  }
};