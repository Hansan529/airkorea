require('dotenv').config();

const express = require("express");
const axios = require("axios");
const router = express.Router();

// # 측정소 별 대기 데이터
router.get('/data', async (req, res) => {
    console.log('data: ');
    try {
        const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&returnType=json&numOfRows=700&pageNo=1&sidoName=전국&ver=1.0`)).data;
        return res.json(items);
    } catch(err) {
        console.error("error: ", err);
        return res.json(false);
    }
});

// # 대기 예보 텍스트
router.get('/text', async (req, res) => {
    console.log('text: ');
    try {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const hour = today.getHours();

        let result;

        if(hour < 5) {
            result = `${year}.${month}.${day-1}`;
        } else {
            result = `${year}.${month}.${day}`;
        }

        const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&returnType=json&numOfRows=700&pageNo=1&searchDate=${result}`)).data;
        return res.json(items);
    } catch(err) {
        console.error("error: ", err);
        return res.json(false);
    }
});

// # 접속 기기의 좌표를 TM 형식 좌표로 변경
router.get('/coordinate', async (req, res) => {
    console.log('coordinate: ');
    try{
        const { latitude, longitude } = req.query;
        const response = await (await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${longitude}&y=${latitude}&input_coord=WGS84&output_coord=TM`, { headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API}`}})).data;
        return res.json(response);
    }catch(err){
        console.error("error: ", err);
        return res.status(404).send('not found');
    }
})

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
router.get('/getMsrstnAcctoRDyrg', async (req, res) => {
    console.log('날짜별 조회');
    try {
        const { inqBginDt, inqEndDt, stationName } = req.query;
        const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${process.env.REACT_APP_OPENAPI_SERVICEKEY}&returnType=json&numOfRows=1000&pageNo=1&stationName=${stationName}&dataTerm=3MONTH`)).data;
        return res.json(items);
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
