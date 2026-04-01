import { Download, FileText } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ProfileDownload = () => {
  return (
    <section className="relative py-16 overflow-hidden bg-navy">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                <FileText className="w-8 h-8 text-cyan" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Tải Profile doanh nghiệp</h3>
                <p className="text-white/60 text-sm mt-1">Tìm hiểu chi tiết về HADOCOM qua hồ sơ năng lực</p>
              </div>
            </div>
            <a
              href="/HADOCOM-Profile.pdf"
              download
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition shadow-xl shadow-secondary/30 whitespace-nowrap"
            >
              <Download className="w-5 h-5" />
              Tải PDF
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProfileDownload;
