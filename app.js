const express = require('express')
const session = require('express-session')

let app = express()
app.use(session({
  secret: 'keyboard cat',
  cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
  resave: true,
  saveUninitialized: false
}))

app.get('/', (req, res) => {
  if (req.session.sign) {//检查用户是否已经登录
    console.log(req.session);//打印session的值
    res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
  } else {
    req.session.sign = true;
    req.session.name = 'testname';
    res.send('欢迎登陆！');
  }
})
app.listen(80, () => {
  console.log('http://localhost:80')
})