/* 최진혁 | 개발자 포트폴리오 - 동적 기능 스크립트 */

/* =============================================
   유틸리티
   ============================================= */

/* id로 요소를 가져오는 단축 함수 */
function getById(id) {
  return document.getElementById(id);
}

/* =============================================
   다크/라이트 테마 전환 — Page1
   이벤트: click
   DOM 조작: classList toggle (style 변경)
   ============================================= */
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle-btn');
  if (!toggleBtn) return;

  /* localStorage에 저장된 테마 복원 */
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-theme');
    toggleBtn.textContent = '☀️ 라이트 모드';
  }

  /* click 이벤트: 버튼 클릭 시 dark-theme 클래스 토글 */
  toggleBtn.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark-theme');
    /* textContent 조작으로 버튼 레이블 업데이트 */
    toggleBtn.textContent = isDark ? '☀️ 라이트 모드' : '🌙 다크 모드';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* =============================================
   시간 기반 인사말 — Page1
   DOM 조작: textContent
   ============================================= */
function showGreeting() {
  const banner = document.querySelector('.greeting-banner');
  if (!banner) return;

  const hour = new Date().getHours();
  let msg;
  if (hour < 6)       msg = '🌙 새벽에도 열심히시군요! 최진혁의 포트폴리오에 오신 것을 환영합니다.';
  else if (hour < 12) msg = '🌅 좋은 아침입니다! 최진혁의 포트폴리오에 오신 것을 환영합니다.';
  else if (hour < 18) msg = '☀️ 좋은 오후입니다! 최진혁의 포트폴리오에 오신 것을 환영합니다.';
  else                msg = '🌆 좋은 저녁입니다! 최진혁의 포트폴리오에 오신 것을 환영합니다.';

  /* textContent로 인사말 동적 삽입 */
  banner.textContent = msg;
}

/* =============================================
   기술 실시간 검색 필터 — Page1
   이벤트: keyup
   DOM 조작: classList (hidden 토글), textContent
   ============================================= */
function initSkillFilter() {
  const input = getById('skill-search');
  if (!input) return;

  const cards    = document.querySelectorAll('.skill-card');
  const noResult = getById('skill-no-result');

  /* keyup 이벤트: 타이핑마다 카드를 실시간으로 필터링 */
  input.addEventListener('keyup', function () {
    const q = this.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach(function (card) {
      const name = (card.dataset.skill || '').toLowerCase();
      const desc = card.querySelector('.skill-desc')
        ? card.querySelector('.skill-desc').textContent.toLowerCase()
        : '';
      /* 기술명 또는 설명에 검색어 포함 여부 확인 */
      const match = name.includes(q) || desc.includes(q);
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });

    /* textContent 조작으로 결과 없음 메시지 표시 */
    if (noResult) {
      noResult.textContent = (q && visible === 0)
        ? '"' + q + '"에 해당하는 기술이 없습니다.'
        : '';
    }
  });
}

/* =============================================
   섹션 접기/펼치기 — Page1
   이벤트: click
   DOM 조작: classList, style (collapse-icon 회전)
   ============================================= */
function initCollapsible() {
  const headers = document.querySelectorAll('h2.collapsible-header');

  headers.forEach(function (header) {
    /* click 이벤트: 섹션 헤더 클릭으로 펼침/접힘 토글 */
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;
      const icon    = this.querySelector('.collapse-icon');
      if (!content) return;

      const isCollapsed = content.classList.toggle('collapsed');
      /* style 조작: 아이콘 회전으로 상태 시각화 */
      if (icon) icon.classList.toggle('rotated', isCollapsed);
    });
  });
}

/* =============================================
   프로젝트 카드 호버 효과 — Page1
   이벤트: mouseover, mouseout
   DOM 조작: style.opacity
   ============================================= */
