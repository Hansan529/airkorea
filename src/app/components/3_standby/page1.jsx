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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

// ~ JSON
import regionListData from '../../data/regionsList.json';
// ~ HOOKS
// ~ Styles
import {
  ContentResultTableWrap,
  ContentResultWrap,
  LayoutContentTitle,
} from '../assets/StyleComponent.jsx';

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
const regionList = regionListData;

// @@@ 출력 컴포넌트 @@@
export default function Page() {
  // ! 사이드바
  //   // # 사이드바 토글이 있는 요소 찾기
  //   function findElementsWithChildren(array) {
  //     const result = [];
  //     array.forEach((element) => {
  //       if (element.toggle && element.toggle.length > 0) {
  //         result.push(element);
  //         result.push(...findElementsWithChildren(element.toggle));
  //       }
  //     });
  //     return result;
  //   }
  //   const elementsWithChildren = findElementsWithChildren(category.children);

  // #& 지역 목록
  const regionList_kor = Object.keys(regionList);

  // ! 결과
  return (
    <>
      <LayoutContentTitle></LayoutContentTitle>
      <ContentResultWrap>
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
