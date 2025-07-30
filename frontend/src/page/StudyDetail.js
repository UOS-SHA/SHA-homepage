import React from 'react';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';
import './StudyDetail.css';
import { useParams } from 'react-router-dom';

const StudyDetail = () => {
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => { 
    //백엔드 학기당 카테고리 리스트, url 수정해야함
    axios.get(`/api/study/${semesterId}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [semesterId]);

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
                  <div className="title">STUDY LOG</div>
                  <div className="info">
                    <p>SHA는 정보보안의 다양한 분야에 대한 스터디를 운영하였습니다. <br />
                      시스템 해킹, 웹 해킹, 리버싱 등을 주제로 이론 학습과 실습을 병행하며, 보안에 대한 이해도를 심화시켰습니다. 
                      또한 CTF 문제 풀이와 발표 중심의 세션을 통해 팀원 간의 지식 공유와 협업 역량을 강화하였습니다. </p>
  
                  <p>지금, 새로운 도전과 배움의 시작에 함께하세요!</p>
                  </div>
                  <div className="back-button" onClick={() => navigate(-1)}>
                    <img src="/back.png" alt="back" className="back" />
                  </div>
              </div>
          </div>
          <div className="line"></div>
          <div className="study-sheet">
              <div className="study-fillout"></div>
              <div className="study-line2"></div>
              <div className="scroll-box">
                {/*백엔드 연결할 때!! 아래는 스타일 보려고 }
                {categories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <Link to={`/study/${semesterId}/${category.id}`} className="semester">
                      <div className="semester-label">{category.label}</div>
                    </Link>
                    {index < categories.length - 1 && <div className="study-line3"></div>}
                  </React.Fragment>
                ))}
                  */}

                {/* 스타일 맞추려고 하드코딩 */}
                <Link to={`/study/${semesterId}/web`} className="semester">
                  <div className="semester-label">Web</div> 
                </Link>
                <div className="study-line3"></div>
                <Link to={`/study/${semesterId}/reversing`} className="semester">
                  <div className="semester-label">Reversing</div> 
                </Link>
                <div className="study-line3"></div>
                <Link to={`/study/${semesterId}/system`} className="semester">
                  <div className="semester-label">System pwnable</div> 
                </Link>
                <div className="study-line3"></div>
  
              </div>
          </div>
        </div>
      </div>
    );
};

export default StudyDetail;