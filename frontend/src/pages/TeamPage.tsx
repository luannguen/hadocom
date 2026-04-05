import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, Award, Target, Lightbulb } from "lucide-react";

const teamMembers = [
  { name: "Nguyễn Văn Hà", role: "Giám đốc điều hành", desc: "Hơn 15 năm kinh nghiệm trong lĩnh vực CNTT và hạ tầng mạng doanh nghiệp.", icon: Target },
  { name: "Trần Minh Đức", role: "Giám đốc kỹ thuật", desc: "Chuyên gia về giải pháp phần mềm và kiến trúc hệ thống phức tạp.", icon: Lightbulb },
  { name: "Lê Thị Hương", role: "Trưởng phòng dự án", desc: "Quản lý và triển khai hàng trăm dự án hạ tầng CNTT thành công.", icon: Award },
  { name: "Phạm Quốc Bảo", role: "Trưởng phòng kỹ thuật", desc: "Chuyên gia mạng và bảo mật với chứng chỉ quốc tế Cisco, Fortinet.", icon: Users },
  { name: "Hoàng Anh Tuấn", role: "Kỹ sư phần mềm", desc: "Phát triển các giải pháp ERP, CRM và tự động hóa quy trình.", icon: Lightbulb },
  { name: "Ngô Thanh Mai", role: "Chuyên viên tư vấn", desc: "Tư vấn giải pháp CNTT tối ưu cho doanh nghiệp vừa và nhỏ.", icon: Target },
];

const TeamPage = () => (
  <div className="min-h-screen bg-navy">
    <Navbar />
    {/* Hero */}
    <section className="relative pt-32 pb-20 section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light/80 to-transparent" />
      <div className="container mx-auto relative z-10 text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Đội Ngũ <span className="text-gradient">HADOCOM</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">Đội ngũ chuyên gia giàu kinh nghiệm, tận tâm mang lại giải pháp công nghệ tối ưu cho doanh nghiệp.</p>
        </ScrollReveal>
      </div>
    </section>

    {/* Team Grid */}
    <section className="section-padding bg-navy">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((m, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-8 text-center hover:glow-cyan transition-all duration-300 group">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/30 transition-colors">
                  <m.icon className="w-9 h-9 text-cyan" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{m.name}</h3>
                <p className="text-cyan text-sm font-medium mb-3">{m.role}</p>
                <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-navy-light">
      <div className="container mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white mb-12">Giá Trị Cốt Lõi</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Chuyên nghiệp", desc: "Đội ngũ được đào tạo bài bản, chứng chỉ quốc tế" },
            { title: "Tận tâm", desc: "Luôn đặt lợi ích khách hàng lên hàng đầu" },
            { title: "Sáng tạo", desc: "Không ngừng đổi mới và cập nhật công nghệ mới nhất" },
          ].map((v, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-cyan mb-3">{v.title}</h3>
                <p className="text-white/60">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default TeamPage;
