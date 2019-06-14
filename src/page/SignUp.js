import React from 'react';
import { Typography, Input, Button } from 'antd';

const SignUp = ({ user, onEditID, onEditName, onEditPW, onSignUp }) => {
  if (!user) {
    user = {
      user_id: null,
      password: null,
      name: null
    };
  }
  return (
    <div>
      <Typography.Title>회원가입</Typography.Title>
      <Typography.Title level={4}>아이디</Typography.Title>
      <Input
        placeholder="ID"
        allowClear
        value={user.user_id}
        onChange={onEditID}
      />
      <Typography.Title level={4}>이름</Typography.Title>
      <Input
        placeholder="Name"
        allowClear
        value={user.name}
        onChange={onEditName}
      />
      <Typography.Title level={4}>비밀번호</Typography.Title>
      <Input.Password
        placeholder="Password"
        value={user.password}
        onChange={onEditPW}
      />
      <br />
      <Button type="primary" ghost onClick={onSignUp}>
        회원가입
      </Button>
    </div>
  );
};
export default SignUp;
