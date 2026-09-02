import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { honoraryMembers, members as memberData } from '../data/members';
import './Recruit.css';
import './Member.css';
import '../Home.css';

const Member = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const members = memberData.map((member) => ({
    major: member.majorAndId,
    name: member.name,
    interests: member.interests,
    tags: member.tags || [],
    comment: member.selfIntro,
  }));
  const honoraryMemberList = honoraryMembers.map((member) => ({
    major: member.majorAndId,
    name: member.name,
  }));


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
          <img src={`${import.meta.env.BASE_URL}sha-logo.png`} alt="Logo" className="logobox" />
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
              to="/faq"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              FAQ
            </NavLink>
          </div>
        </div>
        <div className="mobile-menu" onClick={() => setIsMenuOpen(true)}>
          <img src={`${import.meta.env.BASE_URL}menubar.png`} alt="menubar" className="menubar" />
        </div>
        {isMenuOpen && (
          <div className="mobile-menu-content">
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <img src={`${import.meta.env.BASE_URL}close2.png`} alt="close" className="close-icon" />
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
                to="/faq"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                FAQ
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
                      <div className={`mobile-individual${member.tags.length > 0 ? ' has-tags' : ''}`} key={i}>

                        <div className="mobile-img-crown">
                          {globalIndex === 0 && (
                            <img
                              src={`${import.meta.env.BASE_URL}yellow_crown.png`}
                              alt="회장"
                              className="mobile-crown"
                            />
                          )}

                          {globalIndex === 1 && (
                            <img
                              src={`${import.meta.env.BASE_URL}grey_crown.png`}
                              alt="부회장"
                              className="mobile-crown2"
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
                        {member.tags.length > 0 && (
                          <div className="mobile-member-tags">
                            {member.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                          </div>
                        )}
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
              <section className="mobile-honorary-section" aria-labelledby="mobile-honorary-title">
                <h2 id="mobile-honorary-title" className="mobile-honorary-title">HONORARY MEMBERS</h2>
                <div className="mobile-honorary-grid">
                  {honoraryMemberList.map((member) => (
                    <div className="mobile-honorary-card" key={member.name}>
                      <div className="mobile-honorary-major">{member.major}</div>
                      <div className="mobile-honorary-name">{member.name}</div>
                    </div>
                  ))}
                </div>
              </section>
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
            {/*}
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
                              src={`${import.meta.env.BASE_URL}yellow_crown.png`}
                              alt="회장"
                              className="crown"
                            />
                          )}

                          {globalIndex === 1 && (
                            <img
                              src={`${import.meta.env.BASE_URL}grey_crown.png`}
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
            */}
            <div className="profile-container">
              {members.length > 0 ? (
                chunkArray(members, 2).map((pair, idx) => (
                  <div className="profile-box" key={idx}>
                    {pair.map((member, i) => {
                      const globalIndex = idx * 2 + i;
                      return (
                        <div className="individual" key={i}>
                          {/* 왕관 로직 동일 */}
                          <div className="img_crown">
                            {globalIndex === 0 && <img src={`${import.meta.env.BASE_URL}yellow_crown.png`} alt="회장" className="crown" />}
                            {globalIndex === 1 && <img src={`${import.meta.env.BASE_URL}grey_crown.png`} alt="부회장" className="crown2" />}
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
                            {member.comment?.split("\n").map((line, index) => (
                              <span key={index}>"{line}"<br /></span>
                            ))}
                          </div>
                          {member.tags.length > 0 && (
                            <div className="member-tags">
                              {member.tags.map((tag) => <span key={tag}>#{tag}</span>)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              ) : (
                <p style={{ color: 'white' }}>ο(=•ω＜=)ρ⌒☆</p>
              )}
              <section className="honorary-section" aria-labelledby="honorary-title">
                <h2 id="honorary-title" className="honorary-title">HONORARY MEMBERS</h2>
                <div className="honorary-grid">
                  {honoraryMemberList.map((member) => (
                    <div className="honorary-card" key={member.name}>
                      <div className="honorary-major">{member.major}</div>
                      <div className="honorary-name">{member.name}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
