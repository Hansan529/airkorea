import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import './App.css';

// Hooks
import useStore from './hooks/useStore';
import useInterval from './hooks/useInterval.ts';

import stationInfoJSON from './data/stationInfo.json';
import getColorValue from './functions/getColorValue.ts';
import sleep from './functions/sleep.ts';

import LoadingComp from './components/Loading';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

// 실시간 대기정보 / 오늘내일모래 대기정보 / 실시간 기상정보
import Standby from './app/Standby.jsx';
import StandbyForecast from './app/StandbyForecast.jsx';
import Weather from './app/Weather.jsx';

// 우리동네 대기 정보
import TodayAirQuality from './app/TodayAirQuality.jsx';

// Style
const Select = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
const Section = styled.section`position: relative; `;

const TimeDiv = styled.div`
      display: flex;
      gap: 5px !important;
      background-color: ${props => props.refresh ? '#e4f7ff' : '#fff'};
      padding: 5px 15px;
      border-radius: 25px;
      align-items: center;
      position: absolute;
      font-size: 14px;
      height: ${props => props.height || "15px"};
      top: ${props => props.top || 'initial'};
      right: ${props => props.right || 'initial'};
      left: ${props => props.left || 'initial'};

      strong { font-weight: 900; }
`;
const TimeButtonStyle = styled.button`
      /* background-image: ${props => props.ico && `url('/images/main/img_${props.ico}.webp')`}; */
      display: inline-block;
      background: url(/images/main/img_refresh.webp) no-repeat center;
      width: 16px;
      height: 20px;
      border: none;
      transition: transform 0.5s;
      position: relative;
      transform-origin: center;
      font-size: 0;

      &:hover { cursor: pointer; }
`;
//! 첫번째 섹션
const FirstSection = styled(Section)`
  background: url(/images/main/img_main_bg.webp) repeat-x 0 0;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 20px;
`;
const MMLayout = styled.div`
    flex-basis: 0.5;
    width: 710px;
`;
const MMOptionLayout = styled.div`
  width: 710px;
  position: relative;
  z-index: 10;
  background-color: #fff;
  border-radius: 10px;
`;
const MMOList = styled.ul`
  display: flex;
  margin: 0;
  margin-bottom: 5px;

  li {
    flex: 1;
    text-align: center;
    border: 1px solid #d2d2d2;
    border-bottom: none;
    overflow: hidden;

    &:first-of-type { border-top-left-radius: 10px; }
    &:last-of-type { border-top-right-radius: 10px; }

    button {
      display: block;
      height: 50px;
      line-height: 50px;
      letter-spacing: -0.6px;
      background: #fff;
      width: 100%;
      border: none;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    &[select="on"]{
      button {
        background: #0f62cc;
        color: #fff;
        font-weight: 600;
      }
    }
  }
`;
const MMOContainer = styled.div`
  height: 50px;
  background: linear-gradient(to right, #009ffa, #00c36a);
  border-radius: 6px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
`;
const MMOBorder = `
  border-radius: 30px;
  background: #fff no-repeat right 10px center;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: none;
`;
const MMOSelectWrapper = styled.div`
  flex: ${props => props.flex && '1 1 calc(33.333% - 20px)'};
  text-align: ${props => props.align || 'center'};
  font-size: 14px;
  color: #0a0a0a;
`;
const MMOSelect = styled(Select)`
  ${MMOBorder}
  background-image: ${(props) => props.bg && "url('/images/main/img_new_arr_down_on.webp')"};
  width: ${props => props.$width};
  padding: ${(props) => (props.flex ? '0 3px' : '0 15px')};
  display: ${(props) => props.flex && 'flex'};

  button {
    flex: 1;
    color: #0a0a0a;
    border: none;
    background: none;
    border-radius: 30px;
    height: 24px;

    &.on {
      color: #fff;
      background-color: #414d5d;
    }
  }
`;
const MMOBorderDiv = styled(MMOSelectWrapper)`
  background: #fff;
  display: flex;
  justify-content: center;
  ${MMOBorder}
  padding: 0 5px;
  box-sizing: border-box;

  button {
    flex: 1;
    border: none;
    background: none;
    border-radius: 30px;
    height: calc(100% - 5px);
    cursor: pointer;
  }

  button[active="on"]{
    font-weight: bold;
    background-color: #414d5d;
    color: #fff;
  }
`;
const MMWrapper = styled.div`
  width: 700px;
  height: 705px;
  box-sizing: border-box;
  background: url(/images/main/map_svg_warp_bg.webp) no-repeat 5px -10px;
  position: relative;
  margin-top: 20px;
  /* overflow: hidden; */
`;
const LegendWrapper = styled.div`
  position: absolute;
    width: 150px;
    right: 1px;
    bottom: 1px;
    overflow: hidden;
`;
const Legend = styled.div`
  div, .radio > legend {
    background-color: #f6fdff;
    border: 1px solid rgba(0,0,0,0.3);
    border-bottom: none;

    button {
      background: no-repeat right 14px center;
      background-image: url(/images/main/img_bottom_arr_up.webp);
      border: none;
      width: 100%;
      text-align: left;
      text-indent: 14px;
      cursor: pointer;
      padding: 5px 0;

      &:hover { text-decoration: underline; }
  }}
  ul, .list {
    border: 1px solid rgba(0,0,0,0.3);
    /* transition: height 0.3s; */
    height: 0;

    li{
    text-indent: 30px;
    background: no-repeat 10px center / 12px;
    padding: 5px 0;
    small {font-size: 14px;}

    &:first-of-type { background-image: url(/images/main/img_cau01.webp); }
    &:last-of-type { background-image: url(/images/main/img_cau02.webp);}
  }}

  .radio {
    /* transition: height 0.3s; */
    height: 0;
    overflow: hidden;

    label {
        display: flex;
        font-size: 12px;
        align-items: center;
        padding: 5px;

        input {
          width: 12px;
          height: 12px;
        }
      }
  }

  /* Open */
  &.on{
    div, .radio > legend {
      background-color: #0f6ecc;

      button {
        color: #fff;
        background-image: url(./img_bottom_arr_down.webp);
      }
    }

    ul, .list {
      height: ${props => props.height};
    }

    .radio {
      background: #fff;
      border: 1px solid rgba(0,0,0,0.3);
      padding-bottom: 5px;

      height: ${props => props.height};
    }
  }

  /*  */
  &[data-legend-index="1"]{
    .radio label {
      position: relative;
      text-indent: 13px;

      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        left: 25px;
        transform: translateY(-50%);
        background: no-repeat 0 0;
      }
      &:first-of-type::before { background-image: url(/images/main/img_ch01.webp); }
      &:nth-of-type(2)::before { background-image: url(/images/main/img_ch02.webp); }
      &:nth-of-type(3)::before { background-image: url(/images/main/img_ch03.webp); }
      &:nth-of-type(4)::before { background-image: url(/images/main/img_ch04.webp); }
      &:last-of-type::before { background-image: url(/images/main/img_ch05.webp); }
      }
  }
`;

