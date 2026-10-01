import assetPath from './utils/assetPath';

export const links = {
  github: 'https://github.com/Jindevelopment',
  blog: 'https://jindevelopment.tistory.com/',
  resume: 'https://drive.google.com/file/d/1cgPPq3cFf1n_YGAEiFQq3T1khylML2Al/view?usp=drive_link',
};

export const emails = [
  { label: 'GMAIL', address: 'jinhyeok1001@gmail.com' },
  { label: 'NAVER', address: 'jinhyeok1001@naver.com' },
];

export const stats = [
  { label: 'GPA', value: '4.42', suffix: ' / 4.5' },
  { label: 'PROJECTS', value: '5' },
  { label: 'AWARDS', value: '2' },
  { label: 'RESEARCH NOTES', value: '3' },
];

export const projects = [
  {
    id: 'yaksok', number: '01', title: 'YakSok', subtitle: 'AI SMART MEDICATION', word: 'YAK\nSOK', emoji: '💊',
    description: '알약을 촬영하면 종류를 인식하고, AI 기반으로 복약 일정을 관리하는 스마트 헬스케어 서비스입니다.',
    period: '2026 · 1학기', category: 'ai', tags: ['AI', 'Deep Learning', 'Image Recognition'],
    href: 'https://github.com/CattonNyan/YakSok-ver', linkLabel: 'GitHub 코드 보기', color: '#c8ff45',
  },
  {
    id: 'cinelog', number: '02', title: 'CineLog', subtitle: 'MOVIE ARCHIVE WITH LLM', word: 'CINE\nLOG', emoji: '🎬',
    description: '감상한 영화를 기록하고, 대화형 챗봇으로 줄거리와 관련 작품을 탐색하는 영화 아카이브입니다.',
    period: '2026 · 1학기', category: 'web', tags: ['Web', 'Chatbot', 'LLM', 'Vercel'],
    href: 'https://cine-log-eight.vercel.app/', linkLabel: '라이브 데모 열기', color: '#ff8b6a',
  },
  {
    id: 'wine', number: '03', title: 'Wine Analysis Pro', subtitle: 'DATA TO INSIGHT', word: 'WINE\nDATA', emoji: '🍷',
    description: '와인 데이터를 전처리하고 시각화·통계 분석을 통해 성분과 품질의 관계를 살펴본 데이터 분석 프로젝트입니다.',
    period: '2025 · 1학기', category: 'data', tags: ['Python', 'NumPy', 'Pandas', 'TensorFlow'],
    color: '#b5a6ff',
  },
  {
    id: 'cvpilot', number: '04', title: 'CVPilot', subtitle: 'AI CAREER CO-PILOT', word: 'CV\nPILOT', emoji: '📄',
    description: 'AI로 이력서를 분석하고, 내용을 더 명확하게 전달할 수 있도록 맞춤형 개선 피드백을 제공하는 서비스입니다.',
    period: '2025 · 여름', category: 'ai', tags: ['FastAPI', 'TypeScript', 'Next.js', 'Supabase'],
    href: 'https://github.com/Jindevelopment/Jindevelopment/blob/main/CVPilot.pdf', linkLabel: '발표 자료 PDF', color: '#68d8ff',
  },
  {
    id: 'allergy', number: '05', title: 'Allergy Detector', subtitle: 'VISION FOR SAFETY', word: 'SCAN\nSAFE', emoji: '🔍',
    description: 'OCR로 식품 성분표를 읽고, 사용자가 등록한 알레르기 유발 성분이 포함되어 있는지 확인하는 서비스입니다.',
    period: '2025 · 2학기', category: 'ai', tags: ['Flask', 'OpenCV', 'EasyOCR', 'FastAPI'],
    href: 'https://github.com/Jindevelopment/Jindevelopment/blob/main/CursorAI_%EA%B2%BD%EC%A7%84%EB%8C%80%ED%9A%8C_%EC%B5%9C%EC%A2%85.pdf',
    linkLabel: '발표 자료 PDF', color: '#ffd35a',
  },
];

export const skillGroups = [
  { number: '01', title: 'AI & Data', skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'Pandas'] },
  { number: '02', title: 'Product', skills: ['React', 'Next.js', 'TypeScript', 'HTML / CSS', 'FastAPI'] },
  { number: '03', title: 'Database & Ops', skills: ['SQL', 'Supabase', 'Git / GitHub', 'Vercel', 'Docker'] },
];

export const papers = [
  { number: '01', title: 'Recommending Usability Improvements with Multimodal LLMs', description: '멀티모달 LLM을 활용해 UI/UX 사용성 개선점을 자동 제안하는 연구', tags: ['Multimodal LLM', 'Usability', 'UI/UX'], file: assetPath('assets/research/usability-improvements-multimodal-llm.pdf') },
  { number: '02', title: 'Comment Traps', description: '주석 처리된 결함 코드가 AI 코드 생성 결과에 미치는 영향을 분석한 연구', tags: ['LLM', 'Code Generation', 'Software Defect'], file: assetPath('assets/research/comment-traps-ai-code-generation.pdf') },
  { number: '03', title: 'WebTestPilot', description: '자연어 명세로 테스트 오라클을 추론해 웹을 자동 검증하는 에이전트 연구', tags: ['LLM Agent', 'Web Testing', 'E2E'], file: assetPath('assets/research/webtestpilot-agentic-web-testing.pdf') },
];

export const focusAreas = [
  ['LLM & 생성형 AI', 'Transformer부터 LoRA·QLoRA 파인튜닝과 RAG 시스템까지, 실제 문제를 해결하는 LLM 역량을 쌓고 있습니다.'],
  ['MLOps Pipeline', 'Docker, Kubernetes, MLflow를 공부하며 모델의 학습·배포·모니터링 과정을 이해하고 있습니다.'],
  ['Computer Vision', 'YOLO와 SAM 등 최신 비전 연구를 읽고 재현하며 프로젝트에 적용 가능한 방법을 탐구합니다.'],
  ['Full-stack AI', 'FastAPI, Next.js, Supabase를 활용해 모델과 웹 서비스를 연결하는 방법을 학습하고 있습니다.'],
];

export const awards = [
  { image: assetPath('assets/images/portfolio_award.jpg'), alt: '포트폴리오 경진대회 대상 시상 사진', date: '2025 · 명지대학교', title: '포트폴리오 경진대회 대상', description: '개발자 포트폴리오 제작 경진대회', href: 'https://jindevelopment.github.io/Myongji_Portfolio/' },
  { image: assetPath('assets/images/award.jpg'), alt: 'AI 활용 경진대회 수상 사진', date: '2025.10.01 · 명지대학교', title: 'AI 활용 경진대회', description: 'Cursor AI 경진대회' },
  { image: assetPath('assets/images/club.jpg'), alt: 'FOM 동아리 수료증', date: '2025.08.16 · FOM', title: 'Focus On data-Mining', description: '머신러닝 및 딥러닝 과정 수료' },
];

export const certificates = ['ADsP', 'SQLD', '컴퓨터활용능력 1급', 'TOEIC Speaking · IH'];
