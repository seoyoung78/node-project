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
            //{"product_name": {[Op.like]: "%" + keyword + "%"}}
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
        where = {
          [Op.or]: [
            {"review_content": {[Op.like]: "%" + keyword + "%"}},
            //{"product_name": {[Op.like]: "%" + keyword + "%"}}
        ]}
      } 

      const review = await db.Review.findAll({
        where,
        include: [{
          model: db.Product,
          attributes: ["product_name"]
        }],
        order: [["review_no", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      });
      
      return review;
    } catch(error) {
      throw error;
    }
  },

  getReview: async function(rno) {
    try{
      const review = await db.Review.findOne({
        where: {review_no: rno},
        include: [{
          model: db.Product,
          attributes: ["product_name"]
        }]
      });
      return review;
    } catch(error) {
      throw error;
    }
  },

  update: async function(review) {
    try {
      let row;
      row = await db.Review.update({
        review_content: review.review_content
      }, {
        where: {review_no: review.review_no}
      })
      return row;
    } catch(error) {
      throw error;
    }
  },

  delete: async function(rno) {
    try {
      const row = await db.Review.destroy({
        where: {review_no: rno}
      });
      return row;
    } catch (error) {
      throw error;
    }
  }
};
