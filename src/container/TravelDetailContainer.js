/* global daum */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/module/user';
import * as travelActions from 'store/module/travel';
import * as areaActions from 'store/module/area';
import TravelDetail from 'page/TravelDetail';
import TravelSide from 'page/side/TravelSide';

class TravelDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      ps: new daum.maps.services.Places(),
      infowindow: new daum.maps.InfoWindow({ zIndex: 1 }),
      markers: []
    };
  }
  componentDidMount() {
    const { travelActions } = this.props;

    travelActions.getTravelList('123', 1);

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    this.setState({
      map: new daum.maps.Map(mapContainer, mapOption)
    });
  }

  // 여행 제목 변경
  handleEditTitle = e => {
    const { travelActions } = this.props;

    travelActions.editTitle(e.target.value);
  };

  // 여행 시작일자 변경
  handleEditsDate = (e, value) => {
    const { travelActions } = this.props;

    travelActions.editsDate(value);
  };

  // 여행 일정 추가
  handleAddSchedule = e => {
    const { travelActions } = this.props;

    travelActions.addSchedule();
  };

  // 여행 일정 삭제
  handleDelSchedule = key => {
    const { travelActions } = this.props;

    travelActions.delSchedule(key);
  };

  // 여행계획 저장
  handleSaveTravel = e => {
    const { travelActions } = this.props;
    const { travelList } = this.props;

    travelActions.saveTravelList(travelList);
  };

  // 지도 키워드 검색 요청
  handelSearchPlaces = () => {
    const { displayPlaces, displayPagination } = this;
    let keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    this.state.ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === daum.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === daum.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === daum.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    });
  };

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  displayPlaces = places => {
    const {
      removeAllChildNods,
      removeMarker,
      addMarker,
      getListItem,
      displayInfowindow
    } = this;

    let listEl = document.getElementById('placesList'),
      menuEl = document.getElementById('menu_wrap'),
      fragment = document.createDocumentFragment(),
      bounds = new daum.maps.LatLngBounds(),
      listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      let placePosition = new daum.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      daum.maps.event.addListener(marker, 'mouseover', () => {
        displayInfowindow(marker, places[i].place_name);
      });
      daum.maps.event.addListener(marker, 'mouseout', () => {
        this.state.infowindow.close();
      });

      itemEl.onmouseover = function() {
        displayInfowindow(marker, places[i].place_name);
      };

      itemEl.onmouseout = () => {
        this.state.infowindow.close();
      };

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    this.state.map.setBounds(bounds);
  };

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  removeAllChildNods = el => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  removeMarker = () => {
    for (let i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(null);
    }
    this.setState({ markers: [] });
  };

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  addMarker = (position, idx, title) => {
    const imageSrc =
        'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new daum.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new daum.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new daum.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage
      });

    marker.setMap(this.state.map); // 지도 위에 마커를 표출합니다
    this.state.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 검색결과 항목을 Element로 반환하는 함수입니다
  getListItem = (index, places) => {
    let el = document.createElement('li'),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '   <h5>' +
        places.place_name +
        '</h5>';

    if (places.road_address_name) {
      itemStr +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        places.address_name +
        '</span>';
    } else {
      itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span></div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  };

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  displayInfowindow = (marker, title) => {
    let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    this.state.infowindow.setContent(content);
    this.state.infowindow.open(this.state.map, marker);
  };

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  displayPagination = pagination => {
    var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function(i) {
          return function() {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  };

  render() {
    const { travelList } = this.props;
    const {
      handleEditTitle,
      handleEditsDate,
      handleAddSchedule,
      handleDelSchedule,
      handleSaveTravel,
      handelSearchPlaces
    } = this;
    return (
      <Fragment>
        <TravelSide
          travelList={travelList}
          onEditTitle={handleEditTitle}
          onEditsDate={handleEditsDate}
          onAddSchedule={handleAddSchedule}
          onDelSchedule={handleDelSchedule}
          onSaveTravel={handleSaveTravel}
        />
        <div
          style={{
            marginLeft: 200,
            padding: 24,
            background: '#F7ECEB',
            minHeight: 1000
          }}
        >
          <div className="map_wrap">
            <div
              id="map"
              style={{
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
              }}
            />

            <div id="menu_wrap" className="bg_white">
              <div className="option">
                <div>
                  키워드 : <input type="text" id="keyword" size="15" />
                  <button onClick={handelSearchPlaces}>검색하기</button>
                  {/* <form onSubmit={handelSearchPlaces}>
                    키워드 : <input type="text" id="keyword" size="15" />
                    <button type="submit">검색하기</button>
                  </form> */}
                </div>
              </div>
              <hr />
              <ul id="placesList" />
              <div id="pagination" />
            </div>
          </div>
          <TravelDetail />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    user: state.user.user,
    travelList: state.travel.travel,
    travelStatus: state.travel.status,
    travelEventNm: state.travel.eventNm,
    areaList: state.area.area
  }),
  dispatch => ({
    userActions: bindActionCreators(userActions, dispatch),
    travelActions: bindActionCreators(travelActions, dispatch),
    areaActions: bindActionCreators(areaActions, dispatch)
  })
)(TravelDetailContainer);
