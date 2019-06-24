/* global daum */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as travelActions from 'store/module/travel';
import * as areaActions from 'store/module/area';
import TravelDetail from 'page/TravelDetail';
import TravelSide from 'page/side/TravelSide';
import storage from 'lib/storage';

class TravelDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      ps: new daum.maps.services.Places(),
      infoWindow: new daum.maps.InfoWindow({ zIndex: 1 }), // 마커의 말풍선입니다.
      markers: [], // 마커들을 저장하는 배열입니다.
      selectedMarker: null // 선택되어진 마커입니다.
    };
  }

  componentDidMount() {
    const { areaActions, travelActions } = this.props;
    const { travelList } = this.props;
    const {
      match: {
        params: { travel_id, day_id, area_id }
      }
    } = this.props;

    // 데이터를 가져오기 위해 파라미터를 세팅합니다.
    const info = {};
    const userInfo = storage.get('userInfo');

    info.user_id = userInfo.user_id;
    info.travel_id = travel_id;
    info.day_id = day_id;
    info.area_id = area_id;

    // 사이드 메뉴의 데이터가 없을 경우 해당 정보를 불러옵니다.
    if (travelList.travel_id === null) {
      // 사이드 메뉴에 필요한 여행 정보를 가져옵니다.
      travelActions.getTravelInfo(info);
    }

    // 메인 화면에 필요한 장소 정보를 가져옵니다.
    areaActions.getAreaInfo(info);

    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new daum.maps.LatLng(37.56647, 126.977963), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    this.setState({
      map: new daum.maps.Map(mapContainer, mapOption)
    });
  }
  componentDidUpdate() {
    const { areaInfo, aStatus, aBEventNm, aNEventNm } = this.props;
    const { addMarker } = this;
    const {
      match: {
        params: { list, travel_id, day_id }
      }
    } = this.props;

    if (aNEventNm === 'GET_AREA_INFO') {
      // 장소 정보를 가져온 후 성공여부에 따라 반응합니다.
      if (aBEventNm !== 'GET_AREA_INFO' && aStatus === 'SUCCESS') {
        // 장소 정보에 있는 위치를 저장합니다.
        const moveLocation = new daum.maps.LatLng(
          areaInfo.location_y,
          areaInfo.location_x
        );

        // 지도에서 저장한 위치로 이동합니다.
        this.state.map.setLevel(3);
        this.state.map.panTo(moveLocation);

        // 저장한 위치에 마커와 말풍선을 추가합니다.
        addMarker(moveLocation, 0);
      }
    } else if (aNEventNm === 'SAVE_TRAVEL_LIST') {
      // 장소 정보를 저장 후 성공여부에 따라 반응합니다.
      if (aBEventNm !== 'SAVE_TRAVEL_LIST' && aStatus === 'SUCCESS') {
        alert('저장이 완료되었습니다.');
        this.props.history.push(`/${list}/${travel_id}/${day_id}`);
      } else if (aStatus === 'ERROR') {
        alert('저장 중 오류가 발생하였습니다. 다시 시도해주시기 바랍니다.');
      }
    }
  }

  // 여행 제목을 입력한 값으로 변경합니다.
  handleEditTitle = e => {
    const { travelActions } = this.props;

    travelActions.editTitle(e.target.value);
  };

  // 여행 시작일자를 입력한 값으로 변경합니다.
  handleEditsDate = (e, value) => {
    const { travelActions } = this.props;

    travelActions.editsDate(value);
  };

  // 사이드 메뉴의 여행 일정 추가 버튼을 클릭하여 추가합니다.
  handleAddSchedule = e => {
    const { travelActions } = this.props;

    travelActions.addSchedule();
  };

  // 사이드 메뉴의 여행 일정 삭제 버튼을 클릭하여 삭제합니다.
  handleDelSchedule = key => {
    const { travelActions } = this.props;

    travelActions.delSchedule(key);
  };

  // 여행계획 저장 버튼을 클릭하여 저장합니다.
  handleSaveTravel = e => {
    const { travelActions } = this.props;
    const { travelList } = this.props;

    travelActions.saveTravelList(travelList);
  };

  // 지도의 키워드 검색 버튼을 클릭하여 장소를 검색합니다.
  handleSearchPlaces = () => {
    const { displayPlaces, displayPagination } = this;
    const keyword = document.getElementById('keyword').value;

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

  // 검색 결과를 결과 목록과 해당 지역정보를 지도에 마커로 표시합니다.
  displayPlaces = places => {
    const {
      addMarker,
      getListItem,
      displayInfoWindow,
      createMarkerImage
    } = this;
    const { areaActions } = this.props;

    const listEl = document.getElementById('placesList'),
      menuEl = document.getElementById('menu_wrap'),
      fragment = document.createDocumentFragment(),
      bounds = new daum.maps.LatLngBounds();

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    while (listEl.hasChildNodes()) {
      listEl.removeChild(listEl.lastChild);
    }

    // 지도에 표시되고 있는 마커를 제거합니다
    for (let i = 0; i < this.state.markers.length; i++) {
      this.state.markers[i].setMap(null);
    }
    this.setState({ markers: [] });

    for (let i = 0; i < places.length; i++) {
      // 기본 마커 이미지, 클릭 마커 이미지를 생성합니다.
      const normalImage = createMarkerImage('normal', i),
        clickImage = createMarkerImage('click');

      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new daum.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커에 mouseover 이벤트를 등록합니다
      daum.maps.event.addListener(marker, 'mouseover', () => {
        displayInfoWindow(marker, places[i].place_name);
      });

      // 마커에 mouseout 이벤트를 등록합니다.
      daum.maps.event.addListener(marker, 'mouseout', () => {
        this.state.infoWindow.close();
      });

      // 마커에 click 이벤트를 등록합니다.
      daum.maps.event.addListener(marker, 'click', () => {
        // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면 마커의 이미지를 클릭 이미지로 변경합니다
        if (
          !this.state.selectedMarker ||
          this.state.selectedMarker !== marker
        ) {
          // 클릭된 마커 객체가 null이 아니면 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!this.state.selectedMarker &&
            this.state.selectedMarker.setImage(normalImage, i);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(clickImage);
        }

        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        this.state.map.setLevel(3);
        this.state.map.panTo(marker.getPosition());

        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        this.setState({
          selectedMarker: marker
        });

        areaActions.editPlaceInfo(places[i]);
      });

      // 마커와 검색결과 항목에 mouseover 했을때 해당 장소에 인포윈도우에 장소명을 표시합니다
      itemEl.onmouseover = () => {
        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        this.state.map.setLevel(5);
        this.state.map.panTo(marker.getPosition());

        displayInfoWindow(marker, places[i].place_name);
      };

      // mouseout 했을 때는 인포윈도우를 닫습니다
      itemEl.onmouseout = () => {
        this.state.infoWindow.close();
      };

      // click 했을 때 클릭 이벤트를 발생 시킵니다.
      itemEl.onclick = () => {
        // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면 마커의 이미지를 클릭 이미지로 변경합니다
        if (
          !this.state.selectedMarker ||
          this.state.selectedMarker !== marker
        ) {
          // 클릭된 마커 객체가 null이 아니면 클릭된 마커의 이미지를 기본 이미지로 변경하고
          !!this.state.selectedMarker &&
            this.state.selectedMarker.setImage(normalImage, i);

          // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
          marker.setImage(clickImage);
        }

        // 지도 중심을 부드럽게 이동시킵니다
        // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
        this.state.map.setLevel(3);
        this.state.map.panTo(marker.getPosition());

        // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
        this.setState({
          selectedMarker: marker
        });

        areaActions.editPlaceInfo(places[i]);
      };

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    this.state.map.setBounds(bounds);
  };

  // 마커를 생성하고 지도 위에 마커를 표시합니다.
  addMarker = (position, idx) => {
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

  // 검색결과 항목을 Element로 반환합니다.
  getListItem = (index, places) => {
    const el = document.createElement('li');
    let itemStr =
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

  // 인포윈도우에 장소명을 표시합니다
  displayInfoWindow = (marker, title) => {
    const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    this.state.infoWindow.setContent(content);
    this.state.infoWindow.open(this.state.map, marker);
  };

  // 검색결과 목록 하단에 페이지번호를 표시합니다.
  displayPagination = pagination => {
    const paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (i => {
          return () => {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  };

  // MakrerImage 객체를 생성하여 반환하는 함수입니다
  createMarkerImage = (eventNm, idx) => {
    if (eventNm === 'click') {
      const imageSrc =
          'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 스프라이트 마커 이미지 URL
        imageSize = new daum.maps.Size(24, 35);

      const markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

      return markerImage;
    } else if (eventNm === 'normal') {
      const imageSrc =
          'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new daum.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new daum.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new daum.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        );

      return markerImage;
    }
  };

  // 키워드 검색 창에 엔터하여 검색합니다.
  handlePressEnter = e => {
    const { handleSearchPlaces } = this;
    if (e.key === 'Enter') {
      handleSearchPlaces();
    }
  };

  // 시간대 라디오 버튼을 입력한 값으로 변경합니다.
  handleEditTime = e => {
    const { areaActions } = this.props;

    areaActions.editTime(e.target.value);
  };

  // 이동수단 라디오 버튼을 입력한 값으로 변경합니다.
  handleEditTransport = e => {
    const { areaActions } = this.props;

    areaActions.editTransport(e.target.value);
  };

  // 이동시간을 입력한 값으로 변경합니다.
  handleEditMoveTime = e => {
    const { areaActions } = this.props;

    areaActions.editMoveTime(e);
  };

  // 교통비를 입력한 값으로 변경합니다.
  handleEditTransportCost = e => {
    const { areaActions } = this.props;

    areaActions.editTransportCost(e);
  };

  // 비용(입장료 등 기타비용)을 입력한 값으로 변경합니다.
  handleEditCost = e => {
    const { areaActions } = this.props;

    areaActions.editCost(e);
  };

  // 체류시간을 입력한 값으로 변경합니다.
  handleEditStayTime = e => {
    const { areaActions } = this.props;

    areaActions.editStayTime(e);
  };

  // 메모를 입력한 값으로 변경합니다.
  handleEditMemo = e => {
    const { areaActions } = this.props;

    areaActions.editMemo(e.target.value);
  };

  // 작성완료를 클릭하여 지역 정보를 저장합니다.
  handleSave = e => {
    const { areaInfo } = this.props;
    const { areaActions } = this.props;

    const userInfo = storage.get('userInfo');
    const idInfo = this.props.match.params;

    idInfo.user_id = userInfo.user_id;

    // 목적지를 지정해야 저장이 가능합니다.
    if (areaInfo.place_name === null) {
      alert('목적지를 지정해주세요');
      return false;
    }

    // areaActions.saveArea(areaInfo, idInfo);
  };

  render() {
    const { travelList, areaInfo } = this.props;
    const {
      handleEditTitle,
      handleEditsDate,
      handleAddSchedule,
      handleDelSchedule,
      handleSaveTravel,
      handleSearchPlaces,
      handlePressEnter,
      handleEditTime,
      handleEditTransport,
      handleEditMoveTime,
      handleEditTransportCost,
      handleEditCost,
      handleEditStayTime,
      handleEditMemo,
      handleSave
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
                  키워드 :{' '}
                  <input
                    type="text"
                    id="keyword"
                    size="15"
                    onKeyPress={handlePressEnter}
                  />
                  <button onClick={handleSearchPlaces}>검색하기</button>
                </div>
              </div>
              <hr />
              <ul id="placesList" />
              <div id="pagination" />
            </div>
          </div>
          <TravelDetail
            areaInfo={areaInfo}
            onEditTime={handleEditTime}
            onEditTransport={handleEditTransport}
            onEditMoveTime={handleEditMoveTime}
            onEditTransportCost={handleEditTransportCost}
            onEditCost={handleEditCost}
            onEditStayTime={handleEditStayTime}
            onEditMemo={handleEditMemo}
            onSave={handleSave}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect(
  state => ({
    travelList: state.travel.travel,
    areaInfo: state.area.area,
    aStatus: state.area.status,
    aBEventNm: state.area.bEventNm,
    aNEventNm: state.area.nEventNm
  }),
  dispatch => ({
    travelActions: bindActionCreators(travelActions, dispatch),
    areaActions: bindActionCreators(areaActions, dispatch)
  })
)(TravelDetailContainer);
