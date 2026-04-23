// Shared React components for AMIGA redesign
const { useState, useEffect, useRef } = React;

// ——————————————————————————————————————————————————————
// Icons
// ——————————————————————————————————————————————————————
const Icon = ({ name, size = 22 }) => {
  const paths = {
    shield: <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
    waves: <path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-2 5-5 2 2-5 5-2z" /></>,
    phone: <path d="M5 4h4l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    chat: <path d="M4 5h16v11H8l-4 4V5z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 19c0-3 3-5 6-5s6 2 6 5M15 19c0-2 2-3 4-3s2 1 2 3" /></>,
    heart_hand: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />,
    arrow: <path d="M5 12h14m-5-5l5 5-5 5" />,
    check: <path d="M5 13l4 4L19 7" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    bot: <><rect x="4" y="7" width="16" height="12" rx="3" /><circle cx="9" cy="13" r="1.2" fill="currentColor" /><circle cx="15" cy="13" r="1.2" fill="currentColor" /><path d="M12 3v4M9 17h6" /></>,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    star: <path d="M12 3l2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5 9.5 9z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ——————————————————————————————————————————————————————
// Brand / Logo
// ——————————————————————————————————————————————————————
const BrandLogo = ({ height = 36 }) => (
  <img
    src="assets/amiga-logo.avif"
    alt="AMIGA — Agency for Migration and Adaptation"
    style={{ height, width: "auto", display: "block" }}
  />
);

// ——————————————————————————————————————————————————————
// Splash
// ——————————————————————————————————————————————————————
const LANGS = [
  { code: "cz", name: "Čeština", native: "Pokračovat v češtině", flag: "🇨🇿" },
  { code: "uk", name: "Українська", native: "Продовжити українською", flag: "🇺🇦" },
  { code: "ru", name: "Русский", native: "Продолжить на русском", flag: "🌍" },
  { code: "en", name: "English", native: "Continue in English", flag: "🇬🇧" },
];

const Splash = ({ onPick }) => {
  const [hiding, setHiding] = useState(false);
  const pick = (code) => {
    setHiding(true);
    setTimeout(() => onPick(code), 380);
  };
  return (
    <div className={"splash" + (hiding ? " hide" : "")}>
      <div className="splash-inner">
        <div className="splash-logo">
          <BrandLogo height={64} />
        </div>
        <h1>Vítejte · Ласкаво просимо · Добро пожаловать · Welcome</h1>
        <p>Выберите язык / Оберіть мову / Vyberte jazyk / Choose your language</p>
        <div className="splash-langs">
          {LANGS.map((l) => (
            <button key={l.code} className="splash-lang" onClick={() => pick(l.code)}>
              <div>
                <strong>{l.name}</strong>
                <span>{l.native}</span>
              </div>
              <div style={{ fontSize: 22 }}>{l.flag}</div>
            </button>
          ))}
        </div>
        <p style={{ marginTop: 36, fontSize: 13, color: "#8B7866" }}>
          Безопасно · Анонимно · Бесплатно
        </p>
      </div>
    </div>
  );
};

// ——————————————————————————————————————————————————————
// Topbar (shared, themed via body[data-variant])
// ——————————————————————————————————————————————————————
const Topbar = ({ t, lang, onLangClick, onHelp }) => (
  <div className="topbar">
    <div className="wrap topbar-inner">
      <a href="#" className="brand">
        <BrandLogo height={42} />
      </a>
      <nav>
        <a href="#programs">{t.nav.programs}</a>
        <a href="#about">{t.nav.about}</a>
        <a href="#support">{t.nav.support}</a>
        <a href="#news">{t.nav.news}</a>
      </nav>
      <div className="topbar-right">
        <button className="lang-pill" onClick={onLangClick}>
          <Icon name="globe" size={14} /> {lang.toUpperCase()}
        </button>
        <button className="btn btn-primary" onClick={onHelp}>
          <Icon name="heart" size={16} /> {t.nav.help}
        </button>
      </div>
    </div>
  </div>
);

// ——————————————————————————————————————————————————————
// Tweaks panel
// ——————————————————————————————————————————————————————
const Tweaks = ({ open, onClose, variant, setVariant, lang, setLang, fs, setFs }) => {
  if (!open) return null;
  return (
    <div className="tweaks open" role="dialog" aria-label="Tweaks">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <strong style={{ fontSize: 14 }}>Tweaks</strong>
        <button onClick={onClose} style={{ color: "#B8A99A" }}><Icon name="close" size={16} /></button>
      </div>
      <div className="tweaks-row">
        <h4>Language</h4>
        <div className="tweaks-grid">
          {LANGS.map((l) => (
            <button key={l.code} className={lang === l.code ? "active" : ""} onClick={() => setLang(l.code)}>
              {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="tweaks-row">
        <h4>Font size: {fs}px</h4>
        <input type="range" min="14" max="22" value={fs} onChange={(e) => setFs(+e.target.value)} className="tweaks-slider" />
      </div>
    </div>
  );
};

Object.assign(window, { Icon, BrandLogo, Splash, Topbar, Tweaks, LANGS });
