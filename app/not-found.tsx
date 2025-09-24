'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  const { language } = useLanguage();
  const { isRTL } = useDirection();

  const content = {
    en: "This page seems to have taken a different path",
    ar: "يبدو أن هذه الصفحة اتخذت مسارًا مختلفًا"
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center space-y-12">
        
        {/* 404 with Logo as 0 */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* First 4 */}
            <span className="text-[12rem] md:text-[16rem] font-black text-foreground leading-none animate-pulse">
              4
            </span>
          </div>
          
          {/* Logo as 0 */}
          <div className="mx-4 md:mx-8 relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 relative animate-float">
              <Image
                src="/orbanas-logo.svg"
                alt="0"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-50 animate-pulse" />
            </div>
          </div>
          
          {/* Second 4 */}
          <div className="relative">
            <span className="text-[12rem] md:text-[16rem] font-black text-foreground leading-none animate-pulse">
              4
            </span>
          </div>
        </div>

        {/* Simple message */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-medium">
          {currentContent}
        </p>

        {/* Back to home button */}
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          asChild
        >
          <Link href="/">
            <span className="flex items-center">
              {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
              <ArrowRight className={cn(
                'w-5 h-5 transition-transform duration-300 group-hover:translate-x-1',
                isRTL ? 'mr-3 rotate-180' : 'ml-3'
              )} />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}