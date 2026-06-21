import { useEffect } from 'react';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import StatsSection from '../components/landing/StatsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FAQSection from '../components/landing/FAQSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export default function LandingPage() {
  useEffect(() => {
    document.title = `${APP_NAME} - ${APP_TAGLINE}`;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
