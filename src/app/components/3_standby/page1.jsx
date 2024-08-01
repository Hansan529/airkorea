/*
    ! 주제
    @ 컴포넌트
    # 설명
    & 강조
    #& 공통
    ~ 세팅
*/

/*
    Package
    Json
    Hooks
    Style
    Component
    Package Settings
*/

// ~ System
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

// ~ JSON
import regionListData from "../../data/regionList.json";
// ~ HOOKS
// ~ Styles
import { LayoutAElement, LayoutAside, LayoutAsideLink, LayoutAsideLinkA, LayoutAsideLinkUl, LayoutContent, ContentResultTableWrap, ContentResultWrap, LayoutContentTitle, LayoutDivStyle, LayoutHome, LayoutList, LayoutListDetail, LoadingWrap, LayoutSection, LayoutTopBar, ContentTable, RealtimePage2ContentResultSearchBtn, RealtimePage2ContentResultSearchBox, ContentTableWrap } from '../assets/StyleComponent.jsx';

// ~ Component
// ~ Package Settings

// # 지역 목록 및 지역 내 측정소 목록
/**
 * @typedef {Object} RegionList
 * @property {string} 서울
 * @property {string} 경기
 * @property {string} 인천
 * @property {string} 강원
 * @property {string} 충남
 * @property {string} 대전
 * @property {string} 충북
 * @property {string} 세종
 * @property {string} 부산
 * @property {string} 울산
 * @property {string} 대구
 * @property {string} 경북
 * @property {string} 경남
 * @property {string} 전남
 * @property {string} 광주
 * @property {string} 전북
 * @property {string} 제주
 */

/** @type {RegionList} */
const regionList = regionListData;


// ! 사이드바
// # 사이드바 목록
const asideList = {
    title: '대기정보 예보 / 경보',
    links: [
        {
            text: '오늘/내일/모레 대기정보',
            select: true,
        },
        {
            text: '초미세먼지 주간예보',
            select: false
        },
        {
            text: '대기오염경보 발령 내역',
            select: false,
            children: [
                { text: '오존', select: false, type: 'ozone'},
                { text: '미세먼지', select: false, type: 'findDust'}
            ]
        },
        {
            text: '황사 발생현황',
            select: false,
            children: [
                { text: '연도별 발생현황', select: false, type: '' },
                { text: '황사특보(경보) 발령현황', select: false, type: '' },
                { text: '황사 발생 대비 국민행동요령', select: false, type: '' }
            ]
        },
        {
            text: '국민 행동요령',
            select: false,
            children: [
                { text: '오존 행동요령', select: false, type: ''},
                { text: '미세먼지 행동요령', select: false, type: ''},
                { text: '통합대기환경지수 행동요령', select: false, type: ''},
            ]
        },
    ]
};

// # 사이드바 토글이 있는 요소 찾기
function findElementsWithChildren(array) {
    const result = [];
    array.forEach(element => {
        if (element.children && element.children.length > 0) {
            result.push(element);
            result.push(...findElementsWithChildren(element.children));
        }
    });
    return result;
}
const elementsWithChildren = findElementsWithChildren(asideList.links);


