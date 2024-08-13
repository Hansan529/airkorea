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
import 'react-datepicker/dist/react-datepicker.css';

// ~ JSON
import regionDetailListData from '../../data/regionsList.json';
// ~ HOOKS
import useStore from '../../hooks/useStore.tsx';
// ~ Styles
import {
  ContentResultSearchBox,
  ContentResultSearchBtn,
  ContentResultTableWrap,
  ContentResultTap,
  ContentResultWrap,
  ContentTable,
  ContentTableWrap,
  LayoutContentTitle,
} from '../assets/StyleComponent.jsx';
import { useState } from 'react';

// ~ Component
// ~ Package Settings

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
const regionDetailList = regionDetailListData;

// # 00 포맷팅
function padZero(num) {
  return String(num).padStart(2, '0');
}

// # yyyy-mm-dd 포맷팅
function formatDateToString(date) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  return `${year}-${month}-${day}`;
}

function parseDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day);
}

function getDateRange(date, type) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  let startDate, endDate;

  switch (type) {
    case '오늘':
      startDate = new Date(year, month, day);
      endDate = new Date(year, month, day);
      break;
    case '이번달':
      startDate = new Date(year, month, 1);
      endDate = new Date(year, month, day);
      break;
    case '올해':
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, month, day);
      break;
    default:
      throw new Error('검색 범위를 지정하지 않았습니다');
  }

  return { startDate, endDate };
}

