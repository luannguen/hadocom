import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const partners = [
  "Microsoft", "Oracle", "Citrix", "SolarWinds",
  "Red Hat", "IBM", "Dell", "HP",
  "Symantec", "Juniper", "NetApp", "EMC",
  "Schneider", "Fujitsu", "McAfee", "Cisco",
  "Bitdefender", "VMware", "Huawei", "ZTE",
  "Emerson", "Santak", "Eaton", "Alcatel-Lucent",
];

const PartnersSection = () => {
  const { t } = useTranslation();

  return (
    <section id="partners" className="relative section-padding overflow-hidden bg-navy">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan uppercase tracking-widest">{t("partners.label")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t("partners.title")}</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">{t("partners.desc")}</p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {partners.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} whileHover={{ scale: 1.08 }}
              className="bg-white/8 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-center hover:bg-white/15 hover:border-white/25 transition-colors duration-300">
              <span className="text-sm font-semibold text-white/80 text-center">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
