import Header from './Header.jsx';
import Footer from './Footer.jsx';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Loading from '../global/Loading.jsx';
import {
  LayoutAElement,
  LayoutAside,
  LayoutAsideLink,
  LayoutAsideLinkA,
  LayoutAsideLinkUl,
  LayoutContent,
  LayoutDivStyle,
  LayoutHome,
  LayoutList,
  LayoutListDetail,
  LayoutSection,
  LayoutTopBar,
} from '../assets/StyleComponent.jsx';

const infoPage1 = React.lazy(() => import('../1_info/page1.jsx'));
const infoPage2 = React.lazy(() => import('../1_info/page2.jsx'));
const infoPage3 = React.lazy(() => import('../1_info/page3.jsx'));
const realtimePage1 = React.lazy(() => import('../2_realtime/page1.jsx'));
const realtimePage2 = React.lazy(() => import('../2_realtime/page2.jsx'));
const realtimePage3 = React.lazy(() => import('../2_realtime/page3.jsx'));
const standbyPage1 = React.lazy(() => import('../3_standby/page1.jsx'));
const standbyPage2 = React.lazy(() => import('../3_standby/page2.jsx'));
const standbyPage3 = React.lazy(() => import('../3_standby/page3.jsx'));
const standbyPage4 = React.lazy(() => import('../3_standby/page4.jsx'));
const standbyPage5 = React.lazy(() => import('../3_standby/page5.jsx'));

const components = {
  info: {
    1: infoPage1,
    2: infoPage2,
    3: infoPage3,
  },
  realtime: {
    1: realtimePage1,
    2: realtimePage2,
    3: realtimePage3,
  },
  standby: {
    1: standbyPage1,
    2: standbyPage2,
    3: standbyPage3,
    4: standbyPage4,
    5: standbyPage5,
  },
};

// # 네비게이션, 사이드바 목록
const categoryList = [
  {
    title: '에어코리아란',
    tag: 'info',
    children: [
      {
        title: '에어코리아 소개',
        page: '1',
      },
      {
        title: '측정망 정보',
        page: '2',
      },
      {
        title: '측정소 정보',
        page: '3',
      },
    ],
  },
  {
    title: '실시간 자료조회',
    tag: 'realtime',
    children: [
      {
        title: '실시간 대기 정보',
        page: '1',
      },
      {
        title: '시도별 대기정보',
        page: '2',
        toggle: [
          { title: '시도별 대기정보(PM-2.5)', type: 'pm25' },
          { title: '시도별 대기정보(PM-10)', type: 'pm10' },
          { title: '시도별 대기정보(오존)', type: 'o3' },
          { title: '시도별 대기정보(이산화질소)', type: 'no2' },
          { title: '시도별 대기정보(일산화탄소)', type: 'co' },
          { title: '시도별 대기정보(아황산가스)', type: 'so2' },
        ],
      },
      {
        title: '미세먼지 세부 측정정보',
        page: '3',
        toggle: [
          { title: '초미세먼지 (PM-2.5)', type: 'detail-pm25' },
          { title: '미세먼지 (PM-10)', type: 'detail-pm10' },
        ],
      },
    ],
  },
  {
    title: '대기정보 예보 / 경보',
    tag: 'standby',
    children: [
      {
        title: '오늘/내일/모레 대기정보',
        page: '1',
      },
      {
        title: '초미세먼지 주간예보',
        page: '2',
      },
      {
        title: '대기오염경보 발령 내역',
        page: '3',
        toggle: [
          { title: '오존', type: 'ozone' },
          { title: '미세먼지', type: 'findDust' },
        ],
      },
      {
        title: '황사 발생현황',
        page: '4',
        toggle: [
          {
            title: '연도별 발생현황',
            type: '',
          },
          {
            title: '황사특보(경보) 발령현황',
            type: '',
          },
          {
            title: '황사 발생 대비 국민행동요령',
            type: '',
          },
        ],
      },
      {
        title: '국민 행동요령',
        page: '5',
        toggle: [
          {
            title: '오존 행동요령',
            type: '',
          },
          {
            title: '미세먼지 행동요령',
            type: '',
          },
          {
            title: '통합대기환경지수 행동요령',
            type: '',
          },
        ],
      },
    ],
  },
  {
    title: '통계정보',
    tag: '',
    page: '1',
  },
  {
    title: '배움터',
    tag: '',
    page: '1',
  },
];

