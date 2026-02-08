import React, {Component} from 'react';
import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import AccordionItem from './AccordionItem';
import '../Home.css';




const achievementData = {
  0: {
    title: "2025 2학기",
    items: [
      { title: "2025 유플러스 시큐리티 해커톤 FINAL", detail: "미래 사이버보안 전문가 발굴 및 기술역량 강화를 위해 LG유플러스에서 주관한 대회입니다." },
      { title: "2025 AUTOHACK 부산광역시장상", detail: "국민대학교 미래자동차사업단이 주관하고 교육부와 한국연구재단, 부산광역시 등이 공동 주관하는 자동차 보안 경진대회입니다." },
      { title: "2025 LISA-thon:Mobility Competition 우수상", detail: "LISA(순천향대학교 정보보호학과 시스템보안연구실)에서 주관한 실제 차량 기반 자동차 사이버 보안 경진대회입니다." },
      { title: "화이트햇 2025 2등", detail: "사이버보안 영재 발굴 및 사이버 전문인력 능력 향상을 목적을 국방부, 사이버작전사령부에서 주최한 대회입니다." },      
      { title: "2025 교내 모의 해킹 대회 Runa CTF 개최", detail: "서울시립대학교 비교과 프로그램 나비스트 프로그램에서 교내 모의 해킹 대회를 주최하였습니다." },
      { title: "2025 Blackhat mea FINAL", detail: "Saudi Federation for Cybersecurity, Programming & Drones(SAFCSP)가 주관하는 중동/아프리가 Black Hat 행사에서 열리는 세계 대회입니다." }
      // ... 나머지도 동일한 형식으로
    ],
  },
  1: {
    title: "2025 1학기",
    items: [
      { title: "CCA 가입", detail: "CCA는 teamh4c와 BoB총동문회가 파트너십을 맺고 교류하고 있는 전국사이버보안동아리연합회입니다." },
      { title: "2025 HACKSIUM 부산 FINAL", detail: "부산정보산업진흥원에서 주관한 동남권 특화산업(스마트해양, 스마트공장, 스마트시티) 기반 침해사고 방어 시나리오를 주제로 한 사이버 보안 실전형 해킹 방어 대회입니다." },
      { title: "Best of the Best 14기 합격", detail: "차세대 보안리더 양성 프로그램 BoB 14기 디지털 포렌식 트랙에 1명 합격하였습니다." },
      { title: "31회 해킹 캠프 2위", detail: "POC SECURITY가 주관하는 국내 중·고·대학생을 대상으로 진행한 비영리 캠프입니다" }
    ],
  },
  2: {
    title: "2024 1학기",
    items: [
      { title: "컴퓨터과학부 보안 소모임 SHA 창설", detail: "보안에 관심 있는 학생들을 위한 소모임 기획 및 설립" },
      { title: "HSPACE 클럽 가입", detail: "HSPACE는 정보보호 관련 활동을 위한 공간과 자원을 지원하는 커뮤니티입니다. " },
    ],
  }
};

// 기존 achievementData 아래에 추가
const achievementlist = [
  { title: "CCA 가입", detail: "전국사이버보안동아리연합회 교류" },
  { title: "SHA 밤샘해킹", detail: "교내 보안 워크숍 진행" },
  { title: "Hacksium 7위", detail: "부산 해킹대회 본선 진출" },
  { title: "BoB 14기 합격", detail: "차세대 보안 리더 양성 프로그램" },
  { title: "해킹 캠프 2위", detail: "안서진" }
];


const items = [
    {
      logo: `${process.env.PUBLIC_URL}/studylogo.png`,
      title: "스터디",
      desc: `SHA의 핵심 활동 중 하나로 보안 분야별 스터디입니다.
          보안이 처음이어도, 함께 공부하면서 성장할 수 있도록 커리큘럼과
          피드백을 제공합니다. 구성원들이 돌아가며 발표 및 실습을
          주도하며, 서로에게 배우는 문화를 지향합니다.`,
      tags: ["#입문자도 환영", "#발표 중심 학습"],
    },
    {
      logo: `${process.env.PUBLIC_URL}/reward.png`,
      title: "대회/공모전 참가",
      desc: `실전에서 실력을 검증받고 싶다면 SHA에서 기회를 
      가질 수 있습니다. hacktheon, cce, codegate 등 
      다양한 해킹 대회에 참가합니다.`,
      tags: ["#국내외 CTF 대회 참여"],
    },
    {
      logo: `${process.env.PUBLIC_URL}/click.png`,
      title: "해킹/개발 프로젝트",
      desc: `SHA는 실질적인 결과물 중심의 활동을 중요하게 생각하며, 
        이를 위해 자체 개발 프로젝트와  
        해킹 실습 환경 구축 프로젝트를 함께 진행합니다.`,
    },
  ];





