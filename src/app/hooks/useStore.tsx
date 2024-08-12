import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

interface DataItem {
    dmX: string;
    item: string;
    mangName: string;
    year: string;
    city: string;
    addr: string;
    building: string;
    stationName: string;
    dmY: string;
    top: string;
    left: string;
    innerTop: string;
    innerLeft: string;
};

interface TextItem {
    dataTime: string;
    informCode: string;
    informOverall: string;
    informCause: string;
    informGrade: string;
    actionKnack: any;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    imageUrl5: string;
    imageUrl6: string;
    imageUrl7?: string;
    imageUrl8?: string;
    imageUrl9?: string;
    informData: string;
};

interface StoreState {
    getFetch: (target: string, url: string) => Promise<void>;
    postFetch: (target: string, url: string, value: any) => Promise<void>;
    update: string;
    data: DataItem[] | null;
    text: TextItem[] | null;
    dataFetchBoolean: boolean;
    textFetchBoolean: boolean;
    stationFetchBoolean: boolean;
    changer: (target: string, value: any) => void;
    type: string;
    regionNum: string;
    selectInfo: string;
    station: DataItem;
    nearStation: NearStation[];
    filterRange: boolean[];
    filterData: FilterData;
    openMap: string;
    loading: boolean;
    currentDate: Date;
    currentYear: number;
    currentMonth: number;
    currentDay: number;
    setCurrentDate: (newDate: Date) => void;
    setCurrentYear: (year: number) => void;
    setCurrentMonth: (month: number) => void;
    setCurrentDay: (day: number) => void;
};

interface NearStation {
    tm: number;
    addr: string;
    stationName: string;
};

interface FilterData {
    도시대기: boolean;
    국가배경농도: boolean;
    도로변대기: boolean;
    교외대기: boolean;
    항만: boolean;
};


const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
        getFetch: async (target: string, url: string) => {
            const response = await fetch(url);
            const data = await response.json();
            set({[target]: data});
        },
        postFetch: async (target: string, url: string, value: any) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });
            if(!response.ok) throw new Error('네트워크 응답에 문제가 발생했습니다.');
            const data = await response.json();
            set({[target]: data});
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
        changer: (target: string, value: any) => set(() => ({[target]: value})),

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

        nearStation: [
            { "tm": 0.4, "addr": "서울 중구 덕수궁길 15 시청서소문별관 3동", "stationName": "중구" },
            { "tm": 1.5, "addr": "서울 용산구 한강대로 405 (서울역 앞)", "stationName": "한강대로" },
            { "tm": 1.9, "addr": "서울 종로구 종로 169 (종묘주차장 앞)", "stationName": "종로" }
        ],

        // 농도 범위 필터링
        filterRange: [true, true, true, true, true],
        // 측정망 구분 필터링
        filterData: {도시대기: true, 국가배경농도: true, 도로변대기: true, 교외대기: false, 항만: false},

        // 상세 지역 Open/Close
        openMap: '0',

        // 데이터 로딩
        loading: false,

        // 금일
        currentDate: new Date('2024-08-07'),
        currentYear: new Date('2024-08-07').getFullYear(),
        currentMonth: new Date('2024-08-07').getMonth(),
        currentDay: new Date('2024-08-07').getDate(),

        setCurrentDate: (newDate: Date) => {
          set({
            currentDate: newDate,
            currentYear: newDate.getFullYear(),
            currentMonth: newDate.getMonth(),
            currentDay: newDate.getDate(),
          });
        },
        setCurrentYear: (year: number) => {
          set((state) => {
            const newDate = new Date(state.currentDate);
            newDate.setFullYear(year);
            return {
              currentDate: newDate,
              currentYear: year,
            }
          })
        },
        setCurrentMonth: (month: number) => {
          set((state) => {
            const newDate = new Date(state.currentDate);
            newDate.setMonth(month);
            return {
              currentDate: newDate,
              currentMonth: month,
            }
          })
        },
        setCurrentDay: (day: number) => {
          set((state) => {
            const newDate = new Date(state.currentDate);
            newDate.setDate(day);
            return {
              currentDate: newDate,
              currentDay: day,
            }
          })
        }
        }),
        {
            name: 'fetchStorage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)

export default useStore;
