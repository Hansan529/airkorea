import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useState } from "react";

import { AElement, Aside, AsideLink, AsideLinkA, AsideLinkUl, Content, ContentTitle, DivStyle, Home, List, ListDetail, Section, TopBar } from '../layout';

const ContentSearchWrap = styled.div`
    position: relative;
    margin: 30px 0 0 0;
    padding: 15px 0 15px 245px;
    background: #f7f7f7;

    button {
        padding: 0 25px;
        background: #0f62cc;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        line-height: 34px;
        border-radius: 4px;
        margin: 3px 0 0 10px;
    }
`;
const ContentSearchInput = styled.input`
    width: 360px;
    height: 40px;
    margin: 0 0 0 10px;
    padding: 0 14px;
    line-height: 40px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    color: #0a0a0a;
    font-weight: 400;
`;

export default function Page() {
    // ! 서브 네비게이션 바 목록
    const topbarList = [
        {
            title: '실시간 자료조회',
            toggleIndex: 1,
            links: [
                { text: "에어코리아란", to: '/info?page=1' },
                { text: "대기정보 예보 / 경보", to: '/standby?page=1' },
                { text: "통계정보", to: '/?page=1' },
                { text: "배움터", to: '/?page=1' },
                { text: "고객지원", to: '/?page=1 '}
            ]
        },
        {
            title: '실시간 대기 정보',
            toggleIndex: 2,
            links: [
                { text: "시도별 대기정보", to: '/realtime?page=2' },
                { text: "미세먼지 세부 측정정보", to: '/realtime?page=3' }
            ]
        },
        {
            title: '우리동네 대기 정보',
            toggleIndex: 3,
            links: [
                { text: '국가산단주변 미세먼지 정보', to: '' },
                { text: '우리학교 주변 대기 정보', to: '' }
            ]
        }
    ];
    // # 네비게이션 토글
    const [toggles, setToggles] = useState({
        1: { px: 0, initial: 250},
        2: { px: 0, initial: 100},
        3: { px: 0, initial: 100}
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

    // ! 사이드바 목록
    const asideList = {
            title: '실시간 자료조회',
            links: [
                { text: '실시간 대기 정보', 
                    select: true, 
                    children: [
                    { text: '우리동네 대기 정보',        select: true },
                    { text: '국가산단주변 미세먼지 정보',  select: false },
                    { text: '우리학교 주변 대기 정보',    select: false }
                    ] 
                },
                { text: '시도별 대기정보',
                    select: false,
                    children: [
                    { text: '시도별 대기정보(PM-2.5)',  select: false },
                    { text: '시도별 대기정보(PM-10)',   select: false },
                    { text: '시도별 대기정보(오존)',     select: false },
                    { text: '시도별 대기정보(이산화질소)', select: false },
                    { text: '시도별 대기정보(일산화탄소)', select: false },
                    { text: '시도별 대기정보(아황산가스)', select: false }] 
                },
                { text: '미세먼지 세부 측정정보', 
                    select: false,
                    children: [
                    { text: '초미세먼지 (PM-2.5)',      select: false },
                    { text: '미세먼지 (PM-10)',        select: false },
                    { text: '미세먼지 (미량원소 성분)',    select: false }]
                },
            ]
    };

    // # 사이드바 토글
    const [asideToggle, setAsideToggle] = useState({
        [asideList.links[0].text]: { px: 150, initial: asideList.links[0].children.length * 50 },
        [asideList.links[1].text]: { px: 0, initial: asideList.links[1].children.length * 50 },
        [asideList.links[2].text]: { px: 0, initial: asideList.links[2].children.length * 50 },
    });
    const asideHandle = (e) => {
        e.preventDefault();
        const key = e.currentTarget.innerText;
        const boolean = key in asideToggle;
        if(boolean) {
            setAsideToggle(prevToggles => {
                const newToggles = {};

                // @ 모든 px을 0으로 초기화
                for(let key in prevToggles) {
                    newToggles[key] = {
                        ...prevToggles[key],
                        px: 0,
                    }
                };

                // @ 선택한 버튼의 px 높이 설정
                newToggles[key] = {
                    ...prevToggles[key],
                    px: prevToggles[key].px !== 0 ? 0 : prevToggles[key].initial,
                    initial: prevToggles[key].initial
                };

                return newToggles;
            });
        };
    };

    return (
        <>
            <DivStyle>
                <TopBar>
                    <li>
                        <Home to="/" title="홈"></Home>
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
                    <h2>{asideList.title}</h2>
                    <ul>
                        {asideList.links.map((link, index) => {
                            const variableCheck = typeof asideToggle !== 'undefined';
                            const childrenCheck = 'children' in link;
                            let result;
                            if(variableCheck) {
                                result = variableCheck && (
                                    <li key={index}>
                                        <AsideLink 
                                            to="#" 
                                            onClick={asideHandle}
                                            children_height={asideToggle[link.text]?.px}
                                            selected={link.select}
                                            showmore={childrenCheck ? 'true' : 'false'} 
                                            >{link.text}</AsideLink>
                                        {childrenCheck && 
                                            <AsideLinkUl $height={asideToggle[link.text]?.px}>
                                                {link.children.map((item, _index) => {
                                                    return <li key={_index}><AsideLinkA selected={item.select}>{item.text}</AsideLinkA></li>
                                                })}
                                            </AsideLinkUl>
                                        }
                                    </li>
                                );
                            } else {
                                result = !variableCheck && (
                                    <li key={index}>
                                        <AsideLink to={`/info?page=${index + 1}`} selected={link.select}>
                                            {link.text}
                                        </AsideLink>
                                    </li>
                                );
                            }
                            return result;
                        })}
                    </ul>
                </Aside>
                <Content>
                    <ContentTitle>우리동네 대기 정보</ContentTitle>
                    <ContentSearchWrap>
                        <label htmlFor="search">지역명 검색</label>
                        <ContentSearchInput type="text" id="search" placeholder="도로명 또는 동을 입력하세요. 예) 서소문로" />
                        <button>검색</button>
                    </ContentSearchWrap>
                </Content>
            </Section>
        </>
    )
};