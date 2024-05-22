import { Link } from "react-router-dom";
import styled from '@emotion/styled';
import { useState } from "react";
import { AElement, Aside, AsideLink, Content, ContentTitle, DivStyle, Home, List, ListDetail, Section, TopBar } from './page';

const ContentSubTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 275px;
    padding: 20px;
    text-align: center;
    border: 5px solid #e4eef8;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 20px;

    > div:first-of-type {
        display: table;
        width: 100%;
        height: 150px;
        background: #f7f7f7;

        p {
            display: table-cell;
            vertical-align: middle;
            width: 50%;
            font-size: 34px;
            font-weight: 600;
            span { color: #0f62cc; }
        }
        p+p { text-align: left; }
    }

    > div+div {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 20px;
        font-size: 18px;
    }
`;
const ContentTable = styled.table`
    width: 100%;
    border-top: 2px solid #000;
    margin: 20px 0;

    caption { 
        text-align: left;
        margin-bottom: 10px;
        ul { list-style: inside; }
    }

    th { font-weight: 600; }

    th, td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #dcdcdc;
        padding: 15px 10px;
        font-size: 14px;
    }
`;
const ContentCharacterWrap = styled.div`
    margin: 25px 0 30px 0;
    ul {
        display: flex;
        justify-content: space-between;
    }
    `;
const ContentCharacter = styled.li`
    flex-basis: 250px;
    height: 200px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-image: ${({char}) => `url(/images/info/character_0${char}.webp)`};
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    
    p {
        display: table;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60px;
        height: 60px;
        background-color: #f7f7f7;
        
        em {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }
    }
