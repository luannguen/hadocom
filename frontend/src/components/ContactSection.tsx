import { useState } from "react";
import { Phone, Mail, MapPin, Globe, Send, CheckCircle } from "lucide-react";
import { z } from "zod";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "react-i18next";
import { useSubmitContact } from "@/hooks/useData";
import { Loader2 } from "lucide-react";

type FormData = { name: string; email: string; phone: string; service: string; message: string };

const ContactSection = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const submitContact = useSubmitContact();

  const contactSchema = z.object({
    name: z.string().trim().min(1, t("contact.errName")).max(100),
    email: z.string().trim().email(t("contact.errEmail")).max(255),
    phone: z.string().trim().min(8, t("contact.errPhone")).max(15),
    service: z.string().min(1, t("contact.errService")),
    message: z.string().trim().min(1, t("contact.errMessage")).max(2000),
  });

  const contactInfo = [
    { icon: Phone, label: t("contact.phone"), value: "0775 395 879", href: "tel:0775395879" },
    { icon: Mail, label: t("contact.email"), value: "chi.nt@hadocom.vn", href: "mailto:chi.nt@hadocom.vn" },
    { icon: MapPin, label: t("contact.address"), value: "111/91 Bình Thành, KP17, P. Bình Trị Đông A, Q. Bình Tân, TP.HCM", href: "#" },
    { icon: Globe, label: t("contact.website"), value: "hadocom.vn", href: "https://hadocom.vn" },
  ];

  const serviceOptions = [
    t("contact.serviceInfra"),
    t("contact.serviceSoftware"),
    t("contact.serviceMaintenance"),
    t("contact.serviceConsulting"),
    t("contact.serviceOther"),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setErrorStatus(null);
    
    try {
      await submitContact(form);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorStatus(t("common.errorOccurred")); // Using a generic error key or fallback
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{t("contact.label")}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">{t("contact.title")}</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">{t("contact.desc")}</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <a href={href} className="glass-card rounded-2xl p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group block h-full">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1">{label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{value}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">{t("contact.formTitle")}</h3>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-foreground mb-2">{t("contact.successTitle")}</h4>
                  <p className="text-muted-foreground">{t("contact.successDesc")}</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                    className="mt-6 text-sm text-secondary hover:underline font-medium">{t("contact.sendAnother")}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.name")} *</label>
                      <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                        placeholder={t("contact.namePlaceholder")} />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.emailLabel")} *</label>
                      <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                        placeholder="email@company.com" />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.phone")} *</label>
                      <input type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                        placeholder={t("contact.phonePlaceholder")} />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.serviceLabel")} *</label>
                      <select value={form.service} onChange={(e) => handleChange("service", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition">
                        <option value="">{t("contact.serviceDefault")}</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.messageLabel")} *</label>
                    <textarea value={form.message} onChange={(e) => handleChange("message", e.target.value)} rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition resize-none"
                      placeholder={t("contact.messagePlaceholder")} />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>
                  {errorStatus && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl">
                      {errorStatus}
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition shadow-lg shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )} 
                    {loading ? t("common.sending") : t("contact.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactSection;
