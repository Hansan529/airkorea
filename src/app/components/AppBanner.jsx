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
import { useState } from "react";
import { AppBannerWrap, AppBtn, AppButtonBox, AppListLi, AppListUl, AppSecondBannerInfo } from "../StyleComponent"

// ~ Hooks
import sleep from "../functions/sleep.ts";
import useInterval from "../hooks/useInterval.ts";

export const AppSecondBannerInfoComponent = ({ children }) => {
  // ! 예보 발표 모듈
  const [airInfoIndex, setAirInfoIndex] = useState(-1);
  // # 애니메이션 진행 중
  const [transitionRunning, setTransitionRunning] = useState(false);
  // # 애니메이션 시간 ON/OFF
  const [bannerDisableDuration, setBannerDisableDuration] = useState(false);
  // # 인터벌
  const [bannerIntervalDelay] = useState(5000);
  const [bannerIntervalRunning, setBannerIntervalRunning] = useState(true);
  
  // # 하단 이동 클릭 이벤트
  const airInfoIndexHandleDownFunction = async () => {
    if(!transitionRunning){
      setTransitionRunning(true);
      setAirInfoIndex(airInfoIndex - 1);
      // 무한 롤링
      if(airInfoIndex <= -3){
          await sleep(0.3);
          setBannerDisableDuration(true);
          setAirInfoIndex(-1);
          await sleep(0.1);
          setBannerDisableDuration(false);
          setTransitionRunning(false);
      } else {
        await sleep(0.3);
        setTransitionRunning(false);
      }
    }
  };
  // # 자동 이동 인터벌
  useInterval(() => {
    airInfoIndexHandleDownFunction();
  }, bannerIntervalRunning ? bannerIntervalDelay : null);
  // # 예보 발표 이동 핸들러
  const airInfoIndexHandle = async (e) => {
    const type = e.currentTarget.dataset.type;
    
    bannerIntervalRunning && setBannerIntervalRunning(false);
    switch(type) {
      case 'up':
        if(!transitionRunning){
          setTransitionRunning(true);
          setAirInfoIndex(airInfoIndex + 1);
          // 무한 롤링
          if(airInfoIndex >= -1){
            await sleep(0.3);
            setBannerDisableDuration(true);
            setAirInfoIndex(-3);
            await sleep(0.1);
            setBannerDisableDuration(false);
            setTransitionRunning(false);
          } else {
            await sleep(0.3);
            setTransitionRunning(false);
          }
        }
          break;
        case 'play':
          e.currentTarget.dataset.type = 'stop';
          break;
        case 'stop':
          !bannerIntervalRunning && setBannerIntervalRunning(true);
          e.currentTarget.dataset.type = 'play';
          break;
        case 'down':
          airInfoIndexHandleDownFunction();
          break;
        default:
          break;
      };
      await sleep(0.3);
      setTransitionRunning(false);
  };
  // @ AppSecondBannerInfo 스타일
  const AppSecondBannerInfoStyle = {'--translate-y': `${airInfoIndex * 80}px`, '--transition-duration': `${bannerDisableDuration ? '0ms' : '300ms'}`};
  return (
    <>
      <div className="text">
        <div className="title">
          <strong>예보</strong>발표
        </div>
          <AppSecondBannerInfo style={AppSecondBannerInfoStyle}>
            {children}
          </AppSecondBannerInfo>
        </div>
        <div className="buttonWrap">
              <button data-type="up" onClick={airInfoIndexHandle}></button>
              <button data-type="play" onClick={airInfoIndexHandle}></button>
              <button data-type="down" onClick={airInfoIndexHandle}></button>
        </div>
    </>
  )
}


export const AppEndBannerComponent = () => {
    // ! 하단 배너 모듈
    const [ulIndex, setUlIndex] = useState(-6);
    // # 애니메이션 진행 중
    const [transitionRunning, setTransitionRunning] = useState(false);
    // # 애니메이션 시간 ON/OFF
    const [bannerDisableDuration, setBannerDisableDuration] = useState(false);
    // # 인터벌
    const [bannerIntervalDelay] = useState(2000);
    const [bannerIntervalRunning, setBannerIntervalRunning] = useState(true);
    // # 우측 이동 클릭 이벤트
    const rightFunction = async () => {
        if(!transitionRunning){
            setTransitionRunning(true);
            setUlIndex(ulIndex - 1);
            // 무한 롤링
            if(ulIndex <= -28){
                await sleep(0.3);
                setBannerDisableDuration(true);
                setUlIndex(-6);
                await sleep(0.1);
                setBannerDisableDuration(false);
                setTransitionRunning(false);
            } else {
                await sleep(0.3);
                setTransitionRunning(false);
            };
        };
    };
    // # 자동 이동 인터벌
    useInterval(() => {
        rightFunction();
    }, bannerIntervalRunning ? bannerIntervalDelay : null);
    // # 유관기관 이동 핸들러
    const AppMoveHandle = async (e) => {
        const btn = e.currentTarget.dataset.btn;

        bannerIntervalRunning && setBannerIntervalRunning(false);
        switch(btn) {
            case 'left':
                if(!transitionRunning){
                    setTransitionRunning(true);
                    setUlIndex(ulIndex + 1);
                    // 무한 롤링
                    if(ulIndex >= -1){
                        await sleep(0.3);
                        setBannerDisableDuration(true);
                        setUlIndex(-23);
                        await sleep(0.1);
                        setBannerDisableDuration(false);
                        setTransitionRunning(false);
                    } else {
                        await sleep(0.3);
                        setTransitionRunning(false);
                    };
                };
                break;
            case 'atop':
                e.currentTarget.dataset.btn = 'auto';
                break;
                case 'auto':
                    !bannerIntervalRunning && setBannerIntervalRunning(true);
                    e.currentTarget.dataset.btn = 'atop';
                break;
            case 'right':
                rightFunction();
                break;
            default:
                break;
        }
    };


    // ! 동적 스타일 설정
    const appListUlStyle = {'--translate-x': `${ulIndex * 200}px`, '--transition-duration': `${bannerDisableDuration ? '0ms' : '300ms'}`};
    return (
        <AppBannerWrap>
            <AppButtonBox>
                <h3>유관기관</h3>
                <AppBtn data-btn="left" onClick={AppMoveHandle}></AppBtn>
                <AppBtn data-btn="atop" onClick={AppMoveHandle}></AppBtn>
                <AppBtn data-btn="right" onClick={AppMoveHandle}></AppBtn>
            </AppButtonBox>
            <AppListUl style={appListUlStyle}>
                <AppListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="/images/main/img_ban17.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="/images/main/img_ban18.webp" /></a></AppListLi>
                <AppListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="/images/main/img_ban19.webp" /></a></AppListLi>
                <AppListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="/images/main/img_ban20.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="/images/main/img_ban21.webp" /></a></AppListLi>
                <AppListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="/images/main/img_ban22.webp" /></a></AppListLi>
                {/* 복제 */}
                <AppListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="/images/main/img_ban01.webp" /></a></AppListLi>
                <AppListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="/images/main/img_ban02.webp" /></a></AppListLi>
                <AppListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="/images/main/img_ban03.webp" /></a></AppListLi>
                <AppListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="/images/main/img_ban04.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="/images/main/img_ban05.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.gg.go.kr/" title="경기도 대기 환경 정보 서비스" target="_blank" rel="noreferrer"><img alt="경기도 대기 환경 정보 서비스" src="/images/main/img_ban06.webp" /></a></AppListLi>
                <AppListLi><a href="https://www.airnow.gov/" title="미국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="미국실시간 대기 정보" src="/images/main/img_ban06_1.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.cnemc.cn:18014/" title="중국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="중국실시간 대기 정보" src="/images/main/img_ban07.webp" /></a></AppListLi>
                <AppListLi><a href="https://soramame.env.go.jp/" title="일본실시간 대기정보" target="_blank" rel="noreferrer"><img alt="일본실시간 대기정보" src="/images/main/img_ban08.webp" /></a></AppListLi>
                <AppListLi><a href="https://heis.busan.go.kr" title="부산 보건환경정보 공개시스템" target="_blank" rel="noreferrer"><img alt="부산 보건환경정보 공개시스템" src="/images/main/img_ban09.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.daegu.go.kr" title="대구 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="대구 대기정보 시스템" src="/images/main/img_ban10.webp" /></a></AppListLi>
                <AppListLi><a href="https://gwangju.go.kr" title="광주 시청" target="_blank" rel="noreferrer"><img alt="광주 대기정보 시스템" src="/images/main/img_ban11.webp" /></a></AppListLi>
                <AppListLi><a href="https://www.daejeon.go.kr/hea/airDynamicData.do?menuseq=6858" title="대전 보건환경연구원" target="_blank" rel="noreferrer"><img alt="대전 보건환경연구원" src="/images/main/img_ban12.webp" /></a></AppListLi>
                <AppListLi><a href="https://www.ulsan.go.kr/s/uihe/main.ulsan" title="울산 보건환경연구원" target="_blank" rel="noreferrer"><img alt="울산 보건환경연구원" src="/images/main/img_ban13.webp" /></a></AppListLi>
                <AppListLi><a href="https://www.sejong.go.kr/air/index.do" title="세종 미세먼지 정보센터" target="_blank" rel="noreferrer"><img alt="세종 미세먼지 정보센터" src="/images/main/img_ban14.webp" /></a></AppListLi>
                <AppListLi><a href="http://www.airgangwon.go.kr" title="강원 대기환경정보" target="_blank" rel="noreferrer"><img alt="강원 대기환경정보" src="/images/main/img_ban15.webp" /></a></AppListLi>
                <AppListLi><a href="https://www.chungbuk.go.kr/here/index.do" title="충북 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="충북 보건환경 연구원" src="/images/main/img_ban16.webp" /></a></AppListLi>
                <AppListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="/images/main/img_ban17.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="/images/main/img_ban18.webp" /></a></AppListLi>
                <AppListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="/images/main/img_ban19.webp" /></a></AppListLi>
                <AppListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="/images/main/img_ban20.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="/images/main/img_ban21.webp" /></a></AppListLi>
                <AppListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="/images/main/img_ban22.webp" /></a></AppListLi>
                {/* 복제 */}
                <AppListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="/images/main/img_ban01.webp" /></a></AppListLi>
                <AppListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="/images/main/img_ban02.webp" /></a></AppListLi>
                <AppListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="/images/main/img_ban03.webp" /></a></AppListLi>
                <AppListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="/images/main/img_ban04.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="/images/main/img_ban05.webp" /></a></AppListLi>
                <AppListLi><a href="https://air.gg.go.kr/" title="경기도 대기 환경 정보 서비스" target="_blank" rel="noreferrer"><img alt="경기도 대기 환경 정보 서비스" src="/images/main/img_ban06.webp" /></a></AppListLi>
            </AppListUl>
        </AppBannerWrap>
    )
}