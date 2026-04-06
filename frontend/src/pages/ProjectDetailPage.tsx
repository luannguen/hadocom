import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, ChevronRight, Share2, Briefcase } from "lucide-react";
import { useProjectBySlug, useProjects } from "@/hooks/useData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import infrastructureBg from "@/assets/infrastructure-bg.jpg";
import softwareBg from "@/assets/software-bg.jpg";
import maintenanceBg from "@/assets/maintenance-bg.jpg";

const imageMap: Record<string, string> = {
  "@/assets/infrastructure-bg.jpg": infrastructureBg,
  "@/assets/software-bg.jpg": softwareBg,
  "@/assets/maintenance-bg.jpg": maintenanceBg,
};

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = useProjectBySlug(slug || "");
  const { data: allProjects } = useProjects();

  const relatedProjects = allProjects
    ?.filter((p) => p.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">Đang tải thông tin dự án...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <Briefcase className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy dự án</h1>
          <p className="text-muted-foreground mb-8">Dự án bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ.</p>
          <Link to="/du-an" className="btn-secondary px-8 py-3 rounded-xl flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const displayImage = imageMap[project.image_url] || project.image_url;
  const projectName = project.name || project.title || "Dự án HADOCOM";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={displayImage} 
            alt={projectName} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="container relative mx-auto px-4 pb-12">
          <ScrollReveal>
            <Link 
              to="/du-an" 
              className="inline-flex items-center gap-2 text-cyan mb-6 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft className="w-4 h-4" /> Dự án
            </Link>
            
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.category && (
                  <span className="bg-cyan/10 text-cyan px-3 py-1 rounded-lg text-sm font-medium border border-cyan/20">
                    {typeof project.category === 'object' ? project.category.name : project.category}
                  </span>
                )}
                {project.is_featured && (
                  <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-lg text-sm font-medium border border-yellow-500/20">
                    Tiêu biểu
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
                {projectName}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    <span>Khách hàng: <strong className="text-foreground">{project.client}</strong></span>
                  </div>
                )}
                {project.completion_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Hoàn thành: <strong className="text-foreground">
                      {new Date(project.completion_date).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                    </strong></span>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <ScrollReveal>
                <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-3xl -mr-32 -mt-32 rounded-full" />
                  
                  <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <div className="w-1 h-8 bg-cyan rounded-full" />
                    Chi tiết dự án
                  </h2>
                  
                  <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                    {project.content || project.description}
                  </div>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                      <div className="flex flex-wrap gap-3">
                        <Tag className="w-5 h-5 text-muted-foreground mr-1 self-center" />
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-sm px-4 py-1.5 rounded-xl bg-muted/30 border border-white/5 text-muted-foreground hover:bg-muted/50 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Info Card */}
              <ScrollReveal delay={0.2}>
                <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-xl">
                  <h3 className="text-xl font-bold mb-6">Liên hệ tư vấn</h3>
                  <p className="text-muted-foreground mb-6">
                    Bạn muốn triển khai dự án tương tự? Liên hệ ngay với đội ngũ kỹ thuật của HADOCOM.
                  </p>
                  <Link 
                    to="/#contact" 
                    className="w-full btn-secondary py-4 flex items-center justify-center gap-2 rounded-xl group shadow-lg shadow-secondary/20"
                  >
                    Yêu cầu tư vấn <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>

              {/* Share */}
              <ScrollReveal delay={0.3}>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-sm font-medium">Chia sẻ dự án:</span>
                  <button className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-muted/50 transition-colors border border-white/5">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-20 bg-muted/10 border-t border-white/5">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-cyan font-semibold tracking-widest uppercase text-sm">Xem thêm</span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-2">Dự án liên quan</h2>
                </div>
                <Link to="/du-an" className="text-muted-foreground hover:text-cyan transition-colors hidden md:flex items-center gap-2">
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((p, idx) => {
                const img = imageMap[p.image_url] || p.image_url;
                return (
                  <ScrollReveal key={p.id} delay={idx * 0.1}>
                    <Link to={`/du-an/${p.slug}`} className="group block">
                      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col bg-muted/20">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={img} 
                            alt={p.name || p.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold mb-2 group-hover:text-cyan transition-colors line-clamp-1">{p.name || p.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
