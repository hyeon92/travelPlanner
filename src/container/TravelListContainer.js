import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as userActions from 'store/module/user';
// import * as travelActions from 'store/module/travel';
import TravelList from 'page/TravelList';
import MainSide from 'page/side/MainSide';

class TravelListContainer extends Component {
  componentDidMount() {
    // const { travelActions } = this.props;
    // // travelActions.getTravelList(user.user_id);
    // travelActions.getTravelList('123');
  }
  render() {
    // const { travelList } = this.props;
    // return <TravelList travelList={travelList} />;
    return (
      <Fragment>
        <MainSide />
        <div
          style={{
            marginLeft: 200,
            padding: 24,
            background: '#F7ECEB',
            minHeight: 1000
          }}
        >
          <TravelList />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    // travelActions: bindActionCreators(travelActions, dispatch),
    // userActions: bindActionCreators(userActions, dispatch)
  })
)(TravelListContainer);
