import styled from '@emotion/styled';
import './App.css';
import Headers from './components/Header';
import {
  MapPaths,
} from './components/MapPath';
import stationInfoJSON from './data/stationInfo.json';
import TodayAirQuality from './components/TodayAirQuality';
import { useEffect, useState } from 'react';
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
const {items: stationInfo} = stationInfoJSON;

function App() {
  // ------------------------------------------------ component
  const Main = ({ children }) => <main>{children}</main>;

  // ------------------------------------------------ setting
  const [mMOSelect_return, setMMOSelect_return] = useState('khaiValue');
  const [mMOSelect_region, setMMOSelect_region] = useState('');
  const [mMoSelect_info, setMMOSelect_info] = useState('air');

  const [tapSelect, setTapSelect] = useState(0);
  const [station, setStation] = useState(stationInfo.find(item => item.stationName === '중구'));
  const [data, setData] = useState();
  const [openMap, setOpenMap] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 가져옴
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    const expireTime = new Date(localStorage.getItem('expireTime'));

    const dataTime = storedData && new Date(storedData[0].dataTime);
    const now = new Date();
    const dot = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0);

    // 데이터가 없거나 만료 시간이 없거나 또는 만료 시간이 지났으면 데이터를 다시 가져와 업데이트
    if (!storedData || !expireTime || (expireTime < now) || (dataTime < dot < expireTime)) {
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
    // setLoading(true);
  }, []);

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
      cursor: pointer;
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
// ------------------------------------------------ component
  const Time = ({ top, left, right, height, refresh, onClick }) => {
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
              <span>{year}년 {month}월 {day}일 <strong>{hour}시</strong></span>
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

  // ------------------------------------------------ event
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
      if(value.match(/Value/gi)){
        setMMOSelect_return(value);
      }
      else {
        setOpenMap(value);
        setMMOSelect_region(value);
      }
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
                <MMOSelectWrapper>
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
                <MMOBorderDiv>
                  <button onClick={mMoSelectHandle} data-information="air">대기/경보 정보</button>
                  <button onClick={mMoSelectHandle} data-information="station">측정소 정보</button>
                  </MMOBorderDiv>
              </MMOContainer>
            </MMOptionLayout>
            {/* Main Map 전국 지도 */}
            <MMWrapper>
              <MapPaths
                childrenComponents={{Time}}
                station={station}
                setStation={setStation}
                loading={loading}
                setLoading={setLoading}
                info={mMoSelect_info}
                type={mMOSelect_return}
                airData={data}
                mapSetting={{openMap, setOpenMap, setMMOSelect_region}}
              ></MapPaths>
              <Time />
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
              />
        </FirstSection>
      </Main>
    </>
  );
}

export default App;
