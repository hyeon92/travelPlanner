/* global daum */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as travelActions from 'store/module/travel';
import * as dayActions from 'store/module/day';
import Travel from 'page/Travel';
import TravelSide from 'page/side/TravelSide';

class TravelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [], // 마커를 저장하는 배열입니다.
      infowindows: [] // 마커의 말풍선을 저장하는 배열입니다.
    };
  }
  componentDidMount() {
    const { dayActions, travelActions } = this.props;

    // 데이터를 가져오기 위해 파라미터 세팅
    const params = this.props.match.params;
    const info = {};

    info.user_id = '123';
    info.travel_id = params.travel_id;
    info.day_id = params.day_id;

    // 여행 정보, 지역 정보 들고오기
    travelActions.getTravelInfo(info);
    dayActions.getAreaList(info);

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    this.setState({
      map: new daum.maps.Map(mapContainer, mapOption)
    });
  }

  componentDidUpdate() {
    const {
      travelStatus,
      travelEventNm,
      dayStatus,
      dayEventNm,
      day
    } = this.props;
    const { travelActions } = this.props;

    if (dayEventNm === 'getAreaList') {
      if (dayStatus === 'success') {
        // 지역 정보가 하나도 없을 경우 마커와 지도 이동이 불필요합니다.
        if (day.area.length === 0) {
          for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null);
            this.state.infowindows[i].close();
          }
        } else {
          const bounds = new daum.maps.LatLngBounds();

          for (let i = 0; i < day.area.length; i++) {
            const points = new daum.maps.LatLng(
              day.area[i].location_y,
              day.area[i].location_x
            );

            const marker = new daum.maps.Marker({
              position: points
            });

            // const content = `<div style={{padding: '10px'}}>${
            //   day.area[i].place_name
            // }</div>`;
            // <div style={{ textAlign}}

            const content = `<div style="padding:5px;font-weight:bold;font-size:14px;border-radius:6px">${
              day.area[i].place_name
            }</div>`;

            const infowindow = new daum.maps.InfoWindow({
              position: points,
              content: content,
              yAnchor: 1
            });

            // areaList를 가져온 후 지도에 마커를 뿌려줍니다.
            this.state.markers.push(marker);
            marker.setMap(this.state.map);

            // 마커 위에 인포윈도우를 표시합니다.
            this.state.infowindows.push(infowindow);
            infowindow.open(this.state.map, marker);

            // 뿌려준 마커가 보여지도록 지도를 이동시킵니다.
            bounds.extend(points);
          }

          this.state.map.setBounds(bounds);
        }
      }
    }

    // 여행 계획 저장
    if (travelEventNm === 'saveTravelList') {
      if (travelStatus === 'success') {
        // 데이터를 가져오기 위한 파라미터 세팅
        const params = this.props.match.params;
        const info = {};

        info.user_id = '123';
        info.travel_id = params.travel_id;
        info.day_id = params.day_id;

        alert('저장이 완료되었습니다.');
        travelActions.getTravelInfo(info);
      } else if (travelStatus === 'error') {
        alert('저장 중 오류가 생겼습니다. 다시 시도해주십시오');
      }
    }
  }

  // 여행 제목 변경
  handleEditTitle = e => {
    const { travelActions } = this.props;

    travelActions.editTitle(e.target.value);
  };

  // 여행 시작일자 변경
  handleEditsDate = (e, value) => {
    const { travelActions } = this.props;

    travelActions.editsDate(value);
  };

  // 여행 일정 추가
  handleAddSchedule = e => {
    const { travelActions } = this.props;

    travelActions.addSchedule();
  };

  // 여행 일정 삭제
  handleDelSchedule = travel_id => {
    const { travelActions } = this.props;

    travelActions.delSchedule(travel_id);
  };

  // 여행계획 저장
  handleSaveTravel = e => {
    const { travelActions } = this.props;
    const { travelList } = this.props;

    travelActions.saveTravelList(travelList);
  };

  // 여행 일자 클릭 이벤트
  handleChangeDay = e => {
    const { dayActions } = this.props;
    // 데이터를 가져오기 위해 파라미터 세팅
    const params = this.props.match.params;
    const info = {};

    info.user_id = '123';
    info.travel_id = params.travel_id;
    info.day_id = e;

    //  지역 정보 들고오기
    dayActions.getAreaList(info);
  };

  // 지역 삭제 버튼 클릭 이벤트
  handleDelArea = e => {
    console.log('handelDelArea');
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
    travelStatus: state.travel.status,
    travelEventNm: state.travel.eventNm,
    day: state.day.day,
    dayStatus: state.day.status,
    dayEventNm: state.day.eventNm
  }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    dayActions: bindActionCreators(dayActions, dispatch)
  })
)(TravelContainer);
