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
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

// ~ Json
import stationJson from "../data/stationInfo.json";

// ~ Hooks
import useStore from "../hooks/useStore.jsx";
import useAirQualityStore from "../hooks/useAirQualityStore.jsx";
import getColorValue from "../functions/getColorValue.ts";

// ~ Style
import { TodayAirQualityAirForecastLi, TodayAirQualityContainer, TodayAirQualityInfoButton, TodayAirQualityInfoContainer, TodayAirQualityInfoInteraction, TodayAirQualityInfoWrap, TodayAirQualityInfoWrapper, TodayAirQualityLegendBase, TodayAirQualityPart, TodayAirQualityPartLi, TodayAirQualityPartTitle, TodayAirQualityPartUl, TodayAirQualityTitle, TodayAirQualityTitleWrap } from "../StyleComponent.jsx";

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

// @@@ 출력 컴포넌트 @@@
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
    const [legendRange, setLegendRange] = useState(getColorValue(0, {type: `khaiValue`, boolean: true}));
    // pm25


    
    // function
    /**
     *
     * @param {number|string} 값
     * @returns {Array} [상태, 색상코드, 인덱스]
    */
    const airState = (value) => {
        const results = ['좋음', '보통', '나쁨', '매우나쁨', '데이터 없음'];
        const colorList = ['#1c67d7','#01b56e','#937200','#c00d0d','#0a0a0a'];

        switch(value) {
            case 0:
            case '좋음':
            case '#1c67d7':
                return [results[0], 1, colorList[0]];
            case 1:
            case '보통':
            case'#01b56e':
                return [results[1], 2, colorList[1]];
            case 2:
            case '나쁨':
            case '#937200':
                return [results[2], 3, colorList[2]];
            case 3:
            case '매우나쁨':
            case '#c00d0d': 
                return [results[3], 4, colorList[3]];
            default:
                return [results[4], 5, colorList[4]];
        }
    };

    useEffect(() => {
        // 사용자 지역에 대한 대기 예측 정보
        const objectCurrentStationInfo = {
            pm10Today: {},
            pm10Tomorrow: {},
            pm25Today: {},
            pm25Tomorrow: {},
        };

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
            let { pm25Grade, pm10Grade, o3Grade } = currentLocation;
            if(!pm25Grade) [,,,,pm25Grade] = getColorValue(0, {value: currentLocation?.pm25Value, type: 'pm25Value'});
            if(!pm10Grade) [,,,,pm10Grade] = getColorValue(0, {value: currentLocation?.pm10Value, type: 'pm10Value'});
            if(!o3Grade) [,,,,o3Grade] = getColorValue(0, {value: currentLocation?.o3Value, type: 'o3Value'});

            const pm25Data = getColorValue(pm25Grade);
            const pm10Data = getColorValue(pm10Grade);
            const o3Data = getColorValue(o3Grade);

            const {gradeText: pm25Text, textColor: pm25Color} = pm25Data;
            const {gradeText: pm10Text, textColor: pm10Color} = pm10Data;
            const {gradeText: o3Text, textColor: o3Color} = o3Data;

            // 대기정보 예보
            const pm25Today = objectCurrentStationInfo.pm25Today[stateNickname];
            const pm10Today = objectCurrentStationInfo.pm10Today[stateNickname];

            const [ , pm25TodayIndex] = airState(pm25Today);
            const [ , pm10TodayIndex] = airState(pm10Today);

            const pm25Tomorrow = objectCurrentStationInfo.pm25Tomorrow[stateNickname];
            const pm10Tomorrow = objectCurrentStationInfo.pm10Tomorrow[stateNickname];

            const [, pm25TomorrowIndex] = airState(pm25Tomorrow);
            const [, pm10TomorrowIndex] = airState(pm10Tomorrow);

            const parameters = [
                { key: 'pm25', color: pm25Color, text: pm25Text, index: pm25Grade, today: pm25Today, todayIndex: pm25TodayIndex, tomorrowIndex: pm25TomorrowIndex, tomorrow: pm25Tomorrow },
                { key: 'pm10', color: pm10Color, text: pm10Text, index: pm10Grade, today: pm10Today, todayIndex: pm10TodayIndex, tomorrowIndex: pm10TomorrowIndex, tomorrow: pm10Tomorrow },
                { key: 'o3', color: o3Color, text: o3Text, index: o3Grade, todayIndex: 5, tomorrowIndex: '-', tomorrow: 5 }
                ];

            parameters.forEach(param => airQualityChanger(param.key, {
                stateHex: param.color,
                stateText: param.text,
                stateIndex: param.index,
                todayState: param.today,
                todayIndex: param.todayIndex,
                tomorrowIndex: param.tomorrowIndex,
                tomorrowState: param.tomorrow
            }));
            airQualityChanger('currentLocation', currentLocation);
        };
    }, [text, data, airQualityChanger, station, stationsInfo])
    // ---------------------------------------------------- Dyanmic Styled
    const Legend = styled(TodayAirQualityLegendBase)`
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
        <TodayAirQualityInfoContainer>
            <TodayAirQualityInfoWrapper>
                <TodayAirQualityTitleWrap>
                    <TodayAirQualityTitle>우리동네 <span>대기정보</span></TodayAirQualityTitle>
                </TodayAirQualityTitleWrap>
                <TodayAirQualityInfoWrap>
                    <TodayAirQualityInfoInteraction>
                        <TodayAirQualityInfoButton ico={'pos'} onClick={remeasureHandle}>현위치</TodayAirQualityInfoButton>
                        <p>
                            <strong>{station.stationName}</strong> 중심으로 측정
                            <span>({`${station.addr.split(' ')[0]} ${station.addr.split(' ')[1]} ${station.stationName}`} 측정소 기준)</span>
                        </p>
                    </TodayAirQualityInfoInteraction>
                    <Time refresh onClick={refreshHandle} right="0" />
                </TodayAirQualityInfoWrap>
                <TodayAirQualityContainer>
                    <TodayAirQualityPart>
                        <TodayAirQualityPartTitle>오늘의 대기질</TodayAirQualityPartTitle>
                        <TodayAirQualityPartUl>
                            <TodayAirQualityPartLi>
                                <span><strong>초미세먼지</strong>(PM-2.5)</span>
                                <img src={`/images/main/img_na0${pm25.stateIndex}.webp`} alt="대기질" />
                                <span style={{color: pm25.stateHex}}>
                                    <strong className="colorValue">{location.pm25Value || '-'}</strong>
                                    <small style={{color: 'initial'}}>㎍/㎥</small>
                                    {pm25.stateText}
                                </span>
                            </TodayAirQualityPartLi>
                            <TodayAirQualityPartLi>
                                <span><strong>미세먼지</strong>(PM-10)</span>
                                <img src={`/images/main/img_na0${pm10.stateIndex}.webp`} alt="대기질" />
                                <span style={{color: pm10.stateHex}}>
                                    <strong className="colorValue">{location.pm10Value || '-'}</strong>
                                    <small style={{color: 'initial'}}>㎍/㎥</small>
                                    {pm10.stateText}
                                    </span>
                            </TodayAirQualityPartLi>
                            <TodayAirQualityPartLi>
                                <span><strong>오존</strong>(O<sub>3</sub>)</span>
                                <img src={`/images/main/img_na0${o3.stateIndex}.webp`} alt="대기질" />
                                <span style={{color: o3.stateHex}}>
                                    <strong className="colorValue">{location.o3Value === null ? '-' : String(location.o3Value).padEnd(6, '0')}</strong>
                                    <small style={{color: 'initial'}}>ppm</small>
                                    {o3.stateText}
                                </span>
                            </TodayAirQualityPartLi>
                        </TodayAirQualityPartUl>
                    </TodayAirQualityPart>
                    <TodayAirQualityPart>
                        <TodayAirQualityPartTitle>대기정보 예보</TodayAirQualityPartTitle>
                        <TodayAirQualityPartUl>
                            <TodayAirQualityAirForecastLi>
                                <p></p>
                                <span><strong>초미세먼지</strong>(PM-2.5)</span>
                                <span><strong>미세먼지</strong>(PM-10)</span>
                            </TodayAirQualityAirForecastLi>
                            <TodayAirQualityAirForecastLi>
                                <p>오늘</p>
                                <span className={`miniText miniTextIco_${pm25.todayIndex}`} style={{color: airState(pm25.todayState)[1]}}>{pm25.todayState}</span>
                                <span className={`miniText miniTextIco_${pm10.todayIndex}`} style={{color: airState(pm10.todayState)[1]}}>{pm10.todayState}</span>
                            </TodayAirQualityAirForecastLi>
                            <TodayAirQualityAirForecastLi>
                                <p>내일</p>
                                <span className={`miniText miniTextIco_${pm25.tomorrowIndex}`} style={{color: airState(pm25.tomorrowState)[1]}}>{pm25.tomorrowState}</span>
                                <span className={`miniText miniTextIco_${pm10.tomorrowIndex}`} style={{color: airState(pm10.tomorrowState)[1]}}>{pm10.tomorrowState}</span>
                            </TodayAirQualityAirForecastLi>
                        </TodayAirQualityPartUl>
                    </TodayAirQualityPart>
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
                </TodayAirQualityContainer>
            </TodayAirQualityInfoWrapper>
        </TodayAirQualityInfoContainer>
    )
}

export default TodayAirQuaility;
