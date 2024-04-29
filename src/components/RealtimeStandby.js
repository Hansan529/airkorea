import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Fragment, useRef, useState } from 'react';
import useStore from '../hooks/useStore.js';

import { backgroundPathData, innerBackgroundPathData, pathData} from '../paths/paths.js';
import regionList from "../data/regionList.json";
import stationJson from "../data/stationInfo.json";
import getColorValue from '../functions/getColorValue.ts';

import { SeoulInner } from '../paths/Seoul.js';
import { IncheonInner, IncheonPath } from '../paths/Incheon.js';
import { ChungnamInner, ChungnamPath } from '../paths/Chungnam.js';
import { GyeongbukInner, GyeongbukPath } from '../paths/Gyeongbuk.js';
import { GyeongnamInner, GyeongnamPath } from '../paths/Gyeongnam.js';
import { JeonnamInner, JeonnamPath } from '../paths/Jeonnam.js';
import { JeonbukInner, JeonbukPath } from '../paths/Jeonbuk.js';
import { JejuInner, JejuPath } from '../paths/Jeju.js';
import { GyeonggiPath } from '../paths/Gyeonggi.js';
import { GangwonPath } from '../paths/Gangwon.js';
import { DaejeonPath } from '../paths/Daejeon.js';
import { SejongPath } from '../paths/Sejong.js';
import { BusanPath } from '../paths/Busan.js';
import { UlsanPath } from '../paths/Ulsan.js';
import { DaeguPath } from '../paths/Daegu.js';
import { GwangjuPath } from '../paths/Gwangju.js';
import { ChungbukPath } from '../paths/Chungbuk.js';

const Pseudo = `
	content: "";
	display: block;
	position: absolute;
`;
const InnerMapButton = styled.button`
	position: absolute;
	width: 42px;
	height: 42px;
	border-radius: 50px;
	border: none;
	text-align: center;
	line-height: 17px;
	font-size: 13px;
	background-color: ${(props) => props.value || '#abb0b3'};
	padding: 0;
	strong {
	display: block;
	}
`;
const FillColor = styled.path`
	fill: ${(props) => props.fillColor || '#cbd0d3'};
`
const MapPath = styled(FillColor)`
	&:hover{
		fill: ${props => props.hoverColor || null}
	}
	cursor: pointer;

	filter: ${props => props.hoverConnection && "drop-shadow(5px 5px 3px rgba(0,0,0,0.2))" };
`;
const MapSvgStyle = styled.svg`
	position: absolute;
	left: 0;
	top: 0;
	pointer-events: none;
	margin-top: -35px;
	margin-left: 5px;

	path {
		pointer-events: auto;
	}
`
const InnerMapPathStyle = styled(FillColor)`
	&:hover {
	fill: ${props => props.fillHoverColor || '#c1c5c7'};
	}
`;
const MainContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	/* overflow: hidden; */
`;
const LoopContainer = styled.div`position: relative;`;
const MapNameButton = styled.button`
	position: absolute;
	top: ${({top}) => `${top}px`};
	left: ${({left}) => `${left}px`};
	background-color: ${({bgColor}) => bgColor};
	border: none;
	width: 60px;
	height: 60px;
	border-radius: 30px;
	text-align: center;
	line-height: 17px;
	opacity: 1;
	cursor: pointer;
	font-weight: bold;
	z-index: 10;

	&:hover { text-decoration: underline; }

	> span { display: block; }
`;
const StationKeyframe = keyframes`
	from {transform: scale(0.5);}
	to {transform: scale(1.8);}
`;
const Station = styled.div`
	position: absolute;
	top: ${({top}) => `${top}px`};
	left: ${({left}) => `${left}px`};
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #000;
	background-image: url('./img_ch0${props => props.ico}.webp');
	cursor: pointer;

	&[data-checked="ani"]::after,
	&[data-checked="ani"]::before {
		${Pseudo}
		top: 0;
		left: 0;
		width: 10px;
		height: 10px;
	}
	&[data-checked="ani"]::after {
		background-image: url('./img_ch0${props => props.ico}.webp');
		z-index: 11;
	}
	&[data-checked="ani"]::before {
		border-radius: 50px;
		animation: ${StationKeyframe} 0.5s 0s ease-in-out infinite;
		background: ${props => props.icoColor};
		z-index: 10;
	}
