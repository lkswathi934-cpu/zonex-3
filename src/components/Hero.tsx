import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Calculator, TrendingUp, Star } from 'lucide-react';
import { HERO_STATS, type HeroStat } from '@/data/content';

function useCountUp(target: number, decimals: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, decimals, active, duration]);
  return value.toFixed(decimals);
}

function StatCard({ stat, active, index }: { stat: HeroStat; active: boolean; index: number }) {
  const display = useCountUp(stat.target, stat.decimals, active);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="glass rounded-2xl p-5 text-center card-glow-hover hover:border-violet-500/40"
    >
      <div className="text-2xl lg:text-3xl font-bold gradient-text flex items-center justify-center gap-1">
        {stat.star && <Star className="w-5 h-5 text-cyan-400" fill="currentColor" />}
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="mt-1 text-xs sm:text-sm text-slate-400 light:text-slate-500">{stat.label}</div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-50px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
      <motion.div style={{ y, opacity }} className="container-max px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(34,211,238,0.10))',
            border: '1px solid rgba(139,92,246,0.5)',
            boxShadow: '0 0 25px rgba(139,92,246,0.35), 0 0 50px rgba(34,211,238,0.15), inset 0 0 12px rgba(139,92,246,0.10)',
          }}
        >
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" fill="currentColor" />
          <span
            className="text-base sm:text-lg font-bold tracking-wide bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent"
            style={{ textShadow: '0 0 18px rgba(139,92,246,0.45)' }}
          >
            ZONEX GROWTH HUB AGENCY
          </span>
          <span className="flex gap-0.5 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-cyan-400" fill="currentColor" style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.6))' }} />
            ))}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight max-w-5xl mx-auto"
        >
          We Scale Brands into{' '}
          <span className="gradient-text">Market Leaders</span> with High-CTR Ads, Viral Content & Web Architecture.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 light:text-slate-600 max-w-3xl mx-auto leading-relaxed"
        >
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </motion.p>

        {/* Action Hub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#portfolio" className="btn-neon w-full sm:w-auto">
            Explore Live Portfolios
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#roi" className="btn-cyber w-full sm:w-auto">
            <Calculator className="w-5 h-5" />
            Calculate Your ROI
          </a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {HERO_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col items-center gap-2 text-slate-500"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
