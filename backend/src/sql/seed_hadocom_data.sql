-- SEED DATA FOR HADOCOM (Extracted from Frontend Demo)

-- 1. Banners (Hero Section)
INSERT INTO banners (id, title, description, badge, image_url, link, button_text, features, position, order_index, is_active)
VALUES (
    uuid_generate_v4(),
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

-- 2. Services
INSERT INTO services (id, slug, title, description, icon, image_url, features, is_active)
VALUES 
(
    uuid_generate_v4(),
    'ha-tang-cntt',
    'Hạ tầng CNTT',
    'Máy chủ, hệ thống lưu trữ, thiết bị mạng, WiFi doanh nghiệp, Data Center và giải pháp Cloud.',
    'Server',
    '@/assets/infrastructure-bg.jpg',
    ARRAY['Máy chủ (Server)', 'Hệ thống lưu trữ (Storage)', 'Thiết bị mạng', 'Trung tâm dữ liệu'],
    true
),
(
    uuid_generate_v4(),
    'phat-trien-phan-mem',
    'Phát triển phần mềm',
    'ERP, CRM, HRM, phần mềm quản lý bán hàng, kế toán và phát triển theo yêu cầu.',
    'Code',
    '@/assets/software-bg.jpg',
    ARRAY['ERP / CRM / HRM', 'Phần mềm bán hàng', 'Web & Mobile App', 'Phát triển tùy chỉnh'],
    true
),
(
    uuid_generate_v4(),
    'bao-hanh-bao-tri',
    'Bảo hành & Bảo trì',
    'Bảo trì định kỳ, tối ưu hiệu suất, xử lý sự cố 24/7, giám sát và sao lưu dữ liệu.',
    'Wrench',
    '@/assets/maintenance-bg.jpg',
    ARRAY['Bảo trì định kỳ', 'Xử lý sự cố 24/7', 'Giám sát từ xa', 'Sao lưu & khôi phục'],
    true
);

-- 3. Projects
INSERT INTO projects (id, name, slug, description, image_url, tags, is_featured)
VALUES 
(
    uuid_generate_v4(), 
    'Triển khai hạ tầng mạng doanh nghiệp', 
    'trien-khai-ha-tang-mang',
    'Thiết kế và triển khai hệ thống mạng LAN/WAN, WiFi, firewall cho tòa nhà văn phòng quy mô 500+ nhân viên.', 
    '@/assets/infrastructure-bg.jpg', 
    ARRAY['Cisco', 'Firewall', 'WiFi'],
    true
),
(
    uuid_generate_v4(), 
    'Xây dựng hệ thống ERP', 
    'xay-dung-he-thong-erp',
    'Phát triển và triển khai phần mềm ERP tích hợp quản lý kho, bán hàng và tài chính cho chuỗi phân phối.', 
    '@/assets/software-bg.jpg', 
    ARRAY['ERP', 'Web App', 'API'],
    true
),
(
    uuid_generate_v4(), 
    'Bảo trì hệ thống IT 24/7', 
    'bao-tri-it-247',
    'Dịch vụ bảo trì, giám sát và hỗ trợ kỹ thuật cho hạ tầng CNTT của cơ quan nhà nước.', 
    '@/assets/maintenance-bg.jpg', 
    ARRAY['24/7', 'Monitoring', 'Backup'],
    true
);

-- 4. Team Members (Table: team_members)
INSERT INTO team_members (id, name, role, bio, icon, display_order)
VALUES 
(uuid_generate_v4(), 'Nguyễn Văn Hà', 'Giám đốc điều hành', 'Hơn 15 năm kinh nghiệm trong lĩnh vực CNTT và hạ tầng mạng doanh nghiệp.', 'Target', 1),
(uuid_generate_v4(), 'Trần Minh Đức', 'Giám đốc kỹ thuật', 'Chuyên gia về giải pháp phần mềm và kiến trúc hệ thống phức tạp.', 'Lightbulb', 2),
(uuid_generate_v4(), 'Lê Thị Hương', 'Trưởng phòng dự án', 'Quản lý và triển khai hàng trăm dự án hạ tầng CNTT thành công.', 'Award', 3),
(uuid_generate_v4(), 'Phạm Quốc Bảo', 'Trưởng phòng kỹ thuật', 'Chuyên gia mạng và bảo mật với chứng chỉ quốc tế Cisco, Fortinet.', 'Users', 4);

-- 5. Site Settings
INSERT INTO site_settings (key, value, description)
VALUES 
('about_mission', 'Trở thành đơn vị cung cấp giải pháp hạ tầng CNTT và phần mềm hàng đầu, được khách hàng tin tưởng lựa chọn trong quá trình chuyển đổi số.', 'Sứ mệnh công ty'),
('about_vision', 'Cung cấp giải pháp công nghệ tối ưu, đảm bảo hệ thống vận hành ổn định, an toàn và hiệu quả. Đồng hành dài hạn cùng khách hàng trong suốt vòng đời hệ thống.', 'Tầm nhìn công ty'),
('company_email', 'chi.nt@hadocom.vn', 'Email liên hệ chính'),
('company_phone', '0775 395 879', 'Số điện thoại hotline'),
('company_address', 'TP. Hồ Chí Minh, Việt Nam', 'Địa chỉ văn phòng'),
('company_slogan', 'Công nghệ vững chắc – Vận hành bền bỉ – Đồng hành dài lâu', 'Slogan chân trang');
