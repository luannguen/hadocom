import { Server, Code, Wrench, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import techPattern from "@/assets/tech-pattern.jpg";
import infrastructureBg from "@/assets/infrastructure-bg.jpg";
import softwareBg from "@/assets/software-bg.jpg";
import maintenanceBg from "@/assets/maintenance-bg.jpg";

const services = [
  {
    icon: Server,
    title: "Hạ tầng CNTT",
    desc: "Máy chủ, hệ thống lưu trữ, thiết bị mạng, WiFi doanh nghiệp, Data Center và giải pháp Cloud.",
    features: ["Máy chủ (Server)", "Hệ thống lưu trữ (Storage)", "Thiết bị mạng", "Trung tâm dữ liệu"],
    image: infrastructureBg,
  },
  {
    icon: Code,
    title: "Phát triển phần mềm",
    desc: "ERP, CRM, HRM, phần mềm quản lý bán hàng, kế toán và phát triển theo yêu cầu.",
    features: ["ERP / CRM / HRM", "Phần mềm bán hàng", "Web & Mobile App", "Phát triển tùy chỉnh"],
    image: softwareBg,
  },
  {
    icon: Wrench,
    title: "Bảo hành & Bảo trì",
    desc: "Bảo trì định kỳ, tối ưu hiệu suất, xử lý sự cố 24/7, giám sát và sao lưu dữ liệu.",
    features: ["Bảo trì định kỳ", "Xử lý sự cố 24/7", "Giám sát từ xa", "Sao lưu & khôi phục"],
    image: maintenanceBg,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={techPattern} alt="" loading="lazy" width={1920} height={800} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/90" />
      </div>

      <div className="relative container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan uppercase tracking-widest">Dịch vụ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">Lĩnh vực hoạt động</h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto">
              Giải pháp được thiết kế theo nhu cầu thực tế, đảm bảo khả năng mở rộng và tối ưu ngân sách.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, desc, features, image }, i) => (
            <ScrollReveal key={title} delay={i * 0.15}>
              <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl hover:bg-white/15 hover:border-white/25 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                {/* Card image header */}
                <div className="relative h-40 overflow-hidden">
                  <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/70 text-sm mb-6 leading-relaxed">{desc}</p>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
