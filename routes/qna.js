const express = require("express");
const qnaService = require("../services/qna-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("", async (req, res, next) => {
  try {
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const state = req.query.state;
    const totalRows = await qnaService.totalRows(state);
    const pager = paging.init(5, 5, pageNo, totalRows);
    const qna = await qnaService.list(pager, state);
    res.json({qna, pager});
  } catch(error) {
    next(error);
  }
});

router.get("/readCount", async (req, res, next) => {
  try {
    const countNo = parseInt(req.query.countNo);
    let result = 0;
    if (countNo == 1) {
      result = await qnaService.totalRows("미답변");
    } else if (countNo == 2) {
      result = await qnaService.totalRows("답변 완료");
    } else {
      result = await qnaService.totalRows("전체");
    }
    res.json(result);
  } catch(error) {
    next(error);
  }
});

router.get("/:qnaNo", async (req, res, next) => {
  try {
    const qnaNo = req.params.qnaNo;
    const qna = await qnaService.getQna(qnaNo);
    res.json(qna);
  } catch(error) {
    next(error);
  }
});

router.put("", async (req, res, next) => {
  try {
    const qna = {...req.body, qna_no:parseInt(req.body.qna_no), answer_state:parseInt(req.body.answer_state)};
    const row = await qnaService.update(qna);
    res.json(row);
  } catch(error) {
    next(error);
  }
});

module.exports = router;