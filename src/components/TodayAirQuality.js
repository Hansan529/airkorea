import styled from "@emotion/styled";
import { getColorValue } from "./MapPath";
// import airQualityJson from "../data/todayDaily.json";
import forecastJSON from "../data/getMinuDustFrcstDspth.json";
import stationJson from "../data/stationInfo.json";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// const { response: { body: { items : airQuality }}} = airQualityJson;
// const filterQuality = airQuality.filter((item, index) => index < 4);

const { response: { body: { items : forecast }}} = forecastJSON;
const filterForecast = forecast.filter((item, index) => index < 4);

const { items: stationsInfo } = stationJson;


/**
 * 금일 시간별 미세먼지
 * 대기오염정보: 측정소별  실시간 측정정보 조회(getMsrstnAcctoRltmMesureDnsty)
 *
 * 일별 평균 미세먼지
 * 대기오염통계 현황: 측정소별 실시간 일평균 정보 조회(getMsrstnAcctoRDyrg)
 *
 * 위도 경도 주변 측정소 찾기 (TM 좌표를 통해 가까운 측정소 찾기)
 * 측정소정보: 근처측정소 목록 조회(getNearbyMsrstnList)
 *
 * 대기정보 예보 / 가장 최근 업데이트인 4개의 정보 (PM25, PM10 금일, 익일 정보)
 * 대기오염정보: 대기질 예보통보 조회(getMinuDustFrcstDspth)
 */
const InfoContainer = styled.div`
    width: 660px;
    /* overflow: hidden; */
`;
const InfoWrapper = styled.div`
border: 5px solid #00aeee;
border-radius: 20px;
padding: 15px;
background-color: #fff;

> div:first-of-type{
    background: url('/img_bg01.png') no-repeat;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    margin-bottom: 15px;

    h2 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;

    > span {
        color: #0f62cc;
    }
    }
}

> div:nth-of-type(2) {
    position: relative;
    display: flex;
    justify-content: space-between;

    > div {
    display: flex;
    gap: 10px;

    > p  {
        font-size: 18px;
        > strong { color: #0f62cc; }
        > span { display: block; margin-top: 5px; font-size: 14px; }
    }
    }

    button {
    font-size: 0;
    }
}
`;
const InfoButton = styled.button`
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #c6ccd4;
    border-radius: 5px;
    background: #fff ${props => props.ico && `url('/img_${props.ico}.png')`} no-repeat center;
    /* background-color: #fff;
    background-size: ${props => props.ico === 'bg_search' && '70%'};
    background-repeat: no-repeat;
    background-position: center;
    background-image: ${props => props.ico && `url('/img_${props.ico}.png')`}; */
    &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`
const InfoInteraction = styled.div`margin-bottom: 20px;`;

const Container = styled.div`
    position: relative;

    sub {
        vertical-align: sub;
        font-size: smaller;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

`

const Part = styled.div`
    display: block;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    flex-grow: 1;
    background-color: #eaedee;
    overflow: hidden;
    margin-bottom: 20px;

    &:last-of-type {
        margin-bottom: 0;
    }

    h3 {
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    > ul{
        padding: 30px 0px 25px;
        background-color: #fff;
        display: flex;
        align-items: flex-end;

        > li {
            flex: 1;
            text-align: center;
            box-sizing: border-box;

            &:not(:last-child){
                border-right: 0.5px solid rgba(0,0,0,0.3);
            }

            strong, small, span {
                display: block;
            margin-bottom: 5px;

                &:not(strong:first-of-type){
                    margin: 10px 0;
                }
            }

            .colorValue {
                font-size: 24px;
                font-weight: bold;
            }
            img {
                margin: 10px 0;
            }
        }
    }

    .miniText{
        line-height: 2;
        text-indent: 20%;
        background-repeat: no-repeat;
        background-position: 40% center;
    }

    .miniTextIco_1{ background-image: url('./img_yebo_na01.png'); }
    .miniTextIco_2{ background-image: url('./img_yebo_na02.png'); }
    .miniTextIco_3{ background-image: url('./img_yebo_na03.png'); }
    .miniTextIco_4{ background-image: url('./img_yebo_na04.png'); }
    .miniTextIco_5{ background-image: url('./img_yebo_na05.png'); }
`

