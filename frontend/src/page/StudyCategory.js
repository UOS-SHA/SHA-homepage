import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './StudyCategory.css';
import AccordionLink from './AccordionLink';




const StudyCategory = () => {
  const { semesterId, category } = useParams();
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/study/${semesterId}/${category}`)
      .then((res) => {
        setWeeks(res.data || []); // ✅ 백엔드 데이터 그대로 반영
      })
      .catch((err) => {
        console.error(err);
        setWeeks([]);
      });
  }, [semesterId, category]);

  //일단 카테고리 설명은 프론트에서 하드코딩
  //추후에 백엔드로 확장
  const categoryContent = {
  Web: {
    title: 'Web',
    description: `2025-1학기에서 다룬 내용을 바탕으로,
    다양한 웹 취약점과 익스플로잇 기법을 심화 학습하였습니다.`,
    link: 'https://notion.link1'
  },
  Reversing: {
    title: 'Reversing',
    description: `2025-1학기의 기초 내용을 확장하여,
    리버스 엔지니어링에서 활용되는 핵심 분석 기법들을 실습 중심으로 학습하였습니다.`,
    link: 'https://notion.link2'
  },
  System: {
    title: 'Pwnable',
    description: `2025-1학기의 기초 내용을 확장하여,
    리버스 엔지니어링에서 활용되는 핵심 분석 기법들을 실습 중심으로 학습하였습니다.`,
    link: 'https://notion.link3'
  }
};

  const content = categoryContent[category] || {
    title: 'Unknown Category',
    description: '해당 카테고리에 대한 정보가 없습니다.'
  };



  return (
    <div className="wholearea">
      <div className="top-bar">
        <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="Logo" className="logobox" />
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
            <div className="cate-word-box">
              <div className="title">{content.title}</div>
              <div className="cate-info">
                {content.description.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
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