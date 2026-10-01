import Header from './components/layout/Header';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Projects from './components/sections/Projects';
import Records from './components/sections/Records';
import Research from './components/sections/Research';
import Toolbox from './components/sections/Toolbox';
import useReveal from './hooks/useReveal';

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
