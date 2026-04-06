import { useEffect } from 'react';
import { useSettings } from '@/hooks/useData';

const SEO = () => {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (settings) {
      // Update Title
      const siteTitle = settings.site_title || 'HADOCOM';
      const siteTagline = settings.site_description || '';
      document.title = siteTagline ? `${siteTitle} - ${siteTagline}` : siteTitle;

      // Update Favicon
      let favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      if (settings.favicon_url) {
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.setAttribute('rel', 'icon');
          document.head.appendChild(favicon);
        }
        favicon.setAttribute('href', settings.favicon_url);
      }

      // Update OG Image
      if (settings.og_image_url) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
          ogImage = document.createElement('meta');
          ogImage.setAttribute('property', 'og:image');
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute('content', settings.og_image_url);
      }

      // Inject Header Scripts
      if (settings.header_scripts) {
        const scriptId = 'site-header-scripts';
        if (!document.getElementById(scriptId)) {
          const scriptContainer = document.createElement('div');
          scriptContainer.id = scriptId;
          scriptContainer.innerHTML = settings.header_scripts;
          document.head.appendChild(scriptContainer);
        }
      }

      // Inject Footer Scripts
      if (settings.footer_scripts) {
        const scriptId = 'site-footer-scripts';
        if (!document.getElementById(scriptId)) {
          const scriptContainer = document.createElement('div');
          scriptContainer.id = scriptId;
          scriptContainer.innerHTML = settings.footer_scripts;
          document.body.appendChild(scriptContainer);
        }
      }
    }
  }, [settings]);

  return null;
};

export default SEO;
