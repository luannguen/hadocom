import { supabase } from '@/lib/supabase';
import { Service, Result, success, failure, ErrorCodes, ServiceCategory, ServiceInquiry } from '@/types';

export type CreateServiceDTO = Omit<Service, 'id' | 'created_at' | 'updated_at' | 'service_categories'>;
export type UpdateServiceDTO = Partial<CreateServiceDTO>;

export type CreateServiceCategoryDTO = Omit<ServiceCategory, 'id' | 'created_at' | 'updated_at'>;
export type UpdateServiceCategoryDTO = Partial<CreateServiceCategoryDTO>;

export const serviceService = {
    // Services
    async getServices(): Promise<Result<Service[]>> {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*, service_categories(id, name)')
                .order('order_index', { ascending: true });

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data || []);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async getService(id: string): Promise<Result<Service>> {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*, service_categories(id, name)')
                .eq('id', id)
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async createService(service: CreateServiceDTO): Promise<Result<Service>> {
        try {
            const { data, error } = await supabase
                .from('services')
                .insert([service])
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async updateService(id: string, updates: UpdateServiceDTO): Promise<Result<Service>> {
        try {
            const { data, error } = await supabase
                .from('services')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async deleteService(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(undefined);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    // Categories
    async getCategories(): Promise<Result<ServiceCategory[]>> {
        try {
            const { data, error } = await supabase
                .from('service_categories')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data || []);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async createCategory(category: CreateServiceCategoryDTO): Promise<Result<ServiceCategory>> {
        try {
            const { data, error } = await supabase
                .from('service_categories')
                .insert([category])
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async updateCategory(id: string, updates: UpdateServiceCategoryDTO): Promise<Result<ServiceCategory>> {
        try {
            const { data, error } = await supabase
                .from('service_categories')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async deleteCategory(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('service_categories')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(undefined);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    // Inquiries
    async createInquiry(inquiry: Omit<ServiceInquiry, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<Result<ServiceInquiry>> {
        try {
            const { data, error } = await supabase
                .from('service_inquiries')
                .insert([{ ...inquiry, status: 'pending' }])
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async getInquiries(): Promise<Result<ServiceInquiry[]>> {
        try {
            const { data, error } = await supabase
                .from('service_inquiries')
                .select('*, full_name:name, company_name:company, service:services(title)')
                .order('created_at', { ascending: false });

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data || []);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async updateInquiryStatus(id: string, status: ServiceInquiry['status']): Promise<Result<ServiceInquiry>> {
        try {
            const { data, error } = await supabase
                .from('service_inquiries')
                .update({ status })
                .eq('id', id)
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async deleteInquiry(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('service_inquiries')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(undefined);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    }
};
