import { useEffect, useMemo, useState } from 'react';
import { awards, certificates, emails, focusAreas, links, papers, projects, skillGroups, stats } from './data';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const navItems = [
  ['프로젝트', '#projects'],
  ['소개', '#about'],
  ['연구', '#research'],
  ['수상·기록', '#records'],
];

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

const ArrowDown = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="icon"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);

const External = ({ href, className, children }) => (
  <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>
);

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    const observe = () => document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((node) => observer.observe(node));
    observe();
    // Filtering re-renders project cards, so pick up newly mounted nodes too.
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="brand" aria-label="홈으로 이동" onClick={close}>CJH<i /></a>
        <nav className="main-nav" aria-label="주 메뉴">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <External href={links.resume} className="btn btn-outline btn-sm hide-mobile">이력서 <ArrowUpRight /></External>
          <a href="#contact" className="btn btn-solid btn-sm" onClick={close}>연락하기</a>
          <button
            type="button"
            className={`menu-button ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`menu-layer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav className="menu-links" aria-label="모바일 메뉴">
          {navItems.map(([label, href], index) => (
            <a key={href} href={href} onClick={close}><small>0{index + 1}</small><span>{label}</span></a>
          ))}
          <a href="#contact" onClick={close}><small>05</small><span>연락</span></a>
        </nav>
        <div className="menu-socials">
          <External href={links.github}>GitHub ↗</External>
          <External href={links.blog}>Blog ↗</External>
          <External href={links.resume}>Resume ↗</External>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="hero-main">
        <div className="hero-copy">
          <div className="hero-kicker hero-enter">
            <span className="chip-accent"><i /> OPEN TO WORK</span>
            <span className="muted">AI DEVELOPER · SEOUL</span>
          </div>
          <h1 className="hero-enter delay-1">AI to<br />real life<span className="dot">.</span></h1>
          <p className="hero-lead hero-enter delay-2">
            안녕하세요, <strong>최진혁</strong>입니다. 복잡한 AI와 데이터를 누구나 쓸 수 있는 경험으로 만듭니다.
            명지대학교 정보통신공학과 4학년, DGIST 연구 인턴.
          </p>
          <div className="hero-actions hero-enter delay-2">
            <a href="#projects" className="btn btn-solid btn-lg">프로젝트 보기 <ArrowDown /></a>
            <External href={links.github} className="btn btn-outline btn-lg">GitHub <ArrowUpRight /></External>
          </div>
        </div>
        <dl className="stats hero-enter delay-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}{stat.suffix && <small>{stat.suffix}</small>}</dd>
            </div>
          ))}
        </dl>
      </div>
      <figure className="portrait hero-enter delay-2">
        <img src={assetPath('assets/images/profile.jpg')} alt="최진혁 프로필 사진" />
        <figcaption>
          <span><strong>최진혁 · Choi Jinhyeok</strong><small>Generative AI · Computer Vision</small></span>
          <em>KST</em>
        </figcaption>
      </figure>
    </section>
  );
}

function Marquee() {
  const items = ['AI ENGINEERING', 'PRODUCT THINKING', 'MACHINE LEARNING', 'FULL-STACK DEVELOPMENT'];
  const row = items.flatMap((item) => [<span key={item}>{item}</span>, <b key={`${item}-star`}>✦</b>]);
  return <div className="marquee" aria-hidden="true"><div><p>{row}</p><p>{row}</p></div></div>;
}

