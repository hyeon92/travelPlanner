import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, List, Avatar, DatePicker, Input } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
// import 'page/side/MainSide.css';

const list = [
  {
    id: 1,
    area: '1일차 첫번째 장소',
    memo: '이것 꼭 먹기',
    money: 10000
  },
  {
    id: 2,
    area: '1일차 두번째 장소',
    memo: '저것 꼭 먹기',
    money: 10000
  },
  {
    id: 3,
    area: '1일차 세번째 장소',
    memo: '요것 꼭 먹기',
    money: 10000
  },
  {
    id: 4,
    area: '1일차 네번째 장소',
    memo: '그것 꼭 먹기',
    money: 10000
  }
];

const TravelSide = ({
  travelList,
  onEditTitle,
  onEditsDate,
  onEditeDate,
  onDisabledsDate,
  onDisabledeDate
}) => {
  if (!travelList) {
    travelList = {
      key: null,
      id: null,
      sDate: null,
      eDate: null,
      title: null,
      day: null
    };
  }

  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <Input
        value={travelList.title}
        placeholder="여행제목"
        onChange={onEditTitle}
        value={travelList.title}
      />
      <div className="trigger">
        <div>여행 시작일</div>
        <DatePicker
          placeholder="Start"
          format="YYYY-MM-DD"
          allowClear={false}
          value={moment(travelList.sDate)}
          onChange={onEditsDate}
          disabledDate={onDisabledsDate}
        />
        <div>여행 마지막일</div>
        <DatePicker
          placeholder="End"
          format="YYYY-MM-DD"
          allowClear={false}
          value={moment(travelList.eDate)}
          onChange={onEditeDate}
          disabledDate={onDisabledeDate}
        />
      </div>
      {/* 
      <Menu defaultOpenKeys={['sub1']} mode="inline">
        <List
          dataSource={list}
          footer={
            <Link to="/MyList/ADD">
              <Icon type="plus" />
              <span> ADD </span>
            </Link>
          }
          renderItem={item => (
            <List.Item>
              <Link to={`/MyList/${item.id}/Detail`}>
                <List.Item.Meta
                  avatar={<Avatar icon="pushpin" />}
                  title={item.area}
                  description={item.memo}
                />
              </Link>
            </List.Item>
          )}
        />
      </Menu> */}
    </Layout.Sider>
  );
};

export default TravelSide;
