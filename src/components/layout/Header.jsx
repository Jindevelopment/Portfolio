import { useEffect, useState } from 'react';
import { links } from '../../data';
import ExternalLink from '../ui/ExternalLink';
import { ArrowUpRight } from '../ui/Icons';

const navItems = [
  ['프로젝트', '#projects'],
  ['소개', '#about'],
  ['연구', '#research'],
  ['수상·기록', '#records'],
];

export default function Header() {
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
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
    };
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
          <ExternalLink href={links.resume} className="btn btn-outline btn-sm hide-mobile">이력서 <ArrowUpRight /></ExternalLink>
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
          <ExternalLink href={links.github}>GitHub ↗</ExternalLink>
          <ExternalLink href={links.blog}>Blog ↗</ExternalLink>
          <ExternalLink href={links.resume}>Resume ↗</ExternalLink>
        </div>
      </div>
    </>
  );
}
