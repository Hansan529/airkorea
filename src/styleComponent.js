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
`;
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
export const InnerTitle = styled.div`
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
        background: url('./img_cau_close.png') no-repeat center;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }
`;
export const InnerButtonWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
export const InnerStationCollection = styled.div`
    top:10px;
    left:-5px;
    position: relative;
`;
export const InnerDetailContainer = styled.div`
    background-image: ${props => props.noImage ? '' : `url('/${props.regionNum}.png'), url('/map_bg_${props.regionNum}.jpg')`};
    background-color: #dff6ff;
    background-repeat: no-repeat;
    background-position: center 35px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #000;
    /* overflow: hidden; */
    opacity: 0;
    visibility: hidden;
`;
export const InnerSelectDiv = styled.div`
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

// ^StandbyForecast
export const StandbyMain = styled.div`
    > svg {
        margin: -9px 0 0 6.5px;
    }
`;
export const StandbyNames = styled.div`
    span {
        position: absolute;
        height: 26px;
        padding: 0 10px;
        background: #fff;
        font-size: 14px;
        font-weight: 400;
        color: #646464;
        border: 1px solid #c8c8c8;
        border-radius: 13px;
        text-align: center;
        line-height: 26px;
    }
    .mp03{top: 159px; left: 270px;}
    .mp19{top: 660px; left: 42px;}
    .mp17{top: 580px; left: 240px;}
    .mp12{top: 445px; left: 249px;}
    .mp15{top: 520px; left: 215px;}
    .mp16{top: 505px; left: 388px;}
    .mp11{top: 310px; left: 445px;}
    .mp14{top: 464px; left: 518px;}
    .mp13{top: 395px; left: 435px;}
    .mp18{top: 534px; left: 494px;}
    .mp08{top: 322px; left: 189px;}
    .mp07{top: 257px; left: 345px;}
    .mp09{top: 315px; left: 300px;}
    .mp10{top: 352px; left: 315px;}
    .mp05{top: 177px; left: 464px;}
    .mp02{top: 115px; left: 353px;}
    .mp06{top: 218px; left: 267px;}
    .mp01{top: 106px; left: 209px;}
    .mp04{top: 150px; left: 164px;}
`;

// ^TodayAirQuailty
export const InfoContainer = styled.div`
    width: 660px;
    /* overflow: hidden; */
`;
export const InfoWrapper = styled.div`
border: 5px solid #00aeee;
border-radius: 20px;
padding: 15px;
background-color: #fff;

> div:first-of-type{
    background: url('/img_bg01.png') no-repeat;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    margin-bottom: 15px;

    h2 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;

    > span {
        color: #0f62cc;
    }
    }
}

> div:nth-of-type(2) {
    position: relative;
    display: flex;
    justify-content: space-between;

    > div {
    display: flex;
    gap: 10px;

    > p  {
        font-size: 18px;
        > strong { color: #0f62cc; }
        > span { display: block; margin-top: 5px; font-size: 14px; }
    }
    }

    button {
    font-size: 0;
    }
}
`;
export const InfoButton = styled.button`
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #c6ccd4;
    border-radius: 5px;
    background: #fff ${props => props.ico && `url('/img_${props.ico}.png')`} no-repeat center;
    background-size: ${props => props.ico === 'bg_search' && '70%'};
    &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`
export const InfoInteraction = styled.div`margin-bottom: 20px;`;

export const Container = styled.div`
    position: relative;

    sub {
        vertical-align: sub;
        font-size: smaller;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }

`

export const Part = styled.div`
    display: block;
    border: 1px solid #d2d2d2;
    border-radius: 10px;
    flex-grow: 1;
    background-color: #eaedee;
    overflow: hidden;
    margin-bottom: 20px;

    &:last-of-type {
        margin-bottom: 0;
    }

    h3 {
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    > ul{
        padding: 30px 0px 25px;
        background-color: #fff;
        display: flex;
        align-items: flex-end;

        > li {
            flex: 1;
            text-align: center;
            box-sizing: border-box;

            &:not(:last-child){
                border-right: 0.5px solid rgba(0,0,0,0.3);
            }

            strong, small, span {
                display: block;
            margin-bottom: 5px;

                &:not(strong:first-of-type){
                    margin: 10px 0;
                }
            }

            .colorValue {
                font-size: 24px;
                font-weight: bold;
            }
            img {
                margin: 10px 0;
            }
        }
    }

    .miniText{
        line-height: 2;
        text-indent: 20%;
        background-repeat: no-repeat;
        background-position: 40% center;
    }

    .miniTextIco_1{ background-image: url('./img_yebo_na01.png'); }
    .miniTextIco_2{ background-image: url('./img_yebo_na02.png'); }
    .miniTextIco_3{ background-image: url('./img_yebo_na03.png'); }
    .miniTextIco_4{ background-image: url('./img_yebo_na04.png'); }
    .miniTextIco_5{ background-image: url('./img_yebo_na05.png'); }
`

