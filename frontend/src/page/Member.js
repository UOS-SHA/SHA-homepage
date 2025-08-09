import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Member.css';

const Member = () => {
 
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
      </div>
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
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김민주</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                </div>
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
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김민주</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                </div>
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
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김민주</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                </div>
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
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김민주</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                </div>
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
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                    <div className="individual">
                        <div className="name-major">
                            <div className="profile-major">컴과24</div>
                            <div className="profile-name">김민주</div>
                        </div> 
                        <div className="insta-git">
                            <div className="insta">
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="insta" className="instalogo"></img>
                            </div>
                            <div className="git"> {/*git 로고가 export가 안돼서 insta 넣음 */}
                                <img src={`${process.env.PUBLIC_URL}/insta.png`} alt="git" className="gitlogo"></img>
                            </div>
                        </div> 
                        <div className="position-link">
                            <div className="position">관심분야: web, crypto</div>
                            <div className="profile-link">https://github.com/minnjuuu</div>
                        </div> 
                        <div className="individual-line"></div> 
                        <div className="hanmadi">"경험으로 나아가는, <br/> 
                            개발자 김민주입니다."
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;