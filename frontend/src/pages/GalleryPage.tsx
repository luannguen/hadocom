import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { useProjects, useCategories } from "@/hooks/useData";

const GalleryPage = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined);
  const { data: categories } = useCategories('project');
  const { data: projects, isLoading } = useProjects(activeCategoryId);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems = projects || [];
  const selectedItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <section className="relative pt-32 pb-20 section-padding">
        <div className="container mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Thư Viện <span className="text-gradient">Hình Ảnh</span></h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Những khoảnh khắc ấn tượng từ các dự án và hoạt động của HADOCOM.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-navy">
        <div className="container mx-auto">
          {/* Filter */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategoryId(undefined)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!activeCategoryId ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30" : "glass-card text-white/70 hover:text-white"}`}
              >
                Tất cả
              </button>
              {categories?.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategoryId(c.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategoryId === c.id ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30" : "glass-card text-white/70 hover:text-white"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">Không tìm thấy hình ảnh nào trong danh mục này.</p>
                </div>
              ) : (
                galleryItems.map((item, i) => (
                  <ScrollReveal key={item.id} delay={i * 0.08}>
                    <div
                      onClick={() => setLightboxIndex(i)}
                      className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:glow-cyan transition-all duration-300 group"
                    >
                      <div className="h-56 bg-slate-800 flex items-center justify-center overflow-hidden">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-white/20" />
                        )}
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-cyan font-medium mb-1">{item.category?.name || 'Dự án'}</p>
                        <h3 className="text-white font-semibold line-clamp-1">{item.title}</h3>
                      </div>
                    </div>
                  </ScrollReveal>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
          <div className="relative glass-card rounded-3xl p-4 max-w-4xl w-full text-center overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white/60 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[70vh] rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
               {selectedItem.image_url ? (
                  <img src={selectedItem.image_url} alt={selectedItem.title} className="max-w-full max-h-full object-contain" />
               ) : (
                  <ImageIcon className="w-24 h-24 text-white/10" />
               )}
            </div>
            <div className="px-4 pb-4">
              <h3 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h3>
              <p className="text-cyan text-sm mb-4">{selectedItem.category?.name || 'Dự án'}</p>
              <p className="text-white/60 text-sm max-w-2xl mx-auto">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GalleryPage;
