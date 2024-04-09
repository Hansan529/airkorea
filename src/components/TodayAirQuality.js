import styled from "@emotion/styled";
import { getColorValue } from "./RealtimeStandby";
import stationJson from "../data/stationInfo.json";
import { useEffect, useRef, useState } from "react";
import { InfoContainer, InfoWrapper, InfoButton, InfoInteraction, Container, Part, LegendBase, AirForecastUl } from "../styleComponent";

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
 * setLoading
 * airData
 * counts={count, setCount}
 * forecast
 */
const Component = (props) => {
    const stationsInfo = stationJson.items;
    const legendPopupRef = useRef();
    
    // 범례 유형별 범위
    const [legendRange, setLegendRange] = useState([]);
    // 범례 보기(true) / 닫기(false)
    const [legendPopupState, setLegendPopupState] = useState(false);
    // 범례 종류 선택: khai, pm25, pm10, o3, no2, co, so2
    const [selectLegend, setSelectLegend] = useState('khai');

    // 예보 텍스트
    const forecast = props.forecast;
    const filterForecast = forecast.filter((item, index) => index < 4);

        useEffect(() => {
            legendPopupRef.current.focus();
        },[]);

        useEffect(() => {
            setLegendRange(getColorValue(0, `${selectLegend}Value`, true));
        }, [selectLegend]);

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
    const refreshHandleClick = () => props.counts.setCount(props.counts.count + 1);
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
                    {/* <InfoButton ico={'bg_search'}>검색</InfoButton> */}
                    <InfoButton ico={'pos'}>현위치</InfoButton>
                    <p>
                    <strong>{props.station.stationName || '중구'}</strong> 중심으로 측정
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
                            <img src={`./img_na0${pm25Index || 5}.png`} alt="대기질" />
                            <span style={{color: pm25}}>
                                <strong className="colorValue">{currentLocation?.pm25Value || '-'}</strong>
                                <small style={{color: 'initial'}}>㎍/㎥</small>
                                {airState(colorList.indexOf(pm25))[0]}
                            </span>
                        </li>
                        <li>
                            <span><strong>미세먼지</strong>(PM-10)</span>
                            <img src={`./img_na0${pm10Index || 5}.png`} alt="대기질" />
                            <span style={{color: pm10}}>
                                <strong className="colorValue">{currentLocation?.pm10Value || '-'}</strong>
                                <small style={{color: 'initial'}}>㎍/㎥</small>
                                {airState(colorList.indexOf(pm10))[0]}
                                </span>
                        </li>
                        <li>
                            <span><strong>오존</strong>(O<sub>3</sub>)</span>
                            <img src={`./img_na0${o3Index || 5}.png`} alt="대기질" />
                            <span style={{color: o3}}>
                                <strong className="colorValue">{String(currentLocation?.o3Value).padEnd(6, '0') || '-'}</strong>
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
                            <span className={`miniText miniTextIco_${pm25TodayIndex || '5'}`} style={{color: airState(pm25Today)[1]}}>{pm25Today || '-'}</span>
                            <span className={`miniText miniTextIco_${pm10TodayIndex || '5'}`} style={{color: airState(pm10Today)[1]}}>{pm10Today || '-'}</span>
                        </li>
                        <li>
                            <p>내일</p>
                            <span className={`miniText miniTextIco_${pm25TomorrowIndex || '5'}`} style={{color: airState(pm25Tomorrow)[1]}}>{pm25Tomorrow || '-'}</span>
                            <span className={`miniText miniTextIco_${pm10TomorrowIndex || '5'}`} style={{color: airState(pm10Tomorrow)[1]}}>{pm10Tomorrow || '-'}</span>
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
