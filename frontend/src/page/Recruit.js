import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './FAQ.css'; 

const Recruit = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [links, setLinks] = useState(['']);
  const [showComplete, setShowComplete] = useState(false); //지원완료 팝업창

  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null); // 어떤 질문이 열려있는지 저장

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };




  const faqData = [
    {
      category: "1. 가입 및 자격 요건",
      questions: [
        { q: "코딩을 아예 못하는 초보자도 지원할 수 있나요?", a: "네, 열정만 있다면 충분히 가능합니다! SHA는 실력보다 배우고자 하는 의지를 중요하게 생각합니다. 기초부터 차근차근 함께 공부할 수 있는 스터디 커리큘럼이 준비되어 있으니 걱정 말고 지원해 주세요." },
        { q: "컴퓨터공학과 학생만 지원 가능한가요?", a: "아니요, 정보보안에 관심이 있는 서울시립대학교 학생이라면 전공에 상관없이 누구나 지원 가능합니다. 다양한 전공의 시너지를 환영합니다!" },
        { q: "선발 과정은 어떻게 되나요?", a: "서류 심사 후 간단한 면접이 진행될 예정입니다. 면접은 지원자의 실력을 테스트하기보다는 소모임 활동에 대한 열정과 성실함을 확인하는 자리이니 편안한 마음으로 임해주시면 됩니다." }
      ]
    },
    {
      category: "2. 활동 및 스터디 관련",
      questions: [
        { q: "구체적으로 어떤 공부/프로젝트를 하나요?", a: "웹/시스템 해킹 기초부터 디지털 포렌식, 암호학 스터디를 진행합니다. 최근에는 실제 대회(CTF) 참여를 위한 팀 빌딩과 AI 보안 기술 연구 프로젝트도 함께 병행하고 있습니다." },
        { q: "시험 기간에도 활동을 하나요?", a: "부원들의 학업을 위해 시험 기간 2주 전부터는 모든 공식 활동을 중단(휴강)합니다. 공부에 집중하신 후 시험이 끝나면 다시 즐겁게 활동을 재개합니다." }
      ]
    },
    {
      category: "3. 운영 및 회비",
      questions: [
        { q: "회비는 얼마이고 어디에 사용되나요?", a: "학기당 일정 금액의 회비를 걷으며, 이는 스터디 공간 대관료, 웹 서버 운영비, 스터디 간식비 및 소모임 행사비로 투명하게 사용됩니다. 상세 내역은 항상 공유됩니다." }
      ]
    },
    {
      category: "4. 친목 및 분위기",
      questions: [
        { q: "팀 프로젝트 외에 다른 행사도 있나요?", a: "네! 연 1회 이상의 MT, 정기 회식, 그리고 가벼운 번개 모임을 통해 부원들 간의 친목을 도모합니다. 기술 공유뿐만 아니라 즐거운 대학 생활을 함께 만드는 것을 지향합니다." }
      ]
    }
  ];

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
    interests: [],
    interestEtc: '',
    team: '',
    selfIntro: '',
    seminarAvailable: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  };


  const handleCheckboxChange = (field, value) => {
  setFormData(prev => {
    // 단일 선택 필드(team, seminar)인 경우 문자열로 저장
    if (field === 'team' || field === 'seminarAvailable') {
      return { ...prev, [field]: value };
    }
    
    // 다중 선택 필드(interests)인 경우 배열로 관리
    const currentValues = prev[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(i => i !== value)
      : [...currentValues, value];
    
    return { ...prev, [field]: newValues };
  });
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
      interests: JSON.stringify(formData.interests),
      interestEtc: formData.interestEtc || '',
      team: formData.team.toUpperCase(),
      selfIntro: (formData.selfIntro || '').substring(0, 100),      
      seminarAvailable: formData.seminarAvailable === '가능' ? true : false,
      expect: formData.expectation,
      comment: formData.promise,
      sites: links.filter(link => link !== ''),
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
        interests: [],
        interestEtc: '',
        team: '',
        selfIntro: '',
        seminarAvailable: ''
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
        {/* 지원 기간 안내 섹션 - PC/모바일 공용 */}
        <div className="recruit-closed-overlay">
          <div className="closed-content">
            <div className="closed-icon">
              <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="Logo" className="closed-logo-anim" />
            </div>
            <h2 className="closed-title">지금은 모집 기간이 아닙니다</h2>
            <p className="closed-desc">
              SHA에 관심을 가져주셔서 감사합니다. <br />
              Recruit 기간: <strong>2/23(월)~3/8(일)</strong>
            </p>
            <div className="closed-actions">
              <Link to="/" className="btn-back-home">홈으로 가기</Link>
              <Link to="/study" className="btn-view-activity">활동 구경하기</Link>
            </div>
            <div className="contact-info">
              문의: 조재희 010-2397-4021
            </div>
          </div>
        </div>
        
        <div className="mobile-JoinUs">
          <div className="mobile-word-box">
            <div className="mobile-title">JOIN US</div>
            <div className="mobile-info">
              <p>정보보안에 관심 있는 모든 분들을 환영합니다. <br />
                함께 배우고 고민하며 성장하는 정보 보안 소모임 SHA에서 여러분의 열정을 펼쳐보세요.
                다양한 주제를 다루며 서로의 지식을 나누고, 협력하는 즐거움을 경험할 수 있습니다. <br />
                지금, 새로운 도전과 배움의 시작에 함께하세요! <br />
                
                <br /> 문의사항: 조재희 010-2397-4021
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
                <div className="mobile-name2"
                  style={{paddingBottom: 28}}>관심분야</div>
                <div className="mobile-name2">팀 선택</div>
                <div className="mobile-name2">세미나 참여</div>
                <div className="mobile-name2" style={{paddingBottom: 30}}>본인 소개</div>
                <div className="mobile-name2" style={{paddingBottom: 48}}>소모임에 기대하는 바</div>
                <div className="mobile-name2">다짐 한마디</div>
              </div>
              <div className="mobile-input-box2">
                {/* 관심분야 (체크박스) */}
                <div className="mobile-checkbox-group" style={{marginTop: 20}}>
                  {['Web', 'system', 'reversing', 'forensic', 'crypto'].map(f => (
                    <label key={f} className="mobile-check-label">
                      <input type="checkbox" checked={formData.interests.includes(f)} 
                        onChange={() => handleCheckboxChange('interests', f)} /> {f}
                    </label>
                  ))}
                </div>
                {/* 팀 선택 (라디오) */}
                <div className="mobile-radio-group">
                  {['A', 'B', 'C'].map(f => (
                    <label key={f} className="mobile-check-label">
                      <input type="radio" name="mobile-team" checked={formData.team === f} 
                        onChange={() => handleInputChange('team', f)} /> {f}
                    </label>
                  ))}
                </div>

                {/* 세미나 참여 (라디오) */}
                <div className="mobile-radio-group">
                  {['가능', '불가능'].map(f => (
                    <label key={f} className="mobile-check-label">
                      <input type="radio" name="mobile-seminar" checked={formData.seminarAvailable === f} 
                        onChange={() => handleInputChange('seminarAvailable', f)} /> {f}
                    </label>
                  ))}
                </div>
                
                {/* 텍스트 영역들 */}
                <textarea className="mobile-input-short" placeholder="본인을 한 줄로 소개해주세요"
                  value={formData.selfIntro} onChange={(e) => handleInputChange('selfIntro', e.target.value)} />
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
        {/* 지원 기간이 아닐 때 보여줄 오버레이 */}
        <div className="recruit-closed-overlay">
          <div className="closed-content">
            <div className="closed-icon">
              <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="Logo" className="closed-logo-anim" />
            </div>
            <h2 className="closed-title">현재는 지원 기간이 아닙니다</h2>
            <p className="closed-desc">
              SHA에 관심을 가져주셔서 감사합니다. <br />
              Recruit 기간: <strong>2/23(월)~3/8(일)</strong>
            </p>
            <div className="closed-actions">
              <Link to="/" className="btn-back-home">홈으로 돌아가기</Link>
              <Link to="/study" className="btn-view-activity">활동 내용 구경하기</Link>
            </div>
            <div className="contact-info">
              문의: 조재희 010-2397-4021
            </div>
          </div>
        </div>
        
        <div className="JoinUs">
          <div className="word-box">
            <div className="title">JOIN US</div>
            <div className="info">
              <p>정보보안에 관심 있는 모든 분들을 환영합니다. <br />
                함께 배우고 고민하며 성장하는 정보 보안 소모임 SHA에서 여러분의 열정을 펼쳐보세요.
                다양한 주제를 다루며 서로의 지식을 나누고, 협력하는 즐거움을 경험할 수 있습니다.<br/>
              지금, 새로운 도전과 배움의 시작에 함께하세요! <br />
                <br />문의사항: 조재희 010-2397-4021</p></div>
          </div>
          <div className="faq-floating-btn" onClick={() => setIsFaqOpen(true)}>
            <p>FAQ 자주 묻는 질문</p>
          </div>
        </div>
        {/* FAQ 모달 */}
          {isFaqOpen && (
            <div className="faq-overlay" onClick={() => setIsFaqOpen(false)}>
              <div className="faq-modal" onClick={(e) => e.stopPropagation()}>
                <div className="faq-header">
                  <h2>FAQ</h2>
                  <button className="faq-close-btn" onClick={() => setIsFaqOpen(false)}>
                    <img src={`${process.env.PUBLIC_URL}/close2.png`} alt="close" />
                  </button>
                </div>
            
                <div className="faq-scroll-area">
                  {faqData.map((section, sIdx) => (
                    <div key={sIdx} className="faq-section">
                      <h3 className="faq-category">{section.category}</h3>
                      {section.questions.map((item, qIdx) => {
                        const uniqueIdx = `${sIdx}-${qIdx}`;
                        const isOpen = activeFaq === uniqueIdx;
                        return (
                          <div key={qIdx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                            <div className="faq-question" onClick={() => toggleFaq(uniqueIdx)}>
                              <span>Q. {item.q}</span>
                              <img 
                                src={`${process.env.PUBLIC_URL}/right.png`} 
                                className={`faq-arrow ${isOpen ? 'rotated' : ''}`} 
                                alt="arrow" 
                              />
                            </div>
                            <div className="faq-answer">
                              <p>{item.a}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
                <div className="name2">관심분야</div>
                <div className="name2">팀 선택</div>
                <div className="name2">4주 세미나 참여 여부</div>
                <div className="name2">본인 한 줄 소개</div>                
                <div className="name2-1">소모임에 <br /> 기대하는 바</div>
                <div className="name2">다짐 한마디</div>
              </div>
              <div className="input-box2">
                {/* 관심분야 */}
                <div className="checkbox-group">
                  {['Web', 'system', 'reversing', 'forensic', 'crypto'].map(f => (
                    <label key={f}>
                      <input type="checkbox" checked={formData.interests.includes(f)} 
                        onChange={() => handleCheckboxChange('interests', f)} /> {f}
                    </label>
                  ))}
                </div>

                {/* 팀 선택 */}
                <div className="checkbox-group">
                  {['A', 'B', 'C'].map(f => (
                    <label key={f}>
                      <input type="radio" name="team" checked={formData.team === f} 
                        onChange={() => handleInputChange('team', f)} /> {f}
                    </label>
                  ))}
                </div>

                {/* 세미나 참여 */}
                <div className="checkbox-group">
                  {['가능', '불가능'].map(f => (
                    <label key={f}>
                      <input type="radio" name="seminar" checked={formData.seminarAvailable === f} 
                        onChange={() => handleInputChange('seminarAvailable', f)} /> {f}
                      </label>
                  ))}
                </div>
                <textarea className="input2-1" value={formData.selfIntro}
                  onChange={(e) => handleInputChange('selfIntro', e.target.value)} />
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