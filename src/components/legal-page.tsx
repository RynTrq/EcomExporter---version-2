export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section legal-page">
      <div className="container legal-grid">
        <aside data-reveal="">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>Last updated {updated}</p>
        </aside>
        <article
          className="legal-content"
          data-reveal=""
          style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
        >
          {children}
        </article>
      </div>
    </section>
  );
}
