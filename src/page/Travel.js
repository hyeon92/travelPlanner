import React, { Fragment } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Travel = ({ areaList }) => {
  if (!areaList) {
    areaList = {
      id: null,
      title: null,
      date: null,
      area: []
    };
  }

  return (
    <Fragment>
      <List
        dataSource={areaList.area}
        footer={
          <div>
            {/* 마지막 1의 경우 areaList의 마지막 숫자가 들어갈 수 있도록 수정 예정 */}
            <Link to={`/MyList/1/1/1`}>
              <Icon type="plus" />
              <span> ADD </span>
            </Link>
          </div>
        }
        renderItem={item => (
          <List.Item>
            <Link to="/MyList/1/1/1">
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
};
export default Travel;
