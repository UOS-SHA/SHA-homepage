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
    selfIntro: ''
  });

  // 데이터 불러오기
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get(`${SERVER_URL}/members/`, {
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
    setTargetMember({ id: null, name: '', major: '', studentId: '', interests: '', selfIntro: '' });
    setIsModalOpen(true);
  };

  // 모달 열기 (수정 모드)
  const openEditModal = (user) => {
    setModalMode('edit');
    // 백엔드의 majorAndId ("학과 / 학번")를 다시 분리
    const [major, studentId] = user.majorAndId ? user.majorAndId.split(' / ') : ['', ''];
    
    setTargetMember({
      id: user.id,
      name: user.name,
      major: major || '',
      studentId: studentId || '',
      interests: user.interests,
      selfIntro: user.selfIntro || ''
    });
    setIsModalOpen(true);
  };
  
  // 멤버 추가/수정 처리
  const handleAction = async () => {
    const token = localStorage.getItem('adminToken');
    
    // 백엔드가 기대하는 데이터 구조로 가공
    const payload = {
      name: targetMember.name,
      majorAndId: `${targetMember.major} / ${targetMember.studentId}`,
      interests: targetMember.interests,
      selfIntro: targetMember.selfIntro
    };

    try {
      if (modalMode === 'add') {
        // 라우터: router.get('/members/', members); (백엔드 코드상 POST 처리됨)
        await axios.post(`${SERVER_URL}/admin/members/`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('멤버가 추가되었습니다.');
      } else {
        // 라우터: router.patch('/members/:id', updateMember);
        await axios.patch(`${SERVER_URL}/admin/members/${targetMember.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('멤버 정보가 수정되었습니다.');
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '처리에 실패했습니다.');
    }
  };

 // 멤버 삭제 처리
  const handleDelete = async (id) => {
    if (!window.confirm("정말로 이 멤버를 삭제하시겠습니까?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      // 라우터: router.delete('/members/:id', deleteMember);
      await axios.delete(`${SERVER_URL}/admin/members/${id}`, {
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
        {userList.map((user, idx) => (
          <div key={idx} className={idx % 2 === 0 ? "users-box1" : "users-box2"}>
            <div className="number">{idx + 1}</div>
            <div className="admin-username">{user.name}</div>
            <div className="admin-major">{user.majorAndId}</div>
            <div className="admin-major">{user.interests}</div>
            <div className="admin-major">{user.selfIntro}</div>
            <div className="admin-btns">
              <button className="edit-mini-btn" onClick={() => openEditModal(user)}>수정</button>
              <button className="delete-mini-btn" onClick={() => handleDelete(user.id)}>삭제</button>
            </div>
          </div>
        ))}
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
              
              <textarea placeholder="한마디" value={targetMember.selfIntro} 
                onChange={(e) => setTargetMember({...targetMember, selfIntro: e.target.value})} />
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