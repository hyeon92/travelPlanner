import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const EDITTITLE = 'editTitle';
const EDITSDATE = 'editsDate';
const EDITEDATE = 'editeDate';

//액션 생성 함수 만들기
export const editTitle = createAction(EDITTITLE);
export const editsDate = createAction(EDITSDATE);
export const editeDate = createAction(EDITEDATE);

//모듈 초기상태 정의
const initialState = {
  status: 'pending',
  travel: {
    key: null,
    id: null,
    sDate: moment().format('YYYY-MM-DD'),
    eDate: moment()
      .add(7, 'days')
      .calendar(),
    title: null,
    day: null
  }
};

// 여행 리스트 들고오기
export const getTravelList = userId => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get('http://localhost:4000/travels/select/' + userId)
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

export default handleActions(
  {
    // 여행 타이틀 변경
    [EDITTITLE]: (state, action) => {
      return { ...state, travel: { ...state.travel, title: action.payload } };
    },

    // 여행 시작일자 변경
    [EDITSDATE]: (state, action) => {
      return { ...state, travel: { ...state.travel, sDate: action.payload } };
    },

    // 여행 마지막일자 변경
    [EDITEDATE]: (state, action) => {
      return { ...state, travel: { ...state.travel, eDate: action.payload } };
    },

    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        status: 'pending'
      };
    },
    [GET_POST_SUCCESS]: (state, action) => {
      console.log(action.payload.data);
      return {
        ...state,
        status: 'success',
        travel: action.payload.data.travel

        // travel: {
        //   key: null,
        //   id: null,
        //   sDate: null,
        //   eDate: null,
        //   title: null
        // },
        // user: {
        //   id: action.payload.data.id,
        //   password: action.payload.data.password,
        //   name: action.payload.data.name
        // }
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
