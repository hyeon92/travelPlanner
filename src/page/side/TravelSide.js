import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Icon,
  List,
  Avatar,
  DatePicker,
  Input,
  Button,
  Typography
} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const TravelSide = ({
  travelList,
  onEditTitle,
  onEditsDate,
  onAddSchedule,
  onDelSchedule,
  onSaveTravel,
  onChangeDay
}) => {
  if (!travelList) {
    travelList = {
      travel_id: null,
      user_id: null,
      sDate: null,
      eDate: null,
      title: null,
      day: []
    };
  }

  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        padding: '5px'
      }}
    >
      <Input
        style={{ width: '100%' }}
        value={travelList.title}
        placeholder="여행제목"
        onChange={onEditTitle}
      />
      <div style={{ marginTop: '20px' }}>
        <span style={{ color: '#F0F1F7', fontWeight: 'bold' }}> 시작일자 </span>
        <DatePicker
          style={{ width: '70%', marginBottom: '5px' }}
          placeholder="Start"
          format="YYYY-MM-DD"
          allowClear={false}
          value={moment(travelList.sDate)}
          onChange={onEditsDate}
        />
        <span style={{ color: '#F0F1F7', fontWeight: 'bold' }}> 종료일자 </span>
        <DatePicker
          style={{ width: '70%' }}
          disabled
          placeholder="End"
          format="YYYY-MM-DD"
          allowClear={false}
          value={moment(travelList.eDate)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <List
          dataSource={travelList.day}
          footer={
            <div
              onClick={onAddSchedule}
              style={{
                cursor: 'Pointer',
                background: '#DADBE6',
                height: '40px',
                lineHeight: '40px',
                paddingLeft: '5px',
                borderRadius: '5px'
              }}
            >
              <Icon type="plus" />
              <span> ADD </span>
            </div>
          }
          renderItem={item => (
            <Link to={`/MyList/${travelList.travel_id}/${item.day_id}`}>
              <List.Item
                style={{
                  background: '#F0F1F7',
                  borderRadius: '5px',
                  marginTop: '5px',
                  padding: '5px'
                }}
                extra={[
                  <Icon
                    type="delete"
                    theme="twoTone"
                    twoToneColor="#545871"
                    onClick={() => onDelSchedule(item.day_id)}
                  />
                ]}
              >
                <List.Item.Meta
                  onClick={() => onChangeDay(item.day_id)}
                  avatar={
                    <Avatar icon="pushpin" style={{ background: '#9597A6' }} />
                  }
                  title={item.title}
                  description={moment(item.date).format('YYYY-MM-DD')}
                />
              </List.Item>
            </Link>
          )}
        />
      </div>
      <Button
        onClick={onSaveTravel}
        style={{ width: '100%', background: '#9597A6' }}
      >
        저장
      </Button>
    </Layout.Sider>
  );
};

export default TravelSide;
