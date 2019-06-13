/* global daum */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import * as areaActions from 'store/module/area';
import Travel from 'page/Travel';
import TravelSide from 'page/side/TravelSide';

class TravelContainer extends Component {
  componentDidMount() {
    const { travelActions } = this.props;

    travelActions.getTravelList('123', 1);

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    new daum.maps.Map(mapContainer, mapOption);
  }

  componentDidUpdate() {
    const { travelList, travelStatus, travelEventNm, areaList } = this.props;
    const { travelActions, areaActions } = this.props;

    // 여행 계획 저장
    if (travelEventNm === 'saveTravelList') {
      if (travelStatus === 'success') {
        alert('저장이 완료되었습니다.');
        travelActions.getTravelList('123', 1);
      } else if (travelStatus === 'error') {
        alert('저장 중 오류가 생겼습니다. 다시 시도해주십시오');
      }
    }

    // 지역 리스트 불러오기
    if (
      travelEventNm === 'getTravelList' &&
      travelStatus === 'success' &&
      areaList == null
    ) {
      areaActions.getAreaList(travelList, this.props.match.params.id);
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
  handleDelSchedule = key => {
    const { travelActions } = this.props;

    travelActions.delSchedule(key);
  };

  // 여행계획 저장
  handleSaveTravel = e => {
    const { travelActions } = this.props;
    const { travelList } = this.props;

    travelActions.saveTravelList(travelList);
  };

  render() {
    const { travelList, areaList } = this.props;
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

          <Travel areaList={areaList} />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    travelList: state.travel.travel,
    travelStatus: state.travel.status,
    travelEventNm: state.travel.eventNm,
    areaList: state.area.area
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    travelActions: bindActionCreators(travelActions, dispatch),
    areaActions: bindActionCreators(areaActions, dispatch)
  })
)(TravelContainer);
