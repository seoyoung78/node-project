const express = require("express")
const userService = require("../services/auth-service");
const jwtAuth = require("../security/jwtAuth");

const router = express.Router();

router.get("", (req, res) => {});

router.post("/auth/login", async (req, res, next) => {
  try {
    const user = req.body;
    const result = await userService.login(user);
    if (result.id !== "success") {
      req.session.loginError = result;
      res.redirect("/");
    } else {
      //JWT 인증일 경우 - 헤더로 보냄
      const authToken = jwtAuth.createJwt(user.uid);
      
      //정상 응답으로 보냄
      res.json({uid:user.uid, authToken});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;