import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

// @ Layout.jsx
// ! 네비게이션
export const LayoutDivStyle = styled.div`
    background-color: #f5f5f5;
    border-bottom: 1px solid #dcdcdc;
    height: 50px;
    position: sticky;
    top: 0;
    z-index: 10000;
`;
export const LayoutTopBar = styled.ul`
    display: flex;
    width: 1400px;
    margin: 0 auto;
    position: relative;
`;
export const LayoutHome = styled(Link)`
    background: url(/images/global/img_loc_home.webp) no-repeat center center;
    display: block;
    width: 50px;
    height: 50px;
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
`;
export const LayoutList = styled.li`
    display: flex;
    /* width: 250px; */
    align-items: center;
    border-right: 1px solid #dcdcdc;
    position: relative;
    z-index: 10;

    a:hover { text-decoration: underline; }
`;
export const LayoutAElement = styled(Link)`
    display: block;
    width: 250px;
    height: 100%;
    line-height: 50px;
    color: #000;
    padding: 0 20px;
    background: ${props => props['data-direction'] === 'up' ? `url('/images/info/img_loc_up.webp')` : `url('/images/info/img_loc_under.webp')`} no-repeat 220px center;
    position: relative;
    z-index: 10;
`;
export const LayoutListDetail = styled.ul`
    position: absolute;
    width: 250px;
    top: 49px;
    left: -0.8px;
    overflow: hidden;
    height: ${props => `${props.$height}px`};
    transition: height 0.5s;
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    background-color: #fff;
    /* box-shadow: 0 0 0 1px #dcdcdc inset; */
    border: 1px solid #dcdcdc;
    border-top: none;
    box-sizing: content-box;

    li> a {
            display: block;
            height: 50px;
            padding: 0 20px;
            line-height: 50px;
            border-top: none;
            color: #000;
            box-sizing: border-box;
    }
    li+li>a{ border-top: 1px solid #dcdcdc; }
`;
//정보 사이드
export const LayoutAside = styled.aside`
    min-width: 280px;
    width: 280px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    margin-top: -20px;
    align-self: flex-start;

    h2 {
        display: block;
        height: 140px;
        font-size: 26px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        padding: 44px 0 0 0;
        background: linear-gradient(to right, #0f62cc, #00c28a);
        border-radius: 10px;
        box-sizing: border-box;
    }
    > ul {
        margin-top: -30px;
        padding: 37px 20px 54px;
        background-color: #fff;
        border: 1px solid #dadcdf;
        border-radius: 10px;

        > li { border-bottom: 1px solid #dcdcdc; }
    }
    `;
export const LayoutAsideLink = styled(Link)`
    display: block;
    height: 50px;
    padding: 0 13px;
    line-height: 50px;
    letter-spacing: -1px;
    color: ${({selected}) => selected ? '#0f62cc' : '#000'};
    font-weight: 500;
    background: ${({showmore,children_height}) => showmore === 'true' 
                    ? (children_height === 0 
                        ? 'url(/images/global/img_left_down.webp) no-repeat right 15px center' 
                        : 'url(/images/global/img_left_up.webp) no-repeat right 15px center') 
                    : null};

    &:hover { color: #0f62cc; }
`;
export const LayoutAsideLinkUl = styled.ul`
    transition: 0.5s ease;
    height: ${({$height}) => `${$height}px`};
    padding: 0 10px;
    border-top: 2px solid #0f62cc;
    border-width: ${({$height}) => $height === 0 ? 0 : '2px'};
    overflow: hidden;
`;
export const LayoutAsideLinkA = styled(Link)`
    display: block;
    height: 50px;
    padding: 0 15px;
    font-size: 15px;
    color: ${({selected}) => selected ? '#0f62cc' : '#464646'};
    font-weight: 400;
    line-height: 50px;
    border-bottom: 1px dotted #dcdcdc;
    &:hover { color: #0f62cc; }
`;
//정보 메인
export const LayoutSection = styled.section`
    display: flex;
    width: 1400px;
    padding: 40px 0 0 0;
    gap: 0 50px;
    margin: 0 auto;
`;
export const LayoutContent = styled.div`
    flex-grow: 1;
    padding-bottom: 100px;
    word-break: keep-all;
`;
export const LayoutContentTitle = styled.h2`
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding: 20px 20px;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 600;
`;


