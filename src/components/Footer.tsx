import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-xl font-bold text-white">
              HADO<span className="text-cyan">COM</span>
            </span>
            <p className="text-white/50 text-sm mt-2 max-w-xs">
              Công nghệ vững chắc – Vận hành bền bỉ – Đồng hành dài lâu
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Liên kết</h4>
            <div className="flex flex-col gap-2">
              <a href="/#about" className="text-sm text-white/50 hover:text-cyan transition">Về chúng tôi</a>
              <a href="/#services" className="text-sm text-white/50 hover:text-cyan transition">Dịch vụ</a>
              <Link to="/san-pham" className="text-sm text-white/50 hover:text-cyan transition">Sản phẩm & Dự án</Link>
              <a href="/#contact" className="text-sm text-white/50 hover:text-cyan transition">Liên hệ</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Tải về</h4>
            <a href="/HADOCOM-Profile.pdf" download className="text-sm text-cyan hover:text-white transition">
              📄 Profile doanh nghiệp (PDF)
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} HADOCOM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
