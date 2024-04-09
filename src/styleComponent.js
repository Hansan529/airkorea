import { css } from "@emotion/react";
import styled from "@emotion/styled";

// ^ App
export const Select = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
export const Section = styled.section`
    position: relative;
`;
export const FirstSection = styled(Section)`
  background: url('/img_main_bg.png') repeat-x 0 0;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 20px;
`;
export const MMLayout = styled.div`
    flex-basis: 0.5;
    width: 710px;
`;
export const MMOptionLayout = styled.div`
  width: 710px;
  position: relative;
  z-index: 10;
  background-color: #fff;
  border-radius: 10px;
`;
export const MMOList = styled.ul`
  display: flex;
  margin: 0;
  margin-bottom: 5px;

  li {
    flex: 1;
    text-align: center;
    border: 1px solid #d2d2d2;
    border-bottom: none;
    overflow: hidden;

    &:first-of-type {
      border-top-left-radius: 10px;
    }

    &:last-of-type {
      border-top-right-radius: 10px;
    }

    button {
      display: block;
      height: 50px;
      line-height: 50px;
      letter-spacing: -0.6px;
      background: #fff;
      width: 100%;
      border: none;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    &[select="on"]{
      button {
        background: #0f62cc;
        color: #fff;
        font-weight: 600;
      }
    }
  }
`;
export const MMOContainer = styled.div`
  height: 50px;
  background: linear-gradient(to right, #009ffa, #00c36a);
  border-radius: 6px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
`;
export const MMOBorder = `
  border-radius: 30px;
  background: #fff no-repeat right 10px center;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: none;
`;
export const MMOSelectWrapper = styled.div`
  flex: ${props => props.flex && '1 1 calc(33.333% - 20px)'};
  text-align: ${props => props.align || 'center'};
  font-size: 14px;
  color: #0a0a0a;
`;
export const MMOSelect = styled(Select)`
  ${MMOBorder}
  background-image: ${(props) => props.bg && "url('/img_new_arr_down_on.png')"};
  width: ${props => props.$width};
  padding: ${(props) => (props.flex ? '0 3px' : '0 15px')};
  display: ${(props) => props.flex && 'flex'};

  button {
    flex: 1;
    color: #0a0a0a;
    border: none;
    background: none;
    border-radius: 30px;
    height: 24px;

    &.on {
      color: #fff;
      background-color: #414d5d;
    }
  }
`;
export const MMOBorderDiv = styled(MMOSelectWrapper)`
  background: #fff;
  display: flex;
  justify-content: center;
  ${MMOBorder}
  padding: 0 5px;
  box-sizing: border-box;

  button {
    flex: 1;
    border: none;
    background: none;
    border-radius: 30px;
    height: calc(100% - 5px);
    cursor: pointer;
  }

  button[active="on"]{
    font-weight: bold;
    background-color: #414d5d;
    color: #fff;
  }
`;
export const MMWrapper = styled.div`
  width: 700px;
  height: 705px;
  box-sizing: border-box;
  background: url('/map_svg_warp_bg.png') no-repeat 5px -10px;
  position: relative;
  margin-top: 20px;
  /* overflow: hidden; */
`;
export const LegendWrapper = styled.div`
  position: absolute;
    width: 150px;
    right: 1px;
    bottom: 1px;
    overflow: hidden;
`;
export const Legend = styled.div`
  div, .radio > legend {
    background-color: #f6fdff;
    border: 1px solid rgba(0,0,0,0.3);
    border-bottom: none;

    button {
      background: no-repeat right 14px center;
      background-image: url(./img_bottom_arr_up.png);
      border: none;
      width: 100%;
      text-align: left;
      text-indent: 14px;
      cursor: pointer;
      padding: 5px 0;

      &:hover {
        text-decoration: underline;
      }
  }}
  ul, .list {
    border: 1px solid rgba(0,0,0,0.3);
    /* transition: height 0.3s; */
    height: 0;

    li{
    text-indent: 30px;
    background: no-repeat 10px center / 12px;
    padding: 5px 0;
    small {font-size: 14px;}

    &:first-of-type {
      background-image: url(./img_cau01.png);
    }
    &:last-of-type {
      background-image: url(./img_cau02.png);
    }
  }}

  .radio {
    /* transition: height 0.3s; */
    height: 0;
    overflow: hidden;

    label {
        display: flex;
        font-size: 12px;
        align-items: center;
        padding: 5px;

        input {
          width: 12px;
          height: 12px;
        }
      }
  }

  /* Open */
  &.on{
    div, .radio > legend {
      background-color: #0f6ecc;

      button {
        color: #fff;
        background-image: url(./img_bottom_arr_down.png);
      }
    }

    ul, .list {
      height: ${props => props.height};
    }

    .radio {
      background: #fff;
      border: 1px solid rgba(0,0,0,0.3);
      padding-bottom: 5px;

      height: ${props => props.height};
    }
  }

  /*  */
  &[data-legend-index="1"]{
    .radio label {
      position: relative;
      text-indent: 13px;

      &::before {
        content: "";
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        top: 50%;
        left: 25px;
        transform: translateY(-50%);
        background: no-repeat 0 0;
      }
      &:first-of-type::before { background-image: url('./img_ch01.png'); }
      &:nth-of-type(2)::before { background-image: url('./img_ch02.png'); }
      &:nth-of-type(3)::before { background-image: url('./img_ch03.png'); }
      &:nth-of-type(4)::before { background-image: url('./img_ch04.png'); }
      &:last-of-type::before { background-image: url('./img_ch05.png'); }
      }
  }
`;
export const SecondSection = styled(Section)`
    margin: 50px auto 0;
    background: url('./img_bg_s_01.png') repeat-x 0 0;
    width: 1400px;
`;
export const SecondBanner = styled.div`
  position: relative;
  background: linear-gradient(to right, #009ff9, #00c36b);
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  display:flex;
  align-items: center;
  gap: 30px;

  .updateTime {
    text-align: center;
    strong {
      display: block;
      margin-top: 5px;
      font-size: 30px;
      line-height: 17px;
    }
  }

  .text {
    width: 100%;
    height: 80px;
    padding: 0 60px 0 100px;
    background: #fff url(./img_bg_s_02.png) no-repeat right 24px bottom;
    border-radius: 30px 8px 30px 8px;
    position: relative;
    overflow-y: hidden;

    .title {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      font-size: 22px;
      
      &::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 80%;
        background-color: rgba(0,0,0,0.1);
        top: 50%;
        transform: translate(20px, -50%);
      }
      
      strong { 
        display: block; 
      }
    }
  }

  .buttonWrap {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    button {
      width: 20px;
      height: 20px;
      border: none;
      background: no-repeat center center;
      cursor: pointer;

      &.upBtn {
        background-image: url('./img_up_down_up.png');
      }
      &.playBtn {
        background-image: url('./icon_bn_stop.png');
      }
      &.downBtn {
        background-image: url('./img_up_down_down.png');
      }
    }
  }
`;
export const SecondBannerInfo = styled.div`
      transition-duration: 300ms;
      ${({index}) => index && css`
      transform: translateY(-${index * 80}px);
      `}

      div {
        display: flex;
        height: 80px;
        align-items: center;
        word-break: keep-all;
        line-height: 1.5;
        strong {
          margin-right: 15px;
          flex: none;
          color: #0f62cc;
          text-decoration: underline;
        }
      }
`;
export const CopyRight = styled.div`
`;
export const Loading = styled.div`
      display: ${props => props.loading === 'true' ? 'none' : 'block'};
      position: absolute;
      z-index: 100;
      width: 100%;
      height: 100%;
      text-align: center;
      border: 1px solid #bcd0e8;
      background: url('/loading_bg.png');

      div {
        margin-top: 360px;
        font-size: 20px;
        color: #0054a6;
      }
`;

