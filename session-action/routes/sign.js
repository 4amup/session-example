const express = require('express');
const router = express.Router();
var user = require('../user')

/* POST sign */
router.post('/', function(req, res, next) {
  if (!user[req.body.user] || req.body.password != user[req.body.user].password) {
    res.end('sign failure');
  } else {
      req.session.sign = true;
      req.session.name = user[req.body.user].name;
      res.send(`welecome <strong> ${req.session.name}</strong><a href="/out">注销</a>`);
  }
});

module.exports = router;
