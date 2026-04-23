// Help modal — handoff to Telegram bot
const HelpModal = ({ open, onClose, t }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 90, background: "rgba(12,10,8,.55)",
      backdropFilter: "blur(6px)", display: "grid", placeItems: "center", padding: 20,
      animation: "splashIn .25s ease"
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 24, maxWidth: 520, width: "100%",
        padding: 40, position: "relative", color: "#1A1613"
      }}>
        <button onClick={onClose} style={{ position: "absolute", right: 20, top: 20, color: "#8B7866" }}>
          <Icon name="close" size={22} />
        </button>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: "#E8C9B3", color: "#C65A2E", display: "grid", placeItems: "center", marginBottom: 20 }}>
          <Icon name="bot" size={30} />
        </div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12 }}>
          {t.hero.primary}
        </h2>
        <p style={{ color: "#55463A", fontSize: 16, lineHeight: 1.55, marginBottom: 24 }}>
          {t.needHelp.subtitle}
        </p>
        <div style={{ background: "#F6F1EA", borderRadius: 14, padding: 18, marginBottom: 20, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#229ED9", display: "grid", placeItems: "center", color: "#fff" }}>
            <Icon name="chat" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <strong style={{ display: "block", fontSize: 15 }}>@dumka_reg_bot</strong>
            <span style={{ fontSize: 13, color: "#8B7866" }}>Anonymně · Bezpečně · Zdarma</span>
          </div>
        </div>
        <a href="https://t.me/dumka_reg_bot" target="_blank" rel="noopener"
          className="btn btn-primary"
          style={{ background: "#C65A2E", width: "100%", justifyContent: "center", padding: "16px 24px" }}>
          <Icon name="chat" size={16} /> Otevřít v Telegramu
        </a>
        <p style={{ fontSize: 12, color: "#8B7866", textAlign: "center", marginTop: 16 }}>
          Krize? Zavolejte 116 006 (linka pro oběti)
        </p>
      </div>
    </div>
  );
};

// Main app
const App = () => {
  const TWEAKS = /*EDITMODE-BEGIN*/{
    "variant": "B",
    "lang": "cz",
    "fontSize": 17,
    "skipSplash": false
  }/*EDITMODE-END*/;

  const [splashDone, setSplashDone] = useState(TWEAKS.skipSplash || !!localStorage.getItem("amiga_splash"));
  const [lang, setLang] = useState(() => localStorage.getItem("amiga_lang") || TWEAKS.lang);
  const [variant, setVariant] = useState("B");
  const [fs, setFs] = useState(() => +localStorage.getItem("amiga_fs") || TWEAKS.fontSize);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => { localStorage.setItem("amiga_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("amiga_variant", variant); document.body.dataset.variant = variant; }, [variant]);
  useEffect(() => { localStorage.setItem("amiga_fs", fs); document.documentElement.style.setProperty("--fs-base", fs + "px"); }, [fs]);

  // Tweaks host integration
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { variant, lang, fontSize: fs } }, "*");
  }, [variant, lang, fs]);

  const handleSplashPick = (code) => {
    setLang(code);
    setSplashDone(true);
    localStorage.setItem("amiga_splash", "1");
  };

  const t = window.AMIGA_CONTENT[lang];
  const openHelp = (e) => { if (e) e.preventDefault(); setHelpOpen(true); };
  const cycleLang = () => {
    const codes = LANGS.map(l => l.code);
    setLang(codes[(codes.indexOf(lang) + 1) % codes.length]);
  };

  return (
    <>
      {!splashDone && <Splash onPick={handleSplashPick} />}
      <Topbar t={t} lang={lang} onLangClick={cycleLang} onHelp={openHelp} />
      <VariantB t={t} openHelp={openHelp} />
      <Tweaks open={tweaksOpen} onClose={() => setTweaksOpen(false)} variant={variant} setVariant={setVariant} lang={lang} setLang={setLang} fs={fs} setFs={setFs} />
      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} t={t} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
