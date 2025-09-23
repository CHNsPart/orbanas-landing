'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { 
  ArrowRight, 
  Shield, 
  ShieldCheck,
  Cloud, 
  Database, 
  Network,
  Camera,
  Globe,
  Package,
  Users,
  Building,
  Paintbrush,
  Sparkles,
  CheckCircle,
  Zap,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

// Icon mapping for services
const iconMap = {
  'shield-check': ShieldCheck,
  'shield': Shield,
  'cloud': Cloud,
  'database': Database,
  'network': Network,
  'camera': Camera,
  'globe': Globe,
  'package': Package,
  'users': Users,
  'building': Building,
  'paintbrush': Paintbrush
};

export default function ServicesSection() {
  const servicesContent = useContent('services');
  const { isRTL } = useDirection();
  const sectionRef = useRef<HTMLDivElement>(null);

  if (!servicesContent) {
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

  // Transform services data for sticky scroll with rich content
  const stickyScrollContent = servicesContent.grid?.map((service: {
    title: string;
    hook: string;
    description: string;
    icon: string;
    services?: string[]
  }, index: number) => {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Shield;
  const serviceImagePath = `/services/${index + 1}.png`;

  return {
      title: service.title,
      description: service.hook,
      content: (
        <div className="h-full w-full relative overflow-hidden">
          {/* Background Image - Dynamic per service */}
          <div className="absolute inset-0">
            <Image
              src={serviceImagePath}
              alt={service.title}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to default image if specific service image doesn't exist
                const target = e.target as HTMLImageElement;
                target.src = '/services/1.png';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col p-8">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <div className="px-4 py-2 bg-primary rounded-full">
                <span className="text-white font-bold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Service Title */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-primary font-semibold text-lg mb-3 leading-snug">
                {service.hook}
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Services List */}
            <div className="flex-grow">
              <div className="space-y-3 mb-6">
                {service.services?.slice(0, 4).map((serviceItem: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 text-sm leading-relaxed">{serviceItem}</span>
                  </div>
                ))}
                
                {(service.services?.length ?? 0) > 4 && (
                  <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                    <Sparkles className="w-4 h-4" />
                    <span>+{(service.services?.length ?? 0) - 4} {isRTL ? 'خدمات إضافية' : 'more services'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-6 border-t border-white/20">
              <button className="group w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 rounded-xl px-6 py-4 transition-all duration-300">
                <div className="flex items-center justify-center gap-2 text-white">
                  <span className="font-medium">
                    {isRTL ? 'اعرف المزيد' : 'Learn More'}
                  </span>
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </div>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-20 h-20 bg-white/5 rounded-full blur-xl" />
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/5 rounded-lg blur-lg animate-float" />
          </div>
        </div>
      )
    };
  }) || [];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
      id="services"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-6 hover:bg-primary/15 transition-colors duration-300">
            <Sparkles className={cn('w-5 h-5 text-primary animate-pulse', isRTL ? 'ml-2' : 'mr-2')} />
            <span className="text-primary font-semibold text-sm">
              {isRTL ? 'خدماتنا المتكاملة' : 'Our Integrated Services'}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {servicesContent.title}
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {servicesContent.subtitle}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { value: '12', label: isRTL ? 'قسم متكامل' : 'Integrated Divisions', icon: Database },
            { value: '500+', label: isRTL ? 'عميل سعودي' : 'Saudi Clients', icon: Users },
            { value: '99.9%', label: isRTL ? 'وقت التشغيل' : 'Uptime', icon: TrendingUp },
            { value: '24/7', label: isRTL ? 'دعم سعودي' : 'Saudi Support', icon: Shield }
          ].map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 text-center group hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <stat.icon className="w-6 h-6 text-primary group-hover:text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Sticky Scroll Section */}
        <div className="relative mb-20">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {isRTL ? 'استكشف خدماتنا المتكاملة' : 'Explore Our Integrated Services'}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRTL 
                ? 'مرر لاستكشاف كل قسم من أقسامنا الـ 12 وتفاصيل الخدمات المقدمة'
                : 'Scroll through each of our 12 divisions and discover the services we provide'
              }
            </p>
          </div>

          <StickyScroll 
            content={stickyScrollContent}
            contentClassName="bg-gradient-to-br from-primary via-primary/90 to-primary/70"
          />
        </div>

        {/* Bottom Integration Message */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground/90 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-grid-16" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Zap className={cn('w-5 h-5 text-primary', isRTL ? 'ml-2' : 'mr-2')} />
                <span className="text-white/90 text-sm font-medium">
                  {isRTL ? 'السر في التكامل' : 'The Integration Advantage'}
                </span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {isRTL 
                  ? 'لماذا يختار عملاؤنا التكامل على فوضى الموردين'
                  : 'Why Our Clients Choose Integration Over Vendor Chaos'
                }
              </h3>
              
              <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
                {isRTL
                  ? 'ما يحدث عندما تعمل جميع الأقسام الـ 12 معاً لنجاحك - بدلاً من محاولة تنسيق 12 مورد مختلف'
                  : 'What happens when all 12 divisions work together for your success - instead of trying to coordinate 12 different vendors'
                }
              </p>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
                {[
                  {
                    icon: TrendingUp,
                    title: isRTL ? 'تسليم أسرع' : 'Faster Delivery',
                    desc: isRTL ? '4 أشهر بدلاً من 12' : '4 months instead of 12'
                  },
                  {
                    icon: Shield,
                    title: isRTL ? 'مساءلة واحدة' : 'Single Accountability',
                    desc: isRTL ? 'رقم واحد لكل شيء' : 'One number for everything'
                  },
                  {
                    icon: CheckCircle,
                    title: isRTL ? 'تكلفة أقل' : 'Lower Cost',
                    desc: isRTL ? '35% توفير متوسط' : '35% average savings'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                    <p className="text-white/70 text-sm">{benefit.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-bold transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <Sparkles className={cn(
                  'w-5 h-5',
                  isRTL ? 'ml-3' : 'mr-3'
                )} />
                {isRTL ? 'احصل على تقييم مجاني' : 'Get Your Free Assessment'}
                <ArrowRight className={cn(
                  'w-5 h-5 transition-transform duration-300 group-hover:translate-x-1',
                  isRTL ? 'mr-3 rotate-180' : 'ml-3'
                )} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}