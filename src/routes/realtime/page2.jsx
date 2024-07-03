// ! System
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

// ! JSON
import regionListJSON from '../../app/data/regionList.json';

// ! Functions
import getColorValue from '../../app/functions/getColorValue.ts';

// ! Styles
import { LayoutAElement, LayoutAside, LayoutAsideLink, LayoutAsideLinkA, LayoutAsideLinkUl, LayoutContent, ContentResultSearchBox, ContentResultTableWrap, ContentResultWrap, ContentTableWrap, LayoutContentTitle, LayoutDivStyle, LayoutHome, LayoutList, LayoutListDetail, LoadingWrap, LayoutSection, LayoutTopBar, ContentTable, ContentResultSearchBtnWrap, ContentResultSearchBtn, RealtimePage2ContentResultSearchBtnWrap, RealtimePage2ContentResultSearchBtn, RealtimePage2ContentResultSearchBox } from '../../app/StyleComponent.jsx';

registerLocale('ko', ko);

export default function Page() {
    // ! 기타
    // # pathname
    const { pathname } = useLocation();

    // # search 파라미터
    const [searchParams] = useSearchParams();
    const [searchType, setSearchType] = useState('pm25');
    const [searchTypeText, setSearchTypeText] = useState('PM-2.5');
    useEffect(() => {
        switch(searchParams.get('type')) {
            case 'pm25':
                setSearchTypeText('PM-2.5');
                setSearchType('pm25')
                break;
            case 'pm10':
                setSearchTypeText('PM-10');
                setSearchType('pm10')
                break;
            case 'o3':
                setSearchTypeText('오존');
                setSearchType('o3')
                break;
            case 'no2':
                setSearchTypeText('이산화질소');
                setSearchType('no2')
                break;
            case 'co':
                setSearchTypeText('일산화탄소');
                setSearchType('co')
                break;
            case 'so2':
                setSearchTypeText('아황산가스');
                setSearchType('so2')
                break;
            default: break;
        }
    }, [searchParams]);
    // # 자료구분
    const [dataDivision, setDataDivision] = useState('time');
    // # 화면 중앙
    const [loadingStyle, setLoadingStyle] = useState({ top: '50%', left: '50%' });


    // ! 서브 네비게이션
    // # 서브 네비게이션 바 목록
    const topbarList = [
        {
            title: '실시간 자료조회',
            toggleIndex: 1,
            links: [
                { text: "에어코리아란", to: '/info?page=1' },
                { text: "대기정보 예보 / 경보", to: '/standby?page=1' },
                { text: "통계정보", to: '/?page=1' },
                { text: "배움터", to: '/?page=1' },
            ]
        },
        {
            title: '실시간 대기 정보',
            toggleIndex: 2,
            links: [
                { text: "시도별 대기정보", to: '/realtime?page=2&type=pm25' },
                { text: "미세먼지 세부 측정정보", to: '/realtime?page=3' }
            ]
        },
        {
            title: `시도별 대기정보(${searchTypeText.replace('-', '')})`,
            toggleIndex: 3,
            links: [
                { text: '시도별 대기정보(PM-10)', to: '/realtime?page=2&type=pm10'},
                { text: '시도별 대기정보(오존)', to: '/realtime?page=2&type=o3'},
                { text: '시도별 대기정보(이산화질소)', to: '/realtime?page=2&type=no2'},
                { text: '시도별 대기정보(일산화탄소)', to: '/realtime?page=2&type=co'},
                { text: '시도별 대기정보(아황산가스)', to: '/realtime?page=2&type=so2'}
            ]
        }
    ];
    // @ 서브 네비게이션 바 컴포넌트
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
                    {item.links.map((link, linkIndex) => <li key={linkIndex}><Link to={link.to}>{link.text}</Link></li>)}
                </LayoutListDetail>
            </LayoutList>
        ))
    }
    // # 네비게이션 토글 상태
    const [toggles, setToggles] = useState({
        1: { px: 0, initial: topbarList[0].links.length * 50},
        2: { px: 0, initial: topbarList[1].links.length * 50},
        3: { px: 0, initial: topbarList[2].links.length * 50},
    });
    // # 네비게이션 토글 함수
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


    // ! 사이드바 
    // # 사이드바 목록
    const asideList = {
            title: '실시간 자료조회',
            links: [
                { text: '실시간 대기 정보', 
                    select: false, 
                },
                { text: '시도별 대기정보',
                    select: true,
                    children: [
                    { text: '시도별 대기정보(PM-2.5)',  select: false, type: 'pm25' },
                    { text: '시도별 대기정보(PM-10)',   select: false, type: 'pm10' },
                    { text: '시도별 대기정보(오존)',     select: false, type: 'o3' },
                    { text: '시도별 대기정보(이산화질소)', select: false, type: 'no2' },
                    { text: '시도별 대기정보(일산화탄소)', select: false, type: 'co' },
                    { text: '시도별 대기정보(아황산가스)', select: false, type: 'so2' }] 
                },
                { text: '미세먼지 세부 측정정보', 
                    select: false,
                    children: [
                    { text: '초미세먼지 (PM-2.5)',      select: false, type: 'detail-pm25' },
                    { text: '미세먼지 (PM-10)',        select: false, type: 'detail-pm10' }]
                },
            ]
    };
    // # 사이드바 토글
    const [asideToggle, setAsideToggle] = useState({
        [asideList.links[1].text]: { px: asideList.links[1].children.length * 50, initial: asideList.links[1].children.length * 50 },
        [asideList.links[2].text]: { px: 0, initial: asideList.links[2].children.length * 50 },
    });
    // # 사이드바 토글 함수
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
    // @ 사이드바 컴포넌트
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
                                {link.children.map((item, _index) => <li key={_index}>
                                    <LayoutAsideLinkA selected={item.type === searchType} to={`${pathname}?page=${index + 1}&type=${item.type}`}>{item.text}</LayoutAsideLinkA>
                                    </li>)}
                            </LayoutAsideLinkUl>}
                        </li>
                    );
                }
            } return <li key={index}><LayoutAsideLink to={`/realtime?page=${index + 1}`} selected={link.select}>{link.text}</LayoutAsideLink></li>;
    });
    return <ul>{children}</ul>
    };


    // ! 자료구분
    // # 선택된 지역
    const [selectRegion, setSelectRegion] = useState('전체');



    // ! 조회 기간 캘린더
    // # 캘린더 설정
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    

    // ! 측정자료
    // # 통계 검색
    const [tableResult, setTableResult] = useState([{}]);
    const [tableDom, setTableDom] = useState([]);
    const tableRowSpan = dataDivision === 'time' ? 1 : 2;
    // @ 통계 테이블 컴포넌트
    const TableDomComponent = () => {
        // 최초 상태
        const dataTimeCheck = tableDom.some(dom => dom.dataTime);
        const dataDailyCheck = tableDom.some(dom => dom.msurDt);

        if(tableDom.length === 0 || (!dataTimeCheck && dataDivision === 'time') || (!dataDailyCheck && dataDivision === 'daily')) {
            const colSpan = dataDivision === 'total' ? 16 : 12
            return <tr><td colSpan={colSpan}>검색된 자료가 없습니다.</td></tr>;
        }

        return tableDom.map((tr, idx) => {
            const colSpanVariable = dataDivision === 'time' ? 1 : 2;
            const { gradeText: khaiGradeTxt } = getColorValue(tr?.khaiGrade);
            const { gradeText: pm10GradeTxt } = getColorValue(tr.pm10Grade);
            const { gradeText: pm25GradeTxt } = getColorValue(tr.pm25Grade);
            const { gradeText: o3GradeTxt } = getColorValue(tr.o3Grade);
            const { gradeText: no2GradeTxt } = getColorValue(tr.no2Grade);
            const { gradeText: coGradeTxt } = getColorValue(tr.coGrade);
            const { gradeText: so2GradeTxt } = getColorValue(tr.so2Grade);

            let returnDom;
            return returnDom;
        });
    }
    // ### 데이터 데이터 구분 필터링 함수
    const filterResult = (data, startDateFormatting, endDateFormatting) => {
        return data.filter(item => {
            const { dataTime, stationName, msurDt, msrstnName } = item;
            const type = typeof dataTime !== 'undefined' ? dataTime : msurDt;
            const itemDate = new Date(type);
            const stationExists = typeof stationName !== 'undefined' ? stationName : msrstnName;
            return (itemDate >= startDateFormatting && itemDate <= endDateFormatting) && (stationExists === selectRegion);
        });
    }
    // # 데이터 검색 버튼 핸들러
    const handleCenterButton = async (e) => {
        e.preventDefault();

        const { innerWidth, innerHeight } = window;
        const value = 100;
    
        const left = (innerWidth - value) / 2 + window.scrollX;
        const top = (innerHeight - value) / 2 + window.scrollY;
    
        setLoadingStyle({ top: `${top}px`, left: `${left}px`, display: 'block' });

        // # 데이터를 갖고 있는 상태에서 다시 요청하는지 체크
        // const checkResult = filterResult(tableResult, startDateFormatting, endDateFormatting);

        // if((dataDivision === 'time' && checkResult.length === 0) 
        //     || (dataDivision === 'daily' && !checkResult.some(item => item.msurDt))
        //     || (dataDivision === 'total' && !checkResult.some(item => item.khaiValue))) {
        //     const response = await fetch(`http://localhost:3500/api/airkorea/neighborhood?inqBginDt=${bginYear}${bginMonth}${bginDay}&inqEndDt=${bginYear}${bginMonth}${bginDay}&stationName=${selectRegion}&type=${dataDivision}`);
        //     const arrayResult = await response.json();

        //     const filterDate = filterResult(arrayResult, startDateFormatting, endDateFormatting)
        //     // # 측정소 3개월치의 데이터
        //     setTableResult(arrayResult);
        //     // # 날짜 필터를 진행 한 결과 데이터
        //     setTableDom(filterDate);
        // } else setTableDom(checkResult);
        setLoadingStyle({ top: `${top}px`, left: `${left}px`, display: 'none' });
    }
    return (
        <>
            <LoadingWrap style={loadingStyle}>
                <img src="/images/realtime/loading.webp" alt="로딩중 Loading" />
            </LoadingWrap>
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
                    <LayoutContentTitle>시도별 대기정보&#40;{searchTypeText}&#41;</LayoutContentTitle>
                    <ContentResultWrap>
                        <RealtimePage2ContentResultSearchBox>
                            <div>
                                <strong>자료 구분</strong>
                                <div>
                                    <div>
                                        <input
                                            type="radio"
                                            name="dataDivision"
                                            value="daily"
                                            id="searchBox_daily"
                                            defaultChecked={true}
                                            onChange={(e) => setDataDivision(e.currentTarget.value)}
                                        />
                                        <label htmlFor="searchBox_daily">당일</label>
                                        <select value={selectRegion} onChange={(e) => setSelectRegion(e.currentTarget.value)}>
                                            <option value="전체">전체</option>
                                            {Object.keys(regionListJSON).map((reg, idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <option value={reg}>{reg}</option>
                                                    </Fragment>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name="dataDivision"
                                            value="oneWeek"
                                            id="searchBox_week"
                                            onChange={(e) => setDataDivision(e.currentTarget.value)}
                                        />
                                        <label htmlFor="searchBox_week">7일간</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name="dataDivision"
                                            value="month"
                                            id="searchBox_month"
                                            onChange={(e) => setDataDivision(e.currentTarget.value)}
                                        />
                                        <label htmlFor="searchBox_month">1달</label>
                                        <span>{currentMonth}월 01일 </span>~<span> {currentMonth}월 {currentDay}일 </span><span>&#40;실시간&#41;</span>
                                    </div>
                                </div>
                            </div>
                            <RealtimePage2ContentResultSearchBtn>
                                <button onClick={handleCenterButton}>검색</button>
                            </RealtimePage2ContentResultSearchBtn>
                        </RealtimePage2ContentResultSearchBox>
                        <ContentResultTableWrap>
                            <h2>시간자료&#40;수치&#41;</h2>
                            <ContentTableWrap>
                                <ContentTable>
                                    <caption>시도명 클릭시 상세 자료를 보실 수 있습니다.</caption>
                                    <thead>
                                    </thead>
                                    <tbody>
                                        <TableDomComponent />
                                    </tbody>
                                </ContentTable>
                            </ContentTableWrap>
                        </ContentResultTableWrap>
                    </ContentResultWrap>
                </LayoutContent>
            </LayoutSection>
        </>
    )
};