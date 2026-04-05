
import React, { useEffect, useState } from 'react';
import { eventService } from '@/services/eventService';
import { categoryService } from '@/services/categoryService';
import { Event, Category } from '@/types';
import { Plus, Edit2, Trash2, Search, Loader2, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventForm from '@/components/admin/events/EventForm';
import { useTranslation } from 'react-i18next';

const EventsPage: React.FC = () => {
    const { t } = useTranslation();
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Edit/Create State
    const [isEditing, setIsEditing] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | undefined>(undefined);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [eventsResult, catResult] = await Promise.all([
                eventService.getEvents(),
                categoryService.getCategories('event')
            ]);

            if (eventsResult.success) {
                setEvents(eventsResult.data || []);
            }
            
            if (catResult.success) {
                setCategories(catResult.data || []);
            }
        } catch (error) {
            console.error('Failed to load data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t('confirm_delete_event') || 'Are you sure?')) return;

        try {
            const result = await eventService.deleteEvent(id);
            if (result.success) {
                setEvents(prev => prev.filter(e => e.id !== id));
            } else {
                alert(result.error || t('delete_event_fail'));
            }
        } catch (error) {
            alert(t('delete_event_fail'));
        }
    };

    const handleSave = async (eventData: Partial<Event>) => {
        try {
            let result;
            if (editingEvent?.id) {
                result = await eventService.updateEvent(editingEvent.id, eventData);
            } else {
                result = await eventService.createEvent(eventData as any);
            }

            if (result.success) {
                setIsEditing(false);
                setEditingEvent(undefined);
                loadData();
            } else {
                alert(result.error || t('save_event_fail'));
            }
        } catch (error) {
            alert(t('save_event_fail'));
        }
    };

    const filteredEvents = Array.isArray(events) ? events.filter(event =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    if (isEditing) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {editingEvent ? t('edit_event') : t('create_event')}
                    </h1>
                </div>
                <EventForm
                    initialData={editingEvent}
                    categories={categories}
                    onSave={handleSave}
                    onCancel={() => { setIsEditing(false); setEditingEvent(undefined); }}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-semibold text-gray-900">{t('events_management')}</h1>
                <Button
                    onClick={() => { setEditingEvent(undefined); setIsEditing(true); }}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('add_event')}
                </Button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        placeholder={t('search_events_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {loading ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                        <Calendar className="h-12 w-12 mb-2 opacity-50" />
                        <p>{t('no_events')}</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('event_header')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('status_header')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('date_header')}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('location_header')}
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">{t('actions_header')}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {event.image_url ? (
                                                    <img className="h-10 w-10 rounded object-cover" src={event.image_url} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                                        <Calendar className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                                <div className="text-sm text-gray-500 text-xs">/{event.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {t(`status_${event.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {event.start_date ? new Date(event.start_date).toLocaleDateString() : 'TBD'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {event.location || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => { setEditingEvent(event); setIsEditing(true); }}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
