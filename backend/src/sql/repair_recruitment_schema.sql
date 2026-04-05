-- 🛠 REPAIR RECRUITMENT SCHEMA 🛠
-- Run this in your Supabase SQL Editor to fix 404 Recruitment errors.

-- 1. Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    requirements text,
    benefits text,
    location text DEFAULT 'TP. Hồ Chí Minh',
    type text DEFAULT 'Full-time',
    salary text DEFAULT 'Thỏa thuận',
    status text DEFAULT 'opening', -- opening, closed, draft
    deadline date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    cv_url text NOT NULL,
    message text,
    status text DEFAULT 'pending', -- pending, reviewed, interview, offered, rejected
    created_at timestamptz DEFAULT now()
);

-- 3. Disable RLS for development (Matching project's current pattern)
ALTER TABLE public.jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications DISABLE ROW LEVEL SECURITY;

-- 4. Seed sample jobs for testing
INSERT INTO public.jobs (title, slug, description, requirements, benefits, location, type, salary)
VALUES 
(
    'Kỹ sư Điện lạnh (Senior)', 
    'ky-su-dien-lanh-senior', 
    '<p>Chịu trách nhiệm thiết kế, giám sát thi công và lắp đặt các hệ thống lạnh công nghiệp (VRV/VRF, Chiller).</p>',
    '<ul><li>Tối thiểu 5 năm kinh nghiệm.</li><li>Sử dụng thành thạo AutoCAD, Revit.</li></ul>',
    '<ul><li>Lương thưởng hấp dẫn.</li><li>Bảo hiểm đầy đủ.</li></ul>',
    'TP. Hồ Chí Minh', 
    'Full-time', 
    '20tr - 35tr'
),
(
    'Nhân viên Kinh doanh Kỹ thuật', 
    'nhan-vien-kinh-doanh-ky-thuat', 
    '<p>Tìm kiếm khách hàng, tư vấn giải pháp hạ tầng CNTT và phần mềm ERP.</p>',
    '<ul><li>Tốt nghiệp ĐH chuyên ngành CNTT hoặc kinh tế.</li><li>Kỹ năng giao tiếp tốt.</li></ul>',
    '<ul><li>Hoa hồng cạnh tranh.</li><li>Môi trường năng động.</li></ul>',
    'Hà Nội', 
    'Full-time', 
    '15tr - 25tr'
)
ON CONFLICT (slug) DO NOTHING;
