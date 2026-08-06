import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SERVICES } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Our Services"
          title={<>The Complete <span className="gradient-text">11 Core Services</span> Suite</>}
          subtitle="Everything your brand needs to scale — from identity and content to paid ads, web development, and analytics."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className="group relative glass-strong rounded-3xl overflow-hidden card-glow-hover hover:border-violet-500/50"
              >
                {/* Background image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img src={service.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:glow-crimson transition-all duration-300">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <span className="text-3xl font-bold text-white/5 group-hover:text-violet-500/20 transition-colors">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg leading-tight mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed mb-4">{service.description}</p>

                  <ul className="space-y-1.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-slate-300 light:text-slate-600">
                        <Icons.Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl border border-violet-500/0 group-hover:border-violet-500/30 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
