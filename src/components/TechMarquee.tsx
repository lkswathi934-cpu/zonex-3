import { TECH_STACK } from '@/data/content';

export function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container-max px-4 mb-6">
        <p className="text-center text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Our Tech Stack & Tools
        </p>
      </div>
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 w-max">
          {items.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="glass rounded-2xl px-8 py-4 flex items-center gap-3 whitespace-nowrap hover:border-violet-500/40 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              <span className="font-display font-semibold text-lg text-slate-200 light:text-slate-700">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
