'use client';

import { ReactNode, forwardRef, ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useDirection } from '@/hooks/useDirection';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: 'default' | 'hero' | 'compact' | 'spacious';
  background?: 'default' | 'muted' | 'accent' | 'primary' | 'gradient';
  fullWidth?: boolean;
  as?: ElementType;
  'data-section'?: string;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({
    children,
    className,
    containerClassName,
    id,
    variant = 'default',
    background = 'default',
    fullWidth = false,
    as: Component = 'section',
    'data-section': dataSection,
    ...props
  }, ref) => {
    const { direction, flipClassName } = useDirection();

    // Variant-based spacing
    const variantClasses = {
      default: 'py-16 md:py-20 lg:py-24',
      hero: 'py-20 md:py-28 lg:py-32',
      compact: 'py-12 md:py-16',
      spacious: 'py-20 md:py-28 lg:py-36'
    };

    // Background variants using CSS custom properties
    const backgroundClasses = {
      default: 'bg-background',
      muted: 'bg-muted',
      accent: 'bg-accent',
      primary: 'bg-primary text-primary-foreground',
      gradient: 'bg-gradient-to-br from-background via-muted to-accent/20'
    };

    // Container classes
    const containerClasses = cn(
      // Base container
      'mx-auto px-4 sm:px-6 lg:px-8',
      // Max width unless fullWidth
      !fullWidth && 'max-w-7xl',
      // Direction-aware classes
      flipClassName(''),
      // Custom container classes
      containerClassName
    );

    // Section classes
    const sectionClasses = cn(
      // Base classes
      'relative',
      // Variant spacing
      variantClasses[variant],
      // Background
      backgroundClasses[background],
      // Direction support
      `direction-${direction}`,
      // Custom classes
      className
    );

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        id={id}
        className={sectionClasses}
        data-section={dataSection}
        {...props}
      >
        {/* Background decorations */}
        {background === 'gradient' && (
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        )}
        
        {/* Content container */}
        <div className={containerClasses}>
          {children}
        </div>

        {/* Optional background shapes for visual interest */}
        {variant === 'hero' && (
          <>
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </>
        )}
      </Component>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;

// Utility component for consistent section headers
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className
}: SectionHeaderProps) {
  const { getTextAlign, flipClassName } = useDirection();

  const alignmentClasses = {
    left: getTextAlign('left'),
    center: 'text-center',
    right: getTextAlign('right')
  };

  return (
    <div className={cn(
      'mb-12 md:mb-16',
      alignmentClasses[align],
      className
    )}>
      {subtitle && (
        <p className={cn(
          'text-sm font-medium tracking-wide uppercase mb-4',
          'text-primary'
        )}>
          {subtitle}
        </p>
      )}
      
      <h2 className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold mb-6',
        'text-foreground leading-tight'
      )}>
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          'text-lg md:text-xl text-muted-foreground max-w-3xl',
          align === 'center' && 'mx-auto',
          align === 'left' && flipClassName('mr-auto'),
          align === 'right' && flipClassName('ml-auto')
        )}>
          {description}
        </p>
      )}
    </div>
  );
}

// Utility component for consistent content grids
interface ContentGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ContentGrid({
  children,
  columns = 3,
  gap = 'lg',
  className
}: ContentGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={cn(
      'grid',
      columnClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}