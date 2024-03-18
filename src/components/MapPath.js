import styled from '@emotion/styled';
import {
  backgroundPathData,
  innerBackgroundPathData,
  pathData,
} from '../paths/paths';
import detailDataJson from '../data/getCtprvnRltmMesureDnsty.json';
import regionList from "../data/regionList.json";
import { Fragment, useRef, useState } from 'react';

import { SeoulInner } from './Seoul';
import { IncheonInner, IncheonPath } from './Incheon';
import { ChungnamInner, ChungnamPath } from './Chungnam';
import { GyeongbukInner, GyeongbukPath } from './Gyeongbuk';
import { GyeongnamInner, GyeongnamPath } from './Gyeongnam';
import { JeonnamInner, JeonnamPath } from './Jeonnam';
import { JeonbukInner, JeonbukPath } from './Jeonbuk';
import { JejuInner, JejuPath } from './Jeju';
import { GyeonggiPath } from './Gyeonggi';
import { GangwonPath } from './Gangwon';
import { DaejeonPath } from './Daejeon';
import { SejongPath } from './Sejong';
import { BusanPath } from './Busan';
import { UlsanPath } from './Ulsan';
import { DaeguPath } from './Daegu';
import { GwangjuPath } from './Gwangju';
import { ChungbukPath } from './Chungbuk';
import { Time } from '../App';

const {
  response: {
    body: { items: detailData },
  },
} = detailDataJson;

/**
 * 대기 정보 목록
 * 좋음 (0~50): #d0ecff / #7ed6ff
 * 보통 (51~100): #caf2de / #94edbc
 * 나쁨 (101~250): #f8f7c6 / #ffeb8b
 * 매우나쁨 (251~): #ffd6da / #ffc1c5
 * 데이터없음: #cbd0d3 / #c1c5c7
 */

// typeRangeValue | default, hover, button, textColor
export const getColorValue = (value, type, rangeValueShow) => {
  const typeRangeValue = {
    khaiValue: [1, 50, 51, 100, 101, 250, 251],
    pm25Value: [1, 15, 16, 35, 36, 75, 76],
    pm10Value: [1, 30, 31, 80, 81, 150, 151],
    o3Value: [0, 0.0309, 0.031, 0.0909, 0.091, 0.01509, 0.151],
    no2Value: [0, 0.03, 0.031, 0.06, 0.061, 0.2, 0.201],
    coValue: [0, 2, 2.1, 9, 8.1, 15, 15.1],
    so2Value: [0, 0.02, 0.0221, 0.05, 0.051, 0.15, 0.151],
  };

  const index = Object.keys(typeRangeValue).indexOf(type);
  const values = Object.values(typeRangeValue)[index];

  if(rangeValueShow){
	return typeRangeValue[type];
  };

  if (value >= values[0] && value <= values[1]) {
    return ['#d0ecff', '#7ed6ff', '#6ac8fe', '#1c67d7'];
  } else if (value >= values[2] && value <= values[3]) {
    return ['#caf2de', '#94edbc', '#59e494', '#01b56e'];
  } else if (value >= values[4] && value <= values[5]) {
    return ['#f8f7c6', '#ffeb8b', '#ffda58', '#937200'];
  } else if (value >= values[6]) {
    return ['#ffd6da', '#ffc1c5', '#ffa8a8', '#c00d0d'];
  } else {
    return ['#cbd0d3', '#c1c5c7', '#abb0b3', '#0a0a0a'];
  }
};


// !---------------------------------------------------------------------------------

/** JSON 사용 */
export const dateTime = detailData[0].dataTime;

/**
 * 전체 지역 평균값
 * @param {*} order	순서
 * @param {*} returnValue 출력 타입 value
 * @returns 지역 측정소별 측정 총합의 평균값
 */
