# Product Context: HADOCOM User Flows & Features

Tài liệu này giải thích cách HADOCOM vận hành từ góc độ người dùng và các tính năng nghiệp vụ.

## Các Module chính

### 1. Visual Editor (Trình soạn thảo trực quan)
- Cho phép Admin chỉnh sửa giao diện và nội dung trực tiếp trên trang.
- Các Section được quản lý theo dạng block (Hero, Features, News, v.v.).
- Đồng bộ thời gian thực giữa Editor và Database thông qua Supabase.

### 2. Quản lý Tuyển dụng (Recruitment)
- Đăng tải tin tuyển dụng theo danh mục.
- Quản lý hồ sơ ứng viên (Resume) và quy trình xét duyệt.

### 3. Danh mục Dịch vụ (Service Categories)
- Quản lý các mảng dịch vụ của tập đoàn (Hệ thống lạnh, Kỹ thuật, v.v.).
- Hỗ trợ đa ngôn ngữ (Vietnamese, English).

### 5. Dữ liệu Mẫu (Seeded Data Status)
Hệ thống đã có sẵn dữ liệu mẫu thực tế trong các file SQL của backend:
- **Hero Banners**: Tên HADOCOM, slogan, các icon như `Shield`, `Cpu`, `Headphones`.
- **Dịch vụ**: 3 dịch vụ cơ bản (Hạ tầng, Phần mềm, Bảo trì) với đầy đủ ảnh nền `@/assets/...-bg.jpg`.
- **Dự án (Projects)**: 2 dự án tiêu biểu (Lắp đặt mạng, ERP).
- **Thành viên**: Ban lãnh đạo với icon `Target`, `Lightbulb`, `Award`, `Users`.

### 6. Cơ chế Asset & Image Handling
Trong HADOCOM, một "Fact" quan trọng là cách xử lý hình ảnh:
- **DB field**: `image_url` hoặc `icon` lưu chuỗi (string).
- **FE mapping**: Component sử dụng các bản đồ (Maps) như `iconMap` & `imageMap` để chuyển chuỗi đó thành biểu tượng (Lucide Icon) hoặc ảnh import thực tế.
- **Admin Challenge**: Giao diện Admin sắp tới phải hỗ trợ chọn Icon từ danh sách có sẵn và quản lý đường dẫn Asset đúng quy tắc này.

