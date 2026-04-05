import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const upcomingEvents = [
  { date: "15/04/2026", time: "09:00 - 17:00", title: "Hội thảo Chuyển đổi số cho doanh nghiệp SME", location: "Khách sạn Rex, TP.HCM", attendees: "200+", desc: "Chia sẻ kinh nghiệm và giải pháp chuyển đổi số thiết thực dành cho doanh nghiệp vừa và nhỏ." },
  { date: "28/04/2026", time: "14:00 - 16:30", title: "Workshop: Bảo mật mạng doanh nghiệp 2026", location: "Trụ sở HADOCOM, Quận 7", attendees: "50", desc: "Thực hành các kỹ thuật bảo mật tiên tiến cùng chuyên gia Fortinet và Cisco." },
  { date: "10/05/2026", time: "08:30 - 12:00", title: "Demo Day: Giải pháp SmartWMS & ERP", location: "Online (Zoom)", attendees: "500+", desc: "Trình diễn trực tiếp các tính năng mới nhất của phần mềm quản lý kho và ERP HADOCOM." },
];

const pastEvents = [
  { date: "10/03/2026", title: "Tech Talk: Cloud Computing & Hybrid Infrastructure", location: "TP.HCM", attendees: "150" },
  { date: "22/02/2026", title: "Kỷ niệm 5 năm thành lập HADOCOM", location: "TP.HCM", attendees: "300" },
  { date: "15/01/2026", title: "Đào tạo kỹ thuật nâng cao cho đối tác", location: "Bình Dương", attendees: "80" },
  { date: "05/12/2025", title: "Tham gia triển lãm ICT Vietnam 2025", location: "Hà Nội", attendees: "1000+" },
];

const EventsPage = () => (
  <div className="min-h-screen bg-navy">
    <Navbar />
    <section className="relative pt-32 pb-20 section-padding">
      <div className="container mx-auto relative z-10 text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sự Kiện <span className="text-gradient">HADOCOM</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">Tham gia các sự kiện công nghệ và kết nối cùng HADOCOM.</p>
        </ScrollReveal>
      </div>
    </section>

    {/* Upcoming */}
    <section className="section-padding bg-navy">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white mb-10">Sắp diễn ra</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {upcomingEvents.map((e, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 md:p-8 hover:glow-cyan transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-32 shrink-0 text-center lg:text-left">
                    <div className="inline-block bg-secondary/20 rounded-xl px-4 py-3">
                      <p className="text-cyan font-bold text-lg">{e.date.split("/")[0]}</p>
                      <p className="text-white/50 text-xs">Tháng {e.date.split("/")[1]}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{e.title}</h3>
                    <p className="text-white/50 text-sm mb-4">{e.desc}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan" />{e.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan" />{e.location}</span>
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-cyan" />{e.attendees} người</span>
                    </div>
                  </div>
                  <div className="lg:self-center shrink-0">
                    <button className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition shadow-lg shadow-secondary/30">
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Past */}
    <section className="section-padding bg-navy-light">
      <div className="container mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-white mb-10">Đã diễn ra</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {pastEvents.map((e, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-6 opacity-80">
                <div className="flex items-center gap-3 mb-3 text-white/40 text-sm">
                  <Calendar className="w-4 h-4" /> {e.date}
                  <span className="ml-auto flex items-center gap-1"><Users className="w-3.5 h-3.5" />{e.attendees}</span>
                </div>
                <h3 className="text-lg font-semibold text-white/80 mb-1">{e.title}</h3>
                <p className="text-white/40 text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{e.location}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default EventsPage;
