import { useEffect } from 'react';

/**
 * SEO Component to dynamically update document title and meta tags.
 * This ensures that each page has its own unique metadata for search engines and social sharing.
 * 
 * @param {Object} props
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The description of the page.
 * @param {string} props.keywords - Search keywords for the page.
 */
const SEO = ({ title, description, keywords, robots }) => {
  useEffect(() => {
    // Update Title
    const baseTitle = ' Sunrise Marine';
    document.title = title ? `${baseTitle} | ${title}` : baseTitle;



    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || 'Sunrise Marine Enterprise: Your trusted partner for high-end marine navigation, automation, and safety equipment.');
    }

    // Update Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'marine equipment, navigation, automation, safety equipment, sunrisemarine');
    }

    // Update Robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', robots || 'index, follow');
    }

    // Update OG Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title ? `${title} | ${baseTitle}` : baseTitle);
    }

    // Update OG Description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description || 'Trusted provider of marine navigation, automation, and safety equipment.');
    }
    
  }, [title, description, keywords, robots]);

  return null;
};

export default SEO;
