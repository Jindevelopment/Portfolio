# 최진혁 | AI Developer Portfolio

AI로 일상의 문제를 해결하고 아이디어를 서비스로 구현하는 개발자 최진혁의 개인 포트폴리오입니다. 프로젝트, 기술과 학습 분야, 연구 노트, 수상 및 자격 정보를 한 페이지에서 소개합니다.

## 주요 기능

- AI/ML, Web, Data 기준 프로젝트 필터링
- 모바일 내비게이션과 반응형 레이아웃
- 스크롤 기반 콘텐츠 노출 애니메이션
- 연구 리뷰 PDF 및 외부 프로젝트 링크 제공
- 키보드 탐색을 고려한 스킵 링크와 메뉴 제어

## 기술 스택

- React
- Vite
- CSS

## 시작하기

Node.js의 최신 LTS 버전과 npm이 필요합니다.

```bash
git clone <repository-url>
cd Portfolio
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | `dist/`에 프로덕션 빌드 생성 |
| `npm run preview` | 프로덕션 빌드 로컬 미리보기 |

## 폴더 구조

```text
.
├── public/
│   └── assets/
│       ├── images/              # 프로필 및 수상 이미지
│       └── research/            # 연구 리뷰 PDF
├── src/
│   ├── components/
│   │   ├── layout/              # 헤더 등 공통 레이아웃
│   │   ├── sections/            # 포트폴리오의 각 화면 섹션
│   │   └── ui/                  # 링크, 아이콘, 제목 등 공통 UI
│   ├── hooks/                   # 화면 동작을 담당하는 커스텀 훅
│   ├── utils/                   # 에셋 경로 등 공통 유틸리티
│   ├── App.jsx                  # 섹션 조합 및 앱 진입 화면
│   ├── data.js                  # 프로젝트·기술·연구·수상 데이터
│   ├── main.jsx                 # React 진입점
│   └── styles.css               # 전역 스타일과 반응형 규칙
├── contact.html                 # 연락처 섹션으로 이동하는 보조 페이지
├── index.html
├── package.json
└── vite.config.js
```

## 콘텐츠 수정

텍스트와 목록형 콘텐츠는 대부분 `src/data.js`에서 관리합니다.

- 프로젝트: `projects`
- 프로젝트 카드 이모지: 각 프로젝트의 `emoji`
- 기술 스택: `skillGroups`
- 학습 분야: `focusAreas`
- 연구 노트: `papers`
- 수상 및 자격: `awards`, `certificates`
- 외부 링크 및 이메일: `links`, `emails`

프로필·수상 이미지는 `public/assets/images/`, 연구 PDF는 `public/assets/research/`에 추가한 뒤 `src/data.js`에서 경로를 연결합니다. 화면 섹션의 문구나 마크업은 `src/components/sections/`에서 수정할 수 있습니다.

## 빌드 및 배포

```bash
npm run build
npm run preview
```

Vite 설정의 `base: './'`를 사용하므로 정적 호스팅의 하위 경로에서도 상대 경로로 에셋을 불러옵니다. 배포 전에는 `npm run build`가 정상적으로 완료되는지 확인하세요.

## 라이선스

포트폴리오의 코드와 콘텐츠에 대한 권리는 최진혁에게 있습니다.

© 2026 Choi Jinhyeok
