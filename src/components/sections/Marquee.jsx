export default function Marquee() {
  const items = ['AI ENGINEERING', 'PRODUCT THINKING', 'MACHINE LEARNING', 'FULL-STACK DEVELOPMENT'];
  const row = items.flatMap((item) => [<span key={item}>{item}</span>, <b key={`${item}-star`}>✦</b>]);

  return <div className="marquee" aria-hidden="true"><div><p>{row}</p><p>{row}</p></div></div>;
}
