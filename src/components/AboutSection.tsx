import { Target, Eye, Heart, Lock, Lightbulb } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import aboutBg from "@/assets/about-bg.jpg";

const coreValues = [
  { icon: Heart, label: "Uy tín", desc: "Luôn giữ chữ tín trong mọi giao dịch" },
  { icon: Target, label: "Chuyên nghiệp", desc: "Quy trình chuẩn, đội ngũ giỏi" },
  { icon: Eye, label: "Tận tâm", desc: "Đặt lợi ích khách hàng lên đầu" },
  { icon: Lock, label: "Bảo mật", desc: "An toàn thông tin tuyệt đối" },
  { icon: Lightbulb, label: "Đổi mới", desc: "Không ngừng cải tiến công nghệ" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <img src={aboutBg} alt="" loading="lazy" width={1920} height={800} className="w-full h-full object-cover opacity-5" />
      </div>

      <div className="relative container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <ScrollReveal>
              <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Về chúng tôi</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                Đối tác công nghệ <span className="text-gradient">đáng tin cậy</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Công ty TNHH HADOCOM là đơn vị chuyên cung cấp giải pháp hạ tầng công nghệ thông tin, phát triển phần mềm và dịch vụ bảo hành – bảo trì hệ thống cho doanh nghiệp, tổ chức và cơ quan nhà nước.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">🎯 Sứ mệnh</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Trở thành đơn vị cung cấp giải pháp hạ tầng CNTT và phần mềm hàng đầu, được khách hàng tin tưởng lựa chọn trong quá trình chuyển đổi số.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="glass-card rounded-2xl p-6 mt-4">
                <h3 className="text-lg font-bold text-foreground mb-3">🔭 Tầm nhìn</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Cung cấp giải pháp công nghệ tối ưu, đảm bảo hệ thống vận hành ổn định, an toàn và hiệu quả. Đồng hành dài hạn cùng khách hàng trong suốt vòng đời hệ thống.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal direction="right">
              <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Giá trị cốt lõi</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">Core Values</h2>
            </ScrollReveal>
            <div className="grid gap-4">
              {coreValues.map(({ icon: Icon, label, desc }, i) => (
                <ScrollReveal key={label} direction="right" delay={i * 0.1}>
                  <div className="flex items-center gap-4 glass-card rounded-xl p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{label}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
