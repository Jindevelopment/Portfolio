import { useMemo, useState } from 'react';
import { projects } from '../../data';
import ExternalLink from '../ui/ExternalLink';
import { ArrowUpRight } from '../ui/Icons';
import SectionHeading from '../ui/SectionHeading';

const filters = [['all', '전체'], ['ai', 'AI / ML'], ['web', 'Web'], ['data', 'Data']];

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-card ${featured ? 'featured' : ''}`} data-reveal>
      <div className="project-visual" style={{ '--card-color': project.color }} aria-hidden="true">
        <span className="visual-number">{project.number}{featured && ' — FEATURED'}</span>
        <span className="visual-orb">{project.emoji}</span>
        <b>{project.word}</b>
      </div>
      <div className="project-info">
        <div className="project-meta"><span>{project.subtitle}</span><span>{project.period}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        <div className="project-action">
          {project.href
            ? <ExternalLink href={project.href} className="btn btn-outline">{project.linkLabel} <ArrowUpRight /></ExternalLink>
            : <span className="muted">데이터 분석 프로젝트 · 공개 자료 없음</span>}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );
  const [featured, ...rest] = filtered;

  return (
    <section className="projects container section" id="projects">
      <SectionHeading
        label="01 / 프로젝트"
        title={<>Selected work<span className="dot">.</span></>}
        description="일상의 문제에서 출발한 다섯 가지 프로젝트. AI, 웹, 데이터로 해결 방법을 탐색했습니다."
      />
      <div className="filters" role="group" aria-label="프로젝트 필터">
        {filters.map(([value, label]) => (
          <button key={value} type="button" className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} aria-pressed={filter === value}>
            {label}<span>{value === 'all' ? projects.length : projects.filter((project) => project.category === value).length}</span>
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
