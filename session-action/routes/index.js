var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.sign) {// 检查用户是否已经登录，登录的话，展示sign页面
    console.log(req.session)
    res.render('sign', {
      session: req.session,
      title: 'signed'
    })
  } else { // 否则展示index登录页面
    res.render('index', {title: 'index'})
  }
})

module.exports = router;
