const express = require('express');
const app = express();
app.use(express.json());

User = require('./User');

// 로그인 처리
app.get('/select', function(req, res) {
  const query = { user_id: req.query.user_id, password: req.query.password };
  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    res.status(200).send(user);
  });
});

// 회원 신규등록
app.post('/insert', function(req, res) {
  const query = {
    user_id: req.body.params.user_id,
    password: req.body.params.password,
    name: req.body.params.name
  };
  User.create(query, function(err, user) {
    if (err) return res.status(500).send('User 생성 실패.');
    res.status(200).send(user);
  });
});

// ------------------------------------------
// ------------------------------------------

// 회원 전체조회
app.get('/selectAll', function(req, res) {
  console.log('selectAll');
  User.find({}, function(err, users) {
    if (err) return res.status(500).send('User 전체 조회 실패.');
    res.status(200).send(users);
  });
});

module.exports = app;
