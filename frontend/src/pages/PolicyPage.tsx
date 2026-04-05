import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, RefreshCw, FileCheck, Handshake } from "lucide-react";

const policies = [
  {
    icon: Shield,
    title: "Chính sách bảo hành",
    items: [
      "Bảo hành thiết bị theo tiêu chuẩn nhà sản xuất từ 12-36 tháng",
      "Hỗ trợ kỹ thuật từ xa 24/7 trong suốt thời gian bảo hành",
      "Thay thế thiết bị lỗi trong vòng 48 giờ làm việc",
      "Miễn phí công lắp đặt và cấu hình khi thay thế bảo hành",
    ],
  },
  {
    icon: RefreshCw,
    title: "Chính sách đổi trả",
    items: [
      "Đổi trả trong 7 ngày nếu sản phẩm lỗi từ nhà sản xuất",
      "Hoàn tiền 100% nếu không thể khắc phục lỗi kỹ thuật",
      "Hỗ trợ nâng cấp thiết bị với chi phí chênh lệch hợp lý",
      "Quy trình đổi trả nhanh gọn, minh bạch",
    ],
  },
  {
    icon: FileCheck,
    title: "Chính sách bảo mật thông tin",
    items: [
      "Cam kết bảo mật tuyệt đối thông tin khách hàng",
      "Nhân viên ký cam kết NDA trước khi tiếp cận dữ liệu",
      "Tuân thủ tiêu chuẩn ISO 27001 về quản lý an toàn thông tin",
      "Mã hóa dữ liệu trong suốt quá trình truyền tải và lưu trữ",
    ],
  },
  {
    icon: Handshake,
    title: "Chính sách hợp tác đối tác",
    items: [
      "Chương trình đại lý với chiết khấu hấp dẫn",
      "Hỗ trợ đào tạo kỹ thuật cho đối tác",
      "Cung cấp demo và thiết bị dùng thử miễn phí",
      "Đồng hành marketing và phát triển thị trường",
    ],
  },
];

const PolicyPage = () => (
  <div className="min-h-screen bg-navy">
    <Navbar />
    <section className="relative pt-32 pb-20 section-padding">
      <div className="container mx-auto relative z-10 text-center">
        <ScrollReveal>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Chính Sách <span className="text-gradient">HADOCOM</span></h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">Cam kết minh bạch, uy tín trong mọi chính sách phục vụ khách hàng.</p>
        </ScrollReveal>
      </div>
    </section>

    <section className="section-padding bg-navy">
      <div className="container mx-auto space-y-10">
        {policies.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <p.icon className="w-7 h-7 text-cyan" />
                </div>
                <h2 className="text-2xl font-bold text-white">{p.title}</h2>
              </div>
              <ul className="space-y-3">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/70">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
    <Footer />
  </div>
);

export default PolicyPage;
