import { handleActions } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const PENDING = 'DAY_PENDING';
const SUCCESS = 'DAY_SUCCESS';
const FAILURE = 'DAY_FAILURE';

//액션 생성 함수 만들기

//모듈 초기상태 정의
const initialState = {
  status: 'PENDING',
  bEventNm: null,
  nEventNm: null,
  day: {
    day_id: null,
    title: null,
    date: moment().format('YYYY-MM-DD'),
    area: []
  }
};

// 여행 하루 일정에 대한 모든 지역 들고오기
export const getAreaList = info => dispatch => {
  dispatch({ type: PENDING });

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
        type: SUCCESS,
        eventNm: 'GET_AREA_LIST',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'GET_AREA_LIST',
        payload: error
      });
    });
};

export default handleActions(
  {
    [PENDING]: (state, action) => {
      return {
        ...state,
        status: 'PENDING'
      };
    },
    [SUCCESS]: (state, action) => {
      if (action.payload.data) {
        return {
          ...state,
          status: 'SUCCESS',
          day: action.payload.data,
          bEventNm: state.nEventNm,
          nEventNm: action.eventNm
        };
      } else {
        return {
          ...state,
          status: 'SUCCESS',
          bEventNm: state.nEventNm,
          nEventNm: action.eventNm
        };
      }
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