// @ Header.jsx
const headerHeight = '90px';
export const HeaderElement = styled.header`
  display: flex;
  position: relative;
  width: 100%;
  height: ${headerHeight};
  z-index: 11000;
  background-color: #fff;
  border-bottom: 1px solid #dcdcdc;
`;
export const HeaderContainer = styled.section`
  position: relative;
`;
export const HeaderMainLogo = styled.h1`
  position: absolute;
  margin: 0;
  top: 20px;
  left: 0;

  a {
    display: block;

    img {
      vertical-align: middle;
      border: 0;
    }
  }
`;
export const HeaderGlobalNav = styled.div`
  height: 100%;
`;
export const HeaderNavUl = styled.ul`
  display: flex;
  justify-content: center;
  gap: 58px;
  margin: 0;
  padding: 0;
`;
export const HeaderNavLi = styled.li`
  display: inline-block;
  position: relative;
  line-height: ${headerHeight};
  list-style: none;

  a {
    text-decoration: none;
    color: #000;
    &:visited { color: #000; }
    &:hover { color: #0f62cc; }
  }
  
  /* 제목 */
  > a {
    font-weight: 600;
    font-size: 18px;
    display: block;
  }

  /* hover 팝업 */
  ul {
    display: none;
    position: absolute;
    left: 50%;
    top: 80px;
    padding: 15px 20px 18px;
    background: #fff;
    border: 1px solid #0f62cc;
    border-radius: 8px;
    transform: translate(-50%, 0);

    li {
      position: relative;
      z-index: 2;
      font-size: 16px;
      color: #0a0a0a;
      font-weight: 400;
      letter-spacing: -0.6px;
      line-height: 17px;
      white-space: nowrap;
      &+li{ margin-top: 10px; }

      a { 
        position: relative; 

        &::before {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0%;
          z-index: -1;
          width: 0px;
          height: 65%;
          background: #d7f4ff;
          transition: width .3s ease;
        }
      }
    }
  }

  &.over ul {
    display: block;

    li a:hover::before { width: 100%; }
  }
`;
export const HeaderUtil = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  gap: 20px;
  align-items: center;
`;
export const HeaderUtilBtn = styled.button`
  display: inline-block;
  width: 25px;
  height: 24px;
  background: url(${(props) => props.bgImg}) no-repeat center;
  position: relative;
  border: none;

  > span {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    border: 0;
    padding: 0;
    white-space: nowrap;
  }
`;


// @ Footer.jsx
export const FooterComp = styled.footer`
    overflow: hidden;
    border-top: 1px solid #dcdcdc;
`;
export const FooterInfoArea = styled.div`
    display: flex;
    width: 1400px;
    height: 120px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;
export const FooterInfoAreaLogo = styled.h2`
    flex-basis: 180px;
    text-align: center;
    line-height: 100px;
    margin-right: 20px;
    img {
        vertical-align: middle;
    }
`;
export const FooterInfoAreaCallDust = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 860px;
    font-size: 14px;
    flex-grow: 1;
    position: relative;

    > div {
        /* position: relative; */
        display: flex;
    }
    a[href^="tel:"] { font-size: 0; }
`;
export const FooterInfoAreaPseudo = styled.div`
    margin: 0 20px;
    width: 2px;
    height: 20px;
    background-color: rgba(0,0,0,0.2);
`;
export const FooterInfoAreaIconWrap = styled.div`
    margin-top: 10px;
    >*:first-of-type { margin-right: 40px; }
`;
export const FooterCopyRight = styled.div`
    a{
        color: darkblue;
        text-decoration: underline;
        &:visited { color: darkblue; }
    }
`;
export const FooterCopyRightImg = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    img {
        display: block;
        height: 30px;
        margin-bottom: 5px;
    }
`;


// @ App.jsx
export const AppSelect = styled.select`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
export const AppTimeDiv = styled.div`
      display: flex;
      gap: 5px !important;
      background-color: ${props => props.refresh ? '#e4f7ff' : '#fff'};
      padding: 5px 15px;
      border-radius: 25px;
      align-items: center;
      position: absolute;
      font-size: 14px;
      height: ${props => props.height || "15px"};
      top: ${props => props.top || 'initial'};
      right: ${props => props.right || 'initial'};
      left: ${props => props.left || 'initial'};

      strong { font-weight: 900; }
