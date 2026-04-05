import { supabase } from '@/lib/supabase';
import { Banner, BannerFormData, Result, success, failure } from '@/types';

export const bannerService = {
    async getBanners(position?: string): Promise<Result<Banner[]>> {
        try {
            let query = supabase
                .from('banners')
                .select('*')
                .order('order_index', { ascending: true });

            if (position) {
                query = query.eq('position', position);
            }

            const { data, error } = await query;

            if (error) return failure(error.message);
            return success(data as Banner[]);
        } catch (error: any) {
            return failure(error.message || "Failed to fetch banners");
        }
    },

    async createBanner(banner: BannerFormData): Promise<Result<Banner>> {
        try {
            const { data, error } = await supabase
                .from('banners')
                .insert(banner)
                .select()
                .single();

            if (error) return failure(error.message);
            return success(data as Banner);
        } catch (error: any) {
            return failure(error.message || "Failed to create banner");
        }
    },

    async updateBanner(id: string, updates: Partial<BannerFormData>): Promise<Result<Banner>> {
        try {
            const { data, error } = await supabase
                .from('banners')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) return failure(error.message);
            return success(data as Banner);
        } catch (error: any) {
            return failure(error.message || "Failed to update banner");
        }
    },

    async deleteBanner(id: string): Promise<Result<boolean>> {
        try {
            const { error } = await supabase
                .from('banners')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message);
            return success(true);
        } catch (error: any) {
            return failure(error.message || "Failed to delete banner");
        }
    },

    async reorderBanners(items: { id: string; order_index: number }[]): Promise<Result<boolean>> {
        try {
            for (const item of items) {
                const { error } = await supabase
                    .from('banners')
                    .update({ order_index: item.order_index })
                    .eq('id', item.id);
                
                if (error) return failure(error.message);
            }
            return success(true);
        } catch (error: any) {
            return failure(error.message || "Failed to reorder banners");
        }
    }
};
