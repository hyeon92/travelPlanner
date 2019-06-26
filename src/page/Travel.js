import React, { Fragment } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Travel = ({ visible, areaList, params, onMoveArea, onDelArea }) => {
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
          visible ? (
            <Link
              to={`/${params.list}/${params.travel_id}/${
                params.day_id
              }/${nextId}`}
            >
              <div
                style={{
                  width: '100%',
                  marginTop: '20px',
                  marginBottom: '20px',
                  background: '#DCACA8',
                  lineHeight: '60px',
                  paddingLeft: '20px',
                  boxShadow: '0.5px 0.5px 1px 0px #999'
                }}
              >
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  twoToneColor="#B8817D"
                />
                <span
                  style={{
                    color: '#333333',
                    marginLeft: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  ADD
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )
        }
        renderItem={item => (
          <List.Item
            extra={
              visible ? (
                <Icon
                  type="delete"
                  theme="twoTone"
                  twoToneColor="#B8817D"
                  onClick={() => onDelArea(item.area_id)}
                  style={{ fontSize: '20px' }}
                />
              ) : (
                <div />
              )
            }
            style={{
              background: '#FFFFFF',
              marginTop: '20px',
              marginBottom: '20px',
              padding: '20px',
              boxShadow: '0.5px 0.5px 1px 0px #999'
            }}
          >
            <List.Item.Meta
              style={{
                cursor: 'Pointer'
              }}
              avatar={<Avatar icon="check-square" />}
              title={item.place_name}
              description={item.memo}
              onClick={() => onMoveArea(item.area_id)}
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
};
export default Travel;
