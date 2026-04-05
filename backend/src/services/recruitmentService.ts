import { supabase } from '@/lib/supabase';
import { Result, success, failure, Job, JobApplication } from '@/types';

export const recruitmentService = {
    // Job Management
    async getJobs(): Promise<Result<Job[]>> {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) return failure(error.message);
            return success(data as Job[]);
        } catch (error: any) {
            return failure(error.message || 'Failed to fetch jobs');
        }
    },

    async createJob(jobData: Partial<Job>): Promise<Result<Job>> {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .insert([jobData])
                .select()
                .single();
            
            if (error) return failure(error.message);
            return success(data as Job);
        } catch (error: any) {
            return failure(error.message || 'Failed to create job');
        }
    },

    async updateJob(id: string, jobData: Partial<Job>): Promise<Result<Job>> {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .update({ ...jobData, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();
            
            if (error) return failure(error.message);
            return success(data as Job);
        } catch (error: any) {
            return failure(error.message || 'Failed to update job');
        }
    },

    async deleteJob(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', id);
            
            if (error) return failure(error.message);
            return success(undefined);
        } catch (error: any) {
            return failure(error.message || 'Failed to delete job');
        }
    },

    // Application Management
    async getApplications(): Promise<Result<JobApplication[]>> {
        try {
            const { data, error } = await supabase
                .from('job_applications')
                .select('*, job:jobs(title)')
                .order('created_at', { ascending: false });
            
            if (error) return failure(error.message);
            return success(data as JobApplication[]);
        } catch (error: any) {
            return failure(error.message || 'Failed to fetch applications');
        }
    },

    async updateApplicationStatus(id: string, status: string): Promise<Result<JobApplication>> {
        try {
            const { data, error } = await supabase
                .from('job_applications')
                .update({ status })
                .eq('id', id)
                .select()
                .single();
            
            if (error) return failure(error.message);
            return success(data as JobApplication);
        } catch (error: any) {
            return failure(error.message || 'Failed to update application status');
        }
    },

    async deleteApplication(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('job_applications')
                .delete()
                .eq('id', id);
            
            if (error) return failure(error.message);
            return success(undefined);
        } catch (error: any) {
            return failure(error.message || 'Failed to delete application');
        }
    }
};