const LegendBase = styled.div`
    text-align: center;

    button {
        border:none;
        width: 70px;
        text-align: left;
        background: url('./img_handong_more.png') no-repeat center right;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    .legendPopup {
        display: none;
        position: absolute;
        bottom: -100px;
        width: 100%;
        border: 1px solid #0a0a0a;
        background-color: #fafafa;
        border-radius: 10px;
        overflow: hidden;
    }

    .legendTitle {
        background-color: #414d5d;
        color: #fafafa;
        padding: 10px 0;
        position: relative;
        height: 15px;

        button {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-5px, 7.5px);
            font-size: 0;
            background: url('./img_cau_close.png') no-repeat center;
            width: 22px;
            height: 22px;
        }
    }

    .legendFlex {
        display: flex;
        gap: 10px;
        align-items: center;
        height: 30px;
        padding: 15px 10px 0 10px;

        &:last-of-type{ padding: 10px 10px 15px 10px; }

        > div {
            flex: 1;
            border: 1px solid #d2d2d2;
            padding: 5px 0;
            cursor: pointer;
        }
    }

    .legendRange {
        padding: 0 10px 10px 10px;
        white-space: nowrap;

        li {
            display: inline-block;
            width: 20%;
            background-color: #f1fbff;
            box-sizing: border-box;
            padding: 5px;
            border-width: 1px;
            border-style: solid;
            border-color: #c6eeff;
            border-left: none;
            border-right: none;
            &:first-of-type{
                border-left: 1px solid #c6eeff;
                border-radius: 5px 0 0 5px;
            }
            &:last-of-type {
                border-right: 1px solid #c6eeff;
                border-radius: 0 5px 5px 0;
            }
        }

        span {
            display: block;
            position: relative;
            font-size: 11px;
            padding-left: 25px;
            text-align: left;

            &::after {
                display: block;
                content: "";
                position: absolute;
                top: 0;
                left: 10px;
                width: 10px;
                height: 10px;
                background: no-repeat 0 0;
            }
            &.legendRange_1::after { background-image: url('./img_ch01.png'); }
            &.legendRange_2::after { background-image: url('./img_ch02.png'); }
            &.legendRange_3::after { background-image: url('./img_ch03.png'); }
            &.legendRange_4::after { background-image: url('./img_ch04.png'); }
            &.legendRange_5::after { background-image: url('./img_ch05.png'); }
        }
    }
`;

const AirForecastUl = styled.ul`
    li {
        position: relative;

        p {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            width: 90px;
            height: 33px;
            line-height: 25px;
        }
        &:nth-of-type(2) p {
            background: url('./img_bg_to01.png') no-repeat 0 0;
        }
        &:nth-of-type(3) p {
            background: url('./img_bg_to02.png') no-repeat 0 0;
        }
    }
`;

