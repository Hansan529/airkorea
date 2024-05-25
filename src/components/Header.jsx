import styled from '@emotion/styled';
import { Fragment, useState } from 'react';
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
  position: relative;
  line-height: ${headerHeight};
  list-style: none;

  a {
    text-decoration: none;
    color: #000;
    &:visited { color: #000; }
    &:hover { color: #0f62cc; }
  }
  
  /* 제목 */
  > a {
    font-weight: 600;
    font-size: 18px;
    display: block;
  }

  /* hover 팝업 */
  ul {
    display: none;
    position: absolute;
    left: 50%;
    top: 80px;
    padding: 15px 20px 18px;
    background: #fff;
    border: 1px solid #0f62cc;
    border-radius: 8px;
    transform: translate(-50%, 0);

    li {
      position: relative;
      z-index: 2;
      font-size: 16px;
      color: #0a0a0a;
      font-weight: 400;
      letter-spacing: -0.6px;
      line-height: 17px;
      white-space: nowrap;
      &+li{ margin-top: 10px; }

      a { 
        position: relative; 

        &::before {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0%;
          z-index: -1;
          width: 0px;
          height: 65%;
          background: #d7f4ff;
          transition: width .3s ease;
        }
      }
    }
  }

  &.over ul {
    display: block;

    li a:hover::before { width: 100%; }
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
  // # Nav Hover 토글
  const [isHovering, setIsHovering] = useState({0: false, 1: false, 2: false, 3: false, 4: false});
  const handleMouseOver = (index) => {
    setIsHovering(prev => ({
      ...prev,
      [index]: true
    }));
  }
  const handleMouseOut = () => setIsHovering({0: false, 1: false, 2: false, 3: false, 4: false});

  // ! Nav 정보
  const NavList = [
    {ref: 'info', title: '에어코리아란', 
      subTitle: [
        { text: '에어코리아 소개', refSub: '' }, 
        { text: '측정망 정보', refSub: '' }, 
        { text: '측정소 정보', refSub: '' }
      ]},

    {ref: 'realtime', refSub: 'no=1', title: '실시간 자료조회', 
      subTitle: [
        { text: '실시간 대기정보', refSub: '&no=1' }, 
        { text: '시도별 대기정보', refSub: '&no=1'}, 
        { text: '미세먼지 세부 측정정보', refSub: '&no=1'}
      ]},

    {ref: 'standby', title: '대기정보 예보 / 경보', 
      subTitle: [
      { text: '오늘/내일/모레 대기정보', refSub: '' },
      { text: '초미세먼지 주간예보', refSub: '' },
      { text: '대기오염경보 발령 내역', refSub: '&no=1' },
      { text: '황사 발생현황', refSub: '&no=1' },
      { text: '국민 행동요령', refSub: '&no=1' }
    ]},

    {ref: 'statistics', title: '통계정보', 
      subTitle: [
        { text: '대기환경 월간/연간 보고서', refSub: '' },
        { text: '최종확정 측정자료 조회', refSub: '' },
        { text: '국외대기 환경정보', refSub: '' }
      ]},

    {ref: 'learning', title: '배움터', 
      subTitle: [
        { text: '통합대기환경지수', refSub: ''},
        { text: '대기환경기준물질', refSub: ''},
        { text: '대기환경기준', refSub: '&no=1'},
        { text: '대기환경정보 생산 및 공개', refSub: ''},
        { text: '용어사전', refSub: ''}
      ]},
  ];

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
            {NavList.map((data, index) => {
              return (
                <Fragment key={index}>
                  <NavLi
                    className={isHovering[index] ? 'over' : ''}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                  >
                    <Link to={`/${data.ref}?page=1`} onClick={handleMouseOut}>{data.title}</Link>
                    <ul>
                      {data.subTitle.map((list, subIndex) => (
                        <li key={subIndex}>
                          <Link to={`/${data.ref}?page=${subIndex+1}${list.refSub}`} onClick={handleMouseOut}>
                            {list.text}
                          </Link>
                        </li>))}
                    </ul>
                  </NavLi>
                </Fragment>
              )
            })}
          </NavUl>
        </GlobalNav>
        <Util>
          <UtilBtn bgImg={'/images/global/img_bg_search.webp'}>
            <span>통합검색 열기</span>
          </UtilBtn>
          <UtilBtn bgImg={'/images/global/img_bg_ham.webp'}>
            <span>메뉴 열기</span>
          </UtilBtn>
        </Util>
      </HeaderContainer>
    </HeaderElement>
  );
}
