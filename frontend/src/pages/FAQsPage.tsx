import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useTranslation } from "react-i18next";
import { HelpCircle } from "lucide-react";

const FAQsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto relative z-10 px-6 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-cyan/10 text-cyan mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("faq.title")}
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
              {t("faq.desc")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="pb-32 min-h-[400px] flex items-center justify-center">
        <FAQSection />
        
        {/* Only show this if FAQSection returns null (handled via internal logic) */}
        {!t("faq.title") && (
          <div className="text-center p-20 bg-white/5 rounded-3xl border border-white/10 max-w-lg mx-auto">
             <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
             <p className="text-white/60">Hiện chưa có câu hỏi nào được cập nhật.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default FAQsPage;