// @@@ 출력 컴포넌트 @@@
export default function Page() {
  const { currentDate: currentDateString } = useStore((store) => store);
  // # 날짜
  const currentDate = new Date(currentDateString);

  // ! 조회 종류
  const [viewSelectIndex, setViewSelectIndex] = useState(0);

  // ! 검색
  // # 검색 지역 목록
  const regionDetailList_kor = Object.keys(regionDetailList);
  // # 검색 지역
  const [district, setDistrict] = useState('전체');
  // # 검색 범위
  const [searchRange, setSearchRange] = useState('오늘');
  // # 검색 년도
  const [searchYear, setSearchYear] = useState(currentDate.getFullYear());
  // # 검색 범위 핸들러
  const handleSearchRangeRadioChange = (e) => {
    const selectedLabel = e.target.closest('label').textContent.trim();
    setSearchRange(selectedLabel);
  };
  // # 검색 결과
  const [searchResult, setSearchResult] = useState([]);

  // # 검색 버튼 클릭 이벤트
  const handleSearchButton = async () => {
    const response = await fetch(
      `https://localhost:3500/api/airkorea/standby-ozone${
        viewSelectIndex !== 2 ? `?year=${currentDate.getFullYear()}` : ''
      }`
    );
    const data = await response.json();

    switch (viewSelectIndex) {
      // ! 최근발령지역
      case 0: {
        // # 일련번호 내림차순 정렬
        const sortSearchResult = data.sort((a, b) => b.sn - a.sn);
        // # 검색 범위 날짜 데이터
        const { startDate, endDate } = getDateRange(currentDate, searchRange);

        // # 지역, 날짜 필터링
        const filteredResult = sortSearchResult.filter((res) => {
          // # string 형식을 Date 형식으로 변경
          const date = parseDate(res.dataDate);

          // # 전체인 경우 지역 필터링을 하지 않음
          if (district === '전체') {
            return date >= startDate && date <= endDate;
          }

          return (
            date >= startDate &&
            date <= endDate &&
            res.districtName === district
          );
        });
        setSearchResult(filteredResult);
        break;
      }
      // ! 연도별 발령현황
      case 1: {
        const groupedResult = data.reduce((acc, cur) => {
          const { districtName } = cur;
          if (!acc[districtName]) {
            acc[districtName] = [];
          }
          acc[districtName].push(cur);
          return acc;
        }, {});

        for (const districtName in groupedResult) {
          groupedResult[districtName].sort((a, b) => a.sn - b.sn);
        }

        const sortedGroupedData = Object.keys(groupedResult)
          .sort((a, b) => {
            return (
              regionDetailList_kor.indexOf(a) - regionDetailList_kor.indexOf(b)
            );
          })
          .flatMap((reg) => groupedResult[reg]);
        setSearchResult(sortedGroupedData);
        break;
      }
      // ! 지역별 발령현황
      case 2: {
        const groupedYear = data.reduce((acc, cur) => {
          const year = new Date(cur.dataDate).getFullYear();
          const district = cur.districtName;

          if (!acc[year]) {
            acc[year] = {};
          }

          if (!acc[year][district]) {
            acc[year][district] = [];
          }

          acc[year][district].push(cur);
          return acc;
        }, {});

        const sortedGroupedByYearAndDistrict = Object.keys(groupedYear).reduce(
          (result, year) => {
            result[year] = Object.keys(groupedYear[year])
              .sort(
                (a, b) =>
                  regionDetailList_kor.indexOf(a) -
                  regionDetailList_kor.indexOf(b)
              )
              .reduce((sortedObj, district) => {
                sortedObj[district] = groupedYear[year][district];
                return sortedObj;
              }, {});
            return result;
          },
          {}
        );
        setSearchResult(sortedGroupedByYearAndDistrict);
        break;
      }
      default:
        break;
    }

    // getFetch(
    //   'alertOzone',
    //   `https://apis.hansan-web.link/airkorea/standby-ozone?year=${currentDate.getFullYear()}`
    // );
  };

  // @ 테이블 컴포넌트
  const TbodyComp = () => {
    // # 주의보 단계
    function getIssueLvl(number) {
      switch (number) {
        case '1':
          return '주의보';
        case '2':
          return '경보';
        case '3':
          return '중대경보';
        default:
          return '알 수 없음';
      }
    }
    // # 결과 값이 없을 경우 출력
    if (searchResult.length <= 0) {
      return (
        <tr>
          <td colSpan={viewSelectIndex !== 2 ? 6 : 19}>
            경보내역이 없거나 검색하지 않았습니다.
          </td>
        </tr>
      );
    }

    function getRows() {
      // # 맨 윗줄 border 제거용 기본값 '서울' 할당
      let previousDistrict = '서울';
      let count = 0;

      return searchResult.map((ozone, idx) => {
        const isNewDistrict = ozone.districtName !== previousDistrict;

        // # 새로운 지역이 나올 경우, 번호를 1번으로 초기화
        if (isNewDistrict) {
          count = 0;
        }

        previousDistrict = ozone.districtName;
        count += 1;

        const tdStyle = { borderTop: isNewDistrict && '1.5px solid #000' };

        return (
          <tr key={idx}>
            <td style={tdStyle}>
              {viewSelectIndex === 1 ? (isNewDistrict ? 1 : count) : idx + 1}
            </td>
            <td style={tdStyle}>{ozone.districtName}</td>
            <td style={tdStyle}>{ozone.moveName}</td>
            <td style={tdStyle}>{getIssueLvl(ozone.issueLvl)}</td>
            <td style={tdStyle}>{`${ozone.dataDate} ${padZero(
              ozone.issueTime
            )}`}</td>
            <td style={tdStyle}>
              {ozone.clearTime
                ? `${ozone.dataDate} ${padZero(ozone.clearTime)}`
                : '발령 중'}
            </td>
          </tr>
        );
      });
    }
    function getYearRows() {
      const years = Object.keys(searchResult);
      return (
        <>
          {years.map((year, idx) => {
            const val = searchResult[year];
            const totalLength = Object.keys(val).reduce(
              (sum, district) => sum + val[district].length,
              0
            );

            return (
              <tr key={idx}>
                <th>{year}</th>
                <td>{totalLength}</td>
                {regionDetailList_kor.map((district) => {
                  return (
                    <td key={district}>
                      {val[district] ? val[district].length : '-'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </>
      );
    }
    if (viewSelectIndex !== 2) {
      return getRows();
    } else {
      return getYearRows();
    }
  };

  // ! 결과
  return (
    <>
      <LayoutContentTitle>오존</LayoutContentTitle>
      <ContentResultWrap>
        <div style={{ display: 'flex' }}>
          <ContentResultTap
            onClick={() => setViewSelectIndex(0)}
            selectCheck={viewSelectIndex === 0}
          >
            최근발령지역
          </ContentResultTap>
          <ContentResultTap
            onClick={() => setViewSelectIndex(1)}
            selectCheck={viewSelectIndex === 1}
          >
            연도별 발령현황
          </ContentResultTap>
          <ContentResultTap
            onClick={() => setViewSelectIndex(2)}
            selectCheck={viewSelectIndex === 2}
          >
            지역별 발령현황
          </ContentResultTap>
          <ContentResultTap
            onClick={() => setViewSelectIndex(3)}
            selectCheck={viewSelectIndex === 3}
          >
            경보기준
          </ContentResultTap>
        </div>
        {viewSelectIndex !== 3 && (
          <ContentResultSearchBox>
            <div>
              <strong>{viewSelectIndex !== 1 ? '지역' : '년도'}</strong>
              <div>
                {viewSelectIndex !== 1 ? (
                  <select
                    onChange={(e) => setDistrict(e.currentTarget.value)}
                    value={district}
                  >
                    <option value="전체">전체</option>
                    {regionDetailList_kor.map((reg, _) => {
                      return (
                        <option value={reg} key={_}>
                          {reg}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <select
                    onChange={(e) => setSearchYear(e.currentTarget.value)}
                    value={searchYear}
                  >
                    {Array.from(
                      { length: 10 },
                      (_, idx) => currentDate.getFullYear() - idx
                    ).map((year, key) => {
                      return (
                        <option value={year} key={key}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                )}
                {viewSelectIndex === 0 && (
                  <>
                    <label>
                      <input
                        type="radio"
                        name="searchRange"
                        checked={searchRange === '오늘'}
                        onChange={handleSearchRangeRadioChange}
                      />
                      오늘
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="searchRange"
                        checked={searchRange === '이번달'}
                        onChange={handleSearchRangeRadioChange}
                      />
                      이번달
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="searchRange"
                        checked={searchRange === '올해'}
                        onChange={handleSearchRangeRadioChange}
                      />
                      올해
                    </label>
                  </>
                )}
                <ContentResultSearchBtn>
                  <button onClick={handleSearchButton}>검색</button>
                </ContentResultSearchBtn>
              </div>
            </div>
          </ContentResultSearchBox>
        )}
        <ContentResultTableWrap>
          {viewSelectIndex === 2 && (
            <h2>시도별 오존주의보 발령 현황 &#40;차트 : 전체 발령횟수&#41;</h2>
          )}
          <ContentTableWrap style={{ width: '1070px' }}>
            <ContentTable style={{ marginBottom: '15px' }}>
              {viewSelectIndex !== 2 && (
                <colgroup>
                  <col style={{ width: '8%' }} />
                  <col style={{ width: 'auto' }} />
                  <col style={{ width: '17%' }} />
                  <col style={{ width: '17%' }} />
                  <col style={{ width: '17%' }} />
                  <col style={{ width: '17%' }} />
                </colgroup>
              )}
              <thead>
                <tr style={{ backgroundColor: '#fff' }}>
                  {viewSelectIndex !== 2 ? (
                    <>
                      <th>번호</th>
                      <th>지역</th>
                      <th>권역</th>
                      <th>경보단계</th>
                      <th>발령시간</th>
                      <th>해제시간</th>
                    </>
                  ) : (
                    <>
                      <th>년도</th>
                      <th>전체</th>
                      {regionDetailList_kor.map((item, key) => {
                        return <th key={key}>{item}</th>;
                      })}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                <TbodyComp></TbodyComp>
              </tbody>
            </ContentTable>
          </ContentTableWrap>
        </ContentResultTableWrap>
      </ContentResultWrap>
    </>
  );
}
