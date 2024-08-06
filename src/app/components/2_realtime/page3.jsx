/*
    ! 주제
    @ 컴포넌트
    # 설명
    & 강조
    #& 공통
    ~ 세팅
*/

/*
    Package
    Json
    Hooks
    Style
    Component
    Package Settings
*/

// ~ System
import { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  registerables,
  PointElement,
  LineElement,
} from 'chart.js';
import { getElementAtEvent, Line } from 'react-chartjs-2';

// ~ JSON
import regionsListData from '../../data/regionsList.json';
// ~ HOOKS
// ~ Styles
import {
  ContentResultTableWrap,
  ContentResultWrap,
  LayoutContentTitle,
  LoadingWrap,
  ContentTable,
  RealtimePage2ContentResultSearchBtn,
  RealtimePage2ContentResultSearchBox,
  ContentTableWrap,
} from '../assets/StyleComponent.jsx';

// ~ Component
// ~ Package Settings
ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);
// # 지역 목록 및 지역 내 측정소 목록
/**
 * @typedef {Object} RegionList
 * @property {string} 서울
 * @property {string} 경기
 * @property {string} 인천
 * @property {string} 강원
 * @property {string} 충남
 * @property {string} 대전
 * @property {string} 충북
 * @property {string} 세종
 * @property {string} 부산
 * @property {string} 울산
 * @property {string} 대구
 * @property {string} 경북
 * @property {string} 경남
 * @property {string} 전남
 * @property {string} 광주
 * @property {string} 전북
 * @property {string} 제주
 */

/** @type {RegionList} */
const regionDetailList = regionsListData;

