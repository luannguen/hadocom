
-- HADOCOM REBRANDING MIGRATION V3 (ROBUST)

-- 1. Create Navigation Table if missing
CREATE TABLE IF NOT EXISTS public.navigation (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    label text NOT NULL,
    path text NOT NULL,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    position text DEFAULT 'header',
    parent_id uuid REFERENCES public.navigation(id),
    created_at timestamptz DEFAULT now()
);

-- 2. Clear and Seed Navigation
TRUNCATE public.navigation CASCADE;

INSERT INTO public.navigation (label, path, order_index, position) VALUES
('nav.home', '/', 0, 'header'),
('nav.about', '/about', 1, 'header'),
('nav.services', '/services', 2, 'header'),
('nav.projects', '/projects', 3, 'header'),
('nav.news', '/news', 4, 'header'),
('nav.contact', '/contact', 5, 'header'),
('nav.privacy', '/legal/privacy', 0, 'footer'),
('nav.terms', '/legal/terms', 1, 'footer'),
('nav.cookie', '/legal/cookie-policy', 2, 'footer'),
('nav.sitemap', '/sitemap', 3, 'footer');

-- 3. Update Site Settings with ON CONFLICT
INSERT INTO site_settings (key, value, description, updated_at) VALUES
('site_name', 'HADOCOM', 'Tên ngắn website', NOW()),
('site_title', 'HADOCOM - Công nghệ vững chắc, Vận hành bền bỉ', 'SEO Title', NOW()),
('site_description', 'Giải pháp hạ tầng CNTT, phát triển phần mềm và dịch vụ bảo hành hệ thống.', 'SEO Description', NOW()),
('site_keywords', 'HADOCOM, CNTT, phần mềm, bảo trì, hạ tầng mạng', 'SEO Keywords', NOW()),
('contact_email', 'chi.nt@hadocom.vn', 'Email liên hệ', NOW()),
('contact_phone', '0775 395 879', 'Hotline', NOW()),
('company_address', 'TP. Hồ Chí Minh, Việt Nam', 'Địa chỉ', NOW()),
('copyright_text', '© 2026 HADOCOM. All rights reserved.', 'Copyright Footer', NOW()),
('company_slogan', 'Công nghệ vững chắc – Vận hành bền bỉ – Đồng hành dài lâu', 'Slogan Footer', NOW()),
('logo_url', '/logo-hadocom.png', 'Đường dẫn Logo', NOW()),
('favicon_url', '/favicon.ico', 'Đường dẫn Favicon', NOW())
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- 4. Update Admin User
UPDATE public.users 
SET email = 'admin@hadocom.vn', 
    full_name = 'HADOCOM Administrator' 
WHERE email = 'admin@vrc.com.vn' OR email = 'admin@hadocom.vn';

-- 5. Content Cleanup
UPDATE news SET title = REPLACE(title, 'VRC', 'HADOCOM'), excerpt = REPLACE(excerpt, 'VRC', 'HADOCOM') WHERE title LIKE '%VRC%' OR excerpt LIKE '%VRC%';
UPDATE projects SET title = REPLACE(title, 'VRC', 'HADOCOM'), description = REPLACE(description, 'VRC', 'HADOCOM') WHERE title LIKE '%VRC%' OR description LIKE '%VRC%';
UPDATE services SET title = REPLACE(title, 'VRC', 'HADOCOM'), description = REPLACE(description, 'VRC', 'HADOCOM') WHERE title LIKE '%VRC%' OR description LIKE '%VRC%';
