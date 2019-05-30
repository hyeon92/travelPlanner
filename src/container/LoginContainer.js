import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import Login from 'page/Login';

class LoginContainer extends Component {
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
  handleLogin = e => {
    const { userActions } = this.props;
    const { user } = this.props;
    userActions.login();
    console.log(user);
    //this.props.history.push('/home');
  };

  render() {
    const { user } = this.props;
    const { handleEditID, handleEditPW, handleLogin } = this;

    return (
      <Login
        user={user}
        onEditID={handleEditID}
        onEditPW={handleEditPW}
        onLogin={handleLogin}
      />
    );
  }
}

export default connect(
  state => ({ user: state.user.user }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(LoginContainer);
