require('dotenv').config();

const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post('/coordinate', async (req, res) => {
    try{
        const { latitude, longitude } = req.body;
        const response = await (await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${longitude}&y=${latitude}&input_coord=WGS84&output_coord=TM`, { headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API}`}})).data;
        return res.json(response);
    }catch(err){
        console.error("error: ", err);
        return res.end();
    }
})

router.post('/station', async (req, res) => {
    try {
        const { x, y } = req.body;
        const {response: { body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=${process.env.REACT_APP_AIRKOREA_SERVICEKEY}&returnType=json&tmX=${x}&tmY=${y}&ver=1.1`)).data;
        return res.json(items)
    } catch(err) {
        console.error("error: ", err);
        return res.end();
    }
})

router.get('/getCtprvnRltmMesureDnsty', async (req, res) => {
    try {
        const {response: {body: { items }}} = await (await axios.get(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${process.env.REACT_APP_AIRKOREA_SERVICEKEY}&returnType=json&numOfRows=700&pageNo=1&sidoName=전국&ver=1.0`)).data;
        return res.json(items);
    } catch(err) {
        console.error("error: ", err);
        return res.end;
    }
})

module.exports = router;