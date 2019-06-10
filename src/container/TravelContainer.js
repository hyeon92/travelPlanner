import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import Travel from 'page/Travel';

class TravelContainer extends Component {
  componentDidMount() {}
  render() {
    // const { user } = this.props;
    return <Travel />;
  }
}

export default connect(
  state => ({}),
  dispatch => ({})
)(TravelContainer);
