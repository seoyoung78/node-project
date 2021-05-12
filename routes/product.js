const express = require("express");
const productService = require("../services/product-service");
const paging = require("../utils/paging");

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
    const i = req.params.i;
    const img = await productService.getImgList(pid);
    console.log(img);
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

router.post("", async (req, res, next) => {
  try {
   
  } catch (error) {
    next(error);
  }
});

router.put("", async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
});

module.exports = router;