'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CometCard } from '@/components/ui/comet-card';
import { useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Award,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
  const aboutContent = useContent('about');
  const { flipClassName, isRTL } = useDirection();
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!aboutContent) {
    return (
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-background rounded w-2/3 mx-auto" />
            <div className="h-6 bg-background rounded w-1/2 mx-auto" />
            <div className="h-96 bg-background rounded-3xl" />
          </div>
        </div>
      </section>
    );
  }

  const features = aboutContent.features || [];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-background"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-grid-16" />
          
          {/* Card Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            
            {/* Left Side - Badges */}
            <div className={cn(
              'flex flex-wrap gap-3 mb-6 lg:mb-0',
              flipClassName('')
            )}>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Award className={cn('w-4 h-4 text-primary', isRTL ? 'ml-2' : 'mr-2')} />
                <span className="text-white/90 text-sm font-medium">
                  {isRTL ? 'من نحن' : 'Why Choose Us'}
                </span>
              </div>
              
              <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                <CheckCircle className={cn('w-4 h-4 text-primary', isRTL ? 'ml-2' : 'mr-2')} />
                <span className="text-white/90 text-sm font-medium">
                  {isRTL ? 'شريك موثوق' : 'Trusted Partner'}
                </span>
              </div>
            </div>

            {/* Right Side - CTA Link */}
            <button className={cn(
              'group inline-flex items-center text-white/70 hover:text-white transition-colors duration-300',
              flipClassName('')
            )}>
              <span className="text-sm font-medium underline decoration-white/30 underline-offset-4 group-hover:decoration-white/60 transition-colors duration-300">
                {isRTL ? 'اكتشف أعمالنا' : 'View Our Work'}
              </span>
              <ArrowRight className={cn(
                'w-4 h-4 transition-transform duration-300 group-hover:translate-x-1',
                isRTL ? 'mr-2 rotate-180' : 'ml-2'
              )} />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-8">
              
              {/* Main Headline */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight">
                  {aboutContent.title}
                </h2>
                
                <p className="text-xl lg:text-2xl text-white/80 font-medium leading-relaxed">
                  {aboutContent.subtitle}
                </p>
                
                <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                  {aboutContent.description}
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-4">
                {features.map((feature: { title: string; description: string }, index: number) => {
                  const isActive = activeFeature === index;
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        'group p-4 lg:p-6 rounded-2xl border transition-all duration-500 cursor-pointer',
                        isActive 
                          ? 'bg-white/10 border-primary/50 backdrop-blur-sm' 
                          : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                      )}
                      onClick={() => setActiveFeature(index)}
                      onMouseEnter={() => setActiveFeature(index)}
                    >
                      <div className={cn(
                        'flex items-center',
                        flipClassName('')
                      )}>
                        <div className={cn(
                          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                          isActive 
                            ? 'bg-primary text-white' 
                            : 'bg-white/10 text-white/70 group-hover:bg-white/20'
                        )}>
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        
                        <div className={cn(
                          'flex-1 min-w-0',
                          isRTL ? 'mr-4' : 'ml-4'
                        )}>
                          <h3 className={cn(
                            'font-bold mb-1 transition-colors duration-300',
                            isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                          )}>
                            {feature.title}
                          </h3>
                          
                          <p className={cn(
                            'text-sm leading-relaxed transition-all duration-300',
                            isActive ? 'text-white/80' : 'text-white/60 group-hover:text-white/70'
                          )}>
                            {feature.description}
                          </p>
                        </div>

                        <div className={cn(
                          'flex-shrink-0 transition-all duration-300',
                          isRTL ? 'mr-3' : 'ml-3'
                        )}>
                          <ArrowRight className={cn(
                            'w-5 h-5 transition-all duration-300',
                            isActive 
                              ? 'text-primary translate-x-1' 
                              : 'text-white/50 group-hover:text-white/70 group-hover:translate-x-1',
                            isRTL && 'rotate-180'
                          )} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Interactive Comet Card Visual */}
            <div className="relative">
              
              {/* Main Comet Card - Integration Hub */}
              <div className="relative max-w-lg mx-auto">
                <CometCard className="w-full">
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl p-8 relative overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid-16" />
                    
                    {/* Header */}
                    <div className="relative z-10 mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-3 h-3 bg-white/40 rounded-full" />
                        <div className="w-3 h-3 bg-white/40 rounded-full" />
                        <div className="w-3 h-3 bg-white/40 rounded-full" />
                      </div>
                      <h3 className="text-xl font-black text-white mb-2">
                        {isRTL ? 'مركز التكامل' : 'Integration Hub'}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {isRTL ? 'نظام موحد، حلول متكاملة' : 'One System, Integrated Solutions'}
                      </p>
                    </div>

                    {/* Central Stats Display */}
                    <div className="relative z-10 text-center mb-8">
                      <div className="w-24 h-24 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="text-2xl font-black text-white">12</div>
                          <div className="text-xs text-white/80 font-medium">
                            {isRTL ? 'قسم' : 'Divisions'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Connection Lines Visualization */}
                      <div className="flex justify-center space-x-2 h-full mb-4">
                        {[1,2,3,4,5].map((_, i) => (
                          <div 
                            key={i} 
                            className={cn("w-1 bg-white/60 rounded-full transition-all duration-300 animate-ping")} 
                            style={{ 
                              height: `${10 + 10}px`,
                              animationDelay: `${i * 0.1}s` 
                            }} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-white/90 text-sm font-medium">
                        {isRTL ? 'متصل • متزامن • متكامل' : 'Connected • Synced • Integrated'}
                      </p>
                    </div>

                    {/* Bottom Metrics */}
                    <div className="relative flex justify-center items-center z-10 w-full gap-4">
                      <Image
                        src="/scene/scene-landscape.png"
                        alt="Target Icon"
                        width={500}
                        height={200}
                        className={cn('rounded-lg object-center')}
                      />
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute bottom-6 right-6 size-6 bg-white/20 rounded-lg animate-float" />
                    <div className="absolute bottom-6 left-6 size-6 bg-white/20 rounded-md animate-float" />
                  </div>
                </CometCard>
              </div>

              {/* Supporting Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { 
                    value: 'ISO', 
                    label: isRTL ? 'معتمد' : 'Certified',
                  },
                  { 
                    value: '24/7', 
                    label: isRTL ? 'دعم' : 'Support',
                  },
                  { 
                    value: 'KSA', 
                    label: isRTL ? 'محلي' : 'Local',
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="text-lg font-black text-white group-hover:text-primary transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/60 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className={cn(
            'relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-12 pt-8 border-t border-white/10',
            flipClassName('justify-center lg:justify-start')
          )}>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-bold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <span className="flex items-center">
                {isRTL ? 'اكتشف حلولنا' : 'Discover Our Solutions'}
                <ArrowRight className={cn(
                  'w-5 h-5 transition-transform duration-300 group-hover:translate-x-1',
                  isRTL ? 'mr-3 rotate-180' : 'ml-3'
                )} />
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg"
              className="text-white/80 hover:text-white hover:bg-white/10 px-8 py-6 text-base font-semibold"
            >
              {isRTL ? 'تحدث مع خبير' : 'Speak with Expert'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}