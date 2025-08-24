const { sequelize, StudySemester, StudyCategory, StudyWeek } = require('./models');

async function seed() {
  try {
    // 데이터베이스 연결 확인
    await sequelize.authenticate();
    console.log('DB 연결 성공');

    
  // 모델 정의와 실제 DB 스키마 동기화 (컬럼 자동 추가/수정)
  await sequelize.sync({ alter: true });
  console.log('DB 스키마 동기화 완료');

    // 특정 테이블 데이터만 초기화
    // StudyWeek -> StudyCategory -> StudySemester 순서로 삭제 (외래 키 관계 때문)
    console.log('시드할 테이블 데이터 초기화 중...');
    await StudyWeek.destroy({ truncate: { cascade: true }, restartIdentity: true });
    await StudyCategory.destroy({ truncate: { cascade: true }, restartIdentity: true });
    await StudySemester.destroy({ truncate: { cascade: true }, restartIdentity: true });
    console.log('시드 테이블 초기화 완료');

    // 1. 학기 3개 생성
    const semesters = await Promise.all([
      StudySemester.create({ name: '2025-1' }),
      StudySemester.create({ name: '2025-2' }),
      StudySemester.create({ name: '2026-1' }),
    ]);

    // 2. 2025-1 학기에만 카테고리와 주차별 내용 넣기
    const semester2025_1 = semesters.find(s => s.name === '2025-1');

    const webCategory = await StudyCategory.create({
      name: 'web',
      comment: `Web 스터디는 웹 서비스에 존재하는 다양한 보안 이슈를 주제로 진행됩니다. 
        매주 팀원이 번갈아가며 취약점을 조사하고 발표하며, 실습과 토론을 통해 이해를 넓혀갑니다.
        이를 통해 웹 보안의 기본 원리부터 최신 동향까지 폭넓게 탐구하며, 함께 배우고 성장하는 시간을 만들어 갑니다.`,
      semesterId: semester2025_1.id,
    });
    const reversingCategory = await StudyCategory.create({
      name: 'reversing',
      comment: `Reversing 스터디는 매주 한 명의 진행자가 주제를 정리하고 발표하는 방식으로 진행됩니다.
        다양한 프로그램과 파일을 분석하며 동작 원리를 배우고, 실습을 통해 직접 확인하면서 리버싱에 대한 이해를 쌓아가는 시간입니다.`,
      semesterId: semester2025_1.id,
    });
    const systemCategory = await StudyCategory.create({
      name: 'system',
      comment: `Pwnable 스터디는 팀원들이 번갈아가며 주제를 조사하고 발표하는 방식으로 진행되었습니다.
        모두 처음 접하는 내용이었지만, 서로 의견을 공유하고 토론하며 이해를 넓히고 소통의 장을 만들어갔습니다.  
        셸코드, 버퍼 오버플로, 힙 문제 등 다양한 주제를 함께 학습하며 실습을 통해 직접 확인했습니다.`,
      semesterId: semester2025_1.id,
    });

    /*

    // 3. 주차별 내용 bulkCreate
    await StudyWeek.bulkCreate([
      // web
      {
        weekNum: 1,
        title: 'Python flask 관련 취약점',
        description: `Flask debugger PIN Exploit
Python Dirty Arbitrary File Write(AFW)`,
        categoryId: webCategory.id,
      },
      {
        weekNum: 2,
        title: 'WEB3 Exploit, HTTP request smuggling',
        description: `Gmx exploit
Flashloan
HTTP request smuggling`,
        categoryId: webCategory.id,
      },
      {
        weekNum: 3,
        title: 'Prototype pollution, Is HTTPS really safe?',
        description: `Prototype pollution
TLS poisoning with SSRF → SSRF + DNS rebinding + TLS session ID poisoning`,
        categoryId: webCategory.id,
      },
      {
        weekNum: 4,
        title: 'Cache',
        description: `Cache Poisoning
Cache Deception`,
        categoryId: webCategory.id,
      },

      // reversing
      {
        weekNum: 1,
        title: '특이한 바이너리',
        description: `python으로 작성된 실행 파일 reversing`,
        categoryId: reversingCategory.id,
      },
      {
        weekNum: 2,
        title: 'Python Z3 module',
        description: `How to use Z3?
Let’s practice with Z3!`,
        categoryId: reversingCategory.id,
      },
      {
        weekNum: 3,
        title: 'Go (Programming language)',
        description: `What is Golang?
Reversing Golang ELF file`,
        categoryId: reversingCategory.id,
      },
      {
        weekNum: 4,
        title: '안티 디버깅',
        description: `안티 디버깅 : static vs dynamic
안티 디버깅 in window, linux`,
        categoryId: reversingCategory.id,
      },

      // system
      {
        weekNum: 1,
        title: 'Shellcode, BOF',
        description: `셸코드(Shellcode)
함수 호출 규약(Calling Convention)
Stack Buffer Overflow`,
        categoryId: systemCategory.id,
      },
      {
        weekNum: 2,
        title: '스택 버퍼 오버플로 방지 기법',
        description: `Stack Canary
NX & ASLR
ROP attack
Space Alone 1,2`,
        categoryId: systemCategory.id,
      },
      {
        weekNum: 3,
        title: '보호 기법, Command Injection(1)',
        description: `PIE & RELRO 
Out-of-Bounds (OOB)
Command Injection - C Language
Space Alone 3,4,5`,
        categoryId: systemCategory.id,
      },
      {
        weekNum: 4,
        title: 'UAF, Double Free Bug',
        description: `Use-After-Free(UAF) 
Double Free Bug
Space Alone 6,7`,
        categoryId: systemCategory.id,
      },
    ]);

    */

    console.log('초기 데이터 삽입 완료');
    process.exit(0);
  } catch (error) {
    console.error('초기 데이터 삽입 실패:', error);
    process.exit(1);
  }
}

seed();