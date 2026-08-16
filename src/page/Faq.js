import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Recruit.css';
import './FAQ.css';

// 모집을 시작할 때 구글폼 URL을 입력하세요. 빈 문자열이면 버튼이 보이지 않습니다.
const GOOGLE_FORM_URL = '';

const faqData = [
  {
    category: '1. 가입 및 자격 요건',
    questions: [
      {
        q: '초보자도 참여할 수 있나요?',
        a: '네, 열정만 있다면 충분히 가능합니다! SHA는 현재 실력보다 배우고자 하는 의지를 더 중요하게 생각합니다. Python이나 C를 미리 학습해 온다면 활동에 적응하는 데 도움이 될 수 있어 사전 학습을 권장드립니다.',
      },
      {
        q: '새로운 부원 모집은 어떻게 안내되나요?',
        a: '새로운 부원 모집을 시작하면 이 FAQ 페이지 상단에 구글폼 지원 링크가 표시됩니다.',
      },
      {
        q: '면담은 어떻게 진행되나요?',
        a: '면담은 온라인 또는 오프라인으로 진행되며, 지원자의 능력을 평가하고 합격/불합격을 결정하는 시간이 아닌 상호소통을 위한 시간입니다.',
      },
    ],
  },
  {
    category: '2. 활동 및 스터디 관련',
    questions: [
      {
        q: '구체적으로 어떤 공부나 프로젝트를 진행하나요?',
        a: '2026년도 SHA는 팀 단위로 활동합니다. CTF팀, 버그바운티팀, 암호동아리 팀으로 나뉘어 각 팀의 주제에 맞는 심화 학습과 프로젝트를 진행합니다. 자세한 내용은 첨부된 노션 링크를 참고해주세요!',
      },
      {
        q: '신규 부원 5주 세미나는 무엇인가요?',
        a: '보안 공부를 처음 시작하는 신규 부원들을 위해 준비한 분야별 입문 세미나입니다. 4주 동안 다양한 보안 분야를 실습 중심으로 경험하고, 5주차 주말에는 마이크로 CTF를 통해 그동안의 학습 내용을 재미있게 점검합니다.',
      },
    ],
  },
  {
    category: '3. 운영 및 회비',
    questions: [
      {
        q: '회비는 얼마이며, 어디에 사용되나요?',
        a: '학기당 2만 원의 회비를 걷고 있으며, 공간 대관료, 행사비 등 소모임 운영에 사용합니다. 사용 내역은 투명하게 공유합니다.',
      },
    ],
  },
  {
    category: '4. 친목 및 분위기',
    questions: [
      {
        q: 'SHA 분위기는 어떤가요?',
        a: 'SHA는 자율적으로 공부하되 결과물을 함께 리뷰하고 공유하는 문화가 있습니다. 초보자가 질문하기 편하고, 선배와 동료가 방향을 잡아주는 분위기를 지향합니다.',
      },
    ],
  },
];

const navigation = [
  { to: '/', label: 'HOME', end: true },
  { to: '/members', label: 'MEMBER' },
  { to: '/study', label: 'STUDY' },
  { to: '/faq', label: 'FAQ' },
];

const NavigationLinks = () => (
  <>
    {navigation.map(({ to, label, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        className={({ isActive }) => (
          isActive ? 'nav-link active-link' : 'nav-link'
        )}
      >
        {label}
      </NavLink>
    ))}
  </>
);

const FaqList = ({ activeFaq, onToggle }) => (
  <div className="faq-page-list">
    {GOOGLE_FORM_URL && (
      <a
        className="faq-google-form-link"
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        구글폼 지원서 열기
      </a>
    )}
    {faqData.map((section, sectionIndex) => (
      <section key={section.category} className="faq-section">
        <h2 className="faq-category">{section.category}</h2>
        {section.questions.map((item, questionIndex) => {
          const itemId = `${sectionIndex}-${questionIndex}`;
          const isOpen = activeFaq === itemId;

          return (
            <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => onToggle(itemId)}
              >
                <span>Q. {item.q}</span>
                <img
                  src={`${process.env.PUBLIC_URL}/right.png`}
                  className={`faq-arrow ${isOpen ? 'rotated' : ''}`}
                  alt=""
                />
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
                {item.linkUrl && (
                  <a
                    className="faq-answer-link"
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.linkText}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </section>
    ))}
  </div>
);

const Faq = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (itemId) => {
    setActiveFaq((current) => current === itemId ? null : itemId);
  };

  return (
    <div className="wholearea">
      <div className="top-bar">
        <Link to="/" className="logo-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/sha-logo.png`}
            alt="SHA"
            className="logobox"
          />
        </Link>
        <div className="nav-content">
          {navigation.map(({ to, label, end }) => (
            <div className="menu" key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => (
                  isActive ? 'nav-link active-link' : 'nav-link'
                )}
              >
                {label}
              </NavLink>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mobile-menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/menubar.png`}
            alt="메뉴 열기"
            className="menubar"
          />
        </button>
        {isMenuOpen && (
          <div className="mobile-menu-content">
            <button
              type="button"
              className="close-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/close2.png`}
                alt="메뉴 닫기"
                className="close-icon"
              />
            </button>
            <div className="mobile-nav-content">
              <NavigationLinks />
            </div>
          </div>
        )}
      </div>

      <div className="mobile-recruit-container">
        <div className="mobile-JoinUs">
          <div className="mobile-word-box">
            <div className="mobile-title">FAQ</div>
            <div className="mobile-info">
              <p>SHA 활동에 관해 자주 묻는 질문을 모았습니다.</p>
              <p>
                추가 문의<br />
                회장 박정빈 010-5969-7249<br/>
                부회장 한건우 010-5602-9643
              </p>
            </div>
          </div>
        </div>
        <main className="mobile-faq-page">
          <FaqList activeFaq={activeFaq} onToggle={toggleFaq} />
        </main>
      </div>

      <div className="recruit-container">
        <div className="JoinUs">
          <div className="word-box">
            <div className="title">FAQ</div>
            <div className="info">
              <p>
                SHA 활동에 관해 자주 묻는 질문을 모았습니다.<br />
                궁금한 항목을 눌러 답변을 확인해 주세요.
              </p>
              <p>
                추가 문의<br />
                회장 박정빈 010-5969-7249<br/>
                부회장 한건우 010-5602-9643
              </p>
            </div>
          </div>
        </div>
        <div className="line" />
        <main className="recruit-sheet faq-sheet">
          <div className="fillout">
            <p>FREQUENTLY ASKED QUESTIONS</p>
          </div>
          <div className="line2" />
          <div className="faq-page-scroll">
            <FaqList activeFaq={activeFaq} onToggle={toggleFaq} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Faq;
