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
import { useRouteError } from "react-router-dom";

// ~ Style
import { ErrorDiv, ErrorTitle } from "../assets/StyleComponent";

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
