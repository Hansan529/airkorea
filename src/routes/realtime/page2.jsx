// ! System
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

// ! JSON
import regionListJSON from '../../app/data/regionList.json';

// ! Styles
import { LayoutAElement, LayoutAside, LayoutAsideLink, LayoutAsideLinkA, LayoutAsideLinkUl, LayoutContent, ContentResultTableWrap, ContentResultWrap, ContentTableWrap, LayoutContentTitle, LayoutDivStyle, LayoutHome, LayoutList, LayoutListDetail, LoadingWrap, LayoutSection, LayoutTopBar, ContentTable, ContentResultSearchBtnWrap, ContentResultSearchBtn, RealtimePage2ContentResultSearchBtnWrap, RealtimePage2ContentResultSearchBtn, RealtimePage2ContentResultSearchBox } from '../../app/StyleComponent.jsx';

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
    const [tableDom, setTableDom] = useState({hour: [], daily: []});
    
    // @ 통계 테이블 컴포넌트
    const TableDomComponent = () => {
        // 최초 상태
        // const dataTimeCheck = tableDom.some(dom => dom.dataTime);
        // const dataDailyCheck = tableDom.some(dom => dom.msurDt);

        const startTime = new Date(`${currentDate.getFullYear()}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}T00:00:00`);
        const endTime = new Date(`${currentDate.getFullYear()}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}T${String(currentDate.getHours()).padStart(2, '0')}:00:00`);

        const initialState = '-';
        const maxValues = {
            seoul: initialState,
            busan: initialState,
            daegu: initialState,
            incheon: initialState,
            gwangju: initialState,
            daejeon: initialState,
            ulsan: initialState,
            gyeonggi: initialState,
            gangwon: initialState,
            chungbuk: initialState,
            chungnam: initialState,
            jeonbuk: initialState,
            jeonnam: initialState,
            sejong: initialState,
            gyeongbuk: initialState,
            gyeongnam: initialState,
            jeju: initialState
        };
        const minValues = {
            seoul: initialState,
            busan: initialState,
            daegu: initialState,
            incheon: initialState,
            gwangju: initialState,
            daejeon: initialState,
            ulsan: initialState,
            gyeonggi: initialState,
            gangwon: initialState,
            chungbuk: initialState,
            chungnam: initialState,
            jeonbuk: initialState,
            jeonnam: initialState,
            sejong: initialState,
            gyeongbuk: initialState,
            gyeongnam: initialState,
            jeju: initialState
        };

        if(tableDom.hasOwnProperty('hour')){
            console.log('tableDom: ', tableDom);
            const filteredData = tableDom.hour.filter(item => {
                const itemTime = new Date(item.dataTime.replace(' ', 'T'));
                return itemTime >= startTime && itemTime <= endTime;
            });
            const getMaxValue = (region) => {
                if(filteredData.length === 0) return initialState;

                let maxValue = Number(filteredData[0][region]);
                filteredData.forEach(item => {
                    const value = Number(item[region]);
                    if (!isNaN(value) && value > maxValue) {
                        maxValue = value;
                    }
                });
                return isNaN(maxValue) ? initialState : maxValue;
            };
            const getMinValue = (region) => {
                if(filteredData.length === 0) return initialState;

                let minValue = Number(filteredData[0][region]);
                filteredData.forEach(item => {
                    const value = Number(item[region]);
                    if (!isNaN(value) && value < minValue) {
                        minValue = value;
                    }
                });
                return isNaN(minValue) ? initialState : minValue;
            };
            
            const regions = ['seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'sejong', 'gyeongbuk', 'gyeongnam', 'jeju'];

            regions.forEach(region => {
                maxValues[region] = getMaxValue(region);
                minValues[region] = getMinValue(region);
            });
        } else <tr><td colSpan="18">검색된 자료가 없습니다.</td></tr>
        return (
            <>
                <tr>
                    <td>시간평균</td>
                    <td>{!isNaN(Math.round((maxValues.seoul + minValues.seoul) / 2)) ? Math.round((maxValues.seoul + minValues.seoul) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.busan + minValues.busan) / 2)) ? Math.round((maxValues.busan + minValues.busan) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.daegu + minValues.daegu) / 2)) ? Math.round((maxValues.daegu + minValues.daegu) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.incheon + minValues.incheon) / 2)) ? Math.round((maxValues.incheon + minValues.incheon) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.gwangju + minValues.gwangju) / 2)) ? Math.round((maxValues.gwangju + minValues.gwangju) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.daejeon + minValues.daejeon) / 2)) ? Math.round((maxValues.daejeon + minValues.daejeon) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.ulsan + minValues.ulsan) / 2)) ? Math.round((maxValues.ulsan + minValues.ulsan) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.gyeonggi + minValues.gyeonggi) / 2)) ? Math.round((maxValues.gyeonggi + minValues.gyeonggi) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.gangwon + minValues.gangwon) / 2)) ? Math.round((maxValues.gangwon + minValues.gangwon) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.chungbuk + minValues.chungbuk) / 2)) ? Math.round((maxValues.chungbuk + minValues.chungbuk) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.chungnam + minValues.chungnam) / 2)) ? Math.round((maxValues.chungnam + minValues.chungnam) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.jeonbuk + minValues.jeonbuk) / 2)) ? Math.round((maxValues.jeonbuk + minValues.jeonbuk) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.jeonnam + minValues.jeonnam) / 2)) ? Math.round((maxValues.jeonnam + minValues.jeonnam) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.sejong + minValues.sejong) / 2)) ? Math.round((maxValues.sejong + minValues.sejong) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.gyeongbuk + minValues.gyeongbuk) / 2)) ? Math.round((maxValues.gyeongbuk + minValues.gyeongbuk) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.gyeongnam + minValues.gyeongnam) / 2)) ? Math.round((maxValues.gyeongnam + minValues.gyeongnam) / 2) : '-'}</td>
                    <td>{!isNaN(Math.round((maxValues.jeju + minValues.jeju) / 2)) ? Math.round((maxValues.jeju + minValues.jeju) / 2) : '-'}</td>
                </tr>
                <tr>
                    <td>최고값</td>
                    <td>{maxValues.seoul}</td>
                    <td>{maxValues.busan}</td>
                    <td>{maxValues.daegu}</td>
                    <td>{maxValues.incheon}</td>
                    <td>{maxValues.gwangju}</td>
                    <td>{maxValues.daejeon}</td>
                    <td>{maxValues.ulsan}</td>
                    <td>{maxValues.gyeonggi}</td>
                    <td>{maxValues.gangwon}</td>
                    <td>{maxValues.chungbuk}</td>
                    <td>{maxValues.chungnam}</td>
                    <td>{maxValues.jeonbuk}</td>
                    <td>{maxValues.jeonnam}</td>
                    <td>{maxValues.sejong}</td>
                    <td>{maxValues.gyeongbuk}</td>
                    <td>{maxValues.gyeongnam}</td>
                    <td>{maxValues.jeju}</td>
                </tr>
                <tr>
                    <td>최저값</td>
                    <td>{minValues.seoul}</td>
                    <td>{minValues.busan}</td>
                    <td>{minValues.daegu}</td>
                    <td>{minValues.incheon}</td>
                    <td>{minValues.gwangju}</td>
                    <td>{minValues.daejeon}</td>
                    <td>{minValues.ulsan}</td>
                    <td>{minValues.gyeonggi}</td>
                    <td>{minValues.gangwon}</td>
                    <td>{minValues.chungbuk}</td>
                    <td>{minValues.chungnam}</td>
                    <td>{minValues.jeonbuk}</td>
                    <td>{minValues.jeonnam}</td>
                    <td>{minValues.sejong}</td>
                    <td>{minValues.gyeongbuk}</td>
                    <td>{minValues.gyeongnam}</td>
                    <td>{minValues.jeju}</td>
                </tr>
            </>
        );
    };
    // # 데이터 검색 버튼 핸들러
    const handleCenterButton = async (e) => {
        e.preventDefault();

        const { innerWidth, innerHeight } = window;
        const value = 100;
    
        const left = (innerWidth - value) / 2 + window.scrollX;
        const top = (innerHeight - value) / 2 + window.scrollY;
    
        setLoadingStyle({ top: `${top}px`, left: `${left}px`, display: 'block' });

        // # 데이터를 갖고 있는 상태에서 다시 요청하는지 체크
        try {
            // FIXME: 완료 후 API 서버 복구
            // const response = await fetch(`https://apis.hansan-web.link/airkorea/realtime-data?itemCode=PM25&dataGubun=DAILY&searchCondition=MONTH`);
            const response = await fetch(`http://localhost:3500/api/airkorea/realtime-data?itemCode=PM25&dataGubun=DAILY&searchCondition=MONTH`);
            if (!response.ok)
                throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setTableResult(data);
            setTableDom({hour: data.hour, daily: data.daily});
        } catch {}

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
                                        <span>{currentMonth - 1}월 {currentDay - 1}일 </span>~<span> {currentMonth}월 {currentDay}일 </span><span>&#40;실시간&#41;</span>
                                    </div>
                                </div>
                            </div>
                            <RealtimePage2ContentResultSearchBtn>
                                <button onClick={handleCenterButton}>검색</button>
                            </RealtimePage2ContentResultSearchBtn>
                        </RealtimePage2ContentResultSearchBox>
                        <p>※측정시간 : {tableDom?.hour[0]?.dataTime !== undefined ? tableDom.hour[0].dataTime : '0000-00-00 00'}시 기준.</p>
                        <ContentResultTableWrap>
                            <h2>시간자료&#40;수치&#41;</h2>
                            <p>시도명 클릭시 상세 자료를 보실 수 있습니다.</p>
                            <ContentTableWrap>
                                <ContentTable>
                                    <caption>단위&#40;㎍/㎥&#41;</caption>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>서울</th>
                                            <th>부산</th>
                                            <th>대구</th>
                                            <th>인천</th>
                                            <th>광주</th>
                                            <th>대전</th>
                                            <th>울산</th>
                                            <th>경기</th>
                                            <th>강원</th>
                                            <th>충북</th>
                                            <th>충남</th>
                                            <th>전북</th>
                                            <th>전남</th>
                                            <th>세종</th>
                                            <th>경북</th>
                                            <th>경남</th>
                                            <th>제주</th>
                                        </tr>
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