import { useEffect, useMemo, useState } from 'react';
import { focusAreas, links, papers, projects, skillGroups } from './data';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const Arrow = ({ diagonal = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={diagonal ? 'arrow diagonal' : 'arrow'}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a href="#top" className="brand" aria-label="홈으로 이동">
          <span>CJH</span><i />
        </a>
        <div className="header-note">AI DEVELOPER · SEOUL</div>
        <button className={`menu-button ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <div className={`menu-layer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-meta">
          <p>AVAILABLE FOR<br />NEW OPPORTUNITIES</p>
          <span>SEOUL · KST</span>
        </div>
        <nav className="menu-links" aria-label="주 메뉴">
          {[
            ['01', 'HOME', '#top'], ['02', 'PROJECTS', '#projects'], ['03', 'ABOUT', '#about'],
            ['04', 'RESEARCH', '#research'], ['05', 'CONTACT', '#contact'],
          ].map(([number, label, href]) => (
            <a key={label} href={href} onClick={close}><small>{number}</small><span>{label}</span><Arrow /></a>
          ))}
        </nav>
        <div className="menu-socials">
          <a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href={links.blog} target="_blank" rel="noreferrer">BLOG ↗</a>
          <a href={links.resume} target="_blank" rel="noreferrer">RESUME ↗</a>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-kicker hero-enter"><span>PORTFOLIO · 2026</span><span>SCROLL TO EXPLORE ↓</span></div>
      <div className="hero-title" aria-label="AI to real life">
        <div className="title-line hero-enter delay-1"><span>AI</span><div className="orb orb-code">&lt;/&gt;</div><span className="outline">TO</span></div>
        <div className="title-line center hero-enter delay-2"><span>REAL</span><div className="mini-copy">FROM DATA<br />TO EXPERIENCE</div></div>
        <div className="title-line end hero-enter delay-3"><div className="orb orb-ai"><span>AI</span><i /></div><span>LIFE</span></div>
      </div>
      <div className="hero-bottom hero-enter delay-3">
        <p>복잡한 AI와 데이터를<br />누구나 사용할 수 있는 경험으로 만듭니다.</p>
        <div className="availability"><i /> OPEN TO WORK</div>
      </div>
    </section>
  );
}

function Marquee() {
  const content = 'AI ENGINEERING  ✦  PRODUCT THINKING  ✦  MACHINE LEARNING  ✦  FULL-STACK DEVELOPMENT  ✦  ';
  return <div className="marquee" aria-hidden="true"><div><span>{content}</span><span>{content}</span></div></div>;
}

function SectionTitle({ eyebrow, children, aside }) {
  return (
    <div className="section-heading" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {aside && <p>{aside}</p>}
    </div>
  );
}

function ProjectVisual({ type, number }) {
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <span className="visual-number">{number}</span>
      {type === 'pill' && <><i className="pill one" /><i className="pill two" /><b>YAK<br />SOK</b></>}
      {type === 'film' && <><div className="film-frame"><i /><i /><i /></div><b>WATCH<br />· ASK ·</b></>}
      {type === 'chart' && <><div className="chart-bars"><i /><i /><i /><i /><i /></div><b>QUALITY<br />DATA</b></>}
      {type === 'document' && <><div className="doc"><i /><i /><i /><strong>AI</strong></div><b>BETTER<br />CAREER</b></>}
      {type === 'scan' && <><div className="scan-box"><i /><span>SAFE</span></div><b>SCAN<br />· CHECK ·</b></>}
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.category === filter), [filter]);

  return (
    <section className="projects section-pad" id="projects">
      <SectionTitle eyebrow="01 · SELECTED WORK" aside="문제를 발견하고, 기술을 선택하고, 끝까지 작동하는 결과물을 만듭니다.">
        PROJECTS<span className="accent-dot">.</span>
      </SectionTitle>
      <div className="filters" data-reveal role="group" aria-label="프로젝트 필터">
        {[['all', 'ALL'], ['ai', 'AI / ML'], ['web', 'WEB'], ['data', 'DATA']].map(([value, label]) => (
          <button
            key={value}
            className={filter === value ? 'active' : ''}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
          >
            {label}<span aria-hidden="true">{value === 'all' ? projects.length : projects.filter((p) => p.category === value).length}</span>
          </button>
        ))}
      </div>
      <div className="project-grid">
        {filtered.map((project) => {
          const Tag = project.href ? 'a' : 'article';
          const linkProps = project.href ? { href: project.href, target: '_blank', rel: 'noreferrer', 'aria-label': `${project.title} 자세히 보기` } : {};
          return (
            <Tag className="project-card" style={{ '--card-color': project.color }} key={project.id} {...linkProps} data-reveal>
              <ProjectVisual type={project.visual} number={project.number} />
              <div className="project-info">
                <div><span>{project.number} / {project.period}</span>{project.href && <span className="round-arrow"><Arrow diagonal /></span>}</div>
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <SectionTitle eyebrow="02 · ABOUT ME">CURIOUS<br />BUILDER<span className="accent-dot">.</span></SectionTitle>
      <div className="about-grid">
        <div className="portrait-wrap" data-reveal>
          <img src={assetPath('assets/images/profile.jpg')} alt="최진혁 프로필" />
          <div className="portrait-stamp"><span>FOR TOMORROW · BETTER THAN TODAY · </span></div>
        </div>
        <div className="about-copy" data-reveal>
          <p className="lead">안녕하세요. AI 기술을<br /><em>실제 경험</em>으로 연결하는<br />개발자 최진혁입니다.</p>
          <p>명지대학교 정보통신공학과에서 AI/ML을 공부하고 있습니다. 모델의 성능만큼이나 사용자가 기술을 어떻게 만나고 활용하는지를 중요하게 생각합니다.</p>
          <div className="about-facts">
            <div><small>EDUCATION</small><strong>명지대학교<br />정보통신공학과 4학년</strong></div>
            <div><small>INTERESTS</small><strong>Generative AI<br />Computer Vision</strong></div>
            <div><small>EXPERIENCE</small><strong>DGIST<br />Research Intern</strong></div>
          </div>
          <a className="text-link" href={links.resume} target="_blank" rel="noreferrer">이력서 자세히 보기 <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills section-pad">
      <SectionTitle eyebrow="03 · CAPABILITIES" aside="필요한 기술을 빠르게 배우고 하나의 제품으로 연결합니다.">MY TOOLBOX</SectionTitle>
      <div className="skill-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.number} data-reveal>
            <div className="skill-head"><span>{group.number}</span><span className="skill-icon">✦</span></div>
            <h3>{group.title}</h3>
            <ul>{group.skills.map((skill) => <li key={skill}><span>{skill}</span><i /></li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="research section-pad" id="research">
      <SectionTitle eyebrow="04 · RESEARCH NOTES" aside="DGIST 연구 인턴으로 참여하며 최신 LLM과 소프트웨어 공학 연구를 읽고 정리했습니다.">READ · THINK<br />· APPLY</SectionTitle>
      <div className="paper-list">
        {papers.map((paper) => (
          <a href={paper.file} target="_blank" rel="noreferrer" className="paper-row" key={paper.number} data-reveal>
            <span className="paper-number">{paper.number}</span>
            <div><h3>{paper.title}</h3><p>{paper.description}</p><ul>{paper.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
            <span className="paper-arrow"><Arrow diagonal /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="focus section-pad">
      <SectionTitle eyebrow="05 · NOW LEARNING">NEXT<br />CHAPTER</SectionTitle>
      <div className="focus-list">
        {focusAreas.map(([title, description], index) => (
          <article key={title} data-reveal><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>
        ))}
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section className="credentials section-pad">
      <SectionTitle eyebrow="06 · PROOF OF GROWTH">RECORDS</SectionTitle>
      <div className="score-row" data-reveal>
        <div><strong>4.42</strong><span>/ 4.5</span><p>전체 · 전공 평점</p></div>
        <ul><li>ADsP</li><li>SQLD</li><li>컴퓨터활용능력 1급</li><li>TOEIC Speaking · IH</li></ul>
      </div>
      <div className="award-grid">
        <a className="award-card" href="https://jindevelopment.github.io/Myongji_Portfolio/" target="_blank" rel="noreferrer" data-reveal>
          <div className="award-image"><img src={assetPath('assets/images/portfolio_award.jpg')} alt="포트폴리오 경진대회 대상" /></div>
          <span>2025 · MYONGJI UNIVERSITY</span><h3>포트폴리오 경진대회 대상</h3><p>개발자 포트폴리오 제작 경진대회</p>
        </a>
        <article className="award-card" data-reveal>
          <div className="award-image"><img src={assetPath('assets/images/award.jpg')} alt="AI 활용 경진대회 수상" /></div>
          <span>2025. 10. 01 · MYONGJI UNIVERSITY</span><h3>AI 활용 경진대회</h3><p>Cursor AI 경진대회</p>
        </article>
        <article className="award-card" data-reveal>
          <div className="award-image"><img src={assetPath('assets/images/club.jpg')} alt="FOM 동아리 수료증" /></div>
          <span>2025. 08. 16 · FOM</span><h3>Focus On data-Mining</h3><p>머신러닝 및 딥러닝 과정 수료</p>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact-top" data-reveal>
        <span>HAVE A PROJECT IN MIND?</span>
        <h2>LET'S MAKE<br /><em>IT REAL.</em></h2>
        <a href={links.github} target="_blank" rel="noreferrer" className="contact-button">START A CONVERSATION <Arrow diagonal /></a>
      </div>
      <div className="contact-bottom">
        <div><strong>CHOI JINHYEOK</strong><span>AI DEVELOPER</span></div>
        <nav><a href={links.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={links.blog} target="_blank" rel="noreferrer">TECH BLOG ↗</a><a href={links.resume} target="_blank" rel="noreferrer">RESUME ↗</a></nav>
        <div className="copyright"><span>SEOUL, SOUTH KOREA</span><span>© 2026 CJH</span></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();

  return (
    <div className="app-shell">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Skills />
        <Research />
        <Focus />
        <Credentials />
      </main>
      <Contact />
    </div>
  );
}
