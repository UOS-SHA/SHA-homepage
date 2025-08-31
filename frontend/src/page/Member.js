import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Member.css';
import '../Home.css';

const Member = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const members = [
    { major: "컴과24", name: "김민주", interests: "web, crypto", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "1활동 1배고파" },
    { major: "기계24", name: "김민찬", interests: "system", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "pwn의 현재이자 미래" },
    { major: "수학23", name: "김재승", interests: "system, crpyto", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: " " },
    { major: "컴과24", name: "김주현", interests: "web", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "가나디 닮은꼴" },
    { major: "컴과25", name: "류재현", interests: "crypto", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "뚱땅뚱땅 키보드말고\n 컴퓨터 키보드" },
    { major: "컴과24", name: "성수현", interests: "web", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "보안소모임 화이팅!" },
    { major: "컴과19", name: "신희용", interests: "web", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "Pache punch" },
    { major: "컴과25", name: "안서진", interests: "web, system", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "닉네임일까요 아닐까요" },
    { major: "컴과21", name: "이규형", interests: "web", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "극극극 TTTTTT" },
    { major: "컴과20", name: "이성민", interests: "reversing, crpyto", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "english 러버 oh no~" },
    { major: "컴과25", name: "이윤성", interests: "web, reversing", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "rev의 미래" },
    { major: "전전컴25", name: "조현재", interests: "web", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "web goat of goat" },
    { major: "컴과21", name: "최원영", interests: "web", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "나보다 일찍 일어나는\n 사람 나와" },
    { major: "전전컴21", name: "한건우", interests: "reversing, crpyto", github: "https://github.com/minnjuuu", insta: "/insta.png", git: "/git.png", comment: "그냥 goat" },

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
                  {pair.map((member, i) => (
                    <div className="mobile-individual" key={i}>
                      <div className="mobile-name-major">
                        <div className="mobile-profile-major">{member.major}</div>
                        <div className="mobile-profile-name">{member.name}</div>
                      </div>
                      <div className="mobile-position-link">
                        <div className="mobile-position">관심분야: {member.interests}</div>
                        <div className="mobile-profile-link">{member.github}</div>
                      </div>
                      <div className="mobile-individual-line"></div>
                    </div>
                  ))}
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
              <div className="profile-container">
                {chunkArray(members, 2).map((pair, idx) => (
                  <div className="profile-box" key={idx}>
                    {pair.map((member, i) => (
                      <div className="individual" key={i}>
                        <div className="name-major">
                          <div className="profile-major">{member.major}</div>
                          <div className="profile-name">{member.name}</div>
                        </div>
                        <div className="insta-git">
                          <div className="insta">
                            <img src={process.env.PUBLIC_URL + member.insta} alt="insta" className="instalogo" />
                          </div>
                          <div className="git">
                           <img src={process.env.PUBLIC_URL + member.git} alt="git" className="gitlogo" />
                          </div>
                        </div>
                        <div className="position-link">
                          <div className="position">관심분야: {member.interests}</div>
                          <div className="profile-link">{member.github}</div>
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
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;