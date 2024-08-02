/*
    ! 주제
    @ 컴포넌트
    # 설명
    & 강조
    ~ 세팅
*/

/*
    Package
    Json
    Hooks
    Style
    Component
    Package Settings
*/

// ~ Package
import { useLocation, useSearchParams } from 'react-router-dom';

// ~ Component
import Layout from '../components/layout/pages.jsx';
import Page1 from '../components/3_standby/page1.jsx';
import Page2 from '../components/3_standby/page2.jsx';
import Page3 from '../components/3_standby/page3.jsx';
import Page4 from '../components/3_standby/page4.jsx';
import Page5 from '../components/3_standby/page5.jsx';

// @@@ 출력 컴포넌트 @@@
export default function Page({ tag }) {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const pageNum = searchParams.get('page');
  const type = searchParams.get('type');

  const categoryList = [
    {
      title: '에어코리아란',
      tag: 'info',
      children: [
        {
          title: '에어코리아 소개',
          tag: '',
        },
        {
          title: '측정망 정보',
          tag: '',
        },
        {
          title: '측정소 정보',
          tag: '',
        },
      ],
    },
    {
      title: '실시간 자료조회',
      tag: 'realtime',
      children: [
        {
          title: '실시간 대기 정보',
          tag: 'realtime',
          page: '1',
          toggle: [
            { title: '우리동네 대기 정보' },
            { title: '국가산단주변 미세먼지 정보' },
            { title: '우리학교 주변 대기 정보' },
          ],
        },
        {
          title: '시도별 대기정보',
          tag: 'realtime',
          page: '2',
          toggle: [
            { title: '시도별 대기정보(PM-2.5)' },
            { title: '시도별 대기정보(PM-10)' },
            { title: '시도별 대기정보(오존)' },
            { title: '시도별 대기정보(이산화질소)' },
            { title: '시도별 대기정보(일산화탄소)' },
            { title: '시도별 대기정보(아황산가스)' },
          ],
        },
        {
          title: '미세먼지 세부 측정정보',
          tag: 'realtime',
          page: '3',
          toggle: [
            { title: '초미세먼지 (PM-2.5)' },
            { title: '미세먼지 (PM-10)' },
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
          tag: 'standby',
          page: '1',
        },
        {
          title: '초미세먼지 주간예보',
          tag: 'standby',
          page: '2',
        },
        {
          title: '대기오염경보 발령 내역',
          tag: 'standby',
          page: '3',
          toggle: [
            {
              title: '오존',
              type: 'ozone',
            },
            {
              title: '미세먼지',
              type: 'findDust',
            },
          ],
        },
        {
          title: '황사 발생현황',
          tag: 'standby',
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
          tag: 'standby',
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
    },
    {
      title: '배움터',
      tag: '',
    },
  ];

  // ! 네비게이션바
  // # 큰 주제의 메인 요소 찾기
  const findTopbarTitle = categoryList.find((item) => item.tag === tag);
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
    const topbarListToggle = {
      title: ``,
      toggleIndex: 3,
      links: [{ text: '', to: '' }],
    };
    dynamicTopbarList.push(topbarListToggle);
  }

  const pageComponents = {
    1: Page1,
    2: Page2,
    3: Page3,
    4: Page4,
    5: Page5,
  };

  const ViewPage = () => {
    const PageComponent = pageComponents[pageNum];

    if (!PageComponent) {
      return <div>Page Not Found</div>;
    }

    return (
      <PageComponent
        pageNum={pageNum}
        type={type}
        pathname={pathname}
        category={findTopbarTitle}
        selectedCategory={findTopbarTwoStep}
        topbarList={dynamicTopbarList}
      />
    );
  };

  return (
    <Layout>
      <ViewPage />
    </Layout>
  );
}
