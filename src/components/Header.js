import styled from '@emotion/styled';

const headerHeight = '90px';

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

export default function Headers() {
  return (
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
          <UtilBtn bgImg={'img_bg_search.png'}>
            <span>통합검색 열기</span>
          </UtilBtn>
          <UtilBtn bgImg={'img_bg_ham.png'}>
            <span>메뉴 열기</span>
          </UtilBtn>
        </Util>
      </HeaderContainer>
    </Header>
  );
}
