import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, ArrowRight, Tag } from "lucide-react";

import { useNews, useCategories } from "@/hooks/useData";

const tagColor: Record<string, string> = {
  "Dự án": "bg-secondary/20 text-cyan",
  "Sản phẩm": "bg-primary/20 text-primary-foreground",
  "Công ty": "bg-accent/20 text-accent-foreground",
  "Sự kiện": "bg-destructive/20 text-destructive-foreground",
};

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: categories } = useCategories('news');
  const { data: articles, isLoading } = useNews(selectedCategory);

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <section className="relative pt-32 pb-10 section-padding">
        <div className="container mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Tin Tức & <span className="text-gradient">Bài Viết</span></h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Cập nhật những thông tin mới nhất về hoạt động và giải pháp của HADOCOM.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-10 bg-navy">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${!selectedCategory ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"}`}
              >
                Tất cả
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.id ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-navy pt-0">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-white/10 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles?.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <Tag className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">Chưa có bài viết nào trong danh mục này.</p>
                </div>
              ) : (
                articles?.map((a, i) => (
                  <ScrollReveal key={a.id} delay={i * 0.08}>
                    <div className="glass-card rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group h-full flex flex-col">
                      <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center relative overflow-hidden">
                        {a.image_url.startsWith('http') || a.image_url.startsWith('/') || a.image_url.startsWith('@') ? (
                          <img src={a.image_url} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <span className="text-6xl opacity-20">📰</span>
                        )}
                        {a.category && (
                          <div className="absolute top-4 left-4">
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-secondary/80 text-secondary-foreground backdrop-blur-md`}>
                              {a.category.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-white/40 text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(a.created_at).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <Link to={`/tin-tuc/${a.slug}`}>
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors line-clamp-2">{a.title}</h3>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed flex-1 line-clamp-3">{a.excerpt}</p>
                        <Link to={`/tin-tuc/${a.slug}`} className="mt-4 flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all">
                          Đọc thêm <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewsPage;
