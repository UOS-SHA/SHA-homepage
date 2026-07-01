# SHA Homepage

서울시립대학교 정보보안 소모임 SHA의 공식 홈페이지입니다. 소모임 소개, 주요 활동, 스터디 커리큘럼, 부원 소개, 신입 부원 모집 신청, 관리자 페이지를 제공합니다.

## 주요 기능

- SHA 소개 및 활동/성과 소개
- 학기별 스터디 카테고리와 주차별 계획 조회
- 부원 프로필 조회
- 신입 부원 모집 신청서 제출
- 스터디 학기/카테고리/주차 관리
- 지원자 목록 조회 및 엑셀 다운로드

## 기술 스택

### Frontend

- React

### Backend

- Node.js
- MySQL
- JWT
- Docker Compose

## 프로젝트 구조

```text
SHA-homepage/
├── frontend/          # React 클라이언트
├── backend/           # Express API 서버
│   ├── controllers/   # API 로직
│   ├── models/        # Sequelize 모델
│   └── routes/        # API 라우터
└── README.md
```

## 환경 변수

### Frontend

`frontend/.env`

```env
REACT_APP_SERVER_URL=http://localhost:8080
```

### Backend

`backend/.env`

```env
DB_USERNAME=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_HOST=db
PORT=8080
ADMIN_ID=your_admin_id
ADMIN_PW=your_admin_password
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

> `NODE_ENV=development` 또는 `NODE_ENV=test`로 실행하면 서버 시작 시 DB가 초기화될 수 있습니다. 운영 환경에서는 `NODE_ENV=production`을 사용하세요.

## 로컬 실행

### 1. 백엔드 실행

Docker Compose를 사용하는 방식입니다.

```bash
cd backend
docker compose up -d --build
```

백엔드 서버는 기본적으로 `http://localhost:8080`에서 실행됩니다.

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm start
```

프론트엔드는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## API

주요 API 그룹은 다음과 같습니다.

- `/study`: 스터디 학기, 카테고리, 주차별 계획 조회
- `/members`: 부원 정보 조회
- `/recruit`: 모집 지원서 제출
- `/admin`: 관리자 로그인 및 관리자 기능

## 운영 참고사항

- 관리자 API는 JWT 기반 인증을 사용합니다.
- MySQL 데이터는 Docker volume(`mysql_data`)에 저장됩니다.
- 운영 환경에서 `.env` 파일은 저장소에 커밋하지 마세요.
