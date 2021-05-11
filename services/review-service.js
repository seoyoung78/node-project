const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(keyword) {
    try {
      let where = null;
      if(keyword !== "") {
        where = {
          [Op.or]: [
            {"review_content": {[Op.like]: "%" + keyword + "%"}},
            //{"review_content": {[Op.like]: "%" + keyword + "%"}}
        ]}
      } 

      const result = await db.Review.count({
        where
      })
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(pager, keyword) {
    try {
      let where = null;
      if(keyword !== "") {
        where = {"review_content": {[Op.like]: "%" + keyword + "%"}}
      } 

      const review = await db.Review.findAll({
        where,
        order: [["review_regdate", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      });

      // review.dataValues.Orders = await review.getOrder({
      //   attributes: ["order_no"]
      // });

      // review.dataValues.Products = await review.getProduct({
      //   attributes: ["product_name"]
      // });

      return review;
    } catch(error) {
      throw error;
    }
  },

  rangeList: async function(startBno, endBno) {
    try {
      const result = await db.Review.findAll({
        attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
        where: {
          [Op.and]: [
            {"bno": {[Op.gte]: startBno}},
            {"bno": {[Op.lte]: endBno}}
          ]
        }
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  getReview: async function (bno) {
    try {
      const board = await db.Review.findOne({
        where: {bno: bno}
      });
      return board;
    } catch(error) {
      throw error;
    }
  },

  update: async function (board) {
    try {
      const rows = await db.Review.update({
        btitle: board.btitle,
        bcontent: board.bcontent
      }, {
        where: {bno: board.bno}
      });
      return rows;
    } catch(error) {
      throw error;
    }
  },

  delete: async function (bno) {
    try {
      const rows = await db.Review.destroy({
        where: {bno}
      });
      return rows;
    } catch(error) {
      throw error;
    }
  }
};
