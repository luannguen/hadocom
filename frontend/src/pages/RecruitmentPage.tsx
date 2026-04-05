import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useJobs, useApplyJob, Job } from "@/hooks/useData";
import { useTranslation } from "react-i18next";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const JobCard = ({ job, onClick }: { job: Job; onClick: () => void }) => {
  const { t } = useTranslation();
  
  return (
    <ScrollReveal>
      <div 
        onClick={onClick}
        className="glass-card rounded-2xl p-6 hover:glow-cyan transition-all duration-300 cursor-pointer group border border-white/10 hover:border-cyan/30"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-xl bg-cyan/10 text-cyan group-hover:bg-cyan group-hover:text-white transition-colors">
            <Briefcase className="w-6 h-6" />
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-white/60 border border-white/10">
            {job.type || "Full-time"}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan transition-colors line-clamp-1">{job.title}</h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{job.location || "Hà Nội, Việt Nam"}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <DollarSign className="w-4 h-4" />
            <span>{job.salary || t("recruitment.salaryNegotiable") || "Thỏa thuận"}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{t("recruitment.deadline")}: {job.deadline ? new Date(job.deadline).toLocaleDateString() : "ASAP"}</span>
          </div>
        </div>
        
        <div className="flex items-center text-cyan text-sm font-semibold group-hover:gap-2 transition-all">
          {t("recruitment.jobDetail")} <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </ScrollReveal>
  );
};

const JobDetailModal = ({ job, isOpen, onClose, onApply }: { job: Job | null; isOpen: boolean; onClose: () => void; onApply: () => void }) => {
  const { t } = useTranslation();
  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden glass-card rounded-3xl flex flex-col border border-white/20 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-white/5">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{job.title}</h2>
                <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-cyan" /> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-cyan" /> {job.type}</div>
                  <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-cyan" /> {job.salary}</div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/50" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              <section>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan" /> {t("recruitment.jobDetail")}
                </h3>
                <div 
                  className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </section>

              {job.requirements && (
                <section>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan" /> {t("recruitment.requirements")}
                  </h3>
                  <div 
                    className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                  />
                </section>
              )}

              {job.benefits && (
                <section>
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan" /> {t("recruitment.benefits")}
                  </h3>
                  <div 
                    className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: job.benefits }}
                  />
                </section>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-white/10 bg-white/5 flex justify-end">
              <button 
                onClick={onApply}
                className="bg-cyan text-navy font-extrabold px-12 py-4 rounded-xl hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-cyan/20 uppercase tracking-wider"
              >
                {t("recruitment.applyNow")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ApplyForm = ({ job, isOpen, onClose }: { job: Job | null; isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const applyMutation = useApplyJob();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cv_url: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setLoading(true);
    try {
      await applyMutation({
        job_id: job.id,
        ...formData
      });
      toast({
        title: t("recruitment.success"),
        description: t("recruitment.successDesc"),
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("recruitment.error"),
        description: "Vui lòng kiểm tra lại thông tin.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-8 border border-white/20 shadow-2xl custom-scrollbar"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{t("recruitment.formTitle")}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-white/50" />
              </button>
            </div>
            
            <p className="text-cyan font-medium mb-8 pb-4 border-b border-white/10">{job.title}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan" /> {t("recruitment.fullName")}
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  placeholder="Nguyễn Văn A"
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan" /> {t("recruitment.email")}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan" /> {t("recruitment.phone")}
                  </label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                    placeholder="09xx xxx xxx"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-cyan" /> {t("recruitment.cvUrl")}
                </label>
                <input
                  required
                  type="url"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  placeholder="https://drive.google.com/..."
                  value={formData.cv_url}
                  onChange={e => setFormData({...formData, cv_url: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan" /> {t("recruitment.message")}
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all resize-none"
                  placeholder="..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-cyan text-navy font-bold py-4 rounded-xl hover:brightness-110 transition shadow-lg shadow-cyan/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? t("recruitment.submitting") : t("recruitment.submit")}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const RecruitmentPage = () => {
  const { t } = useTranslation();
  const { data: jobs, isLoading } = useJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto relative z-10 px-6 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("recruitment.title")} <span className="text-gradient">HADOCOM</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl">
              {t("recruitment.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats/Benefits Preview */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: t("recruitment.benefits_env_title"), desc: t("recruitment.benefits_env_desc") },
              { icon: Award, title: t("recruitment.benefits_salary_title"), desc: t("recruitment.benefits_salary_desc") },
              { icon: Lightbulb, title: t("recruitment.benefits_growth_title"), desc: t("recruitment.benefits_growth_desc") }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-8 rounded-2xl border border-white/5 flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Job List */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center md:text-left">
              {t("recruitment.openingJobs")}
            </h2>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[300px] bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : !jobs || jobs.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center border border-white/5">
              <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">{t("recruitment.noJobs")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onClick={() => {
                    setSelectedJob(job);
                    setIsDetailOpen(true);
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <JobDetailModal 
        isOpen={isDetailOpen}
        job={selectedJob}
        onClose={() => setIsDetailOpen(false)}
        onApply={() => {
          setIsDetailOpen(false);
          setIsApplyOpen(true);
        }}
      />

      <ApplyForm 
        isOpen={isApplyOpen}
        job={selectedJob}
        onClose={() => setIsApplyOpen(false)}
      />
    </div>
  );
};

const Lightbulb = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);

const Award = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default RecruitmentPage;
