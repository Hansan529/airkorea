import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useState } from "react";

import { AElement, Aside, AsideLink, Content, ContentTitle, DivStyle, Home, List, ListDetail, Section, TopBar } from '../layout';

const ContentTable = styled.table`
    width: 100%;
    border-top: 2px solid #000;
    margin: 20px 0;

    caption { 
        text-align: left;
        margin-bottom: 10px;
        h2 { 
            font-size: 22px; 
            font-weight: 600;
            margin-top: 10px;
        }
        p { margin-top: 15px; }
    }

    th { 
        font-weight: 600; 
        font-size: 16px;
    }
    td {
        font-size: 13px;
    }
    th, td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #dcdcdc;
        padding: 15px 10px;
        word-break: keep-all;
    }
    tbody > tr th {
        background-color: #EAFAF3;
    }
`;

//정보 네비게이션
export default function Page() {
    const [toggles, setToggles] = useState({
        1: { px: 0, initial: 250},
        2: { px: 0, initial: 100}
    });

    const toggleHandle = (e, index) => {
        e.preventDefault();
        setToggles(prevToggles => ({
            ...prevToggles,
            [index]: {
                px: prevToggles[index].px !== 0 ? 0 : prevToggles[index].initial,
                initial: prevToggles[index].initial
            }
        }));
    };

    const topbarList = [
        {
            title: '에어코리아란',
            toggleIndex: 1,
            links: [
                { text: "실시간 자료조회", to: '/realtime?page=1' },
                { text: "대기정보 예보 / 경보", to: '/standby?page=1' },
                { text: "통계정보", to: '/?page=1' },
                { text: "배움터", to: '/?page=1' },
            ]
        },
        {
            title: '측정망 정보',
            toggleIndex: 2,
            links: [
                { text: "에어코리아란", to: '/info?page=1' },
                { text: "측정소 정보", to: '/info?page=3' }
            ]
        }
    ]

    return (
        <>
            <DivStyle>
                <TopBar>
                    <li>
                        <Home to={'/'} title="홈"></Home>
                    </li>
                    {topbarList.map((item, index) => (
                        <List key={index}>
                            <AElement
                                to="./"
                                title={item.title}
                                onClick={(e) => toggleHandle(e, item.toggleIndex)}
                                data-index={item.toggleIndex}
                                data-direction={toggles[item.toggleIndex].px === toggles[item.toggleIndex].initial ? 'up' : 'down'}
                            >
                                {item.title}
                            </AElement>
                            <ListDetail $height={toggles[item.toggleIndex].px}>
                                {item.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link to={link.to}>{link.text}</Link>
                                    </li>
                                ))}
                            </ListDetail>
                        </List>
                    ))}
                </TopBar>
            </DivStyle>
            <Section>
                <Aside>
                    <h2>에어코리아란</h2>
                    <ul>
                        <li><AsideLink to="/info/?page=1">에어코리아 소개</AsideLink></li>
                        <li><AsideLink to="/info/?page=2" selected>측정망 정보</AsideLink></li>
                        <li><AsideLink to="/info/?page=3">측정소 정보</AsideLink></li>
                    </ul>
                </Aside>
                <Content>
                    <ContentTitle>측정망 정보</ContentTitle>
                    <ContentTable>
                        <caption>
                            <h2>일반대기환경측정망</h2>
                            <p>전국적인 대기오염실태, 변화추이 및 대기환경기준 달성여부 등을 파악하기 위하여 대기오염물질 측정장비를 설치&#183;운영하고 있습니다.</p>
                        </caption>
                        <thead>
                            <tr>
                                <th>분류</th>
                                <th>설치 목적</th>
                                <th>측정항목</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>도시대기 측정망</th>
                                <td>도심(거주)지역의 평균대기질 농도 측정</td>
                                <td>SO<sub>2</sub>, CO, NO<sub>2</sub>, O<sub>3</sub>, PM-10, PM-2.5 등</td>
                            </tr>
                            <tr>
                                <th>국가배경농도 측정망</th>
                                <td>국가의 배경농도를 파악하고 외국으로의 오염물질 유입, 유출상태 등을 파악</td>
                                <td>SO<sub>2</sub>, CO, NO<sub>2</sub>, O<sub>3</sub>, PM-10, PM-2.5 등</td>
                            </tr>
                            <tr>
                                <th>교외대기 측정망</th>
                                <td>도시를 둘러싼 교외 지역의 배경농도 측정</td>
                                <td>SO<sub>2</sub>, CO, NO<sub>2</sub>, O<sub>3</sub>, PM-10, PM-2.5 등</td>
                            </tr>
                            <tr>
                                <th>도로변대기 측정망</th>
                                <td>자동차 통행량과 유동인구가 많은 도로변 대기농도 측정</td>
                                <td>SO<sub>2</sub>, CO, NO<sub>2</sub>, O<sub>3</sub>, PM-10,<br />PM-2.5,Pb, HC, 교통량 등</td>
                            </tr>
                            <tr>
                                <th>항만 측정망</th>
                                <td>항만지역 등의 대기질 현황 및 변화에 대한 실태조사</td>
                                <td>SO<sub>2</sub>, CO, NO<sub>2</sub>, O<sub>3</sub>, PM-10, PM-2.5 등</td>
                            </tr>
                        </tbody>
                    </ContentTable>
                    <ContentTable>
                        <caption>
                            <h2>특수대기환경측정망</h2>
                        </caption>
                        <thead>
                            <tr>
                                <th>분류</th>
                                <th>설치 목적</th>
                                <th>측정항목</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>대기 중금속</th>
                                <td>도시지역 또는 산단 인근지역에서<br />중금속에 의한 오염실태 파악</td>
                                <td>Pb, Cd, Cr, Cu, Mn, Fe, Ni, As, Be, Al, Ca, Mg</td>
                            </tr>
                            <tr>
                                <th rowSpan="2">유해대기물질</th>
                                <td rowSpan="2">도시지역, 주요 산단, 배경농도지역에서<br />특정유해대기물질에 의한 오염 실태 파악</td>
                                <td>VOCs&#40;휘발성유기화합물&#41;: 16종</td>
                            </tr>
                            <tr>
                                <td>PAHs&#40;다환방향족탄화수소&#41;: 16종</td>
                            </tr>
                            <tr>
                                <th rowSpan="3">산성 강하물</th>
                                <td rowSpan="3">대기로부터 오염물질의 건성침착량 및<br />강우·강설 등에 의한 오염물질의 습성침착량 파악</td>
                                <td>건성: 초미세먼지&#40;PM-2.5&#41; 질량, 초미세먼지&#40;PM-2.5&#41; 중 <br />이온성분&#40;CI<sup>-</sup>, NO<sub>3</sub><sup>-</sup>, SO<sub>4</sub><sup>2-</sup>, NH<sub>4</sub><sup>+</sup>, Na<sup>+</sup>, K<sup>+</sup>, Ca<sup>2+</sup>, Mg<sup>2+</sup>&#41;, 가스상&#40;HNO<sub>3</sub>, NH<sub>3</sub>&#41;</td>
                            </tr>
                            <tr>
                                <td>습성: pH, 이온성분&#40;CI<sup>-</sup>, NO<sub>3</sub><sup>-</sup>, SO<sub>4</sub><sup>2-</sup>, NH<sub>4</sub><sup>+</sup>, Na<sup>+</sup>, K<sup>+</sup>, Ca<sup>2+</sup>, Mg<sup>2+</sup>&#41;,<br />전기전도도, 강우&#40;설&#41;량</td>
                            </tr>
                            <tr>
                                <td>수은: 총가스상수은, 종별수은, 습성침적량</td>
                            </tr>
                            <tr>
                                <th>광화학 대기 오염 물질</th>
                                <td>도시지역의 오존생성의 원인물질인 휘발성유기화합물질<br />&#40;VOCS&#41;의 농도를 파악하여 오존오염현상을 규명하고 오존예보 <br />등을 위한 기초 자료로 활용</td>
                                <td>CO, NOx, NOy, O<sub>3</sub>,PM-10,PM-2.5, 카르보닐화합물, VOCs&#40;ethane 등 56종&#41;,<br />풍향, 풍속, 온도, 습도, 일사량, 자외선량, 강수량, 기압</td>
                            </tr>
                            <tr>
                                <th>지구 대기</th>
                                <td>지구온난화물질, 오존층파괴물질의 대기 중 농도 파악</td>
                                <td>CO<sub>2</sub>, N<sub>2</sub>O, CH<sub>4</sub>, CFC&#40;-11,-12,-113&#41;</td>
                            </tr>
                            <tr>
                                <th>초미세먼지&#40;PM-2.5&#41;성분</th>
                                <td>인체위해도가 높은 초미세먼지&#40;PM-2.5&#41;의<br />농도 파악 및 성분파악을 통한 배출원 규명</td>
                                <td>초미세먼지&#40;PM-2.5&#41; 질량, 탄소성분&#40;OC,EC&#41;,초미세먼지&#40;PM-2.5&#41; 중<br />이온성분&#40;CI<sup>-</sup>, NO<sub>3</sub><sup>-</sup>, SO<sub>4</sub><sup>2-</sup>, NH<sub>4</sub><sup>+</sup>, Na<sup>+</sup>, K<sup>+</sup>, Ca<sup>2+</sup>, Mg<sup>2+</sup>&#41;,<br />중금속성분&#40;Pb, Cd, Cr, Cu, Mn, Fe, Ni, As, Be&#41;</td>
                            </tr>
                        </tbody>
                    </ContentTable>
                </Content>
            </Section>
        </>
    )
};
