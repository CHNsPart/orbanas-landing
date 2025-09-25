'use client';

import { useState, useEffect, useRef } from 'react';

interface UseResourceLoaderProps {
  images?: string[];
  videos?: string[];
  minLoadTime?: number;
  timeout?: number;
}

export function useResourceLoader({ 
  images = [], 
  videos = [], 
  minLoadTime = 2000,
  timeout = 3000
}: UseResourceLoaderProps = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Use refs to prevent infinite loops
  const hasStartedLoading = useRef(false);
  const loadedResources = useRef(new Set<string>());

  useEffect(() => {
    // Prevent multiple loading attempts
    if (hasStartedLoading.current) {
      return;
    }
    hasStartedLoading.current = true;

    let mounted = true;
    const startTime = Date.now();
    const totalResources = images.length + videos.length;
    let completedCount = 0;

    console.log(`Starting to load ${totalResources} resources`);

    // If no resources, just wait minimum time
    if (totalResources === 0) {
      setTimeout(() => {
        if (mounted) {
          setProgress(100);
          setIsLoading(false);
        }
      }, minLoadTime);
      return;
    }

    const updateProgress = (resourceUrl: string, status: 'success' | 'error' | 'timeout') => {
      // Prevent duplicate counting
      if (loadedResources.current.has(resourceUrl)) {
        return;
      }
      loadedResources.current.add(resourceUrl);
      
      completedCount++;
      console.log(`Resource ${status}: ${resourceUrl} (${completedCount}/${totalResources})`);
      
      if (mounted) {
        const newProgress = (completedCount / totalResources) * 100;
        setProgress(newProgress);
        
        // Check if all resources are completed
        if (completedCount >= totalResources) {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minLoadTime - elapsed);
          
          setTimeout(() => {
            if (mounted) {
              console.log('All resources loaded, hiding loader');
              setIsLoading(false);
            }
          }, remainingTime);
        }
      }
    };

    // Load images
    images.forEach((src) => {
      // Skip if already loaded
      if (loadedResources.current.has(src)) {
        return;
      }

      const img = new Image();
      
      const cleanup = () => {
        img.onload = null;
        img.onerror = null;
      };

      const timeoutId = setTimeout(() => {
        cleanup();
        updateProgress(src, 'timeout');
      }, timeout);

      img.onload = () => {
        clearTimeout(timeoutId);
        cleanup();
        updateProgress(src, 'success');
      };

      img.onerror = () => {
        clearTimeout(timeoutId);
        cleanup();
        updateProgress(src, 'error');
      };

      // Start loading
      img.src = src;
    });

    // Load videos
    videos.forEach((src) => {
      // Skip if already loaded
      if (loadedResources.current.has(src)) {
        return;
      }

      const video = document.createElement('video');
      
      const cleanup = () => {
        video.onloadeddata = null;
        video.onerror = null;
        video.remove();
      };

      const timeoutId = setTimeout(() => {
        cleanup();
        updateProgress(src, 'timeout');
      }, timeout);

      video.onloadeddata = () => {
        clearTimeout(timeoutId);
        cleanup();
        updateProgress(src, 'success');
      };

      video.onerror = () => {
        clearTimeout(timeoutId);
        cleanup();
        updateProgress(src, 'error');
      };

      // Start loading
      video.src = src;
      video.preload = 'metadata';
      video.load();
    });

    // Emergency timeout - force completion after maximum time
    const emergencyTimeout = setTimeout(() => {
      if (mounted && isLoading) {
        console.warn('Emergency timeout - forcing completion');
        setProgress(100);
        setIsLoading(false);
      }
    }, Math.max(minLoadTime + 5000, 8000)); // At least 8 seconds max

    return () => {
      mounted = false;
      clearTimeout(emergencyTimeout);
    };
  }, []); // Empty dependency array to prevent re-runs

  return { isLoading, progress };
}