function initProjectHover() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(function (card) {
    const msg = card.querySelector('.card-hover-msg');

    /* mouseover: 카드에 마우스 진입 시 메시지 표시 */
    card.addEventListener('mouseover', function () {
      if (msg) msg.style.opacity = '1';
    });

    /* mouseout: 카드에서 마우스 이탈 시 메시지 숨김
       자식 요소(tech-tag, dl 등)로 이동할 때도 mouseout이 발생하므로
       relatedTarget이 카드 내부에 있으면 무시 */
    card.addEventListener('mouseout', function (e) {
      if (!card.contains(e.relatedTarget)) {
        if (msg) msg.style.opacity = '0';
      }
    });

    /* click: 카드 클릭 시 GitHub 링크 새 탭으로 열기 */
    card.addEventListener('click', function (e) {
      /* 카드 내 <a> 태그 직접 클릭은 기본 동작 유지 */
      if (e.target.closest('a')) return;
      const link = card.querySelector('a[href]');
      if (link) {
        window.open(link.href, '_blank');
      } else {
        if (msg) {
          /* textContent 조작으로 임시 안내 표시 후 복원 */
          const original = msg.textContent;
          msg.textContent = '🚧 링크 준비 중입니다.';
          msg.style.opacity = '1';
          setTimeout(function () { msg.textContent = original; }, 1500);
        }
      }
    });
  });
}

/* =============================================
   폼 유효성 검사 헬퍼 — Page2
   ============================================= */

/* 필드 상태(테두리 색상·피드백 메시지)를 업데이트 */
function setFieldState(input, isValid, message) {
  /* style 조작: 클래스로 input 테두리 색상 변경 */
  input.classList.toggle('input-error',   !isValid);
  input.classList.toggle('input-success',  isValid);

  /* textContent 조작으로 피드백 메시지 업데이트 */
  const fb = input.parentElement.querySelector('.field-feedback');
  if (fb) {
    fb.textContent = message;
    fb.className   = 'field-feedback ' + (isValid ? 'success' : 'error');
  }
}

/* 이름 유효성: 2자 이상 */
function validateName(input) {
  const val = input.value.trim();
  if (!val)         { setFieldState(input, false, '이름을 입력해주세요.'); return false; }
  if (val.length < 2) { setFieldState(input, false, '이름은 2자 이상 입력해주세요.'); return false; }
  setFieldState(input, true, '✓ 올바른 형식입니다.');
  return true;
}

/* 이메일 유효성: @ 포함 형식 */
function validateEmail(input) {
  const val   = input.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val)            { setFieldState(input, false, '이메일 주소를 입력해주세요.'); return false; }
  if (!regex.test(val)) { setFieldState(input, false, '올바른 이메일 형식이 아닙니다. (예: example@email.com)'); return false; }
  setFieldState(input, true, '✓ 올바른 이메일 형식입니다.');
  return true;
}

/* 제목 유효성: 5자 이상 */
function validateSubject(input) {
  const val = input.value.trim();
  if (!val)          { setFieldState(input, false, '제목을 입력해주세요.'); return false; }
  if (val.length < 5) { setFieldState(input, false, '제목은 5자 이상 입력해주세요.'); return false; }
  setFieldState(input, true, '✓ 제목이 입력되었습니다.');
  return true;
}

/* 내용 유효성: 10자 이상 */
function validateMessage(input) {
  const val = input.value.trim();
  if (!val)           { setFieldState(input, false, '내용을 입력해주세요.'); return false; }
  if (val.length < 10) { setFieldState(input, false, '내용은 10자 이상 입력해주세요.'); return false; }
  setFieldState(input, true, '✓ 내용이 입력되었습니다.');
  return true;
}

/* =============================================
   실시간 폼 피드백 초기화 — Page2
   이벤트: keyup, change
   ============================================= */
