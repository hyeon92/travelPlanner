const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  name: String,
  travel: [
    {
      key: Number,
      id: String,
      sDate: Date,
      eDate: Date,
      title: String,
      day: [
        {
          id: Number,
          date: Date,
          title: String,
          area: [
            {
              area_id: String,
              Key: String,
              locationX: Number,
              locationY: Number,
              areaName: String,
              memo: String,
              money: Number,
              time: String
            }
          ]
        }
      ]
    }
  ]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
