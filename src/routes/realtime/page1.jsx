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

// ~ Package
import { Link, useLocation } from "react-router-dom";
import { Fragment, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

// ~ JSON
import stationInfoJSON from '../../app/data/stationInfo.json';

// ~ Hooks
import useStore from '../../app/hooks/useStore.jsx';
import getColorValue from '../../app/functions/getColorValue.ts';

// ~ Style
import { LayoutAElement, LayoutAside, LayoutAsideLink, LayoutAsideLinkA, LayoutAsideLinkUl, LayoutContent, ContentResultSearchBox, ContentResultTableSpan, ContentResultTableWrap, ContentResultTap, ContentResultWrap, ContentSearchInput, ContentSearchWrap, RealtimePage1ContentTable, ContentTableWrap, LayoutContentTitle, ContentResultSearchBtn, ContentResultSearchBtnWrap, LayoutDivStyle, LayoutHome, LayoutList, LayoutListDetail, LoadingWrap, LayoutSection, LayoutTopBar } from '../../app/StyleComponent.jsx';

// ~ Package Settings
registerLocale('ko', ko);

// @@@ 출력 컴포넌트 @@@
export default function Page() {
    // ! 기타
    // # pathname
    const { pathname } = useLocation();

    // # 조회 종류
    const [viewSelectIndex, setViewSelectIndex] = useState(0);
    const [dataDivision, setDataDivision] = useState('time');
    // # 화면 중앙
    const [loadingStyle, setLoadingStyle] = useState({ top: '50%', left: '50%' });
    // # 측정소 정보
    const { nearStation } = useStore(store => store);
    const stationInfo = stationInfoJSON.items;
    // # 측정소 선택
    const [selectStation, setSelectStation] = useState(nearStation[0].stationName || '온의동');


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
                { text: "고객지원", to: '/?page=1 '}
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
                    select: true,
                },
                { text: '시도별 대기정보',
                    select: false,
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
                    { text: '초미세먼지 (PM-2.5)',      select: false, type: 'pm25' },
                    { text: '미세먼지 (PM-10)',        select: false, type: 'pm10' }]
                },
            ]
    };
    // # 사이드바 토글
    const [asideToggle, setAsideToggle] = useState({
        [asideList.links[1].text]: { px: 0, initial: asideList.links[1].children.length * 50 },
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
                                {link.children.map((item, _index) => <li key={_index}><LayoutAsideLinkA selected={item.select} to={`${pathname}?page=2&type=${item.type}`}>{item.text}</LayoutAsideLinkA></li>)}
                            </LayoutAsideLinkUl>}
                        </li>
                    );
                }
            } return <li key={index}><LayoutAsideLink to={`/realtime?page=${index + 1}`} selected={link.select}>{link.text}</LayoutAsideLink></li>;
    });
    return <ul>{children}</ul>
    };


    // ! 지역명 검색 input
    // # 인풋 텍스트문
    const [searchValue, setSearchValue] = useState('');
    // # 인풋 텍스트문 선택 함수
    const stationInputHandle = (e) => {
        const {value} = e.currentTarget;
        const [,addr] = value.match(/(.*)\|/);
        const [,stationName] = value.match(/\|(.*)/);
        setSearchValue(addr);
        setSelectStation(stationName);
    };


    // ! 조회 기간 캘린더
    // # 캘린더 설정
    const currentDate = new Date();
    const yesterday =  new Date();
    const pastDate = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    pastDate.setDate(currentDate.getDate() - 60);
    const [selectedBginDate, setSelectedBginDate] = useState(yesterday);
    const [selectedEndDate, setSelectedEndDate] = useState(yesterday);
    const [bginHour, setBginHour] = useState('01');
    const [endHour, setEndHour] = useState('03');
    // @ 캘린더 컴포넌트
    const RenderDatePicker = ({selectedDate, setSelectedDate, showTimeSelect, division, setHour}) => {
        return (<>
                <DatePicker
                    dateFormat='yyyy-MM-dd'
                    shouldCloseOnSelect
                    minDate={pastDate}
                    maxDate={yesterday}
                    selected={selectedDate}
                    locale={ko}
                    onChange={(date) => setSelectedDate(date)}
                />
                {showTimeSelect && <DatePickerTimeSelect division={division} onChange={(e) => setHour(e.currentTarget.value)} />}
            </>)
    }
    // @ 캘린더 시간 선택 컴포넌트
    const DatePickerTimeSelect = (props) => {
        const values = [...Array(24)].map((_,idx) => idx + 1);
            return <select value={props.division} onChange={props.onChange}>
                    {values.map(item => {
                        const numbering = String(item).padStart(2, '0');
                        return <option key={item} value={numbering}>{numbering}</option>
                    })}
                </select>
    }


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
            if(dataTimeCheck && dataDivision === 'time') { returnDom =
                <tr key={idx}>
                    <td>{`${tr.dataTime.substring(5, 13).replace(/\s/g, ':')}`}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.pm10Grade}.webp`} alt={pm10GradeTxt} /></td>
                    <td>{tr.pm10Value}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.pm25Grade}.webp`} alt={pm25GradeTxt} /></td>
                    <td>{tr.pm25Value}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.o3Grade}.webp`} alt={o3GradeTxt} /></td>
                    <td>{tr.o3Value}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.no2Grade}.webp`} alt={no2GradeTxt} /></td>
                    <td>{tr.no2Value}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.coGrade}.webp`} alt={coGradeTxt} /></td>
                    <td>{tr.coValue}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.so2Grade}.webp`} alt={so2GradeTxt} /></td>
                    <td>{tr.so2Value}</td>
                </tr>}

            if(dataDailyCheck && dataDivision === 'daily') { returnDom =
                <tr key={idx}>
                    <td>{tr.msurDt.substring(5)}</td>
                    <td colSpan={colSpanVariable}>{tr.pm10Value}</td>
                    <td colSpan={colSpanVariable}>{tr.pm25Value}</td>
                    <td colSpan={colSpanVariable}>{tr.o3Value}</td>
                    <td colSpan={colSpanVariable}>{tr.no2Value}</td>
                    <td colSpan={colSpanVariable}>{tr.coValue}</td>
                    <td colSpan={colSpanVariable}>{tr.so2Value}</td>
                </tr>}

            if(dataTimeCheck && dataDivision === 'total') { returnDom =
                <tr key={idx}>
                    <td>{`${tr.dataTime.substring(5, 13).replace(/\s/g, ':')}`}</td>
                    <td></td>
                    <td><img src={`/images/realtime/img_bum0${tr.khaiGrade}.webp`} alt={khaiGradeTxt} /></td>
                    <td>{tr.khaiValue}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.pm10Grade}.webp`} alt={pm10GradeTxt} /></td>
                    <td>{tr.pm10Value24}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.pm25Grade}.webp`} alt={pm25GradeTxt} /></td>
                    <td>{tr.pm25Value24}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.o3Grade}.webp`} alt={o3GradeTxt} /></td>
                    <td>{tr.o3Value}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.no2Grade}.webp`} alt={no2GradeTxt} /></td>
                    <td>{tr.no2Value}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.coGrade}.webp`} alt={coGradeTxt} /></td>
                    <td>{tr.coValue}</td>
                    <td><img src={`/images/realtime/img_bum0${tr.so2Grade}.webp`} alt={so2GradeTxt} /></td>
                    <td>{tr.so2Value}</td>
                </tr>

            }

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
            return (itemDate >= startDateFormatting && itemDate <= endDateFormatting) && (stationExists === selectStation);
        });
    }
    // # 데이터 검색 버튼 핸들러
    const handleCenterButton = async (e) => {
        e.preventDefault();

        // # 일평균 데이터 생성 주기 '매일 1시 전후' 전 날 데이터 조회
        const bginYear = selectedBginDate.getFullYear();
        const bginMonth = String(selectedBginDate.getMonth() + 1).padStart(2, '0');
        const bginDay = (dataDivision === 'daily' && selectedBginDate.getHours() === 0)
            ? String(selectedBginDate.getDate() - 1).padStart(2, '0')
            : String(selectedBginDate.getDate()).padStart(2, '0');

        const endYear = selectedEndDate.getFullYear();
        const endMonth = String(selectedEndDate.getMonth() + 1).padStart(2, '0');
        const endDay = (dataDivision === 'daily' && selectedBginDate.getHours() === 0)
            ? String(selectedEndDate.getDate() - 1).padStart(2, '0')
            : String(selectedEndDate.getDate()).padStart(2, '0');

        const { innerWidth, innerHeight } = window;
        const value = 100;

        const left = (innerWidth - value) / 2 + window.scrollX;
        const top = (innerHeight - value) / 2 + window.scrollY;

        setLoadingStyle({ top: `${top}px`, left: `${left}px`, display: 'block' });

        const startDateString = dataDivision === 'time'
                ? `${bginYear}-${bginMonth}-${bginDay}T${bginHour}:00`
                : `${bginYear}-${bginMonth}-${bginDay}`;
        const endDateString = dataDivision === 'time'
                ? `${endYear}-${endMonth}-${endDay}T${endHour}:00`
                : `${endYear}-${endMonth}-${endDay}`;

        const startDateFormatting = new Date(startDateString);
        const endDateFormatting = new Date(endDateString);

        // # 데이터를 갖고 있는 상태에서 다시 요청하는지 체크
        const checkResult = filterResult(tableResult, startDateFormatting, endDateFormatting);

        if((dataDivision === 'time' && checkResult.length === 0)
            || (dataDivision === 'daily' && !checkResult.some(item => item.msurDt))
            || (dataDivision === 'total' && !checkResult.some(item => item.khaiValue))) {
            // const response = await fetch(`https://apis.hansan-web.link/airkorea/neighborhood?inqBginDt=${bginYear}${bginMonth}${bginDay}&inqEndDt=${bginYear}${bginMonth}${bginDay}&stationName=${selectStation}&type=${dataDivision}`);
            const response = await fetch(`https://localhost:3500/api/airkorea/neighborhood?inqBginDt=${bginYear}${bginMonth}${bginDay}&inqEndDt=${bginYear}${bginMonth}${bginDay}&stationName=${selectStation}&type=${dataDivision}`);
            const arrayResult = await response.json();

            const filterDate = filterResult(arrayResult, startDateFormatting, endDateFormatting)
            // # 측정소 3개월치의 데이터
            setTableResult(arrayResult);
            // # 날짜 필터를 진행 한 결과 데이터
            setTableDom(filterDate);
        } else setTableDom(checkResult);
        setLoadingStyle({ top: `${top}px`, left: `${left}px`, display: 'none' });
    }
    // @ 특정 측정소의 측정자료가 선택한 측정소와 일치하는지 체크하는 컴포넌트
    const ContentResultTableStation = () => {
        return nearStation.map((station, idx) => {
            const effectBoolean = selectStation === station.stationName;
            let opacity;
            if(dataDivision === 'time' || dataDivision === 'total') opacity = tableDom.find(table => table.stationName === station.stationName) ? null : 80;
            if(dataDivision === 'daily') opacity = tableDom.find(table => table.msrstnName === station.stationName) ? null : 80;
            return <Fragment key={idx}>
                <ContentResultTableSpan effect={effectBoolean} opacity={opacity}>{station.stationName}</ContentResultTableSpan>
            </Fragment>;
    })};
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
                    <LayoutContentTitle>우리동네 대기 정보</LayoutContentTitle>
                    <ContentSearchWrap>
                        <label htmlFor="search">지역명 검색</label>
                        <ContentSearchInput type="text" id="search" placeholder="도로명 또는 동을 입력하세요. 예) 서소문로" value={searchValue} onChange={(e) => e.currentTarget.value} />
                        <button>검색</button>
                    </ContentSearchWrap>
                    <RealtimePage1ContentTable>
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>측정소명</th>
                                <th>측정소 주소</th>
                                <th>거리</th>
                                <th>측정망</th>
                            </tr>
                        </thead>
                        <tbody>
                        {nearStation.map((station, index) => {
                        const filter = stationInfo.filter(item => item.stationName === station.stationName);
                        const mangName = filter.length > 0 ? filter[0].mangName : null;
                        return (
                            <tr key={index}>
                                <td><input type="radio" name="station"
                                        value={`${station.addr}|${station.stationName}`}
                                        onChange={stationInputHandle}
                                        defaultChecked={index === 0}
                                        />
                                </td>
                                <td>{station.stationName}</td>
                                <td>{station.addr}</td>
                                <td>{station.tm} km</td>
                                <td>{mangName}</td>
                            </tr>
                        )
                        })}
                        </tbody>
                        <caption>※ 거주지역의 대표 대기질은 "도시대기" 측정자료를 참고하시기 바랍니다.</caption>
                    </RealtimePage1ContentTable>
                    <ContentResultWrap>
                        <div>
                            <ContentResultTap selectCheck={viewSelectIndex === 0} onClick={() => {setViewSelectIndex(0); setDataDivision('time');}} style={{marginRight: '10px'}}>측정자료 조회통합대기</ContentResultTap>
                            <ContentResultTap selectCheck={viewSelectIndex === 1} onClick={() => {setViewSelectIndex(1); setDataDivision('total');}}>통합대기 환경지수 조회</ContentResultTap>
                        </div>
                        <ContentResultSearchBox>
                            <div>
                                <strong>데이터 구분</strong>
                                <div>
                                    <input
                                        type="radio"
                                        name="dataDivision"
                                        value="time"
                                        id="searchBox_time"
                                        defaultChecked={true}
                                        onChange={(e) => setDataDivision(e.currentTarget.value)}
                                    /><label htmlFor="searchBox_time">시간</label>
                                    {viewSelectIndex === 0 && <>
                                    <input
                                        type="radio"
                                        name="dataDivision"
                                        value="daily"
                                        id="searchBox_daily"
                                        onChange={(e) => setDataDivision(e.currentTarget.value)}
                                    /><label htmlFor="searchBox_daily">일평균</label>
                                    </>}
                                </div>
                            </div>
                            <div>
                                <strong>조회 기간</strong>
                                <div>
                                    <ContentResultSearchBtnWrap>
                                        <RenderDatePicker selectedDate={selectedBginDate} setSelectedDate={setSelectedBginDate} showTimeSelect={dataDivision !== 'daily'} division={bginHour} setHour={setBginHour} />
                                        ~
                                        <RenderDatePicker selectedDate={selectedEndDate} setSelectedDate={setSelectedEndDate} showTimeSelect={dataDivision !== 'daily'} division={endHour} setHour={setEndHour}/>
                                            <ContentResultSearchBtn>
                                                <button onClick={handleCenterButton}>검색</button>
                                            </ContentResultSearchBtn>
                                    </ContentResultSearchBtnWrap>
                                </div>
                            </div>
                        </ContentResultSearchBox>
                        <ContentResultTableWrap>
                            <h2>측정자료&#40;수치&#41;</h2>
                            {/* 컴포넌트 */} <ContentResultTableStation />
                            <ContentTableWrap>
                                <RealtimePage1ContentTable>
                                    <thead>
                                        {dataDivision !== 'total' ?
                                        // ^ time, daily
                                        <><tr>
                                            <th rowSpan={2}>날짜<br />{(dataDivision === 'time' && tableDom.some(item => typeof item.dataTime !== 'undefined')) ? `(월-일:시)` : `(월-일)`}</th>
                                            <th rowSpan={tableRowSpan} colSpan="2">PM-10(㎍/㎥)</th>
                                            <th rowSpan={tableRowSpan} colSpan="2">PM-2.5(㎍/㎥)</th>
                                            <th rowSpan={tableRowSpan} colSpan="2">오존(ppm)</th>
                                            <th rowSpan={tableRowSpan} colSpan="2">이산화질소(ppm)</th>
                                            <th rowSpan={tableRowSpan} colSpan="2">일산화탄소(ppm)</th>
                                            <th rowSpan={tableRowSpan} colSpan="2">아황산가스(ppm)</th>
                                        </tr>
                                        {dataDivision === 'time' &&
                                        <tr>
                                            <th colSpan={2}>1시간</th>
                                            <th colSpan={2}>1시간</th>
                                            <th colSpan={2}>1시간</th>
                                            <th colSpan={2}>1시간</th>
                                            <th colSpan={2}>1시간</th>
                                            <th colSpan={2}>1시간</th>
                                        </tr>}</>
                                        // ^ total
                                        : <><tr>
                                            <th rowSpan="2">날짜<br />&#40;월-일:시&#41;</th>
                                            <th colSpan="3">통합대기환경지수</th>
                                            <th colSpan="2">PM-10<br />&#40;㎍/㎥&#41;</th>
                                            <th colSpan="2">PM-2.5<br />&#40;㎍/㎥&#41;</th>
                                            <th colSpan="2">오존<br />&#40;ppm&#41;</th>
                                            <th colSpan="2">이산화질소<br />&#40;ppm&#41;</th>
                                            <th colSpan="2">일산화탄소<br />&#40;ppm&#41;</th>
                                            <th colSpan="2">아황산가스<br />&#40;ppm&#41;</th>
                                        </tr>
                                        <tr>
                                            <th>주오염물질</th>
                                            <th>등급</th>
                                            <th>지수</th>
                                            <th colSpan="2">24시간</th>
                                            <th colSpan="2">24시간</th>
                                            <th colSpan="2">1시간</th>
                                            <th colSpan="2">1시간</th>
                                            <th colSpan="2">1시간</th>
                                            <th colSpan="2">1시간</th>
                                        </tr>
                                        </>
                                        }
                                    </thead>
                                    <tbody>
                                        <TableDomComponent />
                                    </tbody>
                                </RealtimePage1ContentTable>
                            </ContentTableWrap>
                        </ContentResultTableWrap>
                    </ContentResultWrap>
                </LayoutContent>
            </LayoutSection>
        </>
    )
};
