import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, ArrowRight } from "lucide-react";

const articles = [
  { date: "28/03/2026", title: "HADOCOM triển khai hạ tầng mạng cho khu công nghiệp Bình Dương", excerpt: "Dự án lắp đặt hệ thống mạng toàn diện cho hơn 50 nhà xưởng với tổng chiều dài cáp quang hơn 200km.", tag: "Dự án" },
  { date: "15/03/2026", title: "Ra mắt giải pháp phần mềm quản lý kho thông minh SmartWMS", excerpt: "Giải pháp quản lý kho tích hợp IoT và AI giúp tối ưu hóa quy trình xuất nhập kho tự động.", tag: "Sản phẩm" },
  { date: "02/03/2026", title: "HADOCOM đạt chứng nhận đối tác vàng Cisco 2026", excerpt: "Khẳng định năng lực kỹ thuật hàng đầu trong lĩnh vực hạ tầng mạng và viễn thông.", tag: "Công ty" },
  { date: "18/02/2026", title: "Hội thảo: Xu hướng chuyển đổi số cho doanh nghiệp vừa và nhỏ", excerpt: "Sự kiện chia sẻ kiến thức và giải pháp chuyển đổi số thiết thực cho SME tại TP.HCM.", tag: "Sự kiện" },
  { date: "05/02/2026", title: "Nâng cấp hệ thống camera AI cho chuỗi siêu thị CoopMart", excerpt: "Triển khai hệ thống camera nhận diện khuôn mặt và phân tích hành vi khách hàng.", tag: "Dự án" },
  { date: "20/01/2026", title: "HADOCOM mở rộng dịch vụ bảo trì IT cho khu vực miền Trung", excerpt: "Thành lập văn phòng đại diện tại Đà Nẵng, nâng cao chất lượng hỗ trợ kỹ thuật.", tag: "Công ty" },
];

const tagColor: Record<string, string> = {
  "Dự án": "bg-secondary/20 text-cyan",
  "Sản phẩm": "bg-primary/20 text-primary-foreground",
  "Công ty": "bg-accent/20 text-accent-foreground",
  "Sự kiện": "bg-destructive/20 text-destructive-foreground",
};

const NewsPage = () => (
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="glass-card rounded-2xl overflow-hidden hover:glow-cyan transition-all duration-300 group h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
                  <span className="text-6xl opacity-20">📰</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColor[a.tag] || "bg-muted text-muted-foreground"}`}>{a.tag}</span>
                    <span className="text-white/40 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">{a.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed flex-1">{a.excerpt}</p>
                  <button className="mt-4 flex items-center gap-2 text-cyan text-sm font-medium hover:gap-3 transition-all">
                    Đọc thêm <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default NewsPage;
