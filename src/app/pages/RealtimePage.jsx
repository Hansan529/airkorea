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
import Page1 from "../components/2_realtime/page1.jsx";
import Page2 from "../components/2_realtime/page2.jsx";
import Page3 from "../components/2_realtime/page3.jsx";

// @@@ 출력 컴포넌트 @@@
export default function Page() {
    const [searchParams] = useSearchParams();
    const pageNum = searchParams.get('page');

    const ViewPage = () => {
        const Pages = {
            1: <Page1 />,
            2: <Page2 />,
            3: <Page3 />,
        };

        return Pages[Number(pageNum)];
    }

    return (
        <Layout>
            <ViewPage />
        </Layout>
    )
};
