var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var User = require('./User');

// 특정 여행일정의 지역 조회

// 지역 추가

// 지역 삭제

// 지역 업데이트

module.exports = router;
