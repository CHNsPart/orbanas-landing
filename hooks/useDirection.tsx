'use client';

import { useEffect } from 'react';
import { useLanguage } from './useLanguage';

// Type definitions
export type Direction = 'ltr' | 'rtl';

interface DirectionUtils {
  direction: Direction;
  isRTL: boolean;
  isLTR: boolean;
  getTextAlign: (align?: 'left' | 'right' | 'center') => string;
  getMargin: (side: 'left' | 'right', value: string) => Record<string, string>;
  getPadding: (side: 'left' | 'right', value: string) => Record<string, string>;
  getFloat: (side: 'left' | 'right') => string;
  getBorder: (side: 'left' | 'right', value: string) => Record<string, string>;
  getPosition: (side: 'left' | 'right', value: string) => Record<string, string>;
  flipClassName: (className: string) => string;
}

// RTL-aware className mapping
const classNameMap: Record<string, Record<Direction, string>> = {
  // Text alignment
  'text-left': { ltr: 'text-left', rtl: 'text-right' },
  'text-right': { ltr: 'text-right', rtl: 'text-left' },
  
  // Margins
  'ml-': { ltr: 'ml-', rtl: 'mr-' },
  'mr-': { ltr: 'mr-', rtl: 'ml-' },
  'margin-left': { ltr: 'margin-left', rtl: 'margin-right' },
  'margin-right': { ltr: 'margin-right', rtl: 'margin-left' },
  
  // Padding
  'pl-': { ltr: 'pl-', rtl: 'pr-' },
  'pr-': { ltr: 'pr-', rtl: 'pl-' },
  'padding-left': { ltr: 'padding-left', rtl: 'padding-right' },
  'padding-right': { ltr: 'padding-right', rtl: 'padding-left' },
  
  // Borders
  'border-l': { ltr: 'border-l', rtl: 'border-r' },
  'border-r': { ltr: 'border-r', rtl: 'border-l' },
  'border-left': { ltr: 'border-left', rtl: 'border-right' },
  'border-right': { ltr: 'border-right', rtl: 'border-left' },
  
  // Positioning
  'left-': { ltr: 'left-', rtl: 'right-' },
  'right-': { ltr: 'right-', rtl: 'left-' },
  
  // Flex
  'justify-start': { ltr: 'justify-start', rtl: 'justify-end' },
  'justify-end': { ltr: 'justify-end', rtl: 'justify-start' },
  
  // Rounded corners
  'rounded-l': { ltr: 'rounded-l', rtl: 'rounded-r' },
  'rounded-r': { ltr: 'rounded-r', rtl: 'rounded-l' },
  'rounded-tl': { ltr: 'rounded-tl', rtl: 'rounded-tr' },
  'rounded-tr': { ltr: 'rounded-tr', rtl: 'rounded-tl' },
  'rounded-bl': { ltr: 'rounded-bl', rtl: 'rounded-br' },
  'rounded-br': { ltr: 'rounded-br', rtl: 'rounded-bl' },
};

export function useDirection(): DirectionUtils {
  const { language } = useLanguage();
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = direction === 'rtl';
  const isLTR = direction === 'ltr';

  // Apply direction to document
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    // Set dir attribute
    htmlElement.setAttribute('dir', direction);
    
    // Add direction class for CSS targeting
    htmlElement.classList.remove('ltr', 'rtl');
    htmlElement.classList.add(direction);
    
    // Set CSS custom property for direction-aware styles
    htmlElement.style.setProperty('--direction', direction);
    htmlElement.style.setProperty('--direction-factor', isRTL ? '-1' : '1');
    
    return () => {
      // Cleanup on unmount
      htmlElement.classList.remove('ltr', 'rtl');
      htmlElement.style.removeProperty('--direction');
      htmlElement.style.removeProperty('--direction-factor');
    };
  }, [direction, isRTL]);

  // Get appropriate text alignment
  const getTextAlign = (align: 'left' | 'right' | 'center' = 'left'): string => {
    if (align === 'center') return 'text-center';
    if (align === 'left') return isRTL ? 'text-right' : 'text-left';
    if (align === 'right') return isRTL ? 'text-left' : 'text-right';
    return 'text-left';
  };

  // Get direction-aware margin
  const getMargin = (side: 'left' | 'right', value: string): Record<string, string> => {
    const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
    return { [`margin${actualSide.charAt(0).toUpperCase()}${actualSide.slice(1)}`]: value };
  };

  // Get direction-aware padding
  const getPadding = (side: 'left' | 'right', value: string): Record<string, string> => {
    const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
    return { [`padding${actualSide.charAt(0).toUpperCase()}${actualSide.slice(1)}`]: value };
  };

  // Get direction-aware float
  const getFloat = (side: 'left' | 'right'): string => {
    return isRTL ? (side === 'left' ? 'right' : 'left') : side;
  };

  // Get direction-aware border
  const getBorder = (side: 'left' | 'right', value: string): Record<string, string> => {
    const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
    return { [`border${actualSide.charAt(0).toUpperCase()}${actualSide.slice(1)}`]: value };
  };

  // Get direction-aware position
  const getPosition = (side: 'left' | 'right', value: string): Record<string, string> => {
    const actualSide = isRTL ? (side === 'left' ? 'right' : 'left') : side;
    return { [actualSide]: value };
  };

  // Flip className based on direction
  const flipClassName = (className: string): string => {
    // Handle compound classes
    const classes = className.split(' ');
    const flippedClasses = classes.map(cls => {
      // Check for exact matches first
      for (const [pattern, mapping] of Object.entries(classNameMap)) {
        if (cls === pattern) {
          return mapping[direction];
        }
        
        // Handle classes with values (e.g., ml-4, pr-2)
        if (cls.startsWith(pattern)) {
          const suffix = cls.substring(pattern.length);
          return mapping[direction] + suffix;
        }
      }
      
      // Return original class if no mapping found
      return cls;
    });
    
    return flippedClasses.join(' ');
  };

  return {
    direction,
    isRTL,
    isLTR,
    getTextAlign,
    getMargin,
    getPadding,
    getFloat,
    getBorder,
    getPosition,
    flipClassName
  };
}

// Utility function for conditional direction classes
export function directionClass(ltrClass: string, rtlClass: string): string {
  const { isRTL } = useDirection();
  return isRTL ? rtlClass : ltrClass;
}

// HOC for direction-aware components
export function withDirection<T extends object>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function DirectionAwareComponent(props: T) {
    const directionUtils = useDirection();
    
    return (
      <div className={`direction-${directionUtils.direction}`}>
        <Component {...props} />
      </div>
    );
  };
}

// CSS-in-JS helper for direction-aware styles
export function createDirectionStyles(baseStyles: Record<string, any>) {
  const { direction, isRTL } = useDirection();
  
  const processedStyles = { ...baseStyles };
  
  // Process common style properties
  if (processedStyles.textAlign === 'start') {
    processedStyles.textAlign = isRTL ? 'right' : 'left';
  }
  if (processedStyles.textAlign === 'end') {
    processedStyles.textAlign = isRTL ? 'left' : 'right';
  }
  
  // Process margin/padding
  ['marginLeft', 'marginRight', 'paddingLeft', 'paddingRight'].forEach(prop => {
    if (processedStyles[prop] !== undefined) {
      const isLeft = prop.includes('Left');
      const newProp = isRTL 
        ? (isLeft ? prop.replace('Left', 'Right') : prop.replace('Right', 'Left'))
        : prop;
      
      if (newProp !== prop) {
        processedStyles[newProp] = processedStyles[prop];
        delete processedStyles[prop];
      }
    }
  });
  
  return processedStyles;
}