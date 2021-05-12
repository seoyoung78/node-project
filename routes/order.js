const express = require("express");
const orderService = require("../services/order-service");
const orderProductService = require("../services/orderproduct-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("", async (req, res, next) => {
  try {
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const keyword = req.query.keyword || "";
    const totalRows = await orderService.totalRows(keyword);
    const pager = paging.init(5, 5, pageNo, totalRows);
    const orders = await orderService.list(pager, keyword);
    res.json({orders, pager});
  } catch(error) {
    next(error);
  }
});

router.get("/readCount", async (req, res, next) => {
  try {
    const countNo = parseInt(req.query.countNo);
    let result = 0;
    if (countNo == 1) {
      result = await orderService.totalRows("완료");
    } else if (countNo == 2) {
      result = await orderService.totalRows("취소");
    } else {
      result = await orderService.totalRows("");
    }
    res.json(result);
  } catch(error) {
    next(error);
  }
});

router.get("/:orderNo", async (req, res, next) => {
  try {
    const ono = req.params.orderNo;
    const orderProducts = await orderProductService.list(ono);
    res.json(orderProducts);
  } catch(error) {
    next(error);
  }
});

module.exports = router;