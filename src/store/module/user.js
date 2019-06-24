import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';

//액션 타입 정의
const PENDING = 'USER_PENDING';
const SUCCESS = 'USER_SUCCESS';
const FAILURE = 'USER_AILURE';

const EDIT_ID = 'EDIT_ID';
const EDIT_PW = 'EDIT_PW';
const EDIT_NAME = 'EDIT_NAME';
const CLEAR_USER = 'CLEAR_USER';

//액션 생성 함수 만들기
export const editID = createAction(EDIT_ID);
export const editPW = createAction(EDIT_PW);
export const editName = createAction(EDIT_NAME);
export const clearUser = createAction(CLEAR_USER);

//모듈 초기상태 정의
const initialState = {
  status: 'PENDING',
  bEventNm: null,
  nEventNm: null,
  user: {
    user_id: '',
    password: '',
    name: '',
    travel: []
  }
};

// 로그인
export const singin = user => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .get('http://localhost:4000/users/select', {
      params: {
        user_id: user.user_id,
        password: user.password
      }
    })
    .then(respone => {
      dispatch({
        type: SUCCESS,
        eventNm: 'SIGN_IN',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'SIGN_IN',
        payload: error
      });
    });
};

// 회원가입
export const signup = user => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .post('http://localhost:4000/users/insert', {
      params: {
        user_id: user.user_id,
        name: user.name,
        password: user.password
      }
    })
    .then(respone => {
      dispatch({
        type: SUCCESS,
        eventNm: 'SIGN_UP',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'SIGN_UP',
        payload: error
      });
    });
};

// 여행 계획 정보 들고오기
export const getTravelList = info => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .get(
      'http://localhost:4000/travels/selectAll/' +
        info.listName +
        '/' +
        info.user_id
    )
    .then(respone => {
      dispatch({
        type: SUCCESS,
        eventNm: 'GET_TRAVEL_LIST',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'GET_TRAVEL_LIST',
        payload: error
      });
    });
};
export default handleActions(
  {
    // edit ID
    [EDIT_ID]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_ID,
        status: 'SUCCESS',
        user: { ...state.user, user_id: action.payload }
      };
    },

    // edit Password
    [EDIT_PW]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_PW,
        status: 'SUCCESS',
        user: { ...state.user, password: action.payload }
      };
    },

    // edit Name
    [EDIT_NAME]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_NAME,
        status: 'SUCCESS',
        user: { ...state.user, name: action.payload }
      };
    },

    // 유저 정보 클리어
    [CLEAR_USER]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: CLEAR_USER,
        status: 'SUCCESS',
        user: { user_id: '', password: '', name: '' }
      };
    },

    [PENDING]: (state, action) => {
      return {
        ...state,
        status: 'PENDING'
      };
    },
    [SUCCESS]: (state, action) => {
      return {
        ...state,
        status: 'SUCCESS',
        bEventNm: state.nEventNm,
        nEventNm: action.eventNm,
        user: action.payload.data
      };
    },
    [FAILURE]: (state, action) => {
      return {
        ...state,
        status: 'ERROR',
        bEventNm: state.nEventNm,
        nEventNm: action.eventNm
      };
    }
  },
  initialState
);
