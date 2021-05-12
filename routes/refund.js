const express = require("express");
const refundService = require("../services/refund-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("", async (req, res, next) => {
  try {
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const state = req.query.state || "";
    const reason = req.query.reason || "";
    const totalRows = await refundService.totalRows(state, reason);
    const pager = paging.init(5, 5, pageNo, totalRows);
    const refunds = await refundService.list(pager, state, reason);

    res.json({pager, refunds});
  } catch(error) {
    next(error);
  }
});

router.get("/readCount", async (req, res, next) => {
  try {
    let result = 0;
    const countNo = parseInt(req.query.countNo);
    if (countNo == 0) {
      result = await refundService.totalRows("전체", "전체");
    } else if(countNo == 1) { 
      result = await refundService.totalRows("환불 중", "전체");
    } else {
      result = await refundService.totalRows("환불 완료", "전체");
    }
    res.json(result);
  } catch(error) {
    next(error);
  }
});

router.get("/:orderNo", async (req, res, next) => {
  try {
    const ono = req.params.orderNo;
    const refund = await refundService.getRefund(ono);
    res.json(refund);
  } catch(error) {
    next(error);
  }
});

router.put("", async (req, res, next) => {
  try {
    const refund = {...req.body, refund_state:parseInt(req.body.refund_state)};
    const row = await refundService.update(refund);
    res.json(row);
  } catch(error) {
    next(error);
  }
});

module.exports = router;