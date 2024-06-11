import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

import { AElement, Aside, AsideLink, AsideLinkA, AsideLinkUl, Content, ContentTitle, DivStyle, Home, List, ListDetail, Section, TopBar } from '../layout';
import useStore from '../../hooks/useStore';
import stationInfoJSON from '../../data/stationInfo.json';
import getColorValue from '../../functions/getColorValue.ts';

registerLocale('ko', ko);

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
const ContentTableWrap = styled.div`
    height: 600px;
    overflow: auto;

    table {
        margin: 0;
        border-collapse: separate;
        border: none;
        thead {
            position: sticky;
            top: 0;
            &::before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: #000;
            }
        }
    }
`;
const ContentTable = styled.table`
    width: 100%;
    border-top: 2px solid #000;
    margin: 20px 0;

    caption { 
        text-align: left;
        margin-top: 10px;
        caption-side: bottom;
        ul { list-style: inside; }
    }

    th { 
        font-weight: 600; 
        background: #f7f7f7;
    }

    th, td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #dcdcdc;
        padding: 15px 10px;
        font-size: 14px;
    }
`;

const ContentResultWrap = styled.div`
    margin-top: 40px;
`;
const ContentResultTap = styled.div`
    display: inline-block;
    cursor: pointer;
    width: calc(50% - 5px);
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    background: ${({selectCheck}) => selectCheck ? '#fff' : '#eaeef8'};
    color: ${({selectCheck}) => selectCheck ? '#0f62cc' : '#0a0a0a'};
    font-weight: ${({selectCheck}) => selectCheck ? '500' : '400'};
    border: 1px solid;
    border-color: ${({selectCheck}) => selectCheck ? '#0f62cc' : '#eaeef8'};
    border-radius: 6px;
    text-align: center;

    -webkit-box-shadow: ${({selectCheck}) => selectCheck && '0px 5px 5px -1px #eeeeee;'};
    box-shadow: ${({selectCheck}) => selectCheck && '0px 5px 5px -1px #eeeeee;'};
`;
const ContentResultSearchBox = styled.div`
    margin-top: 20px;
    position: relative;
    padding: 20px 20px 20px 30px;
    background: #f7f7f7;

    > div {
        display: flex;
        height: 40px;
        align-items: center;

        &:first-of-type { margin-bottom: 10px; }
        strong {
            position: relative;
            display: inline-block;
            width: 90px;

            &::after {
                content: "";
                display: block;
                clear: both;
                position: absolute;
                width: 2px;
                height: 100%;
                top: 0;
                right: 0;
                background-color: gray;
            }
        }
        > div {
            padding: 0 0 0 20px;

            label:first-of-type+input {
                margin-left: 10px;
            }
        }
    }
`;

const DisableFeat = styled.div`
    display: flex;
    align-items: center;

    /* > * {
        height: 40px;
        padding: 10px 15px;
    } */

    .react-datepicker-wrapper {
        margin: 0 10px 0 10px;
        &:first-of-type { margin: 0 10px 0 0; }

        .react-datepicker__input-container {
            input {
                width: 100px;
                padding: 5px 10px;
            }
            .react-datepicker-ignore-onclickoutside {}
        }
    }
    select { 
        padding: 5px 10px;
        &:first-of-type { margin-right: 10px; }
    }
`;
const DisableBtn = styled.div`
    position: absolute;
    right: 20px;

    button {
        cursor: pointer;
        padding: 0 25px;
        background: #0f62cc;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        line-height: 34px;
        border-radius: 4px;
    }
`;

const ContentResultTableWrap = styled.div`
    h2 {
        position: relative;
        font-size: 22px;
        color: #0a0a0a;
        font-weight: 500;
        margin: 50px 0 14px 0;
        display: block;
    }
    > span {
        display: inline-block;
        height: 28px;
        padding: 0 20px;
        font-size: 14px;
        color: #0f62cc;
        line-height: 28px;
        letter-spacing: -0.6px;
        border-radius: 13px;
        border: 1px solid #0f62cc;
        margin-bottom: 20px;
    }
`;

