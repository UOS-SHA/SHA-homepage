import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import AccordionItem from './AccordionItem';
import '../Home.css';


const achievementlist=[
  {title: '컴퓨터과학부 보안 소모임 SHA 창설'},
  {title: 'HSPACE 클럽 가입', 
    detail: 'HSPACE는 ‘해커스페이스(Hacker Space)’의 약자로, 정보보호 관련 활동을 위한 공간과 자원을 지원하는 커뮤니티입니다. 스터디, 세미나, CTF 대회 개최 등을 위한 공간 대여를 지원하고, 대학 보안 동아리와의 연합 활동을 통해 다양한 협력과 성장을 돕습니다.'},
  {title: 'CCA 가입', 
    detail: 'CCA는 teamh4c와 BoB총동문회가 파트너십을 맺고 교류하고 있는전국사이버보안동아리연합회입니다.'},
  {title: 'SHA 밤샘해킹 진행'},
  {title: 'Hacksium in Busan 본선 진출',
    detail: '이성민(팀 이름 : ,,,,,)'},
  {title: 'Best of the Best 14기 합격', 
    detail: '한건우(디지털포렌식 트랙)'},
];

const Home = () => {
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
      <div className="home-container">
        <div className="video-box">
          <video src={`${process.env.PUBLIC_URL}/homeanimation.mp4`} autoPlay muted loop playsInline />
        </div>
      </div>
      <div className="mouse">
        <img src={`${process.env.PUBLIC_URL}/mouse.png`} alt="scroll" />
      </div>
      <div className="SHA">
        <div className="circle"></div>
        <div className="homelogo-box">
          <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="logo" className="logo-box2" />
          <img src={`${process.env.PUBLIC_URL}/word-SHA.png`} alt="word"className="word-SHA" />
          <img src={`${process.env.PUBLIC_URL}//UOS-Hacking-club.png`} alt="word" className="UOS-Hacking-club" />
        </div>
        <div className="word-box2">
          서울시립대 컴퓨터과학부 보안 소모임 SHA는 보안에 관심 있는 학생들이 함께 학습하고 성장하는 소모임입니다. <br />
          웹/시스템 해킹, 리버싱, 암호학 등 다양한 분야를 다루며, 스터디와 프로젝트, 대회 참여를 통해 실력을 키워나가고 있습니다. <br />
          함께 고민하고 부딪히며 성장할 여러분을 언제나 환영합니다!
        </div>
      </div>
      <div className="activities">
        <div className="word-ACTIVITIES">ACTIVITIES</div>
        <div className="top-fade"></div>
        <div className="circle-wrapper">
          <div className="bizz1"></div>
          <div className="bizz2"></div>
          <div className="special-bizz"></div>
          <div className="homeline2" />
          <div className="homeline3" />
          <div className="homeline4" />
        </div>
        <div className="bottom-fade"></div>
        <div className="homeline1" />
        <div className="studylogo-box">
          <img src={`${process.env.PUBLIC_URL}/studylogo.png`} className="studylogo" alt="스터디 로고" />
        </div>
        <div className="home-wordbox">
          <div className="word-study">
            <p>스터디</p>
          </div>
          <div className="words">SHA의 핵심 활동 중 하나로 보안 분야별 스터디입니다. <br />
          보안이 처음이어도, 함께 공부하면서 성장할 수 있도록 커리큘럼과 <br /> 피드백을 제공합니다. 구성원들이 돌아가며 발표 및 실습을 <br/>
          주도하며, 서로에게 배우는 문화를 지향합니다.</div>
          <div className="tag-box">
            <div className="tag">
              <p>#입문자도 환영</p>
            </div>
            <div className="tag">
              <p>#발표 중심 학습</p>
            </div>
          </div>
        </div>
      </div>
      <div className="achievements">
        <div className="word-ACHIEVEMENTS">
          ACHIEVEMENTS
        </div>
        <div className="achieve-box">
          <div className="date-box">
            <div className="date">2024.04</div>
            <div className="date">.06</div>
            <div className="date">2025.02</div>
            <div className="date">.05</div>
            <div className="date">.06</div>
          </div>
          <div className="line-box">
            <div className="achieve-line" />
            <div className="bizz-box">
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
              <div className="achieve-bizz" />
            </div>
          </div>
          <div className="hangeo-box">
            {achievementlist.map((item, index) => (
              <AccordionItem key={index} title={item.title} detail={item.detail}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-bar"></div>
    </div>
  );
};

export default Home;