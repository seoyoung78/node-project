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
  },

  update: async function(img) {
    try {
      const row = await db.ProductsImg.update({
        img_sname: img.img_sname,
        img_oname: img.img_oname,
        img_type: img.img_type
      }, {
        where: {product_no: img.product_no, img_state: img.img_state}
      });
      return row;
    } catch (error) {
      throw error;
    }
  }
};