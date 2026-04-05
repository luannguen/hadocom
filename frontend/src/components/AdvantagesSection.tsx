import { Users, Settings, DollarSign, Zap, Lock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();

  const advantages = [
    { icon: Users, title: t("advantages.expertTeam"), desc: t("advantages.expertTeamDesc") },
    { icon: Settings, title: t("advantages.customSolutions"), desc: t("advantages.customSolutionsDesc") },
    { icon: DollarSign, title: t("advantages.transparentCost"), desc: t("advantages.transparentCostDesc") },
    { icon: Zap, title: t("advantages.fastSupport"), desc: t("advantages.fastSupportDesc") },
    { icon: Lock, title: t("advantages.dataSecurity"), desc: t("advantages.dataSecurityDesc") },
  ];

  return (
    <section id="advantages" className="section-padding bg-background">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{t("advantages.label")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">
              {t("advantages.title")} <span className="text-gradient">HADOCOM</span>?
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {advantages.map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`glass-card rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
