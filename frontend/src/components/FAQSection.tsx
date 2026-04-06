import { useState } from "react";
import { ChevronDown, HelpCircle, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "react-i18next";
import { useFAQs } from "@/hooks/useData";

const FAQSection = () => {
  const { t } = useTranslation();
  const { data: faqs, isLoading, isError, error } = useFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20">
        <Loader2 className="w-10 h-10 animate-spin text-secondary mb-4" />
        <p className="text-muted-foreground animate-pulse text-sm">Đang tải câu hỏi...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Supabase FAQ fetch error:", error);
    return null; // Silent fail on main page or we could show something small
  }

  // Fallback to static if no data in DB (optional, but requested sync with admin)
  if (!faqs || faqs.length === 0) {
    return null; // Don't show the section if no FAQs are active
  }

  return (
    <section id="faq" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{t("faq.label")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">{t("faq.title")}</h2>
            <p className="text-muted-foreground mt-4">{t("faq.desc")}</p>
          </div>
        </ScrollReveal>
        
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <div 
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${openIndex === i ? "border-secondary/30 glow-cyan/10" : "border-white/5"}`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-foreground/[0.02] transition"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${openIndex === i ? "bg-secondary/20 text-secondary" : "bg-white/5 text-white/40"}`}>
                      <HelpCircle className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <span className={`font-semibold text-sm md:text-base transition-colors ${openIndex === i ? "text-secondary" : "text-foreground"}`}>
                      {item.question}
                    </span>
                  </div>
                  <motion.div 
                    animate={{ rotate: openIndex === i ? 180 : 0 }} 
                    transition={{ duration: 0.3, ease: "backOut" }}
                  >
                    <ChevronDown className={`w-5 h-5 transition-colors ${openIndex === i ? "text-secondary" : "text-muted-foreground"}`} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: "auto", opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5">
                        <div className="pl-13 text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {item.answer}
                        </div>
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
