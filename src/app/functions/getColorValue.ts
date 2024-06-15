type RangeValues = {
  khaiValue: [number, number, number, number, number, number, number];
  pm25Value: [number, number, number, number, number, number, number];
  pm10Value: [number, number, number, number, number, number, number];
  o3Value: [number, number, number, number, number, number, number];
  no2Value: [number, number, number, number, number, number, number];
  coValue: [number, number, number, number, number, number, number];
  so2Value: [number, number, number, number, number, number, number];
};

interface RangeValueShow {
  type: string;
  value: number;
  boolean: boolean;
}

interface StringObject {
  default: string;
  hover: string;
  button: string;
  textColor: string;
  gradeText: string;
}

const getColorValue = (grade: number, rangeValueShow?: RangeValueShow): StringObject | string[] => {
  const resultList = {
    0: { default: '#d0ecff', hover: '#7ed6ff', button: '#6ac8fe', textColor: '#1c67d7', gradeText: '좋음' },
    1: { default: '#caf2de', hover: '#94edbc', button: '#59e494', textColor: '#01b56e', gradeText: '보통' },
    2: { default: '#f8f7c6', hover: '#ffeb8b', button: '#ffda58', textColor: '#937200', gradeText: '나쁨' },
    3: { default: '#ffd6da', hover: '#ffc1c5', button: '#ffa8a8', textColor: '#c00d0d', gradeText: '매우나쁨'},
    4: { default: '#cbd0d3', hover: '#c1c5c7', button: '#abb0b3', textColor: '#0a0a0a', gradeText: '데이터 없음' }
  };
  if(rangeValueShow){
    const typeRangeValue: RangeValues = {
      khaiValue: [1, 50, 51, 100, 101, 250, 251],
      pm25Value: [1, 15, 16, 35, 36, 75, 76],
      pm10Value: [1, 30, 31, 80, 81, 150, 151],
      o3Value: [0, 0.0309, 0.031, 0.0909, 0.091, 0.01509, 0.151],
      no2Value: [0, 0.03, 0.031, 0.06, 0.061, 0.2, 0.201],
      coValue: [0, 2, 2.1, 9, 8.1, 15, 15.1],
      so2Value: [0, 0.02, 0.021, 0.05, 0.051, 0.15, 0.151],
    };
    const index = Object.keys(typeRangeValue)?.indexOf(rangeValueShow.type);
    const values = Object.values(typeRangeValue)[index];

    if(rangeValueShow?.boolean) return typeRangeValue[rangeValueShow.type];

    if (rangeValueShow.value >= values[0] && rangeValueShow.value <= values[1]) { return ['#d0ecff', '#7ed6ff', '#6ac8fe', '#1c67d7', '1']; } 
    else if (rangeValueShow.value >= values[2] && rangeValueShow.value <= values[3]) { return ['#caf2de', '#94edbc', '#59e494', '#01b56e', '2']; } 
    else if (rangeValueShow.value >= values[4] && rangeValueShow.value <= values[5]) { return ['#f8f7c6', '#ffeb8b', '#ffda58', '#937200', '3']; } 
    else if (rangeValueShow.value >= values[6]) { return ['#ffd6da', '#ffc1c5', '#ffa8a8', '#c00d0d', '4']; } 
    else { return ['#cbd0d3', '#c1c5c7', '#abb0b3', '#0a0a0a', '5']; }
  } else {
    switch(Number(grade)) {
      case 1: return resultList[0];
      case 2: return resultList[1];
      case 3: return resultList[2];
      case 4: return resultList[3];
      default: return resultList[4];
    }
  }

};

export default getColorValue;