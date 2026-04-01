import { useState } from "react";
import { Phone, Mail, MapPin, Globe, Send, CheckCircle } from "lucide-react";
import { z } from "zod";
import ScrollReveal from "./ScrollReveal";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên").max(100),
  email: z.string().trim().email("Email không hợp lệ").max(255),
  phone: z.string().trim().min(8, "Số điện thoại không hợp lệ").max(15),
  service: z.string().min(1, "Vui lòng chọn dịch vụ"),
  message: z.string().trim().min(1, "Vui lòng nhập nội dung").max(2000),
});

type FormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone, label: "Điện thoại", value: "0775 395 879", href: "tel:0775395879" },
  { icon: Mail, label: "Email", value: "chi.nt@hadocom.vn", href: "mailto:chi.nt@hadocom.vn" },
  { icon: MapPin, label: "Địa chỉ", value: "111/91 Bình Thành, KP17, P. Bình Trị Đông A, Q. Bình Tân, TP.HCM", href: "#" },
  { icon: Globe, label: "Website", value: "hadocom.vn", href: "https://hadocom.vn" },
];

const serviceOptions = [
  "Hạ tầng CNTT",
  "Phát triển phần mềm",
  "Bảo hành & Bảo trì",
  "Tư vấn giải pháp",
  "Khác",
];

const ContactSection = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
    setSubmitted(true);
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
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest">Liên hệ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3">Thông tin liên hệ</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Hãy liên hệ với chúng tôi để được tư vấn giải pháp phù hợp nhất
            </p>
          </div>
        </ScrollReveal>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
            <ScrollReveal key={label} delay={i * 0.1}>
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

        {/* Contact form */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">Gửi yêu cầu tư vấn</h3>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-foreground mb-2">Gửi thành công!</h4>
                  <p className="text-muted-foreground">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                    className="mt-6 text-sm text-secondary hover:underline font-medium">
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Họ và tên *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                        placeholder="Nguyễn Văn A"
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                        placeholder="email@company.com"
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Số điện thoại *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                        placeholder="0901 234 567"
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Dịch vụ quan tâm *</label>
                      <select
                        value={form.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Nội dung yêu cầu *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition resize-none"
                      placeholder="Mô tả chi tiết yêu cầu của bạn..."
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl font-semibold text-lg hover:brightness-110 transition shadow-lg shadow-secondary/20"
                  >
                    <Send className="w-5 h-5" />
                    Gửi yêu cầu
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
