import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageCircle } from 'lucide-react';
import { AGENCY } from '@/data/content';
import confetti from 'canvas-confetti';

export function ConversionBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fireConfetti = () => {
    const colors = ['#8B5CF6', '#7C3AED', '#00F0FF', '#6D28D9'];
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.9 }, colors, scalar: 0.7 });
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl"
        >
          <div className="glass-strong rounded-2xl px-5 py-3.5 flex items-center justify-between gap-3 shadow-2xl border-violet-500/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-deep flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium truncate">
                Ready to scale? Get a <span className="text-violet-400 font-bold">Free 15-Min Strategy Audit</span>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={AGENCY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireConfetti}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 transition-all whitespace-nowrap"
              >
                Claim Now
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-violet-deep text-white flex items-center justify-center glow-crimson hover:scale-110 transition-transform"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-obsidian text-[10px] font-bold flex items-center justify-center">1</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-72 glass-strong rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-4 bg-gradient-to-r from-violet-500/20 to-violet-deep/20 border-b border-violet-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-violet-deep flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Chat with us</h4>
                  <span className="text-xs text-violet-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" /> Online now
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-300 light:text-slate-600 mb-3">
                Hey! Want a free strategy audit for your brand? Let's talk on WhatsApp.
              </p>
              <a
                href={AGENCY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow w-full text-sm !py-2.5"
              >
                <MessageCircle className="w-4 h-4" />
                Start WhatsApp Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
