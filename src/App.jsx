/*
    ! 주제
    @ 컴포넌트
    # 설명
    & 강조
    ~ 세팅
*/

/*
    Package
    Json
    Hooks
    Style
    Component
    Package Settings
*/

// ~ Package
import { useEffect, useState } from 'react';
import proj4 from 'proj4';

// ~ Json
// # 측정소 위치 데이터
import stationsInfoData from './app/data/stationInfo.json';

// ~ Hooks
import useStore from './app/hooks/useStore.tsx';

// ~ Style
import './App.css';
import { AppFirstSection, AppMMLayout, AppMMOBorderDiv, AppMMOContainer, AppMMOList, AppMMOSelect, AppMMOSelectWrapper, AppMMOptionLayout, AppMMWrapper, AppSecondBanner, AppSecondSection, AppTimeButtonStyle, AppTimeDiv } from './app/components/assets/StyleComponent.jsx';

// ~ Component
import HeaderComponent from './app/components/layout/Header.jsx';
import { AppSecondBannerInfoComponent, AppEndBannerComponent } from './app/components/0_main/AppBanner.jsx';
import FooterComponent from './app/components/layout/Footer.jsx';
import Loading from './app/components/global/Loading.jsx';
import Standby from './app/components/0_main/Standby.jsx';
import StandbyForecast from './app/components/0_main/StandbyForecast.jsx';
import Weather from './app/components/0_main/Weather.jsx';
import TodayAirQuality from './app/components/0_main/TodayAirQuality.jsx';

// ~ Package Settings
const wgs84 = '+proj=longlat +datum=WGS84 +no_defs'; /* WGS84 좌표계 (기본 설정) */
const epsg2097 = '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs'; /* EPSG:2097 (Korea Central Belt / Korean 1985) */


// # 측정소 정보
/**
 * @typedef {Object} StationInfo
 * @property {string} dmX
 * @property {string} item
 * @property {string} mangName
 * @property {string} year
 * @property {string} city
 * @property {string} cityShort
 * @property {string} addr
 * @property {string} building
 * @property {string} stationName
 * @property {string} dmY
 * @property {string} top
 * @property {string} left
 * @property {string} innerTop
 * @property {string} innerLeft
 */

/** @type {StationInfo[]} */
const stationsInfo = stationsInfoData;


