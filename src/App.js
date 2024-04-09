import styled from '@emotion/styled';
import './App.css';
import Headers from './components/Header';
import {
  getColorValue,
  RealTimeStandby,
} from './components/RealtimeStandby';
import stationInfoJSON from './data/stationInfo.json';
import TodayAirQuality from './components/TodayAirQuality';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { StandbyForecast } from './components/StandbyForecast';
import { RealTimeWeather } from './components/RealTimeWeather';
import { CopyRight, FirstSection, Legend, LegendWrapper, Loading, MMLayout, MMOBorderDiv, MMOContainer, MMOList, MMOptionLayout, MMOSelect, MMOSelectWrapper, MMWrapper, SecondBanner, SecondBannerInfo, SecondSection } from './styleComponent';

function App() {
  // ------------------------------------------------ setting
  // 측정소 위치 데이터
  const stationsInfo = stationInfoJSON.items;

  const legendRef = useRef(null);

  // * 실시간 대기정보
  // 출력 타입 khai, pm25, pm10, o3, no2, co, so2
  const [mMOSelect_return, setMMOSelect_return] = useState('khaiValue');
  // 지역 - 서울, 경기, 인천, 강원, 충남, 대전, 충북, 세종, 부산, 울산, 대구, 경북, 경남, 전남, 광주, 전북, 제주
  const [mMOSelect_region, setMMOSelect_region] = useState('');
  // 대기정보 / 측정소 정보
  const [mMoSelect_info, setMMOSelect_info] = useState('air');

  // 지도 범례 On/Off
  const [isOn0, setIsOn0] = useState(true);
  const [isOn1, setIsOn1] = useState(true);
  const [isOn2, setIsOn2] = useState(false);
  // 농도 범위 필터링
  const [filterRange, setFilterRange] = useState([true, true, true, true, true]);
  // 측정망 구분 필터링
  const [filterData, setFilterData] = useState({도시대기: true, 국가배경농도: true, 도로변대기: true, 교외대기: false, 항만: false});
  
  // * 오늘/내일 대기정보
  // 오늘/내일 대기정보 타입
  const [standbyType, setStandbyType] = useState('pm25');
  // 오늘/내일 대기정보 금일, 내일
  const [forecastDate, setForecastDate] = useState(1);

  // * 우리동네 대기정보
  // 우리동네 대기정보 측정소 데이터
  const [station, setStation] = useState(stationsInfo.find(item => item.stationName === '중구'));
  // 모든 측정소 대기정보 데이터
  const [data, setData] = useState();
  
  // * 하단배너
  // 대기예보 텍스트
  const [airInformation, setAirInformation] = useState();
  // 대기예보 텍스트 인덱스
  const [airInfoIndex, setAirInfoIndex] = useState(1);

  // * 기타
  // 데이터 불러오기 [전체 측정소 대기 값, 대기정보 예보 텍스트]
  const [fetchData, setFetchData] = useState();
  // 상세 지역 Open/Close
  const [openMap, setOpenMap] = useState(0);
  // 데이터 로딩
  const [loading, setLoading] = useState(false);
  // 새로고침
  const [count, setCount] = useState(0);
  // 탭 목록 인덱스
  const [tapSelect, setTapSelect] = useState(0);
  
// ------------------------------------------------ fetch
useEffect(() => {
  (async () => {
    try {
      const detailDataJson = await axios.get('http://localhost:3500/api/getCtprvnRltmMesureDnsty');
      const todayAirInformationJson = await axios.get('http://localhost:3500/api/getMinuDustFrcstDspth');
      setFetchData([detailDataJson.data, todayAirInformationJson.data]);
    } catch (err) {
      console.error("Error: ", err);
      setFetchData(null);
    };
  })();
}, [])

  // 측정소 데이터
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
      if (fetchData) {
        localStorage.setItem('storedData', JSON.stringify(fetchData[0]));
        localStorage.setItem('airInformation', JSON.stringify(fetchData[1]));

        const expireData = new Date();
        expireData.setHours(expireData.getHours() + 1, 0, 0, 0);
        localStorage.setItem('expireTime', expireData);

        setData(fetchData[0]);
        setAirInformation(fetchData[1]);
      }
  } else {
    setData(storedData);
  }
  // setLoading(true);
}, [fetchData]);

