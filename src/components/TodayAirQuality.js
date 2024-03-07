import styled from "@emotion/styled";
import { getColorValue } from "./MapPath";
import airQualityJson from "../data/todayDaily.json";
import dnsty from "../data/getCtprvnRltmMesureDnsty.json";

const { response: { body: { items : airQuality }}} = airQualityJson;
const filterQuality = airQuality.filter((item, index) => index < 4);


/**
 * 금일 시간별 미세먼지
 * 대기오염정보: 측정소별  실시간 측정정보 조회(getMsrstnAcctoRltmMesureDnsty)
 * 
 * 일병 평균 미세먼지
 * 대기오염통계 현황: 측정소별 실시간 일평균 정보 조회(getMsrstnAcctoRDyrg)
 * 
 * 위도 경도 주변 측정소 찾기
 * 측정소정보: 근처측정소 목록 조회(getNearbyMsrstnList)
 */

const Container = styled.div`
    display: flex;
    gap: 0 15px;
`

const Part = styled.div`
    display: inline-block;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    flex-grow: 1;
    background-color: #eaedee;
    overflow: hidden;
    
    h3 {
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    
    ul{
        padding: 25px 0px;
        background-color: #fff;

        li {
            display: inline-block;
            text-align: center;
            width: 33.33%;
            box-sizing: border-box;

            &:not(:last-child){
                border-right: 0.5px solid rgba(0,0,0,0.3);
            }
    
            strong, small, span {
                display: block;
            margin-bottom: 5px;

                &:not(strong:first-child){
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

`

const Component = ({ stationName }) => {
        const { items: dnstyItems } = dnsty.response.body
        const currentLocation = dnstyItems.find(el => el.stationName === stationName);
        const colorList = ['#1c67d7','#01b56e','#937200','#c00d0d','#0a0a0a'];

        const pm25 = getColorValue(currentLocation.pm25Value, 'pm25Value')[3];
        const pm10 = getColorValue(currentLocation.pm10Value, 'pm10Value')[3];
        const o3 = getColorValue(currentLocation.o3Value, 'o3Value')[3];

        const airState = (value) => {
            switch(value){
                case 0:
                    return '좋음';
                case 1:
                    return '보통';
                case 2:
                    return '나쁨';
                case 3:
                    return '매우나쁨';
                default:
                    return '데이터 없음';
            }
        };

    const pm25Index = (colorList.indexOf(pm25) + 1) !== 0 ? colorList.indexOf(pm25) + 1 : 5;
    const pm10Index = (colorList.indexOf(pm10) + 1) !== 0 ? colorList.indexOf(pm10) + 1 : 5;
    const o3Index = (colorList.indexOf(o3) + 1) !== 0 ? colorList.indexOf(o3) + 1 : 5;

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
                            {airState(colorList.indexOf(pm25))}
                        </span>
                    </li>
                    <li>
                        <span><strong>미세먼지</strong>(PM-10)</span>
                        <img src={`./img_na0${pm10Index}.png`} alt="대기질" />
                        <span style={{color: pm10}}>
                            <strong className="colorValue">{currentLocation.pm10Value}</strong>
                            <small style={{color: 'initial'}}>㎍/㎥</small>
                            {airState(colorList.indexOf(pm10))}
                            </span>
                    </li>
                    <li>
                        <span><strong>오존</strong>(O3)</span>
                        <img src={`./img_na0${o3Index}.png`} alt="대기질" />
                        <span style={{color: o3}}>
                            <strong className="colorValue">{String(currentLocation.o3Value).padEnd(6, '0')}</strong>
                            <small style={{color: 'initial'}}>ppm</small>
                            {airState(colorList.indexOf(o3))}
                        </span>
                    </li>
                </ul>
            </Part>
            <Part>
                <h3>대기정보 예보</h3>
            </Part>
        </Container>
    )
}

export default Component;