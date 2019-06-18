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
const User = require('./User');

// 특정회원 여행계획 리스트 조회
app.get('/selectAll/:listName/:user_id', function(req, res) {
  let query = {};
  if (req.params.listName === 'MyList') {
    query = { user_id: req.params.user_id };
  } else {
    query = { user_id: { $ne: req.params.user_id } };
  }

  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    res.status(200).send(user);
  });
});

// 특정 여행계획 조회
app.get('/select/:user_id/:travel_id', function(req, res) {
  User.findOne(
    {
      user_id: req.params.user_id,
      travel: {
        $elemMatch: { travel_id: req.params.travel_id }
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
app.post('/update/:user_id/:travel_id', function(req, res) {
  User.updateOne(
    {
      user_id: req.params.user_id,
      travel: {
        $elemMatch: { travel_id: req.params.travel_id }
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
    { user_id: 123, travel: [{ title: '11' }] },
    { travel: { title: '1111' } },
    function(err, user) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!user) return res.status(404).send('User 없음.');

      res.status(200).send(user);
    }
  );
  // User.create(
  //   {
  //     user_id: req.body.params.user_id,
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
app.put('/:user_id/:tst', function(req, res) {
  User.findByIdAndUpdate(
    req.params.user_id,
    { $set: { travel: req.query } },
    { new: true },
    function(err, user) {
      if (err) return res.status(500).send('User 수정 실패.');
      res.status(200).send(user);
    }
  );
});

module.exports = app;
