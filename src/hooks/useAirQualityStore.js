import { create } from "zustand"

const preset = {stateHex: '#0a0a0a', stateText: '-', stateIndex: 5, todayIndex: 5, todayState: '-', tomorrowIndex: 5, tomorrowState: '-'};

const useAirQualityStore = create((set) => ({
    currentLocation: {
        coValue: null,
        dataTime: null,
        khaiValue: null,
        no2Value: null,
        o3Value: null,
        pm10Value: null,
        pm25Value: null,
        sidoName: null,
        so2Value: null,
        stationName: null,
    },
    pm10: preset,
    pm25: preset,
    o3: preset,

    changer: (target, value) => set((state) => ({[target]: value})),
}));

export default useAirQualityStore;