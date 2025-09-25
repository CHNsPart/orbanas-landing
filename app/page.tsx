"use client";

import { useState } from 'react';
import Navigation from "@/components/shared/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/shared/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";
import TeamSection from "@/components/sections/TeamSection";
import LogoLoader from "@/components/ui/LogoLoader";
import { useResourceLoader } from "@/hooks/useResourceLoader";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  // Preload critical resources from CDN
  const { isLoading } = useResourceLoader({
    images: [
      '/scene/scene-square.png',
      '/scene/scene-landscape.png',
      '/orbanas-logo.svg',
      '/team/g-manager.png',
      '/team/it-manager.png'
    ],
    videos: [
      '/scene/scene-landscape-5s.mp4'
    ],
  });

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  // Show loader while resources are loading
  if (showLoader || isLoading) {
    return <LogoLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <>
      {/* Sticky Navigation */}
      <Navigation />
      
      {/* Main content with proper spacing */}
      <main className="relative">
        {/* Hero Section - Full height, no top padding needed */}
        <HeroSection />

        {/* Other sections with proper spacing */}
        <div className="relative">
          {/* About Section */}
          <AboutSection />

          {/* Services Section */}
          <ServicesSection />
          
          {/* Team Section */}
          <TeamSection />

          {/* CTA Section */}
          <CTASection />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}