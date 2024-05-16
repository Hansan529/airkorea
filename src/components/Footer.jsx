import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import sleep from '../functions/sleep.ts';
import useInterval from '../hooks/useInterval.ts';

const FooterComp = styled.footer`
    overflow: hidden;
`;
const WidthSetting = `
    display: flex;
    width: 1400px;
`;
//? 유관기관 목록 스타일
const BannerWrap = styled.div`
    ${WidthSetting}
    margin: 0 auto 50px;
    overflow: hidden;
`;
const ButtonBox = styled.div`
    width: 200px;
    flex-basis: 200px;
    min-width: 200px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: #fff;
    h3 {
        font-size:  20px;
        font-weight: bold;
        margin-right: 10px;
    }
`;
const Btn = styled.button`
    width: 20px;
    height: 20px;
    border: none;
    background: no-repeat 0 0;
    cursor: pointer;
    &[data-btn="left"]  { background-image: url('./img_ban_left.webp'); }
    &[data-btn="atop"]  { background-image: url('./img_ban_atop.webp'); }
    &[data-btn="auto"]  { background-image: url('./img_ban_auto.webp'); }
    &[data-btn="right"] { background-image: url('./img_ban_right.webp'); }
`;
const ListUl = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    transition-duration: ${(props) => props.disableDuration === true ? '0ms' : '300ms'};
    transform: translateX(${props => props.index * 200}px);
`;
const ListLi = styled.li`
    flex: 0 200px;
    min-width: 200px;
    text-align: center;
    height: 35px;
    line-height: 35px;

    img {
        vertical-align: middle;
    }
`;

//? 푸터 정보
const InfoArea = styled.div`
    ${WidthSetting}
    margin: 0 auto;
    height: 100px;
`;
const InfoAreaLogo = styled.h2`
    flex-basis: 180px;
    text-align: center;
    line-height: 100px;
    margin-right: 20px;
    img {
        vertical-align: middle;
    }
`;
const InfoAreaCallDust = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 860px;
    font-size: 14px;
    flex-grow: 1;
    position: relative;

    > div {
        /* position: relative; */
        display: flex;
    }
    a[href^="tel:"] { font-size: 0; }
`;
const InfoAreaPseudo = styled.div`
    margin: 0 20px;
    width: 2px;
    height: 20px;
    background-color: rgba(0,0,0,0.2);
`;
const InfoAreaIconWrap = styled.div`
    margin-top: 10px;
    >*:first-of-type { margin-right: 40px; }
`;
const CopyRight = styled.div`
    a{
        color: darkblue;
        text-decoration: underline;
        &:visited { color: darkblue; }
    }
`;
const CopyRightImg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    img {
        display: block;
        height: 30px;
        margin-bottom: 5px;
    }
