import { ArrowRight, Shield, Cpu, Headphones, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useBanner } from "@/hooks/useData";
import heroBg from "@/assets/hero-bg.jpg";

const iconMap: Record<string, any> = {
  Shield,
  Cpu,
  Headphones,
};

const HeroSection = () => {
  const { t } = useTranslation();
  const { data: banner, isLoading } = useBanner('home_main');

  if (isLoading || !banner) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-48 bg-white/10 rounded-full" />
            <div className="h-20 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-12 w-1/2 bg-white/10 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  const displayImage = banner.image_url === "@/assets/hero-bg.jpg" ? heroBg : banner.image_url;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={displayImage} alt={banner.title} width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="relative container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 shadow-lg shadow-black/10">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm text-white font-medium">{banner.badge}</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg whitespace-pre-line">
            {banner.title}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 mb-10 max-w-xl shadow-xl shadow-black/10">
            <p className="text-base md:text-lg text-white/90 leading-relaxed">{banner.description}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href={banner.link || "#contact"} className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition shadow-xl shadow-secondary/30">
              {banner.button_text} <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition">
              {t("hero.ctaServices")}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 max-w-lg">
            {banner.features?.map((f: any, i: number) => {
              const Icon = iconMap[f.icon] || HelpCircle;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col items-start gap-2 shadow-lg shadow-black/5">
                  <Icon className="w-6 h-6 text-cyan" />
                  <span className="text-sm font-semibold text-white">{f.label}</span>
                  <span className="text-xs text-white/60">{f.desc}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
