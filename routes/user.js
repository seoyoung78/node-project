const express = require("express");
const userService = require("../services/user-service");
const paging = require("../utils/paging");

const router = express.Router();

router.get("", async (req, res, next) => {
  try{
    const pageNo = req.query.pageNo? parseInt(req.query.pageNo) : 1;
    const userStateVal = req.query.userStateVal;
    const idKeywordVal = req.query.idKeywordVal || "";
    const totalRows = await userService.totalRows(userStateVal, idKeywordVal);
    const pager = paging.init(5, 5, pageNo, totalRows);
    const users = await userService.list(pager, userStateVal, idKeywordVal);
    res.json({users, pager});    
  } catch(error) {
    next(error);
  }
});

router.get("/readCount", async (req, res, next) => {
  try{
    const countNo = parseInt(req.query.countNo);
    let result = 0;
    if (countNo == 0) {
      result = await userService.totalRows("전체", "");
    } else if(countNo == 1) {
      result = await userService.totalRows("회원", "");
    } else {
      result = await userService.totalRows("탈퇴", "");
    }
    res.json({result});
  } catch(error) {
    next(error);
  }
});

router.get("/:uid", async (req, res, next) => {
  try{
    const uid = req.params.uid;
    const user = await userService.getUser(uid);
    res.json(user);
  } catch(error) {
    next(error);
  }
});

router.put("", async (req, res, next) => {
  try{
    const user = {...req.body, zip_code:parseInt(req.body.zip_code), user_enable:parseInt(req.body.user_enable)};
    await userService.update(user);
  } catch(error) {
    next(error);
  }
});

module.exports = router;