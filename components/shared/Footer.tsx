'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage, useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Linkedin, 
  Twitter,
  Instagram,
  Globe
} from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const { flipClassName, isRTL } = useDirection();
  const footerContent = useContent('footer');

  // Current year for copyright
  const currentYear = new Date().getFullYear();

  // Company info
  const companyInfo = {
    phone: '+966 57 616 3141',
    email: 'hello@orbanas.com',
    website: 'www.orbanas.com',
    address: {
      en: 'Dammam, Saudi Arabia',
      ar: 'الدمام، المملكة العربية السعودية'
    }
  };

  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/orbanas' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/orbanas' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/orbanas' },
  ];

  // Quick links
  const quickLinks = {
    en: [
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ],
    ar: [
      { label: 'من نحن', href: '#about' },
      { label: 'خدماتنا', href: '#services' },
      { label: 'تواصل معنا', href: '#contact' },
      { label: 'سياسة الخصوصية', href: '/privacy' },
      { label: 'شروط الخدمة', href: '/terms' }
    ]
  };

  // Handle smooth scroll for anchor links
  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!footerContent) {
    return (
      <footer className="bg-muted border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-background rounded w-48" />
            <div className="h-4 bg-background rounded w-64" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <Link href="/" className={cn("flex items-center mb-6 group", isRTL ? 'space-x-reverse' : ' space-x-2')}>
                <div className="relative w-10 h-10">
                  <Image
                    src={"/orbanas-logo.svg"}
                    alt="Orbanas Logo"
                    fill
                    className="object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  Orbanas
                </span>
              </Link>

              {/* Tagline */}
              <p className="text-lg text-muted-foreground mb-6 max-w-md">
                {footerContent.tagline}
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className={cn('flex items-center', flipClassName(''))}>
                  <MapPin className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
                  <span className="text-muted-foreground">
                    {companyInfo.address[language]}
                  </span>
                </div>
                
                <div className={cn('flex items-center', flipClassName(''))}>
                  <Phone className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
                  <Link 
                    href={`tel:${companyInfo.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {companyInfo.phone}
                  </Link>
                </div>
                
                <div className={cn('flex items-center', flipClassName(''))}>
                  <Mail className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
                  <a 
                    href={`mailto:${footerContent.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {footerContent.email}
                  </a>
                </div>

                <div className={cn('flex items-center', flipClassName(''))}>
                  <Globe className={cn('w-5 h-5 text-primary', isRTL ? 'ml-3' : 'mr-3')} />
                  <span className="text-muted-foreground">
                    {companyInfo.website}
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
              </h3>
              <ul className="space-y-3">
                {quickLinks[language].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }
                      }}
                      className={cn(
                        'text-muted-foreground hover:text-primary transition-colors duration-200',
                        'group flex items-center',
                        flipClassName('')
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={cn(
                        'w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200',
                        'group-hover:translate-x-1',
                        isRTL ? 'mr-2 rotate-180' : 'ml-2'
                      )} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Divisions */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {language === 'en' ? 'Our Divisions' : 'أقسامنا'}
              </h3>
              <ul className="space-y-2">
                {footerContent.divisions?.slice(0, 6).map((division: string, index: number) => (
                  <li key={index}>
                    <span className="text-sm text-muted-foreground">
                      {division}
                    </span>
                  </li>
                ))}
                {footerContent.divisions?.length > 6 && (
                  <li>
                    <span className="text-sm text-primary font-medium">
                      {language === 'en' 
                        ? `+${footerContent.divisions.length - 6} more` 
                        : `+${footerContent.divisions.length - 6} المزيد`
                      }
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              {language === 'en' 
                ? `© ${currentYear} Orbanas. All rights reserved.`
                : `© ${currentYear} أوربانس. جميع الحقوق محفوظة.`
              }
            </p>

            {/* Legal Links */}
            <div className={cn('flex items-center space-x-6', flipClassName(''))}>
              <Link 
                href="/privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {language === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
              </Link>
            </div>

            {/* Back to Top Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group"
            >
              <span className="text-sm">
                {language === 'en' ? 'Back to Top' : 'العودة للأعلى'}
              </span>
              <ArrowRight className={cn(
                'w-4 h-4 transition-transform duration-200 group-hover:-translate-y-1',
                isRTL ? 'mr-2 rotate-180' : 'ml-2',
                '-rotate-90'
              )} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}