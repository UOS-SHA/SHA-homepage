import React from 'react';
import { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './Study.css';
import './AdminBoard.css';
import './AdminUsers.css';


//todo: 일단은 프론트엔드 스타일 맞추기, 버튼 기능 구현
//todo2: 백엔드랑 연결하는 코드 짜기

const AdminUsers = () => {
  const [userList, setUserList] = useState([]);

  const location = useLocation();
  const isStudyActive = location.pathname.startsWith('/admin/board');
  const isRecruitActive = location.pathname.startsWith('/admin/users');


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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          alert('누구세요?');
          return;
        }
        const res = await axios.get('http://localhost:8080/admin/users/',
          {headers: {
            Authorization: `Bearer ${token}`,
          }}
        );
        setUserList(res.data);
      } catch (err) {
        console.error('유저 목록 불러오기 실패: ', err);
      }
    };
    fetchUsers();
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
      <div className="users-container">
        <div className="users-index">
          <div className="number1">#</div>
          <div className="admin-username1">이름</div>
          <div className="admin-major1">학과</div>
          <div className="admin-studentnum1">학번</div>
          <div className="admin-phone1">전화번호</div>
          <div className="admin-comment1">코멘트</div>
          <div className="admin-date1">날짜</div>
        </div>
        <div className="admin-line"></div>
        {userList.map((user, idx) => (
          <div 
            key={idx} 
            className={idx % 2 === 0 ? "users-box1" : "users-box2"}
          >
            <div className="number">{idx + 1}</div>
            <div className="admin-username">{user.name}</div>
            <div className="admin-major">{user.major}</div>
            <div className="admin-studentnum">{user.studentId}</div>
            <div className="admin-phone">{user.phone}</div>
            <div className="admin-comment" onClick={() => handleOpenModal(user)}>
              <p>상세보기</p></div>
            <div className="admin-date">
              <p>{user.submitTime}</p>
            </div>
          </div>
        ))}
      </div>
      {isUserModalOpen && selectedUser && (
        <div className="usermodal-overlay">
          <div className="usermodal-content" onClick={(e) => e.stopPropagation()}>
            <div className="usermodal-block">
              <div className="usermodal-label">소모임에 기대하는 바</div>
              <div className="usermodal-info">{selectedUser.expect}</div>
            </div>
            <div className="usermodal-block">
              <div className="usermodal-label">다짐 한마디</div> 
              <div className="usermodal-info">{selectedUser.comment}</div>
            </div>
            <div className="usermodal-block">
              <div className="usermodal-label">개인 사이트</div>{" "}
              {selectedUser.PersonalSite?.url ? (
                <a className="usermodal-info" href={selectedUser.PersonalSite.url} target="_blank" rel="noopener noreferrer">
                  {selectedUser.PersonalSite.url}
                </a>
              ): (
                <span className="modal-info"></span>
              )}
            </div>
            <button className="close" onClick={handleCloseModal}>
              <img className="real-close" src={`${process.env.PUBLIC_URL}/close.png`} alt="close" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;