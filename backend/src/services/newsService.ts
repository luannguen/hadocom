
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';
import { News, Result, success, failure, ErrorCodes } from "@/types";

export const newsService = {
    async getNews(categoryId?: string): Promise<Result<News[]>> {
        try {
            let query = supabase
                .from('news')
                .select('*')
                .order('publish_date', { ascending: false });

            if (categoryId) {
                query = query.eq('category_id', categoryId);
            }

            const { data, error } = await query;
            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data || []);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async getNewsById(id: string): Promise<Result<News>> {
        try {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async createNews(news: Omit<News, 'id' | 'created_at'>): Promise<Result<News>> {
        try {
            const { data, error } = await supabase
                .from('news')
                .insert([{ ...news, id: uuidv4() }])
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async updateNews(id: string, updates: Partial<News>): Promise<Result<News>> {
        try {
            const { data, error } = await supabase
                .from('news')
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

    async deleteNews(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('news')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(undefined);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    }
};
