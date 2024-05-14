import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Headers from "../../components/Header";
import styled from '@emotion/styled';
import { useState } from "react";

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
    width: 200px;
    align-items: center;
    `;

const AElement = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #000;
    padding: 0 20px;
    background: ${props => props.up ? `url('./img_loc_up.webp')` : `url('./img_loc_under.webp')`} no-repeat right center;
`;

export default function Page() {
    const [firstToggle, setFirstToggle] = useState(false);
    const [secondToggle, setSecondToggle] = useState(false);

    const toggleHandle = (e) => {
        e.preventDefault();
        setFirstToggle(!firstToggle);
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
                        <List><AElement to={`./`} title="에어코리아란" onClick={toggleHandle} up={firstToggle}>에어코리아란</AElement></List>
                        <List><AElement to={`./`} title="에어코리아 소개" onClick={(e) => e.preventDefault()} up={secondToggle}>에어코리아 소개</AElement></List>
                    </TopBar>
                </DivStyle>
            </main>
            <Footer />
        </>
    )
};
