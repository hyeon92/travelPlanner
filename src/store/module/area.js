import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';
import moment from 'moment';

//액션 타입 정의
const PENDING = 'AREA_PENDING';
const SUCCESS = 'AREA_SUCCESS';
const FAILURE = 'AREA_FAILURE';

const EDIT_PLACE_INFO = 'EDIT_PLACE_INFO';
const EDIT_TIME = 'EDIT_TIME';
const EDIT_TRANSPORT = 'EDIT_TRANSPORT';
const EDIT_MOVE_TIME = 'EDIT_MOVE_TIME';
const EDIT_TRANSPORT_COST = 'EDIT_TRANSPORT_COST';
const EDIT_COST = 'EDIT_COST';
const EDIT_STAY_TIME = 'EDIT_STAY_TIME';
const EDIT_MEMO = 'EDIT_MEMO';

//액션 생성 함수 만들기
export const editPlaceInfo = createAction(EDIT_PLACE_INFO);
export const editTime = createAction(EDIT_TIME);
export const editTransport = createAction(EDIT_TRANSPORT);
export const editMoveTime = createAction(EDIT_MOVE_TIME);
export const editTransportCost = createAction(EDIT_TRANSPORT_COST);
export const editCost = createAction(EDIT_COST);
export const editStayTime = createAction(EDIT_STAY_TIME);
export const editMemo = createAction(EDIT_MEMO);

//모듈 초기상태 정의
const initialState = {
  status: 'PENDING',
  bEventNm: null,
  nEventNm: null,
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

// 여행 지역 정보 들고오기 (get 1 Area Info)
export const getAreaInfo = info => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .get(
      'http://localhost:4000/areas/selectArea/' +
        info.user_id +
        '/' +
        info.travel_id +
        '/' +
        info.day_id +
        '/' +
        info.area_id
    )
    .then(respone => {
      dispatch({
        type: SUCCESS,
        eventNm: 'GET_AREA_INFO',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'GET_AREA_INFO',
        payload: error
      });
    });
};

// 장소 정보 저장
export const saveArea = (areaInfo, idInfo) => dispatch => {
  dispatch({ type: PENDING });

  return axios
    .put(
      'http://localhost:4000/areas/save/' +
        idInfo.user_id +
        '/' +
        idInfo.travel_id +
        '/' +
        idInfo.day_id +
        '/' +
        idInfo.area_id,
      {
        params: {
          area_id: parseInt(idInfo.area_id), // 고유키
          place_name: areaInfo.place_name, // 장소명
          category: areaInfo.category, // 장소 카테고리
          location_x: parseFloat(areaInfo.location_x), // x좌표
          location_y: parseFloat(areaInfo.location_y), // y좌표
          address: areaInfo.address, // 장소 주소
          time: areaInfo.time, // 시간대
          transport: areaInfo.transport, // 이동수단
          move_time: areaInfo.move_time, // 이동시간
          transport_cost: areaInfo.transport_cost, // 교통비
          cost: areaInfo.cost, // 비용(입장료 등 기타비용)
          stay_time: areaInfo.stay_time, // 체류시간
          memo: areaInfo.memo // 메모
        }
      }
    )
    .then(respone => {
      dispatch({
        type: SUCCESS,
        eventNm: 'SAVE_AREA_INFO',
        payload: respone
      });
    })
    .catch(error => {
      dispatch({
        type: FAILURE,
        eventNm: 'SAVE_AREA_INFO',
        payload: error
      });
    });
};

export default handleActions(
  {
    // 목적지 정보 수정
    [EDIT_PLACE_INFO]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_PLACE_INFO,
        status: 'SUCCESS',
        area: {
          ...state.area,
          place_name: action.payload.place_name,
          category: action.payload.category_group_name,
          location_x: action.payload.x,
          location_y: action.payload.y,
          address: action.payload.address_name
        }
      };
    },

    // 시간대 수정
    [EDIT_TIME]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_TIME,
        status: 'SUCCESS',
        area: {
          ...state.area,
          time: action.payload
        }
      };
    },

    // 이동수단 수정
    [EDIT_TRANSPORT]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_TRANSPORT,
        status: 'SUCCESS',
        area: {
          ...state.area,
          transport: action.payload
        }
      };
    },

    // 이동시간 수정
    [EDIT_MOVE_TIME]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_MOVE_TIME,
        status: 'SUCCESS',
        area: {
          ...state.area,
          move_time: action.payload
        }
      };
    },

    // 교통비 수정
    [EDIT_TRANSPORT_COST]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_TRANSPORT_COST,
        status: 'SUCCESS',
        area: {
          ...state.area,
          transport_cost: action.payload
        }
      };
    },

    // 비용(입장료 등 기타비용) 수정
    [EDIT_COST]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_COST,
        status: 'SUCCESS',
        area: {
          ...state.area,
          cost: action.payload
        }
      };
    },

    // 체류시간 수정
    [EDIT_STAY_TIME]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_STAY_TIME,
        status: 'SUCCESS',
        area: {
          ...state.area,
          stay_time: action.payload
        }
      };
    },

    // 메모 수정
    [EDIT_MEMO]: (state, action) => {
      return {
        ...state,
        bEventNm: state.nEventNm,
        nEventNm: EDIT_MEMO,
        status: 'SUCCESS',
        area: {
          ...state.area,
          memo: action.payload
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
          status: 'SUCCESS',
          bEventNm: state.nEventNm,
          nEventNm: action.eventNm,
          area: action.payload.data
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
