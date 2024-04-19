import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Footer = styled.footer`
    width: 100%;
    height: 100px;
    overflow: hidden;
`;
const BannerWrap = styled.div`display: flex;`;
const ButtonBox = styled.div`
    width: 140px;
    flex-basis: 140px;
    min-width: 140px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: #fff;
    h3 {margin-right: 10px;}
`;
const Btn = styled.button`
    width: 20px;
    height: 20px;
    border: none;
    background: no-repeat 0 0;
    cursor: pointer;
    ${(props) => props['data-btn'] && css`background-image: url(./img_ban_${props['data-btn']}.png);`};
`;
const ListUl = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
`;
const ListLi = styled.li`
    flex: 0 200px;
    min-width: 200px;
    text-align: center;
    height: 35px;
`;

export default function FooterComponent() {
    const handle = (e) => {
        const btn = e.currentTarget.dataset.btn;
        // 220px 씩 이동
    };

    return (
        <Footer>
            <BannerWrap>
                <ButtonBox>
                    <h3>유관기관</h3>
                    <Btn data-btn="left" onClick={handle}></Btn>
                    <Btn data-btn="atop" onClick={handle}></Btn>
                    <Btn data-btn="right" onClick={handle}></Btn>
                </ButtonBox>
                <ListUl>
                    <ListLi><a href="http://www.keco.or.kr" title="한국환경공단" target="_blank" rel="noreferrer"><img alt="한국환경공단" src="./img_ban01.jpg" /></a></ListLi>
                    <ListLi><a href="http://www.me.go.kr" title="환경부" target="_blank" rel="noreferrer"><img alt="환경부" src="./img_ban02.jpg" /></a></ListLi>
                    <ListLi><a href="http://www.weather.go.kr/weather/main.jsp" title="기상청" target="_blank" rel="noreferrer"><img alt="기상청" src="./img_ban03.jpg" /></a></ListLi>
                    <ListLi><a href="http://cleanair.seoul.go.kr/main.htm" title="서울특별시 대기환경 정보" target="_blank" rel="noreferrer"><img alt="서울특별시 대기환경 정보" src="./img_ban04.jpg" /></a></ListLi>
                    <ListLi><a href="https://air.incheon.go.kr/" title="인천광역시 보건환경 연구원 환경정보공개시스템" target="_blank" rel="noreferrer"><img alt="인천광역시 보건환경 연구원 환경정보공개시스템" src="./img_ban05.jpg" /></a></ListLi>
                    <ListLi><a href="https://www.airnow.gov/" title="미국실시간 대기정보" target="_blank" rel="noreferrer"><img alt="미국실시간 대기정보" src="./img_ban06.jpg" /></a></ListLi>
                    <ListLi><a href="https://air.cnemc.cn:18014/" title="중국실시간 대기 정보" target="_blank" rel="noreferrer"><img alt="중국실시간 대기 정보" src="./img_ban07.jpg" /></a></ListLi>
                    <ListLi><a href="https://soramame.env.go.jp/" title="일본실시간 대기정보" target="_blank" rel="noreferrer"><img alt="일본실시간 대기정보" src="./img_ban08.jpg" /></a></ListLi>
                    <ListLi><a href="https://heis.busan.go.kr" title="부산 보건환경정보 공개시스템" target="_blank" rel="noreferrer"><img alt="부산 보건환경정보 공개시스템" src="./img_ban09.jpg" /></a></ListLi>
                    <ListLi><a href="https://air.daegu.go.kr" title="대구 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="대구 대기정보 시스템" src="./img_ban10.jpg" /></a></ListLi>
                    <ListLi><a href="https://gwangju.go.kr" title="광주 시청" target="_blank" rel="noreferrer"><img alt="광주 대기정보 시스템" src="./img_ban11.jpg" /></a></ListLi>
                    <ListLi><a href="https://www.daejeon.go.kr/hea/airDynamicData.do?menuseq=6858" title="대전 보건환경연구원" target="_blank" rel="noreferrer"><img alt="대전 보건환경연구원" src="./img_ban12.jpg" /></a></ListLi>
                    <ListLi><a href="https://www.ulsan.go.kr/s/uihe/main.ulsan" title="울산 보건환경연구원" target="_blank" rel="noreferrer"><img alt="울산 보건환경연구원" src="./img_ban13.jpg" /></a></ListLi>
                    <ListLi><a href="https://www.sejong.go.kr/air/index.do" title="세종 미세먼지 정보센터" target="_blank" rel="noreferrer"><img alt="세종 미세먼지 정보센터" src="./img_ban14.jpg" /></a></ListLi>
                    <ListLi><a href="http://www.airgangwon.go.kr" title="강원 대기환경정보" target="_blank" rel="noreferrer"><img alt="강원 대기환경정보" src="./img_ban15.jpg" /></a></ListLi>
			        <ListLi><a href="https://www.chungbuk.go.kr/here/index.do" title="충북 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="충북 보건환경 연구원" src="./img_ban16.jpg" /></a></ListLi>
			        <ListLi><a href="https://www.chungnam.go.kr/healthenvMain.do?" title="충남 보건환경연구원" target="_blank" rel="noreferrer"><img alt="충남 보건환경연구원" src="./img_ban17.jpg" /></a></ListLi>
			        <ListLi><a href="https://air.jeonbuk.go.kr/index.do" title="전북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="전북 대기정보 시스템" src="./img_ban18.jpg" /></a></ListLi>
			        <ListLi><a href="https://jihe.go.kr/main/main.do" title="전남 보건환경 연구원" target="_blank" rel="noreferrer"><img alt="전남 보건환경 연구원" src="./img_ban19.jpg" /></a></ListLi>
			        <ListLi><a href="https://gb.go.kr/Main/open_contents/section/air/index.html" title="경북 대기정보 시스템" target="_blank" rel="noreferrer"><img alt="경북 대기정보 시스템" src="./img_ban20.jpg" /></a></ListLi>
			        <ListLi><a href="https://air.gyeongnam.go.kr/main.do" title="경남 대기환경정보" target="_blank" rel="noreferrer"><img alt="경남 대기환경정보" src="./img_ban21.jpg" /></a></ListLi>
			        <ListLi><a href="http://hei.jeju.go.kr" title="제주 보건환경연구원" target="_blank" rel="noreferrer"><img alt="제주 보건환경연구원" src="./img_ban22.jpg" /></a></ListLi>
                </ListUl>
            </BannerWrap>
        </Footer>
    )
};