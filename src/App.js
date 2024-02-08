import styled from '@emotion/styled';
import './App.css';
import Headers from './components/Header';
import {
  BusanInner,
  BusanPath,
  ChungbukInner,
  ChungbukPath,
  ChungnamInner,
  ChungnamPath,
  DaeguPath,
  DaejeonInner,
  DaejeonPath,
  GangwonInner,
  GangwonPath,
  GwangjuPath,
  GyeongbukPath,
  GyeonggiInner,
  GyeonggiPath,
  GyeongnamPath,
  IncheonInner,
  IncheonPath,
  JejuPath,
  JeonbukPath,
  JeonnamPath,
  SejongInner,
  SejongPath,
  SeoulInner,
  SeoulPath,
  UlsanPath,
} from './components/MapPath';

const Select = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Main = styled.main``;
const Section = styled.section``;

const Time = styled.span``;

const FirstSection = styled(Section)`
  background: url('/img_main_bg.png') repeat-x 0 0;
`;

const MMLayout = styled.div``;
const MMOptionLayout = styled.div`
  width: 710px;
`;
const MMOList = styled.ul`
  display: flex;
  margin: 0;
  margin-bottom: 10px;

  li {
    flex: 1;
    text-align: center;
    border: 1px solid #d2d2d2;
    border-bottom: none;

    a {
      display: block;
      height: 50px;
      line-height: 50px;
      letter-spacing: -0.6px;
      font-weight: 500;
      background: #fff;
    }
    a.on {
      background: #0f62cc;
      color: #fff;
    }
  }
`;
const MMOContainer = styled.div`
  height: 50px;
  background: linear-gradient(to right, #009ffa, #00c36a);
  border-radius: 6px;
  display: flex;
`;
const MMOSelectWrapper = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  color: #0a0a0a;
`;
const MMOSelect = styled(Select)`
  border-radius: 30px;
  background: #fff no-repeat right 10px center;
  background-image: ${(props) => props.bg && "url('/img_new_arr_down_on.png')"};
  width: ${(props) => props.width};
  height: 30px;
  padding: ${(props) => (props.flex ? '0 3px' : '0 15px')};
  border: none;
  display: ${(props) => props.flex && 'flex'};
  justify-content: center;
  align-items: center;

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

const MMWrapper = styled.div`
  width: 700px;
  height: 705px;
  box-sizing: border-box;
  background: url('/map_svg_warp_bg.png') no-repeat;
  position: relative;

  /* 맵 */
  > svg {
    margin-top: -25px;
  }

  /* 기준 날짜 */
  > span {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    min-width: 143px;
    height: 30px;
    padding: 0 20px;
    background: #fff;
    font-size: 14px;
    color: #6e6e6e;
    line-height: 30px;
    font-weight: 400;
    border-radius: 15px;
    text-align: center;
    border: 1px solid #d2d2d2;

    strong {
      color: #000;
    }
  }
`;

//

const InfoContainer = styled.div``;

function App() {
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
                  <a className="on" href>
                    실시간 대기정보
                  </a>
                </li>
                <li>
                  <a href>오늘/내일/모레 대기정보</a>
                </li>
                <li>
                  <a href>실시간 기상정보</a>
                </li>
                <li>
                  <a href>오늘/내일/모레 기상정보</a>
                </li>
              </MMOList>
              <MMOContainer>
                <MMOSelectWrapper>
                  <MMOSelect bg width="188px">
                    <option value="KHAI">통합대기환경지수(CAI)</option>
                    <option value="10008">초미세먼지 (PM-2.5)</option>
                    <option value="10007">미세먼지 (PM-10)</option>
                    <option value="10003">오존(O₃)</option>
                    <option value="10006">이산화질소(NO₂)</option>
                    <option value="10002">일산화탄소 (CO)</option>
                    <option value="10001">아황산가스 (SO₂)</option>
                  </MMOSelect>
                </MMOSelectWrapper>
                <MMOSelectWrapper>
                  <label for="area1" style={{ marginRight: '5px' }}>
                    시/도
                  </label>
                  <MMOSelect bg id="area1" width="130px">
                    <option value="">-전체-</option>
                    <option value="02">서울특별시</option>
                    <option value="051">부산광역시</option>
                    <option value="053">대구광역시</option>
                    <option value="032">인천광역시</option>
                    <option value="062">광주광역시</option>
                    <option value="042">대전광역시</option>
                    <option value="052">울산광역시</option>
                    <option value="031">경기도</option>
                    <option value="033">강원특별자치도</option>
                    <option value="043">충청북도</option>
                    <option value="041">충청남도</option>
                    <option value="063">전라북도</option>
                    <option value="061">전라남도</option>
                    <option value="044">세종특별자치시</option>
                    <option value="054">경상북도</option>
                    <option value="055">경상남도</option>
                    <option value="064">제주특별자치도</option>
                  </MMOSelect>
                </MMOSelectWrapper>
              </MMOContainer>
            </MMOptionLayout>
            {/* Main Map 전국 지도 */}
            <MMWrapper>
              {/* <SeoulInner /> */}
              {/* <GyeonggiInner /> */}
              {/* <IncheonInner /> */}
              {/* <GangwonInner /> */}
              {/* <ChungnamInner /> */}
              {/* <DaejeonInner /> */}
              {/* <ChungbukInner /> */}
              {/* <SejongInner /> */}
              <BusanInner />
              <svg
                version="1.1"
                id="map_svg_city"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="700px"
                height="730px"
                viewBox="0 0 700 730"
                enableBackground="new 0 0 700 730"
                xmlSpace="preserve"
              >
                <g>
                  <IncheonPath />
                  <SeoulPath />
                  <GyeonggiPath />
                  <GangwonPath />
                  <ChungbukPath />
                  <ChungnamPath />
                  <SejongPath />
                  <DaejeonPath />
                  <GyeongbukPath />
                  <GyeongnamPath />
                  <DaeguPath />
                  <UlsanPath />
                  <BusanPath />
                  <JeonbukPath />
                  <JeonnamPath />
                  <GwangjuPath />
                  <JejuPath />
                </g>
              </svg>
              <Time>
                0000년 00월 00일 <strong>00시</strong>
              </Time>
            </MMWrapper>
          </MMLayout>
          {/* 대기/기상 데이터 정보 */}
          <InfoContainer>
            <div>
              <h2>
                우리동네 <span>대기정보</span>
              </h2>
              <div>
                <button>검색</button>
                <button>현위치</button>
                <p>
                  <strong>중구</strong> 중심으로 측정
                  <span>(서울 중구 중구 측정소 기준)</span>
                </p>
                <Time>
                  0000년 00월 00일 <strong>00시</strong>{' '}
                  <button>새로고침</button>
                </Time>
              </div>
            </div>
          </InfoContainer>
        </FirstSection>
      </Main>
    </>
  );
}

export default App;
