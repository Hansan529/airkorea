import styled from "@emotion/styled/macro";
import useStore from "../hooks/useStore";

const Loading = styled.div`
    display: ${props => props.loading === 'true' ? 'none' : 'block'};
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    text-align: center;
    border: 1px solid #bcd0e8;
    background: url('/loading_bg.webp');

    div {
    margin-top: 360px;
    font-size: 20px;
    color: #0054a6;
    }
`;

const LoadingScreen = () => {
    const loading = useStore(state => state.loading);
    return (
        <Loading loading={String(loading)}>
            <div>데이터 처리중입니다.</div>
            <p>잠시만 기다려 주시기 바랍니다.</p>
            <img src="/loading_1.webp" alt="로딩 중" />
        </Loading>
    )
};

export default LoadingScreen;
