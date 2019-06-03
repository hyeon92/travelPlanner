import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import SignUp from 'page/SignUp';

class SignUpContainer extends Component {
  // status값에 따라 반응
  componentDidUpdate() {
    const { status } = this.props;

    if (status === 'success') {
      this.props.history.push('/');
    } else if (status === 'error') {
      alert('다시 입력해주세요');

      // status 값 초기화
      userActions.basicStatus();
    }
  }
  // ID 변경
  handleEditID = e => {
    const { userActions } = this.props;
    userActions.editID(e.target.value);
  };

  //이름 변경
  handleEditName = e => {
    const { userActions } = this.props;
    userActions.editName(e.target.value);
  };

  // PW 변경
  handleEditPW = e => {
    const { userActions } = this.props;
    userActions.editPW(e.target.value);
  };

  // 회원가입 버튼 클릭
  handleSignUp = e => {
    const { userActions, user } = this.props;
    userActions.signup(user);
  };

  render() {
    const { user } = this.props;
    const { handleEditID, handleEditName, handleEditPW, handleSignUp } = this;

    return (
      <SignUp
        user={user}
        onEditID={handleEditID}
        onEditName={handleEditName}
        onEditPW={handleEditPW}
        onSignUp={handleSignUp}
      />
    );
  }
}

export default connect(
  state => ({ user: state.user.user, status: state.user.status }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(SignUpContainer);
