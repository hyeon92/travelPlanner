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
        <Input placeholder="목적지" disabled value={areaInfo.place_name} />

        <Typography.Title level={4}>시간대</Typography.Title>
        <Radio.Group
          value={areaInfo.time}
          buttonStyle="solid"
          onChange={onEditTime}
        >
          <Radio.Button value="morning">Morning</Radio.Button>
          <Radio.Button value="afternoon">Afternoon</Radio.Button>
          <Radio.Button value="evening">Evening</Radio.Button>
        </Radio.Group>

        <Typography.Title level={4}>이동수단</Typography.Title>
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

        <Typography.Title level={4}>이동시간</Typography.Title>
        <TimePicker
          value={moment(areaInfo.move_time)}
          onChange={onEditMoveTime}
          format={'HH:mm'}
        />

        <Typography.Title level={4}>교통비</Typography.Title>
        <InputNumber
          value={areaInfo.transport_cost}
          onChange={onEditTransportCost}
          formatter={value => `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          step={100}
        />

        <Typography.Title level={4}>비용(입장료 등 기타비용)</Typography.Title>
        <InputNumber
          value={areaInfo.cost}
          onChange={onEditCost}
          formatter={value => `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          step={100}
        />

        <Typography.Title level={4}>체류시간</Typography.Title>
        <TimePicker
          value={moment(areaInfo.stay_time)}
          onChange={onEditStayTime}
          format={'HH:mm'}
        />

        <Typography.Title level={4}>메모</Typography.Title>
        <Input.TextArea
          placeholder="메모사항"
          rows={4}
          value={areaInfo.memo}
          onChange={onEditMemo}
        />
        <Button type="primary" block onClick={onSave}>
          작성완료
        </Button>
      </div>
    </Fragment>
  );
};

export default TravelDetail;
