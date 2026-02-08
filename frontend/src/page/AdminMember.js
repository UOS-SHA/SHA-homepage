import React from 'react';
import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';
import './AdminBoard.css';
import './AdminUsers.css';
import './AdminMember.css';


//todo: 일단은 프론트엔드 스타일 맞추기, 버튼 기능 구현
//todo2: 백엔드랑 연결하는 코드 짜기

const AdminMember = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [userList, setUserList] = useState([]);

  const location = useLocation();
  const isStudyActive = location.pathname.startsWith('/admin/board');
  const isRecruitActive = location.pathname.startsWith('/admin/users');
  const isMemberActive = location.pathname.startsWith('/admin/member');

  //없어도됨
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(false);
  }

  //멤버 모달 관련 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' 또는 'edit'
  const [targetMember, setTargetMember] = useState({
    id: null,
    name: '',
    major: '',
    studentId: '',
    interests: '',
    comment: ''
  });

  // 데이터 불러오기
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${SERVER_URL}/admin/users/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserList(res.data);
    } catch (err) {
      console.error('유저 목록 불러오기 실패: ', err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // 모달 열기 (추가 모드)
  const openAddModal = () => {
    setModalMode('add');
    setTargetMember({ id: null, name: '', major: '', studentId: '', interests: '', comment: '' });
    setIsModalOpen(true);
  };

  // 모달 열기 (수정 모드)
  const openEditModal = (user) => {
    setModalMode('edit');
    setTargetMember({
      id: user.id,
      name: user.name,
      major: user.major,
      studentId: user.studentId,
      interests: Array.isArray(user.interests) ? user.interests.join(', ') : user.interests,
      comment: user.comment || ''
    });
    setIsModalOpen(true);
  };
  
  // 멤버 추가/수정 처리
  const handleAction = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      if (modalMode === 'add') {
        await axios.post(`${SERVER_URL}/admin/users/add`, targetMember, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('멤버가 추가되었습니다.');
      } else {
        await axios.put(`${SERVER_URL}/admin/users/edit/${targetMember.id}`, targetMember, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('멤버 정보가 수정되었습니다.');
      }
      setIsModalOpen(false);
      fetchUsers(); // 목록 새로고침
    } catch (err) {
      alert('처리에 실패했습니다.');
    }
  };

  // 멤버 삭제 처리
  const handleDelete = async (id) => {
    if (!window.confirm("정말로 이 멤버를 삭제하시겠습니까?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${SERVER_URL}/admin/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('삭제되었습니다.');
      fetchUsers();
    } catch (err) {
      alert('삭제 실패');
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
      <div className="users-container">
        <div className="users-index">
          <div className="number1">#</div>
          <div className="admin-username1">이름</div>
          <div className="admin-major1">학과</div>
          <div className="admin-studentnum1">학번</div>
          <div className="admin-interests1">관심분야</div>
          <div className="admin-comment1">한마디</div>
          <div className="admin-header-row">
            <button className="add-btn" onClick={openAddModal}>+ 멤버 추가</button>
          </div>
        </div>
        <div className="admin-line"></div>
        {userList.map((user, idx) => {
          // 1. 관심분야 처리: 배열일 수도, 문자열된 JSON일 수도 있음
          let displayInterests = '없음';
          try {
            if (user.interests) {
              if (Array.isArray(user.interests)) {
                displayInterests = user.interests.join(', ');
              } else if (typeof user.interests === 'string') {
                // 만약 "[ "Web" ]" 처럼 문자열로 오면 파싱 시도
                const parsed = JSON.parse(user.interests);
                displayInterests = Array.isArray(parsed) ? parsed.join(', ') : parsed;
              }
            }
          } catch (e) {
            displayInterests = user.interests; // 파싱 실패 시 원본이라도 출력
          }

          return (
            <div key={idx} className={idx % 2 === 0 ? "users-box1" : "users-box2"}>
              <div className="number">{idx + 1}</div>
              <div className="admin-username">{user.name}</div>
              <div className="admin-major">{user.major}</div>
              <div className="admin-studentnum">{user.studentId}</div>
      
              {/* 관심분야 출력 */}
              <div className="admin-major">{displayInterests}</div>
              {/* 한마디 출력 */}
              <div className="admin-major">{user.comment}</div>
              <div className="admin-btns">
                <button className="edit-mini-btn" onClick={() => openEditModal(user)}>수정</button>
                <button className="delete-mini-btn" onClick={() => handleDelete(user.id)}>삭제</button>
              </div>
            </div>
          );  
        })}
      </div>
      {/* 추가/수정 공용 모달 */}
      {isModalOpen && (
        <div className="usermodal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="usermodal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalMode === 'add' ? '새 멤버 추가' : '멤버 정보 수정'}</h3>
            
            <div className="modal-form">
              <input type="text" placeholder="이름" value={targetMember.name} 
                onChange={(e) => setTargetMember({...targetMember, name: e.target.value})} />
              
              <input type="text" placeholder="학과" value={targetMember.major} 
                onChange={(e) => setTargetMember({...targetMember, major: e.target.value})} />
              
              <input type="text" placeholder="학번" value={targetMember.studentId} 
                onChange={(e) => setTargetMember({...targetMember, studentId: e.target.value})} />
              
              <input type="text" placeholder="관심분야 (쉼표로 구분)" value={targetMember.interests} 
                onChange={(e) => setTargetMember({...targetMember, interests: e.target.value})} />
              
              <textarea placeholder="한마디" value={targetMember.comment} 
                onChange={(e) => setTargetMember({...targetMember, comment: e.target.value})} />
            </div>

            <div className="modal-btns">
              <button className="action-btn" onClick={handleAction}>
                {modalMode === 'add' ? '추가하기' : '수정하기'}
              </button>
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMember;