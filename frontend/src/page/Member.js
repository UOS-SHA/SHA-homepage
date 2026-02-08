import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Member.css';
import '../Home.css';

//admin이랑 연결스
//멤버 정보 받아오기, 지위에 따라서 이미지 달라야 함! 확인!

const Member = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const members = [
    { major: "컴과25", name: "조재희", interests: "web", comment: "갓벽 그 자체 회장" },
    { major: "컴과22", name: "박정빈", interests: "web, reversing, system, crypto, forensic", comment: "올라운더 희망" },
    { major: "기계24", name: "김민찬", interests: "system", comment: "교환학생 중임." },
    { major: "수학23", name: "김재승", interests: "system, crypto", comment: "코카콜라 러버" },
    { major: "컴과24", name: "김주현", interests: "web", comment: "^_^" },
    { major: "컴과25", name: "류재현", interests: "crypto", comment: "뚱땅뚱땅 키보드말고\n 컴퓨터 키보드" },
    { major: "컴과24", name: "성수현", interests: "web", comment: "보안소모임 화이팅!" },
    { major: "컴과19", name: "신희용", interests: "web3", comment: "Pache punch" },
    { major: "컴과25", name: "안서진", interests: "reversing, system", comment: "닉네임일까요 아닐까요" },
    { major: "컴과21", name: "이규형", interests: "web", comment: "못하는 거 없음" },
    { major: "컴과20", name: "이성민", interests: "reversing, crypto", comment: "ㅇㄴ" },
    { major: "컴과25", name: "이윤성", interests: "web, reversing", comment: "rev의 미래이자\n 디자인 천재" },
    { major: "전전컴25", name: "조현재", interests: "web", comment: "web goat of goat" },
    { major: "컴과21", name: "최원영", interests: "web", comment: "나보다 일찍 일어나는\n 사람 나와" },
    { major: "전전컴21", name: "한건우", interests: "reversing, pwnable, forensic", comment: "의정부 부대찌개" },
    { major: "컴과20", name: "이종관", interests: "crypto", comment: "희귀하고 희귀한 크립토님" },
    { major: "컴과22", name: "인해", interests: "web", comment: "Mac book 소유자" },
    { major: "국관24", name: "어진원", interests: "web", comment: "web의 숨은 인재" },
    { major: "컴과20", name: "장성우", interests: "web, reversing", comment: "잘 부탁드립니다!" },
    { major: "컴과21", name: "권상우", interests: "reversing", comment: "잘 부탁드립니다!" },
    { major: "컴과21", name: "정창규", interests: "crypto", comment: "신입 인사박습니다!\n잘 부탁드립니다!" },
    
    
    // 나중에 팀원 추가 가능
  ];
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
  };
 
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
      {/*모바일 버전*/}
      <div className="mobile-recruit-container">
        <div className="mobile-JoinUs">
          <div className="mobile-word-box">
            <div className="mobile-title">ABOUT US</div>
            <div className="mobile-info">
                <p>같은 목표를 향해 함께 나아가는 SHA의 팀원들을 소개합니다.
                SHA는 시스템 해킹, 웹 해킹, 리버싱, 포렌식 등 다양한 분야에 관심 있는 팀원들이 모여, 
                    CTF 대회와 보안 프로젝트를 통해 함께 실력을 키워가고 있습니다. 
                    각자의 관심사는 다르지만, 서로의 전문성이 모여 더 나은 결과를 만들어내기 위해 협력합니다.
                    팀원 모두가 학습자이자 기여자로서, 함께 배우고 성장하는 보안 커뮤니티를 만들어가고 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="mobile-recruit-sheet">
          <div className="mobile-fillout">
            <p>INDIVIDUAL PROFILES</p>
          </div>
          <div className="mobile-line2"></div>
          <div className="mobile-profile-scroll-box">
            <div className="mobile-profile-container">
              {chunkArray(members, 2).map((pair, idx) => (
                <div className="mobile-profile-box" key={idx}>
                  {pair.map((member, i) => {
                      const globalIndex = idx * 2 + i;

                      return (
                        <div className="mobile-individual" key={i}>

                        <div className="mobile-img-crown">
                        {globalIndex === 0 && (
                          <img
                            src={`${process.env.PUBLIC_URL}/yellow_crown.png`}
                            alt="회장"
                            className="mobile-crown"
                          />
                        )}

                        {globalIndex === 1 && (
                          <img
                            src={`${process.env.PUBLIC_URL}/grey_crown.png`}
                            alt="부회장"
                            className="mobile-crown"
                          />
                        )}
                        </div>

                        <div className="mobile-name-major">
                        <div className="mobile-profile-major">{member.major}</div>
                        <div className="mobile-profile-name">{member.name}</div>
                        </div>

                      <div className="mobile-hanmadi">
                          {(`"${member.comment}"`).split("\n").map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </div>
                      {/*
                      <div className="mobile-position-link">
                        <div className="mobile-position">관심분야: {member.interests}</div>
                        <div className="mobile-profile-link">{member.github}</div>
                      </div>
                      */}
                      <div className="mobile-individual-line"></div>
                    </div>
                      );  
                })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*컴퓨터 버전*/}
      <div className="recruit-container">
        <div className="JoinUs">
          <div className="word-box">
            <div className="title">ABOUT US</div>
            <div className="info">
                <p>같은 목표를 향해 함께 나아가는 SHA의 팀원들을 소개합니다.</p>
                <p>SHA는 시스템 해킹, 웹 해킹, 리버싱, 포렌식 등 다양한 분야에 관심 있는 팀원들이 모여, 
                    CTF 대회와 보안 프로젝트를 통해 함께 실력을 키워가고 있습니다. 
                    각자의 관심사는 다르지만, 서로의 전문성이 모여 더 나은 결과를 만들어내기 위해 협력합니다. <br />
                    팀원 모두가 학습자이자 기여자로서, 함께 배우고 성장하는 보안 커뮤니티를 만들어가고 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="recruit-sheet">
          <div className="fillout">
            <p>INDIVIDUAL PROFILES</p>
          </div>
          <div className="line2"></div>
          <div className="profile-scroll-box">
            <div className="profile-container">
                {chunkArray(members, 2).map((pair, idx) => (
                <div className="profile-box" key={idx}>
                  {pair.map((member, i) => {
                    const globalIndex = idx * 2 + i;

                    return (
                      <div className="individual" key={i}>
                        <div className="img_crown">
                          {globalIndex === 0 && (
                            <img
                              src={`${process.env.PUBLIC_URL}/yellow_crown.png`}
                              alt="회장"
                              className="crown"
                            />
                          )}

                          {globalIndex === 1 && (
                            <img
                              src={`${process.env.PUBLIC_URL}/grey_crown.png`}
                              alt="부회장"
                              className="crown2"
                            />
                          )}
                        </div>

                        <div className="name-major">
                          <div className="profile-major">{member.major}</div>
                          <div className="profile-name">{member.name}</div>
                        </div>

                        <div className="position-link">
                          <div className="position">관심분야: {member.interests}</div>
                        </div>

                        <div className="individual-line"></div>

                        <div className="hanmadi">
                          {(`"${member.comment}"`).split("\n").map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;