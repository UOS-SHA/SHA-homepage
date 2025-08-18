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
                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과24</div>
                            <div className="mobile-profile-name">김민주</div>
                        </div>  
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web,reversing</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과24</div>
                            <div className="mobile-profile-name">김주현</div>
                        </div>  
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                </div>
                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과24</div>
                            <div className="mobile-profile-name">성수현</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과30</div>
                            <div className="mobile-profile-name">홍길동</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: robbing</div>
                            <div className="mobile-profile-link">https://github.com/gildong</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    
                </div>
                {/*
                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">전전컴21</div>
                            <div className="mobile-profile-name">한건우</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: system,reversing</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과24</div>
                            <div className="mobile-profile-name">성수현</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web, cloud</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                </div>
                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">기계20</div>
                            <div className="mobile-profile-name">김민찬</div>
                        </div>  
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: system</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                      
                    </div>
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">전전컴25</div>
                            <div className="mobile-profile-name">조현재</div>
                        </div>  
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                </div>
                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과24</div>
                            <div className="mobile-profile-name">김주현</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과25</div>
                            <div className="mobile-profile-name">류재현</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: crypto</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                       
                    </div>
                </div>
                                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">건축25</div>
                            <div className="mobile-profile-name">김윤지</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">수학23</div>
                            <div className="mobile-profile-name">김재승</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: system,reversing</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                       
                    </div>
                </div>
                <div className="mobile-profile-box">
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과21</div>
                            <div className="mobile-profile-name">이규형</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                        
                    </div>
                    <div className="mobile-individual">
                        <div className="mobile-name-major">
                            <div className="mobile-profile-major">컴과21</div>
                            <div className="mobile-profile-name">최원영</div>
                        </div> 
                        <div className="mobile-position-link">
                            <div className="mobile-position">관심분야: web</div>
                            <div className="mobile-profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="mobile-individual-line"></div> 
                       
                    </div>
                </div>
                */}
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
                <div className="profile-box">
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김민주</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, reversing</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"1활동 1배고파"
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김주현</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"귀여운 주현이"
                        </div>
                    </div>
                </div>
                <div className="profile-box">
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">성수현</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"열심히 하겠습니다."
                        </div>
                    </div>
                    
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">홍길동</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> 
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"비율 맞추려고 넣었어요."
                        </div>
                    </div>
                    
                </div>
                {/*
                <div className="profile-box">
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">전전컴21</div>
                            <div className="profile-name">한건우</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> 
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, system, reversing, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 한건우입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">성수현</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 성수현입니다."
                        </div>
                    </div>
                </div>
                <div className="profile-box">
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">기계24</div>
                            <div className="profile-name">김민찬</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: system</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민찬입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">전전컴25</div>
                            <div className="profile-name">조현재</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 조현재입니다."
                        </div>
                    </div>
                </div>
                <div className="profile-box">
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김주현</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> 
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, system, reversing</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김주현입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">건축25</div>
                            <div className="profile-name">김윤지</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git">
                                <img src={`${process.env.PUBLIC_URL}/git.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김윤지입니다."
                        </div>
                    </div>
                </div>
                */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;