import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  MessageSquare, 
  Share2, 
  Info, 
  Settings, 
  ShieldCheck, 
  Clock,
  ChevronRight,
  Loader2,
  Package
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProductInquiryModal from "@/components/ProductInquiryModal";
import { useProductBySlug, useProducts } from "@/hooks/useData";

const ProductDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: product, isLoading, error } = useProductBySlug(slug || "");
    const { data: relatedProducts } = useProducts(product?.category_id);
    
    // Tab & Modal State
    const [activeTab, setActiveTab] = useState<'features' | 'specs'>('features');
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050A1A] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-cyan animate-spin" />
                    <p className="text-white/40 animate-pulse font-medium">Đang tải thông tin sản phẩm...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#050A1A] flex flex-col items-center justify-center p-4">
                <Package className="w-20 h-20 text-white/10 mb-6" />
                <h1 className="text-3xl font-bold text-white mb-4 text-center">Sản phẩm không tồn tại</h1>
                <p className="text-white/60 mb-8 max-w-md text-center">Rất tiếc, sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ khỏi hệ thống.</p>
                <Link to="/san-pham" className="flex items-center gap-2 bg-cyan text-navy px-8 py-3 rounded-xl font-bold hover:brightness-110 transition shadow-xl shadow-cyan/20">
                    <ArrowLeft className="w-5 h-5" /> Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050A1A]">
            <Navbar />

            {/* Breadcrumbs & Simple Nav */}
            <div className="pt-28 pb-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
                        <Link to="/" className="hover:text-cyan transition-colors">Trang chủ</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/san-pham" className="hover:text-cyan transition-colors">Sản phẩm</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white/80">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Main Product Section */}
            <section className="pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Image Gallery */}
                        <ScrollReveal>
                            <div className="space-y-6">
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-navy group border border-white/5 shadow-2xl">
                                    {product.image_url ? (
                                        <img 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/10 bg-white/5">
                                            <Package className="w-32 h-32" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    
                                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                                        {product.is_new && (
                                            <span className="bg-cyan text-navy text-xs font-black uppercase tracking-tighter px-3 py-1.5 rounded-lg shadow-2xl">NEW ARRIVAL</span>
                                        )}
                                        {product.is_bestseller && (
                                            <span className="bg-secondary text-white text-xs font-black uppercase tracking-tighter px-3 py-1.5 rounded-lg shadow-2xl">BEST SELLER</span>
                                        )}
                                    </div>
                                </div>

                                {/* Placeholder for small thumbnails if needed */}
                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-white/5 border border-white/5 overflow-hidden hover:border-cyan/30 transition-all cursor-pointer">
                                            <div className="w-full h-full flex items-center justify-center text-white/5">
                                                <Package className="w-1/2 h-1/2 opacity-20" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Product Info */}
                        <ScrollReveal delay={0.2}>
                            <div className="flex flex-col h-full">
                                <div className="mb-8">
                                    <span className="inline-block px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold uppercase tracking-widest mb-4">
                                        {typeof product.category === 'object' ? product.category?.name : 'Technology Solution'}
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                        {product.name}
                                    </h1>
                                    <p className="text-xl text-white/60 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Key Features Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center text-cyan shrink-0">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">Bảo hành 12-24 tháng</h4>
                                            <p className="text-white/40 text-xs mt-1">Cam kết chính hãng 100%</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                                        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">Hỗ trợ 24/7</h4>
                                            <p className="text-white/40 text-xs mt-1">Đội ngũ kỹ thuật chuyên nghiệp</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-auto">
                                    <button 
                                        onClick={() => setIsInquiryModalOpen(true)}
                                        className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-cyan text-navy px-8 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-cyan/20 transition-all hover:-translate-y-1 active:scale-95"
                                    >
                                        Liên hệ nhận báo giá <MessageSquare className="w-6 h-6" />
                                    </button>
                                    <button className="w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 hover:text-cyan hover:border-cyan/30 transition-all">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Detailed Content Tabs */}
            <section className="py-20 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-8 border-b border-white/10 mb-12">
                            <button 
                                onClick={() => setActiveTab('features')}
                                className={`relative pb-4 font-bold text-lg transition-all tracking-wide ${
                                    activeTab === 'features' ? 'text-cyan after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-cyan after:rounded-full' : 'text-white/40 hover:text-white/80'
                                }`}
                            >
                                Đặc điểm nổi bật
                            </button>
                            <button 
                                onClick={() => setActiveTab('specs')}
                                className={`relative pb-4 font-bold text-lg transition-all tracking-wide ${
                                    activeTab === 'specs' ? 'text-cyan after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-cyan after:rounded-full' : 'text-white/40 hover:text-white/80'
                                }`}
                            >
                                Thông số kỹ thuật
                            </button>
                        </div>

                        <div className="min-h-[400px]">
                            {activeTab === 'features' ? (
                                <ScrollReveal key="features">
                                    <div className="space-y-8 max-w-2xl">
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <Info className="w-6 h-6 text-cyan" /> Tại sao nên chọn ?
                                        </h3>
                                        <div className="space-y-4">
                                            {product.features && product.features.length > 0 ? (
                                                product.features.map((feature, i) => (
                                                    <motion.div 
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        key={i} 
                                                        className="flex gap-4 items-start p-5 bg-white/5 border border-white/10 rounded-2xl group transition-all hover:bg-white/10 hover:border-cyan/20"
                                                    >
                                                        <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                                                        <p className="text-white/70 leading-relaxed text-lg">
                                                            {feature}
                                                        </p>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl">
                                                    <CheckCircle2 className="w-6 h-6 text-cyan shrink-0 mt-0.5" />
                                                    <p className="text-white/70 leading-relaxed text-lg">
                                                        Liên hệ HADOCOM để được cung cấp thông tin kỹ thuật và tính năng chi tiết nhất cho thiết bị này.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ) : (
                                <ScrollReveal key="specs" delay={0.1}>
                                    <div className="space-y-8">
                                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <Settings className="w-6 h-6 text-secondary" /> Cấu hình kỹ thuật
                                        </h3>
                                        <div className="rounded-3xl border border-white/10 overflow-hidden bg-navy/50 shadow-2xl">
                                            {product.specifications && Object.keys(product.specifications).length > 0 ? (
                                                <table className="w-full text-left border-collapse">
                                                    <tbody>
                                                        {Object.entries(product.specifications).map(([key, value], index) => (
                                                            <motion.tr 
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: index * 0.05 }}
                                                                key={key} 
                                                                className={index % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'}
                                                            >
                                                                <th className="py-5 px-8 text-white/40 font-semibold text-sm w-1/3 border-b border-white/5">{key}</th>
                                                                <td className="py-5 px-8 text-white/80 font-medium text-sm border-b border-white/5">{value}</td>
                                                            </motion.tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="p-12 text-center text-white/40 italic flex flex-col items-center gap-4">
                                                    <Settings className="w-12 h-12 opacity-20 animate-spin-slow" />
                                                    Thông tin cấu hình chưa sẵn sẵn hoặc đang được cập nhật.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <ProductInquiryModal 
                isOpen={isInquiryModalOpen}
                onOpenChange={setIsInquiryModalOpen}
                product={product}
            />

            {/* Related Products */}
            {relatedProducts && relatedProducts.length > 1 && (
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold text-white tracking-tight">Sản phẩm <span className="text-cyan">tương tự</span></h2>
                            <Link to="/san-pham" className="text-cyan hover:underline font-bold text-sm flex items-center gap-2">
                                Xem tất cả <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((rp) => (
                                <Link key={rp.id} to={`/san-pham/${rp.slug}`} className="group">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-navy hover:shadow-2xl hover:shadow-cyan/10 hover:border-cyan/30">
                                        <div className="aspect-square rounded-xl bg-navy mb-4 overflow-hidden">
                                            {rp.image_url ? (
                                                <img src={rp.image_url} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/10">
                                                    <Package className="w-12 h-12" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-white group-hover:text-cyan transition-colors truncate">{rp.name}</h4>
                                        <p className="text-xs text-white/40 mt-1 line-clamp-1">{rp.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
