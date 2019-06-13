import { handleActions } from 'redux-actions';
import axios from 'axios';

//액션 타입 정의
const GET_POST_PENDING = 'GET_POST_AREA_PENDING';
const GET_POST_SUCCESS = 'GET_POST_AREA_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_AREA_FAILURE';

//액션 생성 함수 만들기

//모듈 초기상태 정의
const initialState = {
  eventNm: null,
  status: 'pending',
  id: null,
  title: null,
  area: null
};

// 여행 하루 일정 들고 오기
export const getAreaList = (travelList, key) => dispatch => {
  dispatch({ type: GET_POST_PENDING });

  return axios
    .get(
      'http://localhost:4000/areas/select/' +
        travelList.id +
        '/' +
        travelList.key +
        '/' +
        key
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
          area: action.payload.data,
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
