import { useSearchParams } from "react-router-dom";

import Layout from "../layout";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";

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
