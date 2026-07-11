# SHA Homepage (Static Frontend)

서울시립대학교 정보보안 소모임 SHA 홈페이지의 정적 프론트엔드 버전입니다.

이 프로젝트는 GitHub Pages에서 별도 서버 없이 동작합니다. 기존 프로젝트의 공개 API 데이터를 2026-07-11 기준으로 옮겼으며, 관리자 페이지와 자체 지원서 접수 기능은 포함하지 않습니다.

## 포함된 화면

- 홈
- 멤버 소개
- 학기별 스터디 기록
- FAQ
- 추후 연결할 구글폼 링크

## 데이터 수정

모든 공개 콘텐츠는 프론트 코드에서 관리합니다.

- 멤버: `src/data/members.js`
- 스터디 학기·분야·주차: `src/data/studies.js`
- FAQ: `src/page/Faq.js`의 `faqData`
- 구글폼: `src/page/Faq.js`의 `GOOGLE_FORM_URL`

구글폼을 연결하려면 다음 상수에 전체 URL을 입력합니다.

```js
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/...';
```

빈 문자열이면 지원 버튼은 표시되지 않고 FAQ만 보입니다.

## 실행

```bash
npm install
npm start
```

프로덕션 빌드는 다음과 같습니다.

```bash
npm run build
```

## 배포

현재 `package.json`의 `homepage`는 기존 배포 주소인
`https://uos-sha.github.io/SHA-homepage`로 설정되어 있습니다.

```bash
npm run deploy
```

다른 GitHub Pages 저장소에 배포하려면 먼저 `homepage` 값을 새 저장소 주소로 바꿔야 합니다.

## 운영 방식

멤버·스터디 내용은 데이터 파일을 수정하고 Git에 커밋한 뒤 다시 배포합니다. 브라우저에 관리자 비밀번호나 토큰을 넣지 않으며, 지원서 개인정보는 이 저장소나 브라우저 저장소에 보관하지 않습니다.

