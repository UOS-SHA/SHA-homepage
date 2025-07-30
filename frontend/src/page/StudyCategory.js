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
  const { semesterId, category } = useParams();
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    //백엔드 주차별 데이터 리스트, url 수정해야함
    axios.get(`/api/study/${semesterId}/${category}`)
      .then(res => setWeeks(res.data))
      .catch(err => console.error(err));
  }, [semesterId, category]);
  
  const categoryContent = {
  web: {
    title: 'Web',
    description: `2025-1학기에서 다룬 내용을 바탕으로,
    다양한 웹 취약점과 익스플로잇 기법을 심화 학습하였습니다.`
  },
  reversing: {
    title: 'Reversing',
    description: `2025-1학기의 기초 내용을 확장하여, 
    리버스 엔지니어링에서 활용되는 핵심 분석 기법들을 실습 중심으로 학습하였습니다.`
  },
  system: {
    title: 'Pwnable',
    description: `2025-1학기의 기초 내용을 확장하여, 
    리버스 엔지니어링에서 활용되는 핵심 분석 기법들을 실습 중심으로 학습하였습니다.`
  }
};

  const content = categoryContent[category] || {
    title: 'Unknown Category',
    description: '해당 카테고리에 대한 정보가 없습니다.'
  };


  return (
    <div className="wholearea">
      <div className="top-bar">
        <img src="/sha-logo.png" alt="Logo" className="logobox" />
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
              <div className="title">{content.title}</div>
              <div className="info">
                <p>{content.description}</p>
              </div>
              <div className="cate-back-button" onClick={() => navigate(-1)}>
                    <img src="/back.png" alt="back" className="cate-back" />
              </div>
            </div>
        </div>
        <div className="line"></div>
        <div className="recruit-sheet">
            <div className="fillout">
              <div className="word-weeklyplan">WEEKLY PLAN</div>
            </div>
            <div className="scroll-box">
              {/*백엔드 연결할 때~
                  근데 연결이 잘 될지 모르겠음.. 스타일이 좀 깨질 것 같아서
                  나중에 백엔드 연결되면 그거 보고 다시 맞춰야 할듯
              {weeks.map((weekData, index) => (
                <React.Fragment key={weekData.weekNumber}>
                  <div className="week-box">
                    <div className="week">
                      <p>{weekData.weekNumber}주차</p>
                    </div>
                    <div className="week-line"></div>
                    <div className="weekinfo-box">
                      <div className="weekinfo-label">
                        <div className="juje-sangse">
                          <div className="word-juje">주제</div>
                          <div className="word-sangse">상세</div>
                        </div>
                        <div className="word-pt">발표 자료</div>
                      </div>
                      <div className="weekinfo-info">
                        <div className="juje-sangse2">
                          <div className="juje">{weekData.topic}</div>
                          <div className="sangse">
                            {weekData.description.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <div className="pt">
                          <a href={weekData.presentationUrl} target="_blank" rel="noopener noreferrer">
                            {weekData.presentationUrl}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < weeks.length - 1 && <div className="week-line3"></div>}
                </React.Fragment>
              ))}
              */}

              {/* 밑에는 스타일 맞추려고 하드코딩.. */}
              <div className="week-box">
                <div className="week">
                  <p>1주차</p> {/*나중에 데이터 받기 */}
                </div>
                <div className="week-line"></div>
                <div className="weekinfo-box">
                  <div className="weekinfo-label">
                    <div className="juje-sangse">
                      <div className="word-juje">주제</div>
                      <div className="word-sangse">상세</div>
                    </div>
                    <div className="word-pt">발표 자료</div>
                  </div>
                  <div className="weekinfo-info">
                    <div className="juje-sangse2">
                      <div className="juje">FLASK 관련 취약점</div>
                      <div className="sangse">What is FLASK?<br />
                      FLASK pin debugger exploit<br/>
                      Python dirty Arbitrary File Write(AFW)</div>
                    </div>
                    <div className="pt">https://notion.link</div>
                  </div>
                </div>
              </div>
              <div className="week-line3"></div>
              <div className="week-box">
                <div className="week">
                  <p>2주차</p> {/*나중에 데이터 받기 */}
                </div>
                <div className="week-line"></div>
                <div className="weekinfo-box">
                  <div className="weekinfo-label">
                    <div className="juje-sangse">
                      <div className="word-juje">주제</div>
                      <div className="word-sangse">상세</div>
                    </div>
                    <div className="word-pt">발표 자료</div>
                  </div>
                  <div className="weekinfo-info">
                    <div className="juje-sangse2">
                      <div className="juje">FLASK 관련 취약점</div>
                      <div className="sangse">What is FLASK?<br />
                      FLASK pin debugger exploit<br/>
                      Python dirty Arbitrary File Write(AFW)</div>
                    </div>
                    <div className="pt">https://notion.link</div>
                  </div>
                </div>
              </div>
              <div className="week-line3"></div>
              <div className="week-box">
                <div className="week">
                  <p>3주차</p> {/*나중에 데이터 받기 */}
                </div>
                <div className="week-line"></div>
                <div className="weekinfo-box">
                  <div className="weekinfo-label">
                    <div className="juje-sangse">
                      <div className="word-juje">주제</div>
                      <div className="word-sangse">상세</div>
                    </div>
                    <div className="word-pt">발표 자료</div>
                  </div>
                  <div className="weekinfo-info">
                    <div className="juje-sangse2">
                      <div className="juje">FLASK 관련 취약점</div>
                      <div className="sangse">What is FLASK?<br />
                      FLASK pin debugger exploit<br/>
                      Python dirty Arbitrary File Write(AFW)</div>
                    </div>
                    <div className="pt">https://notion.link</div>
                  </div>
                </div>
              </div>
              <div className="week-line3"></div>
              <div className="week-box">
                <div className="week">
                  <p>4주차</p> {/*나중에 데이터 받기 */}
                </div>
                <div className="week-line"></div>
                <div className="weekinfo-box">
                  <div className="weekinfo-label">
                    <div className="juje-sangse">
                      <div className="word-juje">주제</div>
                      <div className="word-sangse">상세</div>
                    </div>
                    <div className="word-pt">발표 자료</div>
                  </div>
                  <div className="weekinfo-info">
                    <div className="juje-sangse2">
                      <div className="juje">FLASK 관련 취약점</div>
                      <div className="sangse">What is FLASK?<br />
                      FLASK pin debugger exploit<br/>
                      Python dirty Arbitrary File Write(AFW)</div>
                    </div>
                    <div className="pt">https://notion.link</div>
                  </div>
                </div>
              </div>
              <div className="week-line3"></div>
              <div className="week-box">
                <div className="week">
                  <p>5주차</p> {/*나중에 데이터 받기 */}
                </div>
                <div className="week-line"></div>
                <div className="weekinfo-box">
                  <div className="weekinfo-label">
                    <div className="juje-sangse">
                      <div className="word-juje">주제</div>
                      <div className="word-sangse">상세</div>
                    </div>
                    <div className="word-pt">발표 자료</div>
                  </div>
                  <div className="weekinfo-info">
                    <div className="juje-sangse2">
                      <div className="juje">FLASK 관련 취약점</div>
                      <div className="sangse">What is FLASK?<br />
                      FLASK pin debugger exploit<br/>
                      Python dirty Arbitrary File Write(AFW)</div>
                    </div>
                    <div className="pt">https://notion.link</div>
                  </div>
                </div>
              </div>
              <div className="week-line3"></div>
              <div className="week-box">
                <div className="week">
                  <p>6주차</p> {/*나중에 데이터 받기 */}
                </div>
                <div className="week-line"></div>
                <div className="weekinfo-box">
                  <div className="weekinfo-label">
                    <div className="juje-sangse">
                      <div className="word-juje">주제</div>
                      <div className="word-sangse">상세</div>
                    </div>
                    <div className="word-pt">발표 자료</div>
                  </div>
                  <div className="weekinfo-info">
                    <div className="juje-sangse2">
                      <div className="juje">FLASK 관련 취약점</div>
                      <div className="sangse">What is FLASK?<br />
                      FLASK pin debugger exploit<br/>
                      Python dirty Arbitrary File Write(AFW)</div>
                    </div>
                    <div className="pt">https://notion.link</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCategory;