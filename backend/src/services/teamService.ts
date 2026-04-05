
import { supabase } from '@/lib/supabase';
import { TeamMember, Result, ErrorCodes, success, failure } from '@/types';

export const teamService = {
    async getAll(): Promise<Result<TeamMember[]>> {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data || []);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async getById(id: string): Promise<Result<TeamMember>> {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async create(member: Partial<TeamMember>): Promise<Result<TeamMember>> {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .insert([member])
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async update(id: string, member: Partial<TeamMember>): Promise<Result<TeamMember>> {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .update(member)
                .eq('id', id)
                .select()
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async delete(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('team_members')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(undefined);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    }
};
