-- HADOCOM DATABASE INITIALIZATION SCRIPT (FULL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 0. RBAC & Users tables (CORE)
CREATE TABLE IF NOT EXISTS public.roles (
    id text PRIMARY KEY,
    name text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.permissions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    code text UNIQUE NOT NULL,
    description text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id text REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id uuid REFERENCES public.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY, -- Will reference auth.users(id)
    email text UNIQUE NOT NULL,
    full_name text,
    avatar_url text,
    role text REFERENCES public.roles(id) DEFAULT 'user',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 1. Site Settings table
CREATE TABLE IF NOT EXISTS site_settings (
    key text PRIMARY KEY,
    value text NOT NULL,
    description text,
    updated_at timestamptz DEFAULT now()
);

-- 2. Service Categories table
CREATE TABLE IF NOT EXISTS service_categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 3. Services table
CREATE TABLE IF NOT EXISTS services (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    content text,
    icon text,
    image_url text,
    category_id uuid REFERENCES service_categories(id),
    features text[] DEFAULT '{}',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 4. Banners table
CREATE TABLE IF NOT EXISTS banners (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text,
    description text,
    badge text,
    image_url text NOT NULL,
    link text,
    button_text text,
    features jsonb DEFAULT '[]',
    position text NOT NULL DEFAULT 'home_main',
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Projects table
CREATE TABLE IF NOT EXISTS projects (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    content text,
    image_url text,
    client text,
    completion_date date,
    category_id uuid REFERENCES service_categories(id),
    tags text[] DEFAULT '{}',
    is_featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 6. News table
CREATE TABLE IF NOT EXISTS news (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    summary text,
    content text,
    image_url text,
    publish_date timestamptz DEFAULT now(),
    author text,
    category_id uuid REFERENCES service_categories(id),
    tags text[] DEFAULT '{}',
    views integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 7. Team Members table
CREATE TABLE IF NOT EXISTS team_members (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    role text NOT NULL,
    bio text,
    image_url text,
    icon text,
    display_order integer DEFAULT 0,
    social_links jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 8. Service Inquiries table
CREATE TABLE IF NOT EXISTS service_inquiries (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id uuid REFERENCES services(id),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    company text,
    message text,
    status text DEFAULT 'new',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- SEED DATA PREPARATION

-- Disable RLS for development to ensure frontend can read data
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_inquiries DISABLE ROW LEVEL SECURITY;

-- Delete existing data to avoid conflicts on unique constraints/re-run safety
DELETE FROM auth.users WHERE email = 'admin@vrc.com.vn'; -- Force refresh admin metadata
TRUNCATE site_settings CASCADE;
TRUNCATE service_categories CASCADE;
TRUNCATE banners CASCADE;
TRUNCATE team_members CASCADE;
TRUNCATE public.roles CASCADE;
TRUNCATE public.permissions CASCADE;
TRUNCATE public.users CASCADE;

-- 0. RBAC Roles
INSERT INTO public.roles (id, name, description)
VALUES 
    ('admin', 'Administrator', 'Full system access'),
    ('user', 'Standard User', 'Calculated limited access');

-- 1. Banners
INSERT INTO banners (title, description, badge, image_url, link, button_text, features, position, order_index, is_active)
VALUES (
    'Công nghệ vững chắc Vận hành bền bỉ',
    'Giải pháp hạ tầng CNTT, phát triển phần mềm và dịch vụ bảo trì hệ thống — đồng hành dài lâu cùng doanh nghiệp của bạn.',
    'Công ty TNHH HADOCOM',
    '@/assets/hero-bg.jpg',
    '#contact',
    'Liên hệ ngay',
    '[{"icon": "Shield", "label": "Bảo mật", "desc": "An toàn tối đa"}, {"icon": "Cpu", "label": "Hạ tầng", "desc": "Giải pháp toàn diện"}, {"icon": "Headphones", "label": "Hỗ trợ", "desc": "24/7"}]'::jsonb,
    'home_main',
    1,
    true
);

-- 2. Service Categories
INSERT INTO service_categories (id, name, slug, description, display_order)
VALUES 
    ('c1111111-1111-1111-1111-111111111111', 'Hạ tầng', 'ha-tang', 'Giải pháp phần cứng và mạng', 1),
    ('c2222222-2222-2222-2222-222222222222', 'Phần mềm', 'phan-mem', 'Phát triển ứng dụng và ERP', 2);

-- 3. Services
INSERT INTO services (slug, title, description, icon, image_url, features, category_id)
VALUES 
(
    'ha-tang-cntt',
    'Hạ tầng CNTT',
    'Máy chủ, hệ thống lưu trữ, thiết bị mạng, WiFi doanh nghiệp, Data Center và giải pháp Cloud.',
    'Server',
    '@/assets/infrastructure-bg.jpg',
    ARRAY['Máy chủ (Server)', 'Hệ thống lưu trữ (Storage)', 'Thiết bị mạng', 'Trung tâm dữ liệu'],
    'c1111111-1111-1111-1111-111111111111'
),
(
    'phat-trien-phan-mem',
    'Phát triển phần mềm',
    'ERP, CRM, HRM, phần mềm quản lý bán hàng, kế toán và phát triển theo yêu cầu.',
    'Code',
    '@/assets/software-bg.jpg',
    ARRAY['ERP / CRM / HRM', 'Phần mềm bán hàng', 'Web & Mobile App', 'Phát triển tùy chỉnh'],
    'c2222222-2222-2222-2222-222222222222'
),
(
    'bao-hanh-bao-tri',
    'Bảo hành & Bảo trì',
    'Bảo trì định kỳ, tối ưu hiệu suất, xử lý sự cố 24/7, giám sát và sao lưu dữ liệu.',
    'Wrench',
    '@/assets/maintenance-bg.jpg',
    ARRAY['Bảo trì định kỳ', 'Xử lý sự cố 24/7', 'Giám sát từ xa', 'Sao lưu & khôi phục'],
    'c1111111-1111-1111-1111-111111111111'
);

-- 4. Projects
INSERT INTO projects (name, slug, description, image_url, tags, is_featured, category_id)
VALUES 
(
    'Triển khai hạ tầng mạng doanh nghiệp', 
    'trien-khai-ha-tang-mang',
    'Thiết kế và triển khai hệ thống mạng LAN/WAN, WiFi, firewall cho tòa nhà văn phòng quy mô 500+ nhân viên.', 
    '@/assets/infrastructure-bg.jpg', 
    ARRAY['Cisco', 'Firewall', 'WiFi'],
    true,
    'c1111111-1111-1111-1111-111111111111'
),
(
    'Xây dựng hệ thống ERP', 
    'xay-dung-he-thong-erp',
    'Phát triển và triển khai phần mềm ERP tích hợp quản lý kho, bán hàng và tài chính cho chuỗi phân phối.', 
    '@/assets/software-bg.jpg', 
    ARRAY['ERP', 'Web App', 'API'],
    true,
    'c2222222-2222-2222-2222-222222222222'
);

-- 5. Team Members
INSERT INTO team_members (name, role, bio, icon, display_order)
VALUES 
('Nguyễn Văn Hà', 'Giám đốc điều hành', 'Hơn 15 năm kinh nghiệm trong lĩnh vực CNTT và hạ tầng mạng doanh nghiệp.', 'Target', 1),
('Trần Minh Đức', 'Giám đốc kỹ thuật', 'Chuyên gia về giải pháp phần mềm và kiến trúc hệ thống phức tạp.', 'Lightbulb', 2),
('Lê Thị Hương', 'Trưởng phòng dự án', 'Quản lý và triển khai hàng trăm dự án hạ tầng CNTT thành công.', 'Award', 3),
('Phạm Quốc Bảo', 'Trưởng phòng kỹ thuật', 'Chuyên gia mạng và bảo mật với chứng chỉ quốc tế Cisco, Fortinet.', 'Users', 4);

-- 6. Site Settings
INSERT INTO site_settings (key, value, description)
VALUES 
('about_mission', 'Trở thành đơn vị cung cấp giải pháp hạ tầng CNTT và phần mềm hàng đầu, được khách hàng tin tưởng lựa chọn trong quá trình chuyển đổi số.', 'Sứ mệnh công ty'),
('about_vision', 'Cung cấp giải pháp công nghệ tối ưu, đảm bảo hệ thống vận hành ổn định, an toàn và hiệu quả. Đồng hành dài hạn cùng khách hàng trong suốt vòng đời hệ thống.', 'Tầm nhìn công ty'),
('company_email', 'chi.nt@hadocom.vn', 'Email liên hệ chính'),
('company_phone', '0775 395 879', 'Số điện thoại hotline'),
('company_address', 'TP. Hồ Chí Minh, Việt Nam', 'Địa chỉ văn phòng'),
('company_slogan', 'Công nghệ vững chắc – Vận hành bền bỉ – Đồng hành dài lâu', 'Slogan chân trang');

-- 7. News Data
INSERT INTO news (title, slug, summary, content, image_url, author, tags)
VALUES 
(
    'Hadocom hỗ trợ chuyển đổi số cho doanh nghiệp 2024',
    'hadocom-ho-tro-chuyen-doi-so-2024',
    'Chúng tôi tự hào là đối tác tin cậy cung cấp các giải pháp công nghệ mới nhất cho khách hàng.',
    'Nội dung tin tức chi tiết sẽ được cập nhật sau...',
    '@/assets/infrastructure-bg.jpg',
    'Admin',
    ARRAY['Tin tức', 'Dịch vụ']
),
(
    'Khai trương văn phòng mới tại TP.HCM',
    'khai-truong-van-phong-moi-hcm',
    'Sự kiện đánh dấu bước tiến mới của Hadocom trong việc mở rộng quy mô phục vụ khách hàng.',
    'Nội dung tin tức về văn phòng mới...',
    '@/assets/software-bg.jpg',
    'Văn Hà',
    ARRAY['Sự kiện', 'Thông báo']
);
