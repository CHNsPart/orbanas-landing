'use client';

import { Button } from '@/components/ui/button';
import { ScrollVelocityContainer, ScrollVelocityRow } from '@/components/ui/scroll-based-velocity';
import { useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { ArrowRight, Phone, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CTASection() {
  const ctaContent = useContent('cta');
  const { flipClassName, isRTL } = useDirection();

  if (!ctaContent) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-8 bg-muted rounded w-1/2 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  // Project images for scroll velocity
  const projectImages = [
    { src: '/projects/1.png', alt: 'Project 1' },
    { src: '/projects/2.png', alt: 'Project 2' },
    { src: '/projects/3.png', alt: 'Project 3' },
    { src: '/projects/4.png', alt: 'Project 4' },
    { src: '/projects/5.png', alt: 'Project 5' },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-background overflow-hidden" id="contact">
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          
          {/* Urgency Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-8">
            <Clock className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
            <span className="text-primary font-bold text-sm font-mono">
              {ctaContent.urgency}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-black text-foreground leading-tight mb-6">
            {ctaContent.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
            {ctaContent.subtitle}
          </h2>

          {/* Hook */}
          <div className="relative max-w-3xl mx-auto">
            <p className={cn(
              'text-md md:text-lg text-primary/90 font-semibold italic leading-relaxed',
              isRTL ? 'pr-6' : 'pl-6'
            )}>
              {`"${ctaContent.hook}"`}
            </p>
          </div>
        </div>

        {/* Scrolling Project Images */}
        <div className="mb-16 lg:mb-20" dir="ltr">
          <ScrollVelocityContainer>
            {/* First Row - Left to Right */}
            <ScrollVelocityRow baseVelocity={1} direction={1} className="mb-8">
            <div className="flex items-center space-x-8 px-8">
              {[...projectImages, ...projectImages].map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden bg-muted border border-border shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    width={320}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if images don't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.background = 'linear-gradient(135deg, #F28111, #e05d0c)';
                      target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-xl">${project.alt}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>
            </ScrollVelocityRow>

            {/* Second Row - Right to Left */}
            <ScrollVelocityRow baseVelocity={1} direction={-1}>
            <div className="flex items-center space-x-8 px-8">
              {[...projectImages.reverse(), ...projectImages].map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 h-48 rounded-2xl overflow-hidden bg-muted border border-border shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    width={320}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if images don't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.style.background = 'linear-gradient(135deg, #e05d0c, #F28111)';
                      target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-xl">${project.alt}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>

        {/* Main CTA Card */}
        <div className="relative max-w-6xl mx-auto">
          <div className="bg-foreground/95 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl">
            
            {/* Card Content */}
            <div className="text-center space-y-8">
              
              {/* Action Buttons */}
              <div className={cn(
                'flex flex-col sm:flex-row items-center gap-6 z-20',
                flipClassName('justify-center')
              )}>
                <Button
                  size="lg"
                  className="bg-primary cursor-pointer hover:bg-primary/90 text-white px-10 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group min-w-[280px]"
                  onClick={() => {
                    window.open('https://forms.gle/onMt8N8aufVnEvjy7', '_blank', 'noopener,noreferrer');
                  }}
                >
                  <span className="flex items-center">
                    {ctaContent.buttons.primary}
                    <ArrowRight className={cn(
                      'w-6 h-6 transition-transform duration-300 group-hover:translate-x-1',
                      isRTL ? 'mr-3 rotate-180' : 'ml-3'
                    )} />
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-foreground px-10 py-6 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 group min-w-[280px]"
                  asChild
                >
                  <Link href={`tel:${ctaContent.phoneNumber}`}>
                    <Phone className={cn(
                        'w-5 h-5 transition-transform duration-300 group-hover:scale-110',
                        isRTL ? 'ml-3' : 'mr-3'
                    )} />
                    {ctaContent.buttons.secondary}
                  </Link>
                </Button>
              </div>

              {/* Background Pattern */}
              <div className="absolute -z-20 inset-0 bg-grid-white/[0.03] bg-grid-16" />

              {/* Guarantee */}
              <div className="bg-accent/10 backdrop-blur-sm max-w-2xl mx-auto rounded-2xl p-6 border border-white/10">
                <div className={cn(
                  'flex items-center justify-center mb-4',
                  flipClassName('')
                )}>
                  <Shield className={cn('w-8 h-8 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
                  <span className="text-white font-bold text-lg">
                    {isRTL ? 'ضمان الجودة' : 'Quality Guarantee'}
                  </span>
                </div>
                <p className="text-white/80 text-base leading-relaxed max-w-3xl mx-auto">
                  {ctaContent.guarantee}
                </p>
              </div>

              {/* Location */}
              <div className="pt-6">
                <div className={cn(
                  'flex items-center justify-center text-white/60',
                  flipClassName('')
                )}>
                  <div className="hidden md:block w-2 h-2 aspect-square bg-primary rounded-full animate-pulse" />
                  <span className={cn('text-sm font-medium', isRTL ? 'mr-3' : 'ml-3')}>
                    {ctaContent.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/5 rounded-lg blur-lg animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}