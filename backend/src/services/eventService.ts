
import { supabase } from "@/lib/supabase";
import { Event, Result, success, failure } from "@/types";

export const eventService = {
    async getEvents(): Promise<Result<Event[]>> {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*, category:categories(*)')
                .order('start_date', { ascending: false });

            if (error) throw error;
            return success(data || []);
        } catch (error: any) {
            console.error('Error fetching events:', error);
            return failure(error.message);
        }
    },

    async getEventById(id: string): Promise<Result<Event>> {
        try {
            const { data, error } = await supabase
                .from('events')
                .select('*, category:categories(*)')
                .eq('id', id)
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            console.error('Error fetching event:', error);
            return failure(error.message);
        }
    },

    async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Result<Event>> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { category, ...cleanEvent } = event as any;

            const { data, error } = await supabase
                .from('events')
                .insert([cleanEvent])
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            console.error('Error creating event:', error);
            return failure(error.message);
        }
    },

    async updateEvent(id: string, updates: Partial<Event>): Promise<Result<Event>> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { category, created_at, updated_at, ...cleanUpdates } = updates as any;

            const { data, error } = await supabase
                .from('events')
                .update(cleanUpdates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return success(data);
        } catch (error: any) {
            console.error('Error updating event:', error);
            return failure(error.message);
        }
    },

    async deleteEvent(id: string): Promise<Result<void>> {
        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return success(undefined);
        } catch (error: any) {
            console.error('Error deleting event:', error);
            return failure(error.message);
        }
    }
};
