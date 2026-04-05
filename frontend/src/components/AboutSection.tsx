import { Target, Eye, Heart, Lock, Lightbulb } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "react-i18next";
import aboutBg from "@/assets/about-bg.jpg";

const AboutSection = () => {
  const { t } = useTranslation();

  const coreValues = [
    { icon: Heart, label: t("about.trust"), desc: t("about.trustDesc") },
    { icon: Target, label: t("about.professional"), desc: t("about.professionalDesc") },
    { icon: Eye, label: t("about.dedicated"), desc: t("about.dedicatedDesc") },
    { icon: Lock, label: t("about.secure"), desc: t("about.secureDesc") },
    { icon: Lightbulb, label: t("about.innovative"), desc: t("about.innovativeDesc") },
  ];

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={aboutBg} alt="" loading="lazy" width={1920} height={800} className="w-full h-full object-cover opacity-5" />
      </div>
      <div className="relative container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <ScrollReveal>
              <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{t("about.label")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                {t("about.title")} <span className="text-gradient">{t("about.titleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{t("about.desc")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">🎯 {t("about.mission")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.missionDesc")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="glass-card rounded-2xl p-6 mt-4">
                <h3 className="text-lg font-bold text-foreground mb-3">🔭 {t("about.vision")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t("about.visionDesc")}</p>
              </div>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal direction="right">
              <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{t("about.coreValues")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">Core Values</h2>
            </ScrollReveal>
            <div className="grid gap-4">
              {coreValues.map(({ icon: Icon, label, desc }, i) => (
                <ScrollReveal key={i} direction="right" delay={i * 0.1}>
                  <div className="flex items-center gap-4 glass-card rounded-xl p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{label}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
