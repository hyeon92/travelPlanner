import React from 'react';
import { Typography, Input, Button } from 'antd';

const SignUp = () => {
  return (
    <div>
      <Typography.Title>회원가입</Typography.Title>
      <Typography.Title level={4}>아이디</Typography.Title>
      <Input placeholder="ID" allowClear />
      <Typography.Title level={4}>이름</Typography.Title>
      <Input placeholder="Name" allowClear />
      <Typography.Title level={4}>비밀번호</Typography.Title>
      <Input.Password placeholder="Password" />
      <br />
      <Button type="primary" ghost>
        회원가입
      </Button>
    </div>
  );
};
export default SignUp;
