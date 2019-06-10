import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const EDITTITLE = 'editTitle';
const EDITSDATE = 'editsDate';
const ADDSCHEDULE = 'addSchedule';
const DELSCHEDULE = 'delSchedule';

//액션 생성 함수 만들기
export const editTitle = createAction(EDITTITLE);
export const editsDate = createAction(EDITSDATE);
export const addSchedule = createAction(ADDSCHEDULE);
export const delSchedule = createAction(DELSCHEDULE);

//모듈 초기상태 정의
const initialState = {
  eventNm: null,
  status: 'pending',
  travel: {
    key: null,
    id: null,
    sDate: moment().format('YYYY-MM-DD'),
    eDate: moment().format('YYYY-MM-DD'),
    title: moment().format('YYYY-MM-DD') + ' 여행계획',
    day: [
      {
        id: 1,
        title: '1일차',
        date: moment().format('YYYY-MM-DD')
      }
    ]
  }
};

// 여행 계획 들고오기
export const getTravelList = (userId, key) => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get('http://localhost:4000/travels/select/' + userId + '/' + key)
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

// 여행 계획 업데이트
export const saveTravelList = travel => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .post(
      'http://localhost:4000/travels/update/' + travel.id + '/' + travel.key,
      {
        params: {
          sDate: travel.sDate,
          eDate: travel.eDate,
          title: travel.title,
          day: travel.day
        }
      }
    )
    .then(respone => {
      dispatch({
        type: GET_POST_SUCCESS,
        eventNm: 'saveTravelList',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST_FAILURE,
        eventNm: 'saveTravelList',
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
      // 여행 마지막 날짜 계산
      // 일자 변경 시 날짜 차이 계산
      let day = state.travel.day;
      const bDate = moment(action.payload, 'YYYY-MM-DD').diff(
        state.travel.sDate,
        'days'
      );
      const eDate = moment(state.travel.eDate)
        .add(bDate, 'days')
        .format('YYYY-MM-DD');

      // 날짜 차이가 난 만큼 각각 일자에 대해 계산
      for (let i = 0; i < day.length; i++) {
        day[i].date = moment(day[i].date)
          .add(bDate, 'days')
          .format('YYYY-MM-DD');
      }

      return {
        ...state,
        travel: {
          ...state.travel,
          sDate: action.payload,
          eDate: eDate,
          day: day
        }
      };
    },

    // 여행 일정 추가
    [ADDSCHEDULE]: (state, action) => {
      let id = 1;
      if (state.travel.day.length == 0) {
        id = 1;
      } else {
        id = state.travel.day[state.travel.day.length - 1].id + 1;
      }
      return {
        ...state,
        travel: {
          ...state.travel,
          eDate: moment(state.travel.sDate)
            .add(state.travel.day.length, 'days')
            .format('YYYY-MM-DD'),
          day: [
            ...state.travel.day,
            {
              id: id,
              title: `${state.travel.day.length + 1}일차`,
              date: moment(state.travel.sDate)
                .add(state.travel.day.length, 'days')
                .format('YYYY-MM-DD')
            }
          ]
        }
      };
    },

    // 여행 일정 삭제
    [DELSCHEDULE]: (state, action) => {
      let day = state.travel.day;
      // 선택한 여행일정 삭제
      day.splice(
        day.findIndex(function(item) {
          return item.id === action.payload;
        }),
        1
      );

      // 여행 일정 날짜에 맞춰 정렬
      const eDate = moment(state.travel.sDate)
        .add(day.length - 1, 'days')
        .format('YYYY-MM-DD');
      for (let i = 0; i < day.length; i++) {
        day[i].title = `${i + 1}일차`;
        day[i].date = moment(state.travel.sDate)
          .add(i, 'days')
          .format('YYYY-MM-DD');
      }

      return { ...state, travel: { ...state.travel, eDate: eDate, day: day } };
    },

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
          travel: action.payload.data,
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
