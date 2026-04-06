import { useState, useEffect } from 'react';
import { settingsService } from '@/services/settingsService';
import { SiteSetting } from '@/types';

export const useSettings = () => {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            const result = await settingsService.getSettings();
            if (result.success && result.data) {
                const settingMap = result.data.reduce((acc, curr) => ({ 
                    ...acc, 
                    [curr.key]: curr.value 
                }), {} as Record<string, string>);
                setSettings(settingMap);
            }
            setLoading(false);
        };

        fetchSettings();
    }, []);

    return { settings, loading };
};
