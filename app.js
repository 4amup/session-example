const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')

let app = express()
// 数据库连接
mongoose.connect('mongodb://127.0.0.1:27017/hubwiz'); //连接数据库
mongoose.connection.on('open', function () {
    console.log('-----------数据库连接成功！------------');
});

app.use(session({
    secret: "what do you want to do?", //secret的值建议使用128个随机字符串
    cookie: {maxAge: 60 * 1000 * 60 * 24 * 14}, //过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection //使用已有的数据库连接
    })
}));

app.get('/', function (req, res) {
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