import { useParams } from "react-router-dom";
import { useStaticPage } from "@/hooks/useData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Loader2 } from "lucide-react";
import NotFound from "./NotFound";

const StaticPageDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: page, isLoading, error } = useStaticPage(slug || "");

    if (isLoading) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cyan animate-spin" />
            </div>
        );
    }

    if (error || !page) {
        return <NotFound />;
    }

    const renderContent = () => {
        const content = page.content;

        // If content is structured JSON (Visual Editor sections)
        if (typeof content === 'object' && content !== null && Array.isArray(content.sections)) {
            return (
                <div className="space-y-12">
                    {content.sections.map((section: any, index: number) => (
                        <ScrollReveal key={section.id || index} delay={index * 0.1}>
                            <div 
                                className="prose prose-invert max-w-none 
                                        prose-headings:text-white prose-p:text-slate-200 prose-li:text-slate-200
                                        prose-strong:text-cyan prose-a:text-cyan hover:prose-a:text-white transition-colors"
                                dangerouslySetInnerHTML={{ __html: section.content }} 
                            />
                        </ScrollReveal>
                    ))}
                </div>
            );
        }

        // If content is a simple HTML string (Quill Editor)
        return (
            <div 
                className="prose prose-invert max-w-none 
                        prose-headings:text-white prose-p:text-slate-200 prose-li:text-slate-200
                        prose-strong:text-cyan prose-a:text-cyan hover:prose-a:text-white transition-colors"
                dangerouslySetInnerHTML={{ __html: typeof content === 'string' ? content : JSON.stringify(content) }} 
            />
        );
    };

    return (
        <div className="min-h-screen bg-navy">
            <Navbar />
            
            {/* Header Section */}
            <section className="relative pt-32 pb-12 section-padding bg-navy/50">
                <div className="container mx-auto relative z-10">
                    <ScrollReveal>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {page.title}
                        </h1>
                        <div className="w-20 h-1 bg-cyan rounded-full" />
                    </ScrollReveal>
                </div>
            </section>

            {/* Content Section */}
            <section className="pb-24 section-padding">
                <div className="container mx-auto">
                    <div className="glass-card rounded-3xl p-8 md:p-12 border-white/5">
                        {renderContent()}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default StaticPageDetail;
