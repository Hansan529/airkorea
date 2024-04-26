import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import './App.css';

import stationInfoJSON from './data/stationInfo.json';
import getColorValue from './functions/getColorValue.ts';
import sleep from './functions/sleep.ts';

import { RealTimeStandby } from './components/RealTimeStandby.js';
import TodayAirQuality from './components/TodayAirQuality';
import StandbyForecast from './components/StandbyForecast';
import { RealTimeWeather } from './components/RealTimeWeather';

import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import useStore from './hooks/useStore';

// Style
const Select = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
const Section = styled.section`
    position: relative;
`;
const FirstSection = styled(Section)`
  background: url('/img_main_bg.png') repeat-x 0 0;
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

    &:first-of-type {
      border-top-left-radius: 10px;
    }

    &:last-of-type {
      border-top-right-radius: 10px;
    }

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
  background-image: ${(props) => props.bg && "url('/img_new_arr_down_on.png')"};
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
  background: url('/map_svg_warp_bg.png') no-repeat 5px -10px;
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
      background-image: url(./img_bottom_arr_up.png);
      border: none;
      width: 100%;
      text-align: left;
      text-indent: 14px;
      cursor: pointer;
      padding: 5px 0;

      &:hover {
        text-decoration: underline;
      }
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

    &:first-of-type {
      background-image: url(./img_cau01.png);
    }
    &:last-of-type {
      background-image: url(./img_cau02.png);
    }
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
        background-image: url(./img_bottom_arr_down.png);
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
      &:first-of-type::before { background-image: url('./img_ch01.png'); }
      &:nth-of-type(2)::before { background-image: url('./img_ch02.png'); }
      &:nth-of-type(3)::before { background-image: url('./img_ch03.png'); }
      &:nth-of-type(4)::before { background-image: url('./img_ch04.png'); }
      &:last-of-type::before { background-image: url('./img_ch05.png'); }
      }
  }
`;
const SecondSection = styled(Section)`
    margin: 50px auto 0;
    background: url('./img_bg_s_01.png') repeat-x 0 0;
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
    background: #fff url(./img_bg_s_02.png) no-repeat right 24px bottom;
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

      &.upBtn {
        background-image: url('./img_up_down_up.png');
      }
      &.playBtn {
        background-image: url('./icon_bn_stop.png');
      }
      &.downBtn {
        background-image: url('./img_up_down_down.png');
      }
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
const Loading = styled.div`
      display: ${props => props.loading === 'true' ? 'none' : 'block'};
      position: absolute;
      z-index: 100;
      width: 100%;
      height: 100%;
      text-align: center;
      border: 1px solid #bcd0e8;
      background: url('/loading_bg.png');

      div {
        margin-top: 360px;
        font-size: 20px;
        color: #0054a6;
      }
`;
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

      strong {
        font-weight: 900;
      }
`;
const TimeButtonStyle = styled.button`
      background-image: ${props => props.ico && `url('/img_${props.ico}.png')`};
      display: inline-block;
      background: url('/img_refresh.png') no-repeat center;
      width: 16px;
      height: 20px;
      border: none;
      transition: transform 0.5s;
      position: relative;
      transform-origin: center;
      font-size: 0;

      &:hover {
          cursor: pointer;
        }
`;

