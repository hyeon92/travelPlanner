/* global daum */

import React, { Component, Fragment } from 'react';
import { List, Avatar, Icon, Input, Typography, Radio, Button } from 'antd';
import 'page/TravelDetail.css';

const initialState = {
  list: [
    {
      id: 1,
      area: '지역1',
      category: '지역 카테고리'
    },
    {
      id: 2,
      area: '지역2',
      category: '지역 카테고리'
    }
  ]
};
class TravelDetail extends Component {
  componentDidMount() {
    let el = document.getElementById('map');
    let map = new daum.maps.Map(el, {
      center: new daum.maps.LatLng(33.450701, 126.570667)
    });
  }

  render() {
    return (
      <Fragment>
        <div class="left">
          <Input.Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
          />

          <List
            itemLayout="horizontal"
            dataSource={initialState.list}
            rowKey="id"
            renderItem={item => (
              <List.Item actions={[<Button>선택</Button>]}>
                <List.Item.Meta
                  avatar={<Avatar icon="global" />}
                  title={item.area}
                  description={item.category}
                />
              </List.Item>
            )}
          />
        </div>
        <div class="right">
          <Typography.Title>1일차 첫번째 장소</Typography.Title>
          <div
            className="App"
            id="map"
            style={{ width: '1000px;', height: '500px' }}
          />
          <Typography.Title level={4}>메모</Typography.Title>
          <Input.TextArea
            placeholder="Autosize height based on content lines"
            autosize
          />
          <Typography.Title level={4}>비용</Typography.Title>
          <Input placeholder="비용" />
          <Typography.Title level={4}>시간대</Typography.Title>
          <Radio.Group>
            <Radio.Button value="large">Moning</Radio.Button>
            <Radio.Button value="default">Afternoon</Radio.Button>
            <Radio.Button value="small">Evening</Radio.Button>
          </Radio.Group>
          <Button type="primary" block>
            작성완료
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default TravelDetail;
