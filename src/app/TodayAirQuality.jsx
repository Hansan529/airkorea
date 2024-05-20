import styled from "@emotion/styled";
import stationJson from "../data/stationInfo.json";
import { useEffect, useRef, useState } from "react";
import useStore from "../hooks/useStore.jsx";
import useAirQualityStore from "../hooks/useAirQualityStore.jsx";
import getColorValue from "../functions/getColorValue.ts";
import sleep from "../functions/sleep.ts";

const InfoContainer = styled.div`width: 660px;`;
const InfoWrapper = styled.div`
    border: 5px solid #00aeee;
    border-radius: 20px;
    padding: 15px;
    background-color: #fff;
`;
const InfoButton = styled.button`
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #c6ccd4;
    border-radius: 5px;
    background: #fff ${props => props.ico && `url('/images/main/img_${props.ico}.webp')`} no-repeat center;
    background-size: ${props => props.ico === 'bg_search' && '70%'};
    &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`;
const InfoWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;
const InfoInteraction = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    > p  {
        font-size: 18px;
        > strong { color: #0f62cc; }
        > span { display: block; margin-top: 5px; font-size: 14px; }
    }
    button {
        font-size: 0;
    }
`;
const TitleWrap = styled.div`
    background: url(/images/main/img_bg01.webp) no-repeat;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    margin-bottom: 15px;
`;
const Title = styled.h2`
    font-size: 30px;
    font-weight: 700;
    text-align: center;

    span {color: #0f62cc;}
`;
const Container = styled.div`
    position: relative;

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

`;
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

    .miniText{
        line-height: 2;
        background-repeat: no-repeat;
        background-position: 30px center;
    }
    .miniTextIco_1{
        background-image: url(/images/main/img_yebo_na01.webp);
        background-color: #1c67d74D;
    }
    .miniTextIco_2{
        background-image: url(/images/main/img_yebo_na02.webp);
        background-color: #01b56e4D;
    }
    .miniTextIco_3{
        background-image: url(/images/main/img_yebo_na03.webp);
        background-color: #9372004D;
    }
    .miniTextIco_4{
        background-image: url(/images/main/img_yebo_na04.webp);
        background-color: #c00d0d4D;
    }
    .miniTextIco_5{
        background-image: url(/images/main/img_yebo_na05.webp);
        background-color: #0a0a0a4D;
    }
`;
const PartTitle = styled.h3`
    padding: 10px 0;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;
const PartUl = styled.ul`
    padding: 30px 0px 25px;
    background-color: #fff;
    display: flex;
    align-items: flex-end;
`;
const PartLi = styled.li`
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
            margin-top: 10px;
        }
    }
    .colorValue {
        font-size: 24px;
        font-weight: bold;
    }
    img {
        margin: 10px 0;
    }
`;
const LegendBase = styled.div`
    text-align: center;

    button {
        border:none;
        width: 70px;
        text-align: left;
        background: url(/images/main/img_handong_more.webp) no-repeat center right;

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
            background: url(/images/main/img_cau_close.webp) no-repeat center;
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
            &.legendRange_1::after { background-image: url(/images/main/img_ch01.webp); }
            &.legendRange_2::after { background-image: url(/images/main/img_ch02.webp); }
            &.legendRange_3::after { background-image: url(/images/main/img_ch03.webp); }
            &.legendRange_4::after { background-image: url(/images/main/img_ch04.webp); }
            &.legendRange_5::after { background-image: url(/images/main/img_ch05.webp); }
        }
    }
`;
const AirForecastLi = styled(PartLi)`
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
        background: url(/images/main/img_bg_to01.webp) no-repeat 0 0;
    }
    &:nth-of-type(3) p {
        background: url(/images/main/img_bg_to02.webp) no-repeat 0 0;
    }
