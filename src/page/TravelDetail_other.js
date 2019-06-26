import React from 'react';
import { Typography } from 'antd';
import 'page/TravelDetail.css';
import moment from 'moment';

const TravelDetail_other = ({ areaInfo }) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '20px'
      }}
    >
      <Typography.Title level={4}>목적지</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>
        {areaInfo.place_name}
      </Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>시간대</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>{areaInfo.time}</Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>이동수단</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>
        {areaInfo.transport === '1'
          ? '도보'
          : areaInfo.transport === '2'
          ? '버스'
          : areaInfo.transport === '3'
          ? '지하철'
          : areaInfo.transport === '4'
          ? '택시'
          : areaInfo.transport === '5'
          ? '자차'
          : '선택사항 없음'}
      </Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>이동시간</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>
        {moment(areaInfo.move_time).format('HH:mm')}
      </Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>교통비</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>
        {areaInfo.transport_cost
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>비용(입장료 등 기타비용)</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>
        {areaInfo.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>체류시간</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>
        {moment(areaInfo.stay_time).format('HH:mm')}
      </Typography>
      <div
        style={{
          height: '1px',
          background: '#A6A6A6',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      />

      <Typography.Title level={4}>메모</Typography.Title>
      <Typography style={{ fontSize: '20px' }}>{areaInfo.memo}</Typography>
    </div>
  );
};

export default TravelDetail_other;
