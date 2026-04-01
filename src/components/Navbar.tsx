import { useState } from "react";
import { Menu, X, Phone, Download, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Về chúng tôi", href: "/#about" },
  { label: "Dịch vụ", href: "/#services" },
  { label: "Sản phẩm & Dự án", href: "/san-pham" },
  { label: "Lợi thế", href: "/#advantages" },
  { label: "Đối tác", href: "/#partners" },
  { label: "Liên hệ", href: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname === "/") {
        const el = document.querySelector(href.replace("/", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="text-2xl font-bold tracking-wider text-white">
          HADO<span className="text-cyan">COM</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) =>
            l.href.startsWith("/") && !l.href.startsWith("/#") ? (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm font-medium text-white/90 hover:text-cyan transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-sm font-medium text-white/90 hover:text-cyan transition-colors"
              >
                {l.label}
              </a>
            )
          )}
          <a
            href="/HADOCOM-Profile.pdf"
            download
            className="flex items-center gap-1.5 text-sm font-medium text-cyan hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Profile
          </a>
          <a
            href="tel:0775395879"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition shadow-lg shadow-secondary/30"
          >
            <Phone className="w-4 h-4" />
            0775 395 879
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
            {navLinks.map((l) =>
              l.href.startsWith("/") && !l.href.startsWith("/#") ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-white/90 hover:text-cyan transition-colors font-medium"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className="text-white/90 hover:text-cyan transition-colors font-medium"
                >
                  {l.label}
                </a>
              )
            )}
            <a
              href="/HADOCOM-Profile.pdf"
              download
              className="flex items-center gap-2 text-cyan font-medium"
            >
              <FileText className="w-4 h-4" />
              Tải Profile doanh nghiệp
            </a>
            <a
              href="tel:0775395879"
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl text-sm font-semibold w-fit"
            >
              <Phone className="w-4 h-4" />
              0775 395 879
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
