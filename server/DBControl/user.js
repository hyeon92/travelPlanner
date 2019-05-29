var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  name: String,
  travel: {
    key: String,
    id: String,
    sDate: Date,
    eDate: Date,
    title: String,
    area: {
      seq: Number,
      Key: String,
      locationX: Number,
      locationY: Number,
      areaName: String,
      memo: String,
      money: Number,
      time: String
    }
  }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