// @@@ 출력 컴포넌트 @@@
function App() {
  // # store
  const { data, dataFetchBoolean, text, textFetchBoolean, stationFetchBoolean, changer, getFetch, type, regionNum, selectInfo, loading } = useStore(state => state);


  // ! 오늘/내일 대기정보
  // # 오늘/내일 대기정보 타입
  const [standbyType, setStandbyType] = useState('pm25');
  // # 오늘/내일 대기정보 금일, 내일
  const [forecastDate, setForecastDate] = useState("1");


  // ! 기타
  // # 탭 목록 인덱스
  const [tapSelect, setTapSelect] = useState(0);
  const AppMMOContainerResultComponent = () => {
    switch(tapSelect) {
      case 0:
        return <>
        <AppMMOSelectWrapper flex align="left">
          <AppMMOSelect id="area1" bg $width="180px" onChange={(e) => eventHandler('type', e.currentTarget.value)} value={type}>
            <option value="khaiValue">통합대기환경지수(CAI)</option>
            <option value="pm25Value">초미세먼지 (PM-2.5)</option>
            <option value="pm10Value">미세먼지 (PM-10)</option>
            <option value="o3Value">오존(O₃)</option>
            <option value="no2Value">이산화질소(NO₂)</option>
            <option value="coValue">일산화탄소 (CO)</option>
            <option value="so2Value">아황산가스 (SO₂)</option>
          </AppMMOSelect>
        </AppMMOSelectWrapper>
        <AppMMOSelectWrapper flex>
          <label htmlFor="area2" style={{ marginRight: '5px' }}>
            시/도
          </label>
          <AppMMOSelect id="area2" bg $width="130px"
          onChange={(e) => {
            eventHandler('openMap', e.currentTarget.value);
            eventHandler('regionNum', e.currentTarget.value);
          }}
          value={regionNum}>
            <option value="none">-전체-</option>
            <option value="02">서울특별시</option>
            <option value="031">경기도</option>
            <option value="032">인천광역시</option>
            <option value="033">강원특별자치도</option>
            <option value="041">충청남도</option>
            <option value="042">대전광역시</option>
            <option value="043">충청북도</option>
            <option value="044">세종특별자치시</option>
            <option value="051">부산광역시</option>
            <option value="052">울산광역시</option>
            <option value="053">대구광역시</option>
            <option value="054">경상북도</option>
            <option value="055">경상남도</option>
            <option value="061">전라남도</option>
            <option value="062">광주광역시</option>
            <option value="063">전라북도</option>
            <option value="064">제주특별자치도</option>
          </AppMMOSelect>
        </AppMMOSelectWrapper>
        <AppMMOBorderDiv flex>
          <button onClick={(e) => eventHandler('selectInfo', 'air')}     active={selectInfo === 'air' ? 'on' : 'off'}   >대기/경보 정보</button>
          <button onClick={(e) => eventHandler('selectInfo', 'station')} active={selectInfo === 'station' ? 'on' : 'off'}>측정소 정보</button>
        </AppMMOBorderDiv>
      </>;
      case 1:
        return <>
        <AppMMOSelectWrapper flex align="left">
          <AppMMOSelect bg $width="180px" onChange={standbyTypeHandle} value={standbyType}>
            <option value="pm25">초미세먼지 (PM-2.5)</option>
            <option value="pm10">미세먼지 (PM-10)</option>
            <option value="o3">오존 (O3)</option>
          </AppMMOSelect>
        </AppMMOSelectWrapper>
        <AppMMOBorderDiv>
          <button onClick={forecastDateHandle} active={forecastDate === "0" ? 'on' : 'off'} data-date="0">오늘</button>
          <button onClick={forecastDateHandle} active={forecastDate === "1" ? 'on' : 'off'} data-date="1">내일</button>
          <button onClick={forecastDateHandle} active={forecastDate === "2" ? 'on' : 'off'} data-date="2">모레</button>
        </AppMMOBorderDiv>
      </>;
      default:
        return;
    }
  }


  // # 측정소 데이터, 예보 텍스트 fetch 후 store에 저장 하여 캐싱처리
  useEffect(() => {
    const fetchHandle = async (type) => {
      try {
          const cacheData = JSON.parse(sessionStorage.getItem('fetchStorage'));
          if(cacheData && cacheData.state[type]) {
              return;
          }
          // TODO: 변경
          // getFetch(type, `https://apis.hansan-web.link/airkorea/station-${type}`);
          getFetch(type, `https://localhost:3500/api/airkorea/${type}`);
      } catch (err) {
          console.error('err: ', err);
      }
    }
    // 데이터가 존재하는지, fetch 여부 확인 후 데이터 호출
    if(!data && !dataFetchBoolean) {
        fetchHandle('data');
        changer('dataFetchBoolean', true);
    };

    // 데이터가 존재하는지, fetch 여부 확인 후 데이터 호출
    if(!text &&!textFetchBoolean) {
        fetchHandle('text');
        changer('textFetchBoolean', true);
    };
  }, [data, text, dataFetchBoolean, textFetchBoolean, changer, getFetch]);
  // # 가장 가까운 위치의 측정소 찾기
  useEffect(() => {
      // 중구
      const defaultStation = {
        "dmX": "37.564639",
        "item": "SO2, CO, O3, NO2, PM10, PM2.5",
        "mangName": "도시대기",
        "year": "1995",
        "city": "서울특별시",
        "addr": "서울 중구 덕수궁길 15",
        "building": "시청서소문별관 3동",
        "stationName": "중구",
        "dmY": "126.975961",
        "top": "136",
        "left": "264",
        "innerTop": "248.594",
        "innerLeft": "235.531"
      };

      const fetchStationData = async ({ longitude, latitude }) => {
        // # 현재 좌표를 기준으로 TM 좌표로 변한 (WGS84 -> EPSG:2097 변환)
        const tmCoordinates = proj4(wgs84, epsg2097, [longitude, latitude]);
        const [tmX, tmY] = tmCoordinates;
        try {
          // # 측정소 데이터 API 호출
          // TODO:
          // const responseStation = await fetch(`https://apis.hansan-web.link/airkorea/station?x=${tmX}&y=${tmY}`);
          const responseStation = await fetch(`https://localhost:3500/api/airkorea/station?x=${tmX}&y=${tmY}`);

          if(!responseStation.ok) throw new Error('Network response was not ok');

          // # 가까운 측정소 (3)
          const stations = await responseStation.json();
          changer('nearStation', stations);

          // # 가까운 측정소 (1)
          const stationData = stationsInfo.find(item => item.stationName === stations[0].stationName);
          changer('station', stationData);

          console.info("station API Fetch operation completed");
        } catch(err) {
          if(err.name === 'AbortError') {
            console.log('Fetch aborted');
          } else {
            console.log("error: ",err);
            changer('station', defaultStation);
          }
        }
      };

      if ('geolocation' in navigator) {
        if (!stationFetchBoolean) {
          changer('stationFetchBoolean', true);

          if (window.confirm("현재위치 정보를 이용해서 측정소 정보를 보시겠습니까?")) {
            changer('loading', false);

            const success = (pos) => {
              const { longitude, latitude } = pos.coords;
              fetchStationData({ longitude, latitude });
            };

            const error = (err) => {
              console.error("위치 권한 차단됨: ", err);
              alert('현재위치 사용권한이 거부되어 \'중구\' 지역을 기준으로 데이터를 출력합니다.\n\n활성화: \n설정 > 개인 정보 보호 및 보안 > 사이트 설정');
              changer('station', defaultStation);
            };

            navigator.geolocation.getCurrentPosition(success, error);
          } else {
            alert('현재위치를 사용하지 않아 \'중구\' 지역을 기준으로 데이터를 출력합니다.');
            changer('station', defaultStation);
          }
        }
      } else {
        alert('현재위치를 지원하지 않아 \'중구\' 지역을 기준으로 데이터를 출력합니다.');
        changer('station', defaultStation);
        changer('stationFetchBoolean', true);
      };

      // return () => {
      //   controller.abort();
      // }
  }, [changer, stationFetchBoolean, stationsInfo]);
  // # 모든 데이터가 Fetch 되어 데이터 출력에 문제가 없을 경우, 로딩이 되지 않았을 경우에는 로딩
  useEffect(() => {
    if(data && text && dataFetchBoolean && textFetchBoolean && stationFetchBoolean && !loading)
        changer('loading', true);
  }, [data, text, dataFetchBoolean, textFetchBoolean, stationFetchBoolean, changer, loading]);


  // ! 시간
  // # 시간 Object { 년, 월, 일, 시간, 분 }
  const TimeText = (() => {
    if(data) {
        const dataTime = data[0].dataTime;
        const updateTime = new Date(dataTime);
        const year = updateTime.getFullYear();
        const month = String(updateTime.getMonth() + 1).padStart(2, '0');
        const day = String(updateTime.getDate()).padStart(2, '0');
        const hour = String(updateTime.getHours()).padStart(2, '0');
        const minute = String(updateTime.getMinutes()).padStart(2, '0');

        return { year, month, day, hour, minute }
    };
  })();
  // @ 시계 컴포넌트
  const Time = ({ top, left, right, height, refresh, onClick, custom }) => {
    if(TimeText) {
        return (
          <AppTimeDiv top={top} left={left} right={right} height={height} refresh={refresh}>
            {custom ? <span>{custom[0]} <strong>{custom[1]} 발표자료</strong></span> :
            <span>{TimeText.year}년 {TimeText.month}월 {TimeText.day}일 <strong>{TimeText.hour}시</strong></span>}
            {refresh && <AppTimeButtonStyle onClick={onClick}>새로고침</AppTimeButtonStyle>}
          </AppTimeDiv>
        )
    } else {
      return (
            <AppTimeDiv top={top} left={left} right={right} height={height}>
              <span>0000년 00월 00일 <strong>00시</strong></span>
              {refresh && <AppTimeButtonStyle onClick={onClick}>새로고침</AppTimeButtonStyle>}
            </AppTimeDiv>
      )
    }
  };


  // ! 핸들
  const eventHandler = (target, value) => changer(target, value);
  const tapSelectHandle = (index) => setTapSelect(index);
  const standbyTypeHandle = (e) => setStandbyType(e.target.value);
  const forecastDateHandle = (e) => setForecastDate(e.currentTarget.dataset.date);


  // @ 예보 텍스트 컴포넌트
  function BannerData() {
    const array = [23, 17, 11, 5];
    let target;
    if(TimeText) target = Number(TimeText.hour);

    for (const element of array){
      if(target > element){
        target = element;
        break;
      };
    };
    target = String(target).padStart(2, '0');

    let filterAirInformation;
    let result = <></>;

    if((text !== null) && (TimeText !== undefined)){
      const notData = Number(TimeText.hour) < 5;
      filterAirInformation = text?.filter(item => {
        return (item.dataTime === `${TimeText.year}-${TimeText.month}-${TimeText.day} ${target}시 발표` && item.informCode === 'PM10') || (item.dataTime === `${TimeText.year}-${TimeText.month}-${TimeText.day-1} 23시 발표` && item.informCode === 'PM10');
      });
      const { length } = filterAirInformation;
      const first = filterAirInformation[0];
      const last = filterAirInformation[length - 1];

      if(length === 3){
        filterAirInformation.splice(0,0, last);
        filterAirInformation.splice(length+1,0, first);
      } else if(length === 0){
        // 4회(5,11,17,23시), 각 시별 10분내외 값이 안나온 경우
        const dataTime = `${TimeText.year}-${TimeText.month}-${TimeText.day} ${TimeText.hour}시 발표`;
        const informCause = "○ [정보] 현재 공공데이터 업데이트 중입니다. 10분 내외에 출력될 예정입니다.";
        const informGrade = "서울 : -,제주 : -,전남 : -,전북 : -,광주 : -,경남 : -,경북 : -,울산 : -,대구 : -,부산 : -,충남 : -,충북 : -,세종 : -,대전 : -,영동 : -,영서 : -,경기남부 : -,경기북부 : -,인천 : -";

        const preset = { dataTime, informCause, informCode: "PM10", informGrade };

        const first = { ...preset, informData: `${TimeText.year}-${TimeText.month}-${TimeText.day}` };
        const mid = { ...preset, informData: `${TimeText.year}-${TimeText.month}-${String(Number(TimeText.day) + 1).padStart(2, '0')}` };
        const last = {  ...preset, informData: `${TimeText.year}-${TimeText.month}-${String(Number(TimeText.day) + 2).padStart(2, '0')}` };

        filterAirInformation = [last, first, mid, last, first];
      } else {
        filterAirInformation.splice(length, 0, {
          ...last,
          informData: `${last?.informData.slice(0, -2)}${String(Number(last?.informData.slice(-2)) + 1).padStart(2, '0')}`,
          informCause: '○ [미세먼지] 모레 4등급(좋음, 보통, 나쁨, 매우나쁨) 예보는 17시에 발표되며, 모레 2등급(낮음, 높음) 예보는 주간예보를 참고하시기 바랍니다.'
        });
        filterAirInformation.splice(0, 0, filterAirInformation[length]);
        filterAirInformation.splice(length+2, 0, first);
      }
      result = filterAirInformation?.map((item, idx) => {
        const itemDate = item?.informData;
        // 05시 전일 경우 어제 데이터 사용
        const nowDate = `${TimeText.year}-${TimeText.month}-${notData ? String(Number(TimeText.day) - 1).padStart(2, '0') : TimeText.day}`;
        const two = `${TimeText.year}-${TimeText.month}-${notData ? TimeText.day : String(Number(TimeText.day) + 1).padStart(2, '0')}`;
        const three = `${TimeText.year}-${TimeText.month}-${notData ? String(Number(TimeText.day) + 1).padStart(2, '0') : String(Number(TimeText.day) + 2).padStart(2, '0')}`;
        let txt;
        if(itemDate === nowDate){notData ? txt='어제' : txt='금일'}
        else if(itemDate === two){notData ? txt='금일' :txt='내일'}
        else if(itemDate === three){notData ? txt='내일' : txt='모레'};
        const response = item?.informCause.slice(2).replace(/[＊*]/g, ' ');
        const index = response.indexOf('※');
        const sliceText = index !== -1 ? response.slice(0, index) : response;

        return <div key={idx}><strong>{txt}</strong><span>{sliceText}</span></div>
      })
    };

    return result;
  };


  // ! 동적
  // @ 컴포넌트
  const DynamicComponent = () => {
    const Components = {
      0: Standby,
      1: StandbyForecast,
      2: Weather
    }
    const Result = Components[tapSelect];
    return ( <Result Time={Time} standbyType={tapSelect === 1 && standbyType} forecastDate={tapSelect === 1 && forecastDate} /> );
  };

  return (
    <>
      <HeaderComponent />
      <main>
        <AppFirstSection>
          <Loading />
          <AppMMLayout>
            <AppMMOptionLayout>
              <AppMMOList>
                <li select={tapSelect === 0 ? 'on' : 'off'}>
                  <button onClick={() => tapSelectHandle(0)}>실시간 대기정보</button>
                </li>
                <li select={tapSelect === 1 ? 'on' : 'off'}>
                  <button onClick={() => tapSelectHandle(1)}>오늘/내일/모레 대기정보</button>
                </li>
                <li select={tapSelect === 2 ? 'on' : 'off'}>
                  <button onClick={() => tapSelectHandle(2)}>실시간 기상정보</button>
                </li>
                <li select={tapSelect === 3 ? 'on' : 'off'}>
                  <button onClick={() => tapSelectHandle(3)}>오늘/내일 기상정보</button>
                </li>
              </AppMMOList>
              <AppMMOContainer>
                <AppMMOContainerResultComponent />
              </AppMMOContainer>
            </AppMMOptionLayout>
            {/* Main Map 전국 지도 */}
            <AppMMWrapper>
              <DynamicComponent />
            </AppMMWrapper>
          </AppMMLayout>
          {/* 대기/기상 데이터 정보 */}
            <TodayAirQuality Time={Time}  />
        </AppFirstSection>
        <AppSecondSection>
          <AppSecondBanner>
            <div className="updateTime">{(TimeText && `${TimeText.year}.${TimeText.month}.${Number(TimeText.hour) < 5 ? String(Number(TimeText.day) - 1).padStart(2, '0') : TimeText.day}`) || '0000.00.00'}
              <strong>{(TimeText && `${Number(TimeText.hour) < 5 ? '23' : TimeText.hour}:${TimeText.minute}`) || '00:00'}</strong>
            </div>
            <AppSecondBannerInfoComponent>
              <BannerData />
            </AppSecondBannerInfoComponent>
          </AppSecondBanner>
        </AppSecondSection>
        <AppEndBannerComponent /> {/* 컴포넌트 */}
      </main>
      <FooterComponent />
    </>
  );
}
export default App;
