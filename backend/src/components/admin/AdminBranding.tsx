import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';

const AdminBranding = () => {
    const { settings, loading } = useSettings();

    useEffect(() => {
        if (!loading && settings) {
            // Update Tab Title
            const siteName = settings.site_name || 'HADOCOM';
            document.title = `${siteName} - Admin Panel`;

            // Update Tab Icon (Favicon)
            if (settings.favicon_url) {
                let favicon = document.querySelector('link[rel="icon"]') || 
                              document.querySelector('link[rel="shortcut icon"]');
                
                if (!favicon) {
                    favicon = document.createElement('link');
                    favicon.setAttribute('rel', 'icon');
                    document.head.appendChild(favicon);
                }
                favicon.setAttribute('href', settings.favicon_url);
            }
        }
    }, [settings, loading]);

    return null;
};

export default AdminBranding;
