import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
}

const PartnersSection = () => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from("partners")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setPartners(data || []);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (!loading && partners.length === 0) return null;

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
        
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {loading ? (
            // Skeleton loader
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-xl h-24 animate-pulse" />
            ))
          ) : (
            partners.map((partner, i) => (
              <motion.div 
                key={partner.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.05 }} 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                {partner.website_url ? (
                  <a 
                    href={partner.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <PartnerContent partner={partner} />
                  </a>
                ) : (
                  <PartnerContent partner={partner} />
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const PartnerContent = ({ partner }: { partner: Partner }) => (
  <div className="flex items-center justify-center w-full h-full min-h-[60px]">
    {partner.logo_url ? (
      <img 
        src={partner.logo_url} 
        alt={partner.name} 
        className="max-w-full max-h-[60px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
      />
    ) : (
      <span className="text-sm font-semibold text-white/70 text-center group-hover:text-white transition-colors">
        {partner.name}
      </span>
    )}
  </div>
);

export default PartnersSection;