const regionAvgValue = (order, returnValue) => {
  const regionList = {
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

  const filterValue = Object.values(regionList).map((list) => {
    return detailData.filter((data) => {
      return data.sidoName === list;
    });
  });

  const filterTotalValue = filterValue.map((arr) => {
    return arr.reduce((accumulator, currentValue) => {
      const valueToAdd = parseFloat(currentValue[returnValue]);
      if (!isNaN(valueToAdd)) {
        return accumulator + valueToAdd;
      } else {
        return accumulator;
      }
    }, 0);
  });
  const result = filterTotalValue[order] / filterValue[order].length;

  const fixedValue = ['o3Value', 'no2Value', 'so2Value'];
  if (fixedValue.includes(returnValue)) {
    return result.toFixed(4);
  } else if (returnValue === 'coValue') {
	return result.toFixed(2);
  } else return Math.round(result);
};

/**
 * JSON 사용
 * 상세 지역 측정소 값 총합, 평균값
 * @param {*} props
 * @param {*} list
 * @returns 상세 지역 측정소 총합 평균값
 */

const filterStationReturnValue = (type, list) => { 
  const filterStationValue = list.map((region) => {
    return region.station.map((station) => {
      const findData = detailData.find((data) => data.stationName === station)[type];
      if (findData !== '-') {
        return Number(findData);
      } else {
        return 0;
      }
    });
  });

  const result = filterStationValue.map((val) => {
    const sumValue = val.reduce((acc, cur) => acc + cur);
    return Math.round(sumValue / val.length);
  });

  const avgValue = Math.round(
    result.reduce((acc, cur) => acc + cur) / result.length
  );

  return { result, avgValue };
};
// !---------------------------------------------------------------------------------

export const MapPaths = (props) => {
	const [hover, setHover] = useState();
	const [openMap, setOpenMap] = useState();
	const mapName = useRef();
	
	const hoverHandle = (element) => setHover(element);
	const innerClickHandle = (element) => setOpenMap(element);


	const MapSvg = ({ className, children }) => {
	const Style = styled.svg`
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		margin-top: -25px;

		path {
			pointer-events: auto;
		}
	`
	return (
		<Style
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
		>{children}</Style>
	)

	}

	const MapPath = styled.path`
	fill: ${(props) => props.fillColor || '#cbd0d3'};
	cursor: pointer;

	filter: ${props => props.hoverConnection && "drop-shadow(5px 5px 3px rgba(0,0,0,0.2))" };
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

	const InnerMapPath = ({ id, className, title, d, fillColor, fillHoverColor }) => {
	const InnerMapPathStyle = styled.path`
		fill: ${fillColor || '#cbd0d3'};
		&:hover {
		fill: ${fillHoverColor || '#c1c5c7'};
		}
	`;
	return (
	<InnerMapPathStyle id={id} className={className} title={title} d={d} ></InnerMapPathStyle>
	)};

	/** 전국 버튼 위치, 대기 정보 출력 */
	const MainContainer = styled.div`
		position: absolute;
	`;
	const LoopContainer = styled.div`
		position: relative;
	`
	const MapNameButton = styled.button`
		position: absolute;
		left: ${(props) => props.left};
		top: ${(props) => props.top};
		border: none;
		background-color: ${(props) => props.bgColor};
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
	const namePositionVal = [
		{ num: '02',  name: '서울', fullName: '서울특별시', left: '241px', top: '120px'},
		{ num: '031', name: '경기', fullName: '경기도', left: '290px', top: '175px'},
		{ num: '032', name: '인천', fullName: '인천광역시', left: '180px', top: '160px'},
		{ num: '033', name: '강원', fullName: '강원특별자치도', left: '401px', top: '105px'},
		{ num: '041', name: '충남', fullName: '충청남도', left: '206px', top: '325px'},
		{ num: '042', name: '대전', fullName: '대전광역시', left: '310px', top: '330px'},
		{ num: '043', name: '충북', fullName: '충청북도', left: '333px', top: '251px'},
		{ num: '044', name: '세종', fullName: '세종특별자치시', left: '262px', top: '280px'},
		{ num: '051', name: '부산', fullName: '부산광역시', left: '496px', top: '518px'},
		{ num: '052', name: '울산', fullName: '울산광역시', left: '516px', top: '441px'},
		{ num: '053', name: '대구', fullName: '대구광역시', left: '435px', top: '385px'},
		{ num: '054', name: '경북', fullName: '경상북도', left: '470px', top: '280px'},
		{ num: '055', name: '경남', fullName: '경상남도', left: '380px', top: '483px'},
		{ num: '061', name: '전남', fullName: '전라남도', left: '269px', top: '543px'},
		{ num: '062', name: '광주', fullName: '광주광역시', left: '213px', top: '503px'},
		{ num: '063', name: '전북', fullName: '전라북도', left: '257px', top: '422px'},
		{ num: '064', name: '제주', fullName: '제주특별자치도', left:  '45px', top: '640px'},
	];


	/** 상세 지역 컴포넌트 (버튼)  */
	const InnerComponent = ({ regionNum, regionName, fullName }) => {
		const { result } = filterStationReturnValue(props.type, regionList[regionName]);
		
		const renderButton = (el, key) => {
			const id = `p_${regionNum}_${String(key + 1).padStart(3, '0')}`;
			return (
			<InnerMapButton
				key={key}
				id={id}
				style={{
				left: regionList[regionName][key].left,
				top: regionList[regionName][key].top,
				}}
				value={getColorValue(result[key], props.type)[2]}
			>
				{el.name}
				<strong>{result[key] === 0 ? '-' : result[key]}</strong>
			</InnerMapButton>
			);
		};
		const renderPath = (el, key) => {
			return (
			<InnerMapPath
				key={key}
				id={`m_${regionNum}_${String(key + 1).padStart(3, '0')}`}
				title={`${regionName}_${el.name}${el.district}`}
				d={pathData[`m_${regionNum}_${String(key + 1).padStart(3, '0')}`]}
				fillColor={getColorValue(result[key], props.type)[0]}
				fillHoverColor={getColorValue(result[key], props.type)[1]}
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
		const InnerComponent = Components[regionName];

		// Styled
		const DetailContainer = styled.div`
			background: ${(props) =>
			`#dff6ff ${
				props.noImage === 'true' ? '' : `url('/map_bg_${props.regionNum}.jpg')`
			} no-repeat center 35px`};
			position: absolute;
			opacity: 0;
			visibility: hidden;
			border-radius: 10px;
			border: 1px solid #000;
			overflow: hidden;

			&.open {
				z-index: 50;
				opacity: 1;
				visibility: visible;
			}
		`;
		const Title = styled.div`
			position: relative;
			height: 35px;
			background-color: #414d5d;
			text-align: center;
			line-height: 35px;

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
				background: url('./img_cau_close.png') no-repeat center;
				border-radius: 50%;
				border: none;
				cursor: pointer;
			}
		`
		const ButtonWrap = styled.div`
			width: 100%;
			height: 100%;
			position: relative;
		`
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
				>
				{children}
				</svg>
			);
		};

		return (
			<DetailContainer className={regionNum === openMap ? 'open' : null} regionNum={regionNum}>
				<Title>
					<h2>{fullName}</h2>
					<button onClick={() => innerClickHandle(0)}>창 닫기</button>
				</Title>
				<Time top="50px" left="15px" right="initial" />
				{/* 버튼 */}
				<ButtonWrap>{regionList[regionName].map(renderButton)}</ButtonWrap>
				{/* SVG */}
				<InnerMapSvg>
					{InnerComponent && <InnerComponent />}

					{/* 지역 배경 Path */}
					<path
					title={`${regionName}_BG`}
					fill="#BFD3E1"
					stroke="#9EAEC2"
					d={innerBackgroundPathData[regionNum]}
					></path>
			
					{/* 지역 SVG */}
					{regionList[regionName].map(renderPath)}
				</InnerMapSvg>
			</DetailContainer>
		);
	};

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

	return (
		<>
			<MainContainer ref={mapName}>
				{namePositionVal.map((el, key) => {
					let color;
					let hoverChk = false;
					const ifResult = getColorValue(regionAvgValue(key, props.type), props.type);
		
					color = ifResult[0];
					hoverChk = false;
					if (hover === el.num) {
						color = ifResult[1];
						hoverChk = true;
					}
		
					const PathComponent = Components[el.name];

					return (
						<LoopContainer key={key} 
							className={`regions region_${el.num}`}
							onMouseEnter={() => hoverHandle(el.num)}
							onMouseOut={() => hoverHandle('')}
						>
							<MapNameButton 
								left={el.left} 
								top={el.top} 
								bgColor={getColorValue(regionAvgValue(key, props.type), props.type)[2]}
								onClick={() => innerClickHandle(el.num)}
							>
								{el.name}
								<span>{regionAvgValue(key, props.type)}</span>
							</MapNameButton>
							<InnerComponent regionNum={el.num} regionName={el.name} fullName={el.fullName} />
							<MapSvg className={`region_${el.num}`}  key={key}>
								{(el.name === '인천' && PathComponent) && <PathComponent />}
								<MapPath
									key={key}
									title={`${el.name} 지도 배경`}
									fillColor={color}
									hoverConnection={hoverChk}
									onClick={() => innerClickHandle(el.num)}
									d={backgroundPathData[el.num]}
									></MapPath>
								{(el.name !== '인천' && PathComponent) && <PathComponent />}
							</MapSvg>
						</LoopContainer>
					);
				})}
			</MainContainer>
		</>
	)
}