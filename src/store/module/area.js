import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const GET_POST_PENDING = 'GET_POST_AREA_PENDING';
const GET_POST_SUCCESS = 'GET_POST_AREA_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_AREA_FAILURE';

const EDITPLACEINFO = 'EDIT_PLACE_INFO';
const EDITTIME = 'EDIT_TIME';
const EDITTRANSPORT = 'EDIT_TRANSPORT';
const EDITMOVETIME = 'EDIT_MOVE_TIME';
const EDITTRANSPORTCOST = 'EDIT_TRANSPORT_COST';
const EDITCOST = 'EDIT_COST';
const EDITSTAYTIME = 'EDIT_STAY_TIME';
const EDITMEMO = 'EDIT_MEMO';

//액션 생성 함수 만들기
export const editPlaceInfo = createAction(EDITPLACEINFO);
export const editTime = createAction(EDITTIME);
export const editTransport = createAction(EDITTRANSPORT);
export const editMoveTime = createAction(EDITMOVETIME);
export const editTransportCost = createAction(EDITTRANSPORTCOST);
export const editCost = createAction(EDITCOST);
export const editStayTime = createAction(EDITSTAYTIME);
export const editMemo = createAction(EDITMEMO);

//모듈 초기상태 정의
const initialState = {
  eventNm: null,
  status: 'pending',
  area: {
    area_id: null, // 고유키
    place_name: null, // 장소명
    category: null, // 장소 카테고리
    location_x: null, // x좌표
    location_y: null, // y좌표
    address: null, // 장소 주소
    time: null, // 시간대
    transport: null, // 이동수단
    move_time: moment('00:00', 'HH:mm'), // 이동시간
    transport_cost: 0, // 교통비
    cost: 0, // 비용(입장료 등 기타비용)
    stay_time: moment('00:00', 'HH:mm'), // 체류시간
    memo: null // 메모
  }
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
    // 목적지 정보 수정
    [EDITPLACEINFO]: (state, action) => {
      return {
        ...state,
        area: {
          ...state,
          place_name: action.payload.place_name,
          category: action.payload.category_group_name,
          location_x: action.payload.x,
          location_y: action.payload.y,
          address: action.payload.address_name
        }
      };
    },

    // 시간대 수정
    [EDITTIME]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          time: action.payload
        }
      };
    },

    // 이동수단 수정
    [EDITTRANSPORT]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          transport: action.payload
        }
      };
    },

    // 이동시간 수정
    [EDITMOVETIME]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          move_time: action.payload
        }
      };
    },

    // 교통비 수정
    [EDITTRANSPORTCOST]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          transport_cost: action.payload
        }
      };
    },

    // 비용(입장료 등 기타비용) 수정
    [EDITCOST]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          cost: action.payload
        }
      };
    },

    // 체류시간 수정
    [EDITSTAYTIME]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          stay_time: action.payload
        }
      };
    },

    // 메모 수정
    [EDITMEMO]: (state, action) => {
      return {
        ...state,
        area: {
          ...state.area,
          memo: action.payload
        }
      };
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
