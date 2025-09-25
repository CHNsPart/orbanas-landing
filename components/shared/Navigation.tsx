'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage, useContent } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import LanguageToggle from './LanguageToggle';
import { cn } from '@/lib/utils';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
  const { flipClassName, isRTL } = useDirection();
  const navContent = useContent('navigation');

  // Handle scroll effect for background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [language]);

  // Handle smooth scroll to sections
  const handleSectionClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        // Offset for sticky header height
        const headerHeight = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setIsOpen(false);
      }
    }
  };

  if (!navContent) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-center pt-6">
          <div className="animate-pulse w-96 h-12 bg-white/10 rounded-full" />
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      className
    )}>
      {/* Desktop Navigation - Single Centered Bar */}
      <div className="hidden lg:flex justify-center pt-6 px-6">
        <div className={cn(
          'flex items-center rounded-full border px-6 py-3 transition-all duration-300',
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-white/20 shadow-lg' 
            : 'bg-black/20 backdrop-blur-md border-white/10',
          flipClassName('')
        )}>
          
          {/* Logo */}
          <Link 
            href="/" 
            className={cn(
              'flex items-center',
              isRTL ? 'ml-8' : 'mr-8'
            )}
            aria-label="Orbanas Home"
          >
            <Image
              src={"/orbanas-logo.svg"}
              alt="Orbanas Logo"
              width={32}
              height={32}
              quality={100}
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className={cn(
            'flex items-center',
            isRTL ? 'space-x-reverse space-x-8 ml-8' : 'space-x-8 mr-8'
          )}>
            {navContent.links?.map((link: { href: string; label: string }, index: number) => (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    handleSectionClick(link.href);
                  }
                }}
                className="text-white/80 hover:text-primary text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <div className={cn(
            isRTL ? 'ml-4' : 'mr-4'
          )}>
            <LanguageToggle 
              variant="minimal" 
              className="text-white/80 hover:bg-white/10 hover:text-white"
            />
          </div>
          
          {/* CTA Button */}
          <Button 
            className="bg-white text-black hover:bg-white/90 border-0 px-6 py-2 rounded-full font-medium transition-all duration-200"
            onClick={() => handleSectionClick('#contact')}
          >
            <span className="flex items-center">
              {navContent.cta}
              <Sparkles className={cn(
                'w-4 h-4',
                isRTL ? 'mr-2' : 'ml-2'
              )} />
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        'lg:hidden flex items-center p-6 justify-between transition-all duration-300',
        isScrolled 
          ? 'bg-black/80 backdrop-blur-lg border-b border-white/20' 
          : 'bg-transparent'
      )}>
        
        {/* Mobile Logo */}
        <Link 
          href="/" 
          className="flex items-center"
          aria-label="Orbanas Home"
        >
          <Image
            src="/orbanas-logo.svg"
            alt="Orbanas Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className={cn(
          'flex items-center',
          isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'
        )}>
          <LanguageToggle 
            variant="minimal" 
            size="sm" 
            showText={false}
            className="text-white/80 hover:text-white"
          />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={cn(
          'lg:hidden absolute top-full left-0 right-0 mt-2 mx-6'
        )}>
          <div className="bg-black/90 backdrop-blur-lg rounded-2xl border border-white/10 p-6 space-y-4 shadow-2xl">
            
            {/* Mobile Navigation Links */}
            {navContent.links?.map((link: { href: string; label: string }, index: number) => (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    handleSectionClick(link.href);
                  }
                  setIsOpen(false);
                }}
                className={cn(
                  'block text-white/80 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/10',
                  isRTL ? 'text-right' : 'text-left'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-white/10">
              <Button 
                className="w-full bg-white text-black hover:bg-white/90 border-0 rounded-full font-medium"
                onClick={() => {
                  handleSectionClick('#contact');
                  setIsOpen(false);
                }}
              >
                <Sparkles className={cn(
                  'w-4 h-4',
                  isRTL ? 'ml-2' : 'mr-2'
                )} />
                {navContent.cta}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden -z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
} 