// ^ RealtimeStandby
export const InnerMapButton = styled.button`
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
export const MapPath = styled.path`
	fill: ${(props) => props.fillColor || '#cbd0d3'};
	&:hover{
		fill: ${props => props.hoverColor || null}
	}
	cursor: pointer;

	filter: ${props => props.hoverConnection && "drop-shadow(5px 5px 3px rgba(0,0,0,0.2))" };
`;
export const MapSvgStyle = styled.svg`
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
export const InnerMapPathStyle = styled.path`
	fill: ${props => props.fillColor || '#cbd0d3'};
	&:hover {
	fill: ${props => props.fillHoverColor || '#c1c5c7'};
	}
`;
export const MainContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	/* overflow: hidden; */
`;
export const LoopContainer = styled.div`position: relative;`;
export const MapNameButton = styled.button`
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
export const Station = styled.div`
	position: absolute;
	top: ${props => `${props.top}px`};
	left: ${props => `${props.left}px`};
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #000;
	background-image: url('./img_ch0${props => props.ico}.png');
	cursor: pointer;

	&[data-checked="ani"]::after {
		content: "";
		display: block;
		position: absolute;
		width: 10px;
		height: 10px;
		background-image: url('./img_ch0${props => props.ico}.png');
		left: 0;
		top: 0;
		z-index: 10;
	}
	&[data-checked="ani"]::before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 10px;
		height: 10px;
		border-radius: 50px;
		animation: emphasis 0.5s 0s ease-in-out infinite;
		background: ${props => props.icoColor};
	}

	@keyframes emphasis {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1.8);
		}
	}
`
export const StationPopupStyle = styled.div`
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