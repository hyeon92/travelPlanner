import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import TravelSide from 'page/side/TravelSide';

class TravelSideContainer extends Component {
  // status값에 따라 반응
  componentDidUpdate() {
    const { status, eventNm } = this.props;
    const { travelActions } = this.props;

    if (status === 'success' && eventNm === 'saveTravelList') {
      alert('저장이 완료되었습니다.');
      travelActions.getTravelList('123', 1);
    } else if (status === 'error' && eventNm === 'saveTravelList') {
      alert('저장 중 오류가 생겼습니다. 다시 시도해주십시오');
    }
  }
  componentDidMount() {
    const { travelActions } = this.props;

    // travelActions.getTravelList(user.id, 1);
    travelActions.getTravelList('123', 1);
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
    const { travelList } = this.props;
    const {
      handleEditTitle,
      handleEditsDate,
      handleAddSchedule,
      handleDelSchedule,
      handleSaveTravel
    } = this;

    return (
      <TravelSide
        travelList={travelList}
        onEditTitle={handleEditTitle}
        onEditsDate={handleEditsDate}
        onAddSchedule={handleAddSchedule}
        onDelSchedule={handleDelSchedule}
        onSaveTravel={handleSaveTravel}
      />
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    travelList: state.travel.travel,
    status: state.travel.status,
    eventNm: state.travel.eventNm
  }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(TravelSideContainer);