// 가까운 위치의 측정소 데이터
useEffect(() => {
  if (window.confirm("현재위치 정보를 이용해서 측정소 정보를 보시겠습니까?")) {
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
      const error = (err) => {
        console.log("위치 권한 오류: ", err);
        const stationInfo = {
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
      }
        setStation(stationInfo);
        alert('현재위치 사용권한이 거부되어 \'중구\' 지역을 기준으로 데이터를 출력합니다.\n\n활성화: \n설정 > 개인 정보 보호 및 보안 > 사이트 설정');
      };

      navigator.geolocation.getCurrentPosition(success, error);
    }
  } else {
    (async () => {
      // const latitude = '197806.5250901809';
      // const longitude = '451373.25740676327';
      const stationInfo = {
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
      }
      setStation(stationInfo);
    })();
  }
}, [stationsInfo]);

  
const typeRange = getColorValue(0, mMOSelect_return, true);

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

    if(TimeText) {
        return (
          <DivStyle>
            {custom ?
            <span>{custom[0]} <strong>{custom[1]} 발표자료</strong></span> :
            <span>{TimeText.year}년 {TimeText.month}월 {TimeText.day}일 <strong>{TimeText.hour}시</strong></span>}
            {refresh && <ButtonStyle onClick={onClick}>새로고침</ButtonStyle>}
          </DivStyle>
        )
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
  };
  const airInfoIndexHandle = (e) => {
    const { value } = e.target.classList;
    if(value === 'upBtn'){
      if(airInfoIndex >= 4) setAirInfoIndex(2);
      else setAirInfoIndex(airInfoIndex + 1);
    };
    // setAirInfoIndex()
  }

  // function BannerData() {
  //   const array = [23, 17, 11, 5];
  //   let target = TimeText.hour; // 찾고자 하는 값
    
  //   for (const element of array){
  //     if(target > element){
  //       target = element;
  //       break;
  //     };
  //   };
  
  //   let filterAirInformation = airInformation?.filter(item => {
  //     return item.dataTime === `${TimeText.year}-${TimeText.month}-${TimeText.day} ${target}시 발표` && item.informCode === 'PM10';
  //   });
  
  //   if(filterAirInformation){
  //     const { length } = filterAirInformation;
  //     const first = filterAirInformation[0];
  //     const last = filterAirInformation[length - 1];
  
  //     if(length === 3){
  //       filterAirInformation.splice(0,0, last);
  //       filterAirInformation.splice(length,0, first);
  //     } else {
  //       filterAirInformation.splice(length, 0, {
  //         ...last,
  //         informData: `${last.informData.slice(0, -2)}${String(Number(last.informData.slice(-2)) + 1).padStart(2, '0')}`,
  //         informCause: '○ [미세먼지] 모레 4등급(좋음, 보통, 나쁨, 매우나쁨) 예보는 17시에 발표되며, 모레 2등급(낮음, 높음) 예보는 주간예보를 참고하시기 바랍니다.'
  //       });
  //       filterAirInformation.splice(0, 0, filterAirInformation[length]);
  //       filterAirInformation.splice(length+2, 0, first);
  //     }
  //   };
  //   const data = filterAirInformation?.map((item, idx) => {
  //     const itemDate = item?.informData;
  //     const nowDate = `${TimeText.year}-${TimeText.month}-${TimeText.day}`;
  //     const two = `${TimeText.year}-${TimeText.month}-${String(Number(TimeText.day) + 1).padStart(2, '0')}`;
  //     const three = `${TimeText.year}-${TimeText.month}-${String(Number(TimeText.day) + 2).padStart(2, '0')}`;
  //     let txt;
  //     if(itemDate === nowDate){txt='금일'}
  //     else if(itemDate === two){txt='내일'}
  //     else if(itemDate === three){txt='모레'};
  //     return <div key={idx}><strong>{txt}</strong><span>{item?.informCause.slice(2).replace(/[＊*]/g, ' ')}</span></div>
  //   })

  //   return data || <></>;
  // }


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
                <li select={tapSelect === 0 ? 'on' : 'off'}>
                  <button onClick={tapSelectHandle}>
                    실시간 대기정보
                  </button>
                </li>
                <li select={tapSelect === 1 ? 'on' : 'off'}>
                  <button onClick={tapSelectHandle}>오늘/내일 대기정보</button>
                </li>
                <li select={tapSelect === 2 ? 'on' : 'off'}>
                  <button onClick={tapSelectHandle}>실시간 기상정보</button>
                </li>
                <li select={tapSelect === 3 ? 'on' : 'off'}>
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
                    <button onClick={mMoSelectHandle} active={mMoSelect_info === 'air' ? 'on' : 'off'} data-information="air">대기/경보 정보</button>
                    <button onClick={mMoSelectHandle} active={mMoSelect_info === 'station' ? 'on' : 'off'} data-information="station">측정소 정보</button>
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
                    <button onClick={forecastDateHandle} active={forecastDate === "0" ? 'on' : 'off'} data-date="0">오늘</button>
                    <button onClick={forecastDateHandle} active={forecastDate === "1" ? 'on' : 'off'} data-date="1">내일</button>
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
              <SecondBannerInfo index={airInfoIndex}>
                {/* <BannerData /> */}
              </SecondBannerInfo>
            </div>
            <div className="buttonWrap">
                  <button onClick={airInfoIndexHandle} className="upBtn"></button>
                  <button onClick={airInfoIndexHandle} className="playBtn"></button>
                  <button onClick={airInfoIndexHandle} className="downBtn"></button>
            </div>
          </SecondBanner>
        </SecondSection>
        <CopyRight>
          <p>인증을 받지 않은 실시간자료이므로 자료 오류 및 표출방식에 따라 값이 다를 수 있음에 유의해주세요.</p>
          <img src="/img_opentype03.png" alt="한국환경공단 에어코리아 OpenAPI 출처표시 + 변경금지" />
          <p>한국환경공단 에어코리아 대기오염정보, 측정소정보, 대기오염통계 현황</p>
        </CopyRight>
      </main>
    </>
  );
}

export default App;
