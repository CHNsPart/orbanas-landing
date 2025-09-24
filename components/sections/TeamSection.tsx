'use client';

import { Button } from '@/components/ui/button';
import { useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { ArrowRight, Linkedin, Award, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TeamSection() {
  const teamContent = useContent('team');
  const { flipClassName, isRTL } = useDirection();
  const ctaContent = useContent('cta');

  if (!teamContent) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-16 bg-muted rounded w-3/4 mx-auto" />
            <div className="h-8 bg-muted rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="h-96 bg-muted rounded-3xl" />
              <div className="h-96 bg-muted rounded-3xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 lg:py-28 bg-muted/30 overflow-hidden" id="team">
      
      {/* Background Elements */}
      <div className="absolute top-32 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-8">
            <Users className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
            <span className="text-primary font-semibold text-sm font-mono">
              {isRTL ? 'فريق القيادة' : 'Leadership Team'}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-black text-foreground leading-tight mb-6">
            {teamContent.title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-muted-foreground font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
            {teamContent.subtitle}
          </h2>

          {/* Description */}
          <div className="relative max-w-3xl mx-auto">
            <p className={cn(
              'text-md md:text-lg text-foreground/80 leading-relaxed',
              isRTL ? 'pr-6' : 'pl-6'
            )}>
              {teamContent.description}
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {teamContent.members?.map((member: {
            id: string;
            name: string;
            position: string;
            department: string;
            bio: string;
            linkedin: string;
            image: string;
            expertise?: string[];
            achievements: string;
          }) => (
            <div
              key={member.id}
              className="group relative"
            >
              {/* Main Card */}
              <div className="relative bg-card/80 backdrop-blur-lg rounded-3xl p-8 lg:p-10 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-card/90">
                
                {/* Card Header */}
                <div className={cn(
                  'flex flex-col lg:flex-row items-center gap-6 mb-8',
                  flipClassName('')
                )}>
                  
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="h-full w-32 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={350}
                        height={368}
                        className="object-fill group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback for missing images
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.style.background = 'linear-gradient(135deg, #F28111, #e05d0c)';
                          target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-2xl">${member.name.charAt(0)}</div>`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className={cn(
                    'text-center lg:text-left flex-1',
                    isRTL && 'lg:text-right'
                  )}>
                    <h3 className="text-2xl font-black text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-primary font-bold text-lg mb-1">
                      {member.position}
                    </p>
                    <p className="text-muted-foreground font-medium text-sm">
                      {member.department}
                    </p>
                    
                    {/* LinkedIn Link */}
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      <Linkedin className={cn('w-5 h-5', isRTL ? 'ml-2' : 'mr-2')} />
                      <span className="text-sm font-medium">
                        {isRTL ? 'لينكدإن' : 'LinkedIn'}
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <p className="text-foreground/80 leading-relaxed text-base">
                    {member.bio}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-4">
                    {isRTL ? 'مجالات الخبرة' : 'Expertise'}
                  </h4>
                  <div className={cn(
                    'flex flex-wrap gap-3',
                    flipClassName('')
                  )}>
                    {member.expertise?.map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievement Highlight */}
                <div className="bg-muted/50 rounded-2xl p-6 border border-border/30">
                  <div className={cn(
                    'flex items-center mb-3',
                    flipClassName('')
                  )}>
                    <Award className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                      {isRTL ? 'إنجاز رئيسي' : 'Key Achievement'}
                    </span>
                  </div>
                  <p className="text-foreground font-semibold">
                    {member.achievements}
                  </p>
                </div>
              </div>

              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-foreground/95 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-grid-16" />
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-4">
                {isRTL ? 'جاهز للعمل مع فريق الخبراء؟' : 'Ready to Work with Our Expert Team?'}
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                {isRTL 
                  ? 'احجز استشارة مجانية مع فريق القيادة واكتشف كيف يمكن لأوربانس تحويل أعمالك'
                  : 'Book a free consultation with our leadership team and discover how Orbanas can transform your business'
                }
              </p>
              <Link href={`tel:${ctaContent.phoneNumber}`}>
                <Button
                    size="lg"
                    className="bg-primary cursor-pointer hover:bg-primary/90 text-white px-10 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                    onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                    }}
                >
                    <span className="flex items-center">
                    {isRTL ? 'تحدث مع الخبراء' : 'Speak with Experts'}
                    <ArrowRight className={cn(
                        'w-5 h-5 transition-transform duration-300 group-hover:translate-x-1',
                        isRTL ? 'mr-3 rotate-180' : 'ml-3'
                    )} />
                    </span>
                </Button>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 rounded-lg blur-lg animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}