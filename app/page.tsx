"use client";

import Navigation from "@/components/shared/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import Footer from "@/components/shared/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}