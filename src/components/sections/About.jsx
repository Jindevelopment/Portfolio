import { links } from '../../data';
import ExternalLink from '../ui/ExternalLink';
import { ArrowUpRight } from '../ui/Icons';

export default function About() {
  return (
    <section className="about container section" id="about">
      <span className="section-label">02 / 소개</span>
      <div className="about-title" data-reveal>
        <h2>Curious<br />builder<span className="dot">.</span></h2>
        <p className="about-lead">왜 필요한지 묻고,<br /><mark>직접 만들어</mark> 답합니다.</p>
      </div>
      <div className="about-body" data-reveal>
        <p>명지대학교 정보통신공학과에서 AI와 머신러닝을 공부합니다. 알약 인식부터 영화 기록, 이력서 분석까지 일상에서 만나는 문제를 프로젝트로 풀어왔습니다. 모델을 만드는 과정과 사용자가 편하게 쓰는 서비스를 만드는 과정 모두에 관심이 있습니다.</p>
        <dl className="facts">
          <div><dt>EDUCATION</dt><dd>명지대학교 정보통신공학과 4학년</dd></div>
          <div><dt>EXPERIENCE</dt><dd>DGIST 연구 인턴 경험</dd></div>
          <div><dt>INTERESTS</dt><dd>Generative AI · Computer Vision</dd></div>
        </dl>
        <ExternalLink href={links.resume} className="btn btn-outline">이력서 자세히 보기 <ArrowUpRight /></ExternalLink>
      </div>
    </section>
  );
}
