import { lazy, Suspense } from 'react';
import { useLenis } from './lib/useLenis';
import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

// The living globe — fixed WebGL layer that travels with scroll and
// dissolves into particles at the services section.
const GlobeJourney = lazy(() => import('./components/hero/ParticleSphere'));
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Values from './components/Values';
import Process from './components/Process';
import Clients from './components/Clients';
import Testimonials from './components/Testimonials';
import CSR from './components/CSR';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useLenis();

  return (
    <div className="relative bg-paper">
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <Suspense fallback={null}>
        <GlobeJourney />
      </Suspense>
      <Navbar />
      <main>
        <Hero />
        {/* Everything below the hero follows the active theme */}
        <div className="theme-scope">
          <About />
          <Services />
          <Values />
          <Process />
          <Clients />
          <Testimonials />
          <CSR />
          <Careers />
          <Contact />
        </div>
      </main>
      <div className="theme-scope">
        <Footer />
      </div>
    </div>
  );
}
