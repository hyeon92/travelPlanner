/* global daum */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as travelActions from 'store/module/travel';
import * as dayActions from 'store/module/day';
import Travel from 'page/Travel';
import TravelSide from 'page/side/TravelSide';

class TravelContainer extends Component {
  componentDidMount() {
    const { dayActions, travelActions } = this.props;

    // 데이터를 가져오기 위해 파라미터 세팅
    const params = this.props.match.params;
    const info = {};

    info.user_id = '123';
    info.travel_id = params.travel_id;
    info.day_id = params.day_id;

    // 여행 정보, 지역 정보 들고오기
    travelActions.getTravelList(info);
    dayActions.getAreaList(info);

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    new daum.maps.Map(mapContainer, mapOption);
  }

  componentDidUpdate() {
    const { travelStatus, travelEventNm } = this.props;
    const { travelActions } = this.props;

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
        travelActions.getTravelList(info);
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

  render() {
    const { travelList, day } = this.props;
    const {
      handleEditTitle,
      handleEditsDate,
      handleAddSchedule,
      handleDelSchedule,
      handleSaveTravel
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

          <Travel areaList={day} params={this.props.match.params} />
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
    day: state.day.day
  }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    dayActions: bindActionCreators(dayActions, dispatch)
  })
)(TravelContainer);
