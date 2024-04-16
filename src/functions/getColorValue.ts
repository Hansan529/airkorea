/**
 * 대기 정보 목록
 * 좋음 (0~50): #d0ecff / #7ed6ff
 * 보통 (51~100): #caf2de / #94edbc
 * 나쁨 (101~250): #f8f7c6 / #ffeb8b
 * 매우나쁨 (251~): #ffd6da / #ffc1c5
 * 데이터없음: #cbd0d3 / #c1c5c7
 */

type RangeValues = {
  khaiValue: [number, number, number, number, number, number, number];
  pm25Value: [number, number, number, number, number, number, number];
  pm10Value: [number, number, number, number, number, number, number];
  o3Value: [number, number, number, number, number, number, number];
  no2Value: [number, number, number, number, number, number, number];
  coValue: [number, number, number, number, number, number, number];
  so2Value: [number, number, number, number, number, number, number];
};

// typeRangeValue | default, hover, button, textColor, step
const getColorValue = (value: number, type: keyof RangeValues, rangeValueShow?: boolean) => {
    const typeRangeValue: RangeValues = {
      khaiValue: [1, 50, 51, 100, 101, 250, 251],
      pm25Value: [1, 15, 16, 35, 36, 75, 76],
      pm10Value: [1, 30, 31, 80, 81, 150, 151],
      o3Value: [0, 0.0309, 0.031, 0.0909, 0.091, 0.01509, 0.151],
      no2Value: [0, 0.03, 0.031, 0.06, 0.061, 0.2, 0.201],
      coValue: [0, 2, 2.1, 9, 8.1, 15, 15.1],
      so2Value: [0, 0.02, 0.021, 0.05, 0.051, 0.15, 0.151],
    };
  
    const index = Object.keys(typeRangeValue)?.indexOf(type);
    const values = Object.values(typeRangeValue)[index];
  
    if(rangeValueShow){
      return typeRangeValue[type];
    };
  
    if (value >= values[0] && value <= values[1]) {
      return ['#d0ecff', '#7ed6ff', '#6ac8fe', '#1c67d7', 1];
    } else if (value >= values[2] && value <= values[3]) {
      return ['#caf2de', '#94edbc', '#59e494', '#01b56e', 2];
    } else if (value >= values[4] && value <= values[5]) {
      return ['#f8f7c6', '#ffeb8b', '#ffda58', '#937200', 3];
    } else if (value >= values[6]) {
      return ['#ffd6da', '#ffc1c5', '#ffa8a8', '#c00d0d', 4];
    } else {
      return ['#cbd0d3', '#c1c5c7', '#abb0b3', '#0a0a0a', 5];
    }
  };

export default getColorValue;