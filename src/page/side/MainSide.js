import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'page/side/MainSide.css';

const MainSide = ({ listNm, onGetTravelList }) => {
  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <Menu
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        defaultSelectedKeys={[listNm]}
      >
        <Menu.ItemGroup key="g1" title="여행일정">
          <Menu.Item key="MyList" onClick={onGetTravelList}>
            <Link to="/MyList">
              <Icon type="calendar" />
              <span>나의 일정</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="otherList" onClick={onGetTravelList}>
            <Link to="/otherList">
              <Icon type="global" />
              <span>다른 여행자들의 일정</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
};

export default MainSide;
