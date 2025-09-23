'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useDirection } from '@/hooks/useDirection';
import { cn } from '@/lib/utils';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'button' | 'dropdown' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

export default function LanguageToggle({
  variant = 'button',
  size = 'md',
  showIcon = true,
  showText = true,
  className
}: LanguageToggleProps) {
  const { language, toggleLanguage, supportedLanguages, isLoading } = useLanguage();
  const { flipClassName, isRTL } = useDirection();
  const [isOpen, setIsOpen] = useState(false);

  // Current language display
  const currentLangDisplay = {
    en: { label: 'EN', full: 'English' },
    ar: { label: 'ع', full: 'العربية' }
  };

  // Simple button toggle
  if (variant === 'button' || variant === 'minimal') {
    return (
      <Button
        variant={variant === 'minimal' ? 'ghost' : 'outline'}
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
        onClick={toggleLanguage}
        disabled={isLoading}
        className={cn(
          'relative group transition-all duration-200',
          flipClassName(''),
          variant === 'minimal' && 'hover:bg-accent hover:text-foreground',
          className
        )}
        aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      >
        {showIcon && (
          <Globe className={cn(
            'transition-transform duration-200 group-hover:scale-110',
            showText ? (isRTL ? 'ml-1' : 'mr-1') : '',
            size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
          )} />
        )}
        
        {showText && (
          <span className="font-medium">
            {currentLangDisplay[language].label}
          </span>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-primary" />
          </div>
        )}
      </Button>
    );
  }

  // Dropdown variant
  return (
    <div className="relative">
      <Button
        variant="outline"
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'default'}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={cn(
          'relative group',
          flipClassName(''),
          className
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {showIcon && (
          <Globe className={cn(
            'transition-transform duration-200',
            showText ? (isRTL ? 'ml-1' : 'mr-1') : '',
            size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
          )} />
        )}
        
        {showText && (
          <span className="font-medium">
            {currentLangDisplay[language].full}
          </span>
        )}

        <ChevronDown className={cn(
          'transition-transform duration-200',
          isOpen && 'rotate-180',
          isRTL ? 'mr-1' : 'ml-1',
          size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
        )} />

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-primary" />
          </div>
        )}
      </Button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <div className={cn(
            'absolute top-full mt-2 w-48 z-20',
            'bg-background border border-border rounded-md shadow-lg',
            'animate-in slide-in-from-top-2 duration-200',
            isRTL ? 'left-0' : 'right-0'
          )}>
            <div className="py-1" role="listbox">
              {Object.entries(supportedLanguages).map(([code, name]) => (
                <button
                  key={code}
                  className={cn(
                    'w-full px-4 py-2 text-sm transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:bg-accent focus:text-accent-foreground focus:outline-none',
                    language === code && 'bg-primary/10 text-primary font-medium',
                    flipClassName('text-left')
                  )}
                  onClick={() => {
                    if (language !== code) {
                      toggleLanguage();
                    }
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={language === code}
                >
                  <div className="flex items-center justify-between">
                    <span>{name}</span>
                    {language === code && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Utility component for language-specific content
interface LanguageContentProps {
  en: React.ReactNode;
  ar: React.ReactNode;
  className?: string;
}

export function LanguageContent({ en, ar, className }: LanguageContentProps) {
  const { language } = useLanguage();
  
  return (
    <div className={className}>
      {language === 'en' ? en : ar}
    </div>
  );
}

// Hook for language-specific values
export function useLanguageValue<T>(enValue: T, arValue: T): T {
  const { language } = useLanguage();
  return language === 'en' ? enValue : arValue;
}