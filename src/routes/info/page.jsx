import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Headers from "../../components/Header";
import styled from '@emotion/styled';
import { useRef, useState } from "react";

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

// 메인
const Section = styled.section`
    height: 1000px;
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
                </Section>
            </main>
            <Footer />
        </>
    )
};
