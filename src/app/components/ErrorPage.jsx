import { useRouteError } from "react-router-dom";
import { ErrorDiv, ErrorTitle } from "../StyleComponent";


export default function ErrorPage() {
    const error = useRouteError();
    console.log('error: ', error);
    console.error(error);

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
