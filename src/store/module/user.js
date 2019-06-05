import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

//액션 타입 정의
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const EDITID = 'editID';
const EDITPW = 'editPW';
const EDITNAME = 'editName';

//액션 생성 함수 만들기
export const editID = createAction(EDITID);
export const editPW = createAction(EDITPW);
export const editName = createAction(EDITNAME);

//모듈 초기상태 정의
const initialState = {
  status: 'pending',
  user: {
    id: '',
    password: '',
    name: ''
  }
};

// 로그인
export const singin = user => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get('http://localhost:4000/users/select', {
      params: {
        id: user.id,
        password: user.password
      }
    })
    .then(respone => {
      dispatch({
        type: GET_POST_SUCCESS,
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST_FAILURE,
        payload: error
      });
    });
};

//회원가입
export const signup = user => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .post('http://localhost:4000/users/insert', {
      params: {
        id: user.id,
        name: user.name,
        password: user.password
      }
    })
    .then(respone => {
      console.log('respone', respone);
      dispatch({
        type: GET_POST_SUCCESS,
        payload: respone
      });
    })
    .catch(error => {
      console.log('error', error);
      dispatch({
        type: GET_POST_FAILURE,
        payload: error
      });
    });
};

// 상태값 초기화
export const basicStatus = () => dispatch => {
  dispatch({ type: GET_POST_PENDING });
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

    // edit Name
    [EDITNAME]: (state, action) => {
      return { ...state, user: { ...state.user, name: action.payload } };
    },

    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        status: 'pending'
      };
    },
    [GET_POST_SUCCESS]: (state, action) => {
      return {
        ...state,
        status: 'success',
        user: {
          id: action.payload.data.id,
          password: action.payload.data.password,
          name: action.payload.data.name
        }
      };
    },
    [GET_POST_FAILURE]: (state, action) => {
      return {
        ...state,
        status: 'error'
      };
    }
  },
  initialState
);
