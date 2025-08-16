import React from 'react';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {NavLink, useLocation} from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';
import './StudyDetail.css';
import './AdminCate.css';
import './AdminBoard.css';
import { useParams } from 'react-router-dom';

const AdminCate = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { semesterId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('adminToken');


  //다음 경로
  const adminlocation= useLocation();

  //메뉴바 경로
  const location = useLocation();
  const isStudyActive = location.pathname.startsWith('/admin/board');
  const isRecruitActive = location.pathname.startsWith('/admin/users');




  //나중에 백에서 받아오는 코드로 수정
  //보류
  const [info, setInfo] = useState(
    'SHA는 정보보안의 다양한 분야에 대한 스터디를 운영하였습니다.'+
    '시스템 해킹, 웹 해킹, 리버싱 등을 주제로 이론 학습과 실습을 병행하며, 보안에 대한 이해도를 심화시켰습니다. 또한 CTF 문제 풀이와 발표 중심의 세션을 통해 팀원 간의 지식 공유와 협업 역량을 강화하였습니다.\n'+
    '\n지금, 새로운 도전과 배움의 시작에 함께하세요!');



  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState([]);
  const [editInfo, setEditInfo] = useState('');

  useEffect(() => { 
    axios.get(`${SERVER_URL}/study/${semesterId}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        } else {
          setCategories([]);
        }
      })
      .catch(err => {
        console.error('카테고리 불러오기 실패', err);
        setCategories([]);
      });
  }, [semesterId]);

  //수정 시작
  const handleEdit = () => {
    setEditCategory(categories.map(c => ({id: c.id, name: c.name})));
    setEditInfo(info);
    setIsEditing(true);
  };

  const handleCategoryChange = (index, newName) => {
    const updated = [...editCategory];
    updated[index].name= newName;
    setEditCategory(updated);
  };

  //학기 추가
  const handleAddCategory = () => {
    setEditCategory([
      ...editCategory, {id: null, name: '새 카테고리 입력'}, // id=null인 새 카테고리로 처리
    ]);
  };

  const handleSave = async () => {
    try {

      const newCategories = editCategory.filter(c => !c.id);
      for (const newCate of newCategories) {
        const res = await axios.post(`${SERVER_URL}/admin/board/${semesterId}`, { name: newCate.name }
          , {headers: {Authorization: `Bearer ${token}`}}
        );
        newCate.id = res.data.id; // 서버가 반환하는 id 반영
      }

      const updatePromises = editCategory
        .filter(c => c.id)
        .map(c => {
          const original = categories.find(orig => orig.id === c.id);
          if (original && original.name !== c.name) {
            return axios.patch(`${SERVER_URL}/admin/board/${semesterId}`, { id: c.id, name: c.name },
              {headers: {Authorization: `Bearer ${token}`}}
            );
          }
          return Promise.resolve();
        });
      await Promise.all(updatePromises);

      setCategories(editCategory);
      setInfo(editInfo);
      setIsEditing(false);

      alert('저장 완료!');
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };
  

 
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
              <div className="back-button" onClick={() => navigate(-1)}>
                <img src={`${process.env.PUBLIC_URL}/back.png`} alt="back" className="back" />
              </div>
          </div>
          <div className="line"></div>
          <div className="study-sheet">
              <div className="study-fillout"></div>
              <div className="study-line2"></div>
              <div className="scroll-box">
                {(isEditing ? editCategory : categories).map((categoryItem, idx) => {
                  return (
                    <React.Fragment key={categoryItem.id ?? `new-${idx}`}>
                      {idx > 0 && (
                        <>
                          <div className="study-line3" />
                        </>
                      )}
                
                      {isEditing ? (
                        <div className="semester">
                          <input
                            type="text"
                            value={categoryItem.name}
                            onChange={(e) => handleCategoryChange(idx, e.target.value)}
                            className="modi-semester-label"
                          />
                        </div>
                      ) : (
                        <Link to={`${adminlocation.pathname}/${categoryItem.name}`} className="semester">
                          <div className="semester-label">{categoryItem.name}</div>
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
              <button className="add-button" onClick={handleAddCategory}>
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

export default AdminCate;