`;
const StationPopupStyle = styled.div`
	position: absolute;
	visibility: hidden;
	transform: translateX(-50%);
	background-color: #414d52;
	white-space: nowrap;
	padding: 10px;
	color: #fff;
	border-radius: 10px;
	transform : translate(-50%, -90px);

	${({top}) => top && css`
	top: ${top}px;
	`}
	${({left}) => left && css`
	left: ${left}px;
	`}

	&::after {
		content: "";
		display: block;
		position: absolute;
		width: 0;
		height: 0;
		left: 50%;
		transform: translateX(calc(-50% + 5px));
		border-top: calc(10px * 1.732) solid #414d52;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}

	div{
		margin-bottom: 5px;
		&:last-of-type{margin-bottom: 0;}
	}

	strong {
		color: #ffea5c;
	}
`;
const InnerTitle = styled.div`
    position: relative;
    height: 35px;
    background-color: #414d5d;
    text-align: center;
    line-height: 35px;
    border-radius: 10px 10px 0 0;

    h2 {
        color: #fff;
        font-weight: 600;
    }

    button {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 0;
        width: 22px;
        height: 22px;
        background: url('./img_cau_close.webp') no-repeat center;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }
`;
const InnerButtonWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
const InnerStationCollection = styled.div`
    top:10px;
    left:-5px;
    position: relative;
`;
const InnerDetailContainer = styled.div`
    background-image: ${props => props.noImage ? '' : `url('/${props.regionNum}.webp'), url('/map_bg_${props.regionNum}.webp')`};
    background-color: #dff6ff;
    background-repeat: no-repeat;
    background-position: center 35px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #000;
    opacity: 0;
    visibility: hidden;
`;
const InnerSelectDiv = styled.div`
    height: 20px;
    position: absolute;
    top: 50px;
    right: 15px;
    background-color: #fff;
    border-radius: 25px;
    border: 5px solid #fff;

    button {
        border: none;
        background: #fff;
        border-radius: 25px;

        &:hover {
            text-decoration: underline;
        }
    }
`;


// * 지역 데이터
// Array
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
// Object
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

// * Components
const MapSvg = ({ className, children }) => {
	return (
		<MapSvgStyle
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
		>{children}</MapSvgStyle>
	)

};
const InnerMapPath = ({ id, title, d, fillColor, fillHoverColor, onClick }) =>
	<InnerMapPathStyle id={id} title={title} d={d} onClick={onClick} fillColor={fillColor} fillHoverColor={fillHoverColor}></InnerMapPathStyle>;




export const RealTimeStandby = ({Time}) => {
	const { type, data, changer, loading, station, openMap, filterData, filterRange, selectInfo } = useStore(state => state);
	// 측정소 위치 데이터
	const stationsInfo = stationJson.items;

	const mapName = useRef();

	// * 호버
	// 해당 지역 번호
	const [hover, setHover] = useState();
	// 해당 측정소 명
	const [hoverStation, setHoverStation] = useState({top: null, left: null, innerTop: null, innerLeft: null});
	// 해당 측정소에 대한 데이터
	const [hoverStationData, setHoverStationData] = useState({});

// ---------------------------------- event
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

	// ^-------------------------------------------------------------- JSON
	/** JSON 사용 */
	/**
	 * 전체 지역 평균값
	 * @param {*} order	순서
	 * @param {*} returnValue 출력 타입 value
	 * @returns 지역 측정소별 측정 총합의 평균값
	 */
	const regionAvgValue = (order, returnValue) => {
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
	 * JSON 사용
	 * 상세 지역 측정소 값 총합, 평균값
	 * @param {*} props
	 * @param {*} list
	 * @returns 상세 지역 측정소 총합 평균값
	 */
	const filterStationReturnValue = (type, list) => {
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
	// ^-------------------------------------------------------------- JSON

	// * Component
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
		const DynamicStyle = styled(StationPopupStyle)`
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
	// * 지역별 컴포넌트
	const RegionComponents = () => {

		/** 상세 지역 컴포넌트 (버튼)  */
		const InnerComponent = ({ regNum, regName, fullName }) => {
			const { result } = filterStationReturnValue(type, regionList[regName]);
			const value = (key) => result ? result[key] : 0;
			const renderButton = (el, key) => {
				const id = `p_${regNum}_${String(key + 1).padStart(3, '0')}`;
				return (
				<InnerMapButton
					key={key}
					id={id}
					style={{
					left: regionList[regName][key].left,
					top: regionList[regName][key].top,
					}}
					value={getColorValue(value(key), type)[2]}
					onClick={() => airStationHandle('station')}
				>
					{el.name}
					<strong>{loading && ((!result || result[key] === 0) ? '-' : result[key])}</strong>
				</InnerMapButton>
				);
			};
			const renderPath = (el, key) => {
				return (
				<InnerMapPath
					key={key}
					id={`m_${regNum}_${String(key + 1).padStart(3, '0')}`}
					title={`${regName}_${el.name}${el.district}`}
					d={pathData[`m_${regNum}_${String(key + 1).padStart(3, '0')}`]}
					fillColor={selectInfo === 'air' ? getColorValue(value(key), type)[0] : '#fff'}
					fillHoverColor={selectInfo === 'air' ? getColorValue(value(key), type)[1] : '#fff'}
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
			const DetailContainer = styled(InnerDetailContainer)`
				&[data-region_num="${openMap}"]{
					z-index: 50;
					opacity: 1;
					visibility: visible;
				}
			`;
			const SelectDiv = styled(InnerSelectDiv)`
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
					<InnerTitle>
						<h2>{fullName}</h2>
						<button onClick={() => {
							innerClickHandle(0);
							changer('openMap', 0);
							changer('regionNum', 'none');
						}}>창 닫기</button>
					</InnerTitle>
					<Time top="50px" left="15px" height="20px" right="initial" />
					<SelectDiv>
						<button data-type="air" onClick={() => airStationHandle('air')}>대기/경보 정보</button>
						<button data-type="station" onClick={() => airStationHandle('station')}>측정소 정보</button>
					</SelectDiv>
					{/* 버튼 */}
					{(selectInfo === 'air') && <InnerButtonWrap>{regionList[regName]?.map(renderButton)}</InnerButtonWrap>}
					{(selectInfo === 'station' || selectInfo === 'station') && <InnerStationCollection>
						{filterStationData?.map((el, key) => {
							const filterStationAirData = data?.find(item => item.stationName === el.stationName);
							const icoNum = getColorValue(filterStationAirData?.[type], type)[4];
							if(!filterRange[icoNum - 1]){
								return <Fragment key={key}></Fragment>
							}
							return (
								<Station key={key}
									onMouseEnter={() => stationPopupHandle(el, filterStationAirData)}
									onMouseOut={() => hoverStationHandle('')}
									onClick={() => changer('station', el)}
									top={el.innerTop}
									left={el.innerLeft}
									ico={getColorValue(filterStationAirData?.[type], type)[4]}
								/>
							)
						})}
						<StationPopup top={hoverStation.innerTop} left={hoverStation.innerLeft} />
					</InnerStationCollection>}
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

		/** 패스 컴포넌트 */
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

		/** 전체 맵 버튼, 상세 지역, 전체 맵 SVG */
		return regionDetailData?.map((el, key) => {
			let color;
			let hoverColor;
			let hoverChk = false;
			const ifResult = getColorValue(regionAvgValue(key, type), type);

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
				<LoopContainer key={key}
					className={`regions region_${el.num}`}
					onMouseOver={() => hoverHandle(el.num)}
					onMouseOut={() => hoverHandle('')}
				>
					{selectInfo === 'air' &&
					<MapNameButton
						left={el.left}
						top={el.top}
						bgColor={getColorValue(regionAvgValue(key, type), type)[2]}
						onClick={() => innerClickHandle(el.num)}
					>
						{el.name}
						{loading && <span>{regionAvgValue(key, type)}</span>}
					</MapNameButton>
					}
					{loading && <InnerComponent regNum={el.num} regName={el.name} fullName={el.fullName} />}
					<MapSvg className={`region_${el.num}`}  key={key}>
						{(el.name === '인천' && PathComponent) && <PathComponent />}
						<MapPath
							key={key}
							title={`${el.name} 지도 배경`}
							fillColor={color}
							hoverColor={hoverColor}
							hoverConnection={hoverChk}
							onClick={() => innerClickHandle(el.num)}
							d={backgroundPathData[el.num]}
						></MapPath>
						{(el.name !== '인천' && PathComponent) && <PathComponent />}
					</MapSvg>
				</LoopContainer>
			);
		})
	}

	// * 측정소 컴포넌트
	const StationComponent = () => {
		const Div = styled.div`position: relative;`
		// const stationData = stationsInfo.find(item => item.stationName === hoverStation);
		return (
			<Div>
				{stationsInfo?.map((list, key) => {
					// 장계면 데이터 없음
					const filterStationAirData = data?.find(item => (item.stationName === list.stationName));
					const icoNum = getColorValue(filterStationAirData?.[type], type)[4];
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
						<Station key={key}
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
			</Div>
		)
	}

	return (
		<>
			<MainContainer ref={mapName}>
				<RegionComponents />
				{selectInfo === 'station' && <StationComponent />}
			</MainContainer>
		</>
	)
}
