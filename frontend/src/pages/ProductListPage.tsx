import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Package, 
  ArrowRight, 
  ArrowUpRight,
  ChevronRight,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useProducts, useCategories } from "@/hooks/useData";

const ProductListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    const { data: categories, isLoading: categoriesLoading } = useCategories('product');
    const { data: allProducts, isLoading: productsLoading } = useProducts(selectedCategory || undefined);

    const filteredProducts = allProducts?.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-[#050A1A]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan/10 blur-[120px] rounded-full animate-pulse-slow" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-secondary/10 blur-[100px] rounded-full" />
                </div>

                <div className="container relative z-10 mx-auto px-4">
                    <ScrollReveal>
                        <div className="max-w-3xl">
                            <span className="inline-block py-1 px-3 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold uppercase tracking-wider mb-6">
                                Eco-system Solutions
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                                Giải pháp <span className="text-gradient">Công nghệ</span> <br />
                                Hiện đại cho Doanh nghiệp
                            </h1>
                            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                                Khám phá các sản phẩm và giải pháp công nghệ tiên tiến nhất từ HADOCOM, 
                                giúp doanh nghiệp của bạn tối ưu hóa vận hành và phát triển bền vững.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="sticky top-20 z-40 bg-[#050A1A]/80 backdrop-blur-md border-y border-white/5 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    selectedCategory === null 
                                    ? 'bg-cyan text-navy shadow-lg shadow-cyan/20' 
                                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                                }`}
                            >
                                Tất cả
                            </button>
                            {categories?.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        selectedCategory === cat.id 
                                        ? 'bg-cyan text-navy shadow-lg shadow-cyan/20' 
                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-cyan transition-colors" />
                            <input 
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-cyan/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                   {productsLoading ? (
                       <div className="flex flex-col items-center justify-center py-20 gap-4">
                           <Loader2 className="w-12 h-12 text-cyan animate-spin" />
                           <p className="text-white/40 animate-pulse">Đang tải danh sách sản phẩm...</p>
                       </div>
                   ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <Link to={`/san-pham/${product.slug}`} className="block h-full">
                                            <div className="relative h-full flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-cyan/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan/5 shadow-inner">
                                                {/* Image Area */}
                                                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                                                    {product.image_url ? (
                                                        <img 
                                                            src={product.image_url} 
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/10 bg-white/5">
                                                            <Package className="w-16 h-16" />
                                                        </div>
                                                    )}
                                                    
                                                    {/* Badges */}
                                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                                        {product.is_new && (
                                                            <span className="bg-cyan text-navy text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md shadow-lg">NEW</span>
                                                        )}
                                                        {product.is_bestseller && (
                                                            <span className="bg-secondary text-white text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md shadow-lg">BEST</span>
                                                        )}
                                                    </div>

                                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </div>

                                                {/* Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-[10px] font-bold text-cyan/70 uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan/5 border border-cyan/10">
                                                            {typeof product.category === 'object' ? product.category?.name : 'Product'}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan transition-colors line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-white/50 leading-relaxed line-clamp-3 mb-6 flex-1">
                                                        {product.description}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                                        <span className="text-white/30 text-xs font-medium flex items-center gap-1 group-hover:text-white/60 transition-colors">
                                                            Chi tiết <ChevronRight className="w-3 h-3" />
                                                        </span>
                                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan group-hover:text-navy transition-all duration-300">
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                   ) : (
                        <div className="text-center py-20">
                            <Package className="w-16 h-16 text-white/10 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy sản phẩm</h3>
                            <p className="text-white/40">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
                            <button 
                                onClick={() => {setSelectedCategory(null); setSearchQuery("");}}
                                className="mt-6 text-cyan hover:underline font-medium"
                            >
                                Xóa tất cả bộ lọc
                            </button>
                        </div>
                   )}
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-br from-cyan/20 via-navy to-navy border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan/10 blur-[100px] -mr-[150px] -mt-[150px]" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-xl text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bạn chưa tìm thấy sản phẩm mong muốn?</h2>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    Chúng tôi cung cấp các giải pháp tùy chỉnh theo đặc thù của từng doanh nghiệp. 
                                    Liên hệ ngay để được chuyên gia tư vấn trực tiếp.
                                </p>
                            </div>
                            <Link 
                                to="/#contact"
                                className="bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-secondary/30 transition-all hover:scale-105 flex items-center gap-3 whitespace-nowrap"
                            >
                                Nhận tư vấn miễn phí <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProductListPage;
