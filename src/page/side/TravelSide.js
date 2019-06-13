import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, List, Avatar, DatePicker, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const TravelSide = ({
  travelList,
  onEditTitle,
  onEditsDate,
  onAddSchedule,
  onDelSchedule,
  onSaveTravel
}) => {
  if (!travelList) {
    travelList = {
      key: null,
      id: null,
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
        padding: '10px'
      }}
    >
      <Input
        value={travelList.title}
        placeholder="여행제목"
        onChange={onEditTitle}
      />
      <div className="trigger">
        <div>여행 시작일</div>
        <DatePicker
          placeholder="Start"
          format="YYYY-MM-DD"
          allowClear={false}
          value={moment(travelList.sDate)}
          onChange={onEditsDate}
        />
        <div>여행 마지막일</div>
        <DatePicker
          disabled
          placeholder="End"
          format="YYYY-MM-DD"
          allowClear={false}
          value={moment(travelList.eDate)}
        />
      </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          marginBottom: '10px'
        }}
      >
        <List
          dataSource={travelList.day}
          footer={
            <div onClick={onAddSchedule}>
              <Icon type="plus" />
              <span> ADD </span>
            </div>
          }
          renderItem={item => (
            <List.Item
              extra={[
                <Icon type="delete" onClick={() => onDelSchedule(item.id)} />
              ]}
            >
              <Link to={`/MyList/${item.id}`}>
                <List.Item.Meta
                  avatar={<Avatar icon="pushpin" />}
                  title={item.title}
                  description={moment(item.date).format('YYYY-MM-DD')}
                />
              </Link>
            </List.Item>
          )}
        />
      </div>
      <Button block onClick={onSaveTravel}>
        저장
      </Button>
    </Layout.Sider>
  );
};

export default TravelSide;
