// Snapshot of the study data publicly served by uos-sha.site on 2026-07-11.
// Edit this array and redeploy when the curriculum changes.
export const studies = [
  {
    "id": 6,
    "name": "2025-겨울방학",
    "categories": [
      {
        "id": 22,
        "name": "25-겨울 : Cryptography",
        "comment": "Cryptography(암호학)는 정보를 안전하게 보호하기 위해 데이터를 암호화하고 복호화하는 기술입니다.\n본 세션은 암호 알고리즘의 원리와 구조를 이해하고, 실제 암호화 방식의 동작을 분석하는 세션입니다.\n대칭키·공개키 암호, 해시, 서명 기법을 통해 보안 시스템의 핵심 개념을 학습합니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "정수론, RSA 맛보기",
            "description": "1. 유클리드 알고리즘, 중국인의 나머지 정리\n2. 툴 소개(sage, pwntools)\n3. RSA 원리"
          },
          {
            "weekNum": 2,
            "title": "대칭키(AES), 운영모드/AEAD",
            "description": "1. AES 과정\n2. 운영 모드\n3. padding"
          },
          {
            "weekNum": 3,
            "title": "공개키(RSA), ECC(ECDH, ECDSA)",
            "description": "1. RSA, RSA-CRT\n2. common modulus attack, 작은 e에 대한 공격\n3. ECC 기초"
          },
          {
            "weekNum": 4,
            "title": "ECC(ECDH/ECDSA) (2)",
            "description": "1. ECC 작동 방식\n2. ECC 장점"
          }
        ]
      },
      {
        "id": 23,
        "name": "25-겨울 : Malware Analysis",
        "comment": "Malware Analysis(악성코드 분석)는 악성 프로그램의 동작과 목적을 분석하여 위협을 이해하고 대응하는 보안 기술입니다.\n본 세션은 실제 랜섬웨어 샘플을 기반으로 정적·동적 분석 기법을 학습하며 악성코드의 내부 동작을 파악하는 세션입니다.\n분석 도구 활용과 메모리·바이너리 분석을 통해 실전 위협 대응 역량을 기릅니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "OT & 분석 환경 구축",
            "description": "1. 랜섬웨어 최신 동향\n2. 분석 환경 설정 및 도구 소개\n3. 랜섬웨어 샘플 구하는 법"
          },
          {
            "weekNum": 2,
            "title": "정적분석",
            "description": "1. 정적 분석 이란\n2. CAPA Plugin\n3. Nitrogen 정적 분석"
          },
          {
            "weekNum": 3,
            "title": "정적분석(2)",
            "description": "1. Donut 정적분석 with dnSpy\n2. Donut 메모리 덤프 분석"
          },
          {
            "weekNum": 4,
            "title": "랜섬웨어 동작 이해",
            "description": "1. 랜섬웨어 동작 이해\n2. 퀴즈"
          },
          {
            "weekNum": 5,
            "title": "암호화 메커니즘 분석",
            "description": "1. 암호학 기초\n2. 랜섬웨어 암호화 워크플로우\n3. 최신 심화 기법\n4. 분석 및 대응"
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "name": "2025-2학기",
    "categories": [
      {
        "id": 19,
        "name": "25-2 : Web Hacking",
        "comment": "웹 해킹은 웹사이트나 웹 서비스의 구조와 동작을 분석해서,\n보안 취약점을 찾아 공격하거나 방어하는 기술 분야입니다.\n본 세션은 웹사이트가 어떻게 해킹되는지, 그리고 어떻게 막는지를 직접 실습하며 배우는 세션입니다.\n기초부터 실습 문제와 실제 취약점 분석까지 단계적으로 경험할 수 있습니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "web basic",
            "description": "1. 컴퓨터 네트워크"
          },
          {
            "weekNum": 2,
            "title": "xss",
            "description": "1. background\n2. xss"
          },
          {
            "weekNum": 3,
            "title": "request forgery",
            "description": "1. CSRF (Client-Side Request Forgery)\n2. SSRF (Server-Side Request Forgery)"
          },
          {
            "weekNum": 4,
            "title": "SQL Injection",
            "description": "1. SQL\n2. SQLi technique"
          },
          {
            "weekNum": 5,
            "title": "command injection",
            "description": "1. linux base\n2. wehshell"
          },
          {
            "weekNum": 6,
            "title": "CSS Injection",
            "description": "1. css\n2. css injection"
          },
          {
            "weekNum": 7,
            "title": "Cache",
            "description": "1. what is cache?"
          },
          {
            "weekNum": 8,
            "title": "Is HTTPS really safe?",
            "description": "1. DNS rebinding\n2. TLS poisoning"
          }
        ]
      },
      {
        "id": 20,
        "name": "25-2 : Reverse Engineering",
        "comment": "Reverse Engineering(역공학)은 이미 만들어진 프로그램을 분해해서 내부 동작을 분석하는 기술입니다.\n본 세션은 실행 파일을 분석해 프로그램의 내부 동작과 보안 구조를 이해하는 세션입니다.\n어셈블리, 디버깅, 바이너리 분석을 통해 취약점 분석 능력을 기릅니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "생소한 바이너리, Z3",
            "description": "1. 생소한 바이너리\n2. z3 소개 및 실습"
          },
          {
            "weekNum": 2,
            "title": "1학기 복습",
            "description": "1. background\n2. pwngdb"
          },
          {
            "weekNum": 3,
            "title": "안티디버깅",
            "description": "1. ptrace"
          },
          {
            "weekNum": 4,
            "title": "gdb script",
            "description": "1. minesweeper"
          },
          {
            "weekNum": 5,
            "title": "주간해킹 리뷰",
            "description": "1. 주간해킹 1번\n2. 주간해킹 2번\n3. 주간해킹 3번"
          },
          {
            "weekNum": 6,
            "title": "주간해킹 리뷰(2)",
            "description": "1. 주간해킹 4번"
          },
          {
            "weekNum": 7,
            "title": "passcode",
            "description": "1. passscode 문제풀이"
          }
        ]
      },
      {
        "id": 21,
        "name": "25-2 : System Hacking",
        "comment": "System Hacking 은 운영체제와 서버 환경의 구조를 분석하여 취약점을 찾아내고 공격·방어하는 기술입니다.\n본 세션은 리눅스 및 서버 환경을 기반으로 시스템 내부 동작과 보안 메커니즘을 이해하는 세션입니다.\n메모리 취약점, 권한 상승, 프로세스 제어 기법을 통해 실전 시스템 보안 역량을 기릅니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "how2heap",
            "description": "1. how2heap 소개\n2. tcache"
          },
          {
            "weekNum": 2,
            "title": "how2heap(2)",
            "description": "1. fastbin in glibc 2.41"
          },
          {
            "weekNum": 3,
            "title": "how2heap(3)",
            "description": "1. unsafe unlink in glibc 2.41"
          },
          {
            "weekNum": 4,
            "title": "how2heap(4)",
            "description": "1. house of spirit in glibc 2.41\n2. poison null bytes in glibc 2.41"
          },
          {
            "weekNum": 5,
            "title": "how2heap(5)",
            "description": "1. house of lore in glibc 2.41\n2. overlapping chunks in glibc 2.41"
          },
          {
            "weekNum": 6,
            "title": "how2heap(6)",
            "description": "1. mmap overlapping chunks in glibc 2.41\n2. largebin attack in glibc 2.41"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "name": "2025-여름방학",
    "categories": [
      {
        "id": 16,
        "name": "25-여름 : Web Hacking",
        "comment": "웹 해킹은 웹사이트나 웹 서비스의 구조와 동작을 분석해서,\n보안 취약점을 찾아 공격하거나 방어하는 기술 분야입니다.\n본 세션은 웹사이트가 어떻게 해킹되는지, 그리고 어떻게 막는지를 직접 실습하며 배우는 세션입니다.\n기초부터 실습 문제와 실제 취약점 분석까지 단계적으로 경험할 수 있습니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "Python Flask 관련 취약점",
            "description": "1. Flask debugger PIN Exploit\n2. Python Dirty Arbitrary File Write(AFW)"
          },
          {
            "weekNum": 2,
            "title": "WEB3 Exploit, HTTP request smuggling",
            "description": "1. Gmx emploit\n2. Flashloan\n3. HTTP request smuggling"
          },
          {
            "weekNum": 3,
            "title": "Prototype pollution, Is HTTPS really safe?",
            "description": "1. Prototype pollution\n2. TLS poisoning with SSRF → SSRF + DNS rebinding + TLS session ID poisoning"
          },
          {
            "weekNum": 4,
            "title": "Cache",
            "description": "1. Cache Poisoning\n2. Cache Deception"
          },
          {
            "weekNum": 5,
            "title": "CSS Injection",
            "description": "1. CSS Injection\n2. Practice"
          },
          {
            "weekNum": 6,
            "title": "Python Module : PICKLE",
            "description": "1. Pickle - dumps, loads, dump, load\n2. Pickle in mongodb, file\n3. Vulnerability in Pickle"
          },
          {
            "weekNum": 7,
            "title": "CSP",
            "description": "1. CSP\n2. CSP Bypass\n3. Practice"
          }
        ]
      },
      {
        "id": 17,
        "name": "25-여름 : Reverse Engineering",
        "comment": "Reverse Engineering(역공학)은 이미 만들어진 프로그램을 분해해서 내부 동작을 분석하는 기술입니다.\n본 세션은 실행 파일을 분석해 프로그램의 내부 동작과 보안 구조를 이해하는 세션입니다.\n어셈블리, 디버깅, 바이너리 분석을 통해 취약점 분석 능력을 기릅니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "특이한 바이너리",
            "description": "1. python으로 작성된 실행 파일 reversing"
          },
          {
            "weekNum": 2,
            "title": "Python Z3 module",
            "description": "1. How to use Z3?\n2. Let’s practice with Z3!"
          },
          {
            "weekNum": 3,
            "title": "Go (Programming language)",
            "description": "1. What is Golang?\n2. Reversing Golang ELF file"
          },
          {
            "weekNum": 4,
            "title": "안티 디버깅",
            "description": "1. 안티 디버깅 : static vs dynamic\n2. 안티 디버깅 in window, linux"
          },
          {
            "weekNum": 5,
            "title": "Faker’s matrix",
            "description": "1. 안티 디버깅 복습\n2. patch"
          },
          {
            "weekNum": 6,
            "title": "Windbg",
            "description": "1. windbg를 이용하는 cce 예선 문제\n2. golang 문제 풀이"
          },
          {
            "weekNum": 7,
            "title": "WASM",
            "description": "1. 기초분석\n2. 함수해석\n3. 결론"
          }
        ]
      },
      {
        "id": 18,
        "name": "25-여름 : System Hacking",
        "comment": "System Hacking 은 운영체제와 서버 환경의 구조를 분석하여 취약점을 찾아내고 공격·방어하는 기술입니다.\n본 세션은 리눅스 및 서버 환경을 기반으로 시스템 내부 동작과 보안 메커니즘을 이해하는 세션입니다.\n메모리 취약점, 권한 상승, 프로세스 제어 기법을 통해 실전 시스템 보안 역량을 기릅니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "Shellcode, BOF",
            "description": "1. 셸코드(Shellcode)\n2. 함수 호출 규약(Calling Convention)\n3. Stack Buffer Overflow"
          },
          {
            "weekNum": 2,
            "title": "스택 버퍼 오버플로 방지 기법",
            "description": "1. Stack Canary\n2. NX & ASLR\n3. ROP attack\n4. Space Alone 1,2"
          },
          {
            "weekNum": 3,
            "title": "보호 기법, Command Injection",
            "description": "1. PIE & RELRO\n2. Out-of-Bounds (OOB)\n3. Command Injection - C Language\n4. Space Alone 3,4,5"
          },
          {
            "weekNum": 4,
            "title": "UAF, Double Free Bug",
            "description": "1. Use-After-Free(UAF)\n2. Double Free Bug\n3. Space Alone 6,7"
          },
          {
            "weekNum": 5,
            "title": "FSB, heap 관련 문제 풀이, Type Error",
            "description": "1. Format String Bug\n2. [pwnable.tw](http://pwnable.tw) 문제 풀이\n3. Type Error - C Language"
          },
          {
            "weekNum": 6,
            "title": "SECCOMP",
            "description": "1. SECCOMP\n2. Space Alone 8,9"
          },
          {
            "weekNum": 7,
            "title": "Matser Canary",
            "description": "1. Matser Canary\n2. Space Alone 10"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "name": "2025-1학기",
    "categories": [
      {
        "id": 14,
        "name": "25-1 : Web Hacking",
        "comment": "웹 해킹은 웹사이트나 웹 서비스의 구조와 동작을 분석해서,\n보안 취약점을 찾아 공격하거나 방어하는 기술 분야입니다.\n본 세션은 웹사이트가 어떻게 해킹되는지, 그리고 어떻게 막는지를 직접 실습하며 배우는 세션입니다.\n기초부터 실습 문제와 실제 취약점 분석까지 단계적으로 경험할 수 있습니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "Web Security Basic",
            "description": "1. 컴퓨터 네트워크\n2. Frontend, Backend\n3. HTTP Response, Request"
          },
          {
            "weekNum": 2,
            "title": "XSS, CSRF",
            "description": "1. Cross-Site Scripting(XSS)\n2. Cross-Site Request Forgery(CSRF)"
          },
          {
            "weekNum": 3,
            "title": "SQL Injection",
            "description": "1. SQL Background\n2. SQL Injection\n3. SQL Injection Features"
          },
          {
            "weekNum": 4,
            "title": "NoSQL Injection",
            "description": "1. NoSQL Background\n2. NoSQL Injection"
          },
          {
            "weekNum": 5,
            "title": "Command Injection, File Vulnerability",
            "description": "1. Comman Injection\n2. File Vulnerability"
          },
          {
            "weekNum": 6,
            "title": "SSRF",
            "description": "1. Server-Side Request Forgery"
          },
          {
            "weekNum": 7,
            "title": "SHA 밤생해킹 해설",
            "description": "1. SHA 밤생해킹 1~4번 해설"
          },
          {
            "weekNum": 8,
            "title": "Template Injection",
            "description": "1. SSTI(Server-Side Template Injection)\n2. CSTI(Client-Side Template Injection)"
          }
        ]
      },
      {
        "id": 15,
        "name": "25-1 : Reverse Engineering",
        "comment": "Reverse Engineering(역공학)은 이미 만들어진 프로그램을 분해해서 내부 동작을 분석하는 기술입니다.\n본 세션은 실행 파일을 분석해 프로그램의 내부 동작과 보안 구조를 이해하는 세션입니다.\n어셈블리, 디버깅, 바이너리 분석을 통해 취약점 분석 능력을 기릅니다.",
        "weeks": [
          {
            "weekNum": 1,
            "title": "리버싱 그리고 분석의 기본",
            "description": "1. 리버싱 특징과 출제 경향\n2. 앞으로의 목표\n3. 리버싱을 들어가기 위한 사전지식"
          },
          {
            "weekNum": 2,
            "title": "메모리",
            "description": "1. 산비논대(산술, 비트, 논리, 대입)\n2. 문자열, 메모리, 포인터 함수\n3. 메모리 구조\n4. Endianess"
          },
          {
            "weekNum": 3,
            "title": "레지스터, 어셈블리어",
            "description": "1. 레지스터\n2. 어셈블리어"
          },
          {
            "weekNum": 4,
            "title": "디스어셈블러랑 친해지기 (1)",
            "description": "1. 함수 호출 규약\n2. PE & ELF\n3. 리버싱의 가장 기초적인 접근법"
          },
          {
            "weekNum": 5,
            "title": "디스어셈블러랑 친해지기 (2)",
            "description": "1. dreamhack rev-9\n2. 복습"
          },
          {
            "weekNum": 6,
            "title": "pwntools",
            "description": "1. pwntools란?\n2. pwntools 사용법\n3. pwntools 실습"
          },
          {
            "weekNum": 7,
            "title": "디스어셈블러랑 친해지기 (3)",
            "description": "1. 실습\n2. pwngdb"
          },
          {
            "weekNum": 8,
            "title": "1학기 마무리 발표 (1)",
            "description": "1. 각자 개인적으로 공부했던 내용에 대한 발표"
          },
          {
            "weekNum": 9,
            "title": "1학기 마무리 발표 (2)",
            "description": "1. 각자 개인적으로 공부했던 내용에 대한 발표"
          }
        ]
      }
    ]
  }
];

export const getSemesters = () =>
  studies.map(({ id, name }) => ({ id, name }));

export const getCategories = (semesterName) => {
  const semester = studies.find(({ name }) => name === semesterName);

  return semester
    ? semester.categories.map(({ id, name }) => ({ id, name }))
    : [];
};

export const getCategoryDetail = (semesterName, categoryName) => {
  const semester = studies.find(({ name }) => name === semesterName);
  const category = semester?.categories.find(({ name }) => name === categoryName);

  if (!category) {
    return { category: { name: '', comment: '' }, weeks: [] };
  }

  return {
    category: { id: category.id, name: category.name, comment: category.comment },
    weeks: category.weeks,
  };
};

