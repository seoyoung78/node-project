const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  totalRows: async function(categoryVal, keyword) {
    try {
      let where = null;
      if(keyword === "") {
        if(categoryVal === "캔들") {
          where = {product_category_no: 1};
        } else if(categoryVal === "조명") {
          where = {product_category_no: 2};
        } else if(categoryVal === "트리") {
          where = {product_category_no: 3};
        } else if(categoryVal === "기타") {
          where = {product_category_no: 4};
        }
      } else {
        if(categoryVal === "캔들") {
          where = {
            [Op.and]: [
              {"product_category_no": 1}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else if(categoryVal === "조명") {
          where = {
            [Op.and]: [
              {"product_category_no": 2}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else if(categoryVal === "트리") {
          where = {
            [Op.and]: [
              {"product_category_no": 3}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else if(categoryVal === "기타") {
          where = {
            [Op.and]: [
              {"product_category_no": 4}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else {
          where = {
            "product_name": {
              [Op.like]: "%" + keyword + "%"
            }
          };
        }
      };

      const result = await db.Product.count({
        where
      });
      return result;
    } catch(error) {
      throw error;
    }
  },

  list: async function(pager, categoryVal, keyword) {
    try {
      let where = null;
      if(keyword === "") {
        if(categoryVal === "캔들") {
          where = {product_category_no: 1};
        } else if(categoryVal === "조명") {
          where = {product_category_no: 2};
        } else if(categoryVal === "트리") {
          where = {product_category_no: 3};
        } else if(categoryVal === "기타") {
          where = {product_category_no: 4};
        }
      } else {
        if(categoryVal === "캔들") {
          where = {
            [Op.and]: [
              {"product_category_no": 1}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else if(categoryVal === "조명") {
          where = {
            [Op.and]: [
              {"product_category_no": 2}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else if(categoryVal === "트리") {
          where = {
            [Op.and]: [
              {"product_category_no": 3}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else if(categoryVal === "기타") {
          where = {
            [Op.and]: [
              {"product_category_no": 4}, 
              {"product_name": {[Op.like]: "%"+ keyword +"%"}}
            ]
          };
        } else {
          where = {
            "product_name": {
              [Op.like]: "%" + keyword + "%"
            }
          };
        }
      };

      const result = await db.Product.findAll({
        where,
        order: [["product_no", "DESC"]],
        limit: pager.rowsPerPage,
        offset: pager.startRowIndex
      })
      return result;
    } catch(error) {
      throw error;
    }
  },

  getProduct: async function(pid) {
    try {
      const product = await db.Product.findOne({
        where: {product_no: pid}
      });
      return product;
    } catch(error) {
      throw error;
    }
  },

  sortlist: async function(sort) {
    try {
      let order = null;
      if (sort === 0) {
        order = [["product_sellcount", "DESC"]];
      } else {
        order = [["product_regdate", "DESC"]];
      }

      const result = await db.Product.findAll({
        order,
        limit: 7
      })
      
      return result;
    } catch(error) {
      throw error;
    }
  },

  create: async function(product) {
    try {
      const dbProduct = await db.Product.create(product);
      return dbProduct;
    } catch(error) {
      throw error;
    }
  },

  update: async function(product) {
    try {
      const row = await db.Product.update({
        product_name: product.product_name,
        product_price: product.product_price,
        product_category_no: product.product_category_no
      }, {
        where: {product_no: product.product_no}
      });
      return row;
    } catch(error) {
      throw error;
    }
  }
};