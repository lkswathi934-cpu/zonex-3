import { motion } from 'framer-motion';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 mesh-gradient" />

      {/* Primary violet orb — top left */}
      <motion.div
        className="absolute top-[-15%] left-[0%] w-[550px] h-[550px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Deep royal purple orb — right */}
      <motion.div
        className="absolute top-[25%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }}
        animate={{ x: [0, -80, 0], y: [0, 70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Cyber cyan accent — bottom center */}
      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)' }}
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Small accent orb — lower left */}
      <motion.div
        className="absolute top-[65%] left-[5%] w-[280px] h-[280px] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
