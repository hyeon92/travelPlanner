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
  eventNm: null,
  user: {
    user_id: '',
    password: '',
    name: '',
    travel: []
  }
};

// 로그인
export const singin = user => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get('http://localhost:4000/users/select', {
      params: {
        user_id: user.user_id,
        password: user.password
      }
    })
    .then(respone => {
      dispatch({
        type: GET_POST_SUCCESS,
        eventNm: 'singin',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST_FAILURE,
        eventNm: 'singin',
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
        user_id: user.user_id,
        name: user.name,
        password: user.password
      }
    })
    .then(respone => {
      dispatch({
        type: GET_POST_SUCCESS,
        eventNm: 'signup',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST_FAILURE,
        eventNm: 'signup',
        payload: error
      });
    });
};

// 여행 계획 정보 들고오기
export const getTravelList = info => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get(
      'http://localhost:4000/travels/selectAll/' +
        info.listName +
        '/' +
        info.user_id
    )
    .then(respone => {
      dispatch({
        type: GET_POST_SUCCESS,
        eventNm: 'getTravelList',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST_FAILURE,
        eventNm: 'getTravelList',
        payload: error
      });
    });
};
export default handleActions(
  {
    // edit ID
    [EDITID]: (state, action) => {
      return {
        ...state,
        eventNm: EDITID,
        user: { ...state.user, user_id: action.payload }
      };
    },

    // edit Password
    [EDITPW]: (state, action) => {
      return {
        ...state,
        eventNm: EDITPW,
        user: { ...state.user, password: action.payload }
      };
    },

    // edit Name
    [EDITNAME]: (state, action) => {
      return {
        ...state,
        eventNm: EDITNAME,
        user: { ...state.user, name: action.payload }
      };
    },

    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        status: 'pending',
        eventNm: action.eventNm
      };
    },
    [GET_POST_SUCCESS]: (state, action) => {
      return {
        ...state,
        status: 'success',
        eventNm: action.eventNm,
        user: action.payload.data
      };
    },
    [GET_POST_FAILURE]: (state, action) => {
      return {
        ...state,
        status: 'error',
        eventNm: action.eventNm
      };
    }
  },
  initialState
);
