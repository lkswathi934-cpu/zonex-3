import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ArrowLeftRight } from 'lucide-react';
import { BEFORE_AFTER } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <section className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="The Difference"
          title={<>Before vs. <span className="gradient-text">After Transformation</span></>}
          subtitle="See what changes when you switch from traditional in-house marketing to our growth agency model."
        />

        <div
          ref={ref}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden glass-strong select-none"
          onMouseMove={(e) => dragging.current && update(e.clientX)}
          onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
        >
          <div className="grid grid-cols-2">
            {/* Before */}
            <div className="p-8 bg-red-950/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold">Traditional / In-House</h3>
                  <p className="text-xs text-slate-400">Competitors</p>
                </div>
              </div>
              <div className="space-y-3">
                {BEFORE_AFTER.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-semibold text-red-400">{item.before}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="p-8 bg-violet-950/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold">With Our Agency</h3>
                  <p className="text-xs text-violet-400">Growth Partner</p>
                </div>
              </div>
              <div className="space-y-3">
                {BEFORE_AFTER.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-semibold text-violet-400">{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-violet-500 glow-crimson pointer-events-none" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-strong flex items-center justify-center glow-crimson cursor-ew-resize">
              <ArrowLeftRight className="w-5 h-5 text-violet-400" />
            </div>
          </div>

          {/* Reveal overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 to-transparent" />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 mt-4"
        >
          Drag the slider to compare
        </motion.p>
      </div>
    </section>
  );
}