`;
export const AppTimeButtonStyle = styled.button`
      /* background-image: ${props => props.ico && `url('/images/main/img_${props.ico}.webp')`}; */
      display: inline-block;
      background: url(/images/main/img_refresh.webp) no-repeat center;
      width: 16px;
      height: 20px;
      border: none;
      transition: transform 0.5s;
      position: relative;
      transform-origin: center;
      font-size: 0;

      &:hover { cursor: pointer; }
`;
//! 첫번째 섹션
export const AppFirstSection = styled.section`
    position: relative;
  background: url(/images/main/img_main_bg.webp) repeat-x 0 0;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 20px;
`;
export const AppMMLayout = styled.div`
    flex-basis: 0.5;
    width: 710px;
`;
export const AppMMOptionLayout = styled.div`
  width: 710px;
  position: relative;
  z-index: 10;
  background-color: #fff;
  border-radius: 10px;
`;
export const AppMMOList = styled.ul`
  display: flex;
  margin: 0;
  margin-bottom: 5px;

  li {
    flex: 1;
    text-align: center;
    border: 1px solid #d2d2d2;
    border-bottom: none;
    overflow: hidden;

    &:first-of-type { border-top-left-radius: 10px; }
    &:last-of-type { border-top-right-radius: 10px; }

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
export const AppMMOContainer = styled.div`
  height: 50px;
  background: linear-gradient(to right, #009ffa, #00c36a);
  border-radius: 6px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
`;
const MMOBorder = `
  border-radius: 30px;
  background: #fff no-repeat right 10px center;
  justify-content: center;
  align-items: center;
  height: 30px;
  border: none;
`;
export const AppMMOSelectWrapper = styled.div`
  flex: ${props => props.flex && '1 1 calc(33.333% - 20px)'};
  text-align: ${props => props.align || 'center'};
  font-size: 14px;
  color: #0a0a0a;
`;
export const AppMMOSelect = styled(AppSelect)`
  ${MMOBorder}
  background-image: ${(props) => props.bg && "url('/images/main/img_new_arr_down_on.webp')"};
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
export const AppMMOBorderDiv = styled(AppMMOSelectWrapper)`
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
export const AppMMWrapper = styled.div`
  width: 700px;
  height: 705px;
  box-sizing: border-box;
  background: url(/images/main/map_svg_warp_bg.webp) no-repeat 5px -10px;
  position: relative;
  margin-top: 20px;
  /* overflow: hidden; */
`;
export const AppLegendWrapper = styled.div`
  position: absolute;
    width: 150px;
    right: 1px;
    bottom: 1px;
    overflow: hidden;
`;
export const AppLegend = styled.div`
  div, .radio > legend {
    background-color: #f6fdff;
    border: 1px solid rgba(0,0,0,0.3);
    border-bottom: none;

    button {
      background: no-repeat right 14px center;
      background-image: url(/images/main/img_bottom_arr_up.webp);
      border: none;
      width: 100%;
      text-align: left;
      text-indent: 14px;
      cursor: pointer;
      padding: 5px 0;

      &:hover { text-decoration: underline; }
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

    &:first-of-type { background-image: url(/images/main/img_cau01.webp); }
    &:last-of-type { background-image: url(/images/main/img_cau02.webp);}
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
        background-image: url(./img_bottom_arr_down.webp);
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
      &:first-of-type::before { background-image: url(/images/main/img_ch01.webp); }
      &:nth-of-type(2)::before { background-image: url(/images/main/img_ch02.webp); }
      &:nth-of-type(3)::before { background-image: url(/images/main/img_ch03.webp); }
      &:nth-of-type(4)::before { background-image: url(/images/main/img_ch04.webp); }
      &:last-of-type::before { background-image: url(/images/main/img_ch05.webp); }
      }
  }
`;
//! 두번째 섹션
export const AppSecondSection = styled.section`
    position: relative;
    margin: 50px auto 0;
    background: url(/images/main/img_bg_s_01.webp) repeat-x 0 0;
    width: 1400px;
`;
export const AppSecondBanner = styled.div`
  position: relative;
  background: linear-gradient(to right, #009ff9, #00c36b);
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  display:flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;

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
    background: #fff url(/images/main/img_bg_s_02.webp) no-repeat right 24px bottom;
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

      &[data-type="up"] {background-image: url(/images/main/img_up_down_up.webp);}
      &[data-type="play"] {background-image: url(/images/main/icon_bn_stop.webp);}
      &[data-type="stop"] {background-image: url(/images/main/icon_bn_play.webp);}
      &[data-type="down"] {background-image: url(/images/main/img_up_down_down.webp);}
    }
  }
`;
export const AppSecondBannerInfo = styled.div`
      transition-duration: var(--transition-duration);
      transform: translateY(var(--translate-y));

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
        span{
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
`;
//! 하단 배너
export const AppBannerWrap = styled.div`
    display: flex;
    width: 1400px;
    margin: 0 auto 50px;
    overflow: hidden;
`;
export const AppButtonBox = styled.div`
    width: 200px;
    flex-basis: 200px;
    min-width: 200px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background-color: #fff;
    h3 {
        font-size:  20px;
        font-weight: bold;
        margin-right: 10px;
    }
`;
export const AppBtn = styled.button`
    width: 20px;
    height: 20px;
    border: none;
    background: no-repeat 0 0;
    cursor: pointer;
    &[data-btn="left"]  { background-image: url(/images/main/img_ban_left.webp); }
    &[data-btn="atop"]  { background-image: url(/images/main/img_ban_atop.webp); }
    &[data-btn="auto"]  { background-image: url(/images/main/img_ban_auto.webp); }
    &[data-btn="right"] { background-image: url(/images/main/img_ban_right.webp); }
`;
export const AppListUl = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    transition-duration: var(--transition-duration);
    transform: translateX(var(--translate-x));
`;
export const AppListLi = styled.li`
    flex: 0 200px;
    min-width: 200px;
    text-align: center;
    height: 35px;
    line-height: 35px;

    img {
        vertical-align: middle;
    }
`;


// @ Standby.jsx
const Pseudo = `
	content: "";
	display: block;
	position: absolute;
`;
export const StandbyInnerMapButton = styled.button`
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
export const StandbyFillColor = styled.path` fill: ${(props) => props.fillColor || '#cbd0d3'}; `
export const StandbyMapPath = styled(StandbyFillColor)`
	&:hover{ fill: ${props => props.hoverColor || null} }
	cursor: pointer;
	filter: ${props => props.hoverConnection && "drop-shadow(5px 5px 3px rgba(0,0,0,0.2))" };
`;
export const StandbyMapSvgStyle = styled.svg`
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
export const StandbyInnerMapPathStyle = styled(StandbyFillColor)`&:hover { fill: ${props => props.fillHoverColor || '#c1c5c7'};}`;
export const StandbyMainContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	/* overflow: hidden; */
`;
export const StandbyLoopContainer = styled.div` position: relative; `;
export const StandbyMapNameButton = styled.button`
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
export const StandbyStationKeyframe = keyframes`
	from {transform: scale(0.5);}
	to {transform: scale(1.8);}
`;
export const StandbyStation = styled.div`
	position: absolute;
	top: ${({top}) => `${top}px`};
	left: ${({left}) => `${left}px`};
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: #000;
	background-image: url('/images/main/img_ch0${props => props.ico}.webp');
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
		background-image: url('/images/main/img_ch0${props => props.ico}.webp');
		z-index: 11;
	}
	&[data-checked="ani"]::before {
		border-radius: 50px;
		animation: ${StandbyStationKeyframe} 0.5s 0s ease-in-out infinite;
		background: ${props => props.icoColor};
		z-index: 10;
	}
