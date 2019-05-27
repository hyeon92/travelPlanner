import React from 'react';
import { List, Card } from 'antd';
import { Link } from 'react-router-dom';

const TravelList = () => {
  const data = [
    {
      id: 1,
      title: '여행제목 1',
      area: '홍콩',
      schudule: '05.27 ~ 05.30'
    },
    {
      id: 2,
      title: '여행제목 2',
      area: '마닐라',
      schudule: '06.01 ~ 06.06'
    },
    {
      id: 3,
      title: '여행제목 3',
      area: '대만',
      schudule: '05.12 ~ 06.17'
    },
    {
      id: 4,
      title: '여행제목 4',
      area: '일본',
      schudule: '07.07 ~ 07.20'
    }
  ];
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Link to="/MyList/1">
            <Card title={item.title}>
              <h3>{item.area}</h3>
              <span>{item.schudule}</span>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );
};
export default TravelList;
