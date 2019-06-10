import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import TravelDetail from 'page/TravelDetail';

class TravelDetailContainer extends Component {
  componentDidMount() {
    // const { user, travelActions } = this.props;
    // travelActions.getTravelList(user.id);
    // travelActions.getTravelList('123');
  }
  render() {
    // const { user } = this.props;
    return <TravelDetail />;
  }
}

export default connect(
  state => ({ user: state.user.user }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  })
)(TravelDetailContainer);
