import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeaderGlobalNav, HeaderContainer, HeaderElement, HeaderMainLogo, HeaderNavLi, HeaderNavUl, HeaderUtil, HeaderUtilBtn } from '../StyleComponent';

// @@@ 출력 컴포넌트 @@@
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
        <HeaderMainLogo>
          <Link to={`/`} title="메인페이지">
            <img src={'/images/global/logo.webp'} alt="logo" />
          </Link>
        </HeaderMainLogo>
        <HeaderGlobalNav>
          <HeaderNavUl>
            {NavList.map((data, index) => {
              return (
                <Fragment key={index}>
                  <HeaderNavLi
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
                  </HeaderNavLi>
                </Fragment>
              )
            })}
          </HeaderNavUl>
        </HeaderGlobalNav>
        <HeaderUtil>
          <HeaderUtilBtn bgImg={'/images/global/img_bg_search.webp'}>
            <span>통합검색 열기</span>
          </HeaderUtilBtn>
          <HeaderUtilBtn bgImg={'/images/global/img_bg_ham.webp'}>
            <span>메뉴 열기</span>
          </HeaderUtilBtn>
        </HeaderUtil>
      </HeaderContainer>
    </HeaderElement>
  );
}
