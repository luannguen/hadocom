# Active Context: Memory Bank Implementation

## Trạng thái hiện tại
Agent đang thiết lập hệ thống **Memory Bank** cho dự án HADOCOM để cải thiện khả năng quản lý ngữ cảnh và tiết kiệm Token.

## Task đang thực hiện
- [x] Phân tích sự đồng bộ giữa Frontend (Designed) và Backend (Seeded).
- [x] Cập nhật Mapping dữ liệu FE-BE vào Memory Bank.
- [/] Thiết lập kế hoạch xây dựng Admin Dashboard (Module-based).

## Phát hiện & Thách thức (Analysis Findings)
1. **Dữ liệu hoàn tất**: Backend đã sẵn sàng mọi bảng và data để FE hiển thị (Banners, Services, Projects).
2. **Thiếu UI Admin**: FE hiện tại chỉ là "Read-only" từ Supabase. Chưa có chức năng chỉnh sửa dữ liệu mẫu cho Admin.
3. **Bài toán đồng bộ Hình ảnh**: Admin cần module chọn Icon/Asset đồng bộ với code Frontend (`iconMap`).

## Quyết định kỹ thuật mới
- **Trọng tâm**: Xây dựng một module Admin (Admin Dashboard) nằm trong Route `/admin` của dự án Frontend để quản lý trực tiếp dữ liệu Supabase.
- **Thiết kế**: Sử dụng Radix UI / Shadcn (đã có trong dự án) để xây dựng Form điều khiển tập trung.

