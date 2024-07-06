/*
    ! 주제
    @ 컴포넌트
    # 설명
    & 강조
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
import { Fragment, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    registerables,
    PointElement,
    LineElement,
  } from 'chart.js';
  import { Bar, getElementAtEvent } from 'react-chartjs-2';

// ~ JSON
// ~ HOOKS
// ~ Styles
import { LayoutAElement, LayoutAside, LayoutAsideLink, LayoutAsideLinkA, LayoutAsideLinkUl, LayoutContent, ContentResultTableWrap, ContentResultWrap, LayoutContentTitle, LayoutDivStyle, LayoutHome, LayoutList, LayoutListDetail, LoadingWrap, LayoutSection, LayoutTopBar, ContentTable, RealtimePage2ContentResultSearchBtn, RealtimePage2ContentResultSearchBox, RealtimePage2ContentTableWrap } from '../../app/StyleComponent.jsx';

// ~ Component
// ~ Package Settings
ChartJS.register(
    ...registerables,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
)


// @@@ 출력 컴포넌트 @@@
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
    const [dataDivision, setDataDivision] = useState('daily');
    // # 화면 중앙
    const [loadingStyle, setLoadingStyle] = useState({ top: '50%', left: '50%' });
    // # 차트 데이터
    const [chartData, setChartData] = useState(Array.from(17).fill(0));


    // ! 네비게이션
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


    // ! 측정자료
    // # 금일
    // FIXME
    // const currentDate = new Date();
    const currentDate = new Date('2024-07-06');
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    // # 통계 검색
    const [tableResult, setTableResult] = useState([{}]);
    const [tableDom, setTableDom] = useState({hour: [], daily: []});
    // # 지역 목록
    const regionList = {
        seoul: '서울',
        busan: '부산',
        daegu: '대구',
        incheon: '인천',
        gwangju: '광주',
        daejeon: '대전',
        ulsan: '울산',
        gyeonggi: '경기',
        gangwon: '강원',
        chungbuk: '충북',
        chungnam: '충남',
        jeonbuk: '전북',
        jeonnam: '전남',
        sejong: '세종',
        gyeongbuk: '경북',
        gyeongnam: '경남',
        jeju: '제주'
    }
    const regionListKey = Object.keys(regionList);
    const regionListValues = Object.values(regionList);
    const initialState = '-';
    const maxValues = {};
    const values = {};
    const minValues = {};
    regionListKey.forEach(region => {
        maxValues[region] = initialState;
        values[region] = initialState;
        minValues[region] = initialState;
    });
    // @ 통계 테이블 컴포넌트
    const TableDomComponent = () => {
        const startTime = new Date(`${currentDate.getFullYear()}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}T00:00:00`);
        const endTime = new Date(`${currentDate.getFullYear()}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}T${String(currentDate.getHours()).padStart(2, '0')}:00:00`);
        if(tableDom.hasOwnProperty('hour')){
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
            regionListKey.forEach(region => {
                const max = getMaxValue(region);
                const min = getMinValue(region);
                maxValues[region] = max;
                values[region] = Math.round((max + min) / 2);
                minValues[region] = min;
            });
        switch(dataDivision) {
            case 'daily':
                return (
                    <>
                        <tr>
                            <td>시간평균</td>
                            {regionListKey.map((region, key) => 
                                <Fragment key={key}>
                                    <td>{!isNaN(values[region]) ? values[region] : '-'}</td>
                                </Fragment>
                            )}
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
            case 'oneWeek':
                return (
                    <>
                        {tableDom.daily.slice(0, 7).map((day, key) => {
                            return (
                                <tr key={key}>
                                    <td>{day.dataTime}</td>
                                    <td>{day.seoul}</td>
                                    <td>{day.busan}</td>
                                    <td>{day.daegu}</td>
                                    <td>{day.incheon}</td>
                                    <td>{day.gwangju}</td>
                                    <td>{day.daejeon}</td>
                                    <td>{day.ulsan}</td>
                                    <td>{day.gyeonggi}</td>
                                    <td>{day.gangwon}</td>
                                    <td>{day.chungbuk}</td>
                                    <td>{day.chungnam}</td>
                                    <td>{day.jeonbuk}</td>
                                    <td>{day.jeonnam}</td>
                                    <td>{day.sejong}</td>
                                    <td>{day.gyeongbuk}</td>
                                    <td>{day.gyeongnam}</td>
                                    <td>{day.jeju}</td>
                                </tr>
                            )
                        })}
                    </>
                );
            case 'month':
                return (
                    <>
                        {tableDom.daily.map((day, key) => {
                            return (
                                <tr key={key}>
                                    <td>{day.dataTime}</td>
                                    <td>{day.seoul}</td>
                                    <td>{day.busan}</td>
                                    <td>{day.daegu}</td>
                                    <td>{day.incheon}</td>
                                    <td>{day.gwangju}</td>
                                    <td>{day.daejeon}</td>
                                    <td>{day.ulsan}</td>
                                    <td>{day.gyeonggi}</td>
                                    <td>{day.gangwon}</td>
                                    <td>{day.chungbuk}</td>
                                    <td>{day.chungnam}</td>
                                    <td>{day.jeonbuk}</td>
                                    <td>{day.jeonnam}</td>
                                    <td>{day.sejong}</td>
                                    <td>{day.gyeongbuk}</td>
                                    <td>{day.gyeongnam}</td>
                                    <td>{day.jeju}</td>
                                </tr>
                            )
                        })}
                    </>
                );
            default:
                return <tr><td colSpan="18">검색된 자료가 없습니다.</td></tr>
        };
        } else <tr><td colSpan="18">검색된 자료가 없습니다.</td></tr>
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


    // ! 차트
    const chartRef = useRef();
    const chartOnClick = (e) => {
        console.log(getElementAtEvent(chartRef.current, e));
    }
    // # 차트 부가 옵션
    const options = {
        responsive: true, // 반응형
        plugins: {
            legend: { display: false }, // 범례 제거
            title: { // 타이틀
                display: true,
                position: 'left',
                text: '㎍/㎥'
            },
        },
        scales: {
            y: {
                max: 40 // 최대값
            }
        }
    };
    useEffect(() => {
        const data = regionListKey.map(region => values[region]);
        setChartData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tableDom]);
    // # 차트 값
    const labels = regionListValues;
    // # 차트 결과
    const data = {
        labels,
        datasets: [
            {
                data: chartData,
                // 가장 큰 값인 경우 초록색 배경색 설정
                backgroundColor: (ctx) => {
                    const maxValues = Math.max(...data.datasets[0].data);
                    return data.datasets[0].data.map((value) => {
                        if (value === maxValues) {
                            return 'rgb(26, 206, 135)';
                        }
                        return 'rgba(53, 128, 240)';
                    });
                },
            },
        ],
    };


    // ! 결과
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
                            <p style={{textAlign: 'right'}}>단위&#40;㎍/㎥&#41;</p>
                            <RealtimePage2ContentTableWrap>
                                <ContentTable>
                                    <thead>
                                        <tr style={{backgroundColor: '#fff'}}>
                                            <th></th>
                                            {labels.map((reg, idx) => <th key={idx}>{reg}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TableDomComponent />
                                    </tbody>
                                </ContentTable>
                            </RealtimePage2ContentTableWrap>
                            <p>※ PM-2.5측정장비가 적은 일부지역의 경우 PM-2.5평균이 PM-10평균보다 높을수있음.</p>
                        </ContentResultTableWrap>
                    </ContentResultWrap>
                    <h3>17개 지자체별</h3>
                    <p>각 지역의 챠트를 클릭하시면 지역별오염도의 정보를 볼 수 있습니다.</p>
                    <p>해당 시도별 당일 00시부터 현재시간까지 산술평균한 값임.</p>
                    <Bar options={options} data={data} ref={chartRef} onClick={chartOnClick} />
                </LayoutContent>
            </LayoutSection>
        </>
    )
};