import React from 'react';
import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';
import './AdminBoard.css';



const AdminBoard = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const token = localStorage.getItem('adminToken');

  //다음 경로
  const adminlocation= useLocation();

  //나중에 백에서 받아오는 코드로 수정
  //백엔드에 db가 없음. 보류
  const [info, setInfo] = useState(
    'SHA는 정보보안의 다양한 분야에 대한 스터디를 운영하였습니다.'+
    '시스템 해킹, 웹 해킹, 리버싱 등을 주제로 이론 학습과 실습을 병행하며, 보안에 대한 이해도를 심화시켰습니다. 또한 CTF 문제 풀이와 발표 중심의 세션을 통해 팀원 간의 지식 공유와 협업 역량을 강화하였습니다.\n'+
    '\n지금, 새로운 도전과 배움의 시작에 함께하세요!');


  const [semesters, setSemesters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSemesters, setEditSemesters] = useState([]);
  const [editInfo, setEditInfo] = useState('');

  // 초기 학기 데이터 로딩
  useEffect(() => {
    axios.get(`${SERVER_URL}/study`)
      .then(res => setSemesters(res.data))
      .catch(console.error);
  }, []);


  //수정 시작
  const handleEdit = () => {
    setEditSemesters([...semesters]);
    setEditInfo(info);
    setIsEditing(true);
  };

  const handleSemesterChange = (index, newName) => {
    const updated = [...editSemesters];
    updated[index].name= newName;
    setEditSemesters(updated);
  };

  const handleAddSemester = () => {
    setEditSemesters([
      ...editSemesters,
      { id: null, name: '새 학기명 입력' } // id=null인 새 학기로 처리
    ]);
  };

   const handleSave = async () => {
  try {
    // 새 학기들 POST
    for (const newSemester of editSemesters.filter(s => !s.id)) {
      const res = await axios.post(`${SERVER_URL}/admin/board/`, { name: newSemester.name },
        {headers: {Authorization: `Bearer ${token}`}}
      );
      console.log('POST 응답:', res.data);
      newSemester.id = res.data.id;  // 서버에서 생성한 ID 반영
    }

    // 기존 학기들 PATCH
    await Promise.all(
      editSemesters
        .filter(s => s.id)
        .map(s => {
          const original = semesters.find(orig => orig.id === s.id);
          if (original && original.name !== s.name) {
            return axios.patch(`${SERVER_URL}/admin/board/`, { id: s.id, name: s.name },
              {headers: {Authorization: `Bearer ${token}`}} 
            );
          }
          return Promise.resolve();
        })
    );

    // 저장 후 서버에서 최신 데이터 다시 받아오기
    const refreshed = await axios.get(`${SERVER_URL}/study`);
    console.log('GET /study 응답:', refreshed.data);

    setSemesters(refreshed.data);

    setIsEditing(false);
    alert('저장 완료!');
  } catch (err) {
    console.error(err);
    alert('저장 중 오류가 발생했습니다.');
  }
};


  const location = useLocation();
  const isStudyActive = location.pathname.startsWith('/admin/board');
  const isRecruitActive = location.pathname.startsWith('/admin/users');
  const isMemberActive = location.pathname.startsWith('/admin/member');

  
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
              to="/admin/users"
              className={({ isActive }) =>
                isRecruitActive ? "nav-link active-link" : "nav-link"
              }
            >
              RECRUIT
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/admin/member"
              className={({ isActive }) =>
                isMemberActive ? "nav-link active-link" : "nav-link"
              }
            >
              MEMBER
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
                    <textarea className="modi-info"
                      value={editInfo}
                      onChange={(e) => setEditInfo(e.target.value)} 
                    />
                    ): (
                      <div>
                        {info.split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                </div>
            </div>
        </div>
        <div className="line"></div>
        <div className="study-sheet">
            <div className="study-fillout"></div>
            <div className="study-line2"></div>
            <div className="scroll-box">
                {(isEditing ? editSemesters : semesters).map((semester, idx, arr) => {
                  let label = semester.name;
                  if (semester.name.endsWith('-1')) {
                    label += ' 여름학기';
                  } else if (semester.name.endsWith('-2')) {
                    label += ' 겨울학기';
                  }
                  return (
                    <React.Fragment key={semester.id ?? `new-${idx}`}>
                      {idx > 0 && (
                        <>
                          <div className="study-line3" />
                        </>
                      )}
                      {isEditing ? (
                        <div className="semester">
                          <input
                            type="text"
                            value={semester.name}
                            onChange={(e) => handleSemesterChange(idx, e.target.value)}
                            className="modi-semester-label"
                          />
                        </div>
                      ) : (
                        <Link to={`${adminlocation.pathname}/${semester.name}`} className="semester">
                          <div className="semester-label">{label}</div>
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