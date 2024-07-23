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

// ~ Style
import { FooterCopyRight, FooterCopyRightImg, FooterComp, FooterInfoArea, FooterInfoAreaCallDust, FooterInfoAreaIconWrap, FooterInfoAreaLogo, FooterInfoAreaPseudo } from "../StyleComponent";

// @@@ 출력 컴포넌트 @@@
export default function Footer() {
    return (
        <FooterComp>
            <section>
                <FooterInfoArea>
                    <FooterInfoAreaLogo>
                        <img src="/images/global/logo.webp" alt="에어코리아 로고" />
                    </FooterInfoAreaLogo>
                    <FooterInfoAreaCallDust>
                        <div>
                            <p>실시간 미세먼지 농도 및 예보 관련 문의: <span style={{color: 'blue'}}>131</span><a href="tel:131">131</a> &#40;기상콜센터 유료&#41;</p>
                            <FooterInfoAreaPseudo />
                            <p>대기측정망 및 홈페이지관련 문의 : <span style={{color: 'blue'}}>032&#41;590-4000</span><a href="tel:032-590-4000">032&#41;590-4000</a> &#40;내선번호 8번&#41;</p>
                        </div>
                        <FooterInfoAreaIconWrap>
                            <p>&#91;22689&#93; 인천광역시 서구 환경로 42&#40;오류동 종합환경연구단지&#41;<br /><span style={{color: 'rgba(0,0,0,0.5)'}}>Copyright © 2023 한국환경공단, All rights reserved.</span></p>
                            <FooterCopyRight>
                                <p>인증을 받지 않은 실시간 자료이므로 자료 오류 및 표출방식에 따라 값이 다를 수 있음에 유의해주세요.</p>
                                <p>데이터는 실시간 관측된 자료이며 측정소 현지 사정이나 데이터의 수신상태에 따라 미수신 될 수 있음</p>
                                <p>
                                    <strong>공공데이터</strong>(<a href="https://www.data.go.kr/data/15073861/openapi.do" target="_blank" rel="noreferrer">한국환경공단 에어코리아 대기오염정보</a>, <a href="https://www.data.go.kr/data/15073877/openapi.do" target="_blank" rel="noreferrer">측정소정보</a>, <a href="https://www.data.go.kr/data/15073855/openapi.do" target="_blank" rel="noreferrer">대기오염통계 현황</a>)
                                </p>
                            </FooterCopyRight>
                            <FooterCopyRightImg>
                                <a href="https://www.me.go.kr/" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="/images/global/img_f_logo.webp" alt="환경부" /></a>
                                <a href="https://www.keco.or.kr/" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="/images/global/img_under_logo.webp" alt="한국환경공단" /></a>
                                <a href="http://www.kogl.or.kr/open/index.do" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="/images/global/img_openapi.webp" alt="OPEN API 이미지" /></a>
                            </FooterCopyRightImg>
                        </FooterInfoAreaIconWrap>
                    </FooterInfoAreaCallDust>
                </FooterInfoArea>
            </section>
        </FooterComp>
    )
};
