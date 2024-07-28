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
import { useSearchParams } from "react-router-dom";

// ~ Component
import Layout from "../components/layout/pages.jsx";
import Page1 from "../components/1_info/page1.jsx";
import Page2 from "../components/1_info/page2.jsx";
import Page3 from "../components/1_info/page3.jsx";

// @@@ 출력 컴포넌트 @@@
export default function Page() {
    const [searchParams] = useSearchParams();
    const pageNum = searchParams.get('page');

    const pathname = '/info';
    const topbarMain = {
        title: '에어코리아란',
        toggleIndex: 1,
        links: [
            { text: "실시간 자료조회", to: '/realtime?page=1' },
            { text: "대기정보 예보 / 경보", to: '/standby?page=1' },
            { text: "통계정보", to: '/?page=1' },
            { text: "배움터", to: '/?page=1' },
        ]
    };
    const topbarList = [
        {
            title: '에어코리아 소개',
            toggleIndex: 2,
            links: [
                { text: "측정망 정보", to: `${pathname}?page=2` },
                { text: "측정소 정보", to: `${pathname}?page=3` }
            ]
        },
        {
            title: '측정망 정보',
            toggleIndex: 2,
            links: [
                { text: "에어코리아란", to: `${pathname}?page=1` },
                { text: "측정소 정보", to: `${pathname}?page=3` }
            ]
        },
        {
            title: '측정소 정보',
            toggleIndex: 2,
            links: [
                { text: "에어코리아란", to: `${pathname}?page=1` },
                { text: "측정망 정보", to: `${pathname}?page=2` },
            ]
        }
    ]

    const ViewPage = () => {
        const Pages = {
            1: <Page1 topbarMain={topbarMain} topbarList={topbarList[0]} pageIndex="0" />,
            2: <Page2 topbarMain={topbarMain} topbarList={topbarList[1]} pageIndex="1" />,
            3: <Page3 topbarMain={topbarMain} topbarList={topbarList[2]} pageIndex="2" />
        };

        return Pages[Number(pageNum)];
    }

    return (
        <Layout>
            <ViewPage />
        </Layout>
    )
};
