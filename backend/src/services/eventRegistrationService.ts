import { supabase } from "@/lib/supabase";
import { EventRegistration, Result, success, failure } from "@/types";

export const eventRegistrationService = {
    async getRegistrations(): Promise<Result<EventRegistration[]>> {
        try {
            const { data, error } = await supabase
                .from('event_registrations')
                .select('*, event:events(title)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return success(data || []);
        } catch (error: any) {
            console.error('Error fetching event registrations:', error);
            return failure(error.message);
        }
    },

    async updateStatus(id: string, status: EventRegistration['status']): Promise<Result<EventRegistration>> {
        try {
            const { data, error } = await supabase
                .from('event_registrations')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            console.error('Error updating event registration status:', error);
            return failure(error.message);
        }
    },

    async deleteRegistration(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('event_registrations')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return success(undefined);
        } catch (error: any) {
            console.error('Error deleting event registration:', error);
            return failure(error.message);
        }
    }
};
