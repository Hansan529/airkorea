import styled from "@emotion/styled";
import stationJson from "../data/stationInfo.json";
import { useEffect, useRef, useState } from "react";
import { InfoContainer, InfoWrapper, InfoButton, InfoInteraction, Container, Part, LegendBase, AirForecastUl } from "../styleComponent";
import useStore from "../hooks/useStore";
import useAirQualityStore from "../hooks/useAirQualityStore";
import getColorValue from "../functions/getColorValue.ts";

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

/**
 * childrenComponents: <Time />
 * station
 * setStation
 * loading
 * airData
 * counts={count, setCount}
 * forecast
 */
const TodayAirQuaility = ({Time, counts: {count, setCount}}) => {
    const { data, text, station, loading } = useStore(state => state);
    const { pm10, pm10AddBoolean, 
            pm25, pm25AddBoolean,
            o3, o3AddBoolean,
            currentLocation: location, currentLocationInsert, 
            changer,
            } = useAirQualityStore(state => state);

    const stationsInfo = stationJson.items;
    const legendPopupRef = useRef();
    
    // 범례 보기(true) / 닫기(false)
    const [legendPopupState, setLegendPopupState] = useState(false);
    // 범례 종류 선택: khai, pm25, pm10, o3, no2, co, so2
    const [selectLegend, setSelectLegend] = useState('khai');
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
        if(value === 0 || value === '좋음'){
            return ['좋음', colorList[0], 1];
        } else if(value === 1 || value === '보통'){
            return ['보통', colorList[1], 2];
        } else if(value === 2 || value === '나쁨'){
            return ['나쁨', colorList[2], 3];
        } else if(value === 3 || value === '매우나쁨'){
            return ['매우나쁨', colorList[3], 4];
        } else {
            return ['데이터 없음', colorList[4], 5];
        }
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
    
        if(!pm25AddBoolean){
            changer('pm25AddBoolean', !pm25AddBoolean);
            changer('pm25', {stateHex: pm25Color, stateText: pm25Text, stateIndex: pm25Index, todayState: pm25Today, todayIndex: pm25TodayIndex, tomorrowIndex: pm25TomorrowIndex, tomorrowState: pm25Tomorrow});
        };
        if(!pm10AddBoolean){
            changer('pm10AddBoolean', !pm10AddBoolean);
            changer('pm10', {stateHex: pm10Color, stateText: pm10Text, stateIndex: pm10Index, todayState: pm10Today, todayIndex: pm10TodayIndex, tomorrowIndex: pm10TomorrowIndex, tomorrowState: pm10Tomorrow});
        };
        if(!o3AddBoolean){
            changer('o3AddBoolean', !o3AddBoolean);
            changer('o3', {stateHex: o3Color, stateText: o3Text, stateIndex: o3Index, todayIndex: 5, tomorrowIndex: '-', tomorrowState: 5});
        }
        if(!currentLocationInsert){
            changer('currentLocationInsert', !currentLocationInsert);
            changer('currentLocation', currentLocation);
        };
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, data])
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
    `;
    // ---------------------------------------------------- Event
    const refreshBtn = () => setCount(count + 1);
    const legendClickHandle = (e) => {
        const node = e.currentTarget;
        const value = node.dataset.value;

        setSelectLegend(value);
        setLegendRange(getColorValue(0, value, true));
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
    // const TimeComponent = props.childrenComponents.Time;

    return (
        <InfoContainer>
            <InfoWrapper>
                <div>
                    <h2>우리동네 <span>대기정보</span></h2>
                </div>
                <div>
                <InfoInteraction>
                    {/* <InfoButton ico={'bg_search'}>검색</InfoButton> */}
                    <InfoButton ico={'pos'} onClick={refreshBtn}>현위치</InfoButton>
                    <p>
                    <strong>{station.stationName}</strong> 중심으로 측정
                    <span>({`${station.addr.split(' ')[0]} ${station.addr.split(' ')[1]} ${station.stationName}`} 측정소 기준)</span>
                    </p>
                </InfoInteraction>
                <Time refresh onClick={refreshBtn} />
                </div>
            <Container>
                <Part>
                    <h3>오늘의 대기질</h3>
                    <ul>
                        <li>
                            <span><strong>초미세먼지</strong>(PM-2.5)</span>
                            <img src={`./img_na0${pm25.stateIndex}.png`} alt="대기질" />
                            <span style={{color: pm25.stateHex}}>
                                <strong className="colorValue">{location.pm25Value || '-'}</strong>
                                <small style={{color: 'initial'}}>㎍/㎥</small>
                                {pm25.stateText}
                            </span>
                        </li>
                        <li>
                            <span><strong>미세먼지</strong>(PM-10)</span>
                            <img src={`./img_na0${pm10.stateIndex}.png`} alt="대기질" />
                            <span style={{color: pm10.stateHex}}>
                                <strong className="colorValue">{location.pm10Value || '-'}</strong>
                                <small style={{color: 'initial'}}>㎍/㎥</small>
                                {pm10.stateText}
                                </span>
                        </li>
                        <li>
                            <span><strong>오존</strong>(O<sub>3</sub>)</span>
                            <img src={`./img_na0${o3.stateIndex}.png`} alt="대기질" />
                            <span style={{color: o3.stateHex}}>
                                <strong className="colorValue">{location.o3Value === null ? '-' : String(location.o3Value).padEnd(6, '0')}</strong>
                                <small style={{color: 'initial'}}>ppm</small>
                                {o3.stateText}
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
                            <span className={`miniText miniTextIco_${pm25.todayIndex}`} style={{color: airState(pm25.todayState)[1]}}>{pm25.todayState}</span>
                            <span className={`miniText miniTextIco_${pm10.todayIndex}`} style={{color: airState(pm10.todayState)[1]}}>{pm10.todayState}</span>
                        </li>
                        <li>
                            <p>내일</p>
                            <span className={`miniText miniTextIco_${pm25.tomorrowIndex}`} style={{color: airState(pm25.tomorrowState)[1]}}>{pm25.tomorrowState}</span>
                            <span className={`miniText miniTextIco_${pm10.tomorrowIndex}`} style={{color: airState(pm10.tomorrowState)[1]}}>{pm10.tomorrowState}</span>
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

export default TodayAirQuaility;
