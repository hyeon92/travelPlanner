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

// 특정 여행일자의 모든 지역 조회
app.get('/select/:user_id/:travel_key/:day_id', function(req, res) {
  User.findOne(
    {
      id: req.params.user_id,
      travel: {
        $elemMatch: {
          key: req.params.travel_key,
          day: {
            $elemMatch: { id: req.params.day_id }
          }
        }
      }
    },
    function(err, user) {
      if (err) return res.status(500).send('Area 조회 실패');
      if (!user) return res.status(404).send('Area 없음.');

      // 유저ID와 여행계획key 필터
      let travel = user.travel.find(travel => {
        return (
          travel.id === req.params.user_id &&
          travel.key === parseInt(req.params.travel_key)
        );
      });

      // 여행일정 id 필터
      let day = travel.day.find(day => {
        return day.id === parseInt(req.params.day_id);
      });

      res.status(200).send(day);
    }
  );
});

// 특정 여행일정의 지역 조회

// 지역 추가

// 지역 삭제

// 지역 업데이트

module.exports = app;
