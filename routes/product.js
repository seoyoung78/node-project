const express = require("express");
const productService = require("../services/product-service");
const imgService = require("../services/productsimg-service");
const paging = require("../utils/paging");
const multipartFormData = require("../utils/multipart-form-data");

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
    const img = await imgService.getImgList(pid, i);
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
    };

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put("", multipartFormData.fields([{name: "battach1"}, {name: "battach2"}, {name: "battach3"}, {name: "battach4"}, {name: "battach5"}]), async (req, res, next) => {
  try {
    const dbproduct = {...req.body, product_category_no: parseInt(req.body.product_category_no), product_price: parseInt(req.body.product_price), product_state: parseInt(req.body.product_state)};
    const row = await productService.update(dbproduct);
    console.log(req.files);

    let img;
    let rows;
    if (req.files.battach1) {
      img = {...req.files.battach1, product_no: parseInt(req.body.product_no), img_state: 1, img_oname:req.files.battach1[0].originalname, img_sname:req.files.battach1[0].filename, img_type: req.files.battach1[0].mimetype};
      console.log(img);
      rows = await imgService.update(img);
    }
    if (req.files.battach2) {
      img = {...req.files.battach2, product_no: parseInt(req.body.product_no), img_state: 2, img_oname:req.files.battach2[0].originalname, img_sname:req.files.battach2[0].filename, img_type: req.files.battach2[0].mimetype};
      console.log(img);
      rows = await imgService.update(img);
    }
    if (req.files.battach3) {
      img = {...req.files.battach3, product_no: parseInt(req.body.product_no), img_state: 3, img_oname:req.files.battach3[0].originalname, img_sname:req.files.battach3[0].filename, img_type: req.files.battach3[0].mimetype};
      console.log(img);
      rows = await imgService.update(img);
    }
    if (req.files.battach4) {
      img = {...req.files.battach4, product_no: parseInt(req.body.product_no), img_state: 4, img_oname:req.files.battach4[0].originalname, img_sname:req.files.battach4[0].filename, img_type: req.files.battach4[0].mimetype};
      console.log(img);
      rows = await imgService.update(img);
    }
    if (req.files.battach5) {
      img = {...req.files.battach5, product_no: parseInt(req.body.product_no), img_state: 5, img_oname:req.files.battach5[0].originalname, img_sname:req.files.battach5[0].filename, img_type: req.files.battach5[0].mimetype};
      console.log(img);
      rows = await imgService.update(img);
    }

    res.json(row);
  } catch (error) {
    next(error);
  }
});

module.exports = router;