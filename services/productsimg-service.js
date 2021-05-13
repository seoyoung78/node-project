const db = require("../sequelize/models/index");
const Op = db.Sequelize.Op;

module.exports = {
  getImgList: async function(pid, i) {
    try {
      const img = await db.ProductsImg.findOne({
        where: {
          "product_no": pid, 
          "img_state": i
        }
      });
      
      return img;
    } catch(error) {
      throw error;
    }
  },

  create: async function(img) {
    try {
      const dbimg = await db.ProductsImg.create(img);
      return dbimg;
    } catch(error) {
      throw error;
    }
  }
};