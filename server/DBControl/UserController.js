var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./User');

// 로그인 처리
router.get('/select', function(req, res) {
  User.findOne({ id: req.query.id, password: req.query.password }, function(
    err,
    user
  ) {
    if (err) return res.status(500).send('User 조회 실패');
    if (!user) return res.status(404).send('User 없음.');
    res.status(200).send(user);
  });
});

// // 회원 신규등록
// router.post('/insert', function(req, res) {
//   User.create(
//     {
//       id: req.query.id,
//       password: req.query.password,
//       name: req.query.name
//     },
//     function(err, user) {
//       if (err) return res.status(500).send('User 생성 실패.');
//       res.status(200).send(user);
//     }
//   );
// });

// // 회원 전체조회
// router.get('/select', function(req, res) {
//   User.find({}, function(err, users) {
//     if (err) return res.status(500).send('User 전체 조회 실패.');
//     res.status(200).send(users);
//   });
// });

// // 특정 회원 ID로 조회
// router.get('/selectID/:id', function(req, res) {
//   User.findOne({ id: req.params.id }, function(err, user) {
//     if (err) return res.status(500).send('User 조회 실패');
//     if (!user) return res.status(404).send('User 없음.');
//     res.status(200).send(user);
//   });
// });

// // 특정 회원 _id로 조회
// router.get('/select/:id', function(req, res) {
//   User.findById(req.params.id, function(err, user) {
//     if (err) return res.status(500).send('User 조회 실패');
//     if (!user) return res.status(404).send('User 없음.');
//     res.status(200).send(user);
//   });
// });

// // 회원삭제
// router.delete('/delete/:id', function(req, res) {
//   User.findByIdAndRemove(req.params.id, function(err, user) {
//     if (err) return res.status(500).send('User 삭제 실패');
//     res.status(200).send('User ' + user.name + ' 삭제됨.');
//   });
// });

// // 회원 정보 수정
// router.put('/update/:id', function(req, res) {
//   User.findByIdAndUpdate(req.params.id, req.query, { new: true }, function(
//     err,
//     user
//   ) {
//     if (err) return res.status(500).send('User 수정 실패.');
//     res.status(200).send(user);
//   });
// });

module.exports = router;
