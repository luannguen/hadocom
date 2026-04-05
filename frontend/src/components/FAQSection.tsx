import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ];

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{t("faq.label")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">{t("faq.title")}</h2>
            <p className="text-muted-foreground mt-4">{t("faq.desc")}</p>
          </div>
        </ScrollReveal>
        <div className="space-y-3">
          {faqs.map(({ q, a }, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-foreground/[0.02] transition">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="font-medium text-foreground text-sm md:text-base">{q}</span>
                  </div>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                      <div className="px-5 pb-5 pl-13 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4 ml-8">{a}</div>
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
