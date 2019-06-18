import React, { Fragment } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Travel = ({ areaList, params }) => {
  if (!areaList) {
    areaList = {
      day_id: null,
      title: null,
      date: null,
      area: []
    };
  }

  // 새로운 지역 등록 시 id 지정
  let nextId;

  if (areaList.area === undefined || areaList.area.length === 0) {
    nextId = 1;
  } else {
    nextId = areaList.area[areaList.area.length - 1].area_id + 1;
  }

  return (
    <Fragment>
      <List
        dataSource={areaList.area}
        footer={
          <div>
            <Link
              to={`/${params.list}/${params.travel_id}/${
                params.day_id
              }/${nextId}`}
            >
              <Icon type="plus" />
              <span> ADD </span>
            </Link>
          </div>
        }
        renderItem={item => (
          <List.Item>
            <Link
              to={`/${params.list}/${params.travel_id}/${params.day_id}/${
                item.area_id
              }`}
            >
              <List.Item.Meta
                avatar={<Avatar icon="shop" />}
                title={item.place_name}
                description={item.memo}
              />
            </Link>
          </List.Item>
        )}
      />
    </Fragment>
  );
};
export default Travel;
