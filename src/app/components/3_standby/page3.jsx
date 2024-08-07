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
// ~ Styles
import {
  ContentResultSearchBox,
  ContentResultTableWrap,
  ContentResultTap,
  ContentResultWrap,
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
  const [district, setDistrict] = useState('전체');
  // ! 측정자료
  // TODO: currentDate 하나의 jsx에서 통일하거나, zustand로 설정해 중복으로 생성하지 않도록 변경
  // # 금일
  const currentDate = new Date();
  // const currentDate = new Date('2024-07-23');
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  // #& 지역 목록
  const regionDetailList_kor = Object.keys(regionDetailList);

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
            </div>
          </div>
        </ContentResultSearchBox>
        <ContentResultTableWrap>
          {/* <ContentTableWrap style={{ width: '1070px' }}>
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
                  <tbody></tbody>
                </ContentTable>
              </ContentTableWrap> */}
        </ContentResultTableWrap>
      </ContentResultWrap>
    </>
  );
}
