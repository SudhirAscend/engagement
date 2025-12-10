import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import MapPreviewWrapper from "@/components/MapPreviewWrapper";
import Message from "@/components/Message";
import ContactSection from "@/components/ContactSection";
import EventInfo from "@/components/EventInfo";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";
import CelebrateButton from "@/components/CelebrateButton";
import WelcomeConfetti from "@/components/WelcomeConfetti";
import Analytics from "@/components/Analytics";

/**
 * Main Page Component
 * 
 * Composes all sections of the reception invitation website:
 * - Hero (above the fold)
 * - Timeline (optional scroll section)
 * - Map Preview (interactive map)
 * - Event Info
 * - Contact Section
 * - Message (optional scroll section)
 * - Footer
 * 
 * Global components:
 * - BottomNavigation (sticky bottom nav bar - all devices)
 * - ScrollProgress (top progress bar)
 * - ParticleBackground (animated particles)
 * 
 * All scroll-triggered animations are handled within individual components.
 */
export default function Home() {
  return (
    <main className="min-h-screen relative pb-20 sm:pb-24">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Analytics - Captures visitor data */}
      <Analytics />

      {/* Welcome Confetti on Page Load */}
      <WelcomeConfetti />

      {/* Hero Section - Above the fold */}
      <Hero />

      {/* Optional Scroll Sections */}
      <Timeline />
      <MapPreviewWrapper />
      <EventInfo />
      <ContactSection />
      <Message />

      {/* Footer */}
      <Footer />

      {/* Bottom Navigation Bar - All Devices */}
      <BottomNavigation />

      {/* Playful Celebrate Button */}
      <CelebrateButton />
      </main>
  );
}
