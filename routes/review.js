const express = require("express");
const reviewService = require("../services/review-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("", async (req, res, next) => {
  try{
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const keyword = req.query.keyword || "";
    const totalRows = await reviewService.totalRows(keyword);
    const pager = paging.init(10, 5, pageNo, totalRows);
    const reviews = await reviewService.list(pager, keyword);

    res.json({pager, reviews});
  } catch(error) {
    next(error);
  }
});

router.get("/readcount", async (req, res, next) => {
  try {
    let result = 0;
    const countNo = parseInt(req.query.countNo);
    if (countNo == 0) {
      result = reviewService.totalRows("");
    } else if (countNo == 1) {
      //result = orderProdcutService.totalRows(0);
    } else {
     //result = orderProdcutService.totalRows(1);
    }

    res.json({result});
  } catch(error) {
    next(error);
  }
});

router.get("/:review_no", async (req, res, next) => {
  try {

  } catch(error) {
    next(error);
  }
});

router.put("", async (req, res, next) => {
  try {

  } catch(error) {
    next(error);
  }
});

router.delete("/:review_no", async (req, res, next) => {
  try {

  } catch(error) {
    next(error);
  }
});

module.exports = router;