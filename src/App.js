import styled from '@emotion/styled';
import './App.css';
import Headers from './components/Header';
import {
  BusanPath,
  ChungbukPath,
  ChungnamPath,
  DaeguPath,
  DaejeonPath,
  GangwonPath,
  GwangjuPath,
  GyeongbukPath,
  GyeonggiPath,
  GyeongnamPath,
  IncheonPath,
  JejuPath,
  JeonbukPath,
  JeonnamPath,
  SejongPath,
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

const FirstSection = styled(Section)`
  background: url('/img_main_bg.png') repeat-x 0 0;
`;

const MMOptionLayout = styled.div`
  width: 710px;
`;

const MMList = styled.ul`
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
const MMOptionContainer = styled.div`
  height: 50px;
  background: linear-gradient(to right, #009ffa, #00c36a);
  border-radius: 6px;
  display: flex;
`;
const MMSelectWrapper = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  color: #0a0a0a;
`;
const MMSelect = styled(Select)`
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

  > svg {
    margin-top: -25px;
  }
`;

function App() {
  return (
    <>
      <Headers />
      <Main>
        {/* 첫번째 색션 */}
        <FirstSection>
          {/* Main Map 설정 */}
          <MMOptionLayout>
            <MMList>
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
            </MMList>
            <MMOptionContainer>
              <MMSelectWrapper>
                <MMSelect bg width="188px">
                  <option value="KHAI">통합대기환경지수(CAI)</option>
                  <option value="10008">초미세먼지 (PM-2.5)</option>
                  <option value="10007">미세먼지 (PM-10)</option>
                  <option value="10003">오존(O₃)</option>
                  <option value="10006">이산화질소(NO₂)</option>
                  <option value="10002">일산화탄소 (CO)</option>
                  <option value="10001">아황산가스 (SO₂)</option>
                </MMSelect>
              </MMSelectWrapper>
              <MMSelectWrapper>
                <label for="area1" style={{ marginRight: '5px' }}>
                  시/도
                </label>
                <MMSelect bg id="area1" width="130px">
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
                </MMSelect>
              </MMSelectWrapper>
            </MMOptionContainer>
          </MMOptionLayout>
          {/* Main Map 전국 지도 */}
          <MMWrapper>
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
              enable-background="new 0 0 700 730"
              xmlS
              pace="preserve"
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
          </MMWrapper>
        </FirstSection>
      </Main>
    </>
  );
}

export default App;
