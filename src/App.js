import styled from '@emotion/styled';
import './App.css';
import Headers from './components/Header';
import {
  getColorValue,
  RealTimeStandby,
} from './components/RealtimeStandby';
import stationInfoJSON from './data/stationInfo.json';
import TodayAirQuality from './components/TodayAirQuality';
import { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { StandbyForecast } from './components/StandbyForecast';
import { RealTimeWeather } from './components/RealTimeWeather';

// ------------------------------------------------ fetch
const fetchData = async () => {
  try {
    const detailDataJson = await axios.get('http://localhost:3500/api/getCtprvnRltmMesureDnsty');
    const todayAirInformationJson = await axios.get('http://localhost:3500/api/getMinuDustFrcstDspth');
    return [detailDataJson.data, todayAirInformationJson.data];
  } catch (err) {
    console.error("Error: ", err);
    return null;
  }
}
const {items: stationsInfo} = stationInfoJSON;

function App() {
  // ------------------------------------------------ setting
  const legendRef = useRef(null);

  const [count, setCount] = useState(0);
  const [mMOSelect_return, setMMOSelect_return] = useState('khaiValue');
  const [mMOSelect_region, setMMOSelect_region] = useState('');
  const [mMoSelect_info, setMMOSelect_info] = useState('air');
  const [standbyType, setStandbyType] = useState('pm25');
  const [forecastDate, setForecastDate] = useState(1);

  const [isOn0, setIsOn0] = useState(true);
  const [isOn1, setIsOn1] = useState(true);
  const [isOn2, setIsOn2] = useState(false);

  const [tapSelect, setTapSelect] = useState(0);
  const [station, setStation] = useState(stationsInfo.find(item => item.stationName === '중구'));
  const [data, setData] = useState();
  const [airInformation, setAirInformation] = useState();
  const [openMap, setOpenMap] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterRange, setFilterRange] = useState([true, true, true, true, true]);
  const [filterData, setFilterData] = useState({도시대기: true, 국가배경농도: true, 도로변대기: true, 교외대기: false, 항만: false});

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옴
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    const airInformation = JSON.parse(localStorage.getItem('airInofrmation'));
    const expireTime = new Date(localStorage.getItem('expireTime'));

    const dataTime = storedData && new Date(storedData[0].dataTime);
    const now = new Date();
    const dot = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0);

    // 데이터가 없거나 만료 시간이 없거나 또는 만료 시간이 지났으면 데이터를 다시 가져와 업데이트
    if (!storedData || !expireTime || (expireTime < now) || (dot < dataTime) || !airInformation) {
      fetchData().then((result) => {
        if (result) {
          localStorage.setItem('storedData', JSON.stringify(result[0]));
          localStorage.setItem('airInformation', JSON.stringify(result[1]));

          const expireData = new Date();
          expireData.setHours(expireData.getHours() + 1, 0, 0, 0);
          localStorage.setItem('expireTime', expireData);

          setData(result[0]);
          setAirInformation(result[1]);
        }
      });
    } else {
      setData(storedData);
    }
    // setLoading(true);
  }, []);

  useEffect(() => {
    if('geolocation' in navigator) {
      const success = async (pos) => {
        let { latitude, longitude } = pos.coords;
        if(latitude === undefined) latitude = '197806.5250901809';
        if(longitude === undefined) longitude = '451373.25740676327';

        const { data } = await axios.post('http://localhost:3500/api/coordinate', { latitude, longitude});
        const { x, y } = data.documents[0];

        const { data: stations } = await axios.post('http://localhost:3500/api/station', {x, y});
        // 가까운 거리의 측정소 3개
        // setStation(stations);

        // 가까운 측정소
        const stationInfo = stationsInfo.find(item => item.stationName === stations[0].stationName);
        setStation(stationInfo);
      }
      // TODO: 위치 정보 비허용으로 중구 위치를 기준으로 한다는 모달창 출력
      const error = (err) => console.error('에러', err);

      navigator.geolocation.getCurrentPosition(success, error);
    }
}, [count]);


  const typeRange = getColorValue(0, mMOSelect_return, true);

  // ------------------------------------------------ style
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

      &:nth-of-type(${tapSelect + 1}){
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
  `
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

    button[data-information="${mMoSelect_info}"],
    button[data-date="${forecastDate}"]
    {
      font-weight: bold;
      background-color: #414d5d;
      color: #fff;
    }
  `
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
  `
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
  `
  const SecondSection = styled(Section)`
    margin: 50px auto 0;
    background: url('./img_bg_s_01.png') repeat-x 0 0;
    width: 1400px;
  `
  const SecondBanner = styled.div`
    position: relative;
    background: linear-gradient(to right, #009ff9, #00c36b);
    height: 100px;
    padding: 10px;
    border-radius: 8px;
    display:flex;
    align-items: center;
    gap: 30px;

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
      padding: 0 80px 0 0;
      background: #fff url(./img_bg_s_02.png) no-repeat right 24px bottom;
      border-radius: 30px 8px 30px 8px;
      position: relative;

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

      .info {
        text-indent: 40px;
      }
    }

    .button {
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;

      button {
        width: 20px;
        height: 20px;
      }
    }
  `
// ------------------------------------------------ component
  const TimeText = (() => {
    const storedDataString = localStorage.getItem('storedData');
    if(storedDataString) {
      const storedData = JSON.parse(storedDataString);
      if(Array.isArray(storedData) && storedData.length > 0) {
          const dataTime = storedData[0].dataTime;
          const updateTime = new Date(dataTime);
          const year = updateTime.getFullYear();
          const month = String(updateTime.getMonth() + 1).padStart(2, '0');
          const day = String(updateTime.getDate()).padStart(2, '0');
          const hour = String(updateTime.getHours()).padStart(2, '0');
          const minute = String(updateTime.getMinutes()).padStart(2, '0');

          return { year, month, day, hour, minute }
      };
    };
  })();
  const Time = ({ top, left, right, height, refresh, onClick, custom }) => {
    const DivStyle = styled.div`
      display: flex;
      gap: 5px !important;
      background-color: ${refresh ? '#e4f7ff' : '#fff'};
      height: ${height || "15px"};
      padding: 5px 15px;
      border-radius: 25px;
      align-items: center;
      position: absolute;
      top: ${top || 0};
      right: ${right || 0};
      left: ${left};
      font-size: 14px;

      strong {
        font-weight: 900;
      }
    `;
    const ButtonStyle = styled.button`
      background-image: ${props => props.ico && `url('/img_${props.ico}.png')`};
      display: inline-block;
      background: url('/img_refresh.png') no-repeat center;
      width: 16px;
      height: 20px;
      border: none;
      transition: transform 0.5s;
      position: relative;
      transform-origin: center;

      &:hover {
          cursor: pointer;
        }
    `;

    const storedDataString = localStorage.getItem('storedData');
    if(storedDataString) {
      const storedData = JSON.parse(storedDataString);
      if(Array.isArray(storedData) && storedData.length > 0) {
          const dataTime = storedData[0].dataTime;
          const updateTime = new Date(dataTime);
          const year = updateTime.getFullYear();
          const month = String(updateTime.getMonth() + 1).padStart(2, '0');
          const day = String(updateTime.getDate()).padStart(2, '0');
          const hour = String(updateTime.getHours()).padStart(2, '0');

          return (
            <DivStyle>
              {custom ?
              <span>{custom[0]} <strong>{custom[1]} 발표자료</strong></span> :
              <span>{year}년 {month}월 {day}일 <strong>{hour}시</strong></span>}
              {refresh && <ButtonStyle onClick={onClick}>새로고침</ButtonStyle>}
            </DivStyle>
          )
      }
    } else {
      return (
            <DivStyle>
              <span>0000년 00월 00일 <strong>00시</strong></span>
              {refresh && <ButtonStyle onClick={onClick}>새로고침</ButtonStyle>}
            </DivStyle>
      )
    }
  };

  const LoadingScreen = () => {
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
    return (
      <Loading loading={loading.toString()}>
        <div>데이터 처리중입니다.</div>
        <p>잠시만 기다려 주시기 바랍니다.</p>
        <img src="/loading_1.gif" alt="로딩 중" />
      </Loading>
    )
  };

  const RealTimeStandbyComp = () => {
    return (
      <>
         <RealTimeStandby
                childrenComponents={{Time}}
                station={station}
                setStation={setStation}
                loading={loading}
                setLoading={setLoading}
                info={mMoSelect_info}
                type={mMOSelect_return}
                airData={data}
                mapSetting={{openMap, setOpenMap, setMMOSelect_region}}
                filter={{range: filterRange, data: filterData}}
        ></RealTimeStandby>
        <Time />
        <LegendWrapper ref={legendRef}>
          {mMoSelect_info === 'air' ?
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
                  <span>좋음 ({`0~${mMOSelect_return === 'o3Value' ? typeRange[1].toFixed(3) : typeRange[1]}`})</span>
                </label>
                <label><input type="checkbox" onChange={filterRangeHandle} value="2" checked={filterRange[1]} />
                  <span>보통 ({`${mMOSelect_return === 'o3Value' ? typeRange[2].toFixed(3) : typeRange[2]}~${mMOSelect_return === 'o3Value' ? typeRange[3].toFixed(3) : typeRange[3]}`})</span>
                </label>
                <label><input type="checkbox" onChange={filterRangeHandle} value="3" checked={filterRange[2]} />
                  <span>나쁨 ({`${mMOSelect_return === 'o3Value' ? typeRange[4].toFixed(3) : typeRange[4]}~${mMOSelect_return === 'o3Value' ? typeRange[5].toFixed(3): typeRange[5]}`})</span>
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
      <StandbyForecast
        childrenComponents={{Time}}
        airInformation={airInformation}
        forecastDate={forecastDate}
        standbyType={standbyType}
      ></StandbyForecast>
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
  const tapSelectHandle = (e) => {
    const liElement = e.currentTarget.parentNode;
    const ulElement = liElement.closest('ul');
    const selectIndex = Array.prototype.indexOf.call(ulElement.children, liElement);
    setTapSelect(selectIndex);
  };
  const mMoSelectHandle = (e) => {
    const { value, dataset: { information } } = e.currentTarget;

    // 대기/경보 정보, 측정소 정보 클릭 시
    if(information){
      // information === 'station' ? setLegendPopup(prevState => ({index: 1, state: [true, true, false, false]})) : setLegendPopup(0);
      setMMOSelect_info(information);
    } else {
      if(value.match(/Value/gi)){
        setMMOSelect_return(value);
      }
      else {
        setOpenMap(value);
        setMMOSelect_region(value);
      }
    }
  };
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

    setFilterRange(data);
  };
  const filterDataHandle = (e) => {
    const { innerText }= e.currentTarget.parentNode;

    const data = {...filterData};
    data[innerText] = e.currentTarget.checked;

    setFilterData(data);
  };

  const standbyTypeHandle = (e) => {
    setStandbyType(e.target.value);
  };
  const forecastDateHandle = (e) => {
    setForecastDate(e.currentTarget.dataset.date);
  }

  const array = [23, 17, 11, 5];
  let target = TimeText.hour; // 찾고자 하는 값
  
  for (const element of array){
    if(target > element){
      target = element;
      break;
    };
  };

  const filterAirInformation = airInformation.filter(item => {
    return item.dataTime === `${TimeText.year}-${TimeText.month}-${TimeText.day} ${target}시 발표`;
  });
  const bannerInfoData = filterAirInformation.map((item, idx) => {
    const itemDate = item.informData;
    const nowDate = `${TimeText.year}-${TimeText.month}-${TimeText.day}`;
    const two = `${TimeText.year}-${TimeText.month}-${String(Number(TimeText.day) + 1).padStart(2, '0')}`;
    const three = `${TimeText.year}-${TimeText.month}-${String(Number(TimeText.day) + 2).padStart(2, '0')}`;
    let txt;
    if(itemDate === nowDate){txt='금일'}
    else if(itemDate === two){txt='내일'}
    else if(itemDate === three){txt='모레'};
    if(item.informCode === 'PM10'){
      return <p key={idx}><span>{txt}</span>{item.informCause}</p>
    } else {
      return null;
    }
  })


  return (
    <>
      <Headers />
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
                <li>
                  <button onClick={tapSelectHandle}>
                    실시간 대기정보
                  </button>
                </li>
                <li>
                  <button onClick={tapSelectHandle}>오늘/내일 대기정보</button>
                </li>
                <li>
                  <button onClick={tapSelectHandle}>실시간 기상정보</button>
                </li>
                <li>
                  <button onClick={tapSelectHandle}>오늘/내일 기상정보</button>
                </li>
              </MMOList>
              <MMOContainer>
                {tapSelect === 0 &&
                <>
                  <MMOSelectWrapper flex align="left">
                    <MMOSelect id="area1" bg $width="180px" onChange={mMoSelectHandle} value={mMOSelect_return}>
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
                    <MMOSelect id="area2" bg $width="130px" onChange={mMoSelectHandle} value={mMOSelect_region}>
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
                    <button onClick={mMoSelectHandle} data-information="air">대기/경보 정보</button>
                    <button onClick={mMoSelectHandle} data-information="station">측정소 정보</button>
                  </MMOBorderDiv>
                </>}
                {tapSelect === 1 && <>
                  <MMOSelectWrapper flex align="left">
                    <MMOSelect bg $width="180px" onChange={standbyTypeHandle} value={standbyType}>
                      <option value="pm25">초미세먼지 (PM-2.5)</option>
                      <option value="pm10">미세먼지 (PM-10)</option>
                    </MMOSelect>
                  </MMOSelectWrapper>
                  <MMOBorderDiv>
                    <button onClick={forecastDateHandle} data-date="0">오늘</button>
                    <button onClick={forecastDateHandle} data-date="1">내일</button>
                  </MMOBorderDiv>
                </>}
              </MMOContainer>
            </MMOptionLayout>
            {/* Main Map 전국 지도 */}
            <MMWrapper>
              {/* {tapSelect === 0 && <RealTimeStandbyComp />} */}
              {/* {tapSelect === 1 && <StandbyForecast />} */}
              <DynamicComponent />
            </MMWrapper>
          </MMLayout>
          {/* 대기/기상 데이터 정보 */}
            <TodayAirQuality
              childrenComponents={{Time}}
              station={station}
              setStation={setStation}
              loading={loading}
              setLoading={setLoading}
              airData={data}
              counts={{count, setCount}}
              />
        </FirstSection>
        <SecondSection>
          <SecondBanner>
            <div className="updateTime">{TimeText && `${TimeText.year}.${TimeText.month}.${TimeText.day}`} <strong>{TimeText && `${TimeText.hour}:${TimeText.minute}`}</strong></div>
            <div className="text">
              <div className="title">
                <strong>예보</strong>발표
              </div>
              <div className="info">
                {bannerInfoData}
              </div>
            </div>
            <div className="button">
                  <button></button>
                  <button></button>
                  <button></button>
            </div>
          </SecondBanner>
        </SecondSection>
      </main>
    </>
  );
}

export default App;
