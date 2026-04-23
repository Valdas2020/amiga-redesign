// Variant B — Together: photo-first, warm, conversational

const VariantB = ({ t, openHelp }) => {
  const icons = ["shield", "heart", "waves", "compass"];
  return (
    <div className="vB">
      {/* Hero */}
      <section className="hero">
        <div className="wrap hero-stack">
          <div className="hero-left">
            <div>
              <div className="hero-eyebrow">{t.hero.eyebrow}</div>
              <h1 dangerouslySetInnerHTML={{ __html: t.hero.title.replace(/([^.]+)\.(.*)$/, '$1. <em>$2</em>') }} />
              <p className="lead">{t.hero.subtitle}</p>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={openHelp}>
                  <Icon name="heart" size={18} /> {t.hero.primary}
                </button>
                <a href="#programs" className="btn btn-ghost">{t.hero.secondary}</a>
              </div>
            </div>
            <div className="quick-stats">
              {t.stats.slice(0, 3).map((s, i) => (
                <div key={i} className="qs-item">
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <div className="photo photo-b" />
          </div>
        </div>
      </section>

      {/* Need help */}
      <section className="need">
        <div className="wrap">
          <div className="need-head">
            <span className="eyebrow">— {t.nav.help}</span>
            <h2>{t.needHelp.title}</h2>
            <p>{t.needHelp.subtitle}</p>
          </div>
          <div className="need-grid">
            {t.needHelp.cards.map((c, i) => (
              <button key={i} className="need-card" onClick={openHelp}>
                <div className="icon"><Icon name={icons[i]} size={22} /></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="arrow">{c.cta} <Icon name="arrow" size={14} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="programs" id="programs">
        <div className="wrap">
          <div className="programs-head">
            <div>
              <span className="eyebrow" style={{ color: "var(--b-accent-2)", fontWeight: 600 }}>— {t.programs.eyebrow}</span>
              <h2 style={{ marginTop: 12 }}>{t.programs.title}</h2>
            </div>
          </div>
          <div className="programs-grid">
            {t.programs.items.slice(0, 5).map((p, i) => {
              const photos = [
                "assets/photo-group-talk.avif",
                "assets/photo-circle.avif",
                "assets/photo-art-therapy.avif",
                "assets/photo-kids-art.avif",
                "assets/photo-kids-craft.avif",
              ];
              return (
                <div key={i} className={"program-card" + (i === 0 ? " big" : "")}>
                  <div className="photo" style={{ backgroundImage: `url(${photos[i]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="body">
                    <div className="tag">{p.tag}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="meta">{p.meta}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story">
        <div className="wrap">
          <div className="story-card">
            <div className="photo story-photo" />
            <div className="story-content">
              <span className="eyebrow">— {t.story.eyebrow}</span>
              <div className="story-quote">{t.story.quote}</div>
              <div className="story-author">— {t.story.author}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="support" id="support">
        <div className="wrap">
          <div className="support-grid">
            <div className="support-left">
              <span className="eyebrow">— {t.support.eyebrow}</span>
              <h2>{t.support.title}</h2>
              <p>{t.support.desc}</p>
              <div className="support-amounts">
                {["300", "800", "1500", "∞"].map((a, i) => (
                  <button key={a} className={"amount" + (i === 1 ? " active" : "")}>{a === "∞" ? a : a + " Kč"}</button>
                ))}
              </div>
              <a className="btn btn-primary" href="https://www.darujme.cz/psycholozky-ukrajina" target="_blank" rel="noopener" style={{ background: "var(--b-accent)", width: "100%", justifyContent: "center" }}>
                <Icon name="heart" size={16} /> {t.support.cta}
              </a>
            </div>
            <div className="support-right">
              <div>
                <div style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", opacity: .7, marginBottom: 16 }}>Regular donor</div>
                <div className="big">{t.support.monthly}</div>
                <p>Pravidelná podpora nám pomáhá plánovat programy dlouhodobě — a pomoc zůstává zdarma.</p>
              </div>
              <a href="https://www.darujme.cz/psycholozky-ukrajina" target="_blank" rel="noopener" className="btn btn-ink">
                {t.support.monthly} <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <div className="footer-tagline" style={{ fontSize: 16, color: "rgba(251,247,242,.9)", marginBottom: 20, maxWidth: 320 }}>{t.footer.tagline}</div>
              <div style={{ fontSize: 14, opacity: .7, lineHeight: 1.7 }}>
                {t.footer.address}<br/>{t.footer.contact}
              </div>
            </div>
            <div className="footer-col">
              <h5>{t.footer.sections.help}</h5>
              <a href="#" onClick={openHelp}>{t.nav.help}</a>
              <a href="#programs">{t.nav.programs}</a>
            </div>
            <div className="footer-col">
              <h5>{t.footer.sections.about}</h5>
              <a href="#about">{t.nav.about}</a>
              <a href="#news">{t.nav.news}</a>
              <a href="#">Výroční zprávy</a>
            </div>
            <div className="footer-col">
              <h5>{t.footer.sections.connect}</h5>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Telegram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footer.legal}</span>
            <span>© 2026 AMIGA z.s.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

Object.assign(window, { VariantB });
