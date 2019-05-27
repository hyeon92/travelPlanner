import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
// import 'page/side/MainSide.css';

class TravelSide extends Component {
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
        <span className="trigger">Travel</span>
        <div className="trigger">
          <span>05.27 ~ 05.30</span>
          <Link to="/otherList">
            <Icon type="calendar" />
          </Link>
        </div>
        <Menu defaultOpenKeys={['sub1']} mode="inline" theme="dark">
          <Menu.Item key="1">
            <Link to="/MyList">
              <Icon type="pushpin" theme="filled" />
              <span>05.27</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/otherList">
              <Icon type="pushpin" theme="filled" />
              <span>05.28</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/otherList">
              <Icon type="pushpin" theme="filled" />
              <span>05.29</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/otherList">
              <Icon type="pushpin" theme="filled" />
              <span>05.30</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default TravelSide;
