import React, { Fragment } from 'react';
import { List, Card, Icon } from 'antd';
import moment from 'moment';

const TravelList = ({ travelList, params, onMoveTravel, onNewMoveTravel }) => {
  // 새로운 여행 등록 시 id 지정
  let nextId;

  if (travelList.travel === undefined || travelList.travel.length === 0) {
    nextId = 1;
  } else {
    nextId = travelList.travel[travelList.travel.length - 1].travel_id + 1;
  }

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={travelList.travel}
      footer={
        params.list === 'MyList' ? (
          <Card onClick={() => onNewMoveTravel(nextId)}>
            <Icon type="plus" />
            <span> ADD </span>
          </Card>
        ) : (
          <Fragment />
        )
      }
      renderItem={item => (
        <List.Item onClick={() => onMoveTravel(item)}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://bit.ly/2IQyAci" />}
          >
            <Card.Meta
              title={item.title}
              description={
                moment(item.sDate).format('YYYY-MM-DD') +
                ' ~ ' +
                moment(item.eDate).format('YYYY-MM-DD')
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};
export default TravelList;
