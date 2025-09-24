/**
 * Utility functions for handling CDN/R2 bucket assets
 */

// Get the CDN base URL from environment variables
const getCDNBaseURL = (): string => {
  // Use production domain in production, dev URL for development
  const baseURL = process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_R2_DOMAIN 
    : process.env.NEXT_PUBLIC_R2_DEV_URL;
    
  return baseURL || process.env.NEXT_PUBLIC_CDN_URL || '';
};

/**
 * Convert a local asset path to CDN URL
 * @param path - The asset path (e.g., '/images/logo.svg', '/videos/hero.mp4')
 * @returns Full CDN URL or local path as fallback
 */
export const getCDNUrl = (path: string): string => {
  const baseURL = getCDNBaseURL();
  
  // If no CDN URL configured, return local path
  if (!baseURL) {
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // All assets are in the 'public' folder on R2
  return `${baseURL}/public/${cleanPath}`;
};

/**
 * Get image URL with CDN support
 * @param imagePath - Image path (e.g., '/images/hero.jpg')
 * @returns CDN URL or local path
 */
export const getImageUrl = (imagePath: string): string => {
  return getCDNUrl(imagePath);
};

/**
 * Get video URL with CDN support
 * @param videoPath - Video path (e.g., '/videos/hero.mp4')
 * @returns CDN URL or local path
 */
export const getVideoUrl = (videoPath: string): string => {
  return getCDNUrl(videoPath);
};

/**
 * Check if we're using CDN
 * @returns boolean indicating if CDN is configured
 */
export const isCDNEnabled = (): boolean => {
  return !!getCDNBaseURL();
};

/**
 * Preload an asset from CDN
 * @param assetPath - Path to the asset
 * @param type - Type of asset ('image' | 'video' | 'font')
 */
export const preloadAsset = (assetPath: string, type: 'image' | 'video' | 'font' = 'image'): void => {
  const url = getCDNUrl(assetPath);
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  
  switch (type) {
    case 'image':
      link.as = 'image';
      break;
    case 'video':
      link.as = 'video';
      break;
    case 'font':
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      break;
  }
  
  document.head.appendChild(link);
};