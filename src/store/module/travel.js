import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const PENDING = 'TRAVEL_PENDING';
const SUCCESS = 'TRAVEL_SUCCESS';
const FAILURE = 'TRAVEL_FAILURE';

const EDIT_TITLE = 'EDIT_TITLE';
const EDIT_SDATE = 'EDIT_SDATE';
const ADD_SCHEDULE = 'ADD_SCHEDULE';
const DEL_SCHEDULE = 'DEL_SCHEDULE';
const SET_ID = 'SET_ID';

//액션 생성 함수 만들기
export const editTitle = createAction(EDIT_TITLE);
export const editsDate = createAction(EDIT_SDATE);
export const addSchedule = createAction(ADD_SCHEDULE);
export const delSchedule = createAction(DEL_SCHEDULE);
export const setId = createAction(SET_ID);

//모듈 초기상태 정의
const initialState = {
  bEventNm: null,
  nEventNm: null,
  status: 'PENDING',
  travel: {
    travel_id: null,
    user_id: null,
    sDate: moment().format('YYYY-MM-DD'),
    eDate: moment().format('YYYY-MM-DD'),
    title: moment().format('YYYY-MM-DD') + ' 여행계획',
    day: [
      {
        day_id: 1,
        title: '1일차',
        date: moment().format('YYYY-MM-DD')
      }
    ]
  }
};

// 여행 계획 정보 들고오기
export const getTravelInfo = info => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .get(
      'http://localhost:4000/travels/select/' +
        info.user_id +
        '/' +
        info.travel_id
    )
    .then(respone => {
      dispatch({
        type: SUCCESS,
        eventNm: 'GET_TRAVEL_INFO',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'GET_TRAVEL_INFO',
        payload: error
      });
    });
};

// 여행 계획 업데이트
export const saveTravelList = travel => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .put(
      'http://localhost:4000/travels/update/' +
        travel.user_id +
        '/' +
        travel.travel_id,
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
        type: SUCCESS,
        eventNm: 'SAVE_TRAVEL_LIST',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'SAVE_TRAVEL_LIST',
        payload: error
      });
    });
};

export default handleActions(
  {
    // 여행 타이틀 변경
    [EDIT_TITLE]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_TITLE,
        status: 'SUCCESS',
        travel: { ...state.travel, title: action.payload }
      };
    },

    // 여행 시작일자 변경
    [EDIT_SDATE]: (state, action) => {
      // 여행 마지막 날짜 계산
      // 일자 변경 시 날짜 차이 계산
      let day = state.travel.day;

      for (let i = 0; i < day.length; i++) {
        day[i].date = moment(action.payload)
          .add(i, 'days')
          .format('YYYY-MM-DD');
      }

      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_SDATE,
        status: 'SUCCESS',
        travel: {
          ...state.travel,
          sDate: action.payload,
          eDate: day[day.length - 1].date,
          day: day
        }
      };
    },

    // 여행 일정 추가
    [ADD_SCHEDULE]: (state, action) => {
      let id = 1;
      if (state.travel.day.length === 0) {
        id = 1;
      } else {
        id = state.travel.day[state.travel.day.length - 1].day_id + 1;
      }
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: ADD_SCHEDULE,
        status: 'SUCCESS',
        travel: {
          ...state.travel,
          eDate: moment(state.travel.sDate)
            .add(state.travel.day.length, 'days')
            .format('YYYY-MM-DD'),
          day: [
            ...state.travel.day,
            {
              day_id: id,
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
    [DEL_SCHEDULE]: (state, action) => {
      let day = state.travel.day;
      // 선택한 여행일정 삭제
      day.splice(
        day.findIndex(function(item) {
          return item.day_id === action.payload;
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

      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: DEL_SCHEDULE,
        status: 'SUCCESS',
        travel: { ...state.travel, eDate: eDate, day: day }
      };
    },

    // 아무 정보가 없는 여행계획의 id 설정
    [SET_ID]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: SET_ID,
        status: 'SUCCESS',
        travel: {
          ...state.travel,
          travel_id: action.payload.travel_id,
          user_id: action.payload.user_id
        }
      };
    },

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
          bEventNm: state.nEventNm,
          nEventNm: action.eventNm,
          status: 'SUCCESS',
          travel: action.payload.data
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
