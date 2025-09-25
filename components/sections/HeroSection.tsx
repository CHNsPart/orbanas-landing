'use client';

import { Button } from '@/components/ui/button';
import { useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import VideoBackground from '../ui/VideoBackground';

export default function HeroSection() {
  const heroContent = useContent('hero');
  const { flipClassName, isRTL } = useDirection();

  if (!heroContent) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse space-y-8">
          <div className="h-16 bg-white/10 rounded-lg w-3/4 mx-auto" />
          <div className="h-8 bg-white/10 rounded w-1/2 mx-auto" />
          <div className="h-12 bg-white/10 rounded w-48 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      
      {/* Background Video or Fallback */}
      <div className="absolute inset-0">
        <VideoBackground
          src={"/scene/scene-landscape-5s.mp4"}
          fallbackImage={"/scene/scene-square.png"}
          className="opacity-50 md:opacity-70"
          enableLoop={true}
          enablePingPong={false}
        />
        
        {/* Gradient Overlays */}
        <div className={cn(
          'absolute inset-0',
          isRTL 
            ? 'bg-gradient-to-l from-black/85 via-black/40 to-transparent' 
            : 'bg-gradient-to-r from-black/85 via-black/40 to-transparent'
        )} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className={cn(
              'lg:col-span-7 space-y-6 md:space-y-8',
              flipClassName('text-center lg:text-left')
            )}>
              
              {/* Main Headline */}
              <div className="relative">
                <div className={cn(
                  'space-y-3 md:space-y-4',
                  isRTL ? 'md:pr-8' : 'md:pl-8'
                )}>
                  <h1 className="font-black leading-snug text-white tracking-tight">
                    {heroContent.headline.primary}
                  </h1>
                  <h3 className="font-black leading-snug bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent animate-gradient bg-300%">
                    {heroContent.headline.secondary}
                  </h3>
                </div>                
              </div>

              {/* Subheadline with modern styling */}
              <div className={cn(
                'relative font-mono',
                isRTL ? 'md:pr-8' : 'md:pl-8'
              )}>
                <div className={cn(
                  'hidden md:block absolute top-2 w-1 h-12 lg:h-16 bg-gradient-to-b from-primary to-transparent',
                  isRTL ? 'right-0' : 'left-0'
                )} />
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed font-light">
                  {heroContent.subheadline}
                </p>
              </div>

              {/* Hook with emphasis */}
              <div className={cn(
                isRTL ? 'md:pr-8' : 'md:pl-8'
              )}>
                <p className="text-base font-mono md:text-lg text-white/70 max-w-2xl font-medium italic">
                  {`"${heroContent.hook}"`}
                </p>
              </div>

              {/* CTA Buttons with modern styling */}
              <div className={cn(
                'flex flex-col items-center sm:flex-row gap-4 pt-4 md:pt-6',
                isRTL ? 'md:pr-8 lg:justify-end' : 'md:pl-8 lg:justify-start',
                flipClassName('justify-center')
              )}>
                <Button  
                  className="bg-primary hover:bg-primary/90 text-white border-0 px-8 md:px-10 py-4 md:py-6 text-base md:text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl relative overflow-hidden group"
                  onClick={() => {
                    window.open('https://forms.gle/onMt8N8aufVnEvjy7', '_blank', 'noopener,noreferrer');
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    {heroContent.cta.primary}
                    <ArrowRight className={cn(
                      'w-5 h-5 transition-transform duration-300 group-hover:translate-x-1',
                      isRTL ? 'mr-3 rotate-180' : 'ml-3'
                    )} />
                  </span>
                  <div className={cn(
                    'absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300',
                    isRTL ? 'origin-right' : 'origin-left'
                  )} />
                </Button>
                <Link href={`/results`}>
                  <Button 
                    variant="ghost" 
                    className="border-2 border-white/30 cursor-pointer text-white hover:text-black hover:bg-white px-8 md:px-10 py-4 md:py-6 text-base md:text-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    {heroContent.cta.secondary}
                  </Button>
                </Link>
              </div>

              {/* Trust Badges - Simplified for mobile */}
              <div className={cn(
                'grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8',
                isRTL ? 'md:pr-8' : 'md:pl-8',
                flipClassName('')
              )}>
                {heroContent.badges?.map((badge: string, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center text-xs rounded-full text-white/80 bg-black/40 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 border border-white/20 transition-all duration-200 hover:border-primary/50 hover:bg-black/60',
                      flipClassName('')
                    )}
                  >
                    <div className={cn(
                      'size-2 aspect-square bg-primary rounded-full animate-pulse',
                      isRTL ? 'ml-2 md:ml-3' : 'mr-2 md:mr-3'
                    )} />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Single Floating Stats Card - Hidden on Mobile */}
            <div className={cn(
              'lg:col-span-5 relative hidden lg:flex justify-center'
            )}>
              
              {/* Main Stats Card - Desktop Only */}
              <div className="bg-black/60 backdrop-blur-lg rounded-lg border border-white/20 p-8 transform hover:rotate-0 transition-all duration-500 shadow-2xl w-auto rotate-3">
                <div className={cn(
                  'flex items-center mb-6',
                  isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'
                )}>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className={cn(
                    flipClassName('text-left')
                  )}>
                    <div className="text-4xl font-black text-white">12+</div>
                    <div className="text-sm text-white/70 font-medium">
                      {isRTL ? 'أقسام متكاملة' : 'Integrated Divisions'}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center border-t border-white/20 pt-6">
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-xs text-white/60">
                      {isRTL ? 'عميل' : 'Clients'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs text-white/60">
                      {isRTL ? 'وقت التشغيل' : 'Uptime'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Brand Watermark */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-4xl md:text-6xl lg:text-9xl text-white/5 tracking-widest select-none">
          orbanas
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-white/40 flex justify-center rounded-full">
            <div className="w-1 h-2 md:h-3 bg-white/60 mt-2 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}