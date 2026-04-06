
// Common Types
export type Result<T> = {
    success: boolean;
    data?: T;
    error?: string;
    code?: string;
};

export const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NETWORK_ERROR: 'NETWORK_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    DB_ERROR: 'DB_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    USER_EXISTS: 'USER_EXISTS',
    EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
};

export function success<T>(data: T): Result<T> {
    return { success: true, data };
}

export function failure<T = any>(error: string, code = ErrorCodes.UNKNOWN_ERROR): Result<T> {
    return { success: false, error, code };
}

// Domain Interfaces
export type ContentType = 'product' | 'event' | 'news' | 'project';

export interface Category {
    id: string;
    name: string;
    slug: string;
    type: ContentType;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Service {
    id: string;
    slug: string;
    title: string;
    description?: string;
    content?: string;
    icon?: string;
    image_url?: string;
    features?: string[];
    is_active: boolean;
    order_index: number;
    category_id?: string;
    service_categories?: {
        id: string;
        name: string;
    };
    created_at?: string;
    updated_at?: string;
}

export interface ServiceCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ServiceInquiry {
  id: string;
  service_id?: string;
  product_id?: string;
  full_name: string;
  email: string;
  phone: string;
  company_name?: string;
  message?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  service?: Service;
  product?: Product;
  created_at: string;
  updated_at?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  parent_id?: string;
  order_index: number;
  is_active: boolean;
  position?: 'header' | 'footer';
  children?: NavigationItem[];
  type?: 'internal' | 'external' | 'custom';
  created_at?: string;
}

export interface News {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  publish_date?: string;
  author?: string;
  status: 'published' | 'draft';
  tags: string[];
  category_id?: string;
  category?: Category;
  created_at?: string;
  updated_at?: string;
  views?: number;
}

export interface Project {
    id: string;
    name: string;
    slug: string;
    description?: string;
    content?: string;
    image_url?: string;
    client?: string;
    completion_date?: string;
    category_id?: string;
    category?: Category;
    is_featured: boolean;
    tags?: string[];
    created_at?: string;
    updated_at?: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    category_id: string;
    price: number;
    image_url: string;
    description: string;
    is_new: boolean;
    is_bestseller: boolean;
    features: string[];
    specifications: Record<string, any>;
    category?: {
        id: string;
        name: string;
    };
    created_at?: string;
    updated_at?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image_url?: string;
    icon?: string;
    display_order: number;
    social_links?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        email?: string;
    };
    created_at?: string;
    updated_at?: string;
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    summary?: string;
    content?: string;
    image_url?: string;
    start_date: string;
    end_date?: string;
    location?: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    category_id?: string;
    category?: Category;
    participants_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Job {
    id: string;
    title: string;
    slug: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    type?: string;
    salary?: string;
    status: 'opening' | 'closed' | 'draft';
    deadline?: string;
    created_at?: string;
    updated_at?: string;
}

export interface JobApplication {
    id: string;
    job_id: string;
    full_name: string;
    email: string;
    phone: string;
    cv_url: string;
    message?: string;
    status: 'pending' | 'reviewed' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
    created_at?: string;
    job?: {
        title: string;
    };
}

export interface Banner {
    id: string;
    title: string | null;
    image_url: string;
    link: string | null;
    description: string | null;
    badge?: string | null;
    button_text?: string | null;
    features?: any | null;
    position: 'home_main' | 'popup' | 'sidebar' | string;
    order_index: number;
    is_active: boolean;
    created_at: string;
}

export type BannerFormData = Omit<Banner, 'id' | 'created_at'>;

export interface SiteSetting {
    key: string;
    value: string;
    description?: string;
    updated_at?: string;
}

export interface EventRegistration {
    id: string;
    event_id: string;
    full_name: string;
    email: string;
    phone: string;
    company?: string;
    message?: string;
    status: 'pending' | 'confirmed' | 'attended' | 'cancelled';
    event?: Event;
    created_at: string;
    updated_at: string;
}

export interface Partner {
    id: string;
    name: string;
    logo_url?: string;
    website_url?: string;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}
