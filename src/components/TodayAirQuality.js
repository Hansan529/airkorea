import styled from "@emotion/styled";
import { getColorValue } from "./MapPath";
import airQualityJson from "../data/todayDaily.json";
import dnsty from "../data/getCtprvnRltmMesureDnsty.json";
import forecastJSON from "../data/getMinuDustFrcstDspth.json";
import stationJson from "../data/stationInfo.json";
import { useState } from "react";

const { response: { body: { items : airQuality }}} = airQualityJson;
const filterQuality = airQuality.filter((item, index) => index < 4);

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

const Legend = styled.div`
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
        /* display: none; */
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

            &.on {
                border: 1px solid #0f62cc;
                color: #0f62cc;
            }
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

const Component = ({ stationName }) => {
        const { items: dnstyItems } = dnsty.response.body

        // 사용자 지역에 대한 대기 정보 수치 값
        const currentLocation = dnstyItems.find(el => el.stationName === stationName);
        // 사용자 지역에 가까운 측정소에 대한 정보
        const currentStationInfo = stationsInfo.find(item => item.stationName === currentLocation.stationName);

        // 경기북부, 경기남부 / 영동, 영서
        const gyeonggiBukList = ['고양시', '의정부시', '파주시', '양주시', '구리시', '남양주시', '동두천시', '포천시', '가평군', '연천군'];
        const gyeonggiBukCheck = gyeonggiBukList.some(list => currentStationInfo.addr.includes(list));

        const yeongdongList = ['강릉시', '삼척시', '동해시', '태백시', '속초시', '양양군', '고성군'];
        const yeongdongCheck = yeongdongList.some(list => currentStationInfo.addr.includes(list));

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

        const [state] = currentStationInfo.addr.split(' ');
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

        const colorList = ['#1c67d7','#01b56e','#937200','#c00d0d','#0a0a0a'];

        // 오늘의 대기질
        const pm25 = getColorValue(currentLocation.pm25Value, 'pm25Value')[3];
        const pm10 = getColorValue(currentLocation.pm10Value, 'pm10Value')[3];
        const o3 = getColorValue(currentLocation.o3Value, 'o3Value')[3];

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

    const [selectLegend, setSelectLegend] = useState('khai');
    const legendClickHandle = (e) => {
        const node = e.currentTarget;
        const { parentNode: { parentNode } } = node;
        const value = node.getAttribute('value');

        const nodeList = parentNode.querySelectorAll('.legendFlex');
        nodeList.forEach(div => {
            Array.from(div.children).forEach(child => {
                child.classList.remove('on');
            });
        });
        node.classList.add('on');
        setSelectLegend(value);
    }
    return (
        <Container>
            <Part>
                <h3>오늘의 대기질</h3>
                <ul>
                    <li>
                        <span><strong>초미세먼지</strong>(PM-2.5)</span>
                        <img src={`./img_na0${pm25Index}.png`} alt="대기질" />
                        <span style={{color: pm25}}>
                            <strong className="colorValue">{currentLocation.pm25Value}</strong>
                            <small style={{color: 'initial'}}>㎍/㎥</small>
                            {airState(colorList.indexOf(pm25))[0]}
                        </span>
                    </li>
                    <li>
                        <span><strong>미세먼지</strong>(PM-10)</span>
                        <img src={`./img_na0${pm10Index}.png`} alt="대기질" />
                        <span style={{color: pm10}}>
                            <strong className="colorValue">{currentLocation.pm10Value}</strong>
                            <small style={{color: 'initial'}}>㎍/㎥</small>
                            {airState(colorList.indexOf(pm10))[0]}
                            </span>
                    </li>
                    <li>
                        <span><strong>오존</strong>(O<sub>3</sub>)</span>
                        <img src={`./img_na0${o3Index}.png`} alt="대기질" />
                        <span style={{color: o3}}>
                            <strong className="colorValue">{String(currentLocation.o3Value).padEnd(6, '0')}</strong>
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
                        <span className={`miniText miniTextIco_${pm25TodayIndex}`} style={{color: airState(pm25Today)[1]}}>{pm25Today}</span>
                        <span className={`miniText miniTextIco_${pm10TodayIndex}`} style={{color: airState(pm10Today)[1]}}>{pm10Today}</span>
                    </li>
                    <li>
                        <p>내일</p>
                        <span className={`miniText miniTextIco_${pm25TomorrowIndex}`} style={{color: airState(pm25Tomorrow)[1]}}>{pm25Tomorrow}</span>
                        <span className={`miniText miniTextIco_${pm10TomorrowIndex}`} style={{color: airState(pm10Tomorrow)[1]}}>{pm10Tomorrow}</span>
                    </li>
                </AirForecastUl>
            </Part>
            <Legend>
                <button>범례보기</button>
                <div className="legendPopup">
                    <div className="legendTitle">
                        <h2>범례보기</h2>
                        <button>나가기</button>
                    </div>
                    <div>
                        <div className="legendFlex">
                            <div onClick={legendClickHandle} className="on" value="khai">통합대기환경지수 (CAI)</div>
                            <div onClick={legendClickHandle} value="pm25">초미세먼지 (PM-2.5)</div>
                            <div onClick={legendClickHandle} value="pm10">미세먼지 (PM-10)</div>
                        </div>
                        <div className="legendFlex">
                            <div onClick={legendClickHandle} value="o3">오존 (O<sub>3</sub>)</div>
                            <div onClick={legendClickHandle} value="no2">이산화질소 (NO<sub>2</sub>)</div>
                            <div onClick={legendClickHandle} value="co">일산화탄소 (CO)</div>
                            <div onClick={legendClickHandle} value="so2">아황산가스 (SO<sub>2</sub>)</div>
                        </div>
                        <ul>
                        </ul>
                    </div>
                </div>
            </Legend>
        </Container>
    )
}

export default Component;