export const LegendBase = styled.div`
    text-align: center;

    button {
        border:none;
        width: 70px;
        text-align: left;
        background: url('./img_handong_more.png') no-repeat center right;

        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }

    .legendPopup {
        display: none;
        position: absolute;
        bottom: -100px;
        width: 100%;
        border: 1px solid #0a0a0a;
        background-color: #fafafa;
        border-radius: 10px;
        overflow: hidden;
    }

    .legendTitle {
        background-color: #414d5d;
        color: #fafafa;
        padding: 10px 0;
        position: relative;
        height: 15px;

        button {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(-5px, 7.5px);
            font-size: 0;
            background: url('./img_cau_close.png') no-repeat center;
            width: 22px;
            height: 22px;
        }
    }

    .legendFlex {
        display: flex;
        gap: 10px;
        align-items: center;
        height: 30px;
        padding: 15px 10px 0 10px;

        &:last-of-type{ padding: 10px 10px 15px 10px; }

        > div {
            flex: 1;
            border: 1px solid #d2d2d2;
            padding: 5px 0;
            cursor: pointer;
        }
    }

    .legendRange {
        padding: 0 10px 10px 10px;
        white-space: nowrap;

        li {
            display: inline-block;
            width: 20%;
            background-color: #f1fbff;
            box-sizing: border-box;
            padding: 5px;
            border-width: 1px;
            border-style: solid;
            border-color: #c6eeff;
            border-left: none;
            border-right: none;
            &:first-of-type{
                border-left: 1px solid #c6eeff;
                border-radius: 5px 0 0 5px;
            }
            &:last-of-type {
                border-right: 1px solid #c6eeff;
                border-radius: 0 5px 5px 0;
            }
        }

        span {
            display: block;
            position: relative;
            font-size: 11px;
            padding-left: 25px;
            text-align: left;

            &::after {
                display: block;
                content: "";
                position: absolute;
                top: 0;
                left: 10px;
                width: 10px;
                height: 10px;
                background: no-repeat 0 0;
            }
            &.legendRange_1::after { background-image: url('./img_ch01.png'); }
            &.legendRange_2::after { background-image: url('./img_ch02.png'); }
            &.legendRange_3::after { background-image: url('./img_ch03.png'); }
            &.legendRange_4::after { background-image: url('./img_ch04.png'); }
            &.legendRange_5::after { background-image: url('./img_ch05.png'); }
        }
    }
`;

export const AirForecastUl = styled.ul`
    li {
        position: relative;

        p {
            position: absolute;
            top: -25px;
            left: 50%;
            transform: translateX(-50%);
            width: 90px;
            height: 33px;
            line-height: 25px;
        }
        &:nth-of-type(2) p {
            background: url('./img_bg_to01.png') no-repeat 0 0;
        }
        &:nth-of-type(3) p {
            background: url('./img_bg_to02.png') no-repeat 0 0;
        }
    }
`;

/*  */
export const TimeDiv = styled.div`
      display: flex;
      gap: 5px !important;
      background-color: ${props => props.refresh ? '#e4f7ff' : '#fff'};
      height: ${props => props.height || "15px"};
      padding: 5px 15px;
      border-radius: 25px;
      align-items: center;
      position: absolute;
      top: ${props => props.top || 0};
      right: ${props => props.right || 0};
      font-size: 14px;

      ${({left}) => left && css`
        left: {left};
      `}

      strong {
        font-weight: 900;
      }
`;
export const TimeButtonStyle = styled.button`
      background-image: ${props => props.ico && `url('/img_${props.ico}.png')`};
      display: inline-block;
      background: url('/img_refresh.png') no-repeat center;
      width: 16px;
      height: 20px;
      border: none;
      transition: transform 0.5s;
      position: relative;
      transform-origin: center;

      &:hover {
          cursor: pointer;
        }
    `;