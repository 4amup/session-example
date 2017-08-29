var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy(); // 清空session
  res.redirect('/') // 重定向到首页
})

module.exports = router;
