import { motion } from "framer-motion";
import { Server, Code, Wrench, Cloud, Wifi, Database, Monitor, ShieldCheck, ArrowRight, Network, HardDrive, Lock, HelpCircle, Package } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useProducts, useProjects, useCategories } from "@/hooks/useData";
import projectsHero from "@/assets/projects-hero.jpg";
import infrastructureBg from "@/assets/infrastructure-bg.jpg";
import softwareBg from "@/assets/software-bg.jpg";
import maintenanceBg from "@/assets/maintenance-bg.jpg";

const iconMap: Record<string, any> = {
  Server,
  HardDrive,
  Network,
  Wifi,
  Database,
  Cloud,
  Code,
  Monitor,
  ShieldCheck,
  Lock
};

const imageMap: Record<string, string> = {
  "@/assets/infrastructure-bg.jpg": infrastructureBg,
  "@/assets/software-bg.jpg": softwareBg,
  "@/assets/maintenance-bg.jpg": maintenanceBg,
};

const ProductsPage = () => {
    const { data: allCategories, isLoading: categoriesLoading } = useCategories('product');
    const { data: allProducts, isLoading: productsLoading } = useProducts();
    const { data: allProjects, isLoading: projectsLoading } = useProjects();
  
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
  
        {/* Dynamic Product Categories */}
        {categoriesLoading || productsLoading ? (
          <section className="section-padding flex items-center justify-center min-h-[400px]">
             <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin"></div>
               <p className="text-muted-foreground animate-pulse">Đang tải sản phẩm...</p>
             </div>
          </section>
        ) : (
          allCategories?.map((category, index) => {
            const products = allProducts?.filter(p => 
              typeof p.category === 'object' 
                ? p.category?.id === category.id 
                : p.category_id === category.id
            ) || [];

            if (products.length === 0) return null;

            return (
              <section key={category.id} className={`section-padding ${index % 2 === 1 ? 'bg-navy relative overflow-hidden' : 'bg-background text-foreground'}`}>
                {index % 2 === 1 && <div className="absolute inset-0 bg-navy" />}
                <div className="relative container mx-auto">
                  <ScrollReveal>
                    <div className="text-center mb-16">
                      <span className={`text-sm font-semibold uppercase tracking-widest ${index % 2 === 1 ? 'text-cyan' : 'text-secondary'}`}>
                        {category.name}
                      </span>
                      <h2 className={`text-3xl md:text-4xl font-bold mt-3 ${index % 2 === 1 ? 'text-white' : 'text-foreground'}`}>
                        {category.description || `Giải pháp ${category.name}`}
                      </h2>
                    </div>
                  </ScrollReveal>
        
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {products.map((p, i) => {
                      const Icon = p.icon ? (iconMap[p.icon] || HelpCircle) : Server;
                      const isDarkSection = index % 2 === 1;

                      return (
                        <ScrollReveal key={p.id} delay={i * 0.08}>
                          <div className={`rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 h-full ${
                            isDarkSection 
                              ? 'bg-white/10 backdrop-blur-xl border border-white/15 hover:bg-white/15 hover:border-white/25' 
                              : 'glass-card border border-black/5 hover:shadow-xl'
                          }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDarkSection ? 'bg-cyan/10' : 'bg-primary/10'}`}>
                              <Icon className={`w-6 h-6 ${isDarkSection ? 'text-cyan' : 'text-primary'}`} />
                            </div>
                            <h3 className={`font-bold mb-2 ${isDarkSection ? 'text-white' : 'text-foreground'}`}>{p.name}</h3>
                            <p className={`text-sm leading-relaxed ${isDarkSection ? 'text-white/60' : 'text-muted-foreground'}`}>{p.description}</p>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })
        )}
  
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
              {allProjects?.map((project, i) => {
                const displayImage = imageMap[project.image_url] || project.image_url;
                return (
                  <ScrollReveal key={project.id} delay={i * 0.15}>
                    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img src={displayImage} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-foreground mb-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.map((tag) => (
                            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-medium">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
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
