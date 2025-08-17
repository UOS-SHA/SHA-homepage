import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';

const Recruit = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [links, setLinks] = useState(['']);
  const [showComplete, setShowComplete] = useState(false); //지원완료 팝업창

  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  }

  const handleAddLink = () => {
    if (links.length < 5) {
      setLinks([...links, '']);
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    major: '',
    studentId: '',
    phone: '',
    expectation: '',
    promise: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  };

  const handleSubmit = async () => {

    if (!formData.name || !formData.major || !formData.studentId || !formData.phone) {
      alert('이름, 학과, 학번, 전화번호는 필수입니다.');
      return;
    }

    if (isNaN(Number(formData.studentId))) {
      alert('학번은 숫자여야 합니다.');
      return;
    }


    const allData = {
      name: formData.name,
      major: formData.major,
      studentId: parseInt(formData.studentId),
      phone: formData.phone,
      expect: formData.expectation,
      comment: formData.promise,
      sites: links,
    };

    console.log('전송할 데이터: ', allData);

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const serverUrl = `${SERVER_URL}/recruit`;

    try {
      const response = await axios.post(serverUrl, allData);
      console.log('서버 응답: ', response.data);
      alert('지원서가 정상으로 제출되었습니다.');

      setShowComplete(true);

      setFormData({
        name: '',
        major: '',
        studentId: '',
        phone: '',
        expectation: '',
        promise: '',
      });
      setLinks(['']);
    } catch (error) {
      console.error('서버 전송 에러:', error);
      alert('지원서 제출에 실패했습니다. 다시 시도해주세요.');
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
        <div className="mobile-menu" onClick={() => setIsMenuOpen(true)}>
          <img src={`${process.env.PUBLIC_URL}/menubar.png`} alt="menubar" className="menubar" />
        </div>
        {isMenuOpen && (
          <div className="mobile-menu-content">
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <img src={`${process.env.PUBLIC_URL}/close2.png`} alt="close" className="close-icon" />
            </button>
            <div className="mobile-nav-content">
              <NavLink
                to="/"
                className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
                }
                end
              >
                HOME
              </NavLink>
              <NavLink
                to="/members"
                className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
                }
              >
                MEMBER
              </NavLink>
              <NavLink
                to="/study"
                className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
                }
              >
                STUDY
              </NavLink>
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
        )}
      </div>
      {/*모바일 버전 */}
      <div className="mobile-recruit-container">
        <div className="mobile-JoinUs">
          <div className="mobile-word-box">
            <div className="mobile-title">JOIN US</div>
            <div className="mobile-info">
              <p>정보보안에 관심 있는 모든 분들을 환영합니다. <br />
                함께 배우고 고민하며 성장하는 정보 보안 소모임 SHA에서 여러분의 열정을 펼쳐보세요.
                다양한 주제를 다루며 서로의 지식을 나누고, 협력하는 즐거움을 경험할 수 있습니다. <br />
                지금, 새로운 도전과 배움의 시작에 함께하세요! <br />
                
                <br /> 문의사항: 김민주 010-9878-8749
                </p></div>
          </div>
        </div>
        <div className="mobile-recruit-sheet">
          <div className="mobile-fillout">
            <p>Fill out the form to become a member</p>
          </div>
          <div className="mobile-line2"></div>
          <div className="mobile-scroll-box">
            <div className="mobile-info-box">
              <div className="mobile-label-box">
                <div className="mobile-name">이름</div>
                <div className="mobile-name">학과</div>
                <div className="mobile-name">학번</div>
                <div className="mobile-name">전화번호</div>
              </div>
              <div className="mobile-input-box">
                <input className="mobile-input" type="text" value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)} />
                <input className="mobile-input" type="text" value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)} />
                <input className="mobile-input" type="text" value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)} />
                <input className="mobile-input" type="text" value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>
            </div>
            <div className="mobile-line3"></div>
            <div className="mobile-writing-box">
              <div className="mobile-label-box2">
                <div className="mobile-name2">소모임에 기대하는 바</div>
                <div className="mobile-name2">다짐 한마디</div>
              </div>
              <div className="mobile-input-box2">
                <textarea className="mobile-input2" value={formData.expectation}
                  onChange={(e) => handleInputChange('expectation', e.target.value)} />
                <textarea className="mobile-input2" value={formData.promise}
                  onChange={(e) => handleInputChange('promise', e.target.value)} />
              </div>
            </div>
            <div className="mobile-line4"></div>
            <div className="mobile-link-box">
              <div className="mobile-label-box3">
                <div className="mobile-name3">개인 사이트</div>
              </div>
              <div className="mobile-input-box3">
                {links.map((link, idx) => (
                  <input key={idx} className="mobile-input3" value={link} onChange={(e) =>
                    handleLinkChange(idx, e.target.value)
                  } />
                ))}

                {links.length < 5 && (
                  <div className="mobile-input3-add-button" onClick={handleAddLink}>
                    <img src={`${process.env.PUBLIC_URL}/plus.png`} alt="플러스이미지" className="plus" />
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-line5"></div>
            <div className="mobile-jiwon-box">
              <button className="mobile-jiwon" onClick={handleSubmit}>
                지원하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*컴퓨터 버전 */}
      <div className="recruit-container">
        <div className="JoinUs">
          <div className="word-box">
            <div className="title">JOIN US</div>
            <div className="info">
              <p>정보보안에 관심 있는 모든 분들을 환영합니다. <br />
                함께 배우고 고민하며 성장하는 정보 보안 소모임 SHA에서 여러분의 열정을 펼쳐보세요.
                다양한 주제를 다루며 서로의 지식을 나누고, 협력하는 즐거움을 경험할 수 있습니다.<br/>
              지금, 새로운 도전과 배움의 시작에 함께하세요! <br />
                <br />문의사항: 김민주 010-9878-8749</p></div>
          </div>
        </div>
        <div className="line"></div>
        <div className="recruit-sheet">
          <div className="fillout">
            <p>Fill out the form to become a member</p>
          </div>
          <div className="line2"></div>
          <div className="scroll-box">
            <div className="info-box">
              <div className="label-box">
                <div className="name">이름</div>
                <div className="name">학과</div>
                <div className="name">학번</div>
                <div className="name">전화번호</div>
              </div>
              <div className="input-box">
                <input className="input" type="text" value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)} />
                <input className="input" type="text" value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)} />
                <input className="input" type="text" value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)} />
                <input className="input" type="text" value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>
            </div>
            <div className="line3"></div>
            <div className="writing-box">
              <div className="label-box2">
                <div className="name2">소모임에 <br /> 기대하는 바</div>
                <div className="name2">다짐 한마디</div>
              </div>
              <div className="input-box2">
                <textarea className="input2" value={formData.expectation}
                  onChange={(e) => handleInputChange('expectation', e.target.value)} />
                <textarea className="input2" value={formData.promise}
                  onChange={(e) => handleInputChange('promise', e.target.value)} />
              </div>
            </div>
            <div className="line4"></div>
            <div className="link-box">
              <div className="label-box3">
                <div className="name3">개인 사이트</div>
              </div>
              <div className="input-box3">
                {links.map((link, idx) => (
                  <input key={idx} className="input3" value={link} onChange={(e) =>
                    handleLinkChange(idx, e.target.value)
                  } />
                ))}

                {links.length < 5 && (
                  <div className="input3-add-button" onClick={handleAddLink}>
                    <img src={`${process.env.PUBLIC_URL}/plus.png`} alt="플러스이미지" className="plus" />
                  </div>
                )}
              </div>
            </div>
            <div className="line5"></div>
            <div className="jiwon-box">
              <button className="jiwon" onClick={handleSubmit}>
                지원하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*{showComplete && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close" onClick={() => setShowComplete(false)}>
              <img className="real-close" src={`${process.env.PUBLIC_URL}/close.png`} alt="close" />
            </button>
            <div className="check-icon">
              <img className="real-check" src={`${process.env.PUBLIC_URL}/check.png`} alt="check" />
            </div>
            <div className="word-OK">가입 신청이 완료되었습니다.</div>
          </div>
        </div>
      )}
        */}

    </div>
  );
};

export default Recruit;