`;

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

const TodayAirQuaility = ({Time}) => {
    const { data, text, station, changer: storeChanger } = useStore(state => state);
    const { pm10, pm25, o3, currentLocation: location, changer: airQualityChanger } = useAirQualityStore(state => state);

    const stationsInfo = stationJson.items;
    const legendPopupRef = useRef();

    // 범례 보기(true) / 닫기(false)
    const [legendPopupState, setLegendPopupState] = useState(false);
    // 범례 종류 선택: khai, pm25, pm10, o3, no2, co, so2
    const [selectLegend, setSelectLegend] = useState('khaiValue');
    // 범례 유형별 범위
    const [legendRange, setLegendRange] = useState(getColorValue(0, `khaiValue`, true));
    // pm25


    // 사용자 지역에 대한 대기 예측 정보
    const objectCurrentStationInfo = {
        pm10Today: {},
        pm10Tomorrow: {},
        pm25Today: {},
        pm25Tomorrow: {},
    };

    const colorList = ['#1c67d7','#01b56e','#937200','#c00d0d','#0a0a0a'];

    // function
    /**
         *
         * @param {number|string} 값
         * @returns {Array} [상태, 색상코드, 인덱스]
         */
    const airState = (value) => {
        if(value === 0 || value === '좋음'){ return ['좋음', colorList[0], 1];}
        else if(value === 1 || value === '보통'){ return ['보통', colorList[1], 2];}
        else if(value === 2 || value === '나쁨'){ return ['나쁨', colorList[2], 3];}
        else if(value === 3 || value === '매우나쁨'){ return ['매우나쁨', colorList[3], 4];}
        else { return ['데이터 없음', colorList[4], 5];};
    };

    useEffect(() => {
        // 예보 텍스트
        if(text){
            const filterForecast = text.filter((item, index) => index < 4);

            // 대기 예측 정보 데이터 기입
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
        }
        if(data){
            // 사용자 지역에 대한 대기 정보 수치 값
            const currentLocation = data.find(el => el.stationName === station.stationName);
            // 사용자 지역에 가까운 측정소에 대한 정보
            const currentStationInfo = stationsInfo.find(item => item.stationName === currentLocation.stationName);

            // 경기북부, 경기남부 / 영동, 영서
            const gyeonggiBukList = ['고양시', '의정부시', '파주시', '양주시', '구리시', '남양주시', '동두천시', '포천시', '가평군', '연천군'];
            const gyeonggiBukCheck = gyeonggiBukList.some(list => currentStationInfo.addr.includes(list));

            const yeongdongList = ['강릉시', '삼척시', '동해시', '태백시', '속초시', '양양군', '고성군'];
            const yeongdongCheck = yeongdongList.some(list => currentStationInfo.addr.includes(list));


            const [state] = currentStationInfo.addr.split(' ') || [];
            let stateNickname = state.substring(0, 2);

            if((gyeonggiBukCheck || yeongdongCheck) && stateNickname === '경기') {
                stateNickname = "경기북부";
            } else if ((gyeonggiBukCheck || yeongdongCheck) && stateNickname === '강원') {
                stateNickname = "영동";
            } else if (!gyeonggiBukCheck && !yeongdongCheck && stateNickname === "경기") {
                stateNickname = "경기남부";
            } else if (!gyeonggiBukCheck && !yeongdongCheck && stateNickname === '강원') {
                stateNickname = '영서';
            }

            // 오늘의 대기질
            const pm25Color = getColorValue(currentLocation?.pm25Value, 'pm25Value')[3];
            const pm10Color = getColorValue(currentLocation?.pm10Value, 'pm10Value')[3];
            const o3Color = getColorValue(currentLocation?.o3Value, 'o3Value')[3];

            const pm25Text = airState(colorList.indexOf(pm25Color))[0];
            const pm10Text = airState(colorList.indexOf(pm10Color))[0];
            const o3Text = airState(colorList.indexOf(o3Color))[0];

        const pm25Index = (colorList.indexOf(pm25Color) + 1) !== 0 ? colorList.indexOf(pm25Color) + 1 : 5;
        const pm10Index = (colorList.indexOf(pm10Color) + 1) !== 0 ? colorList.indexOf(pm10Color) + 1 : 5;
        const o3Index = (colorList.indexOf(o3Color) + 1) !== 0 ? colorList.indexOf(o3Color) + 1 : 5;

        // 대기정보 예보
        const pm25Today = objectCurrentStationInfo.pm25Today[stateNickname];
        const pm10Today = objectCurrentStationInfo.pm10Today[stateNickname];

        const pm25TodayIndex = airState(pm25Today)[2];
        const pm10TodayIndex = airState(pm10Today)[2];

        const pm25Tomorrow = objectCurrentStationInfo.pm25Tomorrow[stateNickname];
        const pm10Tomorrow = objectCurrentStationInfo.pm10Tomorrow[stateNickname];

        const pm25TomorrowIndex = airState(pm25Tomorrow)[2];
        const pm10TomorrowIndex = airState(pm10Tomorrow)[2];

        airQualityChanger('pm25', {stateHex: pm25Color, stateText: pm25Text, stateIndex: pm25Index, todayState: pm25Today, todayIndex: pm25TodayIndex, tomorrowIndex: pm25TomorrowIndex, tomorrowState: pm25Tomorrow});
        airQualityChanger('pm10', {stateHex: pm10Color, stateText: pm10Text, stateIndex: pm10Index, todayState: pm10Today, todayIndex: pm10TodayIndex, tomorrowIndex: pm10TomorrowIndex, tomorrowState: pm10Tomorrow});
        airQualityChanger('o3', {stateHex: o3Color, stateText: o3Text, stateIndex: o3Index, todayIndex: 5, tomorrowIndex: '-', tomorrowState: 5});
        airQualityChanger('currentLocation', currentLocation);
        };
    }, [text, data, airQualityChanger, station])
    // ---------------------------------------------------- Dyanmic Styled
    const Legend = styled(LegendBase)`
        .legendPopup {
                display: ${legendPopupState && "block"};
        }
        .legendFlex {
            > div {
                &[type="${selectLegend}"] {
                    border: 1px solid #0f62cc;
                    color: #0f62cc;
                }
            }
        }
    `;
    // ---------------------------------------------------- Event
    const remeasureHandle = () => {
        // 캐시 제거 후, 새롭게 데이터 요청
        useStore.persist.clearStorage();

        // useEffect 재실행하기 위한 change
        storeChanger('stationFetchBoolean', false);
    };
    const refreshHandle = async () => {
        storeChanger('data', null);
        storeChanger('loading', false);
    };
    const legendClickHandle = (e) => {
        const type = e.currentTarget.getAttribute('type');

        const range = getColorValue(0, type, true);
        setSelectLegend(type);
        setLegendRange(range);
    }

    const legendPopupHandle = () => setLegendPopupState(!legendPopupState);

    const legendFormatNumber = (num, decimalPlaces) => {
        if(Number.isInteger(num))
            return num.toString();
        else {
            const multiplier = Math.pow(10, decimalPlaces);
            return Math.floor(num * multiplier) / multiplier;
        }
    };

    // ---------------------------------------------------- Components
    return (
        <InfoContainer>
            <InfoWrapper>
                <TitleWrap>
                    <Title>우리동네 <span>대기정보</span></Title>
                </TitleWrap>
                <InfoWrap>
                    <InfoInteraction>
                        <InfoButton ico={'pos'} onClick={remeasureHandle}>현위치</InfoButton>
                        <p>
                            <strong>{station.stationName}</strong> 중심으로 측정
                            <span>({`${station.addr.split(' ')[0]} ${station.addr.split(' ')[1]} ${station.stationName}`} 측정소 기준)</span>
                        </p>
                    </InfoInteraction>
                    <Time refresh onClick={refreshHandle} right="0" />
                </InfoWrap>
                <Container>
                    <Part>
                        <PartTitle>오늘의 대기질</PartTitle>
                        <PartUl>
                            <PartLi>
                                <span><strong>초미세먼지</strong>(PM-2.5)</span>
                                <img src={`/images/main/img_na0${pm25.stateIndex}.webp`} alt="대기질" />
                                <span style={{color: pm25.stateHex}}>
                                    <strong className="colorValue">{location.pm25Value || '-'}</strong>
                                    <small style={{color: 'initial'}}>㎍/㎥</small>
                                    {pm25.stateText}
                                </span>
                            </PartLi>
                            <PartLi>
                                <span><strong>미세먼지</strong>(PM-10)</span>
                                <img src={`/images/main/img_na0${pm10.stateIndex}.webp`} alt="대기질" />
                                <span style={{color: pm10.stateHex}}>
                                    <strong className="colorValue">{location.pm10Value || '-'}</strong>
                                    <small style={{color: 'initial'}}>㎍/㎥</small>
                                    {pm10.stateText}
                                    </span>
                            </PartLi>
                            <PartLi>
                                <span><strong>오존</strong>(O<sub>3</sub>)</span>
                                <img src={`/images/main/img_na0${o3.stateIndex}.webp`} alt="대기질" />
                                <span style={{color: o3.stateHex}}>
                                    <strong className="colorValue">{location.o3Value === null ? '-' : String(location.o3Value).padEnd(6, '0')}</strong>
                                    <small style={{color: 'initial'}}>ppm</small>
                                    {o3.stateText}
                                </span>
                            </PartLi>
                        </PartUl>
                    </Part>
                    <Part>
                        <PartTitle>대기정보 예보</PartTitle>
                        <PartUl>
                            <AirForecastLi>
                                <p></p>
                                <span><strong>초미세먼지</strong>(PM-2.5)</span>
                                <span><strong>미세먼지</strong>(PM-10)</span>
                            </AirForecastLi>
                            <AirForecastLi>
                                <p>오늘</p>
                                <span className={`miniText miniTextIco_${pm25.todayIndex}`} style={{color: airState(pm25.todayState)[1]}}>{pm25.todayState}</span>
                                <span className={`miniText miniTextIco_${pm10.todayIndex}`} style={{color: airState(pm10.todayState)[1]}}>{pm10.todayState}</span>
                            </AirForecastLi>
                            <AirForecastLi>
                                <p>내일</p>
                                <span className={`miniText miniTextIco_${pm25.tomorrowIndex}`} style={{color: airState(pm25.tomorrowState)[1]}}>{pm25.tomorrowState}</span>
                                <span className={`miniText miniTextIco_${pm10.tomorrowIndex}`} style={{color: airState(pm10.tomorrowState)[1]}}>{pm10.tomorrowState}</span>
                            </AirForecastLi>
                        </PartUl>
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
                                    <div onClick={legendClickHandle} type="khaiValue">통합대기환경지수 (CAI)</div>
                                    <div onClick={legendClickHandle} type="pm25Value">초미세먼지 (PM-2.5)</div>
                                    <div onClick={legendClickHandle} type="pm10Value">미세먼지 (PM-10)</div>
                                </div>
                                <div className="legendFlex">
                                    <div onClick={legendClickHandle} type="o3Value">오존 (O<sub>3</sub>)</div>
                                    <div onClick={legendClickHandle} type="no2Value">이산화질소 (NO<sub>2</sub>)</div>
                                    <div onClick={legendClickHandle} type="coValue">일산화탄소 (CO)</div>
                                    <div onClick={legendClickHandle} type="so2Value">아황산가스 (SO<sub>2</sub>)</div>
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

export default TodayAirQuaility;
