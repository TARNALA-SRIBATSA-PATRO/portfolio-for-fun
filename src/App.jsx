import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsletterHub from './components/NewsletterHub';
import ServiceSection from './components/ServiceSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { services } from './data/services';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const handleSelectService = (id) => {
    setSelectedServiceId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setSelectedServiceId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111111' }}>
      <Navbar
        onNavigateHome={handleBackToHub}
        onSelectService={handleSelectService}
        selectedServiceId={selectedServiceId}
      />

      <main className="pt-2">
        <AnimatePresence mode="wait">
          {selectedServiceId && selectedService ? (
            /* Full-Screen Individual Issue/Service View */
            <motion.div
              key={selectedServiceId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pt-16 pb-12"
            >
              <ServiceSection
                service={selectedService}
                onBack={handleBackToHub}
              />
            </motion.div>
          ) : (
            /* Home / Newsletter Hub View with Hero & Cards */
            <motion.div
              key="hub-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onSelectService={handleSelectService} />
              <NewsletterHub onSelectService={handleSelectService} />
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
