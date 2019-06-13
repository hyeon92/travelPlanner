const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
  })
);

User = require('./User');

// 로그인 처리
app.get('/select', function(req, res) {
  User.findOne({ id: req.query.id, password: req.query.password }, function(
    err,
    user
  ) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    req.session.user = user;

    res.status(200).send(user);
  });
});

// 회원 신규등록
app.post('/insert', function(req, res) {
  User.create(
    {
      id: req.body.params.id,
      password: req.body.params.password,
      name: req.body.params.name
    },
    function(err, user) {
      if (err) return res.status(500).send('User 생성 실패.');
      res.status(200).send(user);
    }
  );
});

// 회원 전체조회
app.get('/selectAll', function(req, res) {
  User.find({}, function(err, users) {
    if (err) return res.status(500).send('User 전체 조회 실패.');
    res.status(200).send(users);
  });
});

module.exports = app;
