"use client";

import Navigation from "@/components/shared/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/shared/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";
import TeamSection from "@/components/sections/TeamSection";

export default function Home() {
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