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

// @@@ 출력 컴포넌트 @@@
export default function Page() {
  const {
    getFetch,
    alertOzone,
    currentDate: currentDateString,
  } = useStore((store) => store);
  const currentDate = new Date(currentDateString);
  // ! 검색
  // # 검색 지역 목록
  const regionDetailList_kor = Object.keys(regionDetailList);
  // # 검색 지역
  const [district, setDistrict] = useState('전체');
  // # 검색 범위
  const [searchRange, setSearchRange] = useState('오늘');

  // # 검색 범위 핸들러
  const handleSearchRangeRadioChange = (e) => {
    const selectedLabel = e.target.closest('label').textContent.trim();
    setSearchRange(selectedLabel);
  };

  const handleSearchButton = () => {
    getFetch(
      'alertOzone',
      `https://apis.hansan-web.link/airkorea/standby-ozone?year=${currentDate.getFullYear()}`
    );
    console.log('alertOzone: ', alertOzone);
  };

  const tbodyComp = () => {};

  // ! 결과
  return (
    <>
      <LayoutContentTitle>오존</LayoutContentTitle>
      <ContentResultWrap>
        <div style={{ display: 'flex' }}>
          <ContentResultTap selectCheck={true}>최근발령지역</ContentResultTap>
          <ContentResultTap>연도별 발령현황</ContentResultTap>
          <ContentResultTap>지역별 발령현황</ContentResultTap>
          <ContentResultTap>경보기준</ContentResultTap>
        </div>
        <ContentResultSearchBox>
          <div>
            <strong>지역</strong>
            <div>
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
              <label>
                <input
                  type="radio"
                  name="searchRange"
                  onChange={handleSearchRangeRadioChange}
                />
                오늘
              </label>
              <label>
                <input
                  type="radio"
                  name="searchRange"
                  onChange={handleSearchRangeRadioChange}
                />
                이번달
              </label>
              <label>
                <input
                  type="radio"
                  name="searchRange"
                  onChange={handleSearchRangeRadioChange}
                />
                올해
              </label>
              <ContentResultSearchBtn>
                <button onClick={handleSearchButton}>검색</button>
              </ContentResultSearchBtn>
            </div>
          </div>
        </ContentResultSearchBox>
        <ContentResultTableWrap>
          <ContentTableWrap style={{ width: '1070px' }}>
            <ContentTable style={{ marginBottom: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fff' }}>
                  <th>번호</th>
                  <th>지역</th>
                  <th>권역</th>
                  <th>경보단계</th>
                  <th>발령시간</th>
                  <th>해제시간</th>
                </tr>
              </thead>
              <tbody></tbody>
            </ContentTable>
          </ContentTableWrap>
        </ContentResultTableWrap>
      </ContentResultWrap>
    </>
  );
}
