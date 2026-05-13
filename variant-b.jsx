// Variant B — Together: photo-first, warm, conversational

// YouTube card with click-to-embed
// NOTE: Replace the list param with your actual YouTube channel ID (UC…)
//       if the username embed doesn't resolve. Get it from your channel URL.
const YTCard = ({ p }) => {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div className={"program-card program-yt" + (playing ? " yt-playing" : "")}>
      {playing ? (
        <div className="yt-embed-wrap">
          <iframe
            src="https://www.youtube.com/embed/v4K9EirwcW4?list=UUDfqtuukHs-LmPz_BDGAVQQ&autoplay=1"
            width="100%" height="220"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{ display: "block", border: 0 }}
          />
        </div>
      ) : (
        <button className="yt-preview" onClick={() => setPlaying(true)} aria-label="Přehrát video">
          <div className="yt-bg">
            <svg className="yt-play" viewBox="0 0 68 48" width="68" height="48"><path d="M66.5 7.7A8.5 8.5 0 0 0 60.6 1.8C55.3 0 34 0 34 0S12.7 0 7.4 1.8A8.5 8.5 0 0 0 1.5 7.7C0 13.1 0 24 0 24s0 10.9 1.5 16.3a8.5 8.5 0 0 0 5.9 5.9C12.7 48 34 48 34 48s21.3 0 26.6-1.8a8.5 8.5 0 0 0 5.9-5.9C68 34.9 68 24 68 24s0-10.9-1.5-16.3z" fill="#FF0000"/><path d="M27 34l18-10-18-10v20z" fill="#fff"/></svg>
            <div className="yt-channel">@amiga.migrant</div>
          </div>
        </button>
      )}
      <div className="body">
        <div className="tag">{p.tag}</div>
        <h3>{p.title}</h3>
        <p style={{ whiteSpace: "pre-line" }}>{p.desc}</p>
        <a href={p.youtube} target="_blank" rel="noopener" className="yt-cta">
          Sledovat na YouTube <Icon name="arrow" size={13} />
        </a>
      </div>
    </div>
  );
};

const VariantB = ({ t, openHelp }) => {
  const icons = ["shield", "heart", "waves", "compass"];
  return (
    <div className="vB">
      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
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
            <div className="hero-photo-panel">
              <img src="mp4ahv98-podpora.avif" alt="Podpora" className="hero-photo-img" />
            </div>
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
            {t.programs.items.map((p, i) => {
              const photos = [
                "mp49lowj-psycholog.avif",
                "mp492nuq-Skupinova-podpora.avif",
                "mp49o3b2-belgicka.avif",
              ];
              if (p.youtube) {
                return <YTCard key={i} p={p} />;
              }
              return (
                <div key={i} className="program-card">
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
