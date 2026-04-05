import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, ArrowRight } from "lucide-react";

import { useNews } from "@/hooks/useData";

const tagColor: Record<string, string> = {
  "Dự án": "bg-secondary/20 text-cyan",
  "Sản phẩm": "bg-primary/20 text-primary-foreground",
  "Công ty": "bg-accent/20 text-accent-foreground",
  "Sự kiện": "bg-destructive/20 text-destructive-foreground",
};

const NewsPage = () => {
  const { data: articles, isLoading } = useNews();

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <section className="relative pt-32 pb-20 section-padding">
        <div className="container mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tin Tức & <span className="text-gradient">Bài Viết</span></h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Cập nhật những thông tin mới nhất về hoạt động và giải pháp của HADOCOM.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-navy">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white/10 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles?.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 0.08}>
                  <div className="glass-card rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group h-full flex flex-col">
                    <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
                      {a.image_url.startsWith('http') || a.image_url.startsWith('/') || a.image_url.startsWith('@') ? (
                         <img src={a.image_url} alt={a.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-6xl opacity-20">📰</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {a.tag && (
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor[a.tag] || "bg-muted text-muted-foreground"}`}>
                            {a.tag}
                          </span>
                        )}
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(a.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors line-clamp-2">{a.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">{a.excerpt}</p>
                      <button className="mt-4 flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all">
                        Đọc thêm <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsPage;
