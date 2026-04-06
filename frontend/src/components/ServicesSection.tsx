import { Server, Code, Wrench, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "react-i18next";
import { useServices } from "@/hooks/useData";
import { useState } from "react";
import ServiceInquiryModal from "./ServiceInquiryModal";
import { Button } from "./ui/button";

// Assets
import techPattern from "@/assets/tech-pattern.jpg";
import infrastructureBg from "@/assets/infrastructure-bg.jpg";
import softwareBg from "@/assets/software-bg.jpg";
import maintenanceBg from "@/assets/maintenance-bg.jpg";

const iconMap: Record<string, any> = {
  Server,
  Code,
  Wrench,
};

const imageMap: Record<string, string> = {
  "@/assets/infrastructure-bg.jpg": infrastructureBg,
  "@/assets/software-bg.jpg": softwareBg,
  "@/assets/maintenance-bg.jpg": maintenanceBg,
};

const ServicesSection = () => {
  const { t } = useTranslation();
  const { data: services, isLoading } = useServices();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleInquiryClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setInquiryOpen(true);
  };

  if (isLoading) {
    return (
      <section id="services" className="relative section-padding overflow-hidden">
        <div className="container mx-auto text-center py-20">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-white/20 rounded mb-4" />
            <div className="h-12 w-64 bg-white/20 rounded mb-8" />
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-white/10 rounded-2xl border border-white/15" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0">
        <img src={techPattern} alt="" loading="lazy" width={1920} height={800} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/90" />
      </div>
      <div className="relative container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-cyan uppercase tracking-widest">{t("services.label")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-3">{t("services.title")}</h2>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto">{t("services.desc")}</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {services?.map((service, i) => {
            const Icon = iconMap[service.icon] || HelpCircle;
            const displayImage = imageMap[service.image_url] || service.image_url;
            
            return (
              <ScrollReveal key={service.id} delay={i * 0.15}>
                <div className="relative h-full flex flex-col overflow-hidden bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl hover:bg-white/15 hover:border-white/25 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={displayImage} alt={service.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-cyan" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2 mb-8 flex-grow">
                      {service.features?.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white/80">
                          <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full border-cyan/30 text-cyan hover:bg-cyan hover:text-navy group/btn transition-all duration-300"
                      onClick={() => handleInquiryClick(service.id)}
                    >
                      {t("services.cta")}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <ServiceInquiryModal 
        isOpen={inquiryOpen} 
        onOpenChange={setInquiryOpen} 
        selectedServiceId={selectedServiceId} 
      />
    </section>
  );
};

export default ServicesSection;
