import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import Login from 'page/Login';

class LoginContainer extends Component {
  // status값에 따라 반응
  componentDidUpdate() {
    const { status, eventNm } = this.props;
    // 로그인 버튼 클릭 이벤트
    if (eventNm === 'singin') {
      if (status === 'success') {
        this.props.history.push('/MyList');
      } else if (status === 'error') {
        alert('아이디 혹은 비밀번호가 맞지 않습니다.');
      }
    }
  }

  // ID 변경
  handleEditID = e => {
    const { userActions } = this.props;
    userActions.editID(e.target.value);
  };

  // PW 변경
  handleEditPW = e => {
    const { userActions } = this.props;
    userActions.editPW(e.target.value);
  };

  // 로그인 버튼 클릭 이벤트
  handleLogin = () => {
    const { userActions, user } = this.props;
    userActions.singin(user);
  };

  render() {
    const { user } = this.props;
    const { handleEditID, handleEditPW, handleLogin } = this;

    return (
      <div
        style={{
          padding: 24,
          background: '#F7ECEB',
          minHeight: 1000
        }}
      >
        <Login
          user={user}
          onEditID={handleEditID}
          onEditPW={handleEditPW}
          onLogin={handleLogin}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    status: state.user.status,
    eventNm: state.user.eventNm
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(LoginContainer);
