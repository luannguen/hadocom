import { useParams, Link } from "react-router-dom";
import { useNewsBySlug, useNews } from "@/hooks/useData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Calendar, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const NewsDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: article, isLoading } = useNewsBySlug(slug || "");
    const { data: relatedArticles } = useNews(article?.category_id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-navy text-white">
                <Navbar />
                <div className="container mx-auto pt-32 pb-20 px-4">
                    <Skeleton className="h-4 w-24 mb-6 bg-white/10" />
                    <Skeleton className="h-12 w-3/4 mb-4 bg-white/10" />
                    <Skeleton className="h-6 w-1/4 mb-8 bg-white/10" />
                    <Skeleton className="h-[400px] w-full rounded-2xl mb-10 bg-white/10" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full bg-white/10" />
                        <Skeleton className="h-4 w-full bg-white/10" />
                        <Skeleton className="h-4 w-2/3 bg-white/10" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-navy text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h2>
                        <Button asChild variant="outline">
                            <Link to="/tin-tuc">Quay lại danh sách</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const otherArticles = relatedArticles?.filter(a => a.id !== article.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-cyan/30">
            <Navbar />
            
            {/* Breadcrumb & Navigation */}
            <div className="container mx-auto pt-32 px-4">
                <ScrollReveal>
                    <Link to="/tin-tuc" className="inline-flex items-center gap-2 text-white/50 hover:text-cyan transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Quay lại tin tức
                    </Link>
                </ScrollReveal>
            </div>

            {/* Article Header */}
            <article className="pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <ScrollReveal>
                            {article.category && (
                                <span className="inline-block px-3 py-1 rounded-full bg-cyan/10 text-cyan text-xs font-bold uppercase tracking-wider mb-6 border border-cyan/20">
                                    {article.category.name}
                                </span>
                            )}
                            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white line-clamp-none">
                                {article.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-white/50 mb-10 pb-10 border-b border-white/10 italic">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(article.created_at || "").toLocaleDateString("vi-VN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    HADOCOM News
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Featured Image */}
                        <ScrollReveal delay={0.1}>
                            <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-cyan/5 border border-white/5 bg-white/5">
                                <img 
                                    src={article.image_url} 
                                    alt={article.title}
                                    className="w-full aspect-video object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent pointer-events-none"></div>
                            </div>
                        </ScrollReveal>

                        {/* Article Content */}
                        <ScrollReveal delay={0.2}>
                            <div 
                                className="prose prose-invert prose-lg max-w-none 
                                prose-headings:text-white prose-p:text-white/80 prose-a:text-cyan 
                                prose-strong:text-white prose-img:rounded-2xl prose-blockquote:border-cyan
                                prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-r-xl
                                article-content mb-20"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </ScrollReveal>

                        {/* Social Share */}
                        <div className="flex items-center justify-between py-10 border-y border-white/5 mb-20">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-white/50">Chia sẻ bài viết:</span>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full bg-white/5 hover:bg-cyan/20 hover:text-cyan transition-colors">
                                        <Facebook className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-full bg-white/5 hover:bg-cyan/20 hover:text-cyan transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-full bg-white/5 hover:bg-cyan/20 hover:text-cyan transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <Button variant="link" className="text-white/50 hover:text-cyan gap-2 decoration-transparent">
                                <MessageSquare className="w-4 h-4" />
                                Phản hồi bài viết
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {otherArticles && otherArticles.length > 0 && (
                    <div className="bg-white/5 py-20 border-t border-white/5">
                        <div className="container mx-auto px-4">
                            <div className="max-w-6xl mx-auto">
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="text-3xl font-bold text-white">Tin tức <span className="text-gradient">liên quan</span></h2>
                                    <Link to="/tin-tuc" className="text-cyan text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        Tất cả bài viết <ArrowLeft className="rotate-180 w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    {otherArticles.map((a, i) => (
                                        <ScrollReveal key={a.id} delay={i * 0.1}>
                                            <Link to={`/tin-tuc/${a.slug}`} className="group block h-full">
                                                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col border border-white/5 group-hover:border-white/10 group-hover:glow-cyan transition-all duration-300">
                                                    <div className="h-48 overflow-hidden">
                                                        <img 
                                                            src={a.image_url} 
                                                            alt={a.title} 
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                        />
                                                    </div>
                                                    <div className="p-6 flex flex-col flex-1">
                                                        <span className="text-white/40 text-[10px] uppercase font-bold mb-3 block">
                                                            {a.category?.name || 'Tin tức'}
                                                        </span>
                                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan transition-colors">
                                                            {a.title}
                                                        </h3>
                                                        <p className="text-white/50 text-sm line-clamp-2 mb-4 flex-1">
                                                            {a.excerpt}
                                                        </p>
                                                        <span className="text-cyan text-sm flex items-center gap-1 font-medium items-end">
                                                            Đọc thêm <ArrowLeft className="rotate-180 w-4 h-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </article>

            <Footer />
        </div>
    );
};

export default NewsDetailPage;
