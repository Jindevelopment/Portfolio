import { papers } from '../../data';
import ExternalLink from '../ui/ExternalLink';
import { ArrowUpRight } from '../ui/Icons';
import SectionHeading from '../ui/SectionHeading';

export default function Research() {
  return (
    <section className="research container section" id="research">
      <SectionHeading
        label="04 / 연구 노트"
        title={<>Research<br />notes<span className="dot">.</span></>}
        description="DGIST 연구 인턴 당시 읽고 정리한 논문 리뷰입니다. LLM과 소프트웨어 공학의 접점을 살펴봤습니다."
      />
      <div className="paper-list">
        {papers.map((paper) => (
          <ExternalLink href={paper.file} className="paper-row" key={paper.number}>
            <span className="paper-number">PAPER {paper.number}</span>
            <div className="paper-body">
              <h3>{paper.title}</h3>
              <p>{paper.description}</p>
              <ul className="tags outline">{paper.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <span className="btn btn-outline paper-cta">리뷰 PDF <ArrowUpRight /></span>
          </ExternalLink>
        ))}
      </div>
    </section>
  );
}
