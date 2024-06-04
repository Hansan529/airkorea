import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';

import { AElement, Aside, AsideLink, AsideLinkA, AsideLinkUl, Content, ContentTitle, DivStyle, Home, List, ListDetail, Section, TopBar } from '../layout';
import useStore from '../../hooks/useStore';
import stationInfoJSON from '../../data/stationInfo.json';

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

    th { font-weight: 600; }

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
    right: 0;

    button {
        padding: 0 25px;
        background: #0f62cc80;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        line-height: 34px;
        border-radius: 4px;

        &:last-of-type { 
            margin-left: 5px;
            background: #64646480; 
        }
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
    }
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

    // --

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

    // --

    // # 측정소 선택
    const [selectStation, setSelectStation] = useState('온의동');

    // # 인풋 텍스트문
    const [searchValue, setSearchValue] = useState('');
    const stationInputHandle = (e) => {
        const {value} = e.currentTarget;
        const [,addr] = value.match(/(.*)\|/);
        const [,stationName] = value.match(/\|(.*)/);
        setSearchValue(addr);
        setSelectStation(stationName);
    };

    // # 조회 종류
    const [viewSelectIndex, setViewSelectIndex] = useState(0);
    const [dataDivision, setDataDivision] = useState('time');

    // # 캘린더 설정
    const currentDate = new Date();
    const yesterday =  new Date();
    const pastDate = new Date();
    yesterday.setDate(currentDate.getDate() - 1);
    pastDate.setDate(currentDate.getDate() - 60);

    const [selectedBginDate, setSelectedBginDate] = useState(yesterday);
    const [bginHour, setBginHour] = useState('1');
    const [selectedEndDate, setSelectedEndDate] = useState(yesterday);
    const [endHour, setEndHour] = useState('3');

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
                        <tbody>
                            {nearStation.map((station, index) => {
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
                            })}
                        </tbody>
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
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
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
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
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
                                                <button disabled>검색</button>
                                                <button disabled>그래프보기</button>
                                            </DisableBtn>
                                    </DisableFeat>
                                </div>
                            </div>
                        </ContentResultSearchBox>
                        <ContentResultTableWrap>
                            <h2>측정자료&#40;수치&#41;</h2>
                            <span>{selectStation}</span>
                            <ContentTable>
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>날짜<br />&#40;월-일:시&#41;</th>
                                        <th colSpan={2}>PM-10(㎍/㎥)</th>
                                        <th colSpan={2}>PM-2.5(㎍/㎥)</th>
                                        <th colSpan={2}>오존(ppm)</th>
                                        <th colSpan={2}>이산화질소(ppm)</th>
                                        <th colSpan={2}>일산화탄소(ppm)</th>
                                        <th colSpan={2}>아황산가스(ppm)</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>1시간</th>
                                        <th colSpan={2}>1시간</th>
                                        <th colSpan={2}>1시간</th>
                                        <th colSpan={2}>1시간</th>
                                        <th colSpan={2}>1시간</th>
                                        <th colSpan={2}>1시간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>06-03:03</td>
                                        <td>img</td>
                                        <td>10</td>
                                        <td>img</td>
                                        <td>-</td>
                                        <td>img</td>
                                        <td>0.0219</td>
                                        <td>img</td>
                                        <td>0.0067</td>
                                        <td>img</td>
                                        <td>0.29</td>
                                        <td>img</td>
                                        <td>0.0014</td>
                                    </tr>
                                    <tr>
                                        <td>06-03:02</td>
                                        <td>img</td>
                                        <td>10</td>
                                        <td>img</td>
                                        <td>-</td>
                                        <td>img</td>
                                        <td>0.0219</td>
                                        <td>img</td>
                                        <td>0.0067</td>
                                        <td>img</td>
                                        <td>0.29</td>
                                        <td>img</td>
                                        <td>0.0014</td>
                                    </tr>
                                    <tr>
                                        <td>06-03:01</td>
                                        <td>img</td>
                                        <td>10</td>
                                        <td>img</td>
                                        <td>-</td>
                                        <td>img</td>
                                        <td>0.0219</td>
                                        <td>img</td>
                                        <td>0.0067</td>
                                        <td>img</td>
                                        <td>0.29</td>
                                        <td>img</td>
                                        <td>0.0014</td>
                                    </tr>
                                </tbody>
                            </ContentTable>
                        </ContentResultTableWrap>
                    </ContentResultWrap>
                </Content>
            </Section>
        </>
    )
};