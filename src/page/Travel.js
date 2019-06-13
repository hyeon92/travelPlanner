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
            <Link to="/MyList/Add/Detail">
              <Icon type="plus" />
              <span> ADD </span>
            </Link>
          </div>
        }
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
};
export default Travel;