function SectionHeading({ label, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ProjectCard({ project, featured }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`} data-reveal>
      <div className="project-visual" style={{ '--card-color': project.color }} aria-hidden="true">
        <span className="visual-number">{project.number}{featured && ' — FEATURED'}</span>
        <i className="visual-orb" />
        <b>{project.word}</b>
      </div>
      <div className="project-info">
        <div className="project-meta"><span>{project.subtitle}</span><span>{project.period}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-action">
          {project.href
            ? <External href={project.href} className="btn btn-outline">{project.linkLabel} <ArrowUpRight /></External>
            : <span className="muted">분석 리포트 · 공개 링크 없음</span>}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)), [filter]);
  const [featured, ...rest] = filtered;

  return (
    <section className="projects container section" id="projects">
      <SectionHeading
        label="01 / 프로젝트"
        title={<>Selected work<span className="dot">.</span></>}
        description="문제를 발견하고, 기술을 선택하고, 끝까지 작동하는 결과물을 만듭니다."
      />
      <div className="filters" role="group" aria-label="프로젝트 필터">
        {[['all', '전체'], ['ai', 'AI / ML'], ['web', 'Web'], ['data', 'Data']].map(([value, label]) => (
          <button key={value} type="button" className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} aria-pressed={filter === value}>
            {label}<span>{value === 'all' ? projects.length : projects.filter((p) => p.category === value).length}</span>
          </button>
        ))}
      </div>
      {featured && <ProjectCard key={featured.id} project={featured} featured />}
      {rest.length > 0 && (
        <div className="project-grid">
          {rest.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </section>
  );
}

function About() {
  return (
    <section className="about container section" id="about">
      <span className="section-label">02 / 소개</span>
      <div className="about-title" data-reveal>
        <h2>Curious<br />builder<span className="dot">.</span></h2>
        <p className="about-lead">AI 기술을 <mark>실제 경험</mark>으로 연결하는 개발자 최진혁입니다.</p>
      </div>
      <div className="about-body" data-reveal>
        <p>명지대학교 정보통신공학과에서 AI/ML을 공부하고 있습니다. 모델의 성능만큼이나 사용자가 기술을 어떻게 만나고 활용하는지를 중요하게 생각합니다.</p>
        <dl className="facts">
          <div><dt>EDUCATION</dt><dd>명지대학교 정보통신공학과 4학년</dd></div>
          <div><dt>EXPERIENCE</dt><dd>DGIST Research Intern</dd></div>
          <div><dt>INTERESTS</dt><dd>Generative AI · Computer Vision</dd></div>
        </dl>
        <External href={links.resume} className="btn btn-outline">이력서 자세히 보기 <ArrowUpRight /></External>
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section className="toolbox">
      <div className="container section">
        <SectionHeading label="03 / 역량" title="Toolbox" description="필요한 기술을 빠르게 배우고 하나의 제품으로 연결합니다." />
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.number} data-reveal>
              <div><h3>{group.title}</h3><span>{group.number}</span></div>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="learning">
          <span className="section-label">NOW LEARNING</span>
          <div className="learning-list">
            {focusAreas.map(([title, description], index) => (
              <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="research container section" id="research">
      <SectionHeading
        label="04 / 연구 노트"
        title={<>Read · think<br />· apply<span className="dot">.</span></>}
        description="DGIST 연구 인턴으로 참여하며 최신 LLM과 소프트웨어 공학 연구를 읽고 정리했습니다."
      />
      <div className="paper-list">
        {papers.map((paper) => (
          <External href={paper.file} className="paper-row" key={paper.number}>
            <span className="paper-number">PAPER {paper.number}</span>
            <div className="paper-body">
              <h3>{paper.title}</h3>
              <p>{paper.description}</p>
              <ul className="tags outline">{paper.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <span className="btn btn-solid paper-cta">PDF 읽기 <ArrowUpRight /></span>
          </External>
        ))}
      </div>
    </section>
  );
}

function Records() {
  return (
    <section className="records container section" id="records">
      <SectionHeading label="05 / 수상·기록" title={<>Records<span className="dot">.</span></>} />
      <div className="award-grid">
        {awards.map((award) => {
          const content = (
            <>
              <img src={award.image} alt={award.alt} loading="lazy" />
              <span className="award-date">{award.date}</span>
              <h3>{award.title}{award.href && ' ↗'}</h3>
              <p>{award.description}</p>
            </>
          );
          return award.href
            ? <External key={award.title} href={award.href} className="award-card">{content}</External>
            : <article key={award.title} className="award-card">{content}</article>;
        })}
      </div>
      <div className="record-row" data-reveal>
        <div className="gpa-card">
          <span>전체 · 전공 평점</span>
          <strong>4.42<small> / 4.5</small></strong>
        </div>
        <div className="cert-card">
          <span>자격증 · 어학</span>
          <ul>{certificates.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="container">
        <div className="contact-main" data-reveal>
          <div>
            <span className="section-label">06 / 연락</span>
            <h2>Let's make<br />it real.</h2>
          </div>
          <div className="contact-actions">
            <p>채용, 협업, 연구 제안 모두 환영합니다.</p>
            {emails.map((email, index) => (
              <a key={email.address} href={`mailto:${email.address}`} className={`email-button ${index === 0 ? 'primary' : ''}`}>
                <span>{email.address}</span><small>{email.label}</small>
              </a>
            ))}
            <div className="contact-links">
              <External href={links.github} className="btn btn-outline">GitHub ↗</External>
              <External href={links.blog} className="btn btn-outline">Blog ↗</External>
              <External href={links.resume} className="btn btn-outline">Resume ↗</External>
            </div>
          </div>
        </div>
        <div className="contact-bottom">
          <span>CHOI JINHYEOK · AI DEVELOPER</span>
          <span>SEOUL, SOUTH KOREA</span>
          <span>© 2026 CJH</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#projects">본문으로 건너뛰기</a>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Toolbox />
        <Research />
        <Records />
      </main>
      <Contact />
    </div>
  );
}
