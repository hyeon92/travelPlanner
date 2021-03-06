const express = require('express');
const app = express();
app.use(express.json());

const User = require('./User');

// 여행 일정 가져오기
app.get('/selectAll/:listName/:user_id', function(req, res) {
  let query = {};

  // listName에 따라 자신의 여행일정을 들고 올지 자신 외의 여해일정을 들고 올 지 결정
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

// 1개의 여행계획 조회
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

module.exports = app;
