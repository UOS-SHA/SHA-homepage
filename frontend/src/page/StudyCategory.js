import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './StudyCategory.css';




const StudyCategory = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { semesterId, category } = useParams();
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
  axios
    .get(`${SERVER_URL}/study/${semesterId}/${category}`)
    .then((res) => {
      const data = res.data;
      setCategoryInfo(data.category || { name: '', comment: '' });
      setWeeks(Array.isArray(data.weeks) ? data.weeks : []);
    })
    .catch((err) => {
      console.error(err);
      setCategoryInfo({ name: '', comment: '' });
      setWeeks([]);
    });
}, [semesterId, category]);

  const [categoryInfo, setCategoryInfo] = useState({ name: '', comment: '' });


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
      {/*모바일 버전 */}
      <div className="mobile-recruit-container">
        <div className="mobile-JoinUs">
          {categoryInfo && (
            <div className="mobile-cate-word-box">
              <div className="mobile-title">{categoryInfo.name}</div>
              <div className="mobile-cate-info">
                {categoryInfo.comment?.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
            <div className="mobile-cate-back-button" onClick={() => navigate(-1)}>
                    <img src={`${process.env.PUBLIC_URL}/back.png`} alt="back" className="cate-back" />
            </div>
        </div>
        <div className="mobile-line"></div>
        <div className="mobile-recruit-sheet">
            <div className="mobile-fillout">
              <div className="mobile-word-weeklyplan">WEEKLY PLAN</div>
            </div>
            <div className="mobile-line2"></div>
            <div className="mobile-scroll-box">
              {weeks.map((week) => (
                <React.Fragment key={week.weekNum}>
                  <div className="mobile-week-box">
                    <div className="mobile-week">
                      <p>{week.weekNum}주차</p>
                    </div>
                    <div className="mobile-week-line"></div>
                    <div className="mobile-weekinfo-box">
                      <div className="mobile-weekinfo-label">
                        <div className="mobile-juje-sangse">
                          <div className="mobile-word-juje">주제</div>
                          <div className="mobile-word-sangse">상세</div>
                        </div>
                      </div>
                      <div className="mobile-weekinfo-info">
                        <div className="mobile-juje-sangse2">
                          <div className="mobile-juje">{week.title}</div>
                          <div className="mobile-sangse">
                            {week.description.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="study-line3"></div>
                </React.Fragment>
              ))}
            </div>
        </div>
      </div>

      {/*컴퓨터 버전*/}
      <div className="recruit-container">
        <div className="JoinUs">
          {categoryInfo && (
            <div className="cate-word-box">
              <div className="title">{categoryInfo.name}</div>
              <div className="cate-info">
                {categoryInfo.comment?.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
            <div className="cate-back-button" onClick={() => navigate(-1)}>
                    <img src={`${process.env.PUBLIC_URL}/back.png`} alt="back" className="cate-back" />
            </div>
        </div>
        <div className="line"></div>
        <div className="recruit-sheet">
            <div className="fillout">
              <div className="word-weeklyplan">WEEKLY PLAN</div>
            </div>
            <div className="line2"></div>
            <div className="scroll-box">
              {weeks.map((week) => (
                <React.Fragment key={week.weekNum}>
                  <div className="week-box">
                    <div className="week">
                      <p>{week.weekNum}주차</p>
                    </div>
                    <div className="week-line"></div>
                    <div className="weekinfo-box">
                      <div className="weekinfo-label">
                        <div className="juje-sangse">
                          <div className="word-juje">주제</div>
                          <div className="word-sangse">상세</div>
                        </div>
                      </div>
                      <div className="weekinfo-info">
                        <div className="juje-sangse2">
                          <div className="juje">{week.title}</div>
                          <div className="sangse">
                            {week.description.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="study-line3"></div>
                </React.Fragment>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCategory;