# 대기질 예보통보 조회 (getMinuDustFrcstDspth)
- ### 통보코드와 통보시간으로 예보정보와 발생 원인 정보를 조회하는 대기질(미세먼지/오존) 예보통보 조회

| 항목명(국문) | 항목명(영문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
| - | - | - | - | - | - |
| 결과코드 | resultCode | 2 | 필 | 00 | 결과코드 |
| 결과메시지 | resultMsg | 50 | 필 | NORMAL SERVICE | 결과메시지 |
| 한 페이지 결과 수 | numOfRows	| 4 | 옵 | 10 | 한 페이지 결과 수(조회 날짜 입력 시 결과 수 없음) |
| 페이지 번호 | pageNo | 4 | 필 | 1 | 페이지번호(조회 날짜 입력 시 페이지 번호 없음) |
| 전체 결과 수 | totalCount | 4 | 필 | 8 | 전체 결과 수 |
| 목록 | items | 0 | 옵 | - | 목록 |
| 통보시간 | dataTime | 20 |필 | 2020-11-13 11시 발표 | 통보시간 |
| 통보코드 | informCode | 10 | 필 | PM10 | 통보코드 |
| 예보개황 | infornOverall | 500 | 필 | ○[미세먼지] 수도권ㆍ강원영서... | 예보개황 |
| 발생원인 | informCause | 2000 | 필 | ○[미세먼지] 황사의 영향으로... | 발생원인 |
| 예보등급 | informGrade | 100 | 필 | 서울: 나쁨, 제주: 나쁨, 전남: 나쁨...	| 예보등급 |
| 행동요령 | actionKnack | 2000 | 필 | - | 행동요령 |
| 첨부파일명 | imageUrl1 | 600 | 필 | https://www.airkorea.or.kr/dustImage/.. | 시간대별 예측모델 결과사진(6:00, 12:00, 18:00, 24:00 KST) |
| 첨부파일명 | imageUrl2 | 600 | 필 | https://www.airkorea.or.kr/dustImage/.. | 시간대별 예측모델 결과사진(6:00, 12:00, 18:00, 24:00 KST) |
| 첨부파일명 | imageUrl3 | 600 | 필 | https://www.airkorea.or.kr/dustImage/.. | 시간대별 예측모델 결과사진(6:00, 12:00, 18:00, 24:00 KST) |
| 첨부파일명 | imageUrl4 | 600 | 필 | https://www.airkorea.or.kr/dustImage/.. | 시간대별 예측모델 결과사진(6:00, 12:00, 18:00, 24:00 KST) |
| 첨부파일명 | imageUrl5 | 600 | 필 | https://www.airkorea.or.kr/dustImage/.. | 시간대별 예측모델 결과사진(6:00, 12:00, 18:00, 24:00 KST) |
| 첨부파일명 | imageUrl6 | 600 | 필 | https://www.airkorea.or.kr/dustImage/.. | 시간대별 예측모델 결과사진(6:00, 12:00, 18:00, 24:00 KST) |
| 첨부파일명 | imageUrl7 | 600 | 옵 | https://www.airkorea.or.kr/dustImage/.. | 미세먼지(PM10) 한반도 대기질 예측모델결과 애니메이션 이미지 |
| 첨부파일명 | imageUrl8 | 600 | 옵 | https://www.airkorea.or.kr/dustImage/.. | 초미세먼지(PM2.5) 한반도 대기질 예측모델결과 애니메이션 이미지 |
| 첨부파일명 | imageUrl9 | 600 | 옵 | https://www.airkorea.or.kr/dustImage/.. | 오존(O3) 한반도 대기질 예측모델결과 애니메이션 이미지 |
| 예측통보시간 | informData | 20 | 필 | 2020-11-14 | 예측통보시간 |

---

# 초미세먼지 주간예보 조회 (getMinuDustWeekFrcstDspth)
- ### 통보코드와 통보시간으로 대기질 전망과 주간예보 정보를 조회하는 초미세먼지 주간예보통보 조회

| 항목명(국문) | 항목명(영문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
| - | - | - | - | - | - |
| 결과코드 | resultCode | 2 | 필 | 00 | 결과코드 |
| 결과메시지 | resultMsg | 50 | 필 | NORMAL SERVICE | 결과메시지 |
| 한 페이지 결과 수 | numOfRows | 4 | 필 | 100	| 한 페이지 결과 수 |
| 페이지 번호 | pageNo | 4 | 필 | 1 | 페이지번호 |
| 전체 결과 수 | totalCount | 4 | 필 | 24	전체 결과 | 수 |
| 첫째날예보 | frcstOneCn | 4000 | 필 | 서울: 낮음, 인천: 낮음, 경기북부... | 첫째날예보 |
| 둘째날예보 | frcstTwoCn | 4000 | 필 | 서울: 낮음, 인천: 낮음, 경기북부... | 둘째날예보 |
| 셋째날예보 | frcstThreeCn | 4000 | 필 | 서울: 낮음, 인천: 낮음, 경기북부... | 셋째날예보 |
| 넷째날예보 | frcstFourCn | 4000 | 필 | 서울: 낮음, 인천: 낮음, 경기북부... | 넷째날예보 |
| 발표일시 | presnatnDT | 10 | 필 | 2020-11-09 | 발표일시 |
| 첫째날예보일시 | frcstOneDt | 10 | 필 | 2020-11-12 | 첫째날예보일시 |
| 둘째날예보일시 | frcstTwoDt | 10 | 필 | 2020-11-13 | 둘째날예보일시 |
| 셋째날예보일시 | frcstThreeDt | 10 | 필 | 2020-11-14 | 셋째날예보일시 |
| 넷째날예보일시 | frcstFourDt | 10 | 필 | 2020-11-15 | 넷째날예보일시 |

---

# 측정소별 실시간 측정정보 조회 (getMsrstnAcctoRltmMesureDnsty)
- ### 측정소명과 측정데이터 기간(일,한달,3개월)으로 해당 측정소의 일반항목 측정정보를 제공하는 측정소별 실시간 측정정보조회

| 항목명(국문) | 항목명(영문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
| - | - | - | - | - | - |
| 결과코드 | resultCode | 2 | 필 | 00 | 결과코드 |
| 결과메시지 | resultMsg | 50 | 필 | NORMAL SERVICE | 결과메시지 |
| 한 페이지 결과 수 | numOfRows | 4 | 필 | 100 | 한 페이지 결과 수 |
| 페이지 번호 | pageNo | 4 | 필 | 1 | 페이지번호 |
| 전체 결과 수 | totalCount | 4 | 필 | 24 | 전체 결과 수 |
| 목록 | items | 0 | 옵 | - | 목록 |
| 측정일 | dataTime | 20 | 필 | 2020-11-25 13:00 | 오염도측정 연-월-일 시간:분 |
| 측정망 정보 | mangName | 10 | 필 | 도시대기 | 측정망 정보(도시대기, 도로변대기, 국가배경농도, 교외대기, 항만) |
| 아황산가스 농도 | so2Value | 10 | 필 | 0.007 | 아황산가스 농도(단위: ppm) |
| 일산화탄소 농도 | coValue | 10 | 필 | 0.4 | 일산화탄소 농도(단위: ppm) |
| 오존 농도 | o3Value | 10 | 필 | 0.043 | 오존 농도(단위: ppm) |
| 이산화질소 농도 | no2Value | 10 | 필 | 0.024 | 이산화질소 농도(단위: ppm) |
| 미세먼지(PM10) 농도 | pm10Value | 10 | 필 | 73 | 미세먼지(PM10) 농도(단위: ug/m3) |
| 미세먼지(PM10) 24시간 예측이동농도 | pm10Value24 | 10 | 옵 | 55 | 미세먼지(PM10) 24시간 예측이동농도(단위: ug/m3) |
| 초미세먼지(PM2.5) 농도 | pm25Value | 10 | 옵 | 44 | 초미세먼지(PM2.5) 농도(단위: ug/m3) |
| 초미세먼지(PM2.5) 24시간 예측이동농도 | pm25Value24 | 10 | 옵 | 31 | 초미세먼지(PM2.5) 24시간 예측이동농도(단위: ug/m3) |
| 통합대기환경수치 | khaiValue | 10 | 필 | 75 | 통합대기환경수치 |
| 통합대기환경지수 | khaiGrade | 10 | 필 | 2 | 통합대기환경지수 |
| 아황산가스 지수 | so2Grade | 10 | 필 | 1 | 아황산가스 지수 |
| 일산화탄소 지수 | coGrade | 10 | 필 | 1 | 일산화탄소 지수 |
| 오존 지수 | o3Grade | 10 | 필 | 2 | 오존 지수 |
| 이산화질소 지수 | no2Grade | 10 | 필 | 1 | 이산화질소 지수 |
| 미세먼지(PM10) 24시간 등급 | pm10Grade | 10 | 필 | 2 | 미세먼지(PM10) 24시간 등급자료 |
| 초미세먼지(PM2.5) 24시간 등급 | pm25Grade | 10 | 옵 | 2 | 초미세먼지(PM2.5) 24시간 등급자료 |
| 미세먼지(PM10) 1시간 등급 | pm10Grade1h | 10 | 옵 | 2 | 미세먼지(PM10) 1시간 등급자료 |
| 초미세먼지(PM2.5) 1시간 등급 | pm25Grade1h | 10 | 옵 | 2 | 초미세먼지(PM2.5) 1시간 등급자료 |
| 아황산가스 플래그 | so2Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 일산화탄소 플래그 | coFlag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 오존 플래그 | o3Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 이산화질소 플래그 | no2Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 미세먼지(PM10) 플래그	| pm10Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 초미세먼지(PM2.5) 플래그 | pm25Flag | 10 | 옵 | 자료이상 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |

---

# 통합대기환경지수 나쁨 이상 측정소 목록조회 (getUnityAirEnvrnIdexSnstiveAboveMsrstnList)
- ### 통합대기환경지수가 나쁨 등급 이상인 측정소명과 주소 목록 정보를 제공하는 통합대기환경지수 나쁨 이상 측정소 목록조회

| 항목명(국문) | 항목명(영문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
| - | - | - | - | - | - |
| 결과코드 | resultCode | 2 | 필 | 00 | 결과코드 |
| 결과메시지 | resultMsg | 50 | 필 | NORMAL SERVICE | 결과메시지 |
| 한 페이지 결과 수 | numOfRows | 4 | 필 | 100 | 한 페이지 결과 수 |
| 페이지 번호 | pageNo | 4 | 필 | 1 | 페이지번호 |
| 전체 결과 수 | totalCount | 4 | 필 | 228 | 전체 결과 수 |
| 목록 | items | 0 | 옵 | - | 목록 |
| 측정소명 | stationName | 30 | 필 | 이현동 | 결과코드 |
| 측정소 주소 | addr | 510 | 필 | 대구 서구 이현동 48-60(중리초등학교)(국채보상로135) | 결과메시지 |

---

# 시도별 실시간 측정정보 조회 (getCtprvnRltmMesureDnsty)
- ### 시도명을 검색조건으로 하여 시도별 측정소목록에 대한 일반 항목과 CAI최종 실시간 측정값과 지수 정보 조회 기능을 제공하는 시도별 실시간 측정정보 조회

| 항목명(국문) | 항목명(영문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명 |
| - | - | - | - | - | - |
| 결과코드 | resultCode | 2 | 필 | 00 | 결과코드 |
| 결과메시지 | resultMsg | 50 | 필 | NORMAL SERVICE | 결과메시지 |
| 한 페이지 결과 수 | numOfRows | 4 | 필 | 100 | 한 페이지 결과 수 |
| 페이지 번호 | pageNo | 4 | 필 | 1 | 페이지번호 |
| 전체 결과 수 | totalCount | 4 | 필 | 228 | 전체 결과 수 |
| 목록 | items | 0 | 옵 | - | 목록 |
| 측정소명 | stationName | 30 | 필수 | 중구 | 측정소명 |
| 측정망 정보 | mangName | 10 | 필수 | 도시대기 | 측정망 정보(도시대기, 도로변대기, 국가배경농도, 교외대기, 항만) |
| 측정일시 | dataTime | 20 | 필수 | 2020-11-25 11:00 | 오염도 측정 연-월-일 시간:분 |
| 아황산가스 농도 | so2Value | 10 | 필 | 0.007 | 아황산가스 농도(단위: ppm) |
| 일산화탄소 농도 | coValue | 10 | 필 | 0.4 | 일산화탄소 농도(단위: ppm) |
| 오존 농도 | o3Value | 10 | 필 | 0.043 | 오존 농도(단위: ppm) |
| 이산화질소 농도 | no2Value | 10 | 필 | 0.024 | 이산화질소 농도(단위: ppm) |
| 미세먼지(PM10) 농도 | pm10Value | 10 | 필 | 73 | 미세먼지(PM10) 농도(단위: ug/m3) |
| 미세먼지(PM10) 24시간 예측이동농도 | pm10Value24 | 10 | 옵 | 55 | 미세먼지(PM10) 24시간 예측이동농도(단위: ug/m3) |
| 초미세먼지(PM2.5) 농도 | pm25Value | 10 | 옵 | 44 | 초미세먼지(PM2.5) 농도(단위: ug/m3) |
| 초미세먼지(PM2.5) 24시간 예측이동농도 | pm25Value24 | 10 | 옵 | 31 | 초미세먼지(PM2.5) 24시간 예측이동농도(단위: ug/m3) |
| 통합대기환경수치 | khaiValue | 10 | 필 | 75 | 통합대기환경수치 |
| 통합대기환경지수 | khaiGrade | 10 | 필 | 2 | 통합대기환경지수 |
| 아황산가스 지수 | so2Grade | 10 | 필 | 1 | 아황산가스 지수 |
| 일산화탄소 지수 | coGrade | 10 | 필 | 1 | 일산화탄소 지수 |
| 오존 지수 | o3Grade | 10 | 필 | 2 | 오존 지수 |
| 이산화질소 지수 | no2Grade | 10 | 필 | 1 | 이산화질소 지수 |
| 미세먼지(PM10) 24시간 등급 | pm10Grade | 10 | 필 | 2 | 미세먼지(PM10) 24시간 등급자료 |
| 초미세먼지(PM2.5) 24시간 등급 | pm25Grade | 10 | 옵 | 2 | 초미세먼지(PM2.5) 24시간 등급자료 |
| 미세먼지(PM10) 1시간 등급 | pm10Grade1h | 10 | 옵 | 2 | 미세먼지(PM10) 1시간 등급자료 |
| 초미세먼지(PM2.5) 1시간 등급 | pm25Grade1h | 10 | 옵 | 2 | 초미세먼지(PM2.5) 1시간 등급자료 |
| 아황산가스 플래그 | so2Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 일산화탄소 플래그 | coFlag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 오존 플래그 | o3Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 이산화질소 플래그 | no2Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 미세먼지(PM10) 플래그	| pm10Flag | 10 | 필 | 점검 및 교정 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |
| 초미세먼지(PM2.5) 플래그 | pm25Flag | 10 | 옵 | 자료이상 | 측정자료 상태정보(점검및교정, 장비점검, 자료이상, 통신장애) |