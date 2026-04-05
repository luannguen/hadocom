import { motion } from "framer-motion";
import { Server, Code, Wrench, Cloud, Wifi, Database, Monitor, ShieldCheck, ArrowRight, Network, HardDrive, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import projectsHero from "@/assets/projects-hero.jpg";
import infrastructureBg from "@/assets/infrastructure-bg.jpg";
import softwareBg from "@/assets/software-bg.jpg";
import maintenanceBg from "@/assets/maintenance-bg.jpg";

const infrastructureProducts = [
  { icon: Server, name: "Máy chủ (Server)", desc: "Dell, HP, Fujitsu, Huawei – đa dạng cấu hình từ SMB đến Enterprise" },
  { icon: HardDrive, name: "Hệ thống lưu trữ (Storage)", desc: "NetApp, EMC, Dell – SAN, NAS, backup storage" },
  { icon: Network, name: "Thiết bị mạng", desc: "Cisco, Juniper, Huawei – Switch, Router, Firewall" },
  { icon: Wifi, name: "WiFi doanh nghiệp", desc: "Giải pháp WiFi tốc độ cao, phủ sóng rộng, quản lý tập trung" },
  { icon: Database, name: "Trung tâm dữ liệu", desc: "Thiết kế, xây dựng và vận hành Data Center theo tiêu chuẩn" },
  { icon: Cloud, name: "Điện toán đám mây", desc: "Cloud migration, hybrid cloud, multi-cloud management" },
];

const softwareProducts = [
  { name: "ERP", desc: "Quản lý tổng thể doanh nghiệp – tài chính, kho, sản xuất, nhân sự" },
  { name: "CRM", desc: "Quản lý quan hệ khách hàng, pipeline bán hàng, chăm sóc sau bán" },
  { name: "HRM", desc: "Quản lý nhân sự, chấm công, tính lương, đánh giá KPI" },
  { name: "POS", desc: "Hệ thống bán hàng, quản lý tồn kho, báo cáo doanh thu" },
  { name: "Kế toán", desc: "Phần mềm kế toán tài chính, thuế, báo cáo tuân thủ" },
  { name: "Custom Dev", desc: "Phát triển ứng dụng Web & Mobile theo yêu cầu riêng" },
];

const projects = [
  {
    title: "Triển khai hạ tầng mạng doanh nghiệp",
    desc: "Thiết kế và triển khai hệ thống mạng LAN/WAN, WiFi, firewall cho tòa nhà văn phòng quy mô 500+ nhân viên.",
    tags: ["Cisco", "Firewall", "WiFi"],
    image: infrastructureBg,
  },
  {
    title: "Xây dựng hệ thống ERP",
    desc: "Phát triển và triển khai phần mềm ERP tích hợp quản lý kho, bán hàng và tài chính cho chuỗi phân phối.",
    tags: ["ERP", "Web App", "API"],
    image: softwareBg,
  },
  {
    title: "Bảo trì hệ thống IT 24/7",
    desc: "Dịch vụ bảo trì, giám sát và hỗ trợ kỹ thuật cho hạ tầng CNTT của cơ quan nhà nước.",
    tags: ["24/7", "Monitoring", "Backup"],
    image: maintenanceBg,
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={projectsHero} alt="" width={1920} height={900} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>
        <div className="relative container mx-auto px-4 pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-sm font-semibold text-cyan uppercase tracking-widest">HADOCOM</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-3 mb-4">
              Sản phẩm & <span className="text-gradient">Dự án</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Khám phá hệ sinh thái giải pháp công nghệ và các dự án tiêu biểu mà HADOCOM đã triển khai thành công.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Products */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Hạ tầng</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Sản phẩm hạ tầng CNTT</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Cung cấp thiết bị và giải pháp từ các hãng công nghệ hàng đầu thế giới
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {infrastructureProducts.map(({ icon: Icon, name, desc }, i) => (
              <ScrollReveal key={name} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Software Products */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="relative container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-cyan uppercase tracking-widest">Phần mềm</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Giải pháp phần mềm</h2>
              <p className="text-white/60 mt-3 max-w-xl mx-auto">
                Phần mềm linh hoạt, dễ sử dụng, bảo mật cao và phù hợp với từng ngành nghề
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {softwareProducts.map(({ name, desc }, i) => (
              <ScrollReveal key={name} delay={i * 0.08}>
                <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 hover:bg-white/15 hover:border-white/25 hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-secondary/20 text-cyan text-sm font-bold mb-4">
                    {name}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Dự án</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">Dự án tiêu biểu</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Một số dự án HADOCOM đã triển khai thành công cho khách hàng
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map(({ title, desc, tags, image }, i) => (
              <ScrollReveal key={title} delay={i * 0.15}>
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bạn cần giải pháp phù hợp?</h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Liên hệ ngay để được tư vấn miễn phí về giải pháp công nghệ cho doanh nghiệp của bạn.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition shadow-xl shadow-secondary/30"
            >
              Liên hệ tư vấn <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductsPage;
