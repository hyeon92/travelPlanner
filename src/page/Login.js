import React from 'react';
import { Typography, Input, Button } from 'antd';

const Login = () => {
  return (
    <div>
      <Typography.Title>로그인</Typography.Title>
      <Typography.Title level={4}>아이디</Typography.Title>
      <Input placeholder="ID" allowClear />
      <Typography.Title level={4}>비밀번호</Typography.Title>
      <Input.Password placeholder="Password" />
      <Button type="primary">로그인</Button>
    </div>
  );
};
export default Login;