`;
export const StandbyStationPopupStyle = styled.div`
	position: absolute;
	visibility: hidden;
	transform: translateX(-50%);
	background-color: #414d52;
	white-space: nowrap;
	padding: 10px;
	color: #fff;
	border-radius: 10px;
	transform : translate(-50%, -90px);

	top: ${props => props.top || 'initial'}px;
	left: ${props => props.left || 'initial'}px;

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

	strong { color: #ffea5c; }
`;
export const StandbyInnerTitle = styled.div`
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
        background: url(/images/main/img_cau_close.webp) no-repeat center;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }
`;
export const StandbyInnerButtonWrap = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;
export const StandbyInnerStationCollection = styled.div`
    top:10px;
    left:-5px;
    position: relative;
`;
export const StandbyInnerDetailContainer = styled.div`
    background-image: ${props => props.noImage ? '' : `url('/images/main/${props.regionNum}.webp'), url('/images/main/map_bg_${props.regionNum}.webp')`};
    background-color: #dff6ff;
    background-repeat: no-repeat;
    background-position: center 35px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #000;
    opacity: 0;
    visibility: hidden;
`;
export const StandbyInnerSelectDiv = styled.div`
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

        &:hover { text-decoration: underline; }
    }
`;


// @ StyledbyForecast.jsx
export const StyledbyForecastMain = styled.div` > svg { margin: -9px 0 0 6.5px; }`;
export const StyledbyForecastNames = styled.div`
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


