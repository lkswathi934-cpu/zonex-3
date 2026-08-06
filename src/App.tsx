import { ThemeProvider } from '@/context/ThemeContext';
import { AmbientBackground } from '@/components/AmbientBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Portfolio } from '@/components/Portfolio';
import { Reels } from '@/components/Reels';
import { ROICalculator } from '@/components/ROICalculator';
import { Services } from '@/components/Services';
import { BeforeAfter } from '@/components/BeforeAfter';
import { TechMarquee } from '@/components/TechMarquee';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { FAQs } from '@/components/FAQs';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ConversionBar, ChatWidget } from '@/components/ConversionBar';

function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <AmbientBackground />
        <Navbar />
        <main>
          <Hero />
          <Portfolio />
          <Reels />
          <ROICalculator />
          <Services />
          <BeforeAfter />
          <TechMarquee />
          <Process />
          <Testimonials />
          <FAQs />
          <Contact />
        </main>
        <Footer />
        <ConversionBar />
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;