// @@@ 출력 컴포넌트 @@@
export default function Page({ selectedData, topbarList }) {
    console.log('topbarList: ', topbarList);
    // ! 기타
    // #& pathname
    const { pathname } = useLocation();
    // # search 파라미터
    const [searchType, setSearchType] = useState('detail-pm25');


    // ! 네비게이션
    // @& 서브 네비게이션 바 컴포넌트
    const TopBarListComponent = () => {
        return topbarList.map((item, index) => (
            <LayoutList key={index}>
                <LayoutAElement
                    to="./"
                    title={item.title}
                    onClick={(e) => toggleHandle(e, item.toggleIndex)}
                    data-index={item.toggleIndex}
                    data-direction={toggles[item.toggleIndex].px === toggles[item.toggleIndex].initial ? 'up' : 'down'}
                >
                    {item.title}
                </LayoutAElement>
                <LayoutListDetail $height={toggles[item.toggleIndex].px}>
                    {item.links.map((link, linkIndex) => <li key={linkIndex}><Link to={`/${link.tag}?page=${link.page}`}>{link.title}</Link></li>)}
                </LayoutListDetail>
            </LayoutList>
        ))
    }
    // #& 네비게이션 토글 상태
    const togglesNavObject = {
        1: { px: 0, initial: topbarList[0].links.length * 50},
        2: { px: 0, initial: topbarList[1].links.length * 50},
    };
    if(topbarList.length > 2) togglesNavObject['3'] = { px: 0, initial: topbarList[2].links.length * 50};
    const [toggles, setToggles] = useState(togglesNavObject);
    // #& 네비게이션 토글 함수
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


    // # 사이드바 토글
    // TODO: 현재 페이지가 토글의 1번째일 경우 px을 0이 아닌, 확장한 값으로 나타나도록 변경
    const togglesAsideObject = selectedData.children.reduce((acc, item) => {
        if (item.toggle && item.toggle.length > 0) {
            acc[item.title] = { px: 0, initial: item.toggle.length * 50};
        }
        return acc;
    }, {});
    const [asideToggle, setAsideToggle] = useState(togglesAsideObject);

    // #& 사이드바 토글 함수
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
    // @& 사이드바 컴포넌트
    const AsideComponent = () => {
        const children = asideList.links.map((link, index) => {
            const variableCheck = typeof asideToggle !== 'undefined';
            const childrenCheck = 'children' in link;
            if(variableCheck) {
                const hasOwnProperty = asideToggle.hasOwnProperty(link.text);

                if(hasOwnProperty){
                    return (
                        <li key={index}>
                            <LayoutAsideLink
                                to=""
                                onClick={asideHandle}
                                children_height={asideToggle[link.text]?.px}
                                selected={link.select}
                                showmore={childrenCheck ? 'true' : 'false'}
                                >{link.text}</LayoutAsideLink>
                            {childrenCheck &&
                            <LayoutAsideLinkUl $height={asideToggle[link.text]?.px}>
                                {link.children.map((item, _index) => {
                                    return <li key={_index}>
                                    <LayoutAsideLinkA selected={item.type === searchType} to={`${pathname}?page=${index + 1}&type=${item.type}`}>{item.text}</LayoutAsideLinkA>
                                    </li>}
                                )}
                            </LayoutAsideLinkUl>}
                        </li>
                    );
                }
            } return <li key={index}><LayoutAsideLink to={`${pathname}?page=${index + 1}`} selected={link.select}>{link.text}</LayoutAsideLink></li>;
    });
    return <ul>{children}</ul>
    };


    // ! 측정자료
    // # 금일
    const currentDate = new Date();
    // const currentDate = new Date('2024-07-23');
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // #& 지역 목록
    const regionList_kor = Object.keys(regionList);


    // ! 결과
    return (
        <>
            <LayoutDivStyle>
                <LayoutTopBar>
                    <li><LayoutHome to="/" title="홈"></LayoutHome></li>
                    {/* 컴포넌트 */} <TopBarListComponent />
                </LayoutTopBar>
            </LayoutDivStyle>
            <LayoutSection>
                <LayoutAside>
                    <h2>{asideList.title}</h2>
                    {/* 컴포넌트: ul */} <AsideComponent />
                </LayoutAside>
                <LayoutContent>
                    <LayoutContentTitle></LayoutContentTitle>
                    <ContentResultWrap>
                        <ContentResultTableWrap>
                            <ContentTableWrap style={{width: '1070px'}}>
                                <ContentTable style={{ marginBottom: '15px'}}>
                                    <thead>
                                        <tr style={{backgroundColor: '#fff'}}>
                                            <th>측정소명</th>
                                            <th>1시</th>
                                            <th>2시</th>
                                            <th>3시</th>
                                            <th>4시</th>
                                            <th>5시</th>
                                            <th>6시</th>
                                            <th>7시</th>
                                            <th>8시</th>
                                            <th>9시</th>
                                            <th>10시</th>
                                            <th>11시</th>
                                            <th>12시</th>
                                            <th>13시</th>
                                            <th>14시</th>
                                            <th>15시</th>
                                            <th>16시</th>
                                            <th>17시</th>
                                            <th>18시</th>
                                            <th>19시</th>
                                            <th>20시</th>
                                            <th>21시</th>
                                            <th>22시</th>
                                            <th>23시</th>
                                            <th>24시</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </ContentTable>
                            </ContentTableWrap>
                            <ul><li style={{listStyle: 'inside'}}>장비점검, 통신장애 등 이상데이터가 발생한 경우 "-"로 표기됩니다.</li></ul>
                        </ContentResultTableWrap>
                    </ContentResultWrap>
                </LayoutContent>
            </LayoutSection>
        </>
    )
};
