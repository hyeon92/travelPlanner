const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  user_id: String, // 회원 id
  password: String, // 회원 비밀번호
  name: String, // 회원 이름
  travel: [
    {
      travel_id: Number, // travel 고유키
      user_id: String, // 회원 id
      sDate: Date, // 여행 시작일자
      eDate: Date, // 여행 마지막 일자
      title: String, // 여행 제목
      day: [
        {
          day_id: Number, // day 고유키
          date: Date, // 일자
          title: String, // 일차 제목
          area: [
            {
              area_id: Number, // area 고유키
              place_name: String, // 장소명
              category: String, // 장소 카테고리
              location_x: Number, // x좌표
              location_y: Number, // y좌표
              address: String, // 장소 주소
              time: Date, // 시간대
              transport: String, // 이동수단
              move_time: Date, // 이동시간
              transport_cost: Number, // 교통비
              cost: Number, // 비용(입장료 등 기타비용)
              stay_time: Date, // 체류시간
              memo: String // 메모
            }
          ]
        }
      ]
    }
  ]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
