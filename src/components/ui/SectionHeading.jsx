export default function SectionHeading({ label, title, description }) {
  return (
    <div className="section-heading" data-reveal>
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
