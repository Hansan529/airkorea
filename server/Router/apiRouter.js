require('dotenv').config();

const express = require("express");
const axios = require("axios");
const router = express.Router();

// # 가까운 측정소 찾기
router.get('/station', async (req, res) => {
    console.log('station: ');
    try {
        const { x, y } = req.query;
        const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&returnType=json&tmX=${x}&tmY=${y}&ver=1.1`)).data;
        return res.json(items);
    } catch(err) {
        console.error("error: ", err);
        return res.json(false);
    }
})

// # 측정소 별 대기 오염 통계 현황 (날짜 조회)
router.get('/neighborhood', async (req, res) => {
    console.log('날짜별 조회');
    try {
        const { inqBginDt, inqEndDt, stationName, type } = req.query;

        // Fixme: 클라이언트에서 요청한 날짜가 있는 경우, API 요청을 진행하지 않도록 수정 (서버 작업 -> 클라이언트)
        // 서버는 전체 items을 return 하도록 변경
        let response = {};
        if(type === 'time' || type === 'total') {
            /**
             * getMsrstnAcctoRltmMesureDnsty
             * ❔ 버전 1.0을 호출할 경우 : PM2.5 데이터가 포함된 결과 표출.
             * ❔ 버전 1.1을 호출할 경우 : PM10, PM2.5 24시간 예측이동 평균데이터가 포함된 결과 표출.
             * ❔ 버전 1.2을 호출할 경우 : 측정망 정보 데이터가 포함된 결과 표출.
             * ❔ 버전 1.3을 호출할 경우 : PM10, PM2.5 1시간 등급 자료가 포함된 결과 표출
             * ❔ 버전 1.4을 호출할 경우 : 측정소명, 측정소 코드 정보가 포함된 결과 표출
             * ✅ 버전 1.5을 호출할 경우 : 측정값 소수점 아래 자리 수 확대 (CO : 1 → 2, O3/SO2/NO2 : 3 → 4)
             */
            const ver = type === 'time' ? 1.5 : 1.1;
            const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&returnType=json&numOfRows=1000&pageNo=1&stationName=${stationName}&dataTerm=3MONTH&ver=${ver}`)).data;
            response = items;
        } else {
            const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg?serviceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&returnType=json&numOfRows=1000&pageNo=1&inqBginDt=${inqBginDt}&inqEndDt=${inqEndDt}&msrstnName=${stationName}`)).data;
            response = items;
        }
        return res.json(response);
    } catch(err) {
        console.error("error: ", err);
        return res.json(false);
    }
})

// router.get('/getWthrSituation', async (req, res) => {
//     console.log('getWthrSituation: ');
//     try {
//         const {response: {body: { items }}} = await (await axios.get(`http://apis.data.go.kr/1360000/VilageFcstMsgService/getWthrSituation?ServiceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&pageNo=1&numOfRows=1&dataType=JSON&stnId=108`)).data
//         return res.json(items);
//     }catch(err) {
//         console.error('error: ', err);;
//         return res.json(false);
//     }
// })

module.exports = router;
