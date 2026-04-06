import { supabase } from '@/lib/supabase';
import { Partner, Result, success, failure } from '@/types';

export const partnersService = {
    async getPartners(): Promise<Result<Partner[]>> {
        try {
            const { data, error } = await supabase
                .from('partners')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            return success(data || []);
        } catch (error: any) {
            return failure(error.message);
        }
    },

    async getPartnerById(id: string): Promise<Result<Partner>> {
        try {
            const { data, error } = await supabase
                .from('partners')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            return failure(error.message);
        }
    },

    async createPartner(partner: Omit<Partner, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Partner>> {
        try {
            const { data, error } = await supabase
                .from('partners')
                .insert([partner])
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            return failure(error.message);
        }
    },

    async updatePartner(id: string, partner: Partial<Partner>): Promise<Result<Partner>> {
        try {
            const { data, error } = await supabase
                .from('partners')
                .update({ ...partner, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            return failure(error.message);
        }
    },

    async deletePartner(id: string): Promise<Result<null>> {
        try {
            const { error } = await supabase
                .from('partners')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return success(null);
        } catch (error: any) {
            return failure(error.message);
        }
    },

    async uploadLogo(file: File): Promise<Result<string>> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `partners/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('media') // Using existing 'media' bucket
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('media')
                .getPublicUrl(filePath);

            return success(data.publicUrl);
        } catch (error: any) {
            return failure(error.message);
        }
    }
};
