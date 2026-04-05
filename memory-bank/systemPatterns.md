# System Patterns: HADOCOM Architecture

Dự án HADOCOM tuân thủ các quy tắc kiến trúc nghiêm ngặt (Strict Rules) để đảm bảo khả năng bảo trì và mở rộng.

## 1. Kiến trúc 3 Lớp (Strict 3-Layer)
Tất cả code phải được phân lớp rõ ràng:
- **UI (Components/Pages)**: Chỉ hiển thị dữ liệu và nhận input.
- **Hooks (Logic/State)**: Quản lý trạng thái và kết nối UI với Service.
- **Service/Data**: Tương tác trực tiếp với Database (Supabase) hoặc External API.

## 2. Quy tắc về Backend (Zero-Trust)
- Luôn kiểm tra quyền truy cập (RBAC) trước khi thực hiện hành động.
- Validate mọi input đầu vào bằng **Zod**.
- Sử dụng mô hình `Result<T>` cho các hàm Service để xử lý lỗi nhất quán.

## 3. Quy tắc UI/UX
- **Mobile-First**: Luôn thiết kế cho màn hình nhỏ trước.
- **Touch Targets**: Mọi nút bấm/nhiệm vụ tương tác phải >= 44px.
- **Design System**: Sử dụng Design Tokens cho Màu sắc, Typography và Spacing.

## 5. Data Mapping & Dynamic Wiring (FE <-> BE)

Dự án đã thiết lập kết nối động giữa Frontend và Backend thông qua lớp `hooks/useData.ts` (React Query).

### 5.1. Bảng đối chiếu Thành phần - Dữ liệu
| Frontend Component | Backend Table | Key Fields |
| :--- | :--- | :--- |
| `HeroSection` | `banners` | `badge`, `title`, `description`, `image_url`, `features` |
| `ServicesSection` | `services` | `title`, `slug`, `description`, `icon`, `image_url` |
| `TeamPage` | `team_members` | `name`, `role`, `bio`, `image_url`, `social_links` |
| `NewsPage` | `news` | `title`, `excerpt`, `content`, `image_url`, `publish_date`, `status` |
| `ProductsPage` | `projects` | `title`, `description`, `image_url`, `tags` |

### 5.3. Data Mapping Standard (Strict Alignment)
Để đảm bảo tính nhất quán và loại bỏ nhu cầu mapping phức tạp ở Client, dự án áp dụng quy tắc **1:1 Naming**:
- **News Table**: Cột `summary` cũ đã được rename thành `excerpt`. Đã bổ sung cột `status` (mặc định 'published').
- **Projects Table**: Cột `name` cũ đã được rename thành `title`.
- **Shared Types**: Tọa lạc tại `backend/src/types/index.ts`, trùng khớp hoàn toàn với hooks tại `frontend/src/hooks/useData.ts`.

### 5.2. Cơ chế xử lý Hình ảnh (Asset Mapping)
- **Database Storage**: Lưu dưới dạng đường dẫn tương đối `@/assets/file-name.jpg`.
- **Frontend Logic**: Sử dụng `imageMap` hoặc logic chuyển đổi trong component để mapping đường dẫn DB thành import thực tế từ thư mục `assets` của Vite.
- **Ưu điểm**: Giữ cho dung lượng DB nhỏ gọn và tận dụng được tính năng optimize hình ảnh của build tool.

---

## 6. Admin Gap Analysis (Lỗ hổng quản trị)
Hiện tại dự án đang ở trạng thái: **Dữ liệu đã Seed - UI FE đã Design - Nhưng thiếu UI Admin.**

- **Vấn đề**: Không có giao diện để Admin thực hiện CRUD (Create, Read, Update, Delete) cho các bảng dữ liệu trên.
- **Giải pháp**: Cần xây dựng Admin Dashboard (Module-based) tương ứng với các bảng trong `init_full_db.sql`.