//mobile 붙은 코드 : 모바일에서 보이는 부분
//mobile 안 붙은 코드 : 컴퓨터 
//패드기준을 해야할까....

const Home = () => {
  const videoRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const [angle, setAngle] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [isRotating, setIsRotating] = useState(false); // 클릭 방지
  const [isHoverActivities, setIsHoverActivities] = useState(false);


 // 1. 상태를 배열로 변경
const [expandedIndices, setExpandedIndices] = useState([]);

// 학기가 바뀔 때 초기화
useEffect(() => {
  setExpandedIndices([]);
}, [current]);

// 2. 토글 함수 생성 (가독성을 위해 분리)
const toggleExpand = (idx) => {
  setExpandedIndices(prev => 
    prev.includes(idx) 
      ? prev.filter(i => i !== idx) // 이미 있으면 제거 (닫기)
      : [...prev, idx]              // 없으면 추가 (열기)
  );
};

  const prevItem = () => {
    if (isRotating) return;
    setIsRotating(true);
    setShowContent(false);

    setAngle(prev => prev + 60);

    setTimeout(() => {
      setCurrent(prev => (prev - 1 + items.length) % items.length);
      setShowContent(true);
      setIsRotating(false);
    }, 800);
  };


  const item = items[current];
 
  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // 자동 재생 성공
          })
          .catch((error) => {
            console.log("iOS autoplay blocked:", error);
          });
      }
    }
  }, []);


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="wholearea">
      <div className="top-bar">
        <Link to="/" className="logo-wrapper">
          <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="Logo" className="logobox" />
        </Link>
        <div className="nav-content">
          <div className="menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              end
            >
              HOME
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/members"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              MEMBER
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/study"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              STUDY
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/recruit"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              RECRUIT
            </NavLink>
          </div>
        </div>
        <div className="mobile-menu" onClick={() => setIsMenuOpen(true)}>
          <img src={`${process.env.PUBLIC_URL}/menubar.png`} alt="menubar" className="menubar" />
        </div>
        {isMenuOpen && (
          <div className="mobile-menu-content">
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <img src={`${process.env.PUBLIC_URL}/close2.png`} alt="close" className="close-icon" />
            </button>
            <div className="mobile-nav-content">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                end
              >
                HOME
              </NavLink>
              <NavLink
                to="/members"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                MEMBER
              </NavLink>
              <NavLink
                to="/study"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                STUDY
              </NavLink>
              <NavLink
                to="/recruit"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                RECRUIT
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="home-container">
        <div className="video-box">
          <video src={`${process.env.PUBLIC_URL}/homeanimation.mp4`} preload="auto" autoPlay muted loop playsInline />
        </div>
        <div className="video-box-mobile">
          <video ref={videoRef} className="mobile-animation" src={`${process.env.PUBLIC_URL}/mobileanimation_ios720.mp4`} preload="auto" autoPlay muted loop playsInline webkit-playsinline />
        </div>
      </div>
      <div className="mobile-section">
        <Link to="/recruit" className="mobile-jiwon">
          <p>지원하러 가기</p>
          <img src={`${process.env.PUBLIC_URL}/right.png`} alt="Logo" className="jiwondown" />
        </Link>
      </div>
      {!isMenuOpen && (
        <div className="mouse">
          {isHoverActivities ? (
            <div className="clickhere-container">
              <img
                src={`${process.env.PUBLIC_URL}/clickhere.gif`}
                alt="click here"
                className="clickhere-img"
              />
              <p className="clickhere-text">Click Anywhere</p>
            </div>
          ) : ( 
            <img
              src={`${process.env.PUBLIC_URL}/mouse.png`}
              alt="scroll"
              className="mouse-img"
            />
          )}
        </div>
      )}
      <div className="SHA">
        <div className="circle"></div>
        <div className="homelogo-box">
          <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="logo" className="logo-box2" />
          <img src={`${process.env.PUBLIC_URL}/word-SHA.png`} alt="word"className="word-SHA" />
          <img src={`${process.env.PUBLIC_URL}/UOS-Hacking-club.png`} alt="word" className="UOS-Hacking-club" />
        </div>
        <div className="word-box2">
          서울시립대 컴퓨터과학부 보안 소모임 SHA는 보안에 관심 있는 학생들이 함께 학습하고 성장하는 소모임입니다. <br />
          웹/시스템 해킹, 리버싱, 암호학 등 다양한 분야를 다루며, 스터디와 프로젝트, 대회 참여를 통해 실력을 키워나가고 있습니다. <br />
          함께 고민하고 부딪히며 성장할 여러분을 언제나 환영합니다!
        </div>
      </div>
      <div className="activities" 
        onMouseEnter={() => setIsHoverActivities(true)}
        onMouseLeave={() => setIsHoverActivities(false)}
        onClick={prevItem}
      >
        <div className="word-ACTIVITIES">ACTIVITIES</div>
        {/*<div className="click-anywhere">
          CLICK ANYWHERE
        </div> 조만간 삭제 예정*/}
        <div className="top-fade"></div>
        <div className="circle-wrapper" style={{transform: `rotate(${angle}deg)`, transition: 'transform 0.8s ease'}}>
          <div className={`bizz0 ${current === 0 ? "special-bizz" : ""}`}></div>
          <div className={`bizz60 ${current === 2 ? "special-bizz" : ""}`}></div>
          <div className={`bizz120 ${current === 1 ? "special-bizz" : ""}`}></div>
          <div className={`bizz180 ${current === 0 ? "special-bizz" : ""}`}></div>
          <div className={`bizz240 ${current === 2 ? "special-bizz" : ""}`}></div>
          <div className={`bizz300 ${current === 1 ? "special-bizz" : ""}`}></div>
        
          <div className="homeline2" />  {/*0도-180도*/}
          <div className="homeline-60" />
          <div className="homeline-120" />
        </div>
        <div className="homeline3 left-side" style={{ opacity: showContent ? 1 : 0,
            transform: showContent ? 'rotate(-14deg) scaleX(1)' : 'rotate(-14deg) scaleX(0)' ,
            transition: 'opacity 0.1s ease, transform 0.7s ease' }}/>
        <div className="homeline4 left-side" style={{ opacity: showContent ? 1 : 0, 
            transform: showContent ? 'rotate(14deg) scaleX(1)' : 'rotate(14deg) scaleX(0)',
            transition: 'opacity 0.1s ease, transform 0.7s ease'}}/>
        <div className="bottom-fade"></div>
        <div className="homeline1" />
        <div className="studylogo-box"
            style={{ opacity: showContent ? 1 : 0,
            transition:  'opacity 0.8s ease'  }}>
          <img className="studylogo" src={item.logo} alt="스터디 로고" />
        </div>
        <div className="home-wordbox"
            style={{ opacity: showContent ? 1 : 0,
            transition:  'opacity 0.8s ease' }}>
          <div className="word-study">
            <p>{item.title}</p>
          </div>
          <div className="words">
            {item.desc.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
          {current === 1 ? ( 
            item.tags && item.tags.length > 0 && (
            <div className="tag-box">
              {item.tags.map((tag, i) => (
                <div className="tag2" key={i}>
                  <p>{tag}</p>
                </div>
              ))}
            </div>
          )
        ) : (
          item.tags && item.tags.length > 0 && (
            <div className="tag-box">
              {item.tags.map((tag, i) => (
                <div className="tag" key={i}>
                  <p>{tag}</p>
                </div>
              ))}
            </div>
          )
        )}
        </div>
      </div>
      <div className="mobile-activities">
        <div className="mobile-word-ACTIVITIES">ACTIVITIES</div>
        <div className="mobile-activities-box">
          <div className="mobile-studylogo-box">
            <div className="mobile-circle">
              <img className="mobile-studylogo" src={`${process.env.PUBLIC_URL}/studylogo.png`} alt="스터디 로고" />
            </div>
          </div>
          <div className="mobile-home-wordbox">
            <div className="mobile-word-study">
              <p>스터디</p>
            </div>
            <div className="mobile-words">SHA의 핵심 활동 중 하나로 보안 분야별 스터디입니다. <br />
            보안이 처음이어도, 함께 공부하면서 성장할 수 있도록 커리큘럼과 <br /> 피드백을 제공합니다. 구성원들이 돌아가며 발표 및 실습을 <br/>
            주도하며, 서로에게 배우는 문화를 지향합니다.</div>
            <div className="mobile-tag-box">
              <div className="mobile-tag">
                <p>#입문자도 환영</p>
              </div>
              <div className="mobile-tag">
                <p>#발표 중심 학습</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-activities-box">
          <div className="mobile-studylogo-box">
            <div className="mobile-circle">
              <img className="mobile-studylogo" src={`${process.env.PUBLIC_URL}/reward.png`} alt="스터디 로고" />
            </div>
          </div>
          <div className="mobile-home-wordbox">
            <div className="mobile-word-study">
              <p>대회/공모전 참가</p>
            </div>
            <div className="mobile-words">실전에서 실력을 검증받고 싶다면 SHA에서 기회를 <br />
            가질 수 있습니다. hacktheon, hacksium, codegate 등 <br />
            다양한 해킹 대회에 참가합니다.</div>
            <div className="mobile-tag-box">
              <div className="mobile-tag2">
                <p>#국내외 CTF 대회 참여</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-activities-box">
          <div className="mobile-studylogo-box">
            <div className="mobile-circle">
              <img className="mobile-studylogo2" src={`${process.env.PUBLIC_URL}/click.png`} alt="스터디 로고" />
            </div>
          </div>
          <div className="mobile-home-wordbox">
            <div className="mobile-word-study">
              <p>해킹/개발 프로젝트</p>
            </div>
            <div className="mobile-words">SHA는 실질적인 결과물 중심의 활동을 중요하게 생각하며, <br /> 
              이를 위해 자체 개발 프로젝트와 <br />
              해킹 실습 환경 구축 프로젝트를 함께 진행합니다.</div>
          </div>
        </div>
      </div>
      
      /*-- achievements 수정 --*/
      <div className="achievements-test" 
        onMouseEnter={() => setIsHoverActivities(true)}
        onMouseLeave={() => setIsHoverActivities(false)}
        onClick={prevItem}
      >
        <div className="word-ACHIEVEMENTS-2">ACHIEVEMENTS</div>
        {/*<div className="click-anywhere">
          CLICK ANYWHERE
        </div> 조만간 삭제 예정*/}
        <div className="top-fade-2"></div>
        <div className="circle-wrapper-2" style={{transform: `rotate(-${angle}deg)`, transition: 'transform 0.8s ease'}}>
          <div className={`bizz0 ${current === 0 ? "special-bizz" : ""}`}>
            <div className="bizz-text" style={{ transform: `rotate(${angle}deg) translateX(-60px)` }}>2025 2학기</div>
          </div>
          <div className={`bizz60 ${current === 1 ? "special-bizz" : ""}`}>
            <div className="bizz-text" style={{ transform: `rotate(${angle}deg) translateX(-60px)` }}>2025 1학기</div>
          </div>
          <div className={`bizz120 ${current === 2 ? "special-bizz" : ""}`}>
            <div className="bizz-text" style={{ transform: `rotate(${angle}deg) translateX(-60px)` }}>2024 1학기</div>
          </div>
          <div className={`bizz180 ${current === 0 ? "special-bizz" : ""}`}>
            <div className="bizz-text" style={{ transform: `rotate(${angle}deg) translateX(-60px)` }} >2025 2학기</div>
          </div>
          <div className={`bizz240 ${current === 1 ? "special-bizz" : ""}`}>
            <div className="bizz-text" style={{ transform: `rotate(${angle}deg) translateX(-60px)` }}>2025 1학기</div>
          </div>
          <div className={`bizz300 ${current === 2 ? "special-bizz" : ""}`}>
            <div className="bizz-text" style={{ transform: `rotate(${angle}deg) translateX(-60px)` }}>2024 1학기</div>
          </div>
        
          <div className="homeline2" />  {/*0도-180도*/}
          <div className="homeline-60" />
          <div className="homeline-120" />
        </div>
        <div className="bottom-fade-2"></div>
        <div className="homeline1-2" />
        <div className="home-wordbox"
            style={{ opacity: showContent ? 1 : 0,
            transition:  'opacity 0.8s ease' }}>
        </div>
        <div className={`info-side-panel ${showContent ? 'active' : ''}`}>
          <div className="info-header">
            <span className="year-tag">TIMELINE</span>
            <h2>{achievementData[current]?.title}</h2>
          </div>
  
          <ul className="info-list">
            {achievementData[current]?.items.map((item, idx) => {
              const isExpanded = expandedIndices.includes(idx);
    
              return (
                <li key={idx} className="info-item-container">
                  <div 
                    className={`info-item ${isExpanded ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleExpand(idx);
                    }}
                  >
                    <span className="dot"></span>
                    <span className="item-title">{item.title}</span>
                  </div>
        
                  {/* 부드러운 전이를 위한 래퍼 (항상 렌더링됨) */}
                  <div className={`info-detail-wrapper ${isExpanded ? 'open' : ''}`}>
                    <div className="info-detail-inner">
                      {item.detail && (
                        <div className="info-detail">
                          <p>{item.detail}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* -- Mobile Achievements 개편 -- */}
      <div className="mobile-achievements">
        <div className="mobile-word-ACHIEVEMENTS">ACHIEVEMENTS</div>
  
        {/* 학기 선택 탭 */}
        <div className="mobile-semester-tabs">
          {Object.keys(achievementData).map((key) => (
            <button 
              key={key} 
              className={`tab-btn ${current === parseInt(key) ? 'active' : ''}`}
              onClick={() => setCurrent(parseInt(key))}
            >
              {achievementData[key].title}
            </button>
          ))}
        </div>

        {/* 카드 리스트 영역 */}
        <div className="mobile-achievement-list">
          {achievementData[current]?.items.map((item, idx) => (
            <div key={idx} className="achievement-card">
              <div className="card-header">
                <span className="card-dot"></span>
                <h3 className="card-title">{item.title}</h3>
              </div>
              {item.detail && (
                <div className="card-body">
                  <p className="card-detail">{item.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mobile-bottom-fade"></div>
      </div>

      /*-- achievments 구버전 --*/
      {/*
      <div className="achievements">
        <div className="word-ACHIEVEMENTS">
          ACHIEVEMENTS
        </div>
        <div className="achieve-box">
          <div className="date-box">
            <div className="date">2024.04</div>
            <div className="date">.06</div>
            <div className="date">2025.02</div>
            <div className="date">.05</div>
            <div className="date">.06</div>
          </div>
          <div className="line-box">
            <div className="achieve-line" />
            <div className="bizz-box">
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
            </div>
          </div>
          <div className="hangeo-box">
            {achievementlist.map((item, index) => (
              <AccordionItem key={index} title={item.title} detail={item.detail}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mobile-achievements">
        <div className="word-ACHIEVEMENTS">
          ACHIEVEMENTS
        </div>
        <div className="mobile-achieve-box">
          <div className="mobile-date-box">
            <div className="mobile-date">2024.04</div>
            <div className="mobile-date">.06</div>
            <div className="mobile-date">2025.02</div>
            <div className="mobile-date">.05</div>
            <div className="mobile-date">.07</div>
          </div>
          <div className="mobile-line-box">
            <div className="mobile-achieve-line" />
            <div className="mobile-bizz-box">
              <div className="mobile-achieve-bizz" />
              <div className="mobile-achieve-bizz" />
              <div className="mobile-achieve-bizz" />
              <div className="mobile-achieve-bizz" />
              <div className="mobile-achieve-bizz" />
              <div className="mobile-achieve-bizz" />
            </div>
          </div>
          <div className="hangeo-box">
            {achievementlist.map((item, index) => (
              <AccordionItem key={index} title={item.title} detail={item.detail}
              />
            ))}
          </div>
          <div className="mobile-hangeo-box">
            {achievementlist.map((item, index) => (
              <AccordionItem key={index} title={item.title} detail={item.detail}
              />
            ))}
          </div>
        </div>
      </div>
      */}
      <div className="bottom-bar"></div>
    </div>
  );
};

export default Home;