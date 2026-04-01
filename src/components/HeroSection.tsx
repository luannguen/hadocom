import { ArrowRight, Shield, Cpu, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Data center" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="relative container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 shadow-lg shadow-black/10"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm text-white font-medium">Công ty TNHH HADOCOM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            Công nghệ <span className="text-gradient">vững chắc</span>
            <br />
            Vận hành <span className="text-gradient">bền bỉ</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 mb-10 max-w-xl shadow-xl shadow-black/10"
          >
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              Giải pháp hạ tầng CNTT, phát triển phần mềm và dịch vụ bảo trì hệ thống — đồng hành dài lâu cùng doanh nghiệp của bạn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition shadow-xl shadow-secondary/30">
              Liên hệ ngay <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition">
              Dịch vụ của chúng tôi
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { icon: Shield, label: "Bảo mật", desc: "An toàn tối đa" },
              { icon: Cpu, label: "Hạ tầng", desc: "Giải pháp toàn diện" },
              { icon: Headphones, label: "Hỗ trợ", desc: "24/7" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 flex flex-col items-start gap-2 shadow-lg shadow-black/5">
                <Icon className="w-6 h-6 text-cyan" />
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="text-xs text-white/60">{desc}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
