import { useEffect, useState } from "react"

export const RealTimeWeather = () => {
    // const [weatherData, setWeatherData] = useState(null);

    // useEffect(() => {
    //     if(!weatherData){
    //         (async () => {
    //             const {item} = await (await axios.get('http://localhost:3500/api/getWthrSituation')).data;
    //             const [data] = item;
    //             setWeatherData(data);
    //             localStorage.setItem('weather', JSON.stringify(data));
    //         })();
    //     }
    // }, [weatherData]);


    return (
        <div>
             "□ (종합) 오늘 전국 비, 일부 서해안과 남해안, 제주도 중심 강한 비, 강풍, 풍랑 유의\n  ○ (오늘) 전국 대체로 흐리고 충남서해안과 전라권, 경남서부, 제주도 비,\n            아침(06~09시)에 수도권과 충남권내륙, 경북남서내륙, 오전(09~12시)부터 낮(12~15시) 사이 그 밖의 전국으로 비 확대,\n            밤(18~24시) 서쪽 지역 중심 소강상태 보이는 곳 많겠음\n  ○ (내일) 전국 대체로 흐리다가 낮부터 맑아짐,\n            전국 대부분 비 오다가 아침(06~09시)에 그치겠으나, 강원내륙.산지와 충청권남부내륙 오전(09~12시)까지, 경상권 오후(12~18시)까지 이어지는 곳,\n            소강상태 보이는 곳 많겠음\n  ○ (모레) 전국 대체로 맑음\n\n* 예상 강수량(15~16일)\n- (수도권) 인천.경기북서부, 서해5도: 20~60mm/ 서울.경기(북서부 제외): 10~40mm\n- (강원도) 강원내륙.산지: 5~30mm/ 강원동해안(15일): 5~10mm\n- (충청권) 대전.세종.충남: 10~40mm/ 충북: 5~40mm\n- (전라권) 광주.전남: 20~60mm(많은 곳 남해안, 지리산부근 80mm 이상)/ 전북: 10~60mm\n- (경상권) 부산.울산.경남: 20~60mm(많은 곳 남해안, 지리산부근 80mm 이상)/ 대구.경북: 5~40mm/ 울릉도.독도: 5~10mm\n- (제주도) 제주도(북부 제외): 20~70mm(많은 곳 제주도산지 80mm 이상)/ 제주도북부: 10~40mm",
        </div>
    )
}
