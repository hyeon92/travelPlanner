import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'page/side/MainSide.css';

class MainSide extends Component {
  render() {
    return (
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div className="trigger">
          <Icon type="smile" />
          <span> NAME</span>
        </div>
        <Menu defaultOpenKeys={['sub1']} mode="inline" theme="dark">
          <Menu.Item>
            <Link to="/">
              <Icon type="home" />
              <span>메인화면</span>
            </Link>
          </Menu.Item>
          <Menu.ItemGroup key="g1" title="여행일정">
            <Menu.Item key="1">
              <Link to="/MyList">
                <Icon type="calendar" />
                <span>나의 일정</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/otherList">
                <Icon type="global" />
                <span>다른 여행자들의 일정</span>
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default MainSide;
