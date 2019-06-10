/* global daum */

import React, { Component, Fragment } from 'react';
import { List, Avatar } from 'antd';
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
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    const map = new daum.maps.Map(mapContainer, mapOption);
  }

  render() {
    return (
      <Fragment>
        <div
          className="App"
          id="map"
          style={{ width: '1000px', height: '500px' }}
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
