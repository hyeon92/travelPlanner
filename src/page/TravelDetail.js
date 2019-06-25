import React, { Fragment } from 'react';
import {
  Input,
  Typography,
  Radio,
  Button,
  TimePicker,
  InputNumber
} from 'antd';
import 'page/TravelDetail.css';
import moment from 'moment';

const TravelDetail = ({
  visible,
  areaInfo,
  onEditTime,
  onEditTransport,
  onEditMoveTime,
  onEditTransportCost,
  onEditCost,
  onEditStayTime,
  onEditMemo,
  onSave
}) => {
  return (
    <Fragment>
      <div>
        <Typography.Title level={4}>목적지</Typography.Title>
        <Typography style={{ fontSize: '20px' }}>
          {areaInfo.place_name}
        </Typography>

        <Typography.Title level={4}>시간대</Typography.Title>
        {visible ? (
          <Radio.Group
            value={areaInfo.time}
            buttonStyle="solid"
            onChange={onEditTime}
          >
            <Radio.Button value="morning">Morning</Radio.Button>
            <Radio.Button value="afternoon">Afternoon</Radio.Button>
            <Radio.Button value="evening">Evening</Radio.Button>
          </Radio.Group>
        ) : (
          <Typography style={{ fontSize: '20px' }}>{areaInfo.time}</Typography>
        )}

        <Typography.Title level={4}>이동수단</Typography.Title>
        {visible ? (
          <Radio.Group
            buttonStyle="solid"
            value={areaInfo.transport}
            onChange={onEditTransport}
          >
            <Radio.Button value="1">도보</Radio.Button>
            <Radio.Button value="2">버스</Radio.Button>
            <Radio.Button value="3">지하철</Radio.Button>
            <Radio.Button value="4">택시</Radio.Button>
            <Radio.Button value="5">자차</Radio.Button>
          </Radio.Group>
        ) : (
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
        )}

        <Typography.Title level={4}>이동시간</Typography.Title>
        {visible ? (
          <TimePicker
            value={moment(areaInfo.move_time)}
            onChange={onEditMoveTime}
            format={'HH:mm'}
          />
        ) : (
          <Typography style={{ fontSize: '20px' }}>
            {moment(areaInfo.move_time).format('HH:mm')}
          </Typography>
        )}

        <Typography.Title level={4}>교통비</Typography.Title>
        {visible ? (
          <InputNumber
            value={areaInfo.transport_cost}
            onChange={onEditTransportCost}
            formatter={value =>
              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            step={100}
          />
        ) : (
          <Typography style={{ fontSize: '20px' }}>
            {areaInfo.transport_cost
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Typography>
        )}

        <Typography.Title level={4}>비용(입장료 등 기타비용)</Typography.Title>
        {visible ? (
          <InputNumber
            value={areaInfo.cost}
            onChange={onEditCost}
            formatter={value =>
              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            step={100}
          />
        ) : (
          <Typography style={{ fontSize: '20px' }}>
            {areaInfo.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Typography>
        )}

        <Typography.Title level={4}>체류시간</Typography.Title>
        {visible ? (
          <TimePicker
            value={moment(areaInfo.stay_time)}
            onChange={onEditStayTime}
            format={'HH:mm'}
          />
        ) : (
          <Typography style={{ fontSize: '20px' }}>
            {moment(areaInfo.stay_time).format('HH:mm')}
          </Typography>
        )}

        <Typography.Title level={4}>메모</Typography.Title>
        {visible ? (
          <Input.TextArea
            placeholder="메모사항"
            rows={4}
            value={areaInfo.memo}
            onChange={onEditMemo}
          />
        ) : (
          <Typography style={{ fontSize: '20px' }}>{areaInfo.memo}</Typography>
        )}
        {visible ? (
          <Button type="primary" block onClick={onSave}>
            작성완료
          </Button>
        ) : (
          <div />
        )}
      </div>
    </Fragment>
  );
};

export default TravelDetail;
