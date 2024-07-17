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
import useStore from "../hooks/useStore.tsx";

// ~ Style
import { Loading } from "../StyleComponent";

// @@@ 출력 컴포넌트 @@@
const LoadingScreen = () => {
    const loading = useStore(state => state.loading);
    return (
        <Loading loading={String(loading)}>
            <div>데이터 처리중입니다.</div>
            <p>잠시만 기다려 주시기 바랍니다.</p>
            <img src="/images/global/loading_1.webp" alt="로딩 중" />
        </Loading>
    )
};

export default LoadingScreen;
