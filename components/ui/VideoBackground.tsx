'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface VideoBackgroundProps {
  src: string;
  fallbackImage: string;
  className?: string;
  enableLoop?: boolean;
  enablePingPong?: boolean;
  pingPongSpeed?: number; // Frames per second for reverse playback
}

export default function VideoBackground({
  src,
  fallbackImage,
  className = '',
  enableLoop = true,
  enablePingPong = false,
  pingPongSpeed = 30 // 30fps reverse playback
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReversing, setIsReversing] = useState(false);
  
  // Refs for cleanup
  const reverseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleVideoError = useCallback(() => {
    console.warn('Video failed to load, using fallback image');
    setHasError(true);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsLoaded(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(handleVideoError);
    }
  }, [handleVideoError]);

  // Clean up intervals and animation frames
  const cleanup = useCallback(() => {
    if (reverseIntervalRef.current) {
      clearInterval(reverseIntervalRef.current);
      reverseIntervalRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // Ping-pong effect implementation
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError || !enablePingPong) return;

    const frameRate = 1000 / pingPongSpeed; // Convert fps to milliseconds
    const step = 0.05; // Time step for reverse playback

    const startReverse = () => {
      if (isReversing) return;
      
      setIsReversing(true);
      video.pause();

      reverseIntervalRef.current = setInterval(() => {
        if (!video) {
          cleanup();
          return;
        }

        const newTime = Math.max(0, video.currentTime - step);
        video.currentTime = newTime;

        // Check if we've reached the beginning
        if (newTime <= 0.05) {
          cleanup();
          setIsReversing(false);
          video.currentTime = 0;
          
          // Small delay before restarting forward playback
          setTimeout(() => {
            if (video) {
              video.play().catch(console.error);
            }
          }, 100);
        }
      }, frameRate);
    };

    const monitorPlayback = () => {
      if (!video || isReversing) return;

      // Check if we're near the end (within 100ms)
      if (video.currentTime >= video.duration - 0.1) {
        startReverse();
      } else {
        animationFrameRef.current = requestAnimationFrame(monitorPlayback);
      }
    };

    // Start monitoring when video plays
    const handlePlay = () => {
      if (!isReversing) {
        monitorPlayback();
      }
    };

    const handlePause = () => {
      cleanup();
    };

    const handleSeeked = () => {
      // Resume monitoring after seeking
      if (!isReversing && !video.paused) {
        monitorPlayback();
      }
    };

    // Event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('seeked', handleSeeked);

    // Start monitoring if video is already playing
    if (!video.paused && !isReversing) {
      monitorPlayback();
    }

    return () => {
      cleanup();
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [hasError, enablePingPong, isReversing, pingPongSpeed, cleanup]);

  // Regular loop effect (when ping-pong is disabled)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError || enablePingPong) return;

    if (enableLoop) {
      const handleEnded = () => {
        video.currentTime = 0;
        video.play().catch(handleVideoError);
      };
      
      video.addEventListener('ended', handleEnded);
      return () => video.removeEventListener('ended', handleEnded);
    }
  }, [hasError, enableLoop, enablePingPong, handleVideoError]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  if (hasError) {
    return (
      <div 
        className={`w-full h-full bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="metadata"
        className={`w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onStalled={handleVideoError}
        // Disable native loop when using ping-pong
        loop={enableLoop && !enablePingPong}
      />
      
      {/* Fallback image while video loads */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 w-full h-full bg-cover bg-center ${className}`}
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Debug indicator (remove in production) */}
      {process.env.NODE_ENV === 'development' && enablePingPong && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {isReversing ? '← Reversing' : '→ Playing'}
        </div>
      )}
    </>
  );
}