//! 두번째 섹션
const SecondSection = styled(Section)`
    margin: 50px auto 0;
    background: url(/images/main/img_bg_s_01.webp) repeat-x 0 0;
    width: 1400px;
`;
const SecondBanner = styled.div`
  position: relative;
  background: linear-gradient(to right, #009ff9, #00c36b);
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  display:flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;

  .updateTime {
    text-align: center;
    strong {
      display: block;
      margin-top: 5px;
      font-size: 30px;
      line-height: 17px;
    }
  }

  .text {
    width: 100%;
    height: 80px;
    padding: 0 60px 0 100px;
    background: #fff url(/images/main/img_bg_s_02.webp) no-repeat right 24px bottom;
    border-radius: 30px 8px 30px 8px;
    position: relative;
    overflow-y: hidden;

    .title {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      font-size: 22px;

      &::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 80%;
        background-color: rgba(0,0,0,0.1);
        top: 50%;
        transform: translate(20px, -50%);
      }

      strong {
        display: block;
      }
    }
  }

  .buttonWrap {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    button {
      width: 20px;
      height: 20px;
      border: none;
      background: no-repeat center center;
      cursor: pointer;

      &[data-type="up"] {background-image: url(/images/main/img_up_down_up.webp);}
      &[data-type="play"] {background-image: url(/images/main/icon_bn_stop.webp);}
      &[data-type="stop"] {background-image: url(/images/main/icon_bn_play.webp);}
      &[data-type="down"] {background-image: url(/images/main/img_up_down_down.webp);}
    }
  }
`;
const SecondBannerInfo = styled.div`
      transition-duration: ${(props) => props.disableDuration === true ? '0ms' : '300ms'};
      transform: translateY(-${props => props.index * 80}px);

      div {
        display: flex;
        height: 80px;
        align-items: center;
        word-break: keep-all;
        line-height: 1.5;
        strong {
          margin-right: 15px;
          flex: none;
          color: #0f62cc;
          text-decoration: underline;
        }
        span{
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
`;
//! 하단 배너
const BannerWrap = styled.div`
    display: flex;
    width: 1400px;
    margin: 0 auto 50px;
    overflow: hidden;
`;
const ButtonBox = styled.div`
    width: 200px;
    flex-basis: 200px;
    min-width: 200px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: #fff;
    h3 {
        font-size:  20px;
        font-weight: bold;
        margin-right: 10px;
    }
`;
const Btn = styled.button`
    width: 20px;
    height: 20px;
    border: none;
    background: no-repeat 0 0;
    cursor: pointer;
    &[data-btn="left"]  { background-image: url(/images/main/images/main/img_ban_left.webp); }
    &[data-btn="atop"]  { background-image: url(/images/main/images/main/img_ban_atop.webp); }
    &[data-btn="auto"]  { background-image: url(/images/main/images/main/img_ban_auto.webp); }
    &[data-btn="right"] { background-image: url(/images/main/images/main/img_ban_right.webp); }
`;
const ListUl = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    transition-duration: ${(props) => props.disableDuration === true ? '0ms' : '300ms'};
    transform: translateX(${props => props.index * 200}px);
