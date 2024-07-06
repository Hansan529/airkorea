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

// ~ Package
import { Fragment, useRef, useState } from 'react';
import styled from '@emotion/styled';

// ~ Json
import { backgroundPathData, innerBackgroundPathData, pathData} from '../data/paths.js';
import regionList from "../data/regionList.json";
import stationJson from "../data/stationInfo.json";
import { SeoulInner } from '../data/Seoul.js';
import { IncheonInner, IncheonPath } from '../data/Incheon.js';
import { ChungnamInner, ChungnamPath } from '../data/Chungnam.js';
import { GyeongbukInner, GyeongbukPath } from '../data/Gyeongbuk.js';
import { GyeongnamInner, GyeongnamPath } from '../data/Gyeongnam.js';
import { JeonnamInner, JeonnamPath } from '../data/Jeonnam.js';
import { JeonbukInner, JeonbukPath } from '../data/Jeonbuk.js';
import { JejuInner, JejuPath } from '../data/Jeju.js';
import { GyeonggiPath } from '../data/Gyeonggi.js';
import { GangwonPath } from '../data/Gangwon.js';
import { DaejeonPath } from '../data/Daejeon.js';
import { SejongPath } from '../data/Sejong.js';
import { BusanPath } from '../data/Busan.js';
import { UlsanPath } from '../data/Ulsan.js';
import { DaeguPath } from '../data/Daegu.js';
import { GwangjuPath } from '../data/Gwangju.js';
import { ChungbukPath } from '../data/Chungbuk.js';

// ~ Hooks
import getColorValue from '../functions/getColorValue.ts';
import useStore from '../hooks/useStore.jsx';

// ~ Style
import { StandbyInnerButtonWrap, StandbyInnerDetailContainer, StandbyInnerMapButton, StandbyInnerMapPathStyle, StandbyInnerSelectDiv, StandbyInnerStationCollection, StandbyInnerTitle, AppLegend, AppLegendWrapper, StandbyLoopContainer, StandbyMainContainer, StandbyMapNameButton, StandbyMapPath, StandbyMapSvgStyle, StandbyStation, StandbyStationPopupStyle } from '../StyleComponent.jsx';

// ! 지역 데이터
const regionDetailData = [
	{ num: '02',  name: '서울', fullName: '서울특별시', left: '241', top: '120'},
	{ num: '031', name: '경기', fullName: '경기도', left: '290', top: '175'},
	{ num: '032', name: '인천', fullName: '인천광역시', left: '180', top: '160'},
	{ num: '033', name: '강원', fullName: '강원특별자치도', left: '401', top: '105'},
	{ num: '041', name: '충남', fullName: '충청남도', left: '206', top: '325'},
	{ num: '042', name: '대전', fullName: '대전광역시', left: '310', top: '330'},
	{ num: '043', name: '충북', fullName: '충청북도', left: '333', top: '251'},
	{ num: '044', name: '세종', fullName: '세종특별자치시', left: '262', top: '280'},
	{ num: '051', name: '부산', fullName: '부산광역시', left: '496', top: '518'},
	{ num: '052', name: '울산', fullName: '울산광역시', left: '516', top: '441'},
	{ num: '053', name: '대구', fullName: '대구광역시', left: '435', top: '385'},
	{ num: '054', name: '경북', fullName: '경상북도', left: '470', top: '280'},
	{ num: '055', name: '경남', fullName: '경상남도', left: '380', top: '483'},
	{ num: '061', name: '전남', fullName: '전라남도', left: '269', top: '543'},
	{ num: '062', name: '광주', fullName: '광주광역시', left: '213', top: '503'},
	{ num: '063', name: '전북', fullName: '전북특별자치도', left: '257', top: '422'},
	{ num: '064', name: '제주', fullName: '제주특별자치도', left:  '45', top: '640'},
];
const regionNumList = {
	'02': '서울',
	'031': '경기',
	'032': '인천',
	'033': '강원',
	'041': '충남',
	'042': '대전',
	'043': '충북',
	'044': '세종',
	'051': '부산',
	'052': '울산',
	'053': '대구',
	'054': '경북',
	'055': '경남',
	'061': '전남',
	'062': '광주',
	'063': '전북',
	'064': '제주',
};

// ! 데이터 함수
/**
	 * # 전체 지역 평균값
	 * @param {*} order	순서
	 * @param {*} returnValue 출력 타입 value
	 * @param {*} data 측정소 데이터
	 * @returns 지역 측정소별 측정 총합의 평균값
	 */
const regionAvgValue = (order, returnValue, data) => {
	if(data){
		const filterValue = Object.values(regionNumList)?.map((list) => {
			return data?.filter((data) => {
				return data.sidoName === list;
			});
		});

		const filterTotalValue = filterValue?.map((arr) => {
		return arr.reduce((accumulator, currentValue) => {
			const valueToAdd = parseFloat(currentValue[returnValue]);
			if (!isNaN(valueToAdd)) {
			return accumulator + valueToAdd;
			} else {
			return accumulator;
			}
		}, 0);
		});
		const result = filterTotalValue[order] / filterValue[order]?.length;
		const fixedValue = ['o3Value', 'no2Value', 'so2Value'];
		if (fixedValue.includes(returnValue)) {
			return result.toFixed(4);
		} else if (returnValue === 'coValue') {
			return result.toFixed(2);
		} else return Math.round(result);
	} else {
		return 0;
	}
};
/**
	 * # 상세 지역 측정소 값 총합, 평균값
	 * @param {*} props
	 * @param {*} list
	 * @param {*} data 측정소 데이터
	 * @returns 상세 지역 측정소 총합 평균값
	 */
const filterStationReturnValue = (type, list, data) => {
	if(data){
		const filterStationValue = list?.map((region) => {
			return region.station?.map((station) => {
				const findData = data?.find((data) => data.stationName === station)?.[type];
				const formatter = Number(findData);
				return isNaN(formatter) ? 0 : formatter;
			});
		});
		const result = filterStationValue?.map((val) => {
			const sumValue = val.reduce((acc, cur) => acc + cur);
			if(type === 'khaiValue' || type === 'pm10Value' || type === 'pm25Value') {
				return Math.round(sumValue / val.length);
			} else {
				return (sumValue / val.length).toFixed(type=== 'coValue' ? 2 : 4);
			}
		});
		const avgValue = Math.round(
			result.reduce((acc, cur) => acc + cur) / result.length
		);
		return { result, avgValue };
	} else {
		return { result: null, avgValue: null }
	}
};


// ! 측정소 데이터
const stationsInfo = stationJson.items;


// @ 전체 지도 SVG 컴포넌트
const MapSvg = ({ className, children }) => {
	return (
		<StandbyMapSvgStyle
			className={className}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="700px"
			height="730px"
			viewBox="0 0 700 730"
			enableBackground="new 0 0 700 730"
			xmlSpace="preserve"
		>{children}</StandbyMapSvgStyle>
	)

};
// @ 내부 지도 Path 컴포넌트
const InnerMapPath = ({ id, title, d, fillColor, fillHoverColor, onClick }) => {
	return <StandbyInnerMapPathStyle id={id} title={title} d={d} onClick={onClick} fillColor={fillColor} fillHoverColor={fillHoverColor} />;
}


