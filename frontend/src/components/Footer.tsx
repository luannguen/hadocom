import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSettings, useNavigation } from "@/hooks/useData";

const Footer = () => {
  const { t } = useTranslation();
  const { data: settings } = useSettings();
  const { data: footerItems } = useNavigation('footer');
  const location = useLocation();

  const slogan = settings?.company_slogan || t("footer.slogan");

  const defaultFooterLinks = [
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.products"), href: "/san-pham" },
    { label: t("nav.contact"), href: "/#contact" },
    { label: t("faq.label"), href: "/faq" },
  ];

  const links = (footerItems && footerItems.length > 0)
    ? footerItems.map(item => ({ label: t(item.label), href: item.path }))
    : defaultFooterLinks;

  return (
    <footer className="bg-navy border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-2">
              {settings?.logo_url ? (
                <img 
                  src={settings.logo_url} 
                  alt={settings?.site_title || "HADOCOM"} 
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLElement).parentElement;
                    if (parent && !parent.querySelector('.text-logo')) {
                      const span = document.createElement('span');
                      span.className = 'text-logo text-xl font-bold text-white';
                      span.innerHTML = 'HADO<span class="text-cyan">COM</span>';
                      parent.appendChild(span);
                    }
                  }}
                />
              ) : (
                <span className="text-xl font-bold text-white">HADO<span className="text-cyan">COM</span></span>
              )}
            </Link>
            <p className="text-white/50 text-sm mt-2 max-w-xs">{slogan}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t("footer.links")}</h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isHash = link.href.startsWith("/#");
                const handleClick = () => {
                  if (isHash && location.pathname === "/") {
                    const el = document.querySelector(link.href.replace("/", ""));
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                };

                if (isHash) {
                  return (
                    <a key={link.href} href={link.href} onClick={handleClick} className="text-sm text-white/50 hover:text-cyan transition">
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link key={link.href} to={link.href} className="text-sm text-white/50 hover:text-cyan transition">
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">{t("footer.download")}</h4>
            <a href="/HADOCOM-Profile.pdf" download className="text-sm text-cyan hover:text-white transition">
              📄 {t("footer.profilePdf")}
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">
            {settings?.copyright_text || `© ${new Date().getFullYear()} HADOCOM. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
