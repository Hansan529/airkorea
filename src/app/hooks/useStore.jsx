import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set, get) => ({
        getFetch: async (target, url) => {
            const response = await fetch(url)
            set({[target]: await response.json()})
        },
        postFetch: async (target, url, value) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if(!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다.');
            set({[target]: await response.json()});
        },

        // update
        update: '0000-00-00',

        // 측정소 값 데이터, 텍스트
        data: null,
        text: null,

        // fetch 상태
        dataFetchBoolean: false,
        textFetchBoolean: false,
        stationFetchBoolean: false,

        // 상태 변경자
        changer: (target, value) => set(() => ({[target]: value})),

        // 출력 타입 khai, pm25, pm10, o3, no2, co, so2
        type: 'khaiValue',

        // regionNum: 서울02, 경기031, 인천032, 강원, 충남, 대전, 충북, 세종, 부산, 울산, 대구, 경북, 경남, 전남, 광주, 전북, 제주
        regionNum: '0',

        // 대기정보(air) / 측정소(station) 정보
        selectInfo: 'air',

        // 우리동네 대기정보 측정소 데이터
        station: {
            "dmX": "37.564639",
            "item": "SO2, CO, O3, NO2, PM10, PM2.5",
            "mangName": "도시대기",
            "year": "1995",
            "city": "서울특별시",
            "addr": "서울 중구 덕수궁길 15",
            "building": "시청서소문별관 3동",
            "stationName": "중구",
            "dmY": "126.975961",
            "top": "136",
            "left": "264",
            "innerTop": "248.594",
            "innerLeft": "235.531"
        },

        nearStation: [{
            "tm": 0.4,
            "addr": "서울 중구 덕수궁길 15 시청서소문별관 3동",
            "stationName": "중구"
        },
        {
            "tm": 1.5,
            "addr": "서울 용산구 한강대로 405 (서울역 앞)",
            "stationName": "한강대로"
        },
        {
            "tm": 1.9,
            "addr": "서울 종로구 종로 169 (종묘주차장 앞)",
            "stationName": "종로"
        }],

        // 결과 필터
        // 농도 범위 필터링
        filterRange: [true, true, true, true, true],
        // 측정망 구분 필터링
        filterData: {도시대기: true, 국가배경농도: true, 도로변대기: true, 교외대기: false, 항만: false},

        // 상세 지역 Open/Close
        openMap: '0',

        // 데이터 로딩
        loading: false,
        }),
        {
            name: 'fetchStorage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

export default useStore;