-- SEED PERMISSIONS AND LINK TO ADMIN ROLE

-- 1. Insert all core permissions
INSERT INTO public.permissions (code, description)
VALUES 
    -- Dashboard
    ('dashboard.view', 'Xem bảng điều khiển chính'),
    
    -- Content Management
    ('content.view', 'Xem nội dung (Sản phẩm, Tin tức, Banner...)'),
    ('content.create', 'Tạo nội dung mới'),
    ('content.edit', 'Chỉnh sửa nội dung'),
    ('content.delete', 'Xóa nội dung'),
    
    -- User Management
    ('users.view', 'Xem danh sách người dùng'),
    ('users.create', 'Tạo người dùng mới'),
    ('users.edit', 'Sửa thông tin người dùng'),
    ('users.delete', 'Xóa người dùng'),
    
    -- RBAC Management
    ('roles.view', 'Xem danh sách vai trò'),
    ('roles.manage', 'Quản lý vai trò và phân quyền'),
    
    -- System Settings
    ('settings.view', 'Xem cài đặt hệ thống'),
    ('settings.manage', 'Chỉnh sửa cài đặt hệ thống')
ON CONFLICT (code) DO NOTHING;

-- 2. Link all permissions to 'admin' role
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT 'admin', id FROM public.permissions
ON CONFLICT DO NOTHING;
