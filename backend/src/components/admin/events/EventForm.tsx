import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ImageIcon, X, Save, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Event, Category } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EventFormProps {
    initialData?: Event;
    categories?: Category[];
    onSave: (data: Partial<Event>) => Promise<void>;
    onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, categories = [], onSave, onCancel }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<Partial<Event>>({
        title: '',
        slug: '',
        summary: '',
        content: '',
        start_date: '',
        end_date: '',
        location: '',
        status: 'upcoming',
        category_id: '',
        image_url: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                start_date: initialData.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : '',
                end_date: initialData.end_date ? new Date(initialData.end_date).toISOString().slice(0, 16) : '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(formData);
        } catch (error) {
            console.error('Error saving event:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                    {initialData ? t('edit_event') : t('new_event')}
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="title">{t('event_title')}</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="slug">{t('slug')}</Label>
                        <Input
                            id="slug"
                            name="slug"
                            value={formData.slug || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="start_date">{t('start_date')}</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="start_date"
                                    type="datetime-local"
                                    name="start_date"
                                    className="pl-10"
                                    value={formData.start_date || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="end_date">{t('end_date')}</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    id="end_date"
                                    type="datetime-local"
                                    name="end_date"
                                    className="pl-10"
                                    value={formData.end_date || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="status">{t('event_status')}</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status || 'upcoming'}
                                    onChange={handleChange}
                                    className="block w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background border-gray-200"
                                >
                                    <option value="upcoming">{t('status_upcoming')}</option>
                                    <option value="ongoing">{t('status_ongoing')}</option>
                                    <option value="completed">{t('status_completed')}</option>
                                    <option value="cancelled">{t('status_cancelled')}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="category_id">{t('category')}</Label>
                            <select
                                id="category_id"
                                name="category_id"
                                value={formData.category_id || ''}
                                onChange={handleChange}
                                className="block w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background border-gray-200"
                                required
                            >
                                <option value="">{t('select_category')}</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="location">{t('event_location')}</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="location"
                                name="location"
                                className="pl-10"
                                value={formData.location || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="image_url">{t('image_url')}</Label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="image_url"
                                name="image_url"
                                className="pl-10"
                                value={formData.image_url || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <Label>{t('image_preview')}</Label>
                        <div className="mt-1 relative aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                            {formData.image_url ? (
                                <img src={formData.image_url} alt={t('preview')} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center">
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-1 text-sm text-gray-500">{t('no_image')}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="summary">{t('summary')}</Label>
                        <Textarea
                            id="summary"
                            name="summary"
                            value={formData.summary || ''}
                            onChange={handleChange}
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="content">{t('content')}</Label>
                        <Textarea
                            id="content"
                            name="content"
                            value={formData.content || ''}
                            onChange={handleChange}
                            rows={8}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    <X className="w-4 h-4 mr-2" />
                    {t('cancel')}
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? t('saving') : t('save_event')}
                </Button>
            </div>
        </form>
    );
};

export default EventForm;
