/* global daum */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as travelActions from 'store/module/travel';
import * as dayActions from 'store/module/day';
import Travel from 'page/Travel';
import TravelSide from 'page/side/TravelSide';
import storage from 'lib/storage';

class TravelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [], // 마커를 저장하는 배열입니다.
      infoWindows: [] // 마커의 말풍선을 저장하는 배열입니다.
    };
  }

  componentDidMount() {
    const { travelList } = this.props;
    const { dayActions, travelActions } = this.props;
    const {
      match: {
        params: { travel_id, day_id }
      }
    } = this.props;

    // 데이터를 가져오기 위해 파라미터를 세팅합니다
    const info = {};
    const userInfo = storage.get('userInfo');

    info.user_id = userInfo.user_id;
    info.travel_id = travel_id;
    info.day_id = day_id;

    // 사이드 메뉴에 필요한 여행 정보를 가져옵니다.
    travelActions.getTravelInfo(info);

    // 메인 화면에 필요한 지역 정보를 가져옵니다.
    dayActions.getAreaList(info);

    // 새로운 여행정보일 경우 travel_id, user_id를 설정합니다.
    if (travelList.travel_id === null) {
      travelActions.setId(info);
    }

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    this.setState({
      map: new daum.maps.Map(mapContainer, mapOption)
    });
  }

  componentDidUpdate() {
    const {
      tStatus,
      tBEventNm,
      tNEventNm,
      dStatus,
      dNEventNm,
      day
    } = this.props;
    const { travelActions } = this.props;

    // 사이드 메뉴의 저장버튼을 눌러 저장 후 성공여부에 따라 반응합니다.
    if (tNEventNm === 'SAVE_TRAVEL_LIST') {
      if (tBEventNm !== 'SAVE_TRAVEL_LIST' && tStatus === 'SUCCESS') {
        alert('여행 일정 저장이 완료되었습니다');
        travelActions.clearEventNm();
      } else if (tStatus === 'ERROR') {
        alert('여행 일정 저장 중 오류가 생겼습니다. 다시 시도해주십시오');
      }
    }

    if (dNEventNm === 'GET_AREA_LIST') {
      // 장소 정보를 가져온 후 성공여부에 따라
      // 지도에 마커를 생성하고 지도 중앙에 모든 마커가 보일 수 있게 지도 중심이 이동합니다.
      if (dStatus === 'SUCCESS') {
        if (day.area.length === 0) {
          // 지역 정보가 하나도 없을 경우 마커 생성 및 지도 이동이 불필효합니다.
          for (let i = 0; i < this.state.markers.length; i++) {
            // 지도에 마커가 있을 경우 마커를 삭제합니다.
            this.state.markers[i].setMap(null);
            // 지도에 마커 정보가 있을 경우 마커 정보를 삭제합니다.
            this.state.infoWindows[i].close();
          }
        } else {
          // 지도에서 보여질 범위를 설정할 수 있는 변수를 생성합니다.
          const bounds = new daum.maps.LatLngBounds();

          for (let i = 0; i < day.area.length; i++) {
            // 지도에 마커를 표시하기 위해 위도와 경도를 지정합니다.
            const points = new daum.maps.LatLng(
              day.area[i].location_y,
              day.area[i].location_x
            );

            // 위도와 경도를 지정한 위치에 마커 객체를 생성합니다.
            const marker = new daum.maps.Marker({
              position: points
            });

            // 마커 정보가 어떻게 보여질 지를 정합니다.
            const content = `<div style="padding:5px;font-weight:bold;font-size:14px;border-radius:6px">${
              day.area[i].place_name
            }</div>`;

            // 마커 바로 위에 정보가 보여지도록 설정합니다.
            const infoWindow = new daum.maps.InfoWindow({
              position: points,
              content: content,
              yAnchor: 1
            });

            // 지도에 마커를 뿌려줍니다.
            this.state.markers.push(marker);
            marker.setMap(this.state.map);

            // 마커 위에 인포윈도우를 표시합니다.
            this.state.infoWindows.push(infoWindow);
            infoWindow.open(this.state.map, marker);

            // 뿌려준 마커가 한번에 보여지도록 위경도를 포함시킵니다.
            bounds.extend(points);
          }

          // 저장된 위도와 경도가 모두 보이는 범위로 지도를 이동시킵니다.
          this.state.map.setBounds(bounds);
        }
      }
    }
  }

  // 여행 제목을 입력한 값으로 변경합니다.
  handleEditTitle = e => {
    const { travelActions } = this.props;

    travelActions.editTitle(e.target.value);
  };

  // 여행 시작일자를 입력한 값으로 변경합니다.
  handleEditsDate = (e, value) => {
    const { travelActions } = this.props;

    travelActions.editsDate(value);
  };

  // 사이드 메뉴의 여행 일정 추가 버튼을 클릭하여 추가합니다.
  handleAddSchedule = e => {
    const { travelActions } = this.props;

    travelActions.addSchedule();
  };

  // 사이드 메뉴의 여행 일정 삭제 버튼을 클릭하여 삭제합니다.
  handleDelSchedule = travel_id => {
    const { travelActions } = this.props;
    const {
      match: {
        params: { list }
      }
    } = this.props;

    travelActions.delSchedule(travel_id);
    this.props.history.push(`/${list}/${travel_id}/1`);
  };

  // 여행계획 저장 버튼을 클릭하여 저장합니다.
  handleSaveTravel = e => {
    const { travelActions } = this.props;
    const { travelList } = this.props;

    travelActions.saveTravelList(travelList);
  };

  // 사이드 메뉴의 여행 일정을 클릭하여 해당 일정의 장소 정보를 보여줍니다.
  handleChangeDay = e => {
    const { dayActions } = this.props;
    const {
      match: {
        params: { list, travel_id }
      }
    } = this.props;

    // 장소 데이터를 가져오기 위해 파라미터를 세팅합니다.
    const info = {};
    const userInfo = storage.get('userInfo');

    info.user_id = userInfo.user_id;
    info.travel_id = travel_id;
    info.day_id = e;

    // 장소 정보를 가져옵니다.
    dayActions.getAreaList(info);
    this.props.history.push(`/${list}/${travel_id}/${e}`);
  };

  // 장소 정보를 수정하는 화면으로 이동합니다.
  handleMoveArea = e => {
    const {
      match: {
        params: { list, travel_id, day_id }
      }
    } = this.props;
    this.props.history.push(`/${list}/${travel_id}/${day_id}/${e}`);
  };

  // 장소 삭제 버튼을 클릭하여 장소 정보를 삭제합니다.
  handleDelArea = e => {
    const { dayActions } = this.props;
    const {
      match: {
        params: { travel_id, day_id }
      }
    } = this.props;

    // 장소 데이터를 삭제하기 위해 파라미터를 세팅합니다.
    const info = {};
    const userInfo = storage.get('userInfo');

    info.user_id = userInfo.user_id;
    info.travel_id = travel_id;
    info.day_id = day_id;
    info.area_id = e;

    dayActions.delArea(info);
  };

  render() {
    const { travelList, day } = this.props;
    const {
      handleEditTitle,
      handleEditsDate,
      handleAddSchedule,
      handleDelSchedule,
      handleSaveTravel,
      handleChangeDay,
      handleMoveArea,
      handleDelArea
    } = this;

    return (
      <Fragment>
        <TravelSide
          travelList={travelList}
          onEditTitle={handleEditTitle}
          onEditsDate={handleEditsDate}
          onAddSchedule={handleAddSchedule}
          onDelSchedule={handleDelSchedule}
          onSaveTravel={handleSaveTravel}
          onChangeDay={handleChangeDay}
        />
        <div
          style={{
            marginLeft: 200,
            padding: 24,
            background: '#F7ECEB',
            minHeight: 1000
          }}
        >
          <div id="map" style={{ height: 300 }} />

          <Travel
            areaList={day}
            params={this.props.match.params}
            onMoveArea={handleMoveArea}
            onDelArea={handleDelArea}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    travelList: state.travel.travel,
    tStatus: state.travel.status,
    tBEventNm: state.travel.bEventNm,
    tNEventNm: state.travel.nEventNm,
    day: state.day.day,
    dStatus: state.day.status,
    dBEventNm: state.day.bEventNm,
    dNEventNm: state.day.nEventNm
  }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    dayActions: bindActionCreators(dayActions, dispatch)
  })
)(TravelContainer);
