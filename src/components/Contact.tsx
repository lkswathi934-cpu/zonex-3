import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { AGENCY } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function Contact() {
  return (
    <section id="contact" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Let's Talk"
          title={<>Ready to Scale Your Brand to <span className="gradient-text">7-Figures?</span></>}
          subtitle="Choose your preferred way to connect — we respond within 2 hours during business days."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {/* WhatsApp */}
          <a
            href={AGENCY.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-strong rounded-3xl p-7 text-center card-glow-hover hover:glow-crimson transition-all hover:border-violet-500/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Instant WhatsApp Chat</h3>
            <p className="text-sm text-slate-400 mb-3">Fastest response</p>
            <span className="inline-flex items-center gap-1 text-violet-400 text-sm font-semibold">
              Chat now <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Strategy Call */}
          <a
            href={AGENCY.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-strong rounded-3xl p-7 text-center card-glow-hover hover:glow-crimson transition-all hover:border-violet-500/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">1-on-1 Strategy Call</h3>
            <p className="text-sm text-slate-400 mb-3">15-min free audit</p>
            <span className="inline-flex items-center gap-1 text-violet-400 text-sm font-semibold">
              Book a slot <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${AGENCY.email}`}
            className="group glass-strong rounded-3xl p-7 text-center card-glow-hover hover:glow-warm transition-all hover:border-cyan-500/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Email Our Team</h3>
            <p className="text-sm text-slate-400 mb-3">Detailed inquiries</p>
            <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-semibold">
              Send email <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </motion.div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400"
        >
          <a href={`mailto:${AGENCY.email}`} className="flex items-center gap-2 hover:text-violet-400 transition-colors">
            <Mail className="w-4 h-4" /> {AGENCY.email}
          </a>
          <a href={`tel:${AGENCY.phone}`} className="flex items-center gap-2 hover:text-violet-400 transition-colors">
            <Phone className="w-4 h-4" /> {AGENCY.phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {AGENCY.office}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
