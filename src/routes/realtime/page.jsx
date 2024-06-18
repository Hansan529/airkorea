import { useSearchParams } from "react-router-dom";

import Layout from "../layout";
import Page1 from "./page1";
import Page2 from "./page2";

export default function Page() {
    const [searchParams] = useSearchParams();
    const pageNum = searchParams.get('page');

    const ViewPage = () => {
        const Pages = {
            1: <Page1 />,
            2: <Page2 />,
        };

        return Pages[Number(pageNum)];
    }

    return (
        <Layout>
            <ViewPage />
        </Layout>
    )
};
