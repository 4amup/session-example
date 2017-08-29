const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const mongoose = require('mongoose')

let app = express()
let options = {
   "host": "127.0.0.1",
   "port": "6379",
   "ttl": 60 * 60 * 24 * 30,   //session的有效期为30天(秒)
};

// 此时req对象还没有session这个属性
app.use(session({
   store: new RedisStore(options),
   secret: 'express is powerful'
}));

app.get('/', (req, res) => {
  if (req.session.sign) {//检查用户是否已经登录
      console.log(req.session)//打印session的值
      res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
  } else {
      req.session.sign = true;
      req.session.name = 'testname'
      res.send('欢迎登陆！')
  }
})

app.listen(80, () => {
  console.log('http://localhost:80')
})