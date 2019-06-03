var express = require('express');
var app = express();
app.use(express.json());

var User = require('./User');

// 로그인 처리
app.get('/select', function(req, res) {
  User.findOne({ id: req.query.id, password: req.query.password }, function(
    err,
    user
  ) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');
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
