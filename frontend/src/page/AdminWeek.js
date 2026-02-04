import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link, NavLink, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './StudyCategory.css';
import './AdminCate.css';
import './AdminBoard.css';
import './AdminWeek.css';
import AccordionLink from './AccordionLink';
import Study from './Study';

const AdminWeek = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const token = localStorage.getItem('adminToken');

  const { semesterId, category } = useParams();
  const navigate = useNavigate();

  const adminlocation= useLocation();

  const location = useLocation();
  const isStudyActive = location.pathname.startsWith('/admin/board');
  const isRecruitActive = location.pathname.startsWith('/admin/users');


  const [categoryId, setCategoryId] = useState(null);
  const [categoryComment, setCategoryComment] = useState('');
  const [editableComment, setEditableComment] = useState('');

  //수정 여부
  const [isEditing, setIsEditing] = useState(false);

  const [weeks, setWeeks] = useState([]);
  const [editableWeeks, setEditableWeeks] = useState([]);


  const handleEdit = () => {
    setEditableWeeks([...weeks]);
    setEditableComment(categoryComment);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!categoryId) {
    alert('카테고리 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    return;
    }

    try {
      // 1) 카테고리 코멘트 수정
      if (editableComment !== categoryComment) {
        await axios.patch(
          `${SERVER_URL}/admin/board/${semesterId}`,
          { id: categoryId, comment: editableComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategoryComment(editableComment);
      }

      const newWeeks = editableWeeks.filter(w => !w.id);
      for (let w of newWeeks) {
        const res = await axios.post(
          `${SERVER_URL}/admin/board/${semesterId}/${category}`,
          {
            StudyCategory: { name: category },
            weekNum: w.weekNum,
            title: w.title,
            description: w.description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        w.id = res.data.id;
      }

      // 기존 주차 중 내용이 바뀐 것만 PATCH
      const updatedWeeks = editableWeeks.filter(w => {
        if (!w.id) return false; // 새 주차는 이미 POST
        const orig = weeks.find(week => week.id === w.id);
        return orig && (orig.title !== w.title || orig.description !== w.description || orig.weekNum !== w.weekNum);
      });

      for (let w of updatedWeeks) {
        await axios.patch(
          `${SERVER_URL}/admin/board/${semesterId}/${category}`,
          {
            StudyCategory: { name: category },
            weekNum: w.weekNum,
            title: w.title,
            description: w.description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
    setWeeks([...editableWeeks]);
    setIsEditing(false);
    alert('저장 완료!');
  } catch (err) {
    console.error('저장 중 오류:', err.response?.data || err.message || err);
    alert('저장 중 오류가 발생했습니다.');
  }
};




  // 주차별 내용 변경 (index별 주제/상세 수정)
  const handleWeekChange = (index, field, value) => {
    const updated = [...editableWeeks];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setEditableWeeks(updated);
  };


  useEffect(() => {

  axios.get(`${SERVER_URL}/study/${semesterId}/${category}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      const data = res.data;

      if (data.category) {
        setCategoryId(data.category.id);
        setCategoryComment(data.category.comment || '');
        setEditableComment(data.category.comment || '');
      }

      setWeeks(data.weeks || []);
      setEditableWeeks(data.weeks || []);
    })
    .catch(console.error);
}, [semesterId, category]);

  

  //팝업
  const [showPopup, setShowPopup] = useState(false);
  const [newWeek, setNewWeek] = useState({
    weekNum: "",
    title: "",
    description: "",
  });
  
  const handleAddWeekInfo = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setNewWeek({weekNumber: "", topic: "", description: ""});
  };

  // 팝업에서 추가하기 눌렀을 때
  const handleConfirmAdd = () => {
    if (editableWeeks.some(w => w.weekNum === newWeek.weekNum)) {
      alert(`${newWeek.weekNum}주차는 이미 존재합니다.`);
      return;
    }
    const newEntry = { ...newWeek, id: null }; // id 없으면 신규라고 판단
    setEditableWeeks([...editableWeeks, newEntry]);
    setShowPopup(false);
    setNewWeek({ weekNum: "", title: "", description: "" });
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
            <div className="cate-word-box">
              <div className="title">{category}</div>
              {isEditing ? (
                <textarea
                  className="cate-info-input"
                  value={editableComment}
                  onChange={(e) => setEditableComment(e.target.value)}
                />
              ) : (
                <div className="cate-info">
                  {categoryComment.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              )}
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
            <div className="study-line2"></div>
            <div className="scroll-box">
              {(isEditing ? editableWeeks : weeks).map((weekData, idx) => (
                <React.Fragment key={idx}>
                  <div className="week-box">
                    <div className="week">
                      {isEditing ? (
                        <input
                          type="text"
                          value={weekData.weekNum}
                          onChange={(e) => handleWeekChange(idx, "weekNum", e.target.value)}
                          className="week-input"
                        />
                      ) : (
                        <p>{weekData.weekNum}주차</p>
                      )}
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
                          {isEditing ? (
                            <div className="modi-juje-sangse">
                              <input
                                type="text"
                                value={weekData.title}
                                onChange={(e) => handleWeekChange(idx, 'title', e.target.value)}
                                className="modi-juje"
                              />
                              <textarea
                                value={weekData.description}
                                onChange={(e) => handleWeekChange(idx, 'description', e.target.value)}
                                className="modi-sangse"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="juje">{weekData.title}</div>
                              <div className="sangse">
                                {weekData.description.split('\n').map((line, i) => (
                                  <React.Fragment key={i}>
                                    {line}
                                    <br />
                                  </React.Fragment>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {idx < (isEditing ? editableWeeks.length : weeks.length) - 1 && (
                    <div className="week-line3"></div>
                  )}
                </React.Fragment>
              ))}   
            </div>
            <div className="buttons">
              {isEditing ? (
                <div className="editcomp-buttons">
                  <button className="add-button" onClick={handleAddWeekInfo}>
                    <img src={`${process.env.PUBLIC_URL}/addrec.png`} alt="grayrec" className="addrec" />
                    <img src={`${process.env.PUBLIC_URL}/add.png`} alt="add" className="addlogo" />             
                  </button>
                  <button className="save-button" onClick={handleSave}>
                    <img src={`${process.env.PUBLIC_URL}/saverec.png`} alt="greenrec" className="saverec" />
                    <img src={`${process.env.PUBLIC_URL}/save.png`} alt="save" className="savelogo" />             
                  </button>
                </div>
              ) : (
                <button className="edit-button" onClick={handleEdit}>
                  <img src={`${process.env.PUBLIC_URL}/graycircle.png`} alt="circle" className="graycircle" />
                  <img src={`${process.env.PUBLIC_URL}/edit.png`} alt="editlogo" className="editlogo" />
                </button>
              )}
            </div>
            {/* 팝업 */}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-content2">
                  <button className="close" onClick={handleClosePopup}>
                    <img className="real-close" src={`${process.env.PUBLIC_URL}/close.png`} alt="close" />
                  </button>
                  <div className="info-block">
                    <div className="newweek-info">주차</div>
                    <input
                      className="newweek-input"
                      type="text"
                      placeholder="주차를 입력하세요."
                      value={newWeek.weekNum}
                      onChange={(e) =>
                        setNewWeek({ ...newWeek, weekNum: e.target.value })
                      }
                    />
                  </div>
                  <div className="info-block">
                    <div className="newweek-info">주제</div>
                    <input
                      className="newweek-input2"
                      type="text"
                      placeholder="주제를 입력하세요."
                      value={newWeek.title}
                      onChange={(e) =>
                        setNewWeek({ ...newWeek, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="info-block">
                    <div className="newweek-info">상세</div>
                    <textarea
                      className="newweek-input3"
                      placeholder="상세 설명을 입력하세요."
                      value={newWeek.description}
                      onChange={(e) =>
                        setNewWeek({ ...newWeek, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="popup-buttons">
                    <button className="newweek-add" onClick={handleConfirmAdd}>추가하기</button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminWeek;