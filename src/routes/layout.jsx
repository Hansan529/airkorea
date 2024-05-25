import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

//정보 네비게이션
export const DivStyle = styled.div`
    background-color: #f5f5f5;
    border-bottom: 1px solid #dcdcdc;
    height: 50px;
    position: sticky;
    top: 0;
`;
export const TopBar = styled.ul`
    display: flex;
    width: 1400px;
    margin: 0 auto;
    position: relative;
`;
export const Home = styled(Link)`
    background: url(/images/global/img_loc_home.webp) no-repeat center center;
    display: block;
    width: 50px;
    height: 50px;
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
`;
export const List = styled.li`
    display: flex;
    /* width: 250px; */
    align-items: center;
    border-right: 1px solid #dcdcdc;
    position: relative;
    z-index: 10;

    a:hover { text-decoration: underline; }
`;
export const AElement = styled(Link)`
    display: block;
    width: 250px;
    height: 100%;
    line-height: 50px;
    color: #000;
    padding: 0 20px;
    background: ${props => props['data-direction'] === 'up' ? `url('/images/info/img_loc_up.webp')` : `url('/images/info/img_loc_under.webp')`} no-repeat 220px center;
    position: relative;
    z-index: 10;
`;
export const ListDetail = styled.ul`
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
//정보 사이드
export const Aside = styled.aside`
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
    > ul {
        margin-top: -30px;
        padding: 37px 20px 54px;
        background-color: #fff;
        border: 1px solid #dadcdf;
        border-radius: 10px;

        > li { border-bottom: 1px solid #dcdcdc; }
    }
    `;
export const AsideLink = styled(Link)`
    display: block;
    height: 50px;
    padding: 0 13px;
    line-height: 50px;
    letter-spacing: -1px;
    color: ${({selected}) => selected ? '#0f62cc' : '#000'};
    font-weight: 500;
    background: ${({showmore,children_height}) => showmore === 'true' 
                    ? (children_height === 0 
                        ? 'url(/images/global/img_left_down.webp) no-repeat right 15px center' 
                        : 'url(/images/global/img_left_up.webp) no-repeat right 15px center') 
                    : null};

    &:hover { color: #0f62cc; }
`;
export const AsideLinkUl = styled.ul`
    transition: 0.5s ease;
    height: ${({$height}) => `${$height}px`};
    padding: 0 10px;
    border-top: 2px solid #0f62cc;
    border-width: ${({$height}) => $height === 0 ? 0 : '2px'};
    overflow: hidden;
`;
export const AsideLinkA = styled(Link)`
    display: block;
    height: 50px;
    padding: 0 15px;
    font-size: 15px;
    color: ${({selected}) => selected ? '#0f62cc' : '#464646'};
    font-weight: 400;
    line-height: 50px;
    border-bottom: 1px dotted #dcdcdc;
`;
//정보 메인
export const Section = styled.section`
    display: flex;
    width: 1400px;
    padding: 40px 0 0 0;
    gap: 0 50px;
    margin: 0 auto;
`;
export const Content = styled.div`
    flex-grow: 1;
    padding-bottom: 100px;
    word-break: keep-all;
`;
export const ContentTitle = styled.h2`
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding: 20px 20px;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 600;
`;

const Layout = ({children}) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
};

export default Layout;