const Layout = ({ tag }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const pageNum = searchParams.get('page');
  const type = searchParams.get('type');
  const navigate = useNavigate();

  // # 출력할 컴포넌트 선택
  const PageComponent = components[tag]?.[pageNum];

  // # 지역명
  const regionList = {
    seoul: '서울',
    busan: '부산',
    daegu: '대구',
    incheon: '인천',
    gwangju: '광주',
    daejeon: '대전',
    ulsan: '울산',
    gyeonggi: '경기',
    gangwon: '강원',
    chungbuk: '충북',
    chungnam: '충남',
    jeonbuk: '전북',
    jeonnam: '전남',
    sejong: '세종',
    gyeongbuk: '경북',
    gyeongnam: '경남',
    jeju: '제주',
  };

  // ! 네비게이션바
  // # 큰 주제의 메인 요소 찾기
  const findTopbarTitle = useMemo(() => {
    return categoryList.find((item) => item.tag === tag);
  }, [tag]);
  // # 큰 주제의 다른 요소
  const anotherLinks = categoryList.filter((item) => item.tag !== tag);

  // # 타이틀인 요소
  const findTopbarTwoStep = findTopbarTitle.children[pageNum - 1];
  // # 타이틀이 아닌 하단 요소 목록 찾기
  const findTopbarTitleLinksAnother = findTopbarTitle.children.filter(
    (_, idx) => idx !== pageNum - 1
  );
  const topbarList = [
    {
      title: findTopbarTitle.title,
      toggleIndex: 1,
      links: anotherLinks,
    },
    {
      title: findTopbarTwoStep.title,
      toggleIndex: 2,
      links: findTopbarTitleLinksAnother,
    },
  ];

  const dynamicTopbarList = JSON.parse(JSON.stringify(topbarList));
  if (findTopbarTwoStep.toggle && findTopbarTwoStep.toggle.length > 0) {
    const title = findTopbarTwoStep.toggle.find((e) => e.type === type);
    const links = findTopbarTwoStep.toggle.filter((e) => e.type !== type);
    const topbarListToggle = {
      title: title?.title,
      toggleIndex: 3,
      links,
    };
    dynamicTopbarList.push(topbarListToggle);
  }

  // # 네비게이션 토글 상태
  const togglesNavObject = {
    1: { px: 0, initial: dynamicTopbarList[0].links.length * 50 },
    2: { px: 0, initial: dynamicTopbarList[1].links.length * 50 },
    3: { px: 0, initial: 0 },
  };
  if (dynamicTopbarList.length > 2)
    togglesNavObject['3'] = {
      px: 0,
      initial: dynamicTopbarList[2].links.length * 50,
    };
  const [navToggles, setNavToggles] = useState(togglesNavObject);
  // # 네비게이션 토글 함수
  const toggleHandle = (e, { index, linkUrl }) => {
    e.preventDefault();
    setNavToggles((prevToggles) => {
      const currentToggle = prevToggles[index] || { px: 0, initial: 0 };
      return {
        ...prevToggles,
        [index]: {
          px: currentToggle.px !== 0 ? 0 : currentToggle.initial,
          initial: currentToggle.initial,
        },
      };
    });

    if (linkUrl) {
      setNavToggles((prevToggles) => {
        const newToggles = {};
        for (let key in prevToggles) {
          newToggles[key] = {
            ...prevToggles[key],
            px: 0,
          };
        }
        return newToggles;
      });
      navigate(linkUrl);
    }
  };
  // @ 네비게이션 바 컴포넌트
  const TopBarListComponent = () => {
    return dynamicTopbarList.map((item, index) => (
      <LayoutList key={index}>
        {/* 메인 목록 */}
        <LayoutAElement
          to="./"
          title={item.title}
          onClick={(e) => toggleHandle(e, { index: item.toggleIndex })}
          data-index={item.toggleIndex}
          data-direction={
            navToggles[item.toggleIndex].px &&
            navToggles[item.toggleIndex].px ===
              navToggles[item.toggleIndex].initial
              ? 'up'
              : 'down'
          }
        >
          {item.title}
        </LayoutAElement>
        {/* # 토글 열면 나오는 목록 */}
        {/* FIXME: toggle이 있는 페이지에서, type을 입력하지 않은 채 URL 접속 시, 높이가 불일치함 */}
        <LayoutListDetail $height={navToggles[item.toggleIndex]?.px}>
          {item.links.map((link, linkIndex) => {
            // # 2번째 네비게이션, 3번째 네비게이션 구분 및 toggle 구분
            const getUrl = (tag, page, type, toggle) => {
              let baseUrl = tag ? `/${tag}` : pathname;
              let queryParams = `?page=${page || item.toggleIndex}`;
              if (toggle && toggle.length > 0) {
                queryParams += `&type=${toggle[0].type}`;
              } else if (type) {
                queryParams += `&type=${type}`;
              }
              return `${baseUrl}${queryParams}`;
            };
            const linkUrl = getUrl(link.tag, link.page, link.type, link.toggle);
            return (
              <li key={linkIndex}>
                <Link
                  to={linkUrl}
                  onClick={(e) => toggleHandle(e, { linkUrl })}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </LayoutListDetail>
      </LayoutList>
    ));
  };

  // # 사이드바 토글
  const matchedToggleLength = findTopbarTwoStep.toggle?.length || 0;
  const initializedAsideToggle = useCallback(
    (title, matchedToggleLength) => {
      return title.children.reduce((acc, cur) => {
        if (cur.toggle && cur.toggle.length > 0) {
          const isPageMatched = cur.page === pageNum;
          acc[cur.title] = {
            px: isPageMatched ? matchedToggleLength * 50 : 0,
            initial: cur.toggle.length * 50,
          };
        }
        return acc;
      }, {});
    },
    [pageNum]
  );
  const [asideToggle, setAsideToggle] = useState(
    initializedAsideToggle(findTopbarTitle, matchedToggleLength)
  );
  // # 페이지가 변경되었을 때, Toggle이 해당 페이지에 맞도록 업데이트
  useEffect(() => {
    setAsideToggle(
      initializedAsideToggle(findTopbarTitle, matchedToggleLength)
    );
  }, [pathname, findTopbarTitle, matchedToggleLength, initializedAsideToggle]);
  // # 사이드바 토글 함수
  const asideHandle = (e, { path }) => {
    e.preventDefault();
    const key = e.currentTarget.innerText;
    const hasToggle = key in asideToggle;

    // # 모든 px을 0으로 초기화
    const resetToggles = (prevToggles) => {
      const newToggles = {};
      for (let key in prevToggles) {
        newToggles[key] = {
          ...prevToggles[key],
          px: 0,
        };
      }
      return newToggles;
    };

    // # 토글 기능이 있는 경우
    if (hasToggle) {
      setAsideToggle((prevToggles) => {
        const newToggles = resetToggles(prevToggles);
        // # 선택한 버튼의 px 높이 설정
        newToggles[key] = {
          ...prevToggles[key],
          px: prevToggles[key].px !== 0 ? 0 : prevToggles[key].initial,
          initial: prevToggles[key].initial,
        };
        return newToggles;
      });
    } else {
      setAsideToggle((prevToggles) => resetToggles(prevToggles));
      navigate(path);
    }
  };
  // @ 사이드바 컴포넌트
  const AsideComponent = () => {
    const children = findTopbarTitle.children.map((children, index) => {
      const variableCheck = typeof asideToggle !== 'undefined';
      const toggleCheck = 'toggle' in children;
      return (
        <li key={index}>
          {variableCheck && (
            <>
              <LayoutAsideLink
                to={`${pathname}?page=${index + 1}`}
                onClick={(e) =>
                  asideHandle(e, { path: `${pathname}?page=${index + 1}` })
                }
                children_height={asideToggle[children.title]?.px}
                selected={children.page === pageNum}
                showmore={toggleCheck ? 'true' : 'false'}
              >
                {children.title}
              </LayoutAsideLink>
              {toggleCheck && (
                <LayoutAsideLinkUl $height={asideToggle[children.title]?.px}>
                  {children.toggle.map((item, _) => {
                    return (
                      <li key={_}>
                        <LayoutAsideLinkA
                          selected={item.type === type}
                          to={`${pathname}?page=${index + 1}&type=${item.type}`}
                        >
                          {item.title}
                        </LayoutAsideLinkA>
                      </li>
                    );
                  })}
                </LayoutAsideLinkUl>
              )}
            </>
          )}
        </li>
      );
    });
    return <ul>{children}</ul>;
  };

  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <main>
        <LayoutDivStyle>
          <LayoutTopBar>
            <li>
              <LayoutHome to="/" title="홈"></LayoutHome>
            </li>
            <TopBarListComponent />
          </LayoutTopBar>
        </LayoutDivStyle>
        <LayoutSection>
          <LayoutAside>
            <h2>{findTopbarTwoStep.title}</h2>
            <AsideComponent />
          </LayoutAside>
          <LayoutContent>
            <PageComponent regionList={regionList} type={type} />
          </LayoutContent>
        </LayoutSection>
      </main>
      <Footer />
    </Suspense>
  );
};

export default Layout;
