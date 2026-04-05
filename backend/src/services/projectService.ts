import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';
import { Project, Result, success, failure, ErrorCodes } from "@/types";

export const projectService = {
    async getProjects(): Promise<Result<Project[]>> {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data || []);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async getProjectById(id: string): Promise<Result<Project>> {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Result<Project>> {
        try {
            const { data, error } = await supabase
                .from('projects')
                .insert([{ ...project, id: uuidv4() }])
                .select('*')
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async updateProject(id: string, updates: Partial<Project>): Promise<Result<Project>> {
        try {
            const { data, error } = await supabase
                .from('projects')
                .update(updates)
                .eq('id', id)
                .select('*')
                .single();

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(data);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    },

    async deleteProject(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) return failure(error.message, ErrorCodes.DB_ERROR);
            return success(undefined);
        } catch (err: any) {
            return failure(err.message, ErrorCodes.UNKNOWN_ERROR);
        }
    }
};