const LoadingWrap = styled.div`
    display: none;
    position: absolute;
    z-index: 3001;
    transform: translate(-50%, -50%);
/* display: none; */
`;
export default function Page() {

    const { nearStation } = useStore(store => store);
    const stationInfo = stationInfoJSON.items;

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

    // @ 서브 네비게이션 바 컴포넌트
    const TopBarListComponent = () => {
        return topbarList.map((item, index) => (
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
                    {item.links.map((link, linkIndex) => <li key={linkIndex}><Link to={link.to}>{link.text}</Link></li>)}
                </ListDetail>
            </List>
        ))
    }

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

    // ------------------------------------------------------------------------------------------------------------------------------------------------

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

    // @ 사이드바 컴포넌트
    const AsideComponent = () => {
        const children = asideList.links.map((link, index) => {
            const variableCheck = typeof asideToggle !== 'undefined';
            const childrenCheck = 'children' in link;
            if(variableCheck) {
                return (
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
                            {link.children.map((item, _index) => <li key={_index}><AsideLinkA selected={item.select}>{item.text}</AsideLinkA></li>)}
                        </AsideLinkUl>}
                    </li>
                );
            } else return <li key={index}><AsideLink to={`/info?page=${index + 1}`} selected={link.select}>{link.text}</AsideLink></li>;
        
    });
    return <ul>{children}</ul>
};

    // ------------------------------------------------------------------------------------------------------------------------------------------------

    // # 측정소 선택
    const [selectStation, setSelectStation] = useState(nearStation[0].stationName || '온의동');

    // # 인풋 텍스트문
    const [searchValue, setSearchValue] = useState('');
    const stationInputHandle = (e) => {
        const {value} = e.currentTarget;
        const [,addr] = value.match(/(.*)\|/);
        const [,stationName] = value.match(/\|(.*)/);
        setSearchValue(addr);
        setSelectStation(stationName);
    };

    // @ 인접 측정소 3구역 출력 컴포넌트
    const NearStationComponent = () => {
        const children = nearStation.map((station, index) => {
            const filter = stationInfo.filter(item => item.stationName === station.stationName);
            const mangName = filter.length > 0 ? filter[0].mangName : null;

            return (
                <tr key={index}>
                    <td><input type="radio" name="station" 
                            value={`${station.addr}|${station.stationName}`}
                            onChange={stationInputHandle} 
                            defaultChecked={index === 0} />
                    </td>
                    <td>{station.stationName}</td>
                    <td>{station.addr}</td>
                    <td>{station.tm} km</td>
                    <td>{mangName}</td>
                </tr>
            )
        });
        return <tbody>{children}</tbody>
    }

    // # 조회 종류
    const [viewSelectIndex, setViewSelectIndex] = useState(0);
    const [dataDivision, setDataDivision] = useState('time');

    // # 데이터 구분 함수
    const dataDivisionChangeHandle = (e) => {
        const { value } = e.currentTarget;
        setDataDivision(value);
    }

    // # 캘린더 설정
    const currentDate = new Date();
    const yesterday =  new Date();
    const pastDate = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    pastDate.setDate(currentDate.getDate() - 60);

    const [selectedBginDate, setSelectedBginDate] = useState(yesterday);
    const [bginHour, setBginHour] = useState('01');
    const [selectedEndDate, setSelectedEndDate] = useState(yesterday);
    const [endHour, setEndHour] = useState('03');

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
            return <tr><td colSpan={12}>검색된 자료가 없습니다.</td></tr>;
        }

        return tableDom.map((tr, idx) => {
            const [,,,,pm10] = getColorValue(tr.pm10Value, 'pm10Value');
            const [,,,,pm25] = getColorValue(tr.pm25Value, 'pm25Value');
            const [,,,,o3] = getColorValue(tr.o3Value, 'o3Value');
            const [,,,,no2] = getColorValue(tr.no2Value, 'no2Value');
            const [,,,,co] = getColorValue(tr.coValue, 'coValue');
            const [,,,,so2] = getColorValue(tr.so2Value, 'so2Value');
            
            const colSpanVariable = dataDivision === 'time' ? 1 : 2;
            const altStatus = (status) => {
                switch (status) {
                    case "1": return '좋음';
                    case "2": return '보통';
                    case "3": return '나쁨';
                    case "4": return '매우나쁨';
                    default: return '데이터 없음';
                }
            }

            let returnDom;
            if(dataTimeCheck && dataDivision === 'time') { returnDom = 
                <tr key={idx}>
                    <td>{`${tr.dataTime.substring(2, 10)}:${tr.dataTime.substring(11, 13)}`}</td>
                    <td><img src={`/images/realtime/img_bum0${pm10}.webp`} alt={altStatus(pm10)} /></td>
                    <td>{tr.pm10Value}</td>
                    <td><img src={`/images/realtime/img_bum0${pm25}.webp`} alt={altStatus(pm25)} /></td>
                    <td>{tr.pm25Value}</td>
                    <td><img src={`/images/realtime/img_bum0${o3}.webp`} alt={altStatus(o3)} /></td>
                    <td>{tr.o3Value}</td>
                    <td><img src={`/images/realtime/img_bum0${no2}.webp`} alt={altStatus(no2)} /></td>
                    <td>{tr.no2Value}</td>
                    <td><img src={`/images/realtime/img_bum0${co}.webp`} alt={altStatus(co)} /></td>
                    <td>{tr.coValue}</td>
                    <td><img src={`/images/realtime/img_bum0${so2}.webp`} alt={altStatus(so2)} /></td>
                    <td>{tr.so2Value}</td>
                </tr>}

            if(dataDailyCheck && dataDivision === 'daily') { returnDom = 
                <tr key={idx}>
                    <td>{tr.msurDt}</td>
                    <td colSpan={colSpanVariable}>{tr.pm10Value}</td>
                    <td colSpan={colSpanVariable}>{tr.pm25Value}</td>
                    <td colSpan={colSpanVariable}>{tr.o3Value}</td>
                    <td colSpan={colSpanVariable}>{tr.no2Value}</td>
                    <td colSpan={colSpanVariable}>{tr.coValue}</td>
                    <td colSpan={colSpanVariable}>{tr.so2Value}</td>
                </tr>}
            return returnDom;
        });
    }

    // # 데이터 검색 버튼 핸들러
    const handleCenterButton = async (e) => {
        e.preventDefault();

        // ! 일평균 데이터 생성 주기 '매일 1시 전후' 전 날 데이터 조회
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
        const checkResult = tableResult.filter(item => {
            const { dataTime, stationName } = item;
            const itemDate = new Date(dataTime);
            return (itemDate >= startDateFormatting && itemDate <= endDateFormatting) && stationName === selectStation;
        });

        if((dataDivision === 'time' && checkResult.length === 0) || (dataDivision === 'daily' && !checkResult.some(item => item.msurDt))) {
            const response = await fetch(`http://localhost:3500/api/airkorea/neighborhood?inqBginDt=${bginYear}${bginMonth}${bginDay}&inqEndDt=${bginYear}${bginMonth}${bginDay}&stationName=${selectStation}&type=${dataDivision}`);
            const arrayResult = await response.json();

            const filterDate = arrayResult.filter(data => {
                const { dataTime, msurDt } = data;
                
                let createDate = dataDivision === 'time' ? dataTime : msurDt;
                const itemDate = new Date(createDate);
                return itemDate >= startDateFormatting && itemDate <= endDateFormatting;
            });
            // # 측정소 3개월치의 데이터
            setTableResult(arrayResult);
            // # 날짜 필터를 진행 한 결과 데이터
            setTableDom(filterDate);
        } else setTableDom(checkResult);

        setLoadingStyle({ top: `${top}px`, left: `${left}px`, display: 'none' });
    }

    // ! 화면 중앙
    const [loadingStyle, setLoadingStyle] = useState({ top: '50%', left: '50%' });


    // # 기본 값 설정
    // const [initLoading, setInitLoading] = useState(false);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const year = yesterday.getFullYear();
    //         const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    //         const day = String(yesterday.getDate()).padStart(2, '0');

    //         const startDate = new Date(`${year}-${month}-${day}T01:00`);
    //         const endDate = new Date(`${year}-${month}-${day}T03:00`);

    //         // # 로딩
    //         setInitLoading(true);

    //         const response = await fetch(`http://localhost:3500/api/airkorea/neighborhood?inqBginDt=${year}${month}${day}&inqEndDt=${year}${month}${day}&stationName=%EC%A4%91%EA%B5%AC&type=time`);
    //         const arrayResult = await response.json();

    //         setTableResult(arrayResult);
    //         const tableDomResult = arrayResult.filter(item => {
    //             const newDate = new Date(item.dataTime);
    //             return newDate >= startDate && newDate <= endDate;
    //         });
            
    //         setTableDom(tableDomResult);

    //         setInitLoading(false);
    //     };
    //     if(tableDom.length === 0) fetchData();
    // }, [yesterday]);

    return (
        <>
            <LoadingWrap style={loadingStyle}>
                <img src="/images/realtime/loading.webp" alt="로딩중 Loading" />
            </LoadingWrap>
            <DivStyle>
                <TopBar>
                    <li><Home to="/" title="홈"></Home></li>
                    {/* 컴포넌트 */} <TopBarListComponent />
                </TopBar>
            </DivStyle>
            <Section>
                <Aside>
                    <h2>{asideList.title}</h2>
                    {/* 컴포넌트: ul */} <AsideComponent />
                </Aside>
                <Content>
                    <ContentTitle>우리동네 대기 정보</ContentTitle>
                    <ContentSearchWrap>
                        <label htmlFor="search">지역명 검색</label>
                        <ContentSearchInput type="text" id="search" placeholder="도로명 또는 동을 입력하세요. 예) 서소문로" value={searchValue} onChange={(e) => e.currentTarget.value} />
                        <button>검색</button>
                    </ContentSearchWrap>
                    <ContentTable>
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>측정소명</th>
                                <th>측정소 주소</th>
                                <th>거리</th>
                                <th>측정망</th>
                            </tr>
                        </thead>
                        {/* 컴포넌트: tbody  */}<NearStationComponent />
                        <caption>※ 거주지역의 대표 대기질은 "도시대기" 측정자료를 참고하시기 바랍니다.</caption>
                    </ContentTable>
                    <ContentResultWrap>
                        <div>
                            <ContentResultTap selectCheck={viewSelectIndex === 0} onClick={() => setViewSelectIndex(0)} style={{marginRight: '10px'}}>
                                측정자료 조회통합대기
                            </ContentResultTap>
                            <ContentResultTap  selectCheck={viewSelectIndex === 1} onClick={() => setViewSelectIndex(1)}>
                                환경지수 조회
                            </ContentResultTap>
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
                                        onChange={dataDivisionChangeHandle}
                                    /><label htmlFor="searchBox_time">시간</label>
                                    {viewSelectIndex === 0 && <>
                                    <input 
                                        type="radio" 
                                        name="dataDivision" 
                                        value="daily" 
                                        id="searchBox_daily" 
                                        onChange={dataDivisionChangeHandle} 
                                    /><label htmlFor="searchBox_daily">일평균</label>
                                    </>}
                                </div>
                            </div>
                            <div>
                                <strong>조회 기간</strong>
                                <div>
                                    <DisableFeat>
                                        <DatePicker
                                            dateFormat='yyyy-MM-dd' // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={pastDate} // minDate 이전 날짜 선택 불가
                                            maxDate={yesterday} // maxDate 이후 날짜 선택 불가
                                            selected={selectedBginDate}
                                            locale={ko}
                                            onChange={(date) => setSelectedBginDate(date)}
                                        />
                                        {dataDivision === 'time' &&
                                            <select value={bginHour} onChange={(e) => setBginHour(e.currentTarget.value)}>
                                                <option value="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                                <option value="05">5</option>
                                                <option value="06">6</option>
                                                <option value="07">7</option>
                                                <option value="08">8</option>
                                                <option value="09">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                            </select>}
                                        ~
                                        <DatePicker
                                            dateFormat='yyyy-MM-dd' // 날짜 형태
                                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                            minDate={pastDate} // minDate 이전 날짜 선택 불가
                                            maxDate={yesterday} // maxDate 이후 날짜 선택 불가
                                            selected={selectedEndDate}
                                            locale={ko}
                                            onChange={(date) => setSelectedEndDate(date)}
                                        />
                                        {dataDivision === 'time' &&
                                            <select value={endHour} onChange={(e) => setEndHour(e.currentTarget.value)}>
                                                <option value="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                                <option value="05">5</option>
                                                <option value="06">6</option>
                                                <option value="07">7</option>
                                                <option value="08">8</option>
                                                <option value="09">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                            </select>}
                                            <DisableBtn>
                                                <button onClick={handleCenterButton}>검색</button>
                                            </DisableBtn>
                                    </DisableFeat>
                                </div>
                            </div>
                        </ContentResultSearchBox>
                        <ContentResultTableWrap>
                            <h2>측정자료&#40;수치&#41;</h2>
                            <span>{selectStation}</span>
                            <ContentTableWrap>
                                <ContentTable>
                                    <thead>
                                        {/* {(dataDivision === 'time' && tableDom.some(item => typeof item.dataTime !== 'undefined')) && 
                                        <tr>
                                            <th rowSpan={2}>날짜<br />&#40;년-월-일:시&#41;</th>
                                            <th colSpan={2}>PM-10(㎍/㎥)</th>
                                            <th colSpan={2}>PM-2.5(㎍/㎥)</th>
                                            <th colSpan={2}>오존(ppm)</th>
                                            <th colSpan={2}>이산화질소(ppm)</th>
                                            <th colSpan={2}>일산화탄소(ppm)</th>
                                            <th colSpan={2}>아황산가스(ppm)</th>
                                        </tr>} */}
                                        <tr>
                                            <th rowSpan={2}>날짜<br />{(dataDivision === 'time' && tableDom.some(item => typeof item.dataTime !== 'undefined')) ? `(년-월-일:시)` : `(년-월-일)`}</th>
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
                                        </tr>}
                                    </thead>
                                    <tbody>
                                        <TableDomComponent />
                                    </tbody>
                                </ContentTable>
                            </ContentTableWrap>
                        </ContentResultTableWrap>
                    </ContentResultWrap>
                </Content>
            </Section>
        </>
    )
};