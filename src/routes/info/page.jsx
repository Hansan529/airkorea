import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Headers from "../../components/Header";
import styled from '@emotion/styled';
import { useState } from "react";

//정보 네비게이션
const DivStyle = styled.div`
    background-color: #f5f5f5;
    border-bottom: 1px solid #dcdcdc;
    height: 50px;
`;
const TopBar = styled.ul`
    display: flex;
    width: 1400px;
    margin: 0 auto;
    position: relative;
`;
const Home = styled(Link)`
    background: url('./img_loc_home.webp') no-repeat center center;
    display: block;
    width: 50px;
    height: 50px;
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
`;

const List = styled.li`
    display: flex;
    /* width: 250px; */
    align-items: center;
    border-right: 1px solid #dcdcdc;
    position: relative;
    z-index: 10;
`;

const AElement = styled(Link)`
    display: block;
    width: 250px;
    height: 100%;
    line-height: 50px;
    color: #000;
    padding: 0 20px;
    background: ${props => props['data-direction'] === 'up' ? `url('./img_loc_up.webp')` : `url('./img_loc_under.webp')`} no-repeat 220px center;
`;
const ListDetail = styled.ul`
    position: absolute;
    width: 250px;
    top: 49px;
    left: -0.8px;
    overflow: hidden;
    height: ${props => `${props.$height}px`};
    transition: height 0.5s;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    background-color: #fff;
    /* box-shadow: 0 0 0 1px #dcdcdc inset; */
    border: 1px solid #dcdcdc;
    border-top: none;
    box-sizing: content-box;

    li> a {
            display: block;
            height: 50px;
            padding: 0 20px;
            line-height: 50px;
            border-top: none;
            color: #000;
            box-sizing: border-box;
    }
    li+li>a{ border-top: 1px solid #dcdcdc; }
`;


//정보 메인
const Section = styled.section`
    display: flex;
    width: 1400px;
    height: 1000px;
    padding: 40px 0 0 0;
    gap: 0 50px;
`;

    //정보 사이드
    const Aside = styled.aside`
        min-width: 280px;
        width: 280px;
        border-radius: 10px;
        border: 1px solid #dcdcdc;
        overflow: hidden;
        margin-top: -20px;
        align-self: flex-start;

        h2 {
            display: block;
            height: 140px;
            font-size: 26px;
            color: #fff;
            font-weight: 600;
            text-align: center;
            padding: 44px 0 0 0;
            background: linear-gradient(to right, #0f62cc, #00c28a);
            border-radius: 10px;
            box-sizing: border-box;
        }
        ul {
            margin-top: -30px;
            padding: 37px 20px 54px;
            background-color: #fff;
            border: 1px solid #dadcdf;
            border-radius: 10px;

            li { border-bottom: 1px solid #dcdcdc; }
            a{
                display: block;
                height: 50px;
                padding: 0 13px;
                line-height: 50px;
                letter-spacing: -1px;
                color: #000;
            }
        }
    `;

