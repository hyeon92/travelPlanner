import React, { Fragment } from 'react';
import {
  Input,
  Typography,
  Radio,
  Button,
  TimePicker,
  InputNumber
} from 'antd';
import moment from 'moment';
import 'page/TravelDetail.css';

const TravelDetail = ({
  area,
  onEditTime,
  onEditTransport,
  onEditMoveTime,
  onEditTransportCost,
  onEditCost,
  onEditStayTime,
  onEditMemo
}) => {
  return (
    <Fragment>
      <div>
        <Typography.Title level={4}>목적지</Typography.Title>
        <Input placeholder="목적지" disabled value={area.place_name} />

        <Typography.Title level={4}>시간대</Typography.Title>
        <Radio.Group
          value={area.time}
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
          value={area.transport}
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
          value={area.move_time}
          onChange={onEditMoveTime}
          format={'HH:mm'}
        />

        <Typography.Title level={4}>교통비</Typography.Title>
        <InputNumber
          value={area.transport_cost}
          onChange={onEditTransportCost}
          formatter={value => `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          step={100}
        />

        <Typography.Title level={4}>비용(입장료 등 기타비용)</Typography.Title>
        <InputNumber
          value={area.cost}
          onChange={onEditCost}
          formatter={value => `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          step={100}
        />

        <Typography.Title level={4}>체류시간</Typography.Title>
        <TimePicker
          value={area.stay_time}
          onChange={onEditStayTime}
          format={'HH:mm'}
        />

        <Typography.Title level={4}>메모</Typography.Title>
        <Input.TextArea
          placeholder="메모사항"
          rows={4}
          value={area.memo}
          onChange={onEditMemo}
        />
        <Button type="primary" block>
          작성완료
        </Button>
      </div>
    </Fragment>
  );
};

export default TravelDetail;
