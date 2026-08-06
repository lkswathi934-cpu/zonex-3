import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, BadgeCheck, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const active = TESTIMONIALS[index];

  return (
    <section className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Social Proof"
          title={<>Client <span className="gradient-text">Testimonials</span> & Results</>}
          subtitle="Real founders, real growth. Here's what it's like to work with us."
        />

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="glass-strong rounded-3xl p-8 sm:p-10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-cyan-400" fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg sm:text-xl leading-relaxed mb-6">"{active.text}"</p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <img src={active.avatar} alt={active.name} loading="lazy" className="w-12 h-12 rounded-full object-cover border-2 border-violet-500/30" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold">{active.name}</span>
                      <BadgeCheck className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="text-xs text-slate-400">{active.role}, {active.company}</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {active.growth}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-violet-500/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-violet-500' : 'w-2 bg-slate-600'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-violet-500/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
