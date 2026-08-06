import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type MotionStyle } from 'framer-motion';
import { ExternalLink, X, Eye, TrendingUp } from 'lucide-react';
import { PROJECTS, PORTFOLIO_FILTERS, type Project } from '@/data/content';
import { SectionHeading } from './SectionHeading';

const metricColors: Record<string, string> = {
  emerald: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  gold: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  royal: 'text-violet-300 border-violet-400/30 bg-violet-400/10',
};

function TiltCard({ project, onPreview }: { project: Project; onPreview: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set((cx / rect.width) * 50);
    y.set((cy / rect.height) * 50);
  };

  const handleLeave = () => { x.set(0); y.set(0); };
  const style: MotionStyle = { rotateX, rotateY, transformStyle: 'preserve-3d' };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="glass-strong rounded-3xl overflow-hidden card-glow-hover group hover:border-violet-500/50"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden" style={{ transform: 'translateZ(40px)' }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold border ${metricColors[project.metricColor]}`}>
          <TrendingUp className="w-3 h-3 inline mr-1" />
          {project.metric}
        </div>
      </div>

      {/* Content */}
      <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">{project.category === 'Brand Identity' ? 'BRAND IDENTITY / WEB DEVELOPMENT' : project.category === 'Web Development' ? 'WEB DEVELOPMENT' : project.category.toUpperCase()}</span>
        <h3 className="mt-2 font-display text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-400 light:text-slate-600 leading-relaxed">{project.description}</p>

        {/* Tech badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium glass text-slate-300 light:text-slate-600">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/40 hover:bg-violet-500/25 hover:border-violet-400 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View Live Project
          </a>
          <button
            onClick={onPreview}
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold glass text-slate-300 hover:bg-violet-500/10 transition-all"
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof PORTFOLIO_FILTERS)[number]>('All Work');
  const [preview, setPreview] = useState<Project | null>(null);
  const filtered = filter === 'All Work' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Live Portfolio"
          title={<>Interactive <span className="gradient-text">Case Studies</span> & Web Previews</>}
          subtitle="Real projects, real metrics. Click any card to launch a full-screen interactive preview."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white glow-crimson'
                  : 'glass text-slate-300 light:text-slate-600 hover:text-violet-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <TiltCard key={project.id} project={project} onPreview={() => setPreview(project)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[85vh] glass-strong rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
                <div>
                  <h3 className="font-display font-bold text-lg">{preview.title}</h3>
                  <span className="text-xs text-violet-400">{preview.url}</span>
                </div>
                <button onClick={() => setPreview(null)} className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-violet-500/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe src={preview.url} title={preview.title} className="flex-1 w-full bg-white" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
