# Tech Context: HADOCOM Technology Stack

Tài liệu này liệt kê các công nghệ và thư viện đang sử dụng trong dự án.

## Core Stack
- **Frontend (Client)**: Next.js (Visual Editor, Main Site) hoặc Vite (như trong `frontend` folder).
- **Backend (Service)**: Express.js (như trong `backend` folder).
- **Language**: TypeScript (Strict mode).
- **Database**: Supabase (PostgreSQL + Auth + Storage).

## Thư viện quan trọng
- **Giao diện**: CSS Vanilla (theo quy tắc UI-UX-DESIGN-RULESET), Tailwind (nếu cho phép).
- **Kiểm soát dữ liệu**: Zod, Prisma (như thấy trong MCP).
- **Tiện ích**: Lucide Icons, Framer Motion (cho micro-animations).

## Ràng buộc môi trường
- Chạy local bằng `npm run dev` cho cả frontend và backend.
- Deployment: Vercel (Frontend), Railway/Docker (Backend) - Giả định.
- Project Root: `f:/code duan/hadocom`.
- Rules Root: `f:/code duan/CodeChuanduan`.
