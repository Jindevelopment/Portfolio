export default function ExternalLink({ href, className, children }) {
  return <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>;
}
