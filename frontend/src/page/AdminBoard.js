import React from 'react';
import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';
import './AdminBoard.css';


//todo: 일단은 프론트엔드 스타일 맞추기, 버튼 기능 구현
//todo2: 백엔드랑 연결하는 코드 짜기

const AdminBoard = () => {
  //나중에 백엔드에서 받아오는 코드로 수정
  const [semesters, setSemesters] = useState([
    {id: '2025-1', label: '2025-1 여름방학'},
    {id: '2025-2', label: '2025-2 겨울방학'},
    {id: '2026-1', label: '2026-1 여름방학'},
  ]);

  //나중에 백에서 받아오는 코드로 수정
  const [info, setInfo] = useState(
    'SHA는 정보보안의 다양한 분야에 대한 스터디를 운영하였습니다.\n'+
    '시스템 해킹, 웹 해킹, 리버싱 등을 주제로 이론 학습과 실습을 병행하며, 보안에 대한 이해도를 심화시켰습니다. 또한 CTF 문제 풀이와 발표 중심의 세션을 통해 팀원 간의 지식 공유와 협업 역량을 강화하였습니다.\n'+
    '\n지금, 새로운 도전과 배움의 시작에 함께하세요!');


  const [isEditing, setIsEditing] = useState(false);
  const [editSemesters, setEditSemesters] = useState([]);
  const [editInfo, setEditInfo] = useState('');

  //수정 시작
  const handleEdit = () => {
    setEditSemesters([...semesters]);
    setEditInfo(info);
    setIsEditing(true);
  };

  const handleSemesterChange = (index, newLabel) => {
    const updated = [...editSemesters];
    updated[index].label= newLabel;
    setEditSemesters(updated);
  };

  //학기 추가
  const handleAddSemester = () => {
    const newId = `new-${Date.now()}`;
    setEditSemesters([
      ...editSemesters, {id: newId, label: '새 학기명 입력'},
    ]);
  };

  //저장
  const handleSave = () => {
    setSemesters(editSemesters);
    setInfo(editInfo);
    setIsEditing(false);
    // 나중에 여기에 백엔드로 저장 요청 보내야함
  };


  const location = useLocation();
  const isStudyActive = location.pathname.startsWith('/admin/board');
  const isRecruitActive = location.pathname.startsWith('/admin/users');

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
              to="/admin/board"
              className={({ isActive }) =>
                isStudyActive ? "nav-link active-link" : "nav-link"
              }
              end
            >
              STUDY
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/recruit"
              className={({ isActive }) =>
                isRecruitActive ? "nav-link active-link" : "nav-link"
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
                  {isEditing ? (
                    <textArea 
                      value={editInfo}
                      onChange={(e) => setEditInfo(e.target.value)} 
                    />
                    ): (
                      <p>{info}</p>
                  )}
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
              {/*스타일 맞추려고 하드코딩 
              <Link to="/study/2025-1" className="semester">
                <div className="semester-label">2025-1 여름방학</div> {/*나중에 백에서 불러온 데이터 넣기
              </Link>
              <div className="study-line3"></div>
              <Link to="/study/2025-2" className="semester">
                <div className="semester-label">2025-2 겨울방학</div> {/*나중에 백에서 불러온 데이터 넣기
              </Link>
              <div className="study-line3"></div>
              <Link to="/study/2026-1" className="semester">
                <div className="semester-label">2026-1 여름방학</div> {/*나중에 백에서 불러온 데이터 넣기
              </Link>
              <div className="study-line3"></div>
              */}
                {(isEditing ? editSemesters : semesters).map((semester, idx, arr) => {
                  console.log("render", idx, semester.label);

                  return (
                    <React.Fragment key={semester.id}>
                      {idx > 0 && (
                        <>
                          <div className="study-line3" />
                          {console.log("line before", semester.label)}
                        </>
                      )}

                      {isEditing ? (
                        <div className="semester">
                          <input
                            type="text"
                            value={semester.label}
                            onChange={(e) => handleSemesterChange(idx, e.target.value)}
                            className="semester-label"
                          />
                        </div>
                      ) : (
                        <Link to={`/study/${semester.id}`} className="semester">
                          <div className="semester-label">{semester.label}</div>
                        </Link>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
        </div>
      </div>
      <div className="buttons">
        {isEditing ? (
          <div className="editcomp-buttons">
            <button className="add-button" onClick={handleAddSemester}>
              <img src={`${process.env.PUBLIC_URL}/addrec.png`} alt="grayrec" className="addrec" />
              <img src={`${process.env.PUBLIC_URL}/add.png`} alt="add" className="addlogo" />             
            </button>
            <button className="save-button" onClick={handleSave}>
              <img src={`${process.env.PUBLIC_URL}/saverec.png`} alt="greenrec" className="saverec" />
              <img src={`${process.env.PUBLIC_URL}/save.png`} alt="save" className="savelogo" />             
            </button>
          </div>
        ): (
          <button className="edit-button" onClick={handleEdit}>
            <img src={`${process.env.PUBLIC_URL}/graycircle.png`} alt="circle" className="graycircle" />
            <img src={`${process.env.PUBLIC_URL}/edit.png`} alt="editlogo" className="editlogo" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminBoard;