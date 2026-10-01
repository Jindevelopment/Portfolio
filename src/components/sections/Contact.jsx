import { emails, links } from '../../data';
import ExternalLink from '../ui/ExternalLink';

export default function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="container">
        <div className="contact-main" data-reveal>
          <div>
            <span className="section-label">06 / 연락</span>
            <h2>Let's build<br />together<span className="dot">.</span></h2>
          </div>
          <div className="contact-actions">
            <p>함께 풀어보고 싶은 문제가 있나요?<br />채용, 프로젝트 협업, 연구 제안을 기다립니다.</p>
            {emails.map((email, index) => (
              <a key={email.address} href={`mailto:${email.address}`} className={`email-button ${index === 0 ? 'primary' : ''}`}>
                <span>{email.address}</span><small>{email.label}</small>
              </a>
            ))}
            <div className="contact-links">
              <ExternalLink href={links.github} className="btn btn-outline">GitHub ↗</ExternalLink>
              <ExternalLink href={links.blog} className="btn btn-outline">Blog ↗</ExternalLink>
              <ExternalLink href={links.resume} className="btn btn-outline">Resume ↗</ExternalLink>
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
