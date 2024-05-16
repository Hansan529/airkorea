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
    width: 250px;
    align-items: center;
    border-right: 1px solid #dcdcdc;
    position: relative;
`;

const AElement = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #000;
    padding: 0 20px;
    background: ${props => props['data-direction'] === 'up' ? `url('./img_loc_up.webp')` : `url('./img_loc_under.webp')`} no-repeat 220px center;
`;
const ListDetail = styled.ul`
    position: absolute;
    width: 100%;
    top: 50px;
    overflow: hidden;
    height: ${props => `${props.$height}px`};
    transition: height 0.5s;

    li {
        a {
            display: block;
            height: 50px;
            padding: 0 20px;
            line-height: 50px;
            border: 1px solid #dcdcdc;
            border-top: none;
            color: #000;
            box-sizing: border-box;
        }
    }
`;

//정보 사이드
const Aside = styled.aside`
    width: 280px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin-top: -20px;

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

//정보 메인
const Section = styled.section`
    width: 1400px;
    height: 1000px;
    padding: 40px 0 0 0;
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
                </Section>
            </main>
            <Footer />
        </>
    )
};
