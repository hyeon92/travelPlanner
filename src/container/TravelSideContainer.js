import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import TravelSide from 'page/side/TravelSide';

class TravelSideContainer extends Component {
  componentDidMount() {
    const { user, travel, travelActions } = this.props;

    // travelActions.getTravelList(user.id);
    // travelActions.getTravelList('123');
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

  // 여행 마지막일자 변경
  handleEditeDate = (e, value) => {
    const { travelActions } = this.props;

    travelActions.editeDate(value);
  };

  // 여행 시작일자 선택 캘린더에서 선택할 수 있는 날짜 구분
  handleDisabledsDate = current => {
    const { travelList } = this.props;

    const endValue = moment(travelList.eDate);

    return current && current > endValue;
  };

  // 여행 마지막일자 선택 캘린더에서 선택할 수 있는 날짜 구분
  handleDisabledeDate = current => {
    const { travelList } = this.props;

    const startValue = moment(travelList.sDate);

    return current && current < startValue;
  };

  render() {
    const { user, travelList } = this.props;
    const {
      handleEditTitle,
      handleEditsDate,
      handleEditeDate,
      handleDisabledsDate,
      handleDisabledeDate
    } = this;

    return (
      <TravelSide
        travelList={travelList}
        onEditTitle={handleEditTitle}
        onEditsDate={handleEditsDate}
        onEditeDate={handleEditeDate}
        onDisabledsDate={handleDisabledsDate}
        onDisabledeDate={handleDisabledeDate}
      />
    );
  }
}

export default connect(
  state => ({ user: state.user.user, travelList: state.travel.travel }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(TravelSideContainer);
