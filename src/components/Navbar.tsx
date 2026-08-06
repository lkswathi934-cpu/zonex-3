import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { NAV_ITEMS, AGENCY } from '@/data/content';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fireConfetti = () => {
    const colors = ['#8B5CF6', '#7C3AED', '#00F0FF', '#6D28D9'];
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors, scalar: 0.8 });
    setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors }), 150);
    setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors }), 150);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/90 backdrop-blur-2xl border-b border-violet-500/20 shadow-[0_4px_40px_rgba(139,92,246,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* ── Logo — extreme left ── */}
          <a href="#hero" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt={AGENCY.name}
              className="h-10 w-auto object-contain"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="font-display font-bold text-lg tracking-tight hidden sm:block group-hover:text-violet-400 transition-colors">
              {AGENCY.name}
            </span>
          </a>

          {/* ── Nav links — absolute center ── */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-violet-400 transition-colors rounded-lg hover:bg-violet-500/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── CTAs — extreme right ── */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <Moon className="w-4 h-4 text-violet-400" />
                  </motion.div>
                ) : (
                  <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Sun className="w-4 h-4 text-cyan-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={fireConfetti}
              className="hidden sm:inline-flex btn-neon text-sm !py-2 !px-5"
            >
              <Sparkles className="w-4 h-4" />
              Claim Free Audit
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl glass flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm glass-strong p-6 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-lg">{AGENCY.name}</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:text-violet-400 hover:bg-violet-500/5 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <button
                onClick={() => { fireConfetti(); setMobileOpen(false); }}
                className="btn-neon mt-auto text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Claim Free Audit
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