// @@@ 출력 컴포넌트 @@@
const Standby = ({Time}) => {
	const { type, data, changer, loading, station, openMap, filterData, filterRange, selectInfo } = useStore(state => state);
	// # 실시간 대기정보 토글 (지도 범례 On/Off)
	const [isOn0, setIsOn0] = useState(true);
	const [isOn1, setIsOn1] = useState(true);
	const [isOn2, setIsOn2] = useState(false);
	const mapName = useRef();
	// # 범례 팝업 함수
	const ClickLegendPopup = (e) => {
		const legendElement = e.currentTarget.closest('[data-legend-index]');
		const { legendIndex } = legendElement.dataset;
	
		const stateUpdater = {
			0: setIsOn0,
			1: setIsOn1,
			2: setIsOn2,
		};
	
		const updater = stateUpdater[legendIndex];
		if(updater)
		  updater(prev => !prev);
	};
	// # 범례 필터링 핸들러
	const filterRangeHandle = (e) => {
	const { value } = e.currentTarget;

	const data = [...filterRange];
	data[value - 1] = e.currentTarget.checked;

	changer('filterRange', data);
	};
	const filterDataHandle = (e) => {
	const { innerText }= e.currentTarget.parentNode;

	const data = {...filterData};
	data[innerText] = e.currentTarget.checked;

	changer('filterData', data);
	};


	// ! 호버
	// # 해당 지역 번호
	const [hover, setHover] = useState();
	// # 해당 측정소 명
	const [hoverStation, setHoverStation] = useState({top: null, left: null, innerTop: null, innerLeft: null});
	// # 해당 측정소에 대한 데이터
	const [hoverStationData, setHoverStationData] = useState({});


	// # 범주 상태 목록 (좋음, 보통, 나쁨, 매우나쁨)
	const typeRange = getColorValue(0, {type, boolean: true});


	// ! 핸들
	const hoverHandle = (element) => setHover(element);
	const hoverStationHandle = (element) => setHoverStation(element);
	const innerClickHandle = (element) => changer('openMap', element);
	const airStationHandle = (element) => changer('selectInfo', element);
	const stationPopupHandle = (hoverStation, data) => {
		setHoverStation(hoverStation);
		setHoverStationData(data);
	};

	const filterDataKeys = Object.keys(filterData);
	const filterDataValues = Object.values(filterData);


	// @ 상세 지도 SVG 컴포넌트
	const InnerMapSvg = ({ children }) => {
		return (
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				width='492px'
				height='548px'
				viewBox='0 0 492 548'
				enableBackground='new 0 0 492 548'
				xmlSpace="preserve"
				style={{visibility: selectInfo === 'station' && 'hidden'}}
			>
			{children}
			</svg>
		);
	};
	// @ 측정소 정보 팝업 컴포넌트
	const StationPopup = ({top, left}) => {
		const legend = (() => {
			switch(type) {
				case "khaiValue":
					return "CAI";
				case "pm25Value":
					return "㎍/㎥";
				case "pm10Value":
					return "㎍/㎥";
				case "o3Value":
					return "ppm";
				case "no2Value":
					return "ppm";
				case "coValue":
					return "ppm";
				case "so2Value":
					return "ppm";
				default:
					return;
			}
		})();
		const DynamicStyle = styled(StandbyStationPopupStyle)`
			&[data-name="${hoverStation?.stationName}"]{
				z-index: 10;
				visibility: visible;
			}
		`;
		return (
			<DynamicStyle top={top} left={left} data-name={hoverStation?.stationName}>
				<div><strong>측정소 명:</strong> <span>{hoverStation?.stationName}</span></div>
				<div><strong>위치:</strong> <span>{hoverStation?.addr}</span></div>
				<div><strong>농도:</strong> <span>{hoverStationData?.[type]} {legend}</span></div>
			</DynamicStyle>
		)
	}
	// ! 지역별
	// @ 지역별 컴포넌트
	const RegionComponents = () => {
		// @ 지역별 상세 지역 버튼 컴포넌트
		const InnerComponent = ({ regNum, regName, fullName }) => {
			const { result } = filterStationReturnValue(type, regionList[regName], data);
			const value = (key) => result ? result[key] : 0;
			const renderButton = (el, key) => {
				const id = `p_${regNum}_${String(key + 1).padStart(3, '0')}`;
				return (
				<StandbyInnerMapButton
					key={key}
					id={id}
					style={{
					left: regionList[regName][key].left,
					top: regionList[regName][key].top,
					}}
					value={getColorValue(0, {value: value(key), type})[2]}
					onClick={() => airStationHandle('station')}
				>
					{el.name}
					<strong>{loading && ((!result || result[key] === 0) ? '-' : result[key])}</strong>
				</StandbyInnerMapButton>
				);
			};
			const renderPath = (el, key) => {
				return (
				<InnerMapPath
					key={key}
					id={`m_${regNum}_${String(key + 1).padStart(3, '0')}`}
					title={`${regName}_${el.name}${el.district}`}
					d={pathData[`m_${regNum}_${String(key + 1).padStart(3, '0')}`]}
					fillColor={selectInfo === 'air' ? getColorValue(0, {value: value(key), type})[0] : '#fff'}
					fillHoverColor={selectInfo === 'air' ? getColorValue(0, {value: value(key), type})[1] : '#fff'}
					onClick={() => airStationHandle('station')}
				></InnerMapPath>
				);
			};
	
			const Components = {
				서울: SeoulInner,
				경기: null,
				인천: IncheonInner,
				강원: null,
				충남: ChungnamInner,
				대전: null,
				충북: null,
				세종: null,
				부산: null,
				울산: null,
				대구: null,
				경북: GyeongbukInner,
				경남: GyeongnamInner,
				전남: JeonnamInner,
				광주: null,
				전북: JeonbukInner,
				제주: JejuInner,
			}
			const DynamicComponent = Components[regName];
	
			/* dynamic */
			const DetailContainer = styled(StandbyInnerDetailContainer)`
				&[data-region_num="${openMap}"]{
					z-index: 50;
					opacity: 1;
					visibility: visible;
				}
			`;
			const SelectDiv = styled(StandbyInnerSelectDiv)`
				button[data-type="${selectInfo}"] {
						background-color: #0f62cc;
						color: #fff;
				}
			`;
	
			// 입력된 지역의 전체 측정소 위치 데이터
			const filterStationData = stationsInfo?.filter(item => {
				return (item.city === fullName) && filterDataValues[filterDataKeys?.indexOf(item.mangName)];
			});
	
			return (
				<DetailContainer data-region_num={regNum} regionNum={regNum}>
					<StandbyInnerTitle>
						<h2>{fullName}</h2>
						<button onClick={() => {
							innerClickHandle(0);
							changer('openMap', 0);
							changer('regionNum', 'none');
						}}>창 닫기</button>
					</StandbyInnerTitle>
					<Time top="50px" left="15px" height="20px" right="initial" />
					<SelectDiv>
						<button data-type="air" onClick={() => airStationHandle('air')}>대기/경보 정보</button>
						<button data-type="station" onClick={() => airStationHandle('station')}>측정소 정보</button>
					</SelectDiv>
					{/* 버튼 */}
					{(selectInfo === 'air') && <StandbyInnerButtonWrap>{regionList[regName]?.map(renderButton)}</StandbyInnerButtonWrap>}
					{(selectInfo === 'station' || selectInfo === 'station') && <StandbyInnerStationCollection>
						{filterStationData?.map((el, key) => {
							const filterStationAirData = data?.find(item => item.stationName === el.stationName);
							const [,,,,icoNum] = getColorValue(0, {value: filterStationAirData?.[type], type});
							if(!filterRange[icoNum - 1]){
								return <Fragment key={key}></Fragment>
							}
							return (
								<StandbyStation key={key}
									onMouseEnter={() => stationPopupHandle(el, filterStationAirData)}
									onMouseOut={() => hoverStationHandle('')}
									onClick={() => changer('station', el)}
									top={el.innerTop}
									left={el.innerLeft}
									ico={getColorValue(0, {value: filterStationAirData?.[type], type})[4]}
								/>
							)
						})}
						<StationPopup top={hoverStation.innerTop} left={hoverStation.innerLeft} />
					</StandbyInnerStationCollection>}
					{/* SVG */}
					<InnerMapSvg>
						{DynamicComponent && <DynamicComponent />}
	
						{/* 지역 배경 Path */}
						<path
						title={`${regName}_BG`}
						fill="#BFD3E1"
						stroke="#9EAEC2"
						d={innerBackgroundPathData[regNum]}
						></path>
	
						{/* 지역 SVG */}
						{regionList[regName]?.map(renderPath)}
					</InnerMapSvg>
				</DetailContainer>
			);
		};
		// # 패스 데이터
		const Components = {
			서울: null,
			경기: GyeonggiPath,
			인천: IncheonPath,
			강원: GangwonPath,
			충남: ChungnamPath,
			대전: DaejeonPath,
			충북: ChungbukPath,
			세종: SejongPath,
			부산: BusanPath,
			울산: UlsanPath,
			대구: DaeguPath,
			경북: GyeongbukPath,
			경남: GyeongnamPath,
			전남: JeonnamPath,
			광주: GwangjuPath,
			전북: JeonbukPath,
			제주: JejuPath,
		}
		// # 전체 맵 버튼, 상세 지역, 전체 맵 SVG
		return regionDetailData?.map((el, key) => {
			let color;
			let hoverColor;
			let hoverChk = false;
			const regionAvgValueResult = regionAvgValue(key, type, data);
			const ifResult = getColorValue(0, {value: regionAvgValueResult, type});
			color = ifResult[0];
			hoverChk = false;
			if (hover === el.num) {
				color = ifResult[1];
				hoverChk = true;
			}
			if(selectInfo === 'station'){
				color = '#fff';
				hoverColor = "#f5fcff";
			}
			const PathComponent = Components[el.name];

			return (
				<StandbyLoopContainer key={key}
					className={`regions region_${el.num}`}
					onMouseOver={() => hoverHandle(el.num)}
					onMouseOut={() => hoverHandle('')}
				>
					{selectInfo === 'air' &&
					<StandbyMapNameButton
						left={el.left}
						top={el.top}
						bgColor={getColorValue(0, {value: regionAvgValueResult, type})[2]}
						onClick={() => innerClickHandle(el.num)}
					>
						{el.name}
						{loading && <span>{regionAvgValueResult}</span>}
					</StandbyMapNameButton>
					}
					{loading && <InnerComponent regNum={el.num} regName={el.name} fullName={el.fullName} />}
					<MapSvg className={`region_${el.num}`}  key={key}>
						{(el.name === '인천' && PathComponent) && <PathComponent />}
						<StandbyMapPath
							key={key}
							title={`${el.name} 지도 배경`}
							fillColor={color}
							hoverColor={hoverColor}
							hoverConnection={hoverChk}
							onClick={() => innerClickHandle(el.num)}
							d={backgroundPathData[el.num]}
						></StandbyMapPath>
						{(el.name !== '인천' && PathComponent) && <PathComponent />}
					</MapSvg>
				</StandbyLoopContainer>
			);
		})
	}

	// @ 측정소 컴포넌트
	const StationComponent = () => {
		return (
			<div style={{position: 'relative'}}>
				{stationsInfo?.map((list, key) => {
					// 장계면 데이터 없음
					const filterStationAirData = data?.find(item => (item.stationName === list.stationName));
					const icoNum = getColorValue(0, {value: filterStationAirData?.[type], type})[4];
					const icoColor = {
						1: "#48c9ff",
						2: "#7eff90",
						3: "#fff200",
						4: "#ff8888",
						5: "#afafaf"
					};

					if (
						!filterDataValues[filterDataKeys?.indexOf(list.mangName)] ||
						!filterRange[icoNum - 1]
					) {
					return <Fragment key={key}></Fragment>;
					}

					const checked = station.stationName === list.stationName ? 'ani' : 'not';

					return (
						<StandbyStation key={key}
							onMouseEnter={() => stationPopupHandle(list, filterStationAirData)}
							onMouseOut={() => hoverStationHandle('')}
							onClick={() => changer('station', list)}
							top={list.top}
							left={list.left}
							ico={icoNum}
							icoColor={icoColor[icoNum]}
							data-checked={checked}
						/>
					)
				})}
				{openMap === 0 && <StationPopup top={hoverStation.top} left={hoverStation.left} />}
			</div>
		)
	}

	return (
		<>
			<StandbyMainContainer ref={mapName}>
				<RegionComponents />
				{selectInfo === 'station' && <StationComponent />}
			</StandbyMainContainer>
			<Time right="0" />
			<AppLegendWrapper>
			{selectInfo === 'air' ?
			<AppLegend data-legend-index="0" className={isOn0 && 'on'} height="55px">
				<div>
				<button onClick={ClickLegendPopup}>범례</button>
				</div>
				<ul>
				<li><small>주의보</small></li>
				<li><small>경보</small></li>
				</ul>
			</AppLegend> :
			<>
			<AppLegend data-legend-index="1" className={isOn1 && 'on'} height="145px">
				<div className="title">
				<button onClick={ClickLegendPopup}>농도범위</button>
				</div>
				<div className="radio">
					<label><input type="checkbox" onChange={filterRangeHandle} value="1" checked={filterRange[0]} />
					<span>좋음 ({`0~${type === 'o3Value' ? typeRange[1].toFixed(3) : typeRange[1]}`})</span>
					</label>
					<label><input type="checkbox" onChange={filterRangeHandle} value="2" checked={filterRange[1]} />
					<span>보통 ({`${type === 'o3Value' ? typeRange[2].toFixed(3) : typeRange[2]}~${type === 'o3Value' ? typeRange[3].toFixed(3) : typeRange[3]}`})</span>
					</label>
					<label><input type="checkbox" onChange={filterRangeHandle} value="3" checked={filterRange[2]} />
					<span>나쁨 ({`${type === 'o3Value' ? typeRange[4].toFixed(3) : typeRange[4]}~${type === 'o3Value' ? typeRange[5].toFixed(3): typeRange[5]}`})</span>
					</label>
					<label><input type="checkbox" onChange={filterRangeHandle} value="4" checked={filterRange[3]} />
					<span>매우나쁨 ({`${typeRange[6]}~`})</span>
					</label>
					<label><input type="checkbox" onChange={filterRangeHandle} value="5" checked={filterRange[4]} />
					<span>데이터 없음</span>
					</label>
				</div>
			</AppLegend>
			<AppLegend data-legend-index="2"  className={isOn2 && 'on'} height="145px">
				<div className="title">
				<button onClick={ClickLegendPopup}>측정망 구분</button>
				</div>
				<div className="radio">
					<label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[0]} />도시대기</label>
					<label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[1]} />국가배경농도</label>
					<label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[2]} />도로변대기</label>
					<label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[3]} />교외대기</label>
					<label><input type="checkbox" onChange={filterDataHandle} checked={Object.values(filterData)[4]} />항만</label>
				</div>
			</AppLegend>
			</>}
			</AppLegendWrapper>
		</>
	)
};

export default Standby;
