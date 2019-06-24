import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import Login from 'page/Login';
import storage from 'lib/storage';

class LoginContainer extends Component {
  componentDidMount() {
    const { userActions } = this.props;

    userActions.clearUser();
  }

  componentDidUpdate() {
    const { status, bEventNm, nEventNm, user } = this.props;

    // 로그인 버튼 클릭 시 성공여부에 따라 반응합니다.
    if (nEventNm === 'SIGN_IN') {
      if (bEventNm !== 'SIGN_IN' && status === 'SUCCESS') {
        //세션에 로그인 정보를 저장합니다.
        storage.set('userInfo', {
          user_id: user.user_id,
          password: user.password,
          name: user.name
        });

        // /MyList로 이동합니다.
        this.props.history.push('/MyList');
      } else if (status === 'ERROR') {
        alert('아이디 혹은 비밀번호가 맞지 않습니다.');
      }
    }
  }

  // ID를 입력한 값으로 변경합니다.
  handleEditID = e => {
    const { userActions } = this.props;
    userActions.editID(e.target.value);
  };

  // PW를 입력한 값으로 변경합니다.
  handleEditPW = e => {
    const { userActions } = this.props;
    userActions.editPW(e.target.value);
  };

  // 로그인 버튼을 클릭합니다.
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
    bEventNm: state.user.bEventNm,
    nEventNm: state.user.nEventNm
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(LoginContainer);
