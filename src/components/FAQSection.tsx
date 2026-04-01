import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "HADOCOM cung cấp giải pháp cho loại hình doanh nghiệp nào?",
    a: "Chúng tôi phục vụ đa dạng khách hàng từ doanh nghiệp vừa và nhỏ (SME), doanh nghiệp lớn đến cơ quan nhà nước. Giải pháp được thiết kế linh hoạt theo quy mô và ngành nghề cụ thể.",
  },
  {
    q: "Thời gian triển khai một dự án hạ tầng CNTT mất bao lâu?",
    a: "Tùy thuộc vào quy mô và độ phức tạp, thời gian triển khai từ 1-8 tuần. Chúng tôi luôn cam kết tiến độ và báo cáo tiến trình minh bạch trong suốt dự án.",
  },
  {
    q: "HADOCOM có hỗ trợ sau triển khai không?",
    a: "Có. Chúng tôi cung cấp dịch vụ bảo hành, bảo trì định kỳ và hỗ trợ kỹ thuật 24/7. Đội ngũ kỹ sư luôn sẵn sàng xử lý sự cố và tối ưu hệ thống.",
  },
  {
    q: "Chi phí dịch vụ được tính như thế nào?",
    a: "Chi phí được báo giá minh bạch dựa trên yêu cầu cụ thể của từng dự án. Không phát sinh chi phí ẩn. Chúng tôi luôn tư vấn phương án tối ưu ngân sách cho khách hàng.",
  },
  {
    q: "HADOCOM có phát triển phần mềm theo yêu cầu riêng không?",
    a: "Có. Ngoài các sản phẩm sẵn có (ERP, CRM, HRM), chúng tôi nhận phát triển phần mềm theo yêu cầu riêng, bao gồm ứng dụng Web, Mobile và tích hợp hệ thống.",
  },
  {
    q: "Làm thế nào để bắt đầu hợp tác với HADOCOM?",
    a: "Bạn có thể liên hệ qua hotline 0775 395 879, email chi.nt@hadocom.vn hoặc gửi form tư vấn trên website. Đội ngũ tư vấn sẽ phản hồi trong vòng 24 giờ.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">Câu hỏi thường gặp</h2>
            <p className="text-muted-foreground mt-4">Những thắc mắc phổ biến từ khách hàng</p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-foreground/[0.02] transition"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-medium text-foreground text-sm md:text-base">{q}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pl-13 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4 ml-8">
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
