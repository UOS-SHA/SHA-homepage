import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Recruit.css';
import './FAQ.css';

const Recruit = () => {
  const [isRecruitOpen, setIsRecruitOpen] = useState(true);
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
        {
          q: "코딩을 아예 못하는 초보자도 지원할 수 있나요?",
          a: "네, 열정만 있다면 충분히 가능합니다! SHA는 현재 실력보다 배우고자 하는 의지를 더 중요하게 생각합니다. 다만 Python이나 C를 미리 학습해 온다면 활동에 적응하는 데 도움이 될 수 있어 사전 학습을 권장드립니다."
        },
        {
          q: "컴퓨터과학부 학생만 지원 가능한가요?",
          a: "아니요. 정보보안에 관심이 있는 서울시립대학교 학생이라면 전공과 관계없이 누구나 지원할 수 있습니다. 다양한 전공이 모여 만들어내는 시너지를 환영합니다!"
        },
        {
          q: "선발 과정은 어떻게 진행되나요?",
          a: "지원서를 작성해 주시면, 모든 지원자분들에게 회장단에서 개별적으로 안내를 드릴 예정입니다."
        }
      ]
    },
    {
      category: "2. 활동 및 스터디 관련",
      questions: [
        {
          q: "구체적으로 어떤 공부나 프로젝트를 진행하나요?",
          a: "2026년도 SHA는 팀 단위로 활동합니다. CTF팀, 개발팀, 학술팀으로 나뉘어 각 팀의 주제에 맞는 심화 학습과 프로젝트를 진행합니다. 자세한 내용은 첨부된 노션 링크를 참고해주세요!",
          linkText: "세부사항 보기",
          linkUrl: "https://uos-sha.notion.site/2026-1-SHA-307df60c8c17807f9f4ffdefe7649ac2?pvs=74"
        },
        {
          q: "신규 부원 5주 세미나는 무엇인가요?",
          a: "보안 공부를 처음 시작하는 신규 부원들을 위해 준비한 분야별 입문 세미나입니다. 4주 동안 다양한 보안 분야를 실습 중심으로 경험하고, 5주차 주말에는 마이크로 CTF를 통해 그동안의 학습 내용을 재미있게 점검합니다."
        }
      ]
    },
    {
      category: "3. 운영 및 회비",
      questions: [
        {
          q: "회비는 얼마이며, 어디에 사용되나요?",
          a: "학기당 2만 원의 회비를 걷고 있으며, 공간 대관료, 웹 서버 운영비, 소모임 행사비 등에 사용됩니다. 사용 내역은 항상 투명하게 공유합니다."
        }
      ]
    },
    {
      category: "4. 친목 및 분위기",
      questions: [
        {
          q: "SHA 분위기는 어떤가요?",
          a: "SHA는 자율적으로 공부하되 결과물을 함께 리뷰하고 공유하는 문화가 있습니다. 초보자가 질문하기 편하고, 선배/동료가 방향을 잡아주는 분위기를 지향합니다. 주간 해캥, 개발팀 펜테스팅 등 교류형 활동도 운영해 자연스럽게 친해질 수 있어요!"
        }
      ]
    }
  ];

  const renderFaqAnswer = (item) => (
    <>
      <p>{item.a}</p>
      {item.linkUrl && (
        <a
          className="faq-answer-link"
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.linkText || "세부사항 보기"}
        </a>
      )}
    </>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
    team: [],
    selfIntro: '',
    seminarAvailable: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  };


  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      // 단일 선택 필드(team, seminar)인 경우 문자열로 저장
      if (field === 'seminarAvailable') {
        return { ...prev, [field]: value };
      }

      // 다중 선택 필드(interests)인 경우 배열로 관리
      const currentValues = prev[field] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(i => i !== value)
        : [...currentValues, value];

      // '그 외'가 체크 해제될 때 입력했던 텍스트도 초기화하고 싶다면 아래 로직 추가
      if (value === '그 외' && currentValues.includes('그 외')) {
        return { ...prev, [field]: newValues, interestEtc: '' };
      }

      return { ...prev, [field]: newValues };
    });
  };


  const handleSubmit = async () => {

    if (!formData.name || !formData.major || !formData.studentId || !formData.phone
      || !formData.team.length || !formData.seminarAvailable || !formData.selfIntro
      || formData.interests.length === 0 || formData.expectation === '' || formData.promise === ''
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (isNaN(Number(formData.studentId))) {
      alert('학번은 숫자여야 합니다.');
      return;
    }


    const teamMap = {
      'CTF팀': 'A',
      '개발팀': 'B',
      '학술팀': 'C',
      '추후선택': 'later',
    };

    const allData = {
      name: formData.name,
      major: formData.major,
      studentId: parseInt(formData.studentId),
      phone: formData.phone,
      interests: formData.interests,
      interestEtc: formData.interestEtc || '',
      team: formData.team,
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

      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드럽게 올라가려면 'smooth', 즉시 올라가려면 'auto'
      });

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
        {/* 지원 기간 안내 섹션 - PC/모바일 공용*/} 
        <div className="recruit-closed-overlay">
          <div className="closed-content">
            <div className="closed-icon">
              <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="Logo" className="closed-logo-anim" />
            </div>
            <h2 className="closed-title">현재는 모집 기간이 아닙니다</h2>
            <p className="closed-desc">
              SHA에 관심을 가져주셔서 감사합니다. <br />
              다음 모집기간에 다시 만나요!
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

                <br /> 문의사항<br/>조재희 010-2397-4021<br/>박정빈 010-5969-7249
              </p></div>
          </div>

          {/* 추가: 모바일 FAQ 플로팅 버튼 */}
          <div className="mobile-faq-btn" style={{zIndex: 1}}
           onClick={() => setIsFaqOpen(true)}>
            <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="FAQ" className="mobile-faq-icon" />
            <span>FAQ</span>
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
                            {renderFaqAnswer(item)}
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

        <div className="mobile-recruit-sheet">
          <div className="mobile-fillout">
            <p>Fill out the form to become a member</p>
          </div>
          <div className="mobile-line2"></div>
          <div className="mobile-form-wrapper">
            {!isRecruitOpen && (
              <div className="form-closed-overlay">
                <div className="form-closed-text">Recruit 기간 : 2/23 (월) ~  3/8(일)</div>
              </div>
            )}


            <div className={`mobile-scroll-box ${!isRecruitOpen ? "form-disabled" : ""}`}>
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
                {/* 항목 1: 관심분야 */}
                <div className="mobile-recruit-row">
                  <div className="mobile-name2">관심분야</div>
                  <div className="mobile-checkbox-group">
                    {['Web', 'system', 'reversing', 'forensic', 'crypto', '그 외'].map(f => (
                      <label key={f} className="mobile-check-label">
                        <input type="checkbox" checked={formData.interests.includes(f)}
                          onChange={() => handleCheckboxChange('interests', f)} />
                        <span className="custom-checkbox"></span>{f}
                      </label>
                    ))}
                    {/* '그 외' 선택 시 나타나는 입력창 */}
                    {formData.interests.includes('그 외') && (
                      <input
                        type="text"
                        className="mobile-etc-input"
                        placeholder="직접 입력"
                        value={formData.interestEtc}
                        onChange={(e) => handleInputChange('interestEtc', e.target.value)}
                      />
                    )}
                  </div>
                </div>

                {/* 항목 2: 팀 선택 (수정됨) */}
                <div className="mobile-recruit-row">
                  <div className="mobile-name2">팀 선택 (복수 가능)</div>
                  <div className="mobile-checkbox-group"> {/* 클래스명 통일 */}
                    {['CTF팀', '개발팀', '학술팀', '추후선택'].map(f => (
                      <label key={f} className="mobile-check-label">
                        <input
                          type="checkbox"
                          checked={formData.team.includes(f)}
                          onChange={() => handleCheckboxChange('team', f)}
                        />
                        <span className="custom-checkbox"></span> {f}
                      </label>
                    ))}
                  </div>
                  {/* 모바일 팀 설명 컨테이너 추가 */}
                  <div className="mobile-recruit-desc-container">
                    {formData.team.includes('CTF팀') && <p className="mobile-desc color-green"><strong>CTF:</strong> 자율 학습 기반 CTF 참가 팀</p>}
                    {formData.team.includes('개발팀') && <p className="mobile-desc color-green"><strong>개발:</strong> 목표 기반 프로젝트 개발 팀</p>}
                    {formData.team.includes('학술팀') && <p className="mobile-desc color-green"><strong>학술:</strong> 보안 논문 및 자료 공유 팀</p>}
                  </div>
                </div>

                {/* 항목 3: 세미나 참여 */}
                <div className="mobile-recruit-row">
                  <div className="mobile-name2">신규부원 5주 세미나<br/>(화요일 19시)</div>
                  <div className="mobile-radio-group">
                    {['가능', '불가능'].map(f => (
                      <label key={f} className="mobile-check-label">
                        <input type="radio" name="mobile-seminar" checked={formData.seminarAvailable === f}
                          onChange={() => handleInputChange('seminarAvailable', f)} />
                        <span className="custom-radio"></span> {f}
                      </label>
                    ))}
                  </div>
                  {/* 모바일 세미나 설명 */}
                  {/*{formData.seminarAvailable === '가능' && <p className="mobile-desc color-green">이후 스터디에서 다룰 내용의 기초를 익히는 세미나로, 참여를 권장드립니다.</p>} */}
                  {formData.seminarAvailable === '불가능' && <p className="mobile-desc color-green">이후 스터디에서 다룰 내용의 기초를 익히는 세미나로, 참여를 권장드립니다.</p>}
                </div>

                {/* 항목 4: 본인 소개 */}
                <div className="mobile-recruit-row">
                  <div className="mobile-name2">본인 소개</div>
                  <textarea className="mobile-input-short" placeholder="본인을 한 줄로 소개해주세요"
                    value={formData.selfIntro} onChange={(e) => handleInputChange('selfIntro', e.target.value)} />
                  <p className="mobile-desc">홈페이지 멤버 탭 프로필에 들어갈 한 줄 소개를 작성해 주세요.</p>
                </div>

                {/* 항목 5: 기대하는 바 */}
                <div className="mobile-recruit-row">
                  <div className="mobile-name2">소모임에 기대하는 바</div>
                  <textarea className="mobile-input2" value={formData.expectation}
                    onChange={(e) => handleInputChange('expectation', e.target.value)} />
                </div>

                {/* 항목 6: 다짐 */}
                <div className="mobile-recruit-row">
                  <div className="mobile-name2">다짐 한마디</div>
                  <textarea className="mobile-input2" value={formData.promise}
                    onChange={(e) => handleInputChange('promise', e.target.value)} />
                </div>
              </div>
              <div className="mobile-line4"></div>
              <div className="mobile-link-box">
                <div className="mobile-label-box3">
                  <div className="mobile-name3">기술블로그(선택)</div>
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
              다음 모집 기간에 다시 만나요!
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
              <p>
                정보보안에 관심 있는 모든 분들을 환영합니다. <br />
                함께 배우고 고민하며 성장하는 정보 보안 소모임 SHA에서 여러분의 열정을 펼쳐보세요.
                다양한 주제를 다루며 서로의 지식을 나누고, 협력하는 즐거움을 경험할 수 있습니다.<br />
                지금, 새로운 도전과 배움의 시작에 함께하세요! <br />
                <br />문의사항<br/>조재희 010-2397-4021<br/>박정빈 010-5969-7249</p></div>
          </div>
          <div className="faq-floating-btn" style={{ borderRadius: '50%' }} onClick={() => setIsFaqOpen(true)}>
            <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="FAQ" className="pc-faq-icon" />
            <p>FAQ</p>
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
                            {renderFaqAnswer(item)}
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
          <div className="fillout" style={{zIndex: 1}}>
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
              {/* 항목 1: 관심분야 (컴퓨터 버전) */}
              <div className="recruit-row">
                <label className="name2">관심분야</label>
                {/* flex-wrap 처리를 위해 wrapper 클래스 사용 */}
                <div className="checkbox-group-container">
                  <div className="checkbox-group">
                    {['Web', 'system', 'reversing', 'forensic', 'crypto', '그 외'].map(f => (
                      <label key={f} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(f)}
                          onChange={() => handleCheckboxChange('interests', f)}
                        />
                        <span className="custom-checkbox"></span> {f}
                      </label>
                    ))}
                  </div>

                  {/* '그 외' 선택 시 나타나는 입력창 - 아래쪽으로 배치 */}
                  {formData.interests.includes('그 외') && (
                    <div className="etc-input-wrapper">
                      <input
                        type="text"
                        className="etc-input"
                        placeholder="분야를 직접 입력해 주세요"
                        value={formData.interestEtc}
                        onChange={(e) => handleInputChange('interestEtc', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 항목 2: 팀 선택 */}
              <div className="recruit-row">
                <label className="name2" style={{ justifyContent: 'flex-start' }}>팀 선택 (복수 가능)</label>
                <div className="input-with-desc">
                  <div className="checkbox-group">
                    {['CTF팀', '개발팀', '학술팀', '추후선택'].map(f => (
                      <label key={f} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.team.includes(f)}
                          onChange={() => handleCheckboxChange('team', f)}
                        />
                        <span className="custom-checkbox"></span>
                        <span className="checkbox-text">{f}</span>
                      </label>
                    ))}
                  </div>

                  {/* 팀 설명: 선택된 모든 팀의 설명이 순서대로 나오도록 수정 */}
                  <div className="recruit-desc-container">
                    {formData.team.includes('CTF팀') && <p className="recruit-desc"><strong>CTF TEAM:</strong> 자율 학습을 기반으로 CTF 참가 경험을 쌓는 팀</p>}
                    {formData.team.includes('개발팀') && <p className="recruit-desc"><strong>개발 TEAM:</strong> 목표 기반 프로젝트를 개발하며 실전 역량을 키우는 팀</p>}
                    {formData.team.includes('학술팀') && <p className="recruit-desc"><strong>학술 TEAM:</strong> 보안 관련 논문 및 자료를 공유하며 학술적 성장을 도모하는 팀</p>}
                  </div>
                </div>
              </div>


              {/* 항목 3: 세미나 참여 */}
              <div className="recruit-row">
                <label className="name2">신규부원 5주 세미나<br/>(화요일 19시)</label>
                <div className="input-with-desc">
                  <div className="checkbox-group">
                    {['가능', '불가능'].map(f => (
                      <label key={f}>
                        <input type="radio" name="seminar" checked={formData.seminarAvailable === f}
                          onChange={() => handleInputChange('seminarAvailable', f)} />
                        <span className="custom-radio"></span> {f}
                      </label>
                    ))}
                  </div>
                  {/* 세미나 참여 여부에 따른 동적 문구 */}
                  {formData.seminarAvailable === '불가능' && <p className="recruit-desc">이후 스터디에서 다룰 내용의 기초를 익히는 세미나로, 참여를 권장드립니다.</p>}
                </div>
              </div>

              {/* 항목 4: 본인 소개 */}
              <div className="recruit-row-vertical">
                <label className="name2">본인 한 줄 소개</label>
                <div className="input-with-desc">
                  <textarea className="input2-1" value={formData.selfIntro}
                    onChange={(e) => handleInputChange('selfIntro', e.target.value)} />
                  <p className="recruit-desc">홈페이지 멤버 탭 프로필에 들어갈 한 줄 소개를 작성해주세요</p>
                </div>
              </div>

              {/* 항목 5: 기대하는 바 (여러 줄) */}
              <div className="recruit-row-vertical">
                <label className="name2-1">소모임에 <br /> 기대하는 바</label>
                <textarea className="input2" value={formData.expectation}
                  onChange={(e) => handleInputChange('expectation', e.target.value)} />
              </div>

              {/* 항목 6: 다짐 (여러 줄) */}
              <div className="recruit-row-vertical">
                <label className="name2">다짐 한마디</label>
                <textarea className="input2" value={formData.promise}
                  onChange={(e) => handleInputChange('promise', e.target.value)} />
              </div>
            </div>
            <div className="line4"></div>

            <div className="link-box">
              <div className="label-box3">
                <div className="name3" style={{ width: '120px' }}>기술블로그 (선택)</div>
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
              <button className="jiwon" onClick={handleSubmit}>지원하기</button>
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
