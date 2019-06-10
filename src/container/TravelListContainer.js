import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import TravelList from 'page/TravelList';

class TravelListContainer extends Component {
  componentDidMount() {
    // const { travelActions } = this.props;
    // // travelActions.getTravelList(user.id);
    // travelActions.getTravelList('123');
  }
  render() {
    // const { travelList } = this.props;
    // return <TravelList travelList={travelList} />;
    return <TravelList />;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    // travelActions: bindActionCreators(travelActions, dispatch),
    // userActions: bindActionCreators(userActions, dispatch)
  })
)(TravelListContainer);
