var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
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
var User = require('./User');

// 특정회원 여행계획 조회
app.get('/select/:id', function(req, res) {
  User.findOne({ id: req.params.id }, function(err, user) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    res.status(200).send(user);
  });
});

// 특정회원 제외한 여행계획 조회
app.get('/selectOther/:id', function(req, res) {
  User.findOne({ id: !req.params.id }, function(err, user) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    res.status(200).send(user);
  });
});

// 특정 여행계획 조회
app.get('/select/:id/:key', function(req, res) {
  User.findOne(
    {
      id: req.params.id,
      travel: {
        $elemMatch: { key: req.params.key }
      }
    },
    function(err, user) {
      if (err) return res.status(500).send('Travel 조회 실패');
      if (!user) return res.status(404).send('Travel 없음.');

      res.status(200).send(user.travel[0]);
    }
  );
});

// 여행 계획 업데이트
app.post('/update/:id/:key', function(req, res) {
  User.updateOne(
    {
      id: req.params.id,
      travel: {
        $elemMatch: { key: req.params.key }
      }
    },
    {
      $set: {
        'travel.$.title': req.body.params.title,
        'travel.$.sDate': req.body.params.sDate,
        'travel.$.eDate': req.body.params.eDate,
        'travel.$.day': req.body.params.day
      }
    },
    function(err, user) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!user) return res.status(404).send('User 없음.');

      res.status(200).send(user);
    }
  );
});

// 여행일정 추가 test
app.post('/insert', function(req, res) {
  User.updateOne(
    { id: 123, travel: [{ title: '11' }] },
    { travel: { title: '1111' } },
    function(err, user) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!user) return res.status(404).send('User 없음.');

      res.status(200).send(user);
    }
  );
  // User.create(
  //   {
  //     id: req.body.params.id,
  //     password: req.body.params.password,
  //     name: req.body.params.name
  //   },
  //   function(err, user) {
  //     if (err) return res.status(500).send('User 생성 실패.');
  //     res.status(200).send(user);
  //   }
  // );
});

// 여행일정 수정

// 여행일정 삭제

// test
app.put('/:id/:tst', function(req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: { travel: req.query } },
    { new: true },
    function(err, user) {
      if (err) return res.status(500).send('User 수정 실패.');
      res.status(200).send(user);
    }
  );
});

module.exports = app;