//정보 본문
const Content = styled.div`
    /* flex-grow: 1; */
`;
const ContentTitle = styled.h2`
    border-bottom: 1px dotted #000;
    padding: 20px 20px;
    font-size: 28px;
    font-weight: 600;
`;
const ContentSubTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 275px;
    padding: 20px;
    text-align: center;
    border: 5px solid #e4eef8;
    border-radius: 5px;
    box-sizing: border-box;

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
        <>
            <Headers />
            <main>
                <DivStyle>
                    <TopBar>
                        <li>
                            <Home to={'/'} title="홈"></Home>
                        </li>
                        <List>
                            <AElement to={`./`} title="에어코리아란" onClick={(e) => toggleHandle(e, 1)} data-index='1' data-direction={toggles[1].px === toggles[1].initial ? 'up' : 'down'}>에어코리아란</AElement>
                            <ListDetail $height={toggles[1].px}>
                                <li><Link>실시간 자료조회</Link></li>
                                <li><Link>대기정보 예보 / 경보</Link></li>
                                <li><Link>통계정보</Link></li>
                                <li><Link>배움터</Link></li>
                                <li><Link>고객지원</Link></li>
                            </ListDetail>
                        </List>
                        <List>
                            <AElement to={`./`} title="에어코리아 소개" onClick={(e) => toggleHandle(e, 2)} data-index='2' data-direction={toggles[2].px === toggles[2].initial ? 'up' : 'down'}>에어코리아 소개</AElement>
                            <ListDetail $height={toggles[2].px}>
                                <li><Link>측정망 정보</Link></li>
                                <li><Link>측정소 정보</Link></li>
                            </ListDetail>
                        </List>
                    </TopBar>
                </DivStyle>
                <Section>
                    <Aside>
                        <h2>에어코리아란</h2>
                        <ul>
                            <li><Link>에어코리아 소개</Link></li>
                            <li><Link>측정망 정보</Link></li>
                            <li><Link>측정소 정보</Link></li>
                        </ul>
                    </Aside>
                    <Content>
                        <ContentTitle>에어코리아 소개</ContentTitle>
                        <ContentSubTitleWrap>
                            <div>
                                <p><img src="./logo.webp" alt="에어코리아 로고" /></p>
                                <p><span>나</span>와 <span>우리가족</span>을 위한<br />홈페이지입니다.</p>
                            </div>
                            <div>
                                <p>한국환경곤단은 여러분이 언제 어디서든지 실시간으로 대기정보를 확인할 수 있는<br /><strong>대기환경정보실시간공개시스템</strong>을 운영하고 있습니다.</p>
                            </div>
                        </ContentSubTitleWrap>
                        <p>
                            한국과 일본의 20개 도시에서 공동으로 개최된 2002년 제17회 한·일 월드컵축구대회의 성공적인 개최를 위하여 국립환경과학원은 2002년 4월부터 우리나라 10개 시·도 경기장 주변 16개 지점의 대기정보를 제한적으로 공개하기 시작하였습니다.<br /><br />
                            이를 계기로 한국환경공단은 2003년 12월부터 기존에 구축되어 있는 대기측정망 관련 인프라를 이용하여 대기정보의 실시간 공개에 대한 국민적 요구에 부응하고 보다 양질의 대기환경정보를 제공하고자 전국의 모든 측정소를 대상으로 대기정보를 공개할 수 있는 확대방안을 마련하였습니다.<br /><br />
                            일차적으로 2004년 4월부터 전국의 대기측정망에서 측정되는 아황산가스, 일산화탄소, 이산화질소, 오존, 미세먼지 등 대기정보 자료를 수집·관리하는 국가대기환경정보관리시스템(NAMIS)을 구축하여 국가와 지방자치단체 등 행정기관에서 대기환경정책 자료로 활용할 수 있도록 정보를 제공하였습니다.<br /><br />
                            NAMIS에 수집된 막대한 양(연간 3억4천만건)의 대기정보 자료는 보다 알기 쉽고 편리하게 국민이 접할 수 있도록 시스템의 최적화, 표출방식, 대국민 의견수렴 및 시범운영 등을 통해 1년여의 각고의 노력 끝에 2005년 12월 28일 드디어 “에어코리아” 라는 대기환경정보실시간공개시스템(www.airkorea.or.kr)이 탄생하였습니다.<br /><br />
                            에어코리아는 전국 162개 시,군에 설치된 642개의 도시대기 측정망, 국가배경농도 측정망, 교외대기 측정망, 도로변대기 측정망, 항만대기 측정망에서 측정된 대기환경기준물질의 측정 자료를 다양한 형태로 표출하여 국민들에게 실시간으로 제공하고 있습니다. 또한, 기상청에서 운영하는 황사경보제와 지자체에서 운영하는 오존경보제 등의 자료도 함께 공개하고 있어 대기오염으로 인한 국민의 피해예방에 크게 기여하고 있습니다.
                        </p>
                    </Content>
                </Section>
            </main>
            <Footer />
        </>
    )
};
