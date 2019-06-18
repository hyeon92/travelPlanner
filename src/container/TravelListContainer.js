import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import TravelList from 'page/TravelList';
import MainSide from 'page/side/MainSide';

class TravelListContainer extends Component {
  componentDidMount() {
    const { userActions } = this.props;

    let info = {};

    info.listName = this.props.match.params.list;
    info.user_id = '123';

    userActions.getTravelList(info);
  }
  render() {
    const { user } = this.props;
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
          <TravelList travelList={user} params={this.props.match.params} />
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
