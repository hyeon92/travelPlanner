import React, { Component, Fragment } from 'react';
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

class TravelDetail extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Typography.Title level={4}>목적지</Typography.Title>
          <Input placeholder="목적지" disabled />

          <Typography.Title level={4}>시간대</Typography.Title>
          <Radio.Group defaultValue="morning" buttonStyle="solid">
            <Radio.Button value="morning">Morning</Radio.Button>
            <Radio.Button value="afternoon">Afternoon</Radio.Button>
            <Radio.Button value="evening">Evening</Radio.Button>
          </Radio.Group>

          <Typography.Title level={4}>이동수단</Typography.Title>
          <Radio.Group defaultValue="1" buttonStyle="solid">
            <Radio.Button value="1">도보</Radio.Button>
            <Radio.Button value="2">버스</Radio.Button>
            <Radio.Button value="3">지하철</Radio.Button>
            <Radio.Button value="4">택시</Radio.Button>
            <Radio.Button value="5">자차</Radio.Button>
          </Radio.Group>

          <Typography.Title level={4}>이동시간</Typography.Title>
          <TimePicker
            defaultValue={moment('00:00', 'HH:mm')}
            format={'HH:mm'}
            allowClear={false}
          />

          <Typography.Title level={4}>교통비</Typography.Title>
          <InputNumber
            defaultValue={0}
            formatter={value =>
              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            step={100}
          />

          <Typography.Title level={4}>
            비용(입장료 등 기타비용)
          </Typography.Title>
          <InputNumber
            defaultValue={0}
            formatter={value =>
              `${value} `.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            step={100}
          />

          <Typography.Title level={4}>체류시간</Typography.Title>
          <TimePicker
            defaultValue={moment('00:00', 'HH:mm')}
            format={'HH:mm'}
            allowClear={false}
          />

          <Typography.Title level={4}>메모</Typography.Title>
          <Input.TextArea placeholder="메모사항" rows={4} />
          <Button type="primary" block>
            작성완료
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default TravelDetail;