function App() {
  // ------------------------------------------------ setting
  const { data, dataFetchBoolean, text, textFetchBoolean, stationFetchBoolean, changer, getFetch } = useStore(state => state);

  const type = useStore(state => state.type);
  const regionNum = useStore(state => state.regionNum);
  const selectInfo = useStore(state => state.selectInfo);
  const loading = useStore(state => state.loading);
  const filterRange = useStore(state => state.filterRange);
  const filterData = useStore(state => state.filterData);

  if(!data) if(!dataFetchBoolean){
      getFetch('data', 'http://localhost:3500/api/getCtprvnRltmMesureDnsty')
      changer('dataFetchBoolean', true);
    }
  if(!text) if(!textFetchBoolean){
    getFetch('text', 'http://localhost:3500/api/getMinuDustFrcstDspth')
    changer('textFetchBoolean', true);
  };

  // 측정소 위치 데이터
  const stationsInfo = stationInfoJSON.items;

  const legendRef = useRef(null);

  // * 실시간 대기정보

  // 지도 범례 On/Off
  const [isOn0, setIsOn0] = useState(true);
  const [isOn1, setIsOn1] = useState(true);
  const [isOn2, setIsOn2] = useState(false);

  // * 오늘/내일 대기정보
  // 오늘/내일 대기정보 타입
  const [standbyType, setStandbyType] = useState('pm25');
  // 오늘/내일 대기정보 금일, 내일
  const [forecastDate, setForecastDate] = useState("1");

  const [running, setRunning] = useState(false);
  const [disableDuration, setDisableDuration] = useState(false);

  
  // * 하단배너
  // 대기예보 텍스트 인덱스
  const [airInfoIndex, setAirInfoIndex] = useState(1);
  const [intervalId, setIntervalId] = useState(null);

  // * 기타
  // 데이터 불러오기 [전체 측정소 대기 값, 대기정보 예보 텍스트]
  // 새로고침
  const [count, setCount] = useState(0);
  // 탭 목록 인덱스
  const [tapSelect, setTapSelect] = useState(0);
  
  // 가까운 위치의 측정소 데이터
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
      // station 정보를 store에 없는 경우에만 Fetch
      if(!stationFetchBoolean) {
        // 브라우저에서 현재 위치 기능을 지원하는 경우
        if('geolocation' in navigator) {
          if (window.confirm("현재위치 정보를 이용해서 측정소 정보를 보시겠습니까?")) {
              const success = async (pos) => {
                let { latitude, longitude } = pos.coords;
                if(latitude === undefined) latitude = '197806.5250901809';
                if(longitude === undefined) longitude = '451373.25740676327';
        
                const response = await fetch('http://localhost:3500/api/coordinate', {
                  method: "POST",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ latitude, longitude })
                });
                const {documents: [{x, y}]} = await response.json();
        
                const responseStation = await fetch('http://localhost:3500/api/station', {
                  method: "POST",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ x, y })
                });
                const stations = await responseStation.json();
                // 가까운 거리의 측정소 3개
                // setStation(stations);
        
                // 가까운 측정소
                const stationData = stationsInfo.find(item => item.stationName === stations[0].stationName);
                changer('stationFetchBoolean', true);
                changer('station', stationData);
              }
              const error = (err) => {
                console.info("위치 권한 차단됨: ", err);
                changer('station', defaultStation);
                alert('현재위치 사용권한이 거부되어 \'중구\' 지역을 기준으로 데이터를 출력합니다.\n\n활성화: \n설정 > 개인 정보 보호 및 보안 > 사이트 설정');
              };
              navigator.geolocation.getCurrentPosition(success, error);
              return;
          }
        } 
        alert('현재위치를 사용 또는 지원하지 않아 \'중구\' 지역을 기준으로 데이터를 출력합니다.');
      }

      // 브라우저에서 현재 위치 기능을 지원하지 않는 경우 또는 현재 위치 정보를 사용하지 않는 경우
      changer('station', defaultStation);
      changer('stationFetchBoolean', true);
  }, [changer, count]);

  // 모든 데이터가 Fetch 되어 데이터 출력에 문제가 없을 경우, 로딩이 되지 않았을 경우에 Loading
  useEffect(() => {
    if(dataFetchBoolean && textFetchBoolean && stationFetchBoolean && !loading)
        changer('loading', true);
  }, [dataFetchBoolean, textFetchBoolean, stationFetchBoolean, changer, loading]);
  
  const typeRange = getColorValue(0, type, true);

// ------------------------------------------------ component
  const LoadingScreen = () => {
    return (
      <Loading loading={String(loading)}>
        <div>데이터 처리중입니다.</div>
        <p>잠시만 기다려 주시기 바랍니다.</p>
        <img src="/loading_1.gif" alt="로딩 중" />
      </Loading>
    )
  };

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


  const RealTimeStandbyComp = () => {
    return (
      <>
        <RealTimeStandby Time={Time} />
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

  const StandByForecastComp = () => {
    return (
      <StandbyForecast Time={Time} standbyType={standbyType} forecastDate={forecastDate} />
    )
  };

  const RealTimeWeatherComp = () => {
    return (
      <RealTimeWeather></RealTimeWeather>
    )
  };

  const DynamicComponent = () => {
    const Components = {
      0: RealTimeStandbyComp,
      1: StandByForecastComp,
      2: RealTimeWeatherComp
    }
    const Result = Components[tapSelect];
    return (
      <Result />
    );
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
  const airInfoIndexUpHandle = async () => {
    if(!running){
      setRunning(true);
      setAirInfoIndex(airInfoIndex + 1);
      // 무한 롤링
      if(airInfoIndex >= 3){
        await sleep(0.3);
        setDisableDuration(true);
        setAirInfoIndex(1);
        await sleep(0);
        setDisableDuration(false);
      } else await sleep(0.3);
      setRunning(false);
    };
  };
  const airInfoIndexPlayHandle = () => {
    if(intervalId){
      clearInterval(intervalId);
    } else {
      const id = setInterval(() => {
        airInfoIndexUpHandle();
      }, 1000);
      setIntervalId(id);
    }
  };
  const airInfoIndexDownHandle = async () => {
    if(!running) {
      setRunning(true);
      setAirInfoIndex(airInfoIndex - 1);
      if(airInfoIndex <= 1){
          await sleep(0.3);
          setDisableDuration(true);
          setAirInfoIndex(3);
          await sleep(0);
          setDisableDuration(false);
        } else await sleep(0.3);
        setRunning(false);
    };
  };

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


  return (
    <>
      <HeaderComponent />
      <main>
        {/* 첫번째 색션 */}
        <FirstSection>
          {/* 로딩창 */}
          <LoadingScreen />
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
            <TodayAirQuality Time={Time} counts={{count, setCount}} />
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
                  <button onClick={airInfoIndexUpHandle} className="upBtn"></button>
                  <button onClick={airInfoIndexPlayHandle} className="playBtn"></button>
                  <button onClick={airInfoIndexDownHandle} className="downBtn"></button>
            </div>
          </SecondBanner>
        </SecondSection>
      </main>
      <FooterComponent />
    </>
  );
}

export default App;
