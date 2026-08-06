import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PROCESS_STEPS } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function Process() {
  return (
    <section id="process" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="How We Work"
          title={<>4-Step <span className="gradient-text">Frictionless</span> Onboarding</>}
          subtitle="From first call to daily optimization — a clear, proven path to scaling your brand."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-violet-500/20 via-violet-royal/20 to-cyan-400/20" />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative glass-strong rounded-3xl p-6 card-glow-hover hover:border-violet-500/40"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-deep/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-violet-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-violet-deep text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
