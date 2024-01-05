import styled from 'styled-components';
import './App.css';

const headerHeight = '90px';

const Select = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Header = styled.header`
  display: flex;
  position: relative;
  width: 100%;
  min-width: 1400px;
  height: ${headerHeight};
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #dcdcdc;
`;

const HeaderContainer = styled.div`
  position: relative;
  min-width: 1400px;
  width: 1400px;
  margin: 0 auto;
`;

const MainLogo = styled.h1`
  position: absolute;
  margin: 0;
  top: 20px;
  left: 0;

  a {
    display: block;

    img {
      vertical-align: middle;
      border: 0;
    }
  }
`;

const GlobalNav = styled.div`
  height: 100%;
`;

const NavUl = styled.ul`
  display: flex;
  justify-content: center;
  gap: 58px;
  margin: 0;
  padding: 0;
`;

const NavLi = styled.li`
  display: inline-block;
  line-height: ${headerHeight};
  list-style: none;

  a {
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    display: block;
    &:visited {
      color: #000;
    }
    &:hover {
      color: #0f62cc;
    }
  }
`;

const Util = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  gap: 20px;
  align-items: center;
`;

const LanguageBtn = styled.a`
  padding: 0 30px 0 0;
  display: inline-block;
  background: url('/img_bg_lang.png') no-repeat right center;
  letter-spacing: -0.4px;
  color: #0a0a0a;
`;

const UtilBtn = styled.button`
  display: inline-block;
  width: 25px;
  height: 24px;
  background: url(${(props) => props.bgImg}) no-repeat center;
  position: relative;
  border: none;

  > span {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    white-space: nowrap;
  }
`;

const Main = styled.main``;
const Section = styled.section``;

const FirstSection = styled(Section)`
  background: url('/img_main_bg.png') repeat-x 0 0;
`;

const Map = styled.div`
  width: 710px;
`;
const MapUl = styled.ul`
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
    }
  }
`;
const MapGradation = styled.div`
  height: 50px;
  background: linear-gradient(to right, #009ffa, #00c36a);
  border-radius: 6px;
  display: flex;
`;
const MapRoundWrap = styled.div`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  color: #0a0a0a;
`;
const Round = styled(Select)`
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

function App() {
  return (
    <>
      <Header>
        <HeaderContainer>
          <MainLogo>
            <a href="/" title="메인페이지">
              <img src={'/logo.png'} alt="logo" />
            </a>
          </MainLogo>
          <GlobalNav>
            <NavUl>
              <NavLi>
                <a href="/">에어코리아란</a>
              </NavLi>
              <NavLi>
                <a href="/">실시간 자료조회</a>
              </NavLi>
              <NavLi>
                <a href="/">대기정보 예보 / 경보</a>
              </NavLi>
              <NavLi>
                <a href="/">통계정보</a>
              </NavLi>
              <NavLi>
                <a href="/">배움터</a>
              </NavLi>
              <NavLi>
                <a href="/">고객지원</a>
              </NavLi>
            </NavUl>
          </GlobalNav>
          <Util>
            <LanguageBtn
              href="/eng"
              target="_blank"
              rel="noopener noreferrer"
              title="영문 버전으로 새창 이동"
            >
              En
            </LanguageBtn>
            <UtilBtn bgImg={'img_bg_search.png'}>
              <span>통합검색 열기</span>
            </UtilBtn>
            <UtilBtn bgImg={'img_bg_ham.png'}>
              <span>메뉴 열기</span>
            </UtilBtn>
          </Util>
        </HeaderContainer>
      </Header>
      <Main>
        <FirstSection>
          <Map>
            <MapUl>
              <li>
                <a href>실시간 대기정보</a>
              </li>
              <li>
                <a href>오늘/내일/모레 대기정보</a>
              </li>
              <li>
                <a href>실시간 공간분포</a>
              </li>
            </MapUl>
            <MapGradation>
              <MapRoundWrap>
                <Round bg width="188px">
                  <option value="KHAI">통합대기환경지수(CAI)</option>
                  <option value="10008">초미세먼지 (PM-2.5)</option>
                  <option value="10007">미세먼지 (PM-10)</option>
                  <option value="10003">오존(O₃)</option>
                  <option value="10006">이산화질소(NO₂)</option>
                  <option value="10002">일산화탄소 (CO)</option>
                  <option value="10001">아황산가스 (SO₂)</option>
                </Round>
              </MapRoundWrap>
              <MapRoundWrap>
                <label for="area1" style={{ marginRight: '5px' }}>
                  시/도
                </label>
                <Round bg id="area1" width="130px">
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
                </Round>
              </MapRoundWrap>
              <MapRoundWrap>
                <Round flex as="div" width="auto">
                  <button className="on">대기/경보 정보</button>
                </Round>
              </MapRoundWrap>
            </MapGradation>
          </Map>
        </FirstSection>
      </Main>
    </>
  );
}

export default App;
