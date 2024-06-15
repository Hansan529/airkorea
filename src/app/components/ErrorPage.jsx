import { useRouteError } from "react-router-dom";
import { ErrorDiv, ErrorTitle } from "../StyleComponent";

// @@@ 출력 컴포넌트 @@@
export default function ErrorPage() {
    const error = useRouteError();
    return (
        <ErrorDiv>
            <ErrorTitle>문제 발생!</ErrorTitle>
            <p>예상치 못한 오류가 발생했습니다.</p>
            <p>
                <i>{error.status} {error.statusText || error.message}</i>
            </p>
        </ErrorDiv>
    )
}
