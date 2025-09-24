"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { GalleryVertical, ChevronUp, ChevronDown, Eye } from "lucide-react";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [showMobileContent, setShowMobileContent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Orbanas-themed gradients with primary orange
  const linearGradients = useMemo(() => [
    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary))/0.8 100%)",
    "linear-gradient(135deg, hsl(var(--primary)) 0%, #f97316 50%, hsl(var(--primary)) 100%)",
    "linear-gradient(135deg, #f97316 0%, hsl(var(--primary)) 50%, #ea580c 100%)",
  ], []);

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);


  // Scroll lock functionality - Alternative approach
  useEffect(() => {
    const preventScroll = (event: TouchEvent | WheelEvent) => {
      // Only prevent if the target is not within the mobile content overlay
      const target = event.target as Element;
      const isWithinOverlay = target.closest('[data-mobile-overlay]');
      
      if (!isWithinOverlay) {
        event.preventDefault();
      }
    };

    const preventKeyboardScroll = (event: KeyboardEvent) => {
      // Prevent arrow keys, page up/down, space, home, end from scrolling the background
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'];
      const target = event.target as Element;
      const isWithinOverlay = target.closest('[data-mobile-overlay]');
      
      if (!isWithinOverlay && scrollKeys.includes(event.code)) {
        event.preventDefault();
      }
    };

    if (showMobileContent) {
      // Prevent touch scroll
      document.addEventListener('touchmove', preventScroll, { passive: false });
      
      // Prevent wheel scroll
      document.addEventListener('wheel', preventScroll, { passive: false });
      
      // Prevent keyboard scroll
      document.addEventListener('keydown', preventKeyboardScroll, { passive: false });
      
      // Add body styles for additional protection
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      // Remove all event listeners
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('keydown', preventKeyboardScroll);
      
      // Restore body styles
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // Cleanup on unmount or dependency change
    return () => {
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('keydown', preventKeyboardScroll);
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [showMobileContent]);

  return (
    <div className="relative w-full">
      {/* Mobile Floating Action Button */}
      <motion.button
        onClick={() => setShowMobileContent(!showMobileContent)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-2xl border-2 border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Eye className="size-6" />
          {/* Active indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary text-xs font-bold">{activeCard + 1}</span>
          </div>
        </div>
      </motion.button>

      {/* Mobile Content Overlay */}
      <AnimatePresence>
        {showMobileContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileContent(false)}
            data-mobile-overlay="backdrop"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl min-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              data-mobile-overlay="content"
            >
              {/* Mobile Content Header */}
              <div 
                className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4"
                data-mobile-overlay="header"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                      <span className="text-primary font-bold text-sm">
                        {String(activeCard + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground">
                      {content[activeCard]?.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowMobileContent(false)}
                    className="p-2 hover:bg-accent rounded-lg transition-colors"
                  >
                    <ChevronDown className="size-5" />
                  </button>
                </div>
                
                {/* Mobile Navigation Dots */}
                <div className="flex justify-center mt-4 gap-2">
                  {content.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCard(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        activeCard === index
                          ? "bg-primary scale-150 shadow-lg shadow-primary/50"
                          : "bg-border hover:bg-muted-foreground/50"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Content Body */}
              <div
                ref={mobileContentRef}
                className="p-6 h-full overflow-y-auto"
                style={{ background: backgroundGradient }}
                data-mobile-overlay="body"
              >
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  {content[activeCard]?.content ?? (
                    <div className="flex items-center justify-center h-64 transition-all duration-500">
                      <div className="text-white/80 text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <p className="text-lg font-semibold">Service Content</p>
                        <p className="text-sm text-white/60 mt-2">
                          {content[activeCard]?.description}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Mobile Navigation Controls */}
              <div 
                className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4"
                data-mobile-overlay="footer"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActiveCard(Math.max(0, activeCard - 1))}
                    disabled={activeCard === 0}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      activeCard === 0
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 shadow-lg"
                    )}
                  >
                    <ChevronUp className="size-4 rotate-[-90deg]" />
                    <span className="text-sm font-medium">Previous</span>
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {activeCard + 1} of {content.length}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveCard(Math.min(content.length - 1, activeCard + 1))}
                    disabled={activeCard === content.length - 1}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      activeCard === content.length - 1
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary/90 shadow-lg"
                    )}
                  >
                    <span className="text-sm font-medium">Next</span>
                    <ChevronUp className="size-4 rotate-90" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Scroll Indicator */}
      <div className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">
            {activeCard + 1} / {content.length}
          </span>
        </div>
      </div>

      {/* Main Scroll Container */}
      <motion.div
        animate={{
          backgroundColor: "#0a0a0a",
        }}
        className="relative flex h-[40rem] lg:h-[50rem] justify-center space-x-0 lg:space-x-10 overflow-y-auto rounded-3xl p-6 lg:py-20 lg:px-10 bg-black/80"
        ref={ref}
      >
        {/* Left Content Panel */}
        <div className="relative flex items-start px-4 w-full lg:w-1/2">
          <div className="max-w-2xl w-full">
            {content.map((item, index) => (
              <div key={item.title + index} className="my-24 py-20 pb-44">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="space-y-6"
                >
                  {/* Service Number Badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                    <span className="text-primary font-bold text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-2xl lg:text-3xl font-bold text-slate-100 leading-tight"
                  >
                    {item.title}
                  </motion.h1>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-lg text-slate-300 leading-relaxed max-w-sm"
                  >
                    {item.description}
                  </motion.p>

                  {/* Mobile Content Preview Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0,
                    }}
                    onClick={() => setShowMobileContent(true)}
                    className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm rounded-lg border border-primary/30 text-primary transition-all duration-300"
                  >
                    <Eye className="size-4" />
                    <span className="text-sm font-medium">View Details</span>
                  </motion.button>
                </motion.div>
              </div>
            ))}
            <div className="h-60" />
          </div>
        </div>

        {/* Right Sticky Content Panel - Desktop Only */}
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            "sticky top-10 hidden h-96 lg:h-fit w-80 lg:w-96 overflow-hidden rounded-2xl bg-white lg:block shadow-2xl",
            contentClassName,
          )}
        >
          {content[activeCard].content ?? (
            <div className="flex items-center justify-center h-full transition-all duration-500">
              <div className="text-white/80 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-lg font-semibold">Service Content</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Desktop Navigation Dots */}
      <div className="hidden lg:flex justify-center mt-6 gap-2">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const scrollContainer = ref.current;
              if (scrollContainer) {
                const targetScroll = (index / (content.length - 1)) * 
                  (scrollContainer.scrollHeight - scrollContainer.clientHeight);
                scrollContainer.scrollTo({
                  top: targetScroll,
                  behavior: 'smooth'
                });
              }
            }}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              activeCard === index
                ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                : "bg-border hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>

      {/* Desktop Scroll Hint */}
      <div className="hidden lg:block absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
        >
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <GalleryVertical className="size-4" />
            <span>Scroll to explore</span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="lg:hidden text-center mt-4">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-2 text-muted-foreground text-sm bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border"
        >
          <GalleryVertical className="size-4" />
          <span>Scroll or tap the eye icon to view details</span>
        </motion.div>
      </div>
    </div>
  );
};