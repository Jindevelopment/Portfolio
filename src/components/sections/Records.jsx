import { awards, certificates } from '../../data';
import ExternalLink from '../ui/ExternalLink';
import SectionHeading from '../ui/SectionHeading';

export default function Records() {
  return (
    <section className="records container section" id="records">
      <SectionHeading label="05 / 수상·기록" title={<>Milestones<span className="dot">.</span></>} description="프로젝트와 학습을 이어오며 남긴 수상, 수료, 자격 기록입니다." />
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
            ? <ExternalLink key={award.title} href={award.href} className="award-card">{content}</ExternalLink>
            : <article key={award.title} className="award-card">{content}</article>;
        })}
      </div>
      <div className="record-row" data-reveal>
        <div className="gpa-card">
          <span>학점 / 4.5 만점</span>
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
