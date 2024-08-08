/*
    ! 주제
    @ 컴포넌트
    # 설명
    & 강조
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
import { useSearchParams } from 'react-router-dom';
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
import { Bar, getElementAtEvent, Line } from 'react-chartjs-2';

// ~ JSON
// ~ HOOKS
import useStore from '../../hooks/useStore.tsx';

// ~ Styles
import {
  ContentResultTableWrap,
  ContentResultWrap,
  LayoutContentTitle,
  LoadingWrap,
  ContentTable,
  RealtimePage2ContentResultSearchBtn,
  RealtimePage2ContentResultSearchBox,
  RealtimePage2ContentTableWrap,
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

// @@@ 출력 컴포넌트 @@@
export default function Page({ regionList }) {
  const {
    currentDate: currentDateString,
    currentYear,
    currentMonth: currentMonthNumber,
    currentDay,
  } = useStore((store) => store);
  const currentDate = new Date(currentDateString);
  const currentMonth = currentMonthNumber + 1;
  // # search 파라미터
  const [searchParams] = useSearchParams();
  const [searchType, setSearchType] = useState('pm25');
  const [searchTypeText, setSearchTypeText] = useState('PM-2.5');
  useEffect(() => {
    switch (searchParams.get('type')) {
      case 'pm25':
        setSearchTypeText('PM-2.5');
        setSearchType('pm25');
        break;
      case 'pm10':
        setSearchTypeText('PM-10');
        setSearchType('pm10');
        break;
      case 'o3':
        setSearchTypeText('오존');
        setSearchType('o3');
        break;
      case 'no2':
        setSearchTypeText('이산화질소');
        setSearchType('no2');
        break;
      case 'co':
        setSearchTypeText('일산화탄소');
        setSearchType('co');
        break;
      case 'so2':
        setSearchTypeText('아황산가스');
        setSearchType('so2');
        break;
      default:
        break;
    }
  }, [searchParams]);
  // # 자료구분
  const [dataDivision, setDataDivision] = useState('daily');
  const [tempDataDivision, setTempDataDivision] = useState(dataDivision);
  // # 화면 중앙
  const [loadingStyle, setLoadingStyle] = useState({ left: '50%' });

  // # 통계 검색
  const [tableData, setTableData] = useState([]);
  const [tableElement, setTableElement] = useState(
    <tr>
      <td colSpan="18">검색된 자료가 없습니다.</td>
    </tr>
  );

  // # 지역 목록
  const regionList_eng = Object.keys(regionList);
  const regionList_kor = Object.values(regionList);

  // # 차트 데이터
  const [barChartData, setBarChartData] = useState(
    new Array(regionList_eng.length).fill(0)
  );
  const [lineChartData, setLineChartData] = useState(
    Array.from({ length: 7 }, () => Array(17).fill(0))
  );

  const initialState = 0;
  const maxValues = {};
  const values = {};
  const minValues = {};
  useEffect(() => {
    regionList_eng.forEach((region) => {
      maxValues[region] = initialState;
      values[region] = initialState;
      minValues[region] = initialState;
    });
    const data = regionList_eng.map((region) => values[region]);
    setBarChartData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ! 데이터
  // # 데이터 검색 타입 임시 변경 핸들러
  const handleChange_radio = (e) => setTempDataDivision(e.target.value);

  // # 데이터 검색 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { innerHeight } = window;
    const value = 180;

    const top = (innerHeight - value) / 2 + window.scrollY;

    setLoadingStyle({ top: `${top}px`, display: 'block' });

    try {
      let dataGubun = 'DAILY';
      setDataDivision(tempDataDivision);
      if (tempDataDivision === 'daily') dataGubun = 'HOUR';

      const response = await fetch(
        `https://apis.hansan-web.link/airkorea/realtime-data?itemCode=${searchType}&dataGubun=${dataGubun}${
          dataGubun === 'DAILY' ? `&searchCondition=${tempDataDivision}` : ''
        }`
      );
      // const response = await fetch(`https://localhost:3500/api/airkorea/realtime-data?itemCode=${searchType}&dataGubun=${dataGubun}${dataGubun === 'DAILY' && `&searchCondition=${tempDataDivision}`}`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTableData(data);

      // # [테이블 데이터] 필터링 날짜
      const startTime = new Date(
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
          currentDay
        ).padStart(2, '0')}T00:00:00`
      );
      const endTime = new Date(
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
          currentDay
        ).padStart(2, '0')}T${String(currentDate.getHours()).padStart(
          2,
          '0'
        )}:00:00`
      );
      // % [테이블 데이터] 1. 검색하고자 하는 시작 날짜와 종료 날짜 범위 내에 있는 데이터 필터링
      const filteredData = data.filter((item) => {
        const itemTime = new Date(item.dataTime.replace(' ', 'T'));
        return itemTime >= startTime && itemTime <= endTime;
      });
      // % [테이블 데이터] 2. 테이블 데이터 계산
      function getValue(region, comparator) {
        if (filteredData.length === 0) return initialState;

        let extremeValue = Number(filteredData[0][region]);
        filteredData.forEach((item) => {
          const value = Number(item[region]);
          if (!isNaN(value) && comparator(value, extremeValue)) {
            extremeValue = value;
          }
        });
        return isNaN(extremeValue) ? initialState : extremeValue;
      }
      // % [테이블 데이터] 3. 테이블 데이터 추가
      regionList_eng.forEach((region) => {
        const max = getValue(region, (a, b) => a > b);
        const min = getValue(region, (a, b) => a < b);
        maxValues[region] = max;
        values[region] = (max + min) / 2;
        minValues[region] = min;
      });
      // % [테이블 데이터] 4. 테이블 데이터를 이용한 Dom 설정
      function renderTableRow(data) {
        const sliceData = tempDataDivision === 'week' ? data.slice(0, 7) : data;
        return (
          <>
            {sliceData.map((day, key) => (
              <tr key={key}>
                <td>{day.dataTime ? day.dataTime : '-'}</td>
                {regionList_eng.map((reg, idx) => {
                  return <td key={idx}>{day[reg] ? day[reg] : '-'}</td>;
                })}
              </tr>
            ))}
          </>
        );
      }
      // # 차트 데이터 정렬
      const alignData = data.map((obj) =>
        regionList_eng.map((key) => obj[key])
      );
      // # 클라이언트에게 출력
      switch (tempDataDivision) {
        case 'daily': {
          setBarChartData(Object.values(values));
          function returnValue(type) {
            return regionList_eng.map((region, key) => (
              <td key={key}>{type[region] !== 0 ? type[region] : '-'}</td>
            ));
          }
          setTableElement(
            <>
              <tr>
                <td>시간평균</td>
                {returnValue(values)}
              </tr>
              <tr>
                <td>최고값</td>
                {returnValue(maxValues)}
              </tr>
              <tr>
                <td>최저값</td>
                {returnValue(minValues)}
              </tr>
            </>
          );
          break;
        }
        default: {
          setLineChartData(alignData);
          setTableElement(renderTableRow(data));
          break;
        }
      }
    } catch {
      console.error('요청에 실패함');
    }
    setLoadingStyle({ top: `${top}px` });
  };

  // ! 차트
  const chartRef = useRef();
  const chartOnClick = (e) => {
    console.log(getElementAtEvent(chartRef.current, e));
  };
  const chartScaleY = {
    pm25: { max: 40, step: 10 },
    pm10: { max: 125, step: 25 },
    o3: { max: 0.125, step: 0.025 },
    no2: { max: 0.125, step: 0.025 },
    co: { max: 10, step: 5 },
    so2: { max: 0.2, step: 0.05 },
  };
  // # 차트 부가 옵션
  const barOptions = {
    responsive: true, // 반응형
    plugins: {
      legend: { display: false }, // 범례 제거
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
  const lineOptions = {
    ...barOptions,
    plugins: {
      legend: {
        display: true,
        title: { display: false },
        labels: {
          boxWidth: 15,
          boxHeight: 1,
        },
      },
    },
  };
  // # 차트 값
  const labels = regionList_kor;
  // # 차트 결과
  const barData = {
    labels,
    datasets: [
      {
        data: barChartData,
        // 가장 큰 값인 경우 초록색 배경색 설정
        backgroundColor: (ctx) => {
          const maxValues = Math.max(...barData.datasets[0].data);
          return barData.datasets[0].data.map((value) => {
            if (value === maxValues) {
              return 'rgb(26, 206, 135)';
            }
            return 'rgba(53, 128, 240)';
          });
        },
      },
    ],
  };
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
      datasets: regionList_kor.map((name, idx) => {
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

  const lineWeekLabels = getLastDays(currentDate, 7);
  const lineMonthLabels = getLastDays(currentDate, 31);

  const lineWeekData = createLineData(lineWeekLabels);
  const lineMonthData = createLineData(lineMonthLabels);

  // # 라인 차트 Dom
  function LineChart({ period, lineOptions, chartRef, chartOnClick }) {
    const lineData = period === 'week' ? lineWeekData : lineMonthData;
    return (
      <Line
        options={lineOptions}
        data={lineData}
        ref={chartRef}
        onClick={chartOnClick}
      />
    );
  }

  // # 차트 목록
  const ChartComponent = () => {
    switch (dataDivision) {
      case 'daily':
        return (
          <Bar
            options={barOptions}
            data={barData}
            ref={chartRef}
            onClick={chartOnClick}
          />
        );
      case 'week':
        return (
          <LineChart
            period="week"
            lineOptions={lineOptions}
            chartRef={chartRef}
            chartOnClick={chartOnClick}
          />
        );
      case 'month':
        return (
          <LineChart
            period="month"
            lineOptions={lineOptions}
            chartRef={chartRef}
            chartOnClick={chartOnClick}
          />
        );
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
        시도별 대기정보&#40;{searchTypeText}&#41;
      </LayoutContentTitle>
      <ContentResultWrap>
        <RealtimePage2ContentResultSearchBox>
          <div>
            <strong>자료 구분</strong>
            <div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="daily"
                    checked={tempDataDivision === 'daily'}
                    onChange={handleChange_radio}
                  />
                  당일
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="week"
                    checked={tempDataDivision === 'week'}
                    onChange={handleChange_radio}
                  />
                  7일간
                </label>
              </div>
              <div>
                <label htmlFor="">
                  <input
                    type="radio"
                    value="month"
                    checked={tempDataDivision === 'month'}
                    onChange={handleChange_radio}
                  />
                  1달
                </label>
                <span>
                  {currentMonth - 1}월 {currentDay - 1}일{' '}
                </span>
                ~
                <span>
                  {' '}
                  {currentMonth}월 {currentDay}일{' '}
                </span>
                <span>&#40;실시간&#41;</span>
              </div>
            </div>
          </div>
          <RealtimePage2ContentResultSearchBtn>
            <button onClick={handleSubmit}>검색</button>
          </RealtimePage2ContentResultSearchBtn>
        </RealtimePage2ContentResultSearchBox>
        {/* FIXMD */}
        <p style={{ margin: '10px 0' }}>
          ※측정시간 :{' '}
          {tableData[0]?.dataTime !== undefined
            ? tableData[0].dataTime
            : '0000-00-00 00'}
          시 기준.
        </p>
        <ContentResultTableWrap>
          <h2>시간자료&#40;수치&#41;</h2>
          <p>시도명 클릭시 상세 자료를 보실 수 있습니다.</p>
          <p style={{ textAlign: 'right', marginBottom: '5px' }}>
            단위&#40;㎍/㎥&#41;
          </p>
          <RealtimePage2ContentTableWrap>
            <ContentTable style={{ marginBottom: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fff' }}>
                  <th></th>
                  {labels.map((reg, idx) => (
                    <th key={idx}>{reg}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{tableElement}</tbody>
            </ContentTable>
          </RealtimePage2ContentTableWrap>
          <p>
            ※ PM-2.5측정장비가 적은 일부지역의 경우 PM-2.5평균이 PM-10평균보다
            높을수있음.
          </p>
        </ContentResultTableWrap>
      </ContentResultWrap>
      <h3 style={{ margin: '30px 0 10px', fontSize: '22px' }}>17개 지자체별</h3>
      <ul style={{ listStyle: 'inside' }}>
        <li>해당 시도별 당일 00시부터 현재시간까지 산술평균한 값임.</li>
      </ul>
      {/* ---------- 그래프 ---------- */}
      <div style={{ height: '300px' }}>
        <ChartComponent />
      </div>
    </>
  );
}