// @ TodayAirQuality.jsx
export const TodayAirQualityInfoContainer = styled.div`width: 660px;`;
export const TodayAirQualityInfoWrapper = styled.div`
    border: 5px solid #00aeee;
    border-radius: 20px;
    padding: 15px;
    background-color: #fff;
`;
export const TodayAirQualityInfoButton = styled.button`
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #c6ccd4;
    border-radius: 5px;
    background: #fff ${props => props.ico && `url('/images/main/img_${props.ico}.webp')`} no-repeat center;
    background-size: ${props => props.ico === 'bg_search' && '70%'};
    &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`;
export const TodayAirQualityInfoWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;
export const TodayAirQualityInfoInteraction = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    > p  {
        font-size: 18px;
        > strong { color: #0f62cc; }
        > span { display: block; margin-top: 5px; font-size: 14px; }
    }
    button {
        font-size: 0;
    }
`;
export const TodayAirQualityTitleWrap = styled.div`
    background: url(/images/main/img_bg01.webp) no-repeat;
    height: 55px;
    line-height: 55px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    margin-bottom: 15px;
`;
export const TodayAirQualityTitle = styled.h2`
    font-size: 30px;
    font-weight: 700;
    text-align: center;

    span {color: #0f62cc;}
`;
export const TodayAirQualityContainer = styled.div`
    position: relative;

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

`;
export const TodayAirQualityPart = styled.div`
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

    .miniText{
        line-height: 2;
        background-repeat: no-repeat;
        background-position: 30px center;
    }
    .miniTextIco_1{
        background-image: url(/images/main/img_yebo_na01.webp);
        background-color: #1c67d74D;
    }
    .miniTextIco_2{
        background-image: url(/images/main/img_yebo_na02.webp);
        background-color: #01b56e4D;
    }
    .miniTextIco_3{
        background-image: url(/images/main/img_yebo_na03.webp);
        background-color: #9372004D;
    }
    .miniTextIco_4{
        background-image: url(/images/main/img_yebo_na04.webp);
        background-color: #c00d0d4D;
    }
    .miniTextIco_5{
        background-image: url(/images/main/img_yebo_na05.webp);
        background-color: #0a0a0a4D;
    }
`;
export const TodayAirQualityPartTitle = styled.h3`
    padding: 10px 0;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;
export const TodayAirQualityPartUl = styled.ul`
    padding: 30px 0px 25px;
    background-color: #fff;
    display: flex;
    align-items: flex-end;
`;
export const TodayAirQualityPartLi = styled.li`
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
            margin-top: 10px;
        }
    }
    .colorValue {
        font-size: 24px;
        font-weight: bold;
    }
    img {
        margin: 10px 0;
    }
`;
export const TodayAirQualityLegendBase = styled.div`
    text-align: center;

    button {
        border:none;
        width: 70px;
        text-align: left;
        background: url(/images/main/img_handong_more.webp) no-repeat center right;

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
            background: url(/images/main/img_cau_close.webp) no-repeat center;
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
            &.legendRange_1::after { background-image: url(/images/main/img_ch01.webp); }
            &.legendRange_2::after { background-image: url(/images/main/img_ch02.webp); }
            &.legendRange_3::after { background-image: url(/images/main/img_ch03.webp); }
            &.legendRange_4::after { background-image: url(/images/main/img_ch04.webp); }
            &.legendRange_5::after { background-image: url(/images/main/img_ch05.webp); }
        }
    }
`;
export const TodayAirQualityAirForecastLi = styled(TodayAirQualityPartLi)`
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
        background: url(/images/main/img_bg_to01.webp) no-repeat 0 0;
    }
    &:nth-of-type(3) p {
        background: url(/images/main/img_bg_to02.webp) no-repeat 0 0;
    }
`;

// ! 상속
export const ContentTable = styled.table`
    width: 100%;
    border-top: 2px solid #000;
    margin: 20px 0;

    caption { 
        text-align: left;
        margin-bottom: 10px;
        ul { list-style: inside; }
    }

    th { font-weight: 600; }

    th, td {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #dcdcdc;
        padding: 15px 10px;
        font-size: 14px;
    }
`;
// @ info/page1.jsx
export const InfoPage1ContentSubTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    height: 275px;
    padding: 20px;
    text-align: center;
    border: 5px solid #e4eef8;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 20px;

    > div:first-of-type {
        display: table;
        width: 100%;
        height: 150px;
        background: #f7f7f7;

        p {
            display: table-cell;
            vertical-align: middle;
            width: 50%;
            font-size: 34px;
            font-weight: 600;
            span { color: #0f62cc; }
        }
        p+p { text-align: left; }
    }

    > div+div {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 20px;
        font-size: 18px;
    }
`;
export const InfoPage1ContentTable = styled(ContentTable)``;
export const InfoPage1ContentCharacterWrap = styled.div`
    margin: 25px 0 30px 0;
    ul {
        display: flex;
        justify-content: space-between;
    }
`;
export const InfoPage1ContentCharacter = styled.li`
    flex-basis: 250px;
    height: 200px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-image: ${({char}) => `url(/images/info/character_0${char}.webp)`};
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    overflow: hidden;
    
    p {
        display: table;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 60px;
        height: 60px;
        background-color: #f7f7f7;
        
        em {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }
    }
`;
export const InfoPage1NuriBox = styled.div`
    padding: 16px 16px 16px 173px;
    border: 1px solid #dcdcdc;
    background: #f7f7f7 url(/images/info/img_sub_openapi.webp) no-repeat left 20px top 19px;
    border-radius: 6px;
    line-height: 21px;
    p {
        font-size: 14px;
    }
`;


// @ info/page2.jsx
export const InfoPage2ContentTable = styled(ContentTable)`
    caption { 
        h2 { 
            font-size: 22px; 
            font-weight: 600;
            margin-top: 10px;
        }
        p { margin-top: 15px; }
    }
    th, td { 
        word-break: keep-all; 
        font-size: initial;
    }
    th { font-size: 16px; }
    td { font-size: 13px; }
    tbody > tr th { background-color: #EAFAF3; }
`;


// @ info/page3.jsx
export const InfoPage3ContentSubTitleWrap = styled.ul`
    padding: 20px;
    border: 1px solid #e4eef8;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 20px;
    list-style: inside;

    li+li {
        margin-top: 10px;
    }
`;
export const InfoPage3ContentSelectWrap = styled.div`
    background: #f7f7f7;
    padding: 15px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
        cursor: pointer;
        padding: 0 25px;
        background: #0f62cc;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        line-height: 34px;
        border-radius: 4px;
    }
`;
export const InfoPage3ContentSelect = styled.select`
    width: 200px;
    height: 40px;
    padding: 0 15px;
    background: #fff url(/images/info/img_sel.webp) no-repeat right 15px center;
    font-size: 14px;
    color: #0a0a0a;
    font-weight: 400;
    border: 1px solid #dcdcdc;
    appearance: none;
`;
export const InfoPage3ContentMain = styled.div`
    margin-top: 20px;
`;
export const InfoPage3ContentMapWrap = styled.div`
    position: relative;
    float: left;
    width: 510px;
    height: 577px;
    padding: 75px;
    background: #f4f9ff;
    map {
        position: relative;
        z-index: 10;
    }
    area { cursor: pointer; }
`;
export const InfoPage3ContentMap = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    height: 426px;
`;
export const InfoPage3ContentMapListWrap = styled.div`
    float: right;
    width: 510px;
    height: 577px;
    overflow-y: auto;
    border-top: 2px solid #0a0a0a;
    border-bottom: 1px solid #dcdcdc;
`;
export const InfoPage3ContentMapListTitle = styled.div`
    height: 50px;

    strong {
        display: block;
        float: left;
        width: 90px;
        height: 50px;
        background: #f7f7f7;
        font-size: 15px;
        color: #0a0a0a;
        font-weight: 500;
        border-bottom: 1px solid #dcdcdc;
        line-height: 50px;
        text-align: center;
    }
    strong+strong {
        width: calc(100% - 90px);
        border-left: 1px solid #dcdcdc;
    }
`;
export const InfoPage3ContentMapList = styled.ul`
    li {
        width: 100%;
        font-size: 14px;

        /* 측정소 축약 데이터 */
        > div:first-of-type {
            display: flex;
            border-bottom: 1px solid #dcdcdc;
            
            &:hover {background: #d7f4ff;}
            > div {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                width: 90px;
                text-align: center;
                vertical-align: middle;
            }
            > div + div {
                flex-grow: 1;
                justify-content: flex-start;
                padding: 8px 40px 8px 20px;
                border-left: 1px solid #dcdcdc;
                text-align: left;
            }
            button {
                position: absolute;
                right: 15px;
                top: 50%;
                margin: -3px 0 0 0;
                width: 10px;
                height: 6px;
                background: url(/images/info/img_aco_down.webp) no-repeat 0 0;
            }
        }
    }
`;
/* 측정소 상세 데이터 */
export const InfoPage3ContentMapDetail = styled.div`
    transition-duration: ${(props) => props.search ? '0' : '1s'};
    height: ${({toggle}) => toggle ? '72px' : 0};
    padding: ${({toggle}) => toggle ? '12px 0' : 0};
    overflow: hidden;
    background: #f4f9ff;

    > div {
        display: flex;
        align-items: center;
        > div:first-of-type {
            width: 90px;
            text-align: center;
        }
        > div:last-of-type {
            padding-left: 20px;
        }
        &+div {
            margin-top: 4px;
        }
    }
`;
export const InfoPage3ContentMapDetailKey = styled.span`
    padding: 0 13px;
    font-size: 13px;
    color: #464646;
    font-weight: 400;
    line-height: 22px;
    background: #fff;
    border-radius: 11px;
    border: 1px solid #dcdcdc;
`;


// @ realtime/page1.jsx
export const ContentSearchWrap = styled.div`
    position: relative;
    margin: 30px 0 0 0;
    padding: 15px 0 15px 245px;
    background: #f7f7f7;

    button {
        padding: 0 25px;
        background: #0f62cc;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        line-height: 34px;
        border-radius: 4px;
        margin: 3px 0 0 10px;
    }
`;
export const ContentSearchInput = styled.input`
    width: 360px;
    height: 40px;
    margin: 0 0 0 10px;
    padding: 0 14px;
    line-height: 40px;
    border: 1px solid #dcdcdc;
    font-size: 14px;
    color: #0a0a0a;
    font-weight: 400;
`;
export const ContentTableWrap = styled.div`
    height: 600px;
    overflow: auto;

    table {
        margin: 0;
        border-collapse: separate;
        border: none;
        thead {
            position: sticky;
            top: 0;
            &::before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: #000;
            }
        }
    }
`;
export const RealtimePage1ContentTable = styled(ContentTable)`
    caption { 
        margin-bottom: 0;
        margin-top: 10px;
        caption-side: bottom;
    }
    th {  background: #f7f7f7; }
`;
export const ContentResultWrap = styled.div`
    margin-top: 40px;
`;
export const ContentResultTap = styled.div`
    display: inline-block;
    cursor: pointer;
    width: calc(50% - 5px);
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    background: ${({selectCheck}) => selectCheck ? '#fff' : '#eaeef8'};
    color: ${({selectCheck}) => selectCheck ? '#0f62cc' : '#0a0a0a'};
    font-weight: ${({selectCheck}) => selectCheck ? '500' : '400'};
    border: 1px solid;
    border-color: ${({selectCheck}) => selectCheck ? '#0f62cc' : '#eaeef8'};
    border-radius: 6px;
    text-align: center;

    -webkit-box-shadow: ${({selectCheck}) => selectCheck && '0px 5px 5px -1px #eeeeee;'};
    box-shadow: ${({selectCheck}) => selectCheck && '0px 5px 5px -1px #eeeeee;'};
`;
export const ContentResultSearchBox = styled.div`
    margin-top: 20px;
    position: relative;
    padding: 20px 20px 20px 30px;
    background: #f7f7f7;

    > div {
        display: flex;
        height: 40px;
        align-items: center;

        &:first-of-type { margin-bottom: 10px; }
        strong {
            position: relative;
            display: inline-block;
            width: 90px;

            &::after {
                content: "";
                display: block;
                clear: both;
                position: absolute;
                width: 2px;
                height: 100%;
                top: 0;
                right: 0;
                background-color: gray;
            }
        }
        > div {
            padding: 0 0 0 20px;

            label:first-of-type+input {
                margin-left: 10px;
            }
        }
    }
`;
export const ContentResultSearchBtnWrap = styled.div`
    display: flex;
    align-items: center;

    /* > * {
        height: 40px;
        padding: 10px 15px;
    } */

    .react-datepicker-wrapper {
        margin: 0 10px 0 10px;
        &:first-of-type { margin: 0 10px 0 0; }

        .react-datepicker__input-container {
            input {
                width: 100px;
                padding: 5px 10px;
            }
            .react-datepicker-ignore-onclickoutside {}
        }
    }
    select { 
        padding: 5px 10px;
        &:first-of-type { margin-right: 10px; }
    }
`;
export const ContentResultSearchBtn = styled.div`
    position: absolute;
    right: 20px;

    button {
        cursor: pointer;
        padding: 0 25px;
        background: #0f62cc;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        line-height: 34px;
        border-radius: 4px;
    }
`;
export const ContentResultTableWrap = styled.div`
    h2 {
        position: relative;
        font-size: 22px;
        color: #0a0a0a;
        font-weight: 500;
        margin: 50px 0 14px 0;
        display: block;
    }
    > span {
        display: inline-block;
        height: 28px;
        padding: 0 20px;
        font-size: 14px;
        color: #0f62cc;
        line-height: 28px;
        letter-spacing: -0.6px;
        border-radius: 13px;
        border: 1px solid #0f62cc;
        margin: 0 10px 20px 0;
    }
`;
export const ContentResultTableSpan = styled.span`
    background: ${({effect, opacity}) => effect && (opacity ? '#0f62cc80' : '#0f62cc')} !important;
    color: ${({effect, opacity}) => effect && (opacity ? '#ffffff80' : '#fff')} !important;
`;
export const LoadingWrap = styled.div`
    display: none;
    position: absolute;
    z-index: 3001;
    transform: translate(-50%, -50%);
`;


// @ realtime/page2.jsx
export const RealtimePage2ContentResultSearchBox = styled(ContentResultSearchBox)`
    > div {
        height: 60px;
        &:first-of-type {
            display: flex;
            > div {
                flex-grow: 1;
               label + span {
                margin-left: 10px;
               }
            }
        }
    }
`;
export const RealtimePage2ContentResultSearchBtn = styled(ContentResultSearchBtn)`
    display: initial !important;
    position: relative !important;
    float: right;
`;



// -------------------------------------------------------------

// @ ErrorPage.jsx
export const ErrorDiv = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    flex-direction: column;
    gap: 30px;
    transform: translate(-50%, -50%);
`;
export const ErrorTitle = styled.h1`
    font-size: 42px;
    font-weight: bold;
`;


// @ Loading.jsx
export const Loading = styled.div`
    display: ${props => props.loading === 'true' ? 'none' : 'block'};
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    text-align: center;
    border: 1px solid #bcd0e8;
    background: url('/loading_bg.webp');

    div {
    margin-top: 360px;
    font-size: 20px;
    color: #0054a6;
    }
`;