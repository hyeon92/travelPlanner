var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./User');

// 특정회원 여행일정 조회
router.get('/select/:id', function(req, res) {
  User.findOne({ id: req.params.id }, function(err, user) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    res.status(200).send(user);
  });
});

// 특정회원 제외한 여행일정 조회
router.get('/selectOther/:id', function(req, res) {
  User.findOne({ id: !req.params.id }, function(err, user) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');

    res.status(200).send(user);
  });
});

// 여행일정 추가

// 여행일정 수정

// 여행일정 삭제

// test
router.put('/:id/:tst', function(req, res) {
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

module.exports = router;
