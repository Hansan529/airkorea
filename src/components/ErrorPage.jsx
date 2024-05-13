import styled from "@emotion/styled/macro";
import { useRouteError } from "react-router-dom";

const Div = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    flex-direction: column;
    gap: 30px;
    transform: translate(-50%, -50%);
`;

const Title = styled.h1`
    font-size: 42px;
    font-weight: bold;
`;

export default function ErrorPage() {
    const error = useRouteError();
    console.log('error: ', error);
    console.error(error);

    return (
        <Div>
            <Title>문제 발생!</Title>
            <p>예상치 못한 오류가 발생했습니다.</p>
            <p>
                <i>{error.status} {error.statusText || error.message}</i>
            </p>
        </Div>
    )
}
