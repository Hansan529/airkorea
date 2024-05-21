import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const headerHeight = '90px';

const HeaderElement = styled.header`
  display: flex;
  position: relative;
  width: 100%;
  height: ${headerHeight};
  z-index: 100;
  background-color: #fff;
  border-bottom: 1px solid #dcdcdc;
`;

const HeaderContainer = styled.section`
  position: relative;
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
    color: #000;
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

export default function Header() {
  return (
    <HeaderElement>
      <HeaderContainer>
        <MainLogo>
          <Link to={`/`} title="메인페이지">
            <img src={'/images/global/logo.webp'} alt="logo" />
          </Link>
        </MainLogo>
        <GlobalNav>
          <NavUl>
            <NavLi>
              <Link to={`/info?page=1`}>에어코리아란</Link>
            </NavLi>
            <NavLi>
              <Link to={``}>실시간 자료조회</Link>
            </NavLi>
            <NavLi>
              <Link to={``}>대기정보 예보 / 경보</Link>
            </NavLi>
            <NavLi>
              <Link to={``}>통계정보</Link>
            </NavLi>
            <NavLi>
              <Link to={``}>배움터</Link>
            </NavLi>
            <NavLi>
              <Link to={``}>고객지원</Link>
            </NavLi>
          </NavUl>
        </GlobalNav>
        <Util>
          <UtilBtn bgImg={'images/global/img_bg_search.webp'}>
            <span>통합검색 열기</span>
          </UtilBtn>
          <UtilBtn bgImg={'images/global/img_bg_ham.webp'}>
            <span>메뉴 열기</span>
          </UtilBtn>
        </Util>
      </HeaderContainer>
    </HeaderElement>
  );
}
