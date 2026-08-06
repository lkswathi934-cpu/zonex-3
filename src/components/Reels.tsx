import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Eye, AlertCircle, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { REELS, type ReelItem } from '@/data/content';
import { SectionHeading } from './SectionHeading';

function ReelCard({ reel, index }: { reel: ReelItem; index: number }) {
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    setMuted(videoEl.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 p-[8px] transition-transform duration-300 hover:scale-[1.03]"
        style={{ aspectRatio: '9 / 16', maxWidth: '260px', boxShadow: '0 0 30px rgba(139,92,246,0.12), 0 18px 50px rgba(0,0,0,0.55)' }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-6 text-center">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Film className="h-10 w-10 text-violet-400" />
              </motion.div>
              <p className="text-sm font-medium text-violet-300">{reel.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <AlertCircle className="h-3.5 w-3.5" />
                Video unavailable
              </p>
            </div>
          ) : (
            <video
              ref={setVideoEl}
              src={reel.video}
              autoPlay
              muted={muted}
              loop
              playsInline
              preload="auto"
              controls
              onError={() => setFailed(true)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onVolumeChange={() => { if (videoEl) setMuted(videoEl.muted); }}
              className="h-full w-full rounded-[2rem] object-cover"
            />
          )}

          {/* View count badge */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Eye className="h-3 w-3" />
            {reel.views}
          </div>
        </div>
      </div>

      {/* Custom control buttons (in addition to native controls) */}
      {!failed && (
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-full glass text-violet-300 transition-colors hover:bg-violet-500/20"
            aria-label={playing ? 'Pause' : 'Play'}
            type="button"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full glass text-violet-300 transition-colors hover:bg-violet-500/20"
            aria-label={muted ? 'Unmute' : 'Mute'}
            type="button"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}

      <div className="mt-3 text-center">
        <h3 className="font-display text-base font-bold text-white">{reel.title}</h3>
        <p className="mt-0.5 text-sm text-violet-400">{reel.type}</p>
        <p className="mt-1.5 text-xs text-slate-500">{reel.caption}</p>
      </div>
    </motion.div>
  );
}

export function Reels() {
  const mainReels = REELS.filter((r) => r.id <= 3);
  const gymReels = REELS.filter((r) => r.id >= 4);

  return (
    <section id="reels" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Reels Showcase"
          title={<>Short-Form <span className="gradient-text">Video Reels</span> & Ad Creatives</>}
          subtitle="Real video work — play any reel with sound using the controls below each card."
        />

        {/* Main showcase reels */}
        <div className="mb-16">
          <h3 className="mb-6 text-center font-display text-lg font-bold text-slate-200">Featured Ad Creatives</h3>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {mainReels.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} />
            ))}
          </div>
        </div>

        {/* Gym / Fitness reels */}
        <div>
          <h3 className="mb-6 text-center font-display text-lg font-bold text-slate-200">Gym &amp; Fitness Reels</h3>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {gymReels.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
