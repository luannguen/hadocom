import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import TeamPage from "./pages/TeamPage.tsx";
import PolicyPage from "./pages/PolicyPage.tsx";
import NewsPage from "./pages/NewsPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import RecruitmentPage from "./pages/RecruitmentPage.tsx";
import FAQsPage from "./pages/FAQsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import SEO from "./components/SEO";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SEO />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/doi-ngu" element={<TeamPage />} />
          <Route path="/chinh-sach" element={<PolicyPage />} />
          <Route path="/tin-tuc" element={<NewsPage />} />
          <Route path="/thu-vien" element={<GalleryPage />} />
          <Route path="/su-kien" element={<EventsPage />} />
          <Route path="/tuyen-dung" element={<RecruitmentPage />} />
          <Route path="/faq" element={<FAQsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
