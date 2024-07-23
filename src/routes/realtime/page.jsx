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
import Layout from "../layout";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";

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
