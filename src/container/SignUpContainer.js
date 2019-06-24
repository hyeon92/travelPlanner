import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import SignUp from 'page/SignUp';

class SignUpContainer extends Component {
  componentDidMount() {
    const { userActions } = this.props;

    userActions.clearUser();
  }

  componentDidUpdate() {
    const { status, bEventNm, nEventNm } = this.props;

    // 회원 가입 버튼 클릭 시 성공여부에 따라 반응합니다.
    if (nEventNm === 'SIGN_UP') {
      if (bEventNm !== 'SIGN_UP' && status === 'SUCCESS') {
        alert('회원가입이 완료되었습니다. 다시 로그인해주시기 바랍니다.');

        // /로 이동합니다.
        this.props.history.push('/');
      } else if (status === 'ERROR') {
        alert('다시 입력해주세요');
      }
    }
  }
  // ID를 입력한 값으로 변경합니다.
  handleEditID = e => {
    const { userActions } = this.props;
    userActions.editID(e.target.value);
  };

  // 이름을 입력한 값으로 변경합니다.
  handleEditName = e => {
    const { userActions } = this.props;
    userActions.editName(e.target.value);
  };

  // PW를 입력한 값으로 변경합니다.
  handleEditPW = e => {
    const { userActions } = this.props;
    userActions.editPW(e.target.value);
  };

  // 회원가입 버튼을 클릭합니다.
  handleSignUp = e => {
    const { userActions, user } = this.props;
    userActions.signup(user);
  };

  render() {
    const { user } = this.props;
    const { handleEditID, handleEditName, handleEditPW, handleSignUp } = this;

    return (
      <div
        style={{
          padding: 24,
          background: '#F7ECEB',
          minHeight: 1000
        }}
      >
        <SignUp
          user={user}
          onEditID={handleEditID}
          onEditName={handleEditName}
          onEditPW={handleEditPW}
          onSignUp={handleSignUp}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    status: state.user.status,
    bEventNm: state.user.bEventNm,
    nEventNm: state.user.nEventNm
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(SignUpContainer);
