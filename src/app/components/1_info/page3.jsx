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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ~ Json
import stationsInfoData from "../../data/stationInfo.json";

// ~ Style
import { LayoutAElement, LayoutAside, LayoutAsideLink, LayoutContent, LayoutContentTitle, LayoutDivStyle, LayoutHome, LayoutList, LayoutListDetail, LayoutSection, LayoutTopBar, InfoPage3ContentSubTitleWrap, InfoPage3ContentSelectWrap, InfoPage3ContentSelect, InfoPage3ContentMain, InfoPage3ContentMapWrap, InfoPage3ContentMap, InfoPage3ContentMapListWrap, InfoPage3ContentMapListTitle, InfoPage3ContentMapList, InfoPage3ContentMapDetail, InfoPage3ContentMapDetailKey } from '../assets/StyleComponent.jsx';

// # 측정소 정보
/**
 * @typedef {Object} StationInfo
 * @property {string} dmX
 * @property {string} item
 * @property {string} mangName
 * @property {string} year
 * @property {string} city
 * @property {string} cityShort
 * @property {string} addr
 * @property {string} building
 * @property {string} stationName
 * @property {string} dmY
 * @property {string} top
 * @property {string} left
 * @property {string} innerTop
 * @property {string} innerLeft
 */

/** @type {StationInfo[]} */
const stationsInfo = stationsInfoData;


