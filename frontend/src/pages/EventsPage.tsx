import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, MapPin, Clock, Users, ArrowRight, Info, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents, useCategories } from "@/hooks/useData";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import { Button } from "@/components/ui/button";

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { data: categories } = useCategories('event');
  const { data: allEvents, isLoading } = useEvents(selectedCategory);

  const today = new Date();
  const upcomingEvents = allEvents?.filter(e => e.status !== 'completed' && e.status !== 'cancelled').sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()) || [];
  const pastEvents = allEvents?.filter(e => e.status === 'completed' || e.status === 'cancelled').sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()) || [];
  
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);

  const handleRegister = (eventId: string) => {
    setSelectedEventId(eventId);
    setIsRegisterModalOpen(true);
  };

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
                      <div className="glass-card rounded-2xl p-6 md:p-8 hover:glow-cyan transition-all duration-300 group">
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div className="lg:w-48 shrink-0 relative rounded-xl overflow-hidden aspect-video lg:aspect-square">
                             <img src={e.image_url} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                             <div className="absolute top-3 left-3">
                                <div className="bg-secondary/90 text-navy font-bold px-3 py-1.5 rounded-lg text-sm shadow-xl backdrop-blur-sm">
                                   {new Date(e.start_date).getDate()} Th{new Date(e.start_date).getMonth() + 1}
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                               {e.category && <span className="bg-cyan/10 text-cyan text-[10px] font-bold px-3 py-1 rounded-full border border-cyan/20">{(e.category as any).name}</span>}
                               {e.status === 'ongoing' && <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold animate-pulse flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500" />ĐANG DIỄN RA</span>}
                            </div>
                            
                            <Link to={`/su-kien/${e.slug}`}>
                               <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan transition-colors leading-tight">{e.title}</h3>
                            </Link>
                            
                            <p className="text-white/50 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">{e.summary}</p>
                            
                            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60 mb-6 font-medium">
                              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4 text-cyan" />{new Date(e.start_date).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</span>
                              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg"><MapPin className="w-4 h-4 text-cyan" />{e.location}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-auto">
                               <Button 
                                 onClick={() => handleRegister(e.id)}
                                 className="bg-secondary text-secondary-foreground px-8 py-6 rounded-xl text-md font-bold hover:brightness-110 transition-all shadow-xl shadow-secondary/20 active:scale-95"
                               >
                                 Đăng ký ngay
                               </Button>
                               <Link 
                                 to={`/su-kien/${e.slug}`}
                                 className="text-white/60 hover:text-white transition-colors flex items-center gap-2 font-semibold px-4"
                               >
                                 Xem chi tiết <ChevronRight className="w-4 h-4" />
                               </Link>
                            </div>
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
                      <Link to={`/su-kien/${e.slug}`} className="block h-full">
                        <div className="glass-card rounded-2xl p-6 opacity-80 hover:opacity-100 transition-all group border border-white/5 hover:border-white/20 h-full flex flex-col">
                          <div className="flex items-center gap-3 mb-3 text-white/40 text-sm">
                            <Calendar className="w-4 h-4" /> {new Date(e.start_date).toLocaleDateString('vi-VN')}
                            {e.category && <span className="ml-auto text-[10px] border border-white/10 px-2 py-0.5 rounded">{(e.category as any).name}</span>}
                          </div>
                          <h3 className="text-lg font-semibold text-white/80 group-hover:text-white mb-2 transition-colors line-clamp-1">{e.title}</h3>
                          <p className="text-white/40 text-sm flex items-center gap-1 group-hover:text-white/60 transition-colors mb-4"><MapPin className="w-3.5 h-3.5" />{e.location}</p>
                          <div className="mt-auto text-xs font-bold text-cyan flex items-center gap-1 hover:gap-2 transition-all">Xem lại <ArrowRight className="w-3 h-3" /></div>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
      <Footer />

      {/* Registration Modal */}
      <EventRegistrationModal 
        isOpen={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
        selectedEventId={selectedEventId}
      />
    </div>
  );
};

export default EventsPage;
