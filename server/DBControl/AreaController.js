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
app.get('/selectAll/:user_id/:travel_id/:day_id', function(req, res) {
  User.findOne(
    {
      user_id: req.params.user_id,
      travel: {
        $elemMatch: {
          travel_id: req.params.travel_id,
          day: {
            $elemMatch: { day_id: req.params.day_id }
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
          travel.user_id === req.params.user_id &&
          travel.travel_id === parseInt(req.params.travel_id)
        );
      });

      // 여행일정 id 필터
      let day = travel.day.find(day => {
        return day.day_id === parseInt(req.params.day_id);
      });

      res.status(200).send(day);
    }
  );
});

// 여행 지역 정보 들고오기 (get 1 Area Info)
app.get('/selectArea/:user_id/:travel_id/:day_id/:area_id', function(req, res) {
  // let query = User.where({ 'travel.day.area.area_id': 1 })
  //   // .equals('travel.day.area.area_id', 1)
  //   .select('travel.day.area.area_id');

  // query.find(function(err, user) {
  //   if (err) return res.status(500).send('Area 조회 실패');
  //   if (!user) return res.status(404).send('Area 없음.');

  //   res.status(200).send(user);
  // });

  User.findOne(
    {
      user_id: req.params.user_id,
      'travel.travel_id': req.params.travel_id,
      'travel.day.day_id': req.params.day_id,
      'travel.day.area.area_id': req.params.area_id
      // user_id: req.params.user_id,
      // travel: {
      //   $elemMatch: {
      //     travel_id: req.params.travel_id,
      //     day: {
      //       $elemMatch: {
      //         day_id: req.params.day_id,
      //         area: {
      //           $elemMatch: { area_id: req.params.area_id }
      //         }
      //       }
      //     }
      //   }
      // }
    },
    function(err, user) {
      if (err) return res.status(500).send('Area 조회 실패');
      if (!user) return res.status(404).send('Area 없음.');

      // 유저ID와 여행계획key 필터
      let travel = user.travel.find(travel => {
        return (
          travel.user_id === req.params.user_id &&
          travel.travel_id === parseInt(req.params.travel_id)
        );
      });

      // 여행일정 id 필터
      let day = travel.day.find(day => {
        return day.day_id === parseInt(req.params.day_id);
      });

      // 지역 id 필터

      let area = day.area.find(area => {
        return area.area_id === parseInt(req.params.area_id);
      });

      res.status(200).send(area);
      // res.status(200).send(user);
    }
  );
});

// 지역 정보 업데이트
app.post('/update/:user_id/:travel_id/:day_id/:area_id', function(req, res) {
  User.updateOne(
    {
      user_id: req.params.user_id,
      'travel.travel_id': req.params.travel_id,
      'travel.day.day_id': req.params.day_id,
      'travel.day.area.area_id': req.params.area_id
    },
    {
      $set: {
        'travel.$[].day.$[].area.$.place_name': req.body.params.place_name,
        'travel.$[].day.$[].area.$.category': req.body.params.category,
        'travel.$[].day.$[].area.$.location_x': req.body.params.location_x,
        'travel.$[].day.$[].area.$.location_y': req.body.params.location_y,
        'travel.$[].day.$[].area.$.address': req.body.params.address,
        'travel.$[].day.$[].area.$.time': req.body.params.time,
        'travel.$[].day.$[].area.$.transport': req.body.params.transport,
        'travel.$[].day.$[].area.$.move_time': req.body.params.move_time,
        'travel.$[].day.$[].area.$.transport_cost':
          req.body.params.transport_cost,
        'travel.$[].day.$[].area.$.cost': req.body.params.cost,
        'travel.$[].day.$[].area.$.stay_time': req.body.params.stay_time,
        'travel.$[].day.$[].area.$.memo': req.body.params.memo
      }
    },
    function(err, user) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!user) return res.status(404).send('User 없음.');

      res.status(200).send(user);
    }
  );
});

// 지역 정보 신규등록
app.post('/insert/:user_id/:travel_id/:day_id/:area_id', function(req, res) {
  User.updateOne(
    {
      user_id: req.params.user_id,
      travel: {
        $elemMatch: {
          travel_id: req.params.travel_id,
          day: {
            $elemMatch: {
              day_id: req.params.day_id
            }
          }
        }
      }
    },
    {
      $push: {
        'travel.$[].day.$[].area': req.body.params
      }
    },
    function(err, user) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!user) return res.status(404).send('User 없음.');
      res.status(200).send(user);
    }
  );
});
module.exports = app;