`;
const ListLi = styled.li`
    flex: 0 200px;
    min-width: 200px;
    text-align: center;
    height: 35px;
    line-height: 35px;

    img {
        vertical-align: middle;
    }
`;

function App() {
  // 측정소 위치 데이터
  const stationsInfo = stationInfoJSON.items;
  // ------------------------------------------------ setting
  const { data, dataFetchBoolean, text, textFetchBoolean, stationFetchBoolean, changer, getFetch, type, regionNum, selectInfo, loading, filterRange, filterData } = useStore(state => state);

  const legendRef = useRef(null);
  const Loading = () => <LoadingComp />;

  // * 실시간 대기정보 토글

  // 지도 범례 On/Off
  const [isOn0, setIsOn0] = useState(true);
  const [isOn1, setIsOn1] = useState(true);
  const [isOn2, setIsOn2] = useState(false);

  // * 오늘/내일 대기정보
  // 오늘/내일 대기정보 타입
  const [standbyType, setStandbyType] = useState('pm25');
  // * 오늘/내일 대기정보 금일, 내일
  const [forecastDate, setForecastDate] = useState("1");

  // ^ 횡,종 스크롤 애니메이션 활성화, 비활성화
  const [running, setRunning] = useState(false);
  const [disableDuration, setDisableDuration] = useState(false);

  // * 대기예보 텍스트 인덱스
  const [airInfoIndex, setAirInfoIndex] = useState(1);

  // * 기타
  // 탭 목록 인덱스
  const [tapSelect, setTapSelect] = useState(0);
  // * 인터벌
  const [intervalDelay, setIntervalDelay] = useState(5000);
  const [intervalRunning, setIntervalRunning] = useState(true);


  //! 측정소 데이터, 예보 텍스트 fetch 후 store에 저장 하여 캐싱처리
  useEffect(() => {
    const fetchHandle = (async (type) => {
      try {
          const cacheData = JSON.parse(sessionStorage.getItem('fetchStorage'));
          if(cacheData && cacheData.state[type]) {
              return;
          }
          getFetch(type, `http://localhost:3500/api/airkorea/${type}`);
      } catch (err) {
          console.error('err: ', err);
      }
    })
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

  //! 가장 가까운 위치의 측정소 찾기
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

      const controller = new AbortController();

      const fetchStationData = async (latitude, longitude, controller) => {
        try {
          const response = await fetch('http://localhost:3500/api/airkorea/coordinate', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
            signal: controller.signal
          });

          if(!response.ok) throw new Error('Network response was not ok');

          const {documents: [{x, y}]} = await response.json();

          // 측정소 데이터 API 호출
          const responseStation = await fetch('http://localhost:3500/api/airkorea/station', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ x, y }),
            signal: controller.signal
          });

          if(!responseStation.ok) throw new Error('Network response was not ok');

          const stations = await responseStation.json();
          // 가까운 측정소
          const stationData = stationsInfo.find(item => item.stationName === stations[0].stationName);
          changer('station', stationData);
          console.info("station API Fetch operation completed");
        } catch {
          changer('station', defaultStation);
        }
      };

      if ('geolocation' in navigator) {
        if (!stationFetchBoolean) {
          console.log("실행", stationFetchBoolean);
          changer('stationFetchBoolean', true);

          if (window.confirm("현재위치 정보를 이용해서 측정소 정보를 보시겠습니까?")) {
            changer('loading', false);

            const success = (pos) => {
              const { latitude, longitude } = pos.coords;
              fetchStationData(latitude, longitude, controller);
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

      return () => {
        controller.abort();
      }
  }, []);

  // !모든 데이터가 Fetch 되어 데이터 출력에 문제가 없을 경우, 로딩이 되지 않았을 경우에 Loading
  useEffect(() => {
    if(data && text && dataFetchBoolean && textFetchBoolean && stationFetchBoolean && !loading)
        changer('loading', true);
  }, [data, text, dataFetchBoolean, textFetchBoolean, stationFetchBoolean, changer, loading]);

  const typeRange = getColorValue(0, type, true);
// ------------------------------------------------ component
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

  const Time = ({ top, left, right, height, refresh, onClick, custom }) => {
    if(TimeText) {
        return (
          <TimeDiv top={top} left={left} right={right} height={height} refresh={refresh}>
            {custom ? <span>{custom[0]} <strong>{custom[1]} 발표자료</strong></span> :
            <span>{TimeText.year}년 {TimeText.month}월 {TimeText.day}일 <strong>{TimeText.hour}시</strong></span>}
            {refresh && <TimeButtonStyle onClick={onClick}>새로고침</TimeButtonStyle>}
          </TimeDiv>
        )
    } else {
      return (
            <TimeDiv top={top} left={left} right={right} height={height}>
              <span>0000년 00월 00일 <strong>00시</strong></span>
              {refresh && <TimeButtonStyle onClick={onClick}>새로고침</TimeButtonStyle>}
            </TimeDiv>
      )
    }
  };


  const StandbyComp = () => {
    return (
      <>
        <Standby Time={Time} />
        <Time right="0" />
        <LegendWrapper ref={legendRef}>
          {selectInfo === 'air' ?
          <Legend data-legend-index="0" className={isOn0 && 'on'} height="55px">
            <div>
              <button onClick={legendPopupHandle}>범례</button>
            </div>
            <ul>
              <li><small>주의보</small></li>
              <li><small>경보</small></li>
            </ul>
          </Legend> :
          <>
          <Legend data-legend-index="1" className={isOn1 && 'on'} height="145px">
            <div className="title">
              <button onClick={legendPopupHandle}>농도범위</button>
            </div>
            <div className="radio">
                <label><input type="checkbox" onChange={filterRangeHandle} value="1" checked={filterRange[0]} />
                  <span>좋음 ({`0~${type === 'o3Value' ? typeRange[1].toFixed(3) : typeRange[1]}`})</span>
                </label>
                <label><input type="checkbox" onChange={filterRangeHandle} value="2" checked={filterRange[1]} />
                  <span>보통 ({`${type === 'o3Value' ? typeRange[2].toFixed(3) : typeRange[2]}~${type === 'o3Value' ? typeRange[3].toFixed(3) : typeRange[3]}`})</span>
                </label>
                <label><input type="checkbox" onChange={filterRangeHandle} value="3" checked={filterRange[2]} />
                  <span>나쁨 ({`${type === 'o3Value' ? typeRange[4].toFixed(3) : typeRange[4]}~${type === 'o3Value' ? typeRange[5].toFixed(3): typeRange[5]}`})</span>
                </label>
                <label><input type="checkbox" onChange={filterRangeHandle} value="4" checked={filterRange[3]} />
                  <span>매우나쁨 ({`${typeRange[6]}~`})</span>
                </label>
                <label><input type="checkbox" onChange={filterRangeHandle} value="5" checked={filterRange[4]} />
                  <span>데이터 없음</span>
                </label>
            </div>
          </Legend>
          <Legend data-legend-index="2"  className={isOn2 && 'on'} height="145px">
            <div className="title">
              <button onClick={legendPopupHandle}>측정망 구분</button>
            </div>
            <div className="radio">
                <label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[0]} />도시대기</label>
                <label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[1]} />국가배경농도</label>
                <label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[2]} />도로변대기</label>
                <label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[3]} />교외대기</label>
                <label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[4]} />항만</label>
            </div>
          </Legend>
          </>}
        </LegendWrapper>
      </>
    )
  };

  const ForecastComp = () => <StandbyForecast Time={Time} standbyType={standbyType} forecastDate={forecastDate} />;

  const WeatherComp = () => <Weather></Weather>

  const DynamicComponent = () => {
    const Components = {
      0: StandbyComp,
      1: ForecastComp,
      2: WeatherComp
    }
    const Result = Components[tapSelect];
    return ( <Result /> );
  };

  // ------------------------------------------------ event, function
  const eventHandler = (target, value) => changer(target, value);

  const tapSelectHandle = (index) => setTapSelect(index);
  const legendPopupHandle = (e) => {
    const legendElement = e.currentTarget.closest('[data-legend-index]');
    const { legendIndex } = legendElement.dataset;

    const stateUpdater = {
      0: setIsOn0,
      1: setIsOn1,
      2: setIsOn2,
    };

    const updater = stateUpdater[legendIndex];
    if(updater)
      updater(prev => !prev);
  };
  const filterRangeHandle = (e) => {
    const { value } = e.currentTarget;

    const data = [...filterRange];
    data[value - 1] = e.currentTarget.checked;

    changer('filterRange', data);
  };
  const filterDataHandle = (e) => {
    const { innerText }= e.currentTarget.parentNode;

    const data = {...filterData};
    data[innerText] = e.currentTarget.checked;

    changer('filterData', data);
  };
  const standbyTypeHandle = (e) => setStandbyType(e.target.value);
  const forecastDateHandle = (e) => setForecastDate(e.currentTarget.dataset.date);

  // 예보 발표 이벤트 함수
  const airInfoIndexHandle = async (e) => {
    let { type } = e.currentTarget.dataset;
    if(!running){
      setRunning(true);

      intervalRunning && setIntervalRunning(false);
      switch(type) {
        case 'up':
          setAirInfoIndex(airInfoIndex + 1);
          // 무한 롤링
          if(airInfoIndex >= 3){
            await sleep(0.3);
            setDisableDuration(true);
            setAirInfoIndex(1);
            await sleep(0);
            setDisableDuration(false);
          };
          break;
        case 'play':
          e.currentTarget.dataset.type = 'stop';
          break;
        case 'stop':
          !intervalRunning && setIntervalRunning(true);
          e.currentTarget.dataset.type = 'play';
          break;
        case 'down':
          setAirInfoIndex(airInfoIndex - 1);
          if(airInfoIndex <= 1){
              await sleep(0.3);
              setDisableDuration(true);
              setAirInfoIndex(3);
              await sleep(0);
              setDisableDuration(false);
          };
          break;
        default:
          break;
      };
      await sleep(0.3);
      setRunning(false);
    };
  };
  useInterval(() => {
    airInfoIndexHandle({ currentTarget: { dataset: { type: 'up'}}});
  }, intervalRunning ? intervalDelay : null);

  // 예보 텍스트
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

  // ! 하단 배너 모듈
  // 인덱스
  const [ulIndex, setUlIndex] = useState(-6);

  // 애니메이션 진행 중
  const [transitionRunning, setTransitionRunning] = useState(false);

  // 애니메이션 시간 ON/OFF
  const [bannerDisableDuration, setBannerDisableDuration] = useState(false);

  // 인터벌
  const [bannerIntervalDelay, setBannerIntervalDelay] = useState(2000);
  const [bannerIntervalRunning, setBannerIntervalRunning] = useState(true);

  const leftFunction = async () => {
      if(!transitionRunning){
          setTransitionRunning(true);
          setUlIndex(ulIndex + 1);
          // 무한 롤링
          if(ulIndex >= -1){
              await sleep(0.3);
              setBannerDisableDuration(true);
              setUlIndex(-23);
              await sleep(0.1);
              setBannerDisableDuration(false);
              setTransitionRunning(false);
          } else {
              await sleep(0.3);
              setTransitionRunning(false);
          };
      };
  };
  const rightFunction = async () => {
      if(!transitionRunning){
          setTransitionRunning(true);
          setUlIndex(ulIndex - 1);
          // 무한 롤링
          if(ulIndex <= -28){
              await sleep(0.3);
              setBannerDisableDuration(true);
              setUlIndex(-6);
              await sleep(0.1);
              setBannerDisableDuration(false);
              setTransitionRunning(false);
          } else {
              await sleep(0.3);
              setTransitionRunning(false);
          };
      };
  };

  useInterval(() => {
      rightFunction();
  }, bannerIntervalRunning ? bannerIntervalDelay : null);

  const handle = async (e) => {
      const btn = e.currentTarget.dataset.btn;

      bannerIntervalRunning && setBannerIntervalRunning(false);
      switch(btn) {
          case 'left':
              leftFunction();
              break;
          case 'atop':
              e.currentTarget.dataset.btn = 'auto';
              break;
              case 'auto':
                  !bannerIntervalRunning && setBannerIntervalRunning(true);
                  e.currentTarget.dataset.btn = 'atop';
              break;
          case 'right':
              rightFunction();
              break;
          default:
              break;
      }
  };

  return (
    <>
      <HeaderComponent />
      <main>
        {/* 첫번째 색션 */}
        <FirstSection>
          {/* 로딩창 */}
          <Loading />
          {/* 대기/기상 지도 정보 */}
          <MMLayout>
            {/* Main Map 설정 */}
            <MMOptionLayout>
              <MMOList>
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
              </MMOList>
              <MMOContainer>
                {tapSelect === 0 &&
                <>
                  <MMOSelectWrapper flex align="left">
                    <MMOSelect id="area1" bg $width="180px" onChange={(e) => eventHandler('type', e.currentTarget.value)} value={type}>
                      <option value="khaiValue">통합대기환경지수(CAI)</option>
                      <option value="pm25Value">초미세먼지 (PM-2.5)</option>
                      <option value="pm10Value">미세먼지 (PM-10)</option>
                      <option value="o3Value">오존(O₃)</option>
                      <option value="no2Value">이산화질소(NO₂)</option>
                      <option value="coValue">일산화탄소 (CO)</option>
                      <option value="so2Value">아황산가스 (SO₂)</option>
                    </MMOSelect>
                  </MMOSelectWrapper>
                  <MMOSelectWrapper flex>
                    <label htmlFor="area2" style={{ marginRight: '5px' }}>
                      시/도
                    </label>
                    <MMOSelect id="area2" bg $width="130px"
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
                    </MMOSelect>
                  </MMOSelectWrapper>
                  <MMOBorderDiv flex>
                    <button onClick={(e) => eventHandler('selectInfo', 'air')}     active={selectInfo === 'air' ? 'on' : 'off'}   >대기/경보 정보</button>
                    <button onClick={(e) => eventHandler('selectInfo', 'station')} active={selectInfo === 'station' ? 'on' : 'off'}>측정소 정보</button>
                  </MMOBorderDiv>
                </>}
                {tapSelect === 1 && <>
                  <MMOSelectWrapper flex align="left">
                    <MMOSelect bg $width="180px" onChange={standbyTypeHandle} value={standbyType}>
                      <option value="pm25">초미세먼지 (PM-2.5)</option>
                      <option value="pm10">미세먼지 (PM-10)</option>
                      <option value="o3">오존 (O3)</option>
                    </MMOSelect>
                  </MMOSelectWrapper>
                  <MMOBorderDiv>
                    <button onClick={forecastDateHandle} active={forecastDate === "0" ? 'on' : 'off'} data-date="0">오늘</button>
                    <button onClick={forecastDateHandle} active={forecastDate === "1" ? 'on' : 'off'} data-date="1">내일</button>
                    <button onClick={forecastDateHandle} active={forecastDate === "2" ? 'on' : 'off'} data-date="2">모레</button>
                  </MMOBorderDiv>
                </>}
              </MMOContainer>
            </MMOptionLayout>
            {/* Main Map 전국 지도 */}
            <MMWrapper>
              <DynamicComponent />
            </MMWrapper>
          </MMLayout>
          {/* 대기/기상 데이터 정보 */}
            <TodayAirQuality Time={Time}  />
        </FirstSection>
        <SecondSection>
          <SecondBanner>
            <div className="updateTime">{(TimeText && `${TimeText.year}.${TimeText.month}.${Number(TimeText.hour) < 5 ? String(Number(TimeText.day) - 1).padStart(2, '0') : TimeText.day}`) || '0000.00.00'}
              <strong>{(TimeText && `${Number(TimeText.hour) < 5 ? '23' : TimeText.hour}:${TimeText.minute}`) || '00:00'}</strong>
            </div>
            <div className="text">
              <div className="title">
                <strong>예보</strong>발표
              </div>
              <SecondBannerInfo index={airInfoIndex} disableDuration={disableDuration}>
                <BannerData />
              </SecondBannerInfo>
            </div>
            <div className="buttonWrap">
                  <button data-type="up" onClick={airInfoIndexHandle}></button>
                  <button data-type="play" onClick={airInfoIndexHandle}></button>
                  <button data-type="down" onClick={airInfoIndexHandle}></button>
            </div>
          </SecondBanner>
        </SecondSection>
        <BannerWrap>
          <ButtonBox>
              <h3>유관기관</h3>
              <Btn data-btn="left" onClick={handle}></Btn>
              <Btn data-btn="atop" onClick={handle}></Btn>
              <Btn data-btn="right" onClick={handle}></Btn>
          </ButtonBox>
          <ListUl index={ulIndex} bannerDisableDuration={bannerDisableDuration}>
              <ListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="/images/main/img_ban17.webp" /></a></ListLi>
              <ListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="/images/main/img_ban18.webp" /></a></ListLi>
              <ListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="/images/main/img_ban19.webp" /></a></ListLi>
              <ListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="/images/main/img_ban20.webp" /></a></ListLi>
              <ListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="/images/main/img_ban21.webp" /></a></ListLi>
              <ListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="/images/main/img_ban22.webp" /></a></ListLi>
              {/* 복제 */}
              <ListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="/images/main/img_ban01.webp" /></a></ListLi>
              <ListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="/images/main/img_ban02.webp" /></a></ListLi>
              <ListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="/images/main/img_ban03.webp" /></a></ListLi>
              <ListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="/images/main/img_ban04.webp" /></a></ListLi>
              <ListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="/images/main/img_ban05.webp" /></a></ListLi>
              <ListLi><a href="https://air.gg.go.kr/" title="경기도 대기 환경 정보 서비스" target="_blank" rel="noreferrer"><img alt="경기도 대기 환경 정보 서비스" src="/images/main/img_ban06.webp" /></a></ListLi>
              <ListLi><a href="https://www.airnow.gov/" title="미국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="미국실시간 대기 정보" src="/images/main/img_ban06_1.webp" /></a></ListLi>
              <ListLi><a href="https://air.cnemc.cn:18014/" title="중국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="중국실시간 대기 정보" src="/images/main/img_ban07.webp" /></a></ListLi>
              <ListLi><a href="https://soramame.env.go.jp/" title="일본실시간 대기정보" target="_blank" rel="noreferrer"><img alt="일본실시간 대기정보" src="/images/main/img_ban08.webp" /></a></ListLi>
              <ListLi><a href="https://heis.busan.go.kr" title="부산 보건환경정보 공개시스템" target="_blank" rel="noreferrer"><img alt="부산 보건환경정보 공개시스템" src="/images/main/img_ban09.webp" /></a></ListLi>
              <ListLi><a href="https://air.daegu.go.kr" title="대구 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="대구 대기정보 시스템" src="/images/main/img_ban10.webp" /></a></ListLi>
              <ListLi><a href="https://gwangju.go.kr" title="광주 시청" target="_blank" rel="noreferrer"><img alt="광주 대기정보 시스템" src="/images/main/img_ban11.webp" /></a></ListLi>
              <ListLi><a href="https://www.daejeon.go.kr/hea/airDynamicData.do?menuseq=6858" title="대전 보건환경연구원" target="_blank" rel="noreferrer"><img alt="대전 보건환경연구원" src="/images/main/img_ban12.webp" /></a></ListLi>
              <ListLi><a href="https://www.ulsan.go.kr/s/uihe/main.ulsan" title="울산 보건환경연구원" target="_blank" rel="noreferrer"><img alt="울산 보건환경연구원" src="/images/main/img_ban13.webp" /></a></ListLi>
              <ListLi><a href="https://www.sejong.go.kr/air/index.do" title="세종 미세먼지 정보센터" target="_blank" rel="noreferrer"><img alt="세종 미세먼지 정보센터" src="/images/main/img_ban14.webp" /></a></ListLi>
              <ListLi><a href="http://www.airgangwon.go.kr" title="강원 대기환경정보" target="_blank" rel="noreferrer"><img alt="강원 대기환경정보" src="/images/main/img_ban15.webp" /></a></ListLi>
              <ListLi><a href="https://www.chungbuk.go.kr/here/index.do" title="충북 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="충북 보건환경 연구원" src="/images/main/img_ban16.webp" /></a></ListLi>
              <ListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="/images/main/img_ban17.webp" /></a></ListLi>
              <ListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="/images/main/img_ban18.webp" /></a></ListLi>
              <ListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="/images/main/img_ban19.webp" /></a></ListLi>
              <ListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="/images/main/img_ban20.webp" /></a></ListLi>
              <ListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="/images/main/img_ban21.webp" /></a></ListLi>
              <ListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="/images/main/img_ban22.webp" /></a></ListLi>
              {/* 복제 */}
              <ListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="/images/main/img_ban01.webp" /></a></ListLi>
              <ListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="/images/main/img_ban02.webp" /></a></ListLi>
              <ListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="/images/main/img_ban03.webp" /></a></ListLi>
              <ListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="/images/main/img_ban04.webp" /></a></ListLi>
              <ListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="/images/main/img_ban05.webp" /></a></ListLi>
              <ListLi><a href="https://air.gg.go.kr/" title="경기도 대기 환경 정보 서비스" target="_blank" rel="noreferrer"><img alt="경기도 대기 환경 정보 서비스" src="/images/main/img_ban06.webp" /></a></ListLi>
          </ListUl>
      </BannerWrap>
      </main>
      <FooterComponent />
    </>
  );
}

export default App;
