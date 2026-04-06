import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, MapPin, Clock, Users, ArrowRight, Info } from "lucide-react";
import { useState } from "react";
import { useEvents, useCategories } from "@/hooks/useData";

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: categories } = useCategories('event');
  const { data: allEvents, isLoading } = useEvents(selectedCategory);

  const today = new Date();
  const upcomingEvents = allEvents?.filter(e => new Date(e.start_date) >= today).sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()) || [];
  const pastEvents = allEvents?.filter(e => new Date(e.start_date) < today).sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()) || [];

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      <section className="relative pt-32 pb-10 section-padding">
        <div className="container mx-auto relative z-10 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sự Kiện <span className="text-gradient">HADOCOM</span></h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Tham gia các sự kiện công nghệ và kết nối cùng HADOCOM.</p>
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

      {isLoading ? (
        <section className="section-padding py-20 bg-navy min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin"></div>
             <p className="text-white/40 animate-pulse">Đang tải sự kiện...</p>
          </div>
        </section>
      ) : allEvents?.length === 0 ? (
        <section className="section-padding py-20 bg-navy text-center">
          <div className="max-w-md mx-auto p-12 glass-card rounded-3xl border-dashed border-white/10">
            <Info className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">Hiện chưa có dữ liệu cho các sự kiện thuộc danh mục này.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Upcoming */}
          {upcomingEvents.length > 0 && (
            <section className="section-padding bg-navy pt-10">
              <div className="container mx-auto">
                <ScrollReveal>
                  <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-secondary pl-4">Sắp diễn ra</h2>
                </ScrollReveal>
                <div className="space-y-6">
                  {upcomingEvents.map((e, i) => (
                    <ScrollReveal key={e.id} delay={i * 0.1}>
                      <div className="glass-card rounded-2xl p-6 md:p-8 hover:glow-cyan transition-all duration-300">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-32 shrink-0 text-center lg:text-left">
                            <div className="inline-block bg-secondary/20 rounded-xl px-4 py-3">
                              <p className="text-cyan font-bold text-lg">{new Date(e.start_date).getDate()}</p>
                              <p className="text-white/50 text-xs text-nowrap">Tháng {new Date(e.start_date).getMonth() + 1}</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                               {e.category && <span className="bg-secondary/10 text-cyan text-[10px] font-bold px-2 py-0.5 rounded border border-secondary/20">{e.category.name}</span>}
                               {e.status === 'ongoing' && <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold animate-pulse">ĐANG DIỄN RA</span>}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{e.title}</h3>
                            <p className="text-white/50 text-sm mb-4 line-clamp-2">{e.summary}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-white/60">
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan" />{new Date(e.start_date).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan" />{e.location}</span>
                            </div>
                          </div>
                          <div className="lg:self-center shrink-0">
                            <button className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition shadow-lg shadow-secondary/30">
                              Đăng ký ngay
                            </button>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Past */}
          {pastEvents.length > 0 && (
            <section className="section-padding bg-navy-light pt-10">
              <div className="container mx-auto">
                <ScrollReveal>
                  <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-white/20 pl-4">Đã diễn ra</h2>
                </ScrollReveal>
                <div className="grid md:grid-cols-2 gap-6">
                  {pastEvents.map((e, i) => (
                    <ScrollReveal key={e.id} delay={i * 0.08}>
                      <div className="glass-card rounded-2xl p-6 opacity-80 hover:opacity-100 transition-opacity group">
                        <div className="flex items-center gap-3 mb-3 text-white/40 text-sm">
                          <Calendar className="w-4 h-4" /> {new Date(e.start_date).toLocaleDateString('vi-VN')}
                          {e.category && <span className="ml-auto text-[10px] border border-white/10 px-2 py-0.5 rounded">{e.category.name}</span>}
                        </div>
                        <h3 className="text-lg font-semibold text-white/80 group-hover:text-white mb-1 transition-colors">{e.title}</h3>
                        <p className="text-white/40 text-sm flex items-center gap-1 group-hover:text-white/60 transition-colors"><MapPin className="w-3.5 h-3.5" />{e.location}</p>
                        <button className="mt-4 text-xs font-bold text-cyan flex items-center gap-1 hover:gap-2 transition-all">Xem lại <ArrowRight className="w-3 h-3" /></button>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default EventsPage;
