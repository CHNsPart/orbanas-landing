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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className={cn(
              'lg:col-span-7 space-y-6 sm:space-y-8 md:space-y-10',
              flipClassName('text-center lg:text-left')
            )}>
              
              {/* Main Headline */}
              <div className="relative">
                <div className={cn(
                  'space-y-4 sm:space-y-6 md:space-y-8',
                  isRTL ? 'md:pr-8' : 'md:pl-8'
                )}>
                  {/* Primary headline with explicit responsive sizing */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] text-white tracking-tight">
                    {heroContent.headline.primary}
                  </h1>
                  {/* Secondary headline with explicit responsive sizing */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[0.95] bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent animate-gradient bg-300%">
                    {heroContent.headline.secondary}
                  </h3>
                </div>                
              </div>

              {/* Subheadline with improved responsive sizing */}
              <div className={cn(
                'relative font-mono',
                isRTL ? 'md:pr-8' : 'md:pl-8'
              )}>
                <div className={cn(
                  'hidden md:block absolute top-2 w-1 h-16 lg:h-20 xl:h-24 bg-gradient-to-b from-primary to-transparent',
                  isRTL ? 'right-0' : 'left-0'
                )} />
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl leading-relaxed font-light">
                  {heroContent.subheadline}
                </p>
              </div>

              {/* Hook with improved sizing */}
              <div className={cn(
                isRTL ? 'md:pr-8' : 'md:pl-8'
              )}>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-mono text-white/70 max-w-3xl font-medium italic leading-relaxed">
                  {`"${heroContent.hook}"`}
                </p>
              </div>

              {/* CTA Buttons with better responsive design */}
              <div className={cn(
                'flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-6 md:pt-8',
                isRTL ? 'md:pr-8 lg:justify-end' : 'md:pl-8 lg:justify-start',
                flipClassName('justify-center')
              )}>
                <Button  
                  className="w-fit sm:w-auto bg-primary hover:bg-primary/90 text-white border-0 px-8 sm:px-10 md:px-12 py-6 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl relative overflow-hidden group"
                  onClick={() => {
                    window.open('https://forms.gle/onMt8N8aufVnEvjy7', '_blank', 'noopener,noreferrer');
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {heroContent.cta.primary}
                    <ArrowRight className={cn(
                      'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:translate-x-1',
                      isRTL ? 'mr-3 sm:mr-4 rotate-180' : 'ml-3 sm:ml-4'
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
                    className="w-fit sm:w-auto border-2 border-white/30 cursor-pointer text-white hover:text-black hover:bg-white px-8 sm:px-10 md:px-12 py-6 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    {heroContent.cta.secondary}
                  </Button>
                </Link>
              </div>

              {/* Trust Badges with improved responsive design */}
              <div className={cn(
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-6 pt-2 md:pt-10',
                isRTL ? 'md:pr-8' : 'md:pl-8',
                flipClassName('')
              )}>
                {heroContent.badges?.map((badge: string, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center justify-center text-sm sm:text-base rounded-full text-white/80 bg-black/40 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-1 sm:py-4 border border-white/20 transition-all duration-200 hover:border-primary/50 hover:bg-black/60',
                      flipClassName('')
                    )}
                  >
                    <div className={cn(
                      'size-2 sm:size-3 aspect-square bg-primary rounded-full animate-pulse',
                      isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'
                    )} />
                    <span className="font-medium text-center lg:text-left">{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Enhanced Stats Card */}
            <div className={cn(
              'lg:col-span-5 relative hidden lg:flex justify-center'
            )}>
              
              {/* Main Stats Card - Desktop Only with better sizing */}
              <div className="bg-black/60 backdrop-blur-lg rounded-2xl border border-white/20 p-8 lg:p-10 xl:p-12 transform hover:rotate-0 transition-all duration-500 shadow-2xl w-auto rotate-3 hover:scale-105">
                <div className={cn(
                  'flex items-center mb-8',
                  isRTL ? 'space-x-reverse space-x-6' : 'space-x-6 lg:space-x-8'
                )}>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-orange-400 rounded-2xl flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <div className={cn(
                    flipClassName('text-left')
                  )}>
                    <div className="text-4xl lg:text-5xl xl:text-6xl font-black text-white">12+</div>
                    <div className="text-sm lg:text-base text-white/70 font-medium leading-tight">
                      {isRTL ? 'أقسام متكاملة' : 'Integrated Divisions'}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 lg:gap-8 text-center border-t border-white/20 pt-6 lg:pt-8">
                  <div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white">500+</div>
                    <div className="text-xs lg:text-sm text-white/60 font-medium">
                      {isRTL ? 'عميل' : 'Clients'}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl xl:text-4xl font-black text-white">99.9%</div>
                    <div className="text-xs lg:text-sm text-white/60 font-medium">
                      {isRTL ? 'وقت التشغيل' : 'Uptime'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Brand Watermark with responsive sizing */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-2xl sm:text-4xl md:text-6xl lg:text-9xl text-white/5 tracking-widest select-none font-bold">
          orbanas
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 md:w-7 md:h-12 border-2 border-white/40 flex justify-center rounded-full">
            <div className="w-1 h-2 sm:h-3 md:h-4 bg-white/60 mt-2 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}