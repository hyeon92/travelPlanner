import React, { Fragment } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Travel = ({ areaList, params, onDelArea }) => {
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

  if (
    areaList.area === undefined ||
    areaList.area.length === 0 ||
    areaList.area[areaList.area.length - 1] === undefined
  ) {
    nextId = 1;
  } else {
    nextId = areaList.area[areaList.area.length - 1].area_id + 1;
  }

  return (
    <Fragment>
      <List
        style={{ marginTop: '20px' }}
        dataSource={areaList.area}
        footer={
          <Link
            to={`/${params.list}/${params.travel_id}/${
              params.day_id
            }/${nextId}`}
          >
            <div
              style={{
                width: '100%',
                height: '60px',
                background: '#DCACA8',
                lineHeight: '60px',
                paddingLeft: '20px',
                border: '1px solid #DADBE6',
                borderRadius: '10px'
              }}
            >
              <Icon type="plus-circle" theme="twoTone" twoToneColor="#B8817D" />
              <span
                style={{
                  color: '#333333',
                  marginLeft: '10px',
                  fontWeight: 'bold'
                }}
              >
                ADD{' '}
              </span>
            </div>
          </Link>
        }
        renderItem={item => (
          <Link
            to={`/${params.list}/${params.travel_id}/${params.day_id}/${
              item.area_id
            }`}
          >
            <List.Item
              extra={[
                <Icon
                  type="delete"
                  theme="twoTone"
                  twoToneColor="#B8817D"
                  onClick={() => onDelArea(item.area_id)}
                  style={{ fontSize: '20px' }}
                />
              ]}
              style={{
                background: '#EBD0CE',
                marginTop: '5px',
                paddingLeft: '10px',
                paddingRight: '20px',
                border: '1px solid #DADBE6',
                borderRadius: '10px'
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon="check-square"
                    theme="twoTone"
                    style={{ background: '#B8817D' }}
                  />
                }
                title={item.place_name}
                description={item.memo}
              />
            </List.Item>
          </Link>
        )}
      />
    </Fragment>
  );
};
export default Travel;