const Component = (props) => {
        const [count, setCount] = useState(0);
        const [legendRange, setLegendRange] = useState([]);
        const [legendPopupState, setLegendPopupState] = useState(false);
        const legendPopupRef = useRef();
        const [selectLegend, setSelectLegend] = useState('khai');

        useEffect(() => {
            legendPopupRef.current.focus();
        },[]);

        useEffect(() => {
            setLegendRange(getColorValue(0, `${selectLegend}Value`, true));
        }, [selectLegend]);

        useEffect(() => {
            if('geolocation' in navigator) {
              const success = async (pos) => {
                let { latitude, longitude } = pos.coords;
                if(latitude === undefined) latitude = '197806.5250901809';
                if(longitude === undefined) longitude = '451373.25740676327';

                const { data } = await axios.post('http://localhost:3500/api/coordinate', { latitude, longitude});
                const { x, y } = data.documents[0];

                const { data: stations } = await axios.post('http://localhost:3500/api/station', {x, y});
                // 가까운 거리의 측정소 3개
                // setStation(stations);

                // 가까운 측정소
                const stationInfo = stationsInfo.find(item => item.stationName === stations[0].stationName);
                props.setStation(stationInfo);
              }
              // TODO: 위치 정보 비허용으로 중구 위치를 기준으로 한다는 모달창 출력
              const error = (err) => console.error('에러', err);

              navigator.geolocation.getCurrentPosition(success, error);
            }
        }, [count]);

        // const { items: dnstyItems } = dnsty.response.body;

        // 사용자 지역에 대한 대기 정보 수치 값
        const currentLocation = props.airData?.find(el => el.stationName === props.station.stationName);
        // 사용자 지역에 가까운 측정소에 대한 정보
        const currentStationInfo = stationsInfo.find(item => item?.stationName === currentLocation?.stationName);

        // 경기북부, 경기남부 / 영동, 영서
        const gyeonggiBukList = ['고양시', '의정부시', '파주시', '양주시', '구리시', '남양주시', '동두천시', '포천시', '가평군', '연천군'];
        const gyeonggiBukCheck = gyeonggiBukList.some(list => currentStationInfo?.addr.includes(list));

        const yeongdongList = ['강릉시', '삼척시', '동해시', '태백시', '속초시', '양양군', '고성군'];
        const yeongdongCheck = yeongdongList.some(list => currentStationInfo?.addr.includes(list));

        // 사용자 지역에 대한 대기 예측 정보
        const objectCurrentStationInfo = {
            pm10Today: {},
            pm10Tomorrow: {},
            pm25Today: {},
            pm25Tomorrow: {},
        };

        filterForecast.forEach((forecast, idx) => {
            let objectKey;
            switch(idx) {
                case 0: objectKey = 'pm10Today';
                    break;
                case 1: objectKey = 'pm10Tomorrow';
                    break;
                case 2: objectKey = 'pm25Today';
                    break;
                case 3: objectKey = 'pm25Tomorrow';
                    break;
                default: break;
            }
            const area = forecast.informGrade.split(',');

            area.forEach(region => {
                const [location, condition] = region.split(" : ");
                objectCurrentStationInfo[objectKey][location] = condition;
            });
        });

        const [state] = currentStationInfo?.addr.split(' ') || [];
        let stateNickname = state?.substring(0, 2);

        if((gyeonggiBukCheck || yeongdongCheck) && stateNickname === '경기') {
            stateNickname = "경기북부";
        } else if ((gyeonggiBukCheck || yeongdongCheck) && stateNickname === '강원') {
            stateNickname = "영동";
        } else if (!gyeonggiBukCheck && !yeongdongCheck && stateNickname === "경기") {
            stateNickname = "경기남부";
        } else if (!gyeonggiBukCheck && !yeongdongCheck && stateNickname === '강원') {
            stateNickname = '영서';
        }

        const colorList = ['#1c67d7','#01b56e','#937200','#c00d0d','#0a0a0a'];

        // 오늘의 대기질
        const pm25 = getColorValue(currentLocation?.pm25Value, 'pm25Value')[3];
        const pm10 = getColorValue(currentLocation?.pm10Value, 'pm10Value')[3];
        const o3 = getColorValue(currentLocation?.o3Value, 'o3Value')[3];

        /**
         *
         * @param {number|string} 값
         * @returns {Array} [상태, 색상코드, 인덱스]
         */
        const airState = (value) => {
            if(value === 0 || value === '좋음'){
                return ['좋음', '#1c67d7', 1];
            } else if(value === 1 || value === '보통'){
                return ['보통', '#01b56e', 2];
            } else if(value === 2 || value === '나쁨'){
                return ['나쁨', '#937200', 3];
            } else if(value === 3 || value === '매우나쁨'){
                return ['매우나쁨', '#c00d0d', 4];
            } else {
                return ['데이터 없음', '#0a0a0a', 5];
            }
        };

    const pm25Index = (colorList.indexOf(pm25) + 1) !== 0 ? colorList.indexOf(pm25) + 1 : 5;
    const pm10Index = (colorList.indexOf(pm10) + 1) !== 0 ? colorList.indexOf(pm10) + 1 : 5;
    const o3Index = (colorList.indexOf(o3) + 1) !== 0 ? colorList.indexOf(o3) + 1 : 5;

    // 대기정보 예보
    const pm25Today = objectCurrentStationInfo.pm25Today[stateNickname];
    const pm25TodayIndex = airState(pm25Today)[2];
    const pm10Today = objectCurrentStationInfo.pm10Today[stateNickname];
    const pm10TodayIndex = airState(pm10Today)[2];
    const pm25Tomorrow = objectCurrentStationInfo.pm25Tomorrow[stateNickname];
    const pm25TomorrowIndex = airState(pm25Tomorrow)[2];
    const pm10Tomorrow = objectCurrentStationInfo.pm10Tomorrow[stateNickname];
    const pm10TomorrowIndex = airState(pm10Tomorrow)[2];
    // ---------------------------------------------------- Dyanmic Styled
    const Legend = styled(LegendBase)`
        .legendPopup {
                display: ${legendPopupState && "block"};
        }
        .legendFlex {
            > div {
                &[data-value="${selectLegend}"] {
                    border: 1px solid #0f62cc;
                    color: #0f62cc;
                }
            }
        }
    `

    // ---------------------------------------------------- Event
    const refreshHandleClick = () => setCount(count + 1);
    const legendClickHandle = (e) => {
        const node = e.currentTarget;
        const value = node.dataset.value;

        setSelectLegend(value);
    }

    const legendPopupHandle = () => setLegendPopupState(!legendPopupState);

    const legendFormatNumber = (num, decimalPlaces) => {
        if(Number.isInteger(num))
            return num.toString();
        else {
            const multiplier = Math.pow(10, decimalPlaces);
            return Math.floor(num * multiplier) / multiplier;
        }
    }

    // ---------------------------------------------------- Components
    const TimeComponent = props.childrenComponents.Time;

    return (
        <InfoContainer>
            <InfoWrapper>
                <div>
                    <h2>우리동네 <span>대기정보</span></h2>
                </div>
                <div>
                <InfoInteraction>
                    <InfoButton ico={'bg_search'}>검색</InfoButton>
                    <InfoButton ico={'pos'}>현위치</InfoButton>
                    <p>
                    <strong>{props.loading && (props.station.stationName)}</strong> 중심으로 측정
                    <span>({props.station.addr.split(' ')[0]} {props.station.addr.split(' ')[1]} {props.station.stationName} 측정소 기준)</span>
                    </p>
                </InfoInteraction>
                <TimeComponent refresh onClick={refreshHandleClick} />
                </div>
            <Container>
                <Part>
                    <h3>오늘의 대기질</h3>
                    <ul>
                        <li>
                            <span><strong>초미세먼지</strong>(PM-2.5)</span>
                            <img src={`./img_na0${props.loading ? pm25Index : 5}.png`} alt="대기질" />
                            <span style={{color: pm25}}>
                                <strong className="colorValue">{props.loading ? currentLocation?.pm25Value : '-'}</strong>
                                <small style={{color: 'initial'}}>㎍/㎥</small>
                                {airState(colorList.indexOf(pm25))[0]}
                            </span>
                        </li>
                        <li>
                            <span><strong>미세먼지</strong>(PM-10)</span>
                            <img src={`./img_na0${props.loading ? pm10Index : 5}.png`} alt="대기질" />
                            <span style={{color: pm10}}>
                                <strong className="colorValue">{props.loading ? currentLocation?.pm10Value : '-'}</strong>
                                <small style={{color: 'initial'}}>㎍/㎥</small>
                                {airState(colorList.indexOf(pm10))[0]}
                                </span>
                        </li>
                        <li>
                            <span><strong>오존</strong>(O<sub>3</sub>)</span>
                            <img src={`./img_na0${props.loading ? o3Index : 5}.png`} alt="대기질" />
                            <span style={{color: o3}}>
                                <strong className="colorValue">{props.loading ? String(currentLocation?.o3Value).padEnd(6, '0') : '-'}</strong>
                                <small style={{color: 'initial'}}>ppm</small>
                                {airState(colorList.indexOf(o3))[0]}
                            </span>
                        </li>
                    </ul>
                </Part>
                <Part>
                    <h3>대기정보 예보</h3>
                    <AirForecastUl>
                        <li>
                            <p></p>
                            <span><strong>초미세먼지</strong>(PM-2.5)</span>
                            <span><strong>미세먼지</strong>(PM-10)</span>
                        </li>
                        <li>
                            <p>오늘</p>
                            <span className={`miniText miniTextIco_${props.loading ? pm25TodayIndex : '5'}`} style={{color: airState(pm25Today)[1]}}>{props.loading ? pm25Today : '-'}</span>
                            <span className={`miniText miniTextIco_${props.loading ? pm10TodayIndex : '5'}`} style={{color: airState(pm10Today)[1]}}>{props.loading ? pm10Today : '-'}</span>
                        </li>
                        <li>
                            <p>내일</p>
                            <span className={`miniText miniTextIco_${props.loading ? pm25TomorrowIndex : '5'}`} style={{color: airState(pm25Tomorrow)[1]}}>{props.loading ? pm25Tomorrow : '-'}</span>
                            <span className={`miniText miniTextIco_${props.loading ? pm10TomorrowIndex : '5'}`} style={{color: airState(pm10Tomorrow)[1]}}>{props.loading ? pm10Tomorrow : '-'}</span>
                        </li>
                    </AirForecastUl>
                </Part>
                <Legend>
                    <button onClick={legendPopupHandle}>범례보기</button>
                    <div ref={legendPopupRef} className="legendPopup">
                        <div className="legendTitle">
                            <h2>범례보기</h2>
                            <button onClick={legendPopupHandle}>나가기</button>
                        </div>
                        <div>
                            <div className="legendFlex">
                                <div onClick={legendClickHandle} data-value="khai">통합대기환경지수 (CAI)</div>
                                <div onClick={legendClickHandle} data-value="pm25">초미세먼지 (PM-2.5)</div>
                                <div onClick={legendClickHandle} data-value="pm10">미세먼지 (PM-10)</div>
                            </div>
                            <div className="legendFlex">
                                <div onClick={legendClickHandle} data-value="o3">오존 (O<sub>3</sub>)</div>
                                <div onClick={legendClickHandle} data-value="no2">이산화질소 (NO<sub>2</sub>)</div>
                                <div onClick={legendClickHandle} data-value="co">일산화탄소 (CO)</div>
                                <div onClick={legendClickHandle} data-value="so2">아황산가스 (SO<sub>2</sub>)</div>
                            </div>
                            <ul className="legendRange">
                                <li><span className="legendRange_1">{`좋음(0 ~ ${legendFormatNumber(legendRange[1], 3)})`}</span></li>
                                <li><span className="legendRange_2">{`보통(${legendFormatNumber(legendRange[2], 3)} ~ ${legendFormatNumber(legendRange[3], 3)})`}</span></li>
                                <li><span className="legendRange_3">{`나쁨(${legendFormatNumber(legendRange[4], 3)} ~ ${legendFormatNumber(legendRange[5], 3)})`}</span></li>
                                <li><span className="legendRange_4">{`매우나쁨(${legendFormatNumber(legendRange[6], 3)} ~ )`}</span></li>
                                <li><span className="legendRange_5">데이터 없음</span></li>
                            </ul>
                        </div>
                    </div>
                </Legend>
            </Container>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default Component;
