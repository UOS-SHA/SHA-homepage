import React from 'react';
import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';

const Study = () => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    axios.get('/api/study/semester') //백엔드 학기리스트, url 수정해야함
      .then(res => setSemesters(res.data))
      .catch(err => console.error(err));
  }, []);
  
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
                <div className="title">STUDY LOG</div>
                <div className="info">
                  <p>SHA는 정보보안의 다양한 분야에 대한 스터디를 운영하였습니다. <br />
                    시스템 해킹, 웹 해킹, 리버싱 등을 주제로 이론 학습과 실습을 병행하며, 보안에 대한 이해도를 심화시켰습니다. 
                    또한 CTF 문제 풀이와 발표 중심의 세션을 통해 팀원 간의 지식 공유와 협업 역량을 강화하였습니다. </p>

                <p>지금, 새로운 도전과 배움의 시작에 함께하세요!</p>
                </div>
            </div>
        </div>
        <div className="line"></div>
        <div className="study-sheet">
            <div className="study-fillout"></div>
            <div className="study-line2"></div>
            <div className="scroll-box">
              {/*백엔드 연결할 때!!
              {semesters.map((semester, index) => (
                <React.Fragment key={semester.id}>
                  <Link to={`/study/${semester.id}`} className="semester">
                    <div className="semester-label">{semester.label}</div>
                  </Link>
                  {index < semesters.length - 1 && <div className="study-line3"></div>}
                </React.Fragment>
              ))}
              */}
              {/*스타일 맞추려고 하드코딩 */}
              <Link to="/study/2025-1" className="semester">
                <div className="semester-label">2025-1 여름방학</div> {/*나중에 백에서 불러온 데이터 넣기*/}
              </Link>
              <div className="study-line3"></div>
              <Link to="/study/2025-2" className="semester">
                <div className="semester-label">2025-2 겨울방학</div> {/*나중에 백에서 불러온 데이터 넣기*/}
              </Link>
              <div className="study-line3"></div>
              <Link to="/study/2026-1" className="semester">
                <div className="semester-label">2026-1 여름방학</div> {/*나중에 백에서 불러온 데이터 넣기*/}
              </Link>
              <div className="study-line3"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Study;