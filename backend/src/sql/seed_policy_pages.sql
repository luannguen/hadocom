-- Seed initial policy pages for HADOCOM
INSERT INTO public.static_pages (id, title, slug, content, is_active, created_at, updated_at)
VALUES 
(
    gen_random_uuid(),
    'Chính sách bảo mật thông tin',
    'chinh-sach-bao-mat',
    '{"sections": [{"id": "sec_privacy", "type": "content", "content": "<h2>Chính sách bảo mật thông tin</h2><ul><li>Cam kết bảo mật tuyệt đối thông tin khách hàng</li><li>Nhân viên ký cam kết NDA trước khi tiếp cận dữ liệu</li><li>Tuân thủ tiêu chuẩn ISO 27001 về quản lý an toàn thông tin</li><li>Mã hóa dữ liệu trong suốt quá trình truyền tải và lưu trữ</li></ul>"}]}',
    true,
    now(),
    now()
),
(
    gen_random_uuid(),
    'Điều khoản sử dụng',
    'dieu-khoan-su-dung',
    '{"sections": [{"id": "sec_terms", "type": "content", "content": "<h2>Điều khoản sử dụng dịch vụ</h2><p>Chào mừng bạn đến với HADOCOM. Khi truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây...</p>"}]}',
    true,
    now(),
    now()
),
(
    gen_random_uuid(),
    'Chính sách bảo hành',
    'chinh-sach-bao-hanh',
    '{"sections": [{"id": "sec_warranty", "type": "content", "content": "<h2>Chính sách bảo hành thiết bị</h2><ul><li>Bảo hành thiết bị theo tiêu chuẩn nhà sản xuất từ 12-36 tháng</li><li>Hỗ trợ kỹ thuật từ xa 24/7 trong suốt thời gian bảo hành</li><li>Thay thế thiết bị lỗi trong vòng 48 giờ làm việc</li><li>Miễn phí công lắp đặt và cấu hình khi thay thế bảo hành</li></ul>"}]}',
    true,
    now(),
    now()
),
(
    gen_random_uuid(),
    'Chính sách đổi trả',
    'chinh-sach-doi-tra',
    '{"sections": [{"id": "sec_return", "type": "content", "content": "<h2>Chính sách đổi trả sản phẩm</h2><ul><li>Đổi trả trong 7 ngày nếu sản phẩm lỗi từ nhà sản xuất</li><li>Hoàn tiền 100% nếu không thể khắc phục lỗi kỹ thuật</li><li>Hỗ trợ nâng cấp thiết bị với chi phí chênh lệch hợp lý</li><li>Quy trình đổi trả nhanh gọn, minh bạch</li></ul>"}]}',
    true,
    now(),
    now()
)
ON CONFLICT (slug) DO UPDATE 
SET title = EXCLUDED.title, content = EXCLUDED.content, updated_at = now();
