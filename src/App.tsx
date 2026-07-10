import { useLenis } from './lib/useLenis';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Technologies from './components/Technologies';
import Portfolio from './components/Portfolio';
import Industries from './components/Industries';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useLenis();

  return (
    <div className="relative bg-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Technologies />
        <Portfolio />
        <Industries />
        <Testimonials />
        <Process />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
