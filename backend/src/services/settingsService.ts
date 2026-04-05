import { supabase } from "@/lib/supabase";
import { SiteSetting, Result, success, failure } from "@/types";

export const settingsService = {
    async getSettings(): Promise<Result<SiteSetting[]>> {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .order('key');

            if (error) throw error;
            return success(data as SiteSetting[]);
        } catch (error: any) {
            console.error('Error fetching settings:', error);
            return failure(error.message || 'Failed to fetch settings');
        }
    },

    async updateSetting(key: string, value: string): Promise<Result<SiteSetting>> {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .update({ value, updated_at: new Date().toISOString() })
                .eq('key', key)
                .select()
                .single();

            if (error) throw error;
            return success(data as SiteSetting);
        } catch (error: any) {
            console.error(`Error updating setting ${key}:`, error);
            return failure(error.message || `Failed to update setting ${key}`);
        }
    },

    async updateSettings(settings: { key: string; value: string }[]): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert(settings.map(s => ({ ...s, updated_at: new Date().toISOString() })));

            if (error) throw error;
            return success(undefined);
        } catch (error: any) {
            console.error('Error updating settings:', error);
            return failure(error.message || 'Failed to update settings');
        }
    }
};
