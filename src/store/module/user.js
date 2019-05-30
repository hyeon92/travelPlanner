import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

//액션 타입 정의
const EDITID = 'login/editID';
const EDITPW = 'login/editPW';
const LOGIN = 'login/login';

//액션 생성 함수 만들기
export const editID = createAction(EDITID);
export const editPW = createAction(EDITPW);
export const login = createAction(LOGIN);

//모듈 초기상태 정의
const initialState = {
  user: {
    id: '',
    password: '',
    name: '',
    status: false
  }
};

export default handleActions(
  {
    // edit ID
    [EDITID]: (state, action) => {
      return { ...state, user: { ...state.user, id: action.payload } };
    },

    // edit Password
    [EDITPW]: (state, action) => {
      return { ...state, user: { ...state.user, password: action.payload } };
    },

    // login event
    [LOGIN]: (state, action) => {
      let _status = state.user.status;
      axios
        .get('http://localhost:4000/users/select', {
          params: {
            id: state.user.id,
            password: state.user.password
          }
        })
        .then(function(response) {
          console.log(response.data);
          _status = true;
        })
        .catch(function(error) {
          console.log(error);
          _status = true;
        });

      console.log('_status', _status);

      return { ...state, user: { ...state.user, status: _status } };
    }
  },
  initialState
);
