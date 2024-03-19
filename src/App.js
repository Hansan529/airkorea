import styled from '@emotion/styled';
import './App.css';
import Headers from './components/Header';
import {
  MapPaths,
  dateTime,
} from './components/MapPath';
import TodayAirQuality from './components/TodayAirQuality';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// ------------------------------------------------ fetch

const fetchData = async () => {
  try {
    const detailDataJson = await axios.get('http://localhost:3500/api/getCtprvnRltmMesureDnsty');
    return detailDataJson.data;
  } catch (err) {
    console.error("Error: ", err);
    return null;
  }
}

// ------------------------------------------------ styled
const Icon = styled.button`
  background-image: ${props => props.ico && `url('/img_${props.ico}.png')`};
  &:hover {
      cursor: pointer;
    }
`;

// ------------------------------------------------ component
export const Time = ({ top, left, right, refresh, onClick }) => {
  const updateTime = new Date(dateTime);
  const year = updateTime.getFullYear();
  const month = String(updateTime.getMonth() + 1).padStart(2, '0');
  const day = String(updateTime.getDate()).padStart(2, '0');
  const hour = String(updateTime.getHours()).padStart(2, '0');

  const DivStyle = styled.div`
    display: flex;
    gap: 5px !important;
    background-color: ${refresh ? '#e4f7ff' : '#fff'};
    height: 15px;
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
  const ButtonStyle = styled(Icon)`
    display: inline-block;
    background: url('/img_refresh.png') no-repeat center;
    width: 16px;
    height: 20px;
    border: none;
    transition: transform 0.5s;
    position: relative;
    transform-origin: center;

    /* &:hover {
      transform: rotate(-360deg);
    } */
  `;

  return (
    <DivStyle>
      <span>{year}년 {month}월 {day}일 <strong>{hour}시</strong></span>
      {refresh && <ButtonStyle onClick={onClick}>새로고침</ButtonStyle>}
    </DivStyle>
  )
};

function App() {
  // ------------------------------------------------ component
  const Main = ({ children }) => <main>{children}</main>;

  // ------------------------------------------------ setting
  const [mMOSelect_return, setMMOSelect_return] = useState('khaiValue');
  const [mMOSelect_region, setMMOSelect_region] = useState('');
  const [mMoSelect_info, setMMOSelect_info] = useState('air');

  const [tapSelect, setTapSelect] = useState(0);
  const [station, setStation] = useState({
    "dmX": "37.564639",
    "item": "SO2, CO, O3, NO2, PM10, PM2.5",
    "mangName": "도시대기",
    "year": "1995",
    "addr": "서울 중구 덕수궁길 15 시청서소문별관 3동",
    "stationName": "중구",
    "dmY": "126.975961",
    "top" : "136",
    "left" : "264"
});

  const [count, setCount] = useState(0);
  // const [station, setStation] = useState([{ stationCode: "111121", tm: 0.4, addr: "서울 중구 덕수궁길 15 시청서소문별관 3동", stationName: "중구" }]);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  
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
    padding-top: 20px;
  `;
  const MMLayout = styled.div`
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
        font-weight: 500;
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
    flex: 1 1 calc(33.333% - 20px);
    text-align: center;
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
    }

    button[data-information="${mMoSelect_info}"]{
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
  `;
  const InfoContainer = styled.div`
      width: 660px;
      /* overflow: hidden; */
  `;
  const InfoWrapper = styled.div`
    border: 5px solid #00aeee;
    border-radius: 20px;
    padding: 15px;
    background-color: #fff;

    > div:first-of-type{
      background: url('/img_bg01.png') no-repeat;
      height: 55px;
      line-height: 55px;
      border-bottom: 1px solid rgba(0,0,0,0.3);
      margin-bottom: 15px;

      h2 {
        font-size: 30px;
        font-weight: 700;
        text-align: center;

        > span {
          color: #0f62cc;
        }
      }
    }

    > div:nth-of-type(2) {
      position: relative;
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        gap: 10px;

        > p  {
          font-size: 18px;
          > strong { color: #0f62cc; }
          > span { display: block; margin-top: 5px; font-size: 14px; }
        }
      }

      button {
        font-size: 0;
      }
    }
  `;
  const InfoButton = styled(Icon)`
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 1px solid #c6ccd4;
      border-radius: 5px;
      background-color: #fff;
      background-size: ${props => props.ico === 'bg_search' && '70%'};
      background-repeat: no-repeat;
      background-position: center;

      &:hover {
        background-color: rgba(0,0,0,0.2);
      }
  `
  const InfoInteraction = styled.div`margin-bottom: 20px;`;

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
        setStation(stations[0]);
        setLoading(true);
      }
      // TODO: 위치 정보 비허용으로 중구 위치를 기준으로 한다는 모달창 출력
      const error = (err) => console.error('에러', err);
      
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [count]);

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옴
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    const expireTime = localStorage.getItem('expireTime');
  
    // 데이터가 없거나 만료 시간이 없거나 또는 만료 시간이 지났으면 데이터를 다시 가져와 업데이트
    if (!storedData || !expireTime || new Date(expireTime) < new Date()) {
      fetchData().then((result) => {
        if (result) {
          localStorage.setItem('storedData', JSON.stringify(result));
          
          const expireData = new Date();
          expireData.setHours(expireData.getHours() + 1, 0, 0, 0);
          localStorage.setItem('expireTime', expireData);
  
          setData(result);
        }
      });
    } else {
      setData(storedData);
    }
  }, []);
  
  // ------------------------------------------------ event
  const refreshHandleClick = () => setCount(count + 1);
  
  const tapSelectHandle = (e) => {
    const liElement = e.currentTarget.parentNode;
    const ulElement = liElement.closest('ul');
    const selectIndex = Array.prototype.indexOf.call(ulElement.children, liElement);
    setTapSelect(selectIndex);
  }

  const mMoSelectHandle = (e) => {
    const { value, dataset: { information } } = e.currentTarget;
    
    // 대기/경보 정보, 측정소 정보 클릭 시
    if(information){
      setMMOSelect_info(information);
    } else {
      if(value.match(/Value/gi) === null) setMMOSelect_region(value);
      else setMMOSelect_return(value);
    }

  };

  return (
    <>
      <Headers />
      <Main>
        {/* 첫번째 색션 */}
        <FirstSection>
          {/* 대기/기상 지도 정보 */}
          <MMLayout>
            {/* Main Map 설정 */}
            <MMOptionLayout>
              <MMOList>
                <li>
                  <button onClick={tapSelectHandle} className="on">
                    실시간 대기정보
                  </button>
                </li>
                <li>
                  <button onClick={tapSelectHandle}>오늘/내일/모레 대기정보</button>
                </li>
                <li>
                  <button onClick={tapSelectHandle}>실시간 기상정보</button>
                </li>
                <li>
                  <button onClick={tapSelectHandle}>오늘/내일/모레 기상정보</button>
                </li>
              </MMOList>
              <MMOContainer>
                <MMOSelectWrapper>
                  <label htmlFor="area1" style={{ marginRight: '5px' }}>
                    종류
                  </label>
                  <MMOSelect id="area1" bg $width="180px" onChange={mMoSelectHandle}>
                    <option value="khaiValue">통합대기환경지수(CAI)</option>
                    <option value="pm25Value">초미세먼지 (PM-2.5)</option>
                    <option value="pm10Value">미세먼지 (PM-10)</option>
                    <option value="o3Value">오존(O₃)</option>
                    <option value="no2Value">이산화질소(NO₂)</option>
                    <option value="coValue">일산화탄소 (CO)</option>
                    <option value="so2Value">아황산가스 (SO₂)</option>
                  </MMOSelect>
                </MMOSelectWrapper>
                <MMOSelectWrapper>
                  <label htmlFor="area2" style={{ marginRight: '5px' }}>
                    시/도
                  </label>
                  <MMOSelect id="area2" bg $width="130px" onChange={mMoSelectHandle}>
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
                <MMOBorderDiv>
                  <button onClick={mMoSelectHandle} data-information="air" className="on">대기/경보 정보</button>
                  <button onClick={mMoSelectHandle} data-information="station">측정소 정보</button>
                  </MMOBorderDiv>
              </MMOContainer>
            </MMOptionLayout>
            {/* Main Map 전국 지도 */}
            <MMWrapper>
              <MapPaths stationSelect={setStation} info={mMoSelect_info} type={mMOSelect_return}></MapPaths>
              <Time />
            </MMWrapper>
          </MMLayout>
          {/* 대기/기상 데이터 정보 */}
          <InfoContainer>
            <InfoWrapper>
              <div>
                <h2>
                  우리동네 <span>대기정보</span>
                </h2>
              </div>
              <div>
                <InfoInteraction>
                  <InfoButton ico={'bg_search'}>검색</InfoButton>
                  <InfoButton ico={'pos'}>현위치</InfoButton>
                  <p>
                    <strong>{loading && (station.stationName)}</strong> 중심으로 측정
                    <span>({station.addr.split(' ')[0]} {station.addr.split(' ')[1]} {station.stationName} 측정소 기준)</span>
                  </p>
                </InfoInteraction>
                <Time refresh onClick={refreshHandleClick} />
              </div>
              <TodayAirQuality $stationName={station.stationName} />
            </InfoWrapper>
          </InfoContainer>
        </FirstSection>
      </Main>
    </>
  );
}

export default App;
