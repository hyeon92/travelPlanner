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

  User.where(query)
    .select('travel')
    .find(function(err, user) {
      if (err) return res.status(500).send('Area 조회 실패');
      if (!user) return res.status(404).send('Area 없음.');

      let travel = [];

      for (let i = 0; i < user.length; i++) {
        for (let j = 0; j < user[i].travel.length; j++) {
          travel.push({
            travel_id: user[i].travel[j].travel_id,
            user_id: user[i].travel[j].user_id,
            sDate: user[i].travel[j].sDate,
            eDate: user[i].travel[j].eDate,
            title: user[i].travel[j].title
          });
        }
      }

      const result = { travel: travel };

      res.status(200).send(result);
    });
});

// 특정 여행계획 조회
app.get('/select/:user_id/:travel_id', function(req, res) {
  const query = {
    user_id: req.params.user_id,
    'travel.travel_id': req.params.travel_id
  };

  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('Travel 조회 실패');
    if (!user) return res.status(200).send(null);

    let travel = user.travel.find(travel => {
      return (
        travel.user_id === req.params.user_id &&
        travel.travel_id === parseInt(req.params.travel_id)
      );
    });

    res.status(200).send(travel);
  });
});

// 여행 계획 업데이트
app.put('/update/:user_id/:travel_id', function(req, res) {
  const query = {
    user_id: req.params.user_id
  };

  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('Travel 조회 실패');

    // 저장될 여행 계획의 travel_id와 동일한 travel_id가 있는지 확인
    const travelInfo = user.travel.find(travel => {
      return travel.travel_id === parseInt(req.params.travel_id);
    });

    if (travelInfo === undefined) {
      // 동일한 travel_id가 없을 경우 insert됩니다.
      user.travel.push({
        travel_id: req.params.travel_id,
        user_id: req.params.user_id,
        sDate: req.body.params.sDate,
        eDate: req.body.params.eDate,
        title: req.body.params.title,
        day: req.body.params.day
      });
    } else {
      // 동일한 travel_id가 있을 경우 update됩니다.
      const idx = user.travel.indexOf(travelInfo);

      user.travel[idx].sDate = req.body.params.sDate;
      user.travel[idx].eDate = req.body.params.eDate;
      user.travel[idx].title = req.body.params.title;
      user.travel[idx].day = req.body.params.day;
    }

    User.updateOne(query, { $set: { travel: user.travel } }, function(
      err,
      result
    ) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!result) return res.status(404).send('User 없음.');

      const travelInfo = user.travel.find(travel => {
        return travel.travel_id === parseInt(req.params.travel_id);
      });

      res.status(200).send(travelInfo);
    });
  });
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

module.exports = app;