function initFormValidation() {
  const nameInput    = getById('name');
  const emailInput   = getById('email');
  const subjectInput = getById('subject');
  const messageInput = getById('message');
  if (!nameInput) return; /* Page2가 아니면 종료 */

  /* keyup 이벤트: 타이핑 중 즉각 피드백 */
  nameInput.addEventListener('keyup',    function () { validateName(this); });
  emailInput.addEventListener('keyup',   function () { validateEmail(this); });
  subjectInput.addEventListener('keyup', function () { validateSubject(this); });
  messageInput.addEventListener('keyup', function () {
    validateMessage(this);
    updateCharCounter();
  });

  /* change 이벤트: 포커스 이동 후 최종 검사 */
  nameInput.addEventListener('change',    function () { validateName(this); });
  emailInput.addEventListener('change',   function () { validateEmail(this); });
  subjectInput.addEventListener('change', function () { validateSubject(this); });
  messageInput.addEventListener('change', function () { validateMessage(this); });

  /* blur 이벤트: 포커스 이탈 시 빈 필드 포함 최종 유효성 검사 */
  nameInput.addEventListener('blur',    function () { validateName(this); });
  emailInput.addEventListener('blur',   function () { validateEmail(this); });
  subjectInput.addEventListener('blur', function () { validateSubject(this); });
  messageInput.addEventListener('blur', function () { validateMessage(this); });
}

/* =============================================
   글자 수 카운터 — Page2 (message 텍스트에리어)
   이벤트: keyup
   DOM 조작: textContent
   ============================================= */
function updateCharCounter() {
  const ta      = getById('message');
  const counter = getById('message-counter');
  if (!ta || !counter) return;

  const MAX = 500;
  const len = ta.value.length;

  /* 최대 글자 수 초과 시 자동 잘라내기 */
  if (len > MAX) ta.value = ta.value.substring(0, MAX);

  const cur = Math.min(len, MAX);
  /* textContent 조작으로 카운터 숫자 업데이트 */
  counter.textContent = cur + ' / ' + MAX + '자';
  counter.className = 'char-counter';
  if (cur > MAX * 0.8) counter.classList.add('warning');
  if (cur >= MAX)      counter.classList.add('limit');
}

/* =============================================
   select change 피드백 — Page2
   이벤트: change
   DOM 조작: classList (input-success 클래스 토글)
   ============================================= */
function initSelectChange() {
  ['tech-stack', 'experience'].forEach(function (id) {
    const sel = getById(id);
    if (!sel) return;

    /* change 이벤트: 선택 완료 시 .input-success 클래스 토글로 테두리 색 변경 */
    sel.addEventListener('change', function () {
      /* classList 조작: 선택 여부에 따라 성공 클래스 토글 */
      this.classList.toggle('input-success', !!this.value);
    });
  });
}

/* =============================================
   오류 요약 메시지 표시 — Page2
   DOM 조작: createElement, appendChild, textContent
   ============================================= */
