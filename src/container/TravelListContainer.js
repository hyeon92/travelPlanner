import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as travelActions from 'store/module/travel';
import TravelList from 'page/TravelList';

class TravelListContainer extends Component {
  render() {
    return <TravelList />;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    phoneActions: bindActionCreators(travelActions, dispatch)
  })
)(TravelListContainer);
