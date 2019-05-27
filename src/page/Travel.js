/* global daum */

import React, { Component, Fragment } from 'react';
import { List, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const initialState = {
  list: [
    {
      id: 1,
      area: '1일차 첫번째 장소',
      memo: '이것 꼭 먹기',
      money: 10000
    },
    {
      id: 2,
      area: '1일차 두번째 장소',
      memo: '저것 꼭 먹기',
      money: 10000
    },
    {
      id: 3,
      area: '1일차 세번째 장소',
      memo: '요것 꼭 먹기',
      money: 10000
    },
    {
      id: 4,
      area: '1일차 네번째 장소',
      memo: '그것 꼭 먹기',
      money: 10000
    }
  ]
};

class Travel extends Component {
  componentDidMount() {
    let el = document.getElementById('map');
    let map = new daum.maps.Map(el, {
      center: new daum.maps.LatLng(33.450701, 126.570667)
    });
  }

  render() {
    return (
      <Fragment>
        <div
          className="App"
          id="map"
          style={{ width: '1000px;', height: '500px' }}
        />
        <List
          dataSource={initialState.list}
          renderItem={item => (
            <List.Item>
              <Link to="/MyList/1/Detail">
                <List.Item.Meta
                  avatar={<Avatar icon="shop" />}
                  title={item.area}
                  description={item.memo}
                />
              </Link>
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}
export default Travel;
