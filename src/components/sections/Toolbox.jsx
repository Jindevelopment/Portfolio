import { focusAreas, skillGroups } from '../../data';
import SectionHeading from '../ui/SectionHeading';

export default function Toolbox() {
  return (
    <section className="toolbox">
      <div className="container section">
        <SectionHeading label="03 / 기술과 학습" title="Toolbox" description="프로젝트에 활용한 기술과 지금 더 깊이 공부하고 있는 분야입니다." />
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.number} data-reveal>
              <div><h3>{group.title}</h3><span>{group.number}</span></div>
              <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
        <div className="learning">
          <span className="section-label">EXPLORING / 학습 중</span>
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
