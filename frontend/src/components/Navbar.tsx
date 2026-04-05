import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Download, ChevronDown, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/hooks/useData";

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

const NavLinkItem = ({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) => {
  const location = useLocation();
  const isHash = href.startsWith("/#");
  const isActive = !isHash && location.pathname === href;

  const handleClick = () => {
    onClick?.();
    if (isHash && location.pathname === "/") {
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isHash) {
    return (
      <Link to={href} onClick={handleClick} className={`text-sm font-medium transition-colors ${isActive ? "text-cyan" : "text-white/90 hover:text-cyan"}`}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} onClick={handleClick} className="text-sm font-medium text-white/90 hover:text-cyan transition-colors">
      {label}
    </a>
  );
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { data: settings } = useSettings();
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExplore, setMobileExplore] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const mainLinks = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.products"), href: "/san-pham" },
    { label: t("nav.advantages"), href: "/#advantages" },
    { label: t("nav.partners"), href: "/#partners" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  const exploreLinks = [
    { label: t("nav.team"), href: "/doi-ngu" },
    { label: t("nav.policy"), href: "/chinh-sach" },
    { label: t("nav.news"), href: "/tin-tuc" },
    { label: t("nav.gallery"), href: "/thu-vien" },
    { label: t("nav.events"), href: "/su-kien" },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setExploreOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="text-2xl font-bold tracking-wider text-white">
          HADO<span className="text-cyan">COM</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          {mainLinks.map(l => <NavLinkItem key={l.href} label={l.label} href={l.href} />)}

          {/* Explore dropdown */}
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setExploreOpen(!exploreOpen)} className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-cyan transition-colors">
              {t("nav.explore")} <ChevronDown className={`w-4 h-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
            </button>
            {exploreOpen && (
              <div className="absolute top-full right-0 mt-3 w-48 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden animate-fade-in">
                {exploreLinks.map(l => (
                  <Link key={l.href} to={l.href} onClick={() => setExploreOpen(false)} className="block px-5 py-3 text-sm text-white/80 hover:text-cyan hover:bg-white/5 transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-cyan transition-colors">
              <Globe className="w-4 h-4" />
              {currentLang.flag}
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-3 w-40 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden animate-fade-in">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors flex items-center gap-2 ${lang.code === i18n.language ? "text-cyan bg-white/5" : "text-white/80 hover:text-cyan hover:bg-white/5"}`}
                  >
                    <span>{lang.flag}</span> {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="/HADOCOM-Profile.pdf" download className="flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-white transition-colors">
            <Download className="w-4 h-4" /> {t("nav.profile")}
          </a>
          <a href={`tel:${settings?.company_phone?.replace(/\s/g, '') || "0775395879"}`} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition shadow-lg shadow-secondary/30">
            <Phone className="w-4 h-4" /> {settings?.company_phone || "0775 395 879"}
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 animate-fade-in">
          <div className="flex flex-col p-5 gap-4">
            {mainLinks.map(l => <NavLinkItem key={l.href} label={l.label} href={l.href} onClick={() => setOpen(false)} />)}

            <button onClick={() => setMobileExplore(!mobileExplore)} className="flex items-center gap-1 text-white/90 font-medium text-sm">
              {t("nav.explore")} <ChevronDown className={`w-4 h-4 transition-transform ${mobileExplore ? "rotate-180" : ""}`} />
            </button>
            {mobileExplore && (
              <div className="pl-4 flex flex-col gap-3 border-l-2 border-cyan/30">
                {exploreLinks.map(l => (
                  <Link key={l.href} to={l.href} onClick={() => { setOpen(false); setMobileExplore(false); }} className="text-sm text-white/70 hover:text-cyan transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile language */}
            <div className="flex items-center gap-2">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${lang.code === i18n.language ? "bg-secondary text-secondary-foreground" : "bg-white/10 text-white/70 hover:text-white"}`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </button>
              ))}
            </div>

            <a href="/HADOCOM-Profile.pdf" download className="flex items-center gap-2 text-cyan font-medium text-sm">
              <Download className="w-4 h-4" /> {t("nav.downloadProfile")}
            </a>
            <a href={`tel:${settings?.company_phone?.replace(/\s/g, '') || "0775395879"}`} className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl text-sm font-semibold w-fit">
              <Phone className="w-4 h-4" /> {settings?.company_phone || "0775 395 879"}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
