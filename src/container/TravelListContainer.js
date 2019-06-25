import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import TravelList from 'page/TravelList';
import MainSide from 'page/side/MainSide';
import storage from 'lib/storage';

class TravelListContainer extends Component {
  componentDidMount() {
    const { userActions } = this.props;

    const info = {};
    const userInfo = storage.get('userInfo');

    // 데이터를 가져오기 위해 파라미터를 세팅합니다.
    info.listName = this.props.match.params.list;
    info.user_id = userInfo.user_id;

    // listName에 따라 본인 또는 본인이 아닌 다른사람들의 여행정보를 가져옵니다.
    userActions.getTravelList(info);
  }

  // 일정 선택 시 지역 리스트를 들고 옵니다.
  handlegetTravelList = e => {
    const { userActions } = this.props;

    const info = {};
    const userInfo = storage.get('userInfo');

    // 데이터를 가져오기 위해 파라미터를 세팅합니다.
    info.listName = e.key;
    info.user_id = userInfo.user_id;

    // listName에 따라 본인 또는 본인이 아닌 다른사람들의 여행정보를 가져옵니다.
    userActions.getTravelList(info);
  };

  // 여행 계획 클릭 시 해당 여행일정의 유저 id를 저장후 이동합니다.
  handleMoveTravel = e => {
    const {
      match: {
        params: { list }
      }
    } = this.props;

    //세션에 여행 일정의 정보를 저장합니다.
    storage.set('travelInfo', {
      user_id: e.user_id
    });

    // 선택한 여행 계획일정으로 이동합니다.
    this.props.history.push(`/${list}/${e.travel_id}/1`);
  };
  render() {
    const { user } = this.props;
    const { handlegetTravelList, handleMoveTravel } = this;

    const params = this.props.match.params;

    return (
      <Fragment>
        <MainSide listNm={params.list} onGetTravelList={handlegetTravelList} />
        <div
          style={{
            marginLeft: 200,
            padding: 24,
            background: '#F7ECEB',
            minHeight: 1000
          }}
        >
          <TravelList
            travelList={user}
            params={params}
            onMoveTravel={handleMoveTravel}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({ user: state.user.user }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch)
  })
)(TravelListContainer);
