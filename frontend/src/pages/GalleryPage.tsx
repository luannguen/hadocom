import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { X } from "lucide-react";

const categories = ["Tất cả", "Hạ tầng mạng", "Phần mềm", "Sự kiện", "Văn phòng"];

const galleryItems = [
  { src: "🖥️", title: "Triển khai hệ thống Server Room", cat: "Hạ tầng mạng", color: "from-blue-600/30 to-cyan-500/20" },
  { src: "🔌", title: "Lắp đặt cáp quang khu công nghiệp", cat: "Hạ tầng mạng", color: "from-teal-600/30 to-emerald-500/20" },
  { src: "💻", title: "Demo phần mềm quản lý kho", cat: "Phần mềm", color: "from-purple-600/30 to-pink-500/20" },
  { src: "🎤", title: "Hội thảo chuyển đổi số 2026", cat: "Sự kiện", color: "from-amber-600/30 to-orange-500/20" },
  { src: "📡", title: "Hệ thống WiFi doanh nghiệp", cat: "Hạ tầng mạng", color: "from-indigo-600/30 to-blue-500/20" },
  { src: "🏢", title: "Văn phòng HADOCOM tại TP.HCM", cat: "Văn phòng", color: "from-slate-600/30 to-gray-500/20" },
  { src: "📊", title: "Phần mềm ERP tùy chỉnh", cat: "Phần mềm", color: "from-rose-600/30 to-red-500/20" },
  { src: "🏗️", title: "Thi công hạ tầng camera AI", cat: "Hạ tầng mạng", color: "from-cyan-600/30 to-sky-500/20" },
  { src: "🎉", title: "Kỷ niệm thành lập công ty", cat: "Sự kiện", color: "from-yellow-600/30 to-amber-500/20" },
];

const GalleryPage = () => {
  const [active, setActive] = useState("Tất cả");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = active === "Tất cả" ? galleryItems : galleryItems.filter(g => g.cat === active);

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
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${active === c ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30" : "glass-card text-white/70 hover:text-white"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <ScrollReveal key={`${active}-${i}`} delay={i * 0.08}>
                <div
                  onClick={() => setLightbox(i)}
                  className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:glow-cyan transition-all duration-300 group"
                >
                  <div className={`h-56 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <span className="text-7xl group-hover:scale-110 transition-transform">{item.src}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-cyan font-medium mb-1">{item.cat}</p>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="glass-card rounded-3xl p-8 max-w-lg w-full text-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/60 hover:text-white"><X className="w-6 h-6" /></button>
            <div className={`h-64 bg-gradient-to-br ${filtered[lightbox].color} rounded-2xl flex items-center justify-center mb-6`}>
              <span className="text-8xl">{filtered[lightbox].src}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{filtered[lightbox].title}</h3>
            <p className="text-cyan text-sm">{filtered[lightbox].cat}</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GalleryPage;
