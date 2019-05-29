var mongoose = require('mongoose');

var databaseUrl = 'mongodb://localhost:27017/travelPlanner';

mongoose.connect(databaseUrl, { useNewUrlParser: true }, function(err, db) {
  if (err) {
    console.log('데이터베이스 연결시 에러 발생함.');
    return;
  }

  console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

  database = db;
});