// @@@ 출력 컴포넌트 @@@
export default function Page({ type }) {
  // # search 파라미터
  const [searchType, setSearchType] = useState('detail-pm25');
  const [searchTypeText, setSearchTypeText] = useState('PM-2.5');
  const [searchProperty, setSearchProperty] = useState('pm25Value');
  useEffect(() => {
    switch (type) {
      case 'detail-pm25':
        setSearchTypeText('PM-2.5');
        setSearchType('detail-pm25');
        setSearchProperty('pm25Value');
        break;
      case 'detail-pm10':
        setSearchTypeText('PM-10');
        setSearchType('detail-pm10');
        setSearchProperty('pm10Value');
        break;
      default:
        break;
    }
  }, [type]);
  // # 자료구분
  const [dataDivision, setDataDivision] = useState('hour');
  const [tempDataDivision, setTempDataDivision] = useState(dataDivision);
  // # 화면 중앙
  const [loadingStyle, setLoadingStyle] = useState({ left: '50%' });

  // # 선택한 지역
  const [district, setDistrict] = useState('서울');

  // ! 측정자료
  // # 금일
  // const currentDate = new Date();
  const currentDate = new Date('2024-07-23');
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // # 통계 검색
  const [tableElement, setTableElement] = useState(
    <tr>
      <td colSpan="25">검색된 자료가 없습니다.</td>
    </tr>
  );

  // #& 지역 목록
  const regionDetailList_kor = Object.keys(regionDetailList);

  // # 차트 데이터
  const [lineChartData, setLineChartData] = useState([]);

  // ! 데이터
  // # 데이터 검색 타입 임시 변경 핸들러
  const handleChange_radio = (e) => setTempDataDivision(e.target.value);

  // # 선택한 지역의 측정소 목록
  const selectRegionList = regionDetailList[district].map((item) => {
    return `${item.name}${item.district}`;
  });

  // # 데이터 검색 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { innerHeight } = window;
    const value = 180;

    const top = (innerHeight - value) / 2 + window.scrollY;

    setLoadingStyle({ top: `${top}px`, display: 'block' });

    try {
      setDataDivision(tempDataDivision);

      // const response = await fetch(`https://apis.hansan-web.link/airkorea/realtime-data?itemCode=${searchType}&dataGubun=${dataGubun}${dataGubun === 'DAILY' ? `&searchCondition=${tempDataDivision}` : ''}`);
      const response = await fetch(
        `https://localhost:3500/api/airkorea/particulateMatter`
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      /**
       * @typedef {Object} Data
       * @property {string} cityName
       * @property {string} cityNameEng
       * @property {string} coValue
       * @property {string} dataGubun
       * @property {string} dataTime
       * @property {string} districtCode
       * @property {string} districtNumSeq
       * @property {string} itemCode
       * @property {string} khaiValue
       * @property {string} no2Value
       * @property {string} numOfRows
       * @property {string} o3Value
       * @property {string} pageNo
       * @property {string} pm10Value
       * @property {string} pm25Value
       * @property {string} resultCode
       * @property {string} resultMsg
       * @property {string} returnType
       * @property {string} searchCondition
       * @property {string} serviceKey
       * @property {string} sidoName
       * @property {string} so2Value
       * @property {string} totalCount
       */

      /** @type {Data[]} */
      const data = await response.json();

      // # [테이블 데이터] 필터링 날짜
      const startTime = new Date(
        `${currentDate.getFullYear()}-${String(currentMonth).padStart(
          2,
          '0'
        )}-${String(currentDay).padStart(2, '0')}T01:00:00`
      );
      const endTime = new Date(
        `${currentDate.getFullYear()}-${String(currentMonth).padStart(
          2,
          '0'
        )}-${String(currentDay).padStart(2, '0')}T${String(
          currentDate.getHours()
        ).padStart(2, '0')}:00:00`
      );
      // % [테이블 데이터] 1. 검색하고자 하는 시작 날짜와 종료 날짜 범위 내에 있는 데이터 필터링, 필요한 요소만 추출
      /**
       * @typedef {Object} FilterData
       * @property {string} cityName
       * @property {string} dataTime
       * @property {string} pm25Value
       * @property {string} pm10Value
       * @property {string} sidoName
       */

      /** @type {FilterData[]} */
      const filteredData = data
        .filter((item) => {
          const itemTime = new Date(item.dataTime.replace(' ', 'T'));
          return itemTime >= startTime && itemTime <= endTime;
        })
        .map((item) => {
          return {
            cityName: item.cityName,
            dataTime: item.dataTime,
            pm25Value: item.pm25Value,
            pm10Value: item.pm10Value,
            sidoName: item.sidoName,
          };
        });
      console.log('filteredData: ', filteredData);

      // % [테이블 데이터] 2. 테이블 데이터 계산
      // function getValue(region, comparator) {
      //     if(filteredData.length === 0) return initialState;

      //     let extremeValue = Number(filteredData[0][region]);
      //     filteredData.forEach(item => {
      //         const value = Number(item[region]);
      //         if (!isNaN(value) && comparator(value, extremeValue)) {
      //             extremeValue = value;
      //         }
      //     });
      //     return isNaN(extremeValue) ? initialState : extremeValue;
      // }
      // % [테이블 데이터] 3. 테이블 데이터 추가
      // regionList_eng.forEach(region => {
      //     const max = getValue(region, (a, b) => a > b);
      //     const min = getValue(region, (a, b) => a < b);
      //     maxValues[region] = max;
      //     values[region] = (max + min) / 2;
      //     minValues[region] = min;
      // });
      // % [테이블 데이터] 4. 테이블 데이터를 이용한 Dom 설정
      // function renderTableRow(data) {
      //     const sliceData = tempDataDivision === 'week' ? data.slice(0, 7) : data;
      //     return (
      //         <>
      //             {sliceData.map((day, key) =>
      //                 <tr key={key}>
      //                     <td>{day.dataTime ? day.dataTime : '-'}</td>
      //                     {regionList_eng.map((reg, idx) => {
      //                         return <td key={idx}>{day[reg] ? day[reg] : '-'}</td>
      //                     })}
      //                 </tr>
      //             )}
      //         </>
      //     )
      // };
      // # 차트 데이터 정렬
      // const alignData = data.map(obj => regionList_eng.map(key => obj[key]));
      // # 클라이언트에게 출력
      switch (tempDataDivision) {
        case 'hour': {
          // # 테이블 Element
          const tableElementResponse = selectRegionList.map((item, idx) => {
            const regionData = filteredData
              .filter((ftData) => {
                return ftData.cityName === item;
              })
              .sort((a, b) => {
                const dateTimeA = new Date(a.dataTime);
                const dateTimeB = new Date(b.dataTime);
                return dateTimeA - dateTimeB;
              });
            return (
              <tr key={idx}>
                <td>{item}</td>
                {regionData.map((value, _idx) => {
                  return (
                    <td key={_idx}>
                      {value[searchProperty] !== ''
                        ? value[searchProperty]
                        : '-'}
                    </td>
                  );
                })}
                {Array.from({ length: 24 - regionData.length }).map(
                  (_, key) => (
                    <td key={key}></td>
                  )
                )}
              </tr>
            );
          });
          setTableElement(tableElementResponse);
          // # 차트 데이터
          const chartDataResponse = selectRegionList.map((item, idx) => {
            const pmValue = filteredData
              .filter((ftData) => {
                return ftData.cityName === item;
              })
              .sort((a, b) => {
                const dateTimeA = new Date(a.dataTime);
                const dateTimeB = new Date(b.dataTime);
                return dateTimeA - dateTimeB;
              })
              .map((ftData) => ftData[searchProperty]);
            return pmValue;
          });
          setLineChartData(chartDataResponse);
          break;
        }
        case 'daily': {
          // setBarChartData(Object.values(values));
          // function returnValue(type) {
          //     return regionList_eng.map((region, key) => <td key={key}>{type[region] !== 0 ? type[region] : '-'}</td>)
          // };
          // setTableElement(<>
          //     <tr>
          //         <td>시간평균</td>
          //         {returnValue(values)}
          //     </tr>
          //     <tr>
          //         <td>최고값</td>
          //         {returnValue(maxValues)}
          //     </tr>
          //     <tr>
          //         <td>최저값</td>
          //         {returnValue(minValues)}
          //     </tr>
          // </>)
          break;
        }
        default: {
          // setLineChartData(alignData);
          // setTableElement(renderTableRow(data));
          break;
        }
      }
    } catch {
      console.error('요청에 실패함');
    }
    setLoadingStyle({ top: `${top}px` });
  };

  // // ! 차트
  const chartRef = useRef();
  const chartOnClick = (e) => {
    console.log(getElementAtEvent(chartRef.current, e));
  };
  const chartScaleY = {
    'detail-pm25': { max: 60, step: 20 },
    'detail-pm10': { max: 60, step: 20 },
  };
  console.log('결과: ', searchType);
  // # 차트 부가 옵션
  const lineOptions = {
    responsive: true, // 반응형
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 15,
          boxHeight: 1,
        },
      },
      title: {
        // 타이틀
        display: true,
        position: 'left',
        text: '㎍/㎥',
      },
    },
    scales: {
      x: { grid: { display: false } }, // 세로선 제거
      y: {
        max: chartScaleY[searchType].max,
        min: 0,
        ticks: {
          format: { maximumFractionDigits: 3 }, // 소수점 최대 3자리
          stepSize: chartScaleY[searchType].step,
        },
      },
    },
    maintainAspectRatio: false,
  };
  // # 차트 값
  // const labels = selectRegionList;
  // # 한 달의 마지막 날 계산
  function getLastDays(currentDate, days) {
    const dates = [];
    const current = new Date(currentDate);

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(current);
      date.setDate(current.getDate() - i - 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }
    return dates;
  }

  // # 라인 차트 생성
  function createLineData(labels) {
    return {
      labels: labels,
      datasets: selectRegionList.map((name, idx) => {
        return {
          label: name,
          data: [
            ...lineChartData.map((_, labelIdx) =>
              lineChartData[labelIdx] ? lineChartData[labelIdx][idx] : 0
            ),
          ].reverse(),
        };
      }),
    };
  }

  // const lineDailyLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  const numberOfElements = 24;
  const lineHourLabels = Array.from({ length: numberOfElements }, (_, index) =>
    (index + 1).toString()
  );
  const lineDailyLabels = getLastDays(currentDate, 31);

  const lineHourData = createLineData(lineHourLabels);
  const lineDailyData = createLineData(lineDailyLabels);

  // # 라인 차트 Dom
  function LineChart({ period, lineOptions, chartRef, chartOnClick }) {
    const lineData = period === 'week' ? lineHourData : lineDailyData;
    return (
      <div style={{ height: '500px' }}>
        <Line
          options={lineOptions}
          data={lineData}
          ref={chartRef}
          onClick={chartOnClick}
        />
      </div>
    );
  }

  // TODO: DEV 폴더에 daily용 값과 차트 추가하기
  // # 차트 목록
  const ChartComponent = () => {
    switch (dataDivision) {
      case 'hour':
        return (
          <LineChart
            period="hour"
            lineOptions={lineOptions}
            chartRef={chartRef}
            chartOnClick={chartOnClick}
          />
        );
      case 'daily':
        // return <LineChart period="week" lineOptions={lineOptions} chartRef={chartRef} chartOnClick={chartOnClick} />;
        return;
      default:
        return <></>;
    }
  };

  // ! 결과
  return (
    <>
      <LoadingWrap style={loadingStyle}>
        <img src="/images/realtime/loading.webp" alt="로딩중 Loading" />
      </LoadingWrap>
      <LayoutContentTitle>
        {searchTypeText === 'PM-2.5' ? '초' : ''}미세먼지 &#40;{searchTypeText}
        &#41;
      </LayoutContentTitle>
      <ContentResultWrap>
        <RealtimePage2ContentResultSearchBox>
          <div>
            <strong>데이터 구분</strong>
            <div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="hour"
                    checked={tempDataDivision === 'hour'}
                    onChange={handleChange_radio}
                  />
                  시간
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="daily"
                    checked={tempDataDivision === 'daily'}
                    onChange={handleChange_radio}
                  />
                  일평균
                </label>
              </div>
            </div>
          </div>
          <div>
            <strong>지역</strong>
            <div>
              <select
                onChange={(e) => setDistrict(e.currentTarget.value)}
                value={district}
              >
                {regionDetailList_kor.map((reg, _) => {
                  return <option key={_}>{reg}</option>;
                })}
              </select>
            </div>
          </div>
          <RealtimePage2ContentResultSearchBtn>
            <button onClick={handleSubmit}>검색</button>
          </RealtimePage2ContentResultSearchBtn>
        </RealtimePage2ContentResultSearchBox>
        {/* FIXMD */}
        <p style={{ margin: '10px 0' }}>※ 측정시간 :시 기준</p>
        <ContentResultTableWrap>
          <ContentTableWrap style={{ width: '1070px' }}>
            <ContentTable style={{ marginBottom: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fff' }}>
                  <th>측정소명</th>
                  <th>1시</th>
                  <th>2시</th>
                  <th>3시</th>
                  <th>4시</th>
                  <th>5시</th>
                  <th>6시</th>
                  <th>7시</th>
                  <th>8시</th>
                  <th>9시</th>
                  <th>10시</th>
                  <th>11시</th>
                  <th>12시</th>
                  <th>13시</th>
                  <th>14시</th>
                  <th>15시</th>
                  <th>16시</th>
                  <th>17시</th>
                  <th>18시</th>
                  <th>19시</th>
                  <th>20시</th>
                  <th>21시</th>
                  <th>22시</th>
                  <th>23시</th>
                  <th>24시</th>
                </tr>
              </thead>
              <tbody>{tableElement}</tbody>
            </ContentTable>
          </ContentTableWrap>
          <ul>
            <li style={{ listStyle: 'inside' }}>
              장비점검, 통신장애 등 이상데이터가 발생한 경우 "-"로 표기됩니다.
            </li>
          </ul>
        </ContentResultTableWrap>
        <ChartComponent />
      </ContentResultWrap>
    </>
  );
}
