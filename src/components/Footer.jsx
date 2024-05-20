import styled from '@emotion/styled';

const FooterComp = styled.footer`
    overflow: hidden;
    border-top: 1px solid #dcdcdc;
`;
//? 푸터 정보
const InfoArea = styled.div`
    display: flex;
    width: 1400px;
    height: 120px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
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
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    img {
        display: block;
        height: 30px;
        margin-bottom: 5px;
    }
`;


export default function Footer() {
    return (
        <FooterComp>
            <section>
                <InfoArea>
                    <InfoAreaLogo>
                        <img src="/images/global/logo.webp" alt="에어코리아 로고" />
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
                                <a href="https://www.me.go.kr/" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="/images/global/img_f_logo.webp" alt="환경부" /></a>
                                <a href="https://www.keco.or.kr/" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="/images/global/img_under_logo.webp" alt="한국환경공단" /></a>
                                <a href="http://www.kogl.or.kr/open/index.do" title="새창으로 열기" target="_blank" rel="noreferrer"><img src="/images/global/img_openapi.webp" alt="OPEN API 이미지" /></a>
                            </CopyRightImg>
                        </InfoAreaIconWrap>
                    </InfoAreaCallDust>
                </InfoArea>
            </section>
        </FooterComp>
    )
};
