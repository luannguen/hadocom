import { Users, Settings, DollarSign, Zap, Lock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const advantages = [
  { icon: Users, title: "Đội ngũ chuyên môn cao", desc: "Kỹ sư có kinh nghiệm, được đào tạo bài bản và cập nhật công nghệ mới" },
  { icon: Settings, title: "Giải pháp tùy chỉnh", desc: "Thiết kế theo đúng nhu cầu và đặc thù của từng mô hình doanh nghiệp" },
  { icon: DollarSign, title: "Chi phí minh bạch", desc: "Báo giá rõ ràng, hợp lý, không phát sinh chi phí ẩn" },
  { icon: Zap, title: "Hỗ trợ nhanh chóng", desc: "Cam kết thời gian phản hồi nhanh, xử lý sự cố kịp thời 24/7" },
  { icon: Lock, title: "An toàn thông tin", desc: "Cam kết bảo mật và an toàn dữ liệu cho mọi hệ thống" },
];

const AdvantagesSection = () => {
  return (
    <section id="advantages" className="section-padding bg-background">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Lợi thế</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
              Vì sao chọn <span className="text-gradient">HADOCOM</span>?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className={`glass-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
