import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Tag, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useProjects } from "@/hooks/useData";
import projectsHero from "@/assets/projects-hero.jpg";

const ProjectsPage = () => {
    const { data: allProjects, isLoading: projectsLoading } = useProjects();
  
    return (
      <div className="min-h-screen bg-[#050A1A]">
        <Navbar />
  
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[450px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={projectsHero} alt="Projects Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050A1A] via-[#050A1A]/80 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 pt-20">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block py-1 px-3 rounded-md bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold uppercase tracking-widest mb-6">
                Our Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                Các <span className="text-gradient">Dự án</span> <br />
                Tiêu biểu
              </h1>
              <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
                HADOCOM tự hào đồng hành cùng các đối tác, khách hàng trong quá trình chuyển đổi số 
                thông qua các hệ thống hạ tầng và phần mềm quy mô lớn.
              </p>
            </motion.div>
          </div>
        </section>
  
        {/* Projects Grid */}
        <section className="section-padding relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Danh sách dự án</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-cyan to-secondary rounded-full" />
                    </div>
                </ScrollReveal>
    
                {projectsLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl h-[450px] animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {allProjects?.map((project, i) => {
                        const projectName = project.name || project.title || "Dự án HADOCOM";
                        
                        return (
                        <ScrollReveal key={project.id} delay={i * 0.1}>
                            <Link to={`/du-an/${project.slug}`} className="group block h-full">
                                <div className="relative h-full flex flex-col bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/10 hover:border-cyan/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan/10">
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden mb-2">
                                        <img 
                                            src={project.image_url} 
                                            alt={projectName} 
                                            loading="lazy" 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        
                                        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-cyan flex items-center justify-center text-[10px] font-bold text-navy">HA</div>
                                                <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-secondary flex items-center justify-center text-[10px] font-bold text-white">DO</div>
                                            </div>
                                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase font-bold py-1 px-3 rounded-full">
                                                Completed
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-cyan/60 text-xs font-bold uppercase tracking-widest mb-4">
                                            <Layout className="w-4 h-4" />
                                            {project.category?.name || "Project"}
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan transition-colors line-clamp-2">
                                            {projectName}
                                        </h3>
                                        
                                        <p className="text-white/40 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-4 text-white/30 text-xs">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 2024</span>
                                                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Client</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-cyan group-hover:text-navy group-hover:border-transparent transition-all">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 border-2 border-cyan/0 rounded-[2.5rem] group-hover:border-cyan/20 transition-all pointer-events-none" />
                                </div>
                            </Link>
                        </ScrollReveal>
                        );
                    })}
                    </div>
                )}
            </div>
        </section>

      {/* Stats / Counter Section */}
      <section className="py-24 bg-white/[0.02]">
          <div className="container mx-auto px-4 text-center">
              <ScrollReveal>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                      <div>
                          <h4 className="text-5xl font-black text-cyan mb-2">50+</h4>
                          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Dự án hoàn tất</p>
                      </div>
                      <div>
                          <h4 className="text-5xl font-black text-white mb-2">20+</h4>
                          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Đối tác lớn</p>
                      </div>
                      <div>
                          <h4 className="text-5xl font-black text-secondary mb-2">100%</h4>
                          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Hài lòng</p>
                      </div>
                      <div>
                          <h4 className="text-5xl font-black text-white mb-2">24/7</h4>
                          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Hỗ trợ</p>
                      </div>
                  </div>
              </ScrollReveal>
          </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Sẵn sàng khởi động <br /><span className="text-cyan">dự án của bạn?</span></h2>
                <p className="text-white/50 mb-12 text-lg">
                HADOCOM luôn sẵn sàng lắng nghe và đưa ra giải pháp tối ưu nhất cho bài toán của bạn.
                </p>
                <Link
                to="/#contact"
                className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:shadow-secondary/30 transition-all hover:scale-105"
                >
                Bắt đầu ngay <ArrowRight className="w-6 h-6" />
                </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
