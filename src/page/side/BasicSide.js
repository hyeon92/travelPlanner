import React, { Component } from 'react';
import { Layout } from 'antd';
import 'page/side/MainSide.css';

class BasicSide extends Component {
  render() {
    return (
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      />
    );
  }
}

export default BasicSide;