`;

const NuriBox = styled.div`
    padding: 16px 16px 16px 173px;
    border: 1px solid #dcdcdc;
    background: #f7f7f7 url(/images/info/img_sub_openapi.webp) no-repeat left 20px top 19px;
    border-radius: 6px;
    line-height: 21px;
    p {
        font-size: 14px;
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

    return (
        <main>
            <DivStyle>
                <TopBar>
                    <li>
                        <Home to="/" title="홈"></Home>
                    </li>
                    <List>
                        <AElement to="./" title="에어코리아란" onClick={(e) => toggleHandle(e, 1)} data-index='1' data-direction={toggles[1].px === toggles[1].initial ? 'up' : 'down'}>에어코리아란</AElement>
                        <ListDetail $height={toggles[1].px}>
                            <li><Link>실시간 자료조회</Link></li>
                            <li><Link>대기정보 예보 / 경보</Link></li>
                            <li><Link>통계정보</Link></li>
                            <li><Link>배움터</Link></li>
                            <li><Link>고객지원</Link></li>
                        </ListDetail>
                    </List>
                    <List>
                        <AElement to="./" title="에어코리아 소개" onClick={(e) => toggleHandle(e, 2)} data-index='2' data-direction={toggles[2].px === toggles[2].initial ? 'up' : 'down'}>에어코리아 소개</AElement>
                        <ListDetail $height={toggles[2].px}>
                            <li><Link to="/info?page=2">측정망 정보</Link></li>
                            <li><Link to="/info?page=3">측정소 정보</Link></li>
                        </ListDetail>
                    </List>
                </TopBar>
            </DivStyle>
            <Section>
                <Aside>
                    <h2>에어코리아란</h2>
                    <ul>
                        <li><AsideLink to="/info/?page=1" selected>에어코리아 소개</AsideLink></li>
                        <li><AsideLink to="/info/?page=2">측정망 정보</AsideLink></li>
                        <li><AsideLink to="/info/?page=3">측정소 정보</AsideLink></li>
                    </ul>
                </Aside>
                <Content>
                    <ContentTitle>에어코리아 소개</ContentTitle>
                    <ContentSubTitleWrap>
                        <div>
                            <p><img src="/images/global/logo.webp" alt="에어코리아 로고" /></p>
                            <p><span>나</span>와 <span>우리가족</span>을 위한<br />홈페이지입니다.</p>
                        </div>
                        <div>
                            <p>한국환경곤단은 여러분이 언제 어디서든지 실시간으로 대기정보를 확인할 수 있는<br /><strong>대기환경정보실시간공개시스템</strong>을 운영하고 있습니다.</p>
                        </div>
                    </ContentSubTitleWrap>
                    <p>
                        한국과 일본의 20개 도시에서 공동으로 개최된 2002년 제17회 한·일 월드컵축구대회의 성공적인 개최를 위하여 국립환경과학원은 2002년 4월부터 우리나라 10개 시·도 경기장 주변 16개 지점의 대기정보를 제한적으로 공개하기 시작하였습니다.<br /><br />
                        이를 계기로 한국환경공단은 2003년 12월부터 기존에 구축되어 있는 대기측정망 관련 인프라를 이용하여 대기정보의 실시간 공개에 대한 국민적 요구에 부응하고 보다 양질의 대기환경정보를 제공하고자 전국의 모든 측정소를 대상으로 대기정보를 공개할 수 있는 확대방안을 마련하였습니다.<br /><br />
                        일차적으로 2004년 4월부터 전국의 대기측정망에서 측정되는 아황산가스, 일산화탄소, 이산화질소, 오존, 미세먼지 등 대기정보 자료를 수집·관리하는 국가대기환경정보관리시스템&#40;NAMIS&#41;을 구축하여 국가와 지방자치단체 등 행정기관에서 대기환경정책 자료로 활용할 수 있도록 정보를 제공하였습니다.<br /><br />
                        NAMIS에 수집된 막대한 양&#40;연간 3억4천만건&#41;의 대기정보 자료는 보다 알기 쉽고 편리하게 국민이 접할 수 있도록 시스템의 최적화, 표출방식, 대국민 의견수렴 및 시범운영 등을 통해 1년여의 각고의 노력 끝에 2005년 12월 28일 드디어 “에어코리아” 라는 대기환경정보실시간공개시스템&#40;www.airkorea.or.kr&#41;이 탄생하였습니다.<br /><br />
                        에어코리아는 전국 162개 시,군에 설치된 642개의 도시대기 측정망, 국가배경농도 측정망, 교외대기 측정망, 도로변대기 측정망, 항만대기 측정망에서 측정된 대기환경기준물질의 측정 자료를 다양한 형태로 표출하여 국민들에게 실시간으로 제공하고 있습니다. 또한, 기상청에서 운영하는 황사경보제와 지자체에서 운영하는 오존경보제 등의 자료도 함께 공개하고 있어 대기오염으로 인한 국민의 피해예방에 크게 기여하고 있습니다.
                    </p>
                    <ContentTable>
                        <caption>
                            <ul><li>Airkorea 공개 대상 측정망 현황 &#40;2023년 10월 기준&#41;</li></ul>
                        </caption>
                        <thead>
                            <tr>
                                <th>측정망 종류</th>
                                <th>공개대상 항목</th>
                                <th>설치 목적</th>
                                <th>측정소 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>도시대기 측정망</th>
                                <td rowSpan="5"><p>SO<sub>2</sub>, CO,</p><p>NO<sub>2</sub>, O<sub>3</sub>,</p><p>PM-10,PM-2.5</p></td>
                                <td>도시지역의 평균 대기질 농도를 파악하여 환경 기준 달성 여부 판정</td>
                                <td>525개<br />&#40;170개 시·군&#41;</td>
                            </tr>
                            <tr>
                                <th>국가배경농도&#40;도서&#41; 측정망</th>
                                <td>국가적인 배경농도를 파악하고 외국으로부터의 오염물질 유입·유출 상태, 장거리 이동 현황 등 파악</td>
                                <td>11개 <br />&#40;8개 시·군&#41;</td>
                            </tr>
                            <tr>
                                <th>교외대기 측정망</th>
                                <td>광범위한 지역의 배경농도 파악</td>
                                <td>27개 <br />&#40;25개 시·군&#41;</td>
                            </tr>
                            <tr>
                                <th>도로변대기 측정망</th>
                                <td>자동차 통행량과 유동 인구가 많은 도로변 대기질을 파악</td>
                                <td>58개 <br />&#40;29개 시&#41;</td>
                            </tr>
                            <tr>
                                <th>항만대기 측정망</th>
                                <td>항만지역등의 대기오염물질 배출원의 효과적관리</td>
                                <td>29개 <br />&#40;18개 시·군&#41;</td>
                            </tr>
                        </tbody>
                    </ContentTable>
                    <p>대기환경기준물질 6개 항목&#40;아황산가스, 일산화탄소, 이산화질소, 오존, 미세먼지&#40;PM-10,PM-2.5&#41;&#41;에 대한 대기오염도를 대기오염 시계, 대기오염 달력 등의 표현 방식과 접목하여 시간대별, 일자별, 요일별로 제공하며, 인체 영향과 체감오염도를 반영한 통합대기환경지수의 적용을 통해 대기오염의 상황을 한눈에 알기 쉽게 4개 등급과 색상으로 표현하여 제공하고 있습니다.</p>
                    <ContentCharacterWrap>
                        <ul>
                            <ContentCharacter char="1"><p><em>좋음</em></p></ContentCharacter>
                            <ContentCharacter char="2"><p><em>보통</em></p></ContentCharacter>
                            <ContentCharacter char="3"><p><em>나쁨</em></p></ContentCharacter>
                            <ContentCharacter char="4"><p><em>매우<br />나쁨</em></p></ContentCharacter>
                        </ul>
                    </ContentCharacterWrap>
                    <NuriBox>
                        <strong>공공누리</strong>
                        <p>한국환경공단이 창작한 대기오염도 실시간자료 저작물은 공공누리 이용약관(출처표시, 변경금지)에 따라 이용할 수 있습니다.</p>
                    </NuriBox>
                </Content>
            </Section>
        </main>
    )
};
