const express = require("express");
const productService = require("../services/product-service");
const imgService = require("../services/productsimg-service");
const paging = require("../utils/paging");
const multipartFormData = require("../utils/multipart-form-data");
const db = require("../sequelize/models");

const router = express.Router();

router.get("", async (req, res, next) => {
  try {
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const categoryVal = req.query.categoryVal;
    const keyword = req.query.keyword || "";
    const totalRows = await productService.totalRows(categoryVal, keyword);
    const pager = paging.init(5, 5, pageNo, totalRows);
    const products = await productService.list(pager, categoryVal, keyword);
    res.json({products, pager});
  } catch(error) {
    next(error);
  }
});

router.get("/readCount", async (req, res, next) => {
  try {
    const cno = parseInt(req.query.cno);
    let result = 0;
    if (cno == 1) {
      result = await productService.totalRows("캔들", "");
    } else if (cno == 2) {
      result = await productService.totalRows("조명", "");
    } else if (cno == 3) {
      result = await productService.totalRows("트리", "");
    } else if (cno == 4) {
      result = await productService.totalRows("기타", "");
    } else {
      result = await productService.totalRows("전체", "");
    }
    res.json(result);
  } catch(error) {
    next(error);
  }
});

router.get("/pcount", async (req, res, next) => {
  try {
    const blist = await productService.sortlist(0);
    const nlist = await productService.sortlist(1); 
    res.json({blist, nlist});
  } catch(error) {
    next(error);
  }
});

router.get("/battach/:pid/:i", async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const i = parseInt(req.params.i) + 1;
    console.log("i: ", i);
    const img = await imgService.getImgList(pid, i);
    console.log(img);
    const fileSavePath = process.env.UPLOAD_PATH + img.img_sname;
    const fileOriginalName = img.img_oname;

    res.download(fileSavePath, fileOriginalName);
  } catch (error) {
    next(error);
  }
});

router.get("/:pid", async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const product = await productService.getProduct(pid);
    res.json(product);
  } catch(error) {
    next(error);
  }
});

router.post("", multipartFormData.array("battach"), async (req, res, next) => {
  try {
    const product = {...req.body, product_category_no: parseInt(req.body.product_category_no), product_price: parseInt(req.body.product_price)};
    const dbProdcut = await productService.create(product);

    let img;
    for(i = 0; i < 5; i ++) {
      img = {product_no:dbProdcut.product_no, img_state:(i+1), img_oname:req.files[i].originalname, img_sname:req.files[i].filename, img_type:req.files[i].mimetype};
      const dbImg = await imgService.create(img);
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put("", multipartFormData.array("battach"), async (req, res, next) => {
  try {
    const product = {...req.body, product_category_no: parseInt(req.body.product_category_no), product_price: parseInt(req.body.product_price), product_state: parseInt(req.body.product_state)};
    const row = await productService.update(product);
    console.log(req.files);
    res.json(row);
  } catch (error) {
    next(error);
  }
});

module.exports = router;