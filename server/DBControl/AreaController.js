const express = require('express');
const app = express();
app.use(express.json());

const User = require('./User');
const moment = require('moment'); // 날짜

// 1개의 여행일정의 모든 지역 조회
app.get('/selectAll/:user_id/:travel_id/:day_id', function(req, res) {
  const query = {
    user_id: req.params.user_id,
    'travel.travel_id': req.params.travel_id,
    'travel.day.day_id': req.params.day_id
  };
  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('Area 조회 실패');

    if (user) {
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
    } else {
      const day = { area: [] };
      res.status(200).send(day);
    }
  });
});

// 여행 지역 정보 들고오기 (get 1 Area Info)
app.get('/selectArea/:user_id/:travel_id/:day_id/:area_id', function(req, res) {
  const query = {
    user_id: req.params.user_id,
    'travel.travel_id': req.params.travel_id,
    'travel.day.day_id': req.params.day_id,
    'travel.day.area.area_id': req.params.area_id
  };

  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('Area 조회 실패');
    // if (!user) return res.status(404).send('Area 없음.');

    if (user) {
      // 유저ID와 여행계획key 필터
      const travel = user.travel.find(travel => {
        return (
          travel.user_id === req.params.user_id &&
          travel.travel_id === parseInt(req.params.travel_id)
        );
      });

      // 여행일정 id 필터
      const day = travel.day.find(day => {
        return day.day_id === parseInt(req.params.day_id);
      });

      // 지역 id 필터
      let area = day.area.find(area => {
        return area.area_id === parseInt(req.params.area_id);
      });

      if (area === undefined) {
        area = {
          area_id: req.params.area_id,
          move_time: moment('00:00', 'HH:mm'),
          stay_time: moment('00:00', 'HH:mm'),
          cost: 0,
          transport_cost: 0
        };
      }
      res.status(200).send(area);
    } else {
      const area = {
        area_id: req.params.area_id,
        move_time: moment('00:00', 'HH:mm'),
        stay_time: moment('00:00', 'HH:mm'),
        cost: 0,
        transport_cost: 0
      };
      res.status(200).send(area);
    }
  });
});

// 신규 장소를 추가하거나 기존의 장소 정보를 업데이트
app.put('/save/:user_id/:travel_id/:day_id/:area_id', function(req, res) {
  const query = {
    user_id: req.params.user_id,
    'travel.travel_id': req.params.travel_id,
    'travel.day.day_id': req.params.day_id
  };

  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('Area 조회 실패');

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

    const travel_idx = user.travel.indexOf(travel);
    const day_idx = user.travel[travel_idx].day.indexOf(day);
    const area_idx = user.travel[travel_idx].day[day_idx].area.indexOf(area);

    if (area === undefined) {
      // 동일한 장소 정보가 없을 경우 Insert됩니다.
      user.travel[travel_idx].day[day_idx].area.push(req.body.params);
    } else {
      // 동일한 장소 정보가 있을 경우 Update됩니다.
      user.travel[travel_idx].day[day_idx].area[area_idx] = req.body.params;
    }

    User.updateOne(query, { $set: { travel: user.travel } }, function(
      err,
      result
    ) {
      if (err) return res.status(500).send('User 조회 실패');
      if (!result) return res.status(404).send('User 없음.');

      res.status(200).send(req.body.params);
    });
  });
});

// 하나의 장소 정보를 삭제
app.put('/delete/:user_id/:travel_id/:day_id/:area_id', function(req, res) {
  const query = {
    user_id: req.params.user_id,
    'travel.travel_id': req.params.travel_id,
    'travel.day.day_id': req.params.day_id,
    'travel.day.area.area_id': req.params.area_id
  };

  User.findOne(query, function(err, user) {
    if (err) return res.status(500).send('Area 조회 실패');

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

    const travel_idx = user.travel.indexOf(travel);
    const day_idx = user.travel[travel_idx].day.indexOf(day);
    const area_idx = user.travel[travel_idx].day[day_idx].area.indexOf(area);

    day.area.splice(area_idx, 1);

    user.travel[travel_idx].day = day;

    User.updateOne(
      { user_id: req.params.user_id },
      { $set: { travel: user.travel } },
      function(err, result) {
        if (err) return res.status(500).send('User 조회 실패');
        if (!result) return res.status(404).send('User 없음.');

        res.status(200).send(user.travel[travel_idx].day[day_idx]);
      }
    );
  });
});

module.exports = app;
