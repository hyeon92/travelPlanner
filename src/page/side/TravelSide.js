import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, List, Avatar, DatePicker, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const TravelSide = ({
  visible,
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
      {visible ? (
        <Input
          style={{ width: '100%' }}
          value={travelList.title}
          placeholder="여행제목"
          onChange={onEditTitle}
        />
      ) : (
        <span
          style={{
            color: '#F0F1F7',
            fontWeight: 'bold',
            fontSize: '17px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          {travelList.title}
        </span>
      )}
      <div style={{ marginTop: '20px' }}>
        <span style={{ color: '#F0F1F7', fontWeight: 'bold' }}> 시작일자 </span>
        {visible ? (
          <DatePicker
            style={{ width: '70%', marginBottom: '5px' }}
            placeholder="Start"
            format="YYYY-MM-DD"
            allowClear={false}
            value={moment(travelList.sDate)}
            onChange={onEditsDate}
          />
        ) : (
          <span
            style={{ color: '#F0F1F7', fontWeight: 'bold', fontSize: '17px' }}
          >
            {moment(travelList.sDate).format('YYYY-MM-DD')}
            <br />
          </span>
        )}
        <span style={{ color: '#F0F1F7', fontWeight: 'bold' }}> 종료일자 </span>

        {visible ? (
          <DatePicker
            style={{ width: '70%' }}
            disabled
            placeholder="End"
            format="YYYY-MM-DD"
            allowClear={false}
            value={moment(travelList.eDate)}
          />
        ) : (
          <span
            style={{ color: '#F0F1F7', fontWeight: 'bold', fontSize: '17px' }}
          >
            {moment(travelList.eDate).format('YYYY-MM-DD')}
            <br />
          </span>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <List
          dataSource={travelList.day}
          footer={
            visible ? (
              <div
                onClick={onAddSchedule}
                style={{
                  cursor: 'Pointer',
                  background: '#DADBE6',
                  height: '40px',
                  margin: '5px',
                  lineHeight: '40px',
                  paddingLeft: '5px'
                }}
              >
                <Icon type="plus" />
                <span> ADD </span>
              </div>
            ) : (
              <div />
            )
          }
          renderItem={item => (
            <List.Item
              style={{
                background: '#F0F1F7',
                margin: '5px',
                marginTop: '10px',
                marginBottom: '10px',
                padding: '10px'
              }}
              extra={
                visible ? (
                  <Icon
                    type="delete"
                    theme="twoTone"
                    twoToneColor="#545871"
                    onClick={() => onDelSchedule(item.day_id)}
                  />
                ) : (
                  <div />
                )
              }
            >
              <List.Item.Meta
                style={{
                  cursor: 'Pointer'
                }}
                onClick={() => onChangeDay(item.day_id)}
                avatar={
                  <Avatar icon="pushpin" style={{ background: '#9597A6' }} />
                }
                title={item.title}
                description={moment(item.date).format('YYYY-MM-DD')}
              />
            </List.Item>
          )}
        />
      </div>
      {visible ? (
        <Button
          onClick={onSaveTravel}
          style={{
            width: '100%',
            marginTop: '20px',
            background: '#9597A6',
            borderRadius: '0px',
            height: '40px'
          }}
        >
          저장
        </Button>
      ) : (
        <div />
      )}
      <Link to={`/MyList`}>
        <Button
          style={{
            width: '100%',
            marginTop: '20px',
            background: '#F0F1F7',
            borderRadius: '0px',
            height: '40px'
          }}
        >
          홈으로 가기
        </Button>
      </Link>
    </Layout.Sider>
  );
};

export default TravelSide;
