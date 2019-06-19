import React from 'react';
import { Typography, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const Login = ({ user, onEditID, onEditPW, onLogin }) => {
  if (!user) {
    user = {
      user_id: null,
      password: null
    };
  }
  return (
    <div>
      <Typography.Title>로그인</Typography.Title>
      <Typography.Title level={4}>아이디</Typography.Title>
      <Input
        placeholder="ID"
        allowClear
        value={user.user_id}
        onChange={onEditID}
      />
      <Typography.Title level={4}>비밀번호</Typography.Title>
      <Input.Password
        placeholder="Password"
        value={user.password}
        onChange={onEditPW}
      />
      <Button
        onClick={onLogin}
        size="large"
        style={{
          background: '#545871',
          color: '#FFFFFF',
          fontSize: '24px',
          marginTop: '10px',
          marginRight: '10px'
        }}
      >
        로그인
      </Button>
      <Link to="/SignUp/Insert">
        <Button
          size="large"
          style={{ background: '#545871', color: '#FFFFFF', fontSize: '24px' }}
        >
          회원가입
        </Button>
      </Link>
    </div>
  );
};

export default Login;
