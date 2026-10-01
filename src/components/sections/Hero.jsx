import { links, stats } from '../../data';
import assetPath from '../../utils/assetPath';
import ExternalLink from '../ui/ExternalLink';
import { ArrowDown, ArrowUpRight } from '../ui/Icons';

export default function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="hero-main">
        <div className="hero-copy">
          <div className="hero-kicker hero-enter">
            <span className="chip-accent"><i /> OPEN TO WORK</span>
            <span className="muted">AI DEVELOPER · SEOUL</span>
          </div>
          <h1 className="hero-enter delay-1"><span>AI</span><span className="hero-title-outline">TO</span><span>REAL LIFE<span className="dot">.</span></span></h1>
          <p className="hero-tagline hero-enter delay-2">For a tomorrow better than today</p>
          <p className="hero-lead hero-enter delay-2">
            안녕하세요, <strong>최진혁</strong>입니다. AI로 일상의 문제를 해결하고,
            아이디어를 작동하는 서비스로 구현합니다.
          </p>
          <p className="hero-education hero-enter delay-2">명지대학교 정보통신공학과 4학년 · AI / ML</p>
          <div className="hero-actions hero-enter delay-2">
            <a href="#projects" className="btn btn-solid btn-lg">프로젝트 보기 <ArrowDown /></a>
            <ExternalLink href={links.github} className="btn btn-outline btn-lg">GitHub <ArrowUpRight /></ExternalLink>
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