function showErrorSummary(fields) {
  let summary = getById('form-error-summary');
  if (!summary) {
    /* createElement로 오류 박스 동적 생성 */
    summary = document.createElement('div');
    summary.id = 'form-error-summary';
    /* style.css의 .form-error-summary 클래스로 스타일 적용 */
    summary.className = 'form-error-summary';
    const form = document.querySelector('#contact-form form');
    if (form) form.insertBefore(summary, form.firstChild);
  }

  /* innerHTML 초기화 후 제목 + 목록 동적 생성 */
  summary.innerHTML = '';

  const title = document.createElement('strong');
  title.textContent = '⚠️ 다음 필수 항목을 확인해주세요:';
  summary.appendChild(title);

  /* createElement + appendChild로 미입력 항목 목록 삽입 */
  const ul = document.createElement('ul');
  ul.className = 'error-list';
  fields.forEach(function (field) {
    const li = document.createElement('li');
    li.textContent = field;
    ul.appendChild(li);
  });
  summary.appendChild(ul);

  summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* =============================================
   제출 결과 표시 — Page2
   DOM 조작: createElement, appendChild, style, textContent
   ============================================= */
function showSubmissionResult(form) {
  const result = getById('submission-result');
  if (!result) return;

  /* 입력값 수집 */
  const nameVal    = getById('name').value.trim();
  const emailVal   = getById('email').value.trim();
  const githubVal  = getById('github') ? getById('github').value.trim() : '';
  const subjectVal = getById('subject').value.trim();
  const messageVal = getById('message').value.trim();

  const techEl  = getById('tech-stack');
  const techVal = techEl ? techEl.options[techEl.selectedIndex].text : '';
  const expEl   = getById('experience');
  const expVal  = expEl ? expEl.options[expEl.selectedIndex].text : '';

  /* 선택된 문의 유형 */
  let typeVal = '';
  document.querySelectorAll('input[name="contact-type"]').forEach(function (r) {
    if (r.checked) typeVal = r.parentElement.textContent.trim();
  });

  /* 선택된 요일 */
  const dayMap = { monday:'월', tuesday:'화', wednesday:'수', thursday:'목', friday:'금', saturday:'토', sunday:'일' };
  const days   = Array.from(document.querySelectorAll('input[name="day"]:checked'))
    .map(function (d) { return dayMap[d.value] || d.value; }).join(', ');

  /* 포트폴리오 평가 */
  let ratingVal = '';
  document.querySelectorAll('input[name="portfolio-rating"]').forEach(function (r) {
    if (r.checked) ratingVal = r.parentElement.textContent.trim();
  });

  const items = [
    { label: '이름',          value: nameVal },
    { label: '이메일',        value: emailVal },
    { label: 'GitHub',        value: githubVal || '(미입력)' },
    { label: '문의 유형',     value: typeVal || '(미선택)' },
    { label: '관심 기술 분야',value: techVal || '(미선택)' },
    { label: '개발 경력',     value: expVal || '(미선택)' },
    { label: '참여 가능 요일',value: days || '(미선택)' },
    { label: '포트폴리오 평가',value: ratingVal || '(미선택)' },
    { label: '제목',          value: subjectVal },
    { label: '내용',          value: messageVal },
  ];

  /* 기존 오류 요약 제거 */
  const errSummary = getById('form-error-summary');
  if (errSummary) errSummary.remove();

  /* DOM 초기화 후 결과 항목 동적 생성 */
  result.innerHTML = '';

  const title = document.createElement('h3');
  title.textContent = '✅ 신청이 접수되었습니다!';
  result.appendChild(title);

  const sub = document.createElement('p');
  sub.textContent = nameVal + '님의 신청 내용을 확인해주세요. 빠른 시일 내에 답변드리겠습니다.';
  result.appendChild(sub);

  /* appendChild로 결과 행 반복 삽입 */
  items.forEach(function (item) {
    const row = document.createElement('div');
    row.className = 'result-item';

    const lbl = document.createElement('span');
    lbl.className   = 'result-label';
    lbl.textContent = item.label;

    const val = document.createElement('span');
    val.textContent = item.value;

    row.appendChild(lbl);
    row.appendChild(val);
    result.appendChild(row);
  });

  /* "다시 작성" 버튼 추가 */
  const retryBtn = document.createElement('button');
  retryBtn.textContent = '↩ 다시 작성하기';
  /* style.css의 #submission-result .btn-outline 규칙으로 margin-top 적용 */
  retryBtn.className   = 'btn btn-outline';
  retryBtn.addEventListener('click', function () {
    form.reset();
    /* style 조작으로 폼 표시 / 결과 숨김 */
    form.style.display        = '';
    result.style.display      = 'none';
    form.querySelectorAll('.input-error, .input-success').forEach(function (el) {
      el.classList.remove('input-error', 'input-success');
    });
    form.querySelectorAll('.field-feedback').forEach(function (el) { el.textContent = ''; });
    form.querySelectorAll('select').forEach(function (s) { s.classList.remove('input-success'); });
    const counter = getById('message-counter');
    if (counter) counter.textContent = '0 / 500자';
  });
  result.appendChild(retryBtn);

  /* style 조작으로 결과 영역 표시, 폼 숨김 */
  result.style.display = 'block';
  form.style.display   = 'none';
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* =============================================
   폼 제출 처리 — Page2
   이벤트: submit
   event.preventDefault()로 새로고침 없이 처리
   ============================================= */
function initFormSubmit() {
  const form = document.querySelector('#contact-form form');
  if (!form) return;

  /* reset 이벤트: JS가 추가한 클래스·피드백·카운터 상태도 함께 초기화 */
  form.addEventListener('reset', function () {
    form.querySelectorAll('.input-error, .input-success').forEach(function (el) {
      el.classList.remove('input-error', 'input-success');
    });
    form.querySelectorAll('.field-feedback').forEach(function (el) {
      el.textContent = '';
      el.className = 'field-feedback';
    });
    form.querySelectorAll('select').forEach(function (s) {
      s.classList.remove('input-success');
    });
    const counter = getById('message-counter');
    if (counter) { counter.textContent = '0 / 500자'; counter.className = 'char-counter'; }
    const errSummary = getById('form-error-summary');
    if (errSummary) errSummary.remove();
  });

  /* submit 이벤트: 기본 폼 전송(페이지 이동) 차단 */
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput    = getById('name');
    const emailInput   = getById('email');
    const subjectInput = getById('subject');
    const messageInput = getById('message');
    const agreeInput   = getById('agree');

    /* 전체 유효성 검사 — 실패한 항목 이름을 배열로 수집 */
    const errors = [];
    if (!validateName(nameInput))       errors.push('이름 (2자 이상 입력)');
    if (!validateEmail(emailInput))     errors.push('이메일 주소 (올바른 형식)');
    if (!validateSubject(subjectInput)) errors.push('제목 (5자 이상 입력)');
    if (!validateMessage(messageInput)) errors.push('내용 (10자 이상 입력)');

    /* 문의 유형 라디오 검사 */
    const contactTypeChecked = document.querySelector('input[name="contact-type"]:checked');
    if (!contactTypeChecked) errors.push('문의 유형 선택');

    /* 동의 체크 확인 — closest로 .form-group 내 .field-feedback 정확히 탐색 */
    const agreeFb = agreeInput.closest('.form-group').querySelector('.field-feedback');
    if (!agreeInput.checked) {
      if (agreeFb) { agreeFb.textContent = '정보 제출에 동의해주세요.'; agreeFb.className = 'field-feedback error'; }
      errors.push('정보 제출 동의 체크');
    } else {
      if (agreeFb) { agreeFb.textContent = ''; agreeFb.className = 'field-feedback'; }
    }

    if (errors.length > 0) {
      showErrorSummary(errors);
      return;
    }

    showSubmissionResult(form);
  });
}

/* =============================================
   상단 이동 버튼 — 공통 (두 페이지)
   이벤트: scroll, click
   DOM 조작: createElement, appendChild, classList (visible 토글)
   ============================================= */
function initBackToTop() {
  /* createElement로 상단 이동 버튼 동적 생성 */
  const btn = document.createElement('button');
  btn.className   = 'back-to-top-btn';
  btn.textContent = '↑';
  btn.title       = '맨 위로 이동';
  /* appendChild로 body에 추가 */
  document.body.appendChild(btn);

  /* scroll 이벤트: 300px 이상 스크롤 시 버튼 표시 */
  window.addEventListener('scroll', function () {
    /* classList toggle으로 .visible 클래스 추가/제거 */
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  /* click 이벤트: 클릭 시 최상단으로 부드럽게 이동 */
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =============================================
   초기화 진입점
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  /* 두 페이지 공통 — 해당 요소가 없으면 각 함수 내부에서 조기 종료 */
  initThemeToggle();
  showGreeting();
  initBackToTop();

  /* Page1 전용 */
  initSkillFilter();
  initCollapsible();
  initProjectHover();

  /* Page2 전용 */
  initFormValidation();
  initFormSubmit();
  initSelectChange();
});
