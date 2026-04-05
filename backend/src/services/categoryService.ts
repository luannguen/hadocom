
import { supabase } from "@/lib/supabase";
import { Category, ContentType, Result, success, failure } from "@/types";

export const categoryService = {
    async getCategories(type?: ContentType): Promise<Result<Category[]>> {
        try {
            let query = supabase
                .from('categories')
                .select('*')
                .order('name');

            if (type) {
                query = query.eq('type', type);
            }

            const { data, error } = await query;

            if (error) throw error;
            return success(data || []);
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            return failure(error.message);
        }
    },

    async createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Category>> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .insert([category])
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            console.error('Error creating category:', error);
            return failure(error.message);
        }
    },

    async updateCategory(id: string, updates: Partial<Category>): Promise<Result<Category>> {
        try {
            const { data, error } = await supabase
                .from('categories')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            console.error('Error updating category:', error);
            return failure(error.message);
        }
    },

    async deleteCategory(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return success(undefined);
        } catch (error: any) {
            console.error('Error deleting category:', error);
            return failure(error.message);
        }
    }
};