// @@@ 출력 컴포넌트 @@@
export default function Page({ topbarMain, topbarList }) {
     // # 서브 네비게이션이 객체인지 배열인지 체크
     const objectExist = Object.prototype.toString.call(topbarList) === "[object Object]";

     // # 네비게이션 토글
     const [toggles, setToggles] = useState({
        1: { px: 0, initial: topbarMain.links.length * 50},
        2: { px: 0, initial: objectExist ? topbarList.links.length * 50 : topbarList[0].links.length * 50}
    });
    useEffect(() => {
        if(!objectExist) {
            const toggleKeys = Object.keys(toggles).map(Number);
            const maxKey = Math.max(...toggleKeys);
            const newToggles = { ...toggles };

            for (let i = 0; i < topbarList.length; i++) {
                const key = maxKey + i + 1;
                newToggles[key] = { px: 0, initial: topbarList[i].links.length * 50 };
            }

            setToggles(newToggles);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }}, [objectExist, topbarList])
    const toggleHandle = (e, index) => {
        e.preventDefault();
        setToggles(prevToggles => ({
            ...prevToggles,
            [index]: {
                px: prevToggles[index].px !== 0 ? 0 : prevToggles[index].initial,
                initial: prevToggles[index].initial
            }
        }));
    };

    // @ 서브 네비게이션 컴포넌트
    const TopbarLayout = () => {
        return (
            <LayoutTopBar>
                    <li>
                        <LayoutHome to="/" title="홈"></LayoutHome>
                    </li>
                    {/* topbarMain */}
                    <LayoutList>
                        <LayoutAElement
                            to="#"
                            title={topbarMain.title}
                            onClick={(e) => toggleHandle(e, topbarMain.toggleIndex)}
                            data-index={topbarMain.toggleIndex}
                            data-direction={toggles[topbarMain.toggleIndex].px === toggles[topbarMain.toggleIndex].initial ? 'up' : 'down'}
                        >
                            {topbarMain.title}
                        </LayoutAElement>
                        <LayoutListDetail $height={toggles[topbarMain.toggleIndex].px}>
                            {topbarMain.links.map((link, idx) => (
                                <li key={idx}>
                                    <Link to={link.to}>{link.text}</Link>
                                </li>
                            ))}
                        </LayoutListDetail>
                    </LayoutList>
                    {/* topbarList */}
                    {objectExist
                    ? (<LayoutList>
                        <LayoutAElement
                            to="#"
                            title={topbarList.title}
                            onClick={(e) => toggleHandle(e, topbarList.toggleIndex)}
                            data-index={topbarList.toggleIndex}
                            data-direction={toggles[topbarList.toggleIndex].px === toggles[topbarList.toggleIndex].initial ? 'up' : 'down'}
                        >{topbarList.title}</LayoutAElement>
                        <LayoutListDetail $height={toggles[topbarList.toggleIndex].px}>{topbarList.links.map((link, idx) => <li key={idx}><Link to={link.to}>{link.text}</Link></li>)}</LayoutListDetail>
                        </LayoutList>)
                    : topbarList.map((list, idx) => {
                        return (
                            <LayoutList>
                                <LayoutAElement
                                    to="#"
                                    title={list.title}
                                    onClick={(e) => toggleHandle(e, list.toggleIndex)}
                                    data-index={list.toggleIndex}
                                    data-direction={toggles[list.toggleIndex].px === toggles[list.toggleIndex].initial ? 'up' : 'down'}
                                >
                                    {list.title}
                                </LayoutAElement>
                                <LayoutListDetail $height={toggles[list.toggleIndex].px}>
                                    {list.links.map((link, idx2) => <li key={idx2}><Link to={link.to}>{link.text}</Link></li>)}
                                </LayoutListDetail>
                            </LayoutList>
                        )
                    })}
                </LayoutTopBar>
        )
    }


    // ! 사이드바 목록
    const asideList = {
        title: '에어코리아란',
        links: [
            { text: '에어코리아 소개', select: false },
            { text: '측정망 정보', select: false },
            { text: '측정소 정보', select: true },
        ]
    };

    // # 측정소 정보
    const [mangCode, setMangCode] = useState('도시대기');
    const mangCodeHandle = (e) => setMangCode(e.currentTarget.value);

    const [district, setDistrict] = useState('all');
    const districtHandle = (e) => setDistrict(e.currentTarget.value);

    const [search, setSearch] = useState(false);
    const [imgSrc, setImgSrc] = useState('all');

    // # 측정소 필터
    const [filterData, setFilterData] = useState([]);
    // # 측정소 상세 정보 토글
    const [dataToggle, setDataToggle] = useState({0: false});
    const detailToggleHandle = (e) => {
        const { index } = e.currentTarget.dataset;
        setDataToggle(prevData => ({
            ...prevData,
            [index]: !dataToggle[index]
        }));
    };

    // # 맵 클릭 area 핸들러
    const mapHandle = (e) => {
        e.preventDefault();
        const [name] = e.currentTarget.classList;
        const [number] = name.match(/\d+/);
        setImgSrc(number);
        setDistrict(e.currentTarget.title);
        if(!search) setSearch(!search);
    };

    // # 측정소 목록 필터 함수
    useEffect(() => {
        const response = stationsInfo.filter(station => {
            let result;

            if(district === 'all') result = station.mangName === mangCode;
            else result = station.mangName === mangCode && station.city === district;

            return result;
        });
        const sortedData = response.sort((a, b) => {
            if(a.stationName < b.stationName) return -1;
            if(a.stationName > b.stationName) return 1;
            return 0;
        });
        const toggleObject = {};
        sortedData.forEach((_, key) => {
            toggleObject[key] = false;
        });
        if(search) {
            setFilterData(sortedData);
            setDataToggle(toggleObject);
            switch(district) {
                case 'all': setImgSrc('all'); break
                case '서울특별시' : setImgSrc('02'); break;
                case '경기도' : setImgSrc('031'); break;
                case '인천광역시' : setImgSrc('032'); break;
                case '강원특별자치도' : setImgSrc('033'); break;
                case '충청남도' : setImgSrc('041'); break;
                case '대전광역시' : setImgSrc('042'); break;
                case '충청북도' : setImgSrc('043'); break;
                case '세종특별자치시' : setImgSrc('044'); break;
                case '부산광역시' : setImgSrc('051'); break;
                case '울산광역시' : setImgSrc('052'); break;
                case '대구광역시' : setImgSrc('053'); break;
                case '경상북도' : setImgSrc('054'); break;
                case '경상남도' : setImgSrc('055'); break;
                case '전라남도' : setImgSrc('061'); break;
                case '광주광역시' : setImgSrc('062'); break;
                case '전북특별자치도' : setImgSrc('063'); break;
                case '제주특별자치도' : setImgSrc('064'); break;
                default: setImgSrc('all'); break;
            };
            setTimeout(() => { setSearch(false); }, 0);
        } else if(filterData.length === 0) {
            setFilterData(sortedData);
            setDataToggle(toggleObject);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mangCode, district, search]);

//------------------------------------------------------------

    return (
        <>
            <LayoutDivStyle>
                <TopbarLayout />
            </LayoutDivStyle>
            <LayoutSection>
            <LayoutAside>
                    <h2>{asideList.title}</h2>
                    <ul>
                        {asideList.links.map((link, index) => {
                            const variableCheck = typeof asideToggle !== 'undefined';
                            // const childrenCheck = 'children' in link;
                            let result;
                            if(variableCheck) {
                                // result = variableCheck && (
                                //     <li key={index}>
                                //         <AsideLink
                                //             to="#"
                                //             onClick={asideHandle}
                                //             children_height={asideToggle[link.text]?.px}
                                //             selected={link.select}
                                //             showmore={childrenCheck ? 'true' : 'false'}
                                //             >{link.text}</AsideLink>
                                //         {childrenCheck &&
                                //             <AsideLinkUl $height={asideToggle[link.text]?.px}>
                                //                 {link.children.map((item, _index) => {
                                //                     return <li key={_index}><AsideLinkA selected={item.select}>{item.text}</AsideLinkA></li>
                                //                 })}
                                //             </AsideLinkUl>
                                //         }
                                //     </li>
                                // );
                            } else {
                                result = !variableCheck && (
                                    <li key={index}>
                                        <LayoutAsideLink to={`/info?page=${index + 1}`} selected={link.select}>
                                            {link.text}
                                        </LayoutAsideLink>
                                    </li>
                                );
                            }
                            return result;
                        })}
                    </ul>
                </LayoutAside>
                <LayoutContent>
                    <LayoutContentTitle>측정소 정보</LayoutContentTitle>
                    <InfoPage3ContentSubTitleWrap>
                        <li>지도의 지역명을 클릭하면 각 지역에 해당하는 측정소 위치 정보를 조회할 수 있습니다.</li>
                        <li>조회 후 측정소명을 클릭하면 해당 측정소의 상세 정보를 조회할 수 있습니다.</li>
                    </InfoPage3ContentSubTitleWrap>
                    <InfoPage3ContentSelectWrap>
                        <InfoPage3ContentSelect name="mang_code" id="mang_code" title="측정망" onChange={mangCodeHandle} value={mangCode}>
                            <option value="국가배경농도">국가배경</option>
                            <option value="교외대기">교외대기</option>
                            <option value="도시대기">도시대기</option>기
                            <option value="도로변대기">도로변대기</option>
                            <option value="항만">항만</option>
                        </InfoPage3ContentSelect>
                        <InfoPage3ContentSelect name="district" id="district" title='지역' onChange={districtHandle} value={district}>
                            <option value='all'>전체</option>
                            <option value='서울특별시' >서울</option>
                            <option value='경기도'>경기</option>
                            <option value='인천광역시'>인천</option>
                            <option value='강원특별자치도'>강원</option>
                            <option value='충청남도'>충남</option>
                            <option value='대전광역시'>대전</option>
                            <option value='충청북도'>충북</option>
                            <option value='세종특별자치시'>세종</option>
                            <option value='부산광역시'>부산</option>
                            <option value='울산광역시'>울산</option>
                            <option value='대구광역시'>대구</option>
                            <option value='경상북도'>경북</option>
                            <option value='경상남도'>경남</option>
                            <option value='전라남도'>전남</option>
                            <option value='광주광역시'>광주</option>
                            <option value='전북특별자치도'>전북</option>
                            <option value='제주특별자치도'>제주</option>
                        </InfoPage3ContentSelect>
                        <button onClick={() => setSearch(true)}>조회</button>
                    </InfoPage3ContentSelectWrap>
                    <InfoPage3ContentMain>
                        <InfoPage3ContentMapWrap>
                            <map name="Map">
                                <area title="인천광역시" className="submap032" shape="poly" href="#" onClick={mapHandle} coords="122,107,116,110,113,109,116,105,114,99,110,94,103,93,98,88,95,83,91,77,94,75,97,78,98,72,103,68,109,69,110,74,109,79,111,87,122,81,125,90,131,94,131,97,127,99" alt="인천" />
                                <area title="서울특별시" className="submap02"  shape="poly" href="#" onClick={mapHandle} coords="127,87,124,89,127,92,130,93,131,97,133,102,138,103,140,100,144,103,147,101,150,101,151,99,151,96,154,93,154,90,151,90,151,85,150,80,143,79,140,83,137,83,134,85,131,85" alt="서울" />
                                <area title="경기도" className="submap031" shape="poly" href="#" onClick={mapHandle} coords="131,145,148,142,150,140,152,140,161,147,174,134,185,132,184,127,188,128,192,123,195,108,194,106,196,102,194,97,198,94,198,92,194,90,190,89,183,85,179,86,180,80,178,77,179,68,185,64,184,58,179,55,178,52,173,51,171,47,167,43,164,45,162,43,161,39,158,38,155,40,153,38,153,35,147,29,143,32,141,32,139,37,132,43,132,48,129,51,123,55,121,54,118,56,119,72,115,72,109,69,109,73,111,77,109,79,110,84,114,87,117,85,119,83,125,87,125,90,128,91,130,94,130,97,125,99,122,105,118,110,124,113,125,116,125,120,119,117,116,121,116,126,118,128,123,125,126,126,123,131,124,135" alt="경기" />
                                <area title="강원특별자치도" className="submap033" shape="poly" href="#" onClick={mapHandle} coords="304,129,299,131,293,138,285,132,283,133,273,132,269,135,265,132,263,132,258,135,255,134,243,127,239,129,233,124,233,121,227,120,225,118,219,121,214,122,211,119,207,117,204,119,202,124,198,126,193,123,193,115,195,109,193,106,195,102,195,99,194,98,198,94,198,91,195,90,189,90,184,85,179,86,179,81,178,79,178,75,178,69,183,65,184,58,178,55,178,53,174,52,172,50,171,46,168,43,163,45,161,43,162,40,161,39,157,42,152,39,152,34,147,30,151,23,158,23,161,25,168,22,171,24,173,23,176,25,180,23,184,24,193,21,199,23,205,25,209,28,210,28,211,22,213,24,220,19,224,19,230,0,236,1,248,34,259,50,260,53,267,59,267,61,276,70,276,73,281,77,281,83,286,87,288,96,295,104,297,111,300,112,303,116,304,125" alt="강원" />
                                <area title="충청남도" className="submap041" shape="poly" href="#" onClick={mapHandle} coords="165,214,158,218,149,219,145,217,144,213,132,213,129,220,120,226,115,225,115,221,110,214,104,213,108,204,105,197,108,196,107,193,104,193,104,188,104,176,96,170,97,180,101,189,100,194,98,193,96,190,92,181,91,172,90,166,89,163,84,161,81,163,80,162,80,158,79,156,84,153,83,148,88,147,89,146,90,142,92,146,94,147,90,152,90,155,101,148,100,145,102,142,97,142,93,138,99,137,103,139,105,132,113,138,123,140,131,145,140,143,146,142,148,140,154,140,155,144,164,150,164,154,170,159,166,161,163,163,162,167,158,165,153,161,152,166,151,176,156,183,158,188,159,195,161,205,166,209,169,207,173,212,180,205,182,207,183,214,185,219,185,223,184,224,179,222,177,226,173,227,172,222,168,224,166,220" alt="충남" />
                                <area title="세종특별자치시" className="submap043" shape="poly" href="#" onClick={mapHandle} coords="155,162,151,164,152,173,155,180,157,183,156,184,158,186,158,194,160,195,162,194,162,187,167,185,169,180,166,174,162,172,162,167,158,164" alt="세종" />
                                <area title="대전광역시" className="submap044" shape="poly" href="#" onClick={mapHandle} coords="180,209,175,212,169,208,166,211,164,210,161,207,161,195,161,194,163,187,167,184,169,181,173,183,173,186,179,190,177,195,179,201" alt="대전" />
                                <area title="경상북도" className="submap054" shape="poly" href="#" onClick={mapHandle} coords="311,252,307,250,303,252,300,252,298,248,294,246,290,247,286,249,285,254,281,256,275,255,270,258,267,259,263,261,258,259,254,259,250,259,248,254,247,250,251,246,254,247,255,249,259,248,260,243,262,240,262,236,264,235,266,234,264,230,264,227,262,223,255,223,250,227,247,231,243,228,239,232,239,234,242,235,245,239,240,240,238,242,239,246,240,248,238,250,235,248,234,248,238,255,237,257,233,254,225,254,223,252,225,248,219,240,213,240,210,238,207,237,204,232,207,229,207,226,203,220,207,219,208,214,210,208,214,208,213,205,211,200,207,204,204,200,202,202,198,200,199,197,203,194,200,189,203,181,199,176,196,176,196,173,198,172,201,169,203,167,207,161,210,163,213,161,213,155,216,156,219,153,223,155,228,149,235,156,240,155,241,151,239,148,246,139,250,137,251,134,254,133,259,135,262,132,266,132,268,135,273,132,282,134,284,132,287,133,292,136,294,134,297,132,300,131,305,129,307,131,306,134,308,139,307,143,309,150,310,155,311,164,309,166,308,168,306,171,311,179,309,181,311,184,305,192,305,203,307,210,310,214,308,217,307,219,308,221,312,223,315,220,319,216,321,217,320,221,317,226,316,228,317,231,315,236,313,242,314,245" alt="경북" />
                                <area title="충청북도" className="submap042" shape="poly" href="#" onClick={mapHandle} coords="204,219,198,223,195,223,189,219,186,219,183,216,182,209,182,206,178,206,174,202,174,197,179,190,176,189,173,184,170,182,168,178,165,174,162,172,160,170,162,167,162,162,164,160,170,160,168,155,165,155,164,152,160,148,167,142,168,140,174,135,177,134,180,135,181,134,184,133,184,127,189,128,192,123,196,125,202,125,203,119,208,117,211,118,212,122,219,120,225,117,229,119,234,121,234,124,236,125,238,127,238,130,243,129,244,128,251,130,254,133,251,135,249,136,246,140,244,140,242,143,239,147,240,150,239,155,236,155,232,153,230,153,227,149,225,151,225,154,223,154,221,153,217,156,214,155,213,159,215,163,211,162,210,163,208,161,203,164,207,171,206,172,202,170,197,173,202,177,203,181,200,185,201,187,200,189,204,193,199,196,198,200,201,202,205,200,208,205,212,200,214,203,213,206,215,208,213,209,208,208,210,211,210,214,207,217" alt="충북" />
                                <area title="전북특별자치도" className="submap063" shape="poly" href="#" onClick={mapHandle} coords="183,283,179,283,175,278,171,278,167,283,165,281,163,282,156,282,148,280,145,279,145,275,141,273,137,273,135,268,131,265,126,265,125,270,123,272,118,279,114,276,112,278,109,278,106,268,109,269,111,264,110,261,105,263,101,262,101,257,106,254,109,253,112,244,119,243,117,240,115,235,111,235,111,232,106,229,107,228,112,227,114,223,119,226,124,222,128,220,133,212,137,211,139,212,144,213,145,216,148,219,150,218,158,217,161,214,164,213,166,216,167,222,168,223,171,222,174,226,177,226,178,222,183,224,186,223,186,219,188,219,195,223,203,220,205,223,207,226,207,230,204,232,199,237,195,237,193,240,189,243,187,249,185,256,183,260,187,266,186,269,187,272,187,274,184,276" alt="전북" />
                                <area title="광주광역시" className="submap062" shape="poly" href="#" onClick={mapHandle} coords="136,303,128,305,126,305,121,299,114,299,113,293,115,291,117,289,120,288,122,285,128,288,134,287,135,285,138,285,139,287,141,290,142,293,147,293,145,296,145,300,140,304" alt="광주" />
                                <area title="전라남도" className="submap061" shape="poly" href="#" onClick={mapHandle} coords="197,317,195,321,192,320,189,325,184,323,183,325,185,331,186,332,193,328,196,332,193,338,197,342,198,348,197,353,191,351,192,346,194,345,191,341,189,337,186,342,187,347,186,350,182,347,182,344,181,342,184,338,180,334,180,331,177,327,174,331,168,331,169,335,167,341,177,351,176,354,171,354,172,356,178,366,176,368,173,367,172,362,170,360,164,364,164,366,161,363,154,357,150,359,148,358,148,354,158,343,159,344,160,348,165,347,163,338,158,338,158,336,151,343,149,342,146,345,144,345,142,348,139,350,138,355,139,357,136,364,130,366,126,367,126,371,122,373,120,371,120,368,123,364,122,362,123,356,122,350,118,357,118,361,117,364,116,366,113,368,116,372,119,376,119,380,117,380,112,377,110,372,109,370,109,376,108,378,103,380,101,375,98,373,102,369,99,367,99,365,97,358,94,358,90,354,87,354,88,358,91,362,90,367,87,370,85,370,82,373,75,375,70,368,74,363,77,360,81,357,81,354,84,351,85,348,83,344,85,338,89,340,92,337,91,333,88,329,82,328,86,323,87,319,88,316,92,314,89,311,85,313,82,314,79,313,77,315,78,317,77,317,75,317,71,315,75,312,78,309,76,307,72,309,70,310,68,307,71,303,74,303,77,305,82,305,84,302,89,302,89,304,92,308,97,312,100,306,95,303,89,296,88,291,93,290,93,285,96,282,96,278,97,277,98,273,102,269,106,269,108,275,110,280,113,276,116,278,118,276,123,273,125,270,126,265,129,265,132,265,135,268,137,272,142,268,144,269,145,272,144,274,146,276,145,278,149,280,153,279,156,281,157,280,161,282,166,281,167,282,171,278,175,279,180,283,183,283,184,288,184,294,190,300,190,303,194,308,196,311,198,314" alt="전남" />
                                <area title="경상남도" className="submap055" shape="poly" href="#" onClick={mapHandle} coords="264,299,262,302,258,299,254,297,254,295,255,294,255,291,252,292,250,294,251,299,252,302,254,306,251,309,250,307,249,302,246,301,244,302,242,306,241,307,243,309,244,311,242,314,241,316,241,320,244,322,246,321,248,319,251,322,254,322,252,320,252,317,254,317,256,314,257,310,261,309,260,312,259,313,261,317,262,319,259,322,260,324,262,321,263,323,262,327,262,329,257,329,256,332,257,336,256,338,251,339,250,336,250,333,246,330,245,331,239,333,237,331,236,329,237,325,234,322,235,318,231,315,230,318,230,318,226,315,224,318,220,320,215,318,215,314,215,308,214,305,210,308,209,310,210,313,210,314,206,312,205,312,205,316,206,320,204,323,205,326,208,330,211,329,209,326,211,323,215,324,216,327,214,330,214,333,215,335,213,339,208,338,206,332,204,332,203,337,200,336,200,331,197,325,200,323,201,320,201,317,198,317,190,304,189,299,185,296,185,288,184,283,184,278,188,273,187,266,183,261,188,245,194,238,198,238,204,232,212,239,218,240,225,249,224,252,226,255,233,254,236,257,239,255,246,252,249,256,253,258,254,258,260,260,265,260,269,259,275,254,282,256,282,258,279,259,278,262,281,264,284,265,286,270,292,273,292,276,288,279,283,282,279,282,278,284,276,286,272,287,269,289,268,292,264,292,266,296" alt="경남" />
                                <area title="대구광역시" className="submap053" shape="poly" href="#" onClick={mapHandle} coords="247,253,244,254,238,256,235,251,234,248,238,249,240,249,240,246,238,244,239,240,243,239,245,236,240,235,240,231,243,228,244,231,246,232,251,227,256,222,263,224,264,229,264,229,266,232,264,235,262,237,260,241,258,246,259,248,253,250,251,247,247,248" alt="대구" />
                                <area title="부산광역시" className="submap051" shape="poly" href="#" onClick={mapHandle} coords="285,308,282,306,278,309,275,304,271,306,268,309,266,314,264,309,265,306,268,303,265,300,264,292,269,292,271,287,277,286,279,282,283,282,288,277,291,277,293,275,297,275,299,279,299,281,300,282,299,286,298,288,297,290,297,294,295,298,289,299,287,302" alt="부산" />
                                <area title="울산광역시" className="submap052" shape="poly" href="#" onClick={mapHandle} coords="301,283,298,280,299,278,296,276,294,275,292,273,285,266,279,264,278,261,281,258,280,255,284,253,285,254,286,248,293,246,298,247,300,253,305,250,311,253,313,259,313,266,308,268,306,270,306,279" alt="울산" />
                                <area title="제주특별자치도" className="submap064" shape="poly" href="#" onClick={mapHandle} coords="44,410,36,410,35,412,24,411,21,414,20,414,15,409,14,402,19,398,21,394,31,390,45,388,55,385,59,387,63,389,65,393,64,394,63,398,60,401,58,404,54,405,50,408" alt="제주" />
                            </map>
                            <div>
                                <InfoPage3ContentMap show src={`/images/info/sub_map_${imgSrc}.webp`}  alt="전체" useMap="#Map" />
                            </div>
                        </InfoPage3ContentMapWrap>
                        <InfoPage3ContentMapListWrap>
                            <InfoPage3ContentMapListTitle>
                                <strong>측정소명</strong>
                                <strong>측정소</strong>
                            </InfoPage3ContentMapListTitle>
                            <InfoPage3ContentMapList>
                                {filterData.length !== 0 ? filterData.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            <div data-index={key} onClick={detailToggleHandle}>
                                                <div><span>{item.stationName}</span></div>
                                                <div>
                                                    <span>{`${item.addr} ${item.building}`}</span>
                                                    <button></button>
                                                </div>
                                            </div>
                                            {/* <ContentMapDetail toggle={dataToggle[key]}> */}
                                            <InfoPage3ContentMapDetail search={search} toggle={dataToggle[key]}>
                                                <div>
                                                    <div><InfoPage3ContentMapDetailKey>설치년도</InfoPage3ContentMapDetailKey></div>
                                                    <div><span>{item.year}</span></div>
                                                </div>
                                                <div>
                                                    <div><InfoPage3ContentMapDetailKey>측정항목</InfoPage3ContentMapDetailKey></div>
                                                    <div><span>{item.item}</span></div>
                                                </div>
                                            </InfoPage3ContentMapDetail>
                                        </li>
                                        )}) :
                                        <li>
                                            <div>
                                                <div><span>-</span></div>
                                                <div><span>-</span></div>
                                            </div>
                                        </li>}
                            </InfoPage3ContentMapList>
                        </InfoPage3ContentMapListWrap>
                    </InfoPage3ContentMain>
                </LayoutContent>
            </LayoutSection>
        </>
    )
};
