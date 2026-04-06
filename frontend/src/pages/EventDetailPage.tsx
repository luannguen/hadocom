import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Share2, 
  ChevronRight, 
  AlertCircle,
  CheckCircle2,
  Trophy
} from "lucide-react";
import { useEventBySlug, useEvents } from "@/hooks/useData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import EventRegistrationModal from "@/components/EventRegistrationModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EventDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: event, isLoading, error } = useEventBySlug(slug || "");
  const { data: allEvents } = useEvents();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const relatedEvents = allEvents
    ?.filter((e) => e.slug !== slug && e.status !== 'cancelled')
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">Đang tải thông tin sự kiện...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Không tìm thấy sự kiện</h1>
          <p className="text-muted-foreground mb-8">Sự kiện bạn đang tìm kiếm không tồn tại hoặc đã kết thúc.</p>
          <Link to="/su-kien" className="btn-secondary px-8 py-3 rounded-xl flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isExpired = event.status === 'completed' || (event.end_date && new Date(event.end_date) < new Date());
  const isCancelled = event.status === 'cancelled';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <img 
            src={event.image_url} 
            alt={event.title} 
            className="w-full h-full object-cover blur-xl opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Link 
              to="/su-kien" 
              className="inline-flex items-center gap-2 text-cyan mb-8 hover:translate-x-[-4px] transition-transform"
            >
              <ArrowLeft className="w-4 h-4" /> Tất cả sự kiện
            </Link>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-12">
                 <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className={`${
                      event.status === 'upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      event.status === 'ongoing' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      event.status === 'completed' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    } capitalize px-4 py-1`}>
                      {event.status === 'upcoming' ? 'Sắp diễn ra' : 
                       event.status === 'ongoing' ? 'Đang diễn ra' : 
                       event.status === 'completed' ? 'Đã kết thúc' : 'Đã hủy'}
                    </Badge>
                    {event.category && (
                      <Badge variant="outline" className="bg-cyan/10 text-cyan border-cyan/20 px-4 py-1">
                         {typeof event.category === 'object' ? event.category.name : event.category}
                      </Badge>
                    )}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-8 leading-tight max-w-5xl">
                    {event.title}
                 </h1>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-12 aspect-[16/9]">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 blur-3xl -mr-32 -mt-32 rounded-full" />
                   
                   <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <div className="w-1 h-8 bg-cyan rounded-full" />
                      Giới thiệu sự kiện
                   </h2>
                   
                   <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed whitespace-pre-wrap">
                      <p className="text-xl font-medium text-foreground mb-8 italic border-l-4 border-cyan/30 pl-6 py-2">
                        {event.summary}
                      </p>
                      <div dangerouslySetInnerHTML={{ __html: event.content }} />
                   </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                 {/* Registration Card */}
                 <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-xl sticky top-24">
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-cyan" />
                      Thông tin sự kiện
                   </h3>
                   
                   <div className="space-y-6 mb-8">
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                            <Calendar className="w-5 h-5 text-cyan" />
                         </div>
                         <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Thời gian</p>
                            <p className="font-medium">{new Date(event.start_date).toLocaleDateString('vi-VN', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}</p>
                            <p className="text-sm text-foreground/60 mt-1 flex items-center gap-1.5">
                               <Clock className="w-3.5 h-3.5" /> 08:30 - 17:00
                            </p>
                         </div>
                      </div>

                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                            <MapPin className="w-5 h-5 text-cyan" />
                         </div>
                         <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Địa điểm</p>
                            <p className="font-medium">{event.location}</p>
                         </div>
                      </div>

                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                            <Users className="w-5 h-5 text-cyan" />
                         </div>
                         <div>
                            <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Đối tượng</p>
                            <p className="font-medium">Chuyên gia IT, Quản lý Doanh nghiệp</p>
                         </div>
                      </div>
                   </div>

                   <Button 
                     className={`w-full py-7 rounded-2xl text-lg font-bold transition-all shadow-lg ${
                       isExpired || isCancelled 
                        ? 'bg-white/10 text-white/40 cursor-not-allowed' 
                        : 'bg-cyan hover:bg-cyan/90 text-navy hover:scale-[1.02] active:scale-95 shadow-cyan/20'
                     }`}
                     disabled={isExpired || isCancelled}
                     onClick={() => setIsRegisterModalOpen(true)}
                   >
                     {isCancelled ? 'Sự kiện đã bị hủy' : isExpired ? 'Đăng ký đã đóng' : 'Đăng ký tham gia ngay'}
                   </Button>

                   {!(isExpired || isCancelled) && (
                     <p className="text-center text-xs text-white/40 mt-4 flex items-center justify-center gap-1.5">
                       <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Miễn phí tham dự cho khách mời
                     </p>
                   )}

                   <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-medium text-white/60">Chia sẻ:</span>
                         <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                              <button key={i} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
                                 <Share2 className="w-4 h-4" />
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents && relatedEvents.length > 0 && (
        <section className="py-24 bg-navy-light/30 border-t border-white/5">
           <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    Sự kiện khác
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </h2>
                  <p className="text-muted-foreground mt-2">Khám phá thêm các chương trình đào tạo và hội thảo từ HADOCOM</p>
                </div>
                <Link to="/su-kien" className="group flex items-center gap-2 text-cyan font-semibold">
                   Xem tất cả <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedEvents.map((e) => (
                  <ScrollReveal key={e.id}>
                    <Link to={`/su-kien/${e.slug}`} className="group block h-full">
                       <div className="glass-card rounded-3xl overflow-hidden border border-white/10 h-full flex flex-col hover:border-cyan/30 transition-all duration-500">
                          <div className="relative h-56 overflow-hidden">
                             <img src={e.image_url} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                             <div className="absolute bottom-4 left-4">
                                <Badge className="bg-cyan/90 text-navy font-bold">{new Date(e.start_date).toLocaleDateString('vi-VN')}</Badge>
                             </div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                             <h3 className="text-xl font-bold mb-3 group-hover:text-cyan transition-colors line-clamp-2">{e.title}</h3>
                             <p className="text-sm text-white/50 line-clamp-3 mb-6 flex-1">{e.summary}</p>
                             <div className="flex items-center text-xs text-cyan opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-wider">
                                Chi tiết <ChevronRight className="ml-1 w-3 h-3" />
                             </div>
                          </div>
                       </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
           </div>
        </section>
      )}

      {/* Registration Modal */}
      <EventRegistrationModal 
        isOpen={isRegisterModalOpen}
        onOpenChange={setIsRegisterModalOpen}
        selectedEventId={event.id}
      />

      <Footer />
    </div>
  );
};

export default EventDetailPage;
