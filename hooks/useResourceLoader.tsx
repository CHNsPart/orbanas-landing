'use client';

import { useState, useEffect } from 'react';

interface UseResourceLoaderProps {
  images?: string[];
  videos?: string[];
  minLoadTime?: number;
  timeout?: number; // Add timeout for resources
}

export function useResourceLoader({ 
  images = [], 
  videos = [], 
  minLoadTime = 2000,
  timeout = 5000 // 5 second timeout per resource
}: UseResourceLoaderProps = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    const startTime = Date.now();

    const totalResources = images.length + videos.length;
    
    const loadResources = async () => {
      let loadedCount = 0;

      const updateProgress = () => {
        loadedCount++;
        if (mounted) {
          setProgress((loadedCount / totalResources) * 100);
        }
      };

      // Load images with timeout
      const imagePromises = images.map(src => {
        return Promise.race([
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              updateProgress();
              resolve();
            };
            img.onerror = () => {
              console.warn(`Failed to load image: ${src}`);
              updateProgress();
              resolve();
            };
            img.src = src;
          }),
          // Timeout promise
          new Promise<void>((resolve) => {
            setTimeout(() => {
              console.warn(`Image load timeout: ${src}`);
              updateProgress();
              resolve();
            }, timeout);
          })
        ]);
      });

      // Load videos with timeout
      const videoPromises = videos.map(src => {
        return Promise.race([
          new Promise<void>((resolve) => {
            const video = document.createElement('video');
            video.onloadeddata = () => {
              updateProgress();
              resolve();
            };
            video.onerror = () => {
              console.warn(`Failed to load video: ${src}`);
              updateProgress();
              resolve();
            };
            video.src = src;
            video.load();
          }),
          // Timeout promise
          new Promise<void>((resolve) => {
            setTimeout(() => {
              console.warn(`Video load timeout: ${src}`);
              updateProgress();
              resolve();
            }, timeout);
          })
        ]);
      });

      // Wait for all resources with timeout
      await Promise.all([...imagePromises, ...videoPromises]);

      // Ensure minimum load time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);

      setTimeout(() => {
        if (mounted) {
          setIsLoading(false);
        }
      }, remainingTime);
    };

    if (totalResources > 0) {
      loadResources();
    } else {
      // No resources to load, just wait minimum time
      setTimeout(() => {
        if (mounted) {
          setIsLoading(false);
        }
      }, minLoadTime);
    }

    return () => {
      mounted = false;
    };
  }, [images, videos, minLoadTime, timeout]);

  return { isLoading, progress };
}