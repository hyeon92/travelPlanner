import { handleActions } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const GET_POST_PENDING = 'GET_POST_AREA_PENDING';
const GET_POST_SUCCESS = 'GET_POST_AREA_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_AREA_FAILURE';

//액션 생성 함수 만들기

//모듈 초기상태 정의
const initialState = {
  eventNm: null,
  status: 'pending',
  day: {
    day_id: null,
    title: null,
    date: moment().format('YYYY-MM-DD'),
    area: []
  }
};

// 여행 하루 일정에 대한 모든 지역 들고오기
export const getAreaList = info => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get(
      'http://localhost:4000/areas/selectAll/' +
        info.user_id +
        '/' +
        info.travel_id +
        '/' +
        info.day_id
    )
    .then(respone => {
      dispatch({
        type: GET_POST_SUCCESS,
        eventNm: 'getAreaList',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST_FAILURE,
        eventNm: 'getAreaList',
        payload: error
      });
    });
};

export default handleActions(
  {
    [GET_POST_PENDING]: (state, action) => {
      return {
        ...state,
        status: 'pending'
      };
    },
    [GET_POST_SUCCESS]: (state, action) => {
      if (action.payload.data) {
        return {
          ...state,
          status: 'success',
          day: action.payload.data,
          eventNm: action.eventNm
        };
      } else {
        return {
          ...state,
          status: 'success',
          eventNm: action.eventNm
        };
      }
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