`;


export default function Footer() {
    // 인덱스
    const [ulIndex, setUlIndex] = useState(-6);

    // 애니메이션 진행 중
    const [transitionRunning, setTransitionRunning] = useState(false);

    // 애니메이션 시간 ON/OFF
    const [disableDuration, setDisableDuration] = useState(false);

    // 인터벌
    const [intervalDelay, setIntervalDelay] = useState(2000);
    const [intervalRunning, setIntervalRunning] = useState(true);

    const leftFunction = async () => {
        if(!transitionRunning){
            setTransitionRunning(true);
            setUlIndex(ulIndex + 1);
            // 무한 롤링
            if(ulIndex >= -1){
                await sleep(0.3);
                setDisableDuration(true);
                setUlIndex(-23);
                await sleep(0.1);
                setDisableDuration(false);
                setTransitionRunning(false);
            } else {
                await sleep(0.3);
                setTransitionRunning(false);
            };
        };
    };
    const rightFunction = async () => {
        if(!transitionRunning){
            setTransitionRunning(true);
            setUlIndex(ulIndex - 1);
            // 무한 롤링
            if(ulIndex <= -28){
                await sleep(0.3);
                setDisableDuration(true);
                setUlIndex(-6);
                await sleep(0.1);
                setDisableDuration(false);
                setTransitionRunning(false);
            } else {
                await sleep(0.3);
                setTransitionRunning(false);
            };
        };
    };

    useInterval(() => {
        rightFunction();
    }, intervalRunning ? intervalDelay : null);

    const handle = async (e) => {
        const btn = e.currentTarget.dataset.btn;

        intervalRunning && setIntervalRunning(false);
        switch(btn) {
            case 'left':
                leftFunction();
                break;
            case 'atop':
                e.currentTarget.dataset.btn = 'auto';
                break;
                case 'auto':
                    !intervalRunning && setIntervalRunning(true);
                    e.currentTarget.dataset.btn = 'atop';
                break;
            case 'right':
                rightFunction();
                break;
            default:
                break;
        }
    };

    return (
        <FooterComp>
            <section>
                <BannerWrap>
                    <ButtonBox>
                        <h3>유관기관</h3>
                        <Btn data-btn="left" onClick={handle}></Btn>
                        <Btn data-btn="atop" onClick={handle}></Btn>
                        <Btn data-btn="right" onClick={handle}></Btn>
                    </ButtonBox>
                    <ListUl index={ulIndex} disableDuration={disableDuration}>
                        <ListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="./img_ban17.webp" /></a></ListLi>
                        <ListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="./img_ban18.webp" /></a></ListLi>
                        <ListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="./img_ban19.webp" /></a></ListLi>
                        <ListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="./img_ban20.webp" /></a></ListLi>
                        <ListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="./img_ban21.webp" /></a></ListLi>
                        <ListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="./img_ban22.webp" /></a></ListLi>
                        {/* 복제 */}
                        <ListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="./img_ban01.webp" /></a></ListLi>
                        <ListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="./img_ban02.webp" /></a></ListLi>
                        <ListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="./img_ban03.webp" /></a></ListLi>
                        <ListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="./img_ban04.webp" /></a></ListLi>
                        <ListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="./img_ban05.webp" /></a></ListLi>
                        <ListLi><a href="https://air.gg.go.kr/" title="경기도 대기 환경 정보 서비스" target="_blank" rel="noreferrer"><img alt="경기도 대기 환경 정보 서비스" src="./img_ban06.webp" /></a></ListLi>
                        <ListLi><a href="https://www.airnow.gov/" title="미국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="미국실시간 대기 정보" src="./img_ban06_1.webp" /></a></ListLi>
                        <ListLi><a href="https://air.cnemc.cn:18014/" title="중국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="중국실시간 대기 정보" src="./img_ban07.webp" /></a></ListLi>
                        <ListLi><a href="https://soramame.env.go.jp/" title="일본실시간 대기정보" target="_blank" rel="noreferrer"><img alt="일본실시간 대기정보" src="./img_ban08.webp" /></a></ListLi>
                        <ListLi><a href="https://heis.busan.go.kr" title="부산 보건환경정보 공개시스템" target="_blank" rel="noreferrer"><img alt="부산 보건환경정보 공개시스템" src="./img_ban09.webp" /></a></ListLi>
                        <ListLi><a href="https://air.daegu.go.kr" title="대구 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="대구 대기정보 시스템" src="./img_ban10.webp" /></a></ListLi>
                        <ListLi><a href="https://gwangju.go.kr" title="광주 시청" target="_blank" rel="noreferrer"><img alt="광주 대기정보 시스템" src="./img_ban11.webp" /></a></ListLi>
                        <ListLi><a href="https://www.daejeon.go.kr/hea/airDynamicData.do?menuseq=6858" title="대전 보건환경연구원" target="_blank" rel="noreferrer"><img alt="대전 보건환경연구원" src="./img_ban12.webp" /></a></ListLi>
                        <ListLi><a href="https://www.ulsan.go.kr/s/uihe/main.ulsan" title="울산 보건환경연구원" target="_blank" rel="noreferrer"><img alt="울산 보건환경연구원" src="./img_ban13.webp" /></a></ListLi>
                        <ListLi><a href="https://www.sejong.go.kr/air/index.do" title="세종 미세먼지 정보센터" target="_blank" rel="noreferrer"><img alt="세종 미세먼지 정보센터" src="./img_ban14.webp" /></a></ListLi>
                        <ListLi><a href="http://www.airgangwon.go.kr" title="강원 대기환경정보" target="_blank" rel="noreferrer"><img alt="강원 대기환경정보" src="./img_ban15.webp" /></a></ListLi>
                        <ListLi><a href="https://www.chungbuk.go.kr/here/index.do" title="충북 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="충북 보건환경 연구원" src="./img_ban16.webp" /></a></ListLi>
                        <ListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="./img_ban17.webp" /></a></ListLi>
                        <ListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="./img_ban18.webp" /></a></ListLi>
                        <ListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="./img_ban19.webp" /></a></ListLi>
                        <ListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="./img_ban20.webp" /></a></ListLi>
                        <ListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="./img_ban21.webp" /></a></ListLi>
                        <ListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="./img_ban22.webp" /></a></ListLi>
                        {/* 복제 */}
                        <ListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="./img_ban01.webp" /></a></ListLi>
                        <ListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="./img_ban02.webp" /></a></ListLi>
                        <ListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="./img_ban03.webp" /></a></ListLi>
                        <ListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="./img_ban04.webp" /></a></ListLi>
                        <ListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="./img_ban05.webp" /></a></ListLi>
                        <ListLi><a href="https://air.gg.go.kr/" title="경기도 대기 환경 정보 서비스" target="_blank" rel="noreferrer"><img alt="경기도 대기 환경 정보 서비스" src="./img_ban06.webp" /></a></ListLi>
                    </ListUl>
                </BannerWrap>
                <InfoArea>
                    <InfoAreaLogo>
                        <img src="./logo.webp" alt="에어코리아 로고" />
                    </InfoAreaLogo>
                    <InfoAreaCallDust>
                        <div>
                            <p>실시간 미세먼지 농도 및 예보 관련 문의: <span style={{color: 'blue'}}>131</span><a href="tel:131">131</a> &#40;기상콜센터 유료&#41;</p>
                            <InfoAreaPseudo />
                            <p>대기측정망 및 홈페이지관련 문의 : <span style={{color: 'blue'}}>032&#41;590-4000</span><a href="tel:032-590-4000">032&#41;590-4000</a> &#40;내선번호 8번&#41;</p>
                        </div>
                        <InfoAreaIconWrap>
                            <p>&#91;22689&#93; 인천광역시 서구 환경로 42&#40;오류동 종합환경연구단지&#41;<br /><span style={{color: 'rgba(0,0,0,0.5)'}}>Copyright © 2023 한국환경공단, All rights reserved.</span></p>
                            <CopyRight>
                                <p>인증을 받지 않은 실시간자료이므로 자료 오류 및 표출방식에 따라 값이 다를 수 있음에 유의해주세요.</p>
                                <p>
                                    <strong>공공데이터</strong>(<a href="https://www.data.go.kr/data/15073861/openapi.do" target="_blank" rel="noreferrer">한국환경공단 에어코리아 대기오염정보</a>, <a href="https://www.data.go.kr/data/15073877/openapi.do" target="_blank" rel="noreferrer">측정소정보</a>, <a href="https://www.data.go.kr/data/15073855/openapi.do" target="_blank" rel="noreferrer">대기오염통계 현황</a>)
                                </p>
                            </CopyRight>
                            <CopyRightImg>
                                <a href="https://www.me.go.kr/" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="./img_f_logo.webp" alt="환경부" /></a>
                                <a href="https://www.keco.or.kr/" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="./img_under_logo.webp" alt="한국환경공단" /></a>
                                <a href="http://www.kogl.or.kr/open/index.do" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="./img_openapi.webp" alt="OPEN API 이미지" /></a>
                            </CopyRightImg>
                        </InfoAreaIconWrap>
                    </InfoAreaCallDust>
                </InfoArea>
            </section>
        </FooterComp